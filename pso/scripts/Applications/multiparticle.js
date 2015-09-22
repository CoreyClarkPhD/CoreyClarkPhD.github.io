importScripts("../jahova/glMatrix.js", "workerUtils.js", "../glpk.js", "../mersenne-twister.js");
var seed = Math.random();


var numOfParticles = 10;

var Particles = [];
var ID = 0;
var Results = [];
var best = {
            type: "Complete",
            data: {
                id: 0,
                iteration: 0,
                fitness: Number.MAX_VALUE,
                best: Number.MAX_VALUE,
                feasible: 0,
                infeasible: 0,
                status: 0,
                position: 0
            }
        }
self.addEventListener('message', function(e) {
    var msg = e.data;
    var result = {type: "ERROR", data: "Error, Unknown Message"};
    if(msg.type.toUpperCase() == "UPDATE"){

        for(var i= 0; i < numOfParticles; i++){
            Particles[i].Update();
            Results[i] = Particles[i].Solve();
            
            if((best.data.fitness > Results[i].data.fitness) ){
                best.data.fitness = Results[i].data.fitness;
                best.data.feasible = Results[i].data.feasible;
                best.data.infeasible = Results[i].data.infeasible;
            }
            if((best.data.best > Results[i].data.best) ){
                best.data.best = Results[i].data.best;
                best.data.position = Results[i].data.position;
            }
        }
        best.data.iteration++;
        self.postMessage(best);
        //best.data.fitness = Number.MAX_VALUE;
    }
    else if(msg.type.toUpperCase() == "FITNESS"){
        for(var i = 0; i < numOfParticles; i++){
            Particles[i].Particle.Problem.fitness.global = msg.data.fitness;
            Particles[i].Particle.Problem.fitness.position.global = msg.data.position;
        }
    }
    else if(msg.type.toUpperCase() == "SOLUTION"){
        result = {type: "Solution", data: Particles[best.data.id].Particle.Problem.solution}
        self.postMessage(result);
    }
    else if(msg.type.toUpperCase() == "INIT"){
        MT = new MersenneTwister(seed * msg.data.id * Math.random());
        
        Init(msg.data)
        ID = msg.data.id;
        best.data.id = ID;

        result = {type: "Init", data: "Thread: " + msg.data.id + " ONLINE: " + Particles.length + " Particles"}
        self.postMessage(result);
    }
    else if(msg.type.toUpperCase() == "PRESOLVE"){
        timeElapsed = Date.now();
        result = Particles[0].PreSolve(msg.data);
        self.postMessage(result);
    }
    else{
        self.postMessage(result);
    }
    
    
    
}, false);

Init = function(data){
    
    //Create Particles
    for(var i = 0; i < numOfParticles; i++){
        var part = new CParticle();
        part.Init(i, data);
        
        Particles.push(part);
    }
}


