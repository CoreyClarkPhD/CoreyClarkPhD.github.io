importScripts("../jahova/glMatrix.js", "workerUtils.js", "../glpk.js", "../mersenne-twister.js");

self.addEventListener('message', function(e) {
    var msg = e.data;
    var result = {type: "ERROR", data: "Error, Unknown Message"};
    if(msg.type.toUpperCase() == "UPDATE"){
        timeElapsed  = Date.now() - Date.now();
        timeElapsed = timeElapsed > Particle.PSO.maxTime ? Particle.PSO.maxTime : timeElapsed;
        Particle.Update();
        result =  Particle.Solve();
        self.postMessage(result);
    }
    else if(msg.type.toUpperCase() == "FITNESS"){
        Particle.Problem.fitness.global = msg.data.fitness;
        Particle.Problem.fitness.position.global = msg.data.position;
    }
    else if(msg.type.toUpperCase() == "SOLUTION"){
        result = {type: "Solution", data: Particle.Problem.solution}
        self.postMessage(result);
    }
    else if(msg.type.toUpperCase() == "INIT"){
        MT = new MersenneTwister(msg.data.id);
        result = Particle.Init(msg.data);
        self.postMessage(result);
    }
    else if(msg.type.toUpperCase() == "PRESOLVE"){
        timeElapsed = Date.now();
        result = Particle.PreSolve(msg.data);
        self.postMessage(result);
    }
    else{
        self.postMessage(result);
    }
    
    
    
}, false);
var seed = 12345;
//MT = new MersenneTwister(seed);
var timeElapsed = 0;
Particle = {
    id: null,
    PSO: {
        w: 2,       //Inertia weight
        wMax: 0.9,  //Max Inertia Weight
        wMin: 0.4,  //Min Inertia Weight
        c1: 2,
        c2: 2,
        Vmax: 6,
        maxIterations: 2300,
        maxTime: 500000,
        mutation: 0.02
    },
    Problem: {
        files: {
            problemPath: null,
            problemText: null,
            costPath: null,
            costText: null
        },
        glpk: {
            prob: null,
            smcp: null,
            status: null,
            constraints: [],
            cost: null,
            ub: 0
        },
        feasible: 0,
        infeasible: 0,
        position: [],
        velocity: [],
        fitness: {
            current: Number.MAX_VALUE,
            best: Number.MAX_VALUE,
            global: Number.MAX_VALUE,
            position: {
                best: [],
                global: []
            }
        },
        iteration: 0,
        solution: []
    },
    Init: function(data){
        Particle.id = data.id;
        Particle.Problem = data.problem;
        
        //Initialize glpk problem
        Particle.Problem.glpk.prob = glp_create_prob();
        glp_read_lp_from_string(Particle.Problem.glpk.prob, null, Particle.Problem.files.problemText);
        
        //Scale
        glp_scale_prob(Particle.Problem.glpk.prob, GLP_SF_AUTO);
        
        Particle.Problem.glpk.smcp = new SMCP({presolve: GLP_ON});
        
        //Initialzie fixed cost
        Particle.Problem.glpk.cost = Particle.Problem.files.costText.split("\n");
        
        //Build constraints array
        var out ="";
        var j = 1;
        while(Particle.Problem.glpk.prob.row[j]){
            if(Particle.Problem.glpk.prob.row[j].name.search("cap") >= 0){
                Particle.Problem.glpk.constraints.push(Particle.Problem.glpk.prob.row[j]);
                Particle.Problem.glpk.ub = Number(Particle.Problem.glpk.prob.row[j].ub);
             }
            j++;
        }
        
        for(var i = 0; i < Particle.Problem.glpk.cost.length; i++){
            //make cost a float
            Particle.Problem.glpk.cost[i] =  +Particle.Problem.glpk.cost[i];
            
            //Randomly set positions
            MT.random() < 0.5 ? Particle.Problem.position.push(0) : Particle.Problem.position.push(1);
            
            //Update constraints based upon initial position distirbution
            Particle.Problem.glpk.constraints[i].ub = Particle.Problem.position[i] == 0 ? 0 : Particle.Problem.glpk.ub;
            
            
            
            //Randomize particle velocity
            Particle.Problem.velocity.push(-1*Particle.PSO.Vmax + ((2 * Particle.PSO.Vmax) * MT.random()));
            //Particle.Problem.velocity.push(0.0);
            
            //Load 0's for solution, global and best positions
            Particle.Problem.solution.push(0);
            Particle.Problem.fitness.position.best.push(0);
            Particle.Problem.fitness.position.global.push(0);
            
            
            
        }
        
        return {type: "Init", data: "Particle: " + Particle.id + " ONLINE"}
    },
    Solve: function(){
        glp_simplex(Particle.Problem.glpk.prob, Particle.Problem.glpk.smcp);
        
        Particle.Problem.glpk.status = glp_get_status(Particle.Problem.glpk.prob);
        
        if((Particle.Problem.glpk.status == GLP_OPT) || (Particle.Problem.glpk.status == GLP_FEAS)){

            //Update Positions to match actual arcs used in solution
            for(var i = glp_get_num_cols(Particle.Problem.glpk.prob) - 1; i >= 0; i--){
                Particle.Problem.position[i] = glp_get_col_prim(Particle.Problem.glpk.prob, i + 1) <= 0 ? 0 : 1;
            }

            //Calculate Fitness
                //Accumlate fixed cost based upon archs (Position)
            var fixed = 0;
            for(var i = Particle.Problem.glpk.cost.length - 1; i >= 0; i--){
                fixed +=  Particle.Problem.glpk.cost[i] * Particle.Problem.position[i] ;
            }
            
            Particle.Problem.fitness.current = Particle.Problem.glpk.prob.obj_val + fixed;
            
            if(Particle.Problem.fitness.current < Particle.Problem.fitness.best){
                //Update Fitness Score
                Particle.Problem.fitness.best = Particle.Problem.fitness.current;
                
                //Save Problem Solution and Position
                for(var i = glp_get_num_cols(Particle.Problem.glpk.prob) - 1; i >= 0; i--){
                    Particle.Problem.solution[i] = glp_get_col_prim(Particle.Problem.glpk.prob, i + 1);
                    Particle.Problem.fitness.position.best[i] = Particle.Problem.position[i];
                }
            }
           
            
            //Increment Feasible Count
            Particle.Problem.feasible++;
        }
        else{
            Particle.Problem.infeasible++;
        }
        
        //Iterate Iteration
        Particle.Problem.iteration++;
        if(Particle.Problem.iteration > Particle.PSO.maxIterations){
            Particle.Problem.iteration = Particle.PSO.maxIterations;
        }
        
        //Post back to Node
        return {
                    type: "Complete",
                    data: {
                        id: Particle.id,
                        iteration: Particle.Problem.iteration,
                        fitness: Particle.Problem.fitness.current,
                        best: Particle.Problem.fitness.best,
                        feasible: Particle.Problem.feasible,
                        infeasible: Particle.Problem.infeasible,
                        status: Particle.Problem.glpk.status,
                        position: Particle.Problem.position
                    }
                };
    },
    Update: function(){
        
        //Update Velocity and Position
        //Particle.PSO.w = Particle.PSO.wMax - timeElapsed * ((Particle.PSO.wMax - Particle.PSO.wMin) / Particle.PSO.maxTime);
        Particle.PSO.w = Particle.PSO.wMax - Particle.Problem.iteration * ((Particle.PSO.wMax - Particle.PSO.wMin) / Particle.PSO.maxIterations);
        
        for(var i = Particle.Problem.velocity.length - 1; i >= 0; i--){
            Particle.Problem.velocity[i] = (Particle.PSO.w * Particle.Problem.velocity[i]) +
            Particle.PSO.c1* MT.random()* (Particle.Problem.fitness.position.best[i] - Particle.Problem.position[i]) +
            Particle.PSO.c2 * MT.random() * (Particle.Problem.fitness.position.global[i] - Particle.Problem.position[i]);
            
            if(Particle.Problem.velocity[i] > Particle.PSO.Vmax){
                Particle.Problem.velocity[i] = Particle.PSO.Vmax;
            }
            else if(Particle.Problem.velocity[i] <  -1*Particle.PSO.Vmax){
                Particle.Problem.velocity[i] = -1 * Particle.PSO.Vmax;
            }
            
            if(MT.random() < (1 / (1 + Math.exp(-1 * Particle.Problem.velocity[i])))){
                Particle.Problem.position[i] = 1;
            }
            else{
                Particle.Problem.position[i] = 0;
            }
            
            //mutation
            if(MT.random() < Particle.PSO.mutation){Particle.Problem.position[i] = 1 - Particle.Problem.position[i] }
             

        }
        
        //Update Constraints
        for(var i = Particle.Problem.position.length - 1; i >= 0; i-- ){
            Particle.Problem.glpk.constraints[i].ub = Particle.Problem.position[i] == 0 ? 0 : Particle.Problem.glpk.ub;
        }
        
        
    },
    PreSolve: function(){
        //Run simplex
        glp_simplex(Particle.Problem.glpk.prob, Particle.Problem.glpk.smcp);
            
        Particle.Problem.glpk.status = glp_get_status(Particle.Problem.glpk.prob);
        
        
        if((Particle.Problem.glpk.status == GLP_OPT) || (Particle.Problem.glpk.status == GLP_FEAS)){
            for(var i = Particle.Problem.position.length - 1; i >= 0; i-- ){
                Particle.Problem.position[i] = glp_get_col_prim(Particle.Problem.glpk.prob, i + 1) > 0 ? 1 : 0;
                //Update constraint
                Particle.Problem.glpk.constraints[i].ub = Particle.Problem.position[i] == 0 ? 0 : Particle.Problem.glpk.ub;
            }
            
            //Calculate Fitness
                //Accumlate fixed cost based upon archs (Position)
            var fixed = 0;
            for(var i = Particle.Problem.glpk.cost.length - 1; i >= 0; i--){
                fixed +=  Particle.Problem.glpk.cost[i] * Particle.Problem.position[i] ;
            }
            
            Particle.Problem.fitness.current = Particle.Problem.glpk.prob.obj_val + fixed;
            
                    
            //Update Fitness Score
            Particle.Problem.fitness.best = Particle.Problem.fitness.current;
            
            //Save Problem Solution and Position
            for(var i = glp_get_num_cols(Particle.Problem.glpk.prob) - 1; i >= 0; i--){
                Particle.Problem.solution[i] = glp_get_col_prim(Particle.Problem.glpk.prob, i + 1);
                Particle.Problem.fitness.position.best[i] = Particle.Problem.position[i];
            }
        }
        
        //Post back to Node
        return {
            type: "Complete",
            data: {
                id: Particle.id,
                iteration: Particle.Problem.iteration,
                fitness: Particle.Problem.fitness.current,
                best: Particle.Problem.fitness.best,
                feasible: Particle.Problem.feasible,
                infeasible: Particle.Problem.infeasible,
                status: Particle.Problem.glpk.status,
                position: Particle.Problem.position
            }
        };
    }
    
}