var CParticle = function(){
    this.Particle = {
        id: null,
        PSO: {
            w: 2,       //Inertia weight
            wMax: 0.9,  //Max Inertia Weight
            wMin: 0.4,  //Min Inertia Weight
            c1: 2,
            c2: 2,
            Vmax: 6,
            maxIterations: 10000
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
        }
    }
    this.Init = function(id, data){
        this.Particle.id = id;
        this.Particle.Problem.files = data.problem.files;
        var arcs = data.problem.position.length;
        this.Particle.Problem.position = [];
        this.Particle.Problem.velocity = [];
        this.Particle.Problem.solution = [];
        this.Particle.Problem.fitness.position.best = [];
        this.Particle.Problem.fitness.position.global = [];
        
        //Initialize glpk problem
        this.Particle.Problem.glpk.prob = glp_create_prob();
        glp_read_lp_from_string(this.Particle.Problem.glpk.prob, null, this.Particle.Problem.files.problemText);
        
        //Scale
        glp_scale_prob(this.Particle.Problem.glpk.prob, GLP_SF_AUTO);
        
        this.Particle.Problem.glpk.smcp = new SMCP({presolve: GLP_ON});
        
        //Initialzie fixed cost
        this.Particle.Problem.glpk.cost = this.Particle.Problem.files.costText.split("\n");
        
        //Build constraints array
        var out ="";
        var j = 1;
        while(this.Particle.Problem.glpk.prob.row[j]){
            if(this.Particle.Problem.glpk.prob.row[j].name.search("cap") >= 0){
                this.Particle.Problem.glpk.constraints.push(this.Particle.Problem.glpk.prob.row[j]);
                this.Particle.Problem.glpk.ub = Number(this.Particle.Problem.glpk.prob.row[j].ub);
             }
            j++;
        }
        
        
        for(var i = 0; i < this.Particle.Problem.glpk.cost.length; i++){
            this.Particle.Problem.glpk.cost[i] =  +this.Particle.Problem.glpk.cost[i];
            
            MT.random() < 0.5 ? this.Particle.Problem.position.push(0) : this.Particle.Problem.position.push(1);
            
            //Update constraints based upon initial position distirbution
            this.Particle.Problem.glpk.constraints[i].ub = this.Particle.Problem.position[i] == 0 ? 0 : this.Particle.Problem.glpk.ub;
            
            //Randomize particle velocity
            this.Particle.Problem.velocity.push(-1*this.Particle.PSO.Vmax + ((2 * this.Particle.PSO.Vmax) * MT.random()));
            
            
            this.Particle.Problem.solution.push(0);
            this.Particle.Problem.fitness.position.best.push(0);
            this.Particle.Problem.fitness.position.global.push(0);
            
        }
        
        
        
        return {type: "Init", data: "this.Particle: " + this.Particle.id + " ONLINE"}
    }.bind(this)
    
    this.Solve = function(){
        glp_simplex(this.Particle.Problem.glpk.prob, this.Particle.Problem.glpk.smcp);
        
        this.Particle.Problem.glpk.status = glp_get_status(this.Particle.Problem.glpk.prob);
        
        if((this.Particle.Problem.glpk.status == GLP_OPT) || (this.Particle.Problem.glpk.status == GLP_FEAS)){
            //Update Positions to match actual arcs used in solution
            for(var i = glp_get_num_cols(this.Particle.Problem.glpk.prob) - 1; i >= 0; i--){
                this.Particle.Problem.position[i] = glp_get_col_prim(this.Particle.Problem.glpk.prob, i + 1) <= 0 ? 0 : 1;
            }
            
            //Calculate Fitness
                //Accumlate fixed cost based upon archs (Position)
            var fixed = 0;
            for(var i = this.Particle.Problem.glpk.cost.length - 1; i >= 0; i--){
                fixed +=  this.Particle.Problem.glpk.cost[i] * this.Particle.Problem.position[i] ;
            }
            
            this.Particle.Problem.fitness.current = this.Particle.Problem.glpk.prob.obj_val + fixed;
            
            if(this.Particle.Problem.fitness.current < this.Particle.Problem.fitness.best){
                //Update Fitness Score
                this.Particle.Problem.fitness.best = this.Particle.Problem.fitness.current;
                
                //Save Problem Solution and Position
                for(var i = glp_get_num_cols(this.Particle.Problem.glpk.prob) - 1; i >= 0; i--){
                    this.Particle.Problem.solution[i] = glp_get_col_prim(this.Particle.Problem.glpk.prob, i + 1);
                    this.Particle.Problem.fitness.position.best[i] = this.Particle.Problem.position[i];
                }
            }
           
            
            //Increment Feasible Count
            this.Particle.Problem.feasible++;
        }
        else{
            this.Particle.Problem.infeasible++;
        }
        
        //Iterate Iteration
        this.Particle.Problem.iteration++;
        if(this.Particle.Problem.iteration > this.Particle.PSO.maxIterations){
            this.Particle.Problem.iteration = this.Particle.PSO.maxIterations;
        }
        
        //Post back to Node
        return {
                    type: "Complete",
                    data: {
                        id: this.Particle.id,
                        iteration: this.Particle.Problem.iteration,
                        fitness: this.Particle.Problem.fitness.current,
                        best: this.Particle.Problem.fitness.best,
                        feasible: this.Particle.Problem.feasible,
                        infeasible: this.Particle.Problem.infeasible,
                        status: this.Particle.Problem.glpk.status,
                        position: this.Particle.Problem.position
                    }
                };
    }.bind(this)
    
    this.Update = function(){
        
        //Update Velocity and Position
        this.Particle.PSO.w = this.Particle.PSO.wMax - this.Particle.Problem.iteration * ((this.Particle.PSO.wMax - this.Particle.PSO.wMin) / this.Particle.PSO.maxIterations);
        
        for(var i = this.Particle.Problem.velocity.length - 1; i >= 0; i--){
            this.Particle.Problem.velocity[i] = (this.Particle.PSO.w * this.Particle.Problem.velocity[i]) +
            this.Particle.PSO.c1* MT.random()* (this.Particle.Problem.fitness.position.best[i] - this.Particle.Problem.position[i]) +
            this.Particle.PSO.c2 * MT.random() * (this.Particle.Problem.fitness.position.global[i] - this.Particle.Problem.position[i]);
            
            if(this.Particle.Problem.velocity[i] > this.Particle.PSO.Vmax){
                this.Particle.Problem.velocity[i] = this.Particle.PSO.Vmax;
            }
            else if(this.Particle.Problem.velocity[i] <  -1*this.Particle.PSO.Vmax){
                this.Particle.Problem.velocity[i] = -1 * this.Particle.PSO.Vmax;
            }
            
            if(MT.random() < (1 / (1 + Math.exp(-1 * this.Particle.Problem.velocity[i])))){
                this.Particle.Problem.position[i] = 1;
            }
            else{
                this.Particle.Problem.position[i] = 0;
            }
            
            //mutation
            if(MT.random() < this.Particle.PSO.mutation){this.Particle.Problem.position[i] = 1 - this.Particle.Problem.position[i] }
        }
        
        //Update Constraints
        for(var i = this.Particle.Problem.position.length - 1; i >= 0; i-- ){
            this.Particle.Problem.glpk.constraints[i].ub = this.Particle.Problem.position[i] == 0 ? 0 : this.Particle.Problem.glpk.ub;
        }

        
    }.bind(this)
    this.PreSolve = function(){
        //Run simplex
        glp_simplex(this.Particle.Problem.glpk.prob, this.Particle.Problem.glpk.smcp);
            
        //Get Status
        this.Particle.Problem.glpk.status = glp_get_status(this.Particle.Problem.glpk.prob);
        
        
        if((this.Particle.Problem.glpk.status == GLP_OPT) || (this.Particle.Problem.glpk.status == GLP_FEAS)){
            for(var i = this.Particle.Problem.position.length - 1; i >= 0; i-- ){
                this.Particle.Problem.position[i] = glp_get_col_prim(this.Particle.Problem.glpk.prob, i + 1) > 0 ? 1 : 0;
                //Update constraint
                this.Particle.Problem.glpk.constraints[i].ub = this.Particle.Problem.position[i] == 0 ? 0 : this.Particle.Problem.glpk.ub;
            }
            
            //Calculate Fitness
                //Accumlate fixed cost based upon archs (Position)
            var fixed = 0;
            for(var i = this.Particle.Problem.glpk.cost.length - 1; i >= 0; i--){
                fixed +=  this.Particle.Problem.glpk.cost[i] * this.Particle.Problem.position[i] ;
            }
            
            this.Particle.Problem.fitness.current = this.Particle.Problem.glpk.prob.obj_val + fixed;
            
                    
            //Update Fitness Score
            this.Particle.Problem.fitness.best = this.Particle.Problem.fitness.current;
            
            //Save Problem Solution and Position
            for(var i = glp_get_num_cols(this.Particle.Problem.glpk.prob) - 1; i >= 0; i--){
                this.Particle.Problem.solution[i] = glp_get_col_prim(this.Particle.Problem.glpk.prob, i + 1);
                this.Particle.Problem.fitness.position.best[i] = this.Particle.Problem.position[i];
            }
        }
        
        //Post back to Node
        return {
            type: "Complete",
            data: {
                id: this.Particle.id,
                iteration: this.Particle.Problem.iteration,
                fitness: this.Particle.Problem.fitness.current,
                best: this.Particle.Problem.fitness.best,
                feasible: this.Particle.Problem.feasible,
                infeasible: this.Particle.Problem.infeasible,
                status: this.Particle.Problem.glpk.status,
                position: this.Particle.Problem.position
            }
    
            }
    }.bind(this)
    

}

