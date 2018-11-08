var CFiniteStateMachine = function(cEntity){
    var owner = cEntity;
    var _CurrentState = new CState();
    var self = this;
    var nextName = "";
    var nextMessage = "";
    var _Enter = function(oMessage){
        _CurrentState.Enter(owner, oMessage);
    }
    
    var _Exit = function(oMessage){
        _CurrentState.Exit(owner, oMessage);
    }
    
    var _Execute = function(oMessage){
        _CurrentState.Execute(owner, oMessage);
    }
    
    //Control Methods
    this.AnimatedTransition = function(sName, oMessage){
        nextName = sName;
        nextMessage = oMessage;
        gtl.app.className = "app flyOut";
        gtl.app.addEventListener('webkitTransitionEnd', gtl.FSM.Animate, false);
    }
    
    this.Animate = function(sName, oMessage){
        //Remove Event Listener
        gtl.app.removeEventListener('webkitTransitionEnd', gtl.FSM.Animate, false);
        
        //Hide Current State Div
        gtl.States[gtl.FSM.GetState()].html.className = "hide";
        
        //Call Exit for Current State
        _Exit(nextMessage);
        
        //Set Next State Visible
        gtl.States[nextName].html.className = "";
        
        //Get New State to Transition Too
        _CurrentState = gtl.States[nextName];
        
        //Transition
        gtl.app.className = "app flyIn";
        
        //Call New States Setup and Exectue Methods
        _Enter(nextMessage);
        _Execute(nextMessage);
    }
    
    this.Transition = function(sName, oMessage){
        //Call Exit for Current State
        _Exit(oMessage);
        
        //Hide Current State Div
        gtl.States[gtl.FSM.GetState()].html.className = "hide";
        
        //Get New State to Transition Too
        _CurrentState = gtl.States[sName];
        
        //Set Next State Visible
        gtl.States[sName].html.className = "";
        
        //Call New States Setup and Exectue Methods
        _Enter(oMessage);
        _Execute(oMessage);
    }
    this.SetState = function(sName){
        _CurrentState = gtl.States[sName];
        gtl.States[sName].html.className = "";
    }
    this.Update = function(oMessage){
        _Execute(oMessage);
    }
    this.GetState = function(){
        return _CurrentState.GetName();
    }
}

// States for FSM
var CState = function(sName){
    var _name = sName;
    var self = this;
    
    this.Enter = function(cEntity, oMessage){
        //Override this Method
    }
    
    this.Exit = function(cEntity, oMessage){
        //Override this Method
    }
    
    this.Execute = function(cEntity, oMessage){
        //Override this Method
    }
    
    this.GetName = function(){
        return _name;
    }

}


Application = function(){
    os = com.jahova.os.Instance();
    
    (gtl.Menu = gtlMenu()).Load();
    gtl.app = document.getElementById("app");
    
    gtl.Load.States();
    gtl.Load.Events();
    gtl.FSM.SetState("SNodeSelect");
    document.getElementById("openModal").className = "modalDialog";
    //gtl.Modal.Show();
}
var CParticle = function(){
    this.worker = 0;
    this.data = {};
}
gtl = {
    Menu: null,
    startTime: 0,
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
            cost: null,
            status: null,
            constraints: [],
            ub: 0
        },
        position: [],
        velocity: [],
        solution: [],
        feasible: 0,
        infeasible: 0,
        iteration: 0,
        fitness: {
            current: Number.MAX_VALUE,
            best: Number.MAX_VALUE,
            global: Number.MAX_VALUE,
            position: {
                best: [],
                global: []
            }
        }
    },
    FSM: new CFiniteStateMachine(),
    States: {},
    //domain: 'http://172.20.10.2:8000',
    //domain: 'http://127.0.0.1:8000',
    //domain:'http://gametheorylabs.com:8000',
    domain: 'http://server.coreyclarkphd.com:8000',
    Modal: {
        Show: function(){window.location = "#openModal";},
        Hide: function(){window.location = "#closeModal";}
    },
    Network: {
        Nodes: [],
        Process: [],
        Control: [],
        Desktop: 0,
        Laptop: 0,
        Tablet: 0,
        Phone: 0
    },
    Node: {
        id: 'unknown',
        type: 'unknown',
        Device: {
            type: 'unknown',
            os: 'unknown',
            particleCount: 0
        },
        Fitness: {
            global: Number.MAX_VALUE,
            particle: Number.MAX_VALUE,
            pPosition: [],
            gPosition: [],
            id: 0
        },
        solution: "",
        Particles: [],
        loaded: 0,
        status: "IDLE",
        Socket: 'unknown'
    },
    Update: {
        ElapsedTime: function(){
            var time = (((new Date()).getTime() - gtl.startTime)/1000).toFixed(2);
            document.getElementById("network-problem-elapsed").value = time+"sec";
            if(gtl.Node.status == "RUNNING"){
                setTimeout(gtl.Update.ElapsedTime, 1000);
            }
        },
        Network: function(){
            gtl.Network.Desktop = 0;
            gtl.Network.Laptop = 0;
            gtl.Network.Tablet = 0;
            gtl.Network.Phone = 0;
            
            for(var i = gtl.Network.Nodes.length - 1; i >= 0; i--){
                var node = gtl.Network.Nodes[i];
                if(node.type == "PROCESS"){
                    if(node.Device.type == "DESKTOP"){
                        gtl.Network.Desktop++;
                    }
                    else if(node.Device.type == "LAPTOP"){
                        gtl.Network.Laptop++;
                    }
                    else if(node.Device.type == "TABLET"){
                        gtl.Network.Tablet++;
                    }
                    else if(node.Device.type == "PHONE"){
                        gtl.Network.Phone++;
                    }
                }
            }
            
            document.getElementById("nodes-desktop").innerHTML = gtl.Network.Desktop;
            document.getElementById("nodes-laptop").innerHTML = gtl.Network.Laptop;
            document.getElementById("nodes-tablet").innerHTML = gtl.Network.Tablet;
            document.getElementById("nodes-phone").innerHTML = gtl.Network.Phone;
            
        }
    },
    Events: {
        Particles: function(e){
            var msg = e.data;
            
            if(msg.type.toUpperCase() == "COMPLETE"){
                //If Fitness is better than particle, save it along with Particle ID
                if(msg.data.best < gtl.Node.Fitness.particle){
                    document.getElementById('node-problem-fitness').value = msg.data.best.toFixed(1);
                    gtl.Node.Fitness.particle = msg.data.best;
                    gtl.Node.Fitness.pPosition = msg.data.position;
                    gtl.Node.Fitness.id = msg.data.id;
                    gtl.Set.Problem.Fitness();
                }
                
                //Save Message Data
                gtl.Node.Particles[msg.data.id].data = msg.data;
                
                if(gtl.Node.status == "PROCESS"){
                    gtl.Node.Particles[msg.data.id].worker.postMessage({type: "Update", data: {}});
                }
                
                //Update View
                document.getElementById(msg.data.id + '-iteration').innerHTML = msg.data.feasible + msg.data.infeasible
                document.getElementById(msg.data.id + '-fitness').innerHTML = msg.data.fitness < Number.MAX_VALUE ? msg.data.fitness.toFixed(2) : 0;
                document.getElementById(msg.data.id + '-best').innerHTML = msg.data.best < Number.MAX_VALUE ? msg.data.best.toFixed(2) : 0;
                document.getElementById(msg.data.id + '-feasible').innerHTML = msg.data.feasible
                document.getElementById(msg.data.id + '-infeasible').innerHTML = msg.data.infeasible
                document.getElementById(msg.data.id + '-percent').innerHTML = (100 * msg.data.feasible / (msg.data.feasible + msg.data.infeasible)).toFixed(2);
                
                
                //os.console.Comment("\n"+ JSON.stringify(msg.data, null, "\t"));
            }
            else if(msg.type.toUpperCase() == "SOLUTION"){
                os.console.Comment("\n"+ JSON.stringify(msg.data, null, "\t"));
            }
            else if(msg.type.toUpperCase() == "INIT"){
                os.console.Comment(msg.data);
                gtl.Node.loaded++
                if(gtl.Node.loaded == gtl.Node.Particles.length){
                    document.getElementById('node-problem-loaded').className = "led-green";
                }
            }
            else if(msg.type.toUpperCase() == "BRANCH"){
                os.debugbar.AnchorConsolePage();
                os.console.Comment("\n"+ JSON.stringify(msg.data, null, "\t"));
                os.console.Comment("Total Time: " + ((msg.data.end - msg.data.start)/1000).toFixed(2) + "sec" );
            }
            
        },
        Connect: function(){
            os.console.Comment("\nConnected To GEnSS");
            document.getElementById('network-status').innerHTML = "... Registering ...";
            gtl.Node.Socket.emit('register', {type: gtl.Node.type, Device: gtl.Node.Device });
            
        },
        Register: function(data){
            os.console.Comment("\nRegistered on GEnSS");
            gtl.Node.id = data.id;
            document.getElementById('network-status').innerHTML = "Registered As " + gtl.Node.type;
            gtl.Node.Socket.on('fitness', gtl.Events.Fitness);
            if(gtl.Node.type == "PROCESS"){
                gtl.Node.Socket.on('problem', gtl.Events.Problem);
                gtl.Node.Socket.on('start', gtl.Events.Start);
                gtl.Node.Socket.on('stop', gtl.Events.Stop);
                
                gtl.FSM.AnimatedTransition("SProcessing");
            }
            else{
                gtl.FSM.AnimatedTransition("SControl");
            }
            
            gtl.Node.Socket.emit('stats', {});
        },
        Stats: function(data){
            data = JSON.parse(data);
            gtl.Network.Nodes = data.Nodes;
            gtl.Network.Control = data.Control;
            gtl.Network.Process = data.Process;
            
            gtl.Update.Network();
            
            os.console.Comment("\nStats Received\n" + "Nodes: " + data.Nodes.length + "\nProcess: " + data.Process.length + "\nControl: " + data.Control.length);
        },
        Disconnect: function(){
            os.console.Comment("\nDisconnected from GEnSS");
        },
        Problem: function(params){
            
            //os.console.Comment("Requesting:\n" + filepath);
            gtl.Problem.files.problemPath = params.file;
            gtl.Problem.files.costPath = params.cost;
            
            var xhrProblem = os.resschmgr.Create.XHRObject();
            xhrProblem.open('GET',params.file,false);
            xhrProblem.onreadystatechange = function(){
              if(xhrProblem.readyState==4){ //4==DONE
                    if(xhrProblem.status == 200)
                    {
                        
                        gtl.Problem.files.problemText = xhrProblem.responseText;
                        
                        //Set Load Node to Green and Particle Count
                        if(gtl.Problem.files.problemText && (gtl.Problem.files.costText) ){
                            gtl.Node.Device.particleCount = params[gtl.Node.Device.type]|0;
                            document.getElementById('node-particles').innerHTML = params[gtl.Node.Device.type];
                            if(gtl.Node.Particles.length == 0 ){gtl.Load.Particles()}
                        }
                        
                        
                    }
                    else{
                        os.windows.Create.ErrorWindow('Problem Load Failure', "Could Not Load Problem: " + gtl.PSO.files.problemPath);
                    }
              }
                
            }.bind(this);
            
            xhrProblem.send();
            
            var xhrCost = os.resschmgr.Create.XHRObject();
            xhrCost.open('GET',params.cost,false);
            xhrCost.onreadystatechange = function(){
              if(xhrCost.readyState==4){ //4==DONE
                    if(xhrCost.status == 200)
                    {
                        gtl.Problem.files.costText = xhrCost.responseText;
                       
                        //Set Load Node to Green and Particle Count
                        if(gtl.Problem.files.problemText && (gtl.Problem.files.costText) ){
                            gtl.Node.Device.particleCount = params[gtl.Node.Device.type]|0;
                            document.getElementById('node-particles').innerHTML = params[gtl.Node.Device.type];
                            if(gtl.Node.Particles.length == 0 ){gtl.Load.Particles()}
                        }
                        
                    }
                    else{
                        os.windows.Create.ErrorWindow('Problem Load Failure', "Could Not Load Fixed Cost: " + gtl.PSO.files.costPath);
                    }
              }
                
            }.bind(this);
            
            xhrCost.send();
            
        },
        Start: function(data){
            //Set Load Node to Green and Particle Count
            document.getElementById('node-problem-running').className = "led-green";
            
            gtl.Node.status = "PROCESS";
            gtl.Node.Particles[0].worker.postMessage({type: "PreSolve", data: {}});
            //Start Particles
            for(var i = 1; i < gtl.Node.Particles.length; i++){
                gtl.Node.Particles[i].worker.postMessage({type: "Update", data: {}});
            }
            
            
            
        },
        Stop: function(data){
            gtl.Node.status = "IDLE";
            document.getElementById('node-problem-running').className = "led-red";
        },
        Fitness: function(data){
            gtl.Node.Fitness.global = data.fitness;
            gtl.Node.Fitness.gPosition = data.position;
            
            if(gtl.Node.type == "PROCESS"){
                document.getElementById('global-problem-fitness').value = data.fitness.toFixed(1);
                for(var i = gtl.Node.Particles.length - 1; i >= 0; i--){
                    gtl.Node.Particles[i].worker.postMessage({type: "Fitness", data:{fitness: data.fitness, position: data.position}});
                }
            }
            else{
                document.getElementById('network-problem-fitness').value = data.fitness.toFixed(3);
                document.getElementById('network-problem-time').value = ((data.update - data.start)/1000).toFixed(2) + "sec";
            }
            
        }
    },
    Set: {
        Problem: {
            Type: function(){
                gtl.Modal.Show();
                document.getElementById('ProblemSet').className = "NodalProblemSet";
            },
            Start: function(){
                
                
                gtl.Node.Socket.emit('start');
                gtl.Node.status = "RUNNING";
                gtl.startTime = (new Date()).getTime();
                
                gtl.Update.ElapsedTime();
            
                
            },
            Stop: function(){
                
            
                gtl.Node.Socket.emit('stop');
                gtl.Node.status = "IDLE";
                
            },
            Fitness: function(){
                //Send updated fitness and position to sever
                gtl.Node.Socket.emit('fitness', {fitness: gtl.Node.Fitness.particle, position: gtl.Node.Fitness.pPosition});
            },
            Size: {
                Small: function(){
                    gtl.Modal.Hide();
                    document.getElementById('ProblemSet').className = "NodalProblemSet hide";
                    
                    var output = {};
                    output.DESKTOP = document.getElementById('part-desktop').value;
                    output.LAPTOP = document.getElementById('part-laptop').value;
                    output.TABLET = document.getElementById('part-tablet').value;
                    output.PHONE = document.getElementById('part-phone').value;
                    output.file  = 'models/100_2_3_model.cpx';
                    output.cost  = 'models/100_2_3_cost.cpx';
                    
                    gtl.Node.Socket.emit('problem', output);
                },
                Medium: function(){
                    gtl.Modal.Hide();
                    document.getElementById('ProblemSet').className = "NodalProblemSet hide";
                    
                    var output = {};
                    output.DESKTOP = document.getElementById('part-desktop').value;
                    output.LAPTOP = document.getElementById('part-laptop').value;
                    output.TABLET = document.getElementById('part-tablet').value;
                    output.PHONE = document.getElementById('part-phone').value;
                    output.file  = 'models/100_5_6_model.cpx';
                    output.cost  = 'models/100_5_6_cost.cpx';
                    
                    gtl.Node.Socket.emit('problem', output);
                },
                Large: function(){
                    gtl.Modal.Hide();
                    document.getElementById('ProblemSet').className = "NodalProblemSet hide";
                    
                    var output = {};
                    output.DESKTOP = document.getElementById('part-desktop').value;
                    output.LAPTOP = document.getElementById('part-laptop').value;
                    output.TABLET = document.getElementById('part-tablet').value;
                    output.PHONE = document.getElementById('part-phone').value;
                    output.file  = 'models/100_10_21_model.cpx';
                    output.cost  = 'models/100_10_21_cost.cpx';
                    
                    gtl.Node.Socket.emit('problem', output);
                },
                Custom: function(){
                    gtl.Modal.Hide();
                    document.getElementById('ProblemSet').className = "NodalProblemSet hide";
                    
                    var output = {};
                    output.DESKTOP = document.getElementById('part-desktop').value;
                    output.LAPTOP = document.getElementById('part-laptop').value;
                    output.TABLET = document.getElementById('part-tablet').value;
                    output.PHONE = document.getElementById('part-phone').value;
                    output.file  = document.getElementById("custom-problem-file").value;
                    output.cost  = document.getElementById("custom-cost-file").value;
                    
                    gtl.Node.Socket.emit('problem', output);
                }
            }
        },
        Node: {
            Type: {
                Control: function(){
                    gtl.Node.type = "CONTROL";
                    gtl.FSM.AnimatedTransition("SDeviceSelect");
                },
                Process: function(){
                    gtl.Node.type = "PROCESS";
                    gtl.FSM.AnimatedTransition("SDeviceSelect");
                }
            },
            Device: {
                Type: {
                    Desktop: function(){
                        gtl.Node.Device.type = "DESKTOP";
                        gtl.FSM.AnimatedTransition("SOSSelect");
                    },
                    Laptop: function(){
                        gtl.Node.Device.type = "LAPTOP";
                        gtl.FSM.AnimatedTransition("SOSSelect");
                    },
                    Tablet: function(){
                        gtl.Node.Device.type = "TABLET";
                        gtl.FSM.AnimatedTransition("SOSSelect");
                    },
                    Phone: function(){
                        gtl.Node.Device.type = "PHONE";
                        gtl.FSM.AnimatedTransition("SOSSelect");
                    }
                },
                OS: {
                    Apple: function(){
                        gtl.Node.Device.os = "APPLE";
                        gtl.FSM.AnimatedTransition("SNetworkRegister");
                    },
                    Windows: function(){
                        gtl.Node.Device.os = "WINDOWS";
                        gtl.FSM.AnimatedTransition("SNetworkRegister");
                    },
                    Linux: function(){
                        gtl.Node.Device.os = "LINUX";
                        gtl.FSM.AnimatedTransition("SNetworkRegister");
                    },
                    Android: function(){
                        gtl.Node.Device.os = "ANDROID";
                        gtl.FSM.AnimatedTransition("SNetworkRegister");
                    }
                }
            }
        }
        
        
    },
    Load: {
        Particles: function(){
            
            for(var i = 0; i < gtl.Node.Device.particleCount; i++){
                var part = new CParticle();
                part.worker = new Worker('scripts/Applications/particle.js');
                part.worker.addEventListener('message', gtl.Events.Particles);
                part.worker.addEventListener('error', function(e){
                    os.console.AppendComment('Particle ERROR:');
                    os.console.AppendComment('Line: ' + e.lineno);
                    os.console.AppendComment('Message: ' + e.message);
                    os.console.Comment("");
                }, false);
                
                gtl.Node.Particles.push(part);
                
                //Init Worker
                part.worker.postMessage({type: "Init", data: {id: i, problem: gtl.Problem}});
            }
            
            var html = "";
            
            var AddRow = function(id){
                return "<tr>" +
                    "<td>" + id +"</td>" +
                    "<td id='" + id + "-iteration'>"+ 0 +"</td>" +
                    "<td id='" + id + "-fitness'>"+ 0.0 +"</td>" +
                    "<td id='" + id + "-best'>"+ 0.0 +"</td>" +
                    "<td id='" + id + "-feasible'>"+ 0   +"</td>" +
                    "<td id='" + id + "-infeasible'>"+ 0   +"</td>" +
                    "<td id='" + id + "-percent'>"+ 0.0 +"</td>" +
                "</tr>";
            }
            
            var AddAltRow = function(id){
                return "<tr class='alt'>" +
                    "<td>" + id +"</td>" +
                    "<td id='" + id + "-iteration'>"+ 0 +"</td>" +
                    "<td id='" + id + "-fitness'>"+ 0.0 +"</td>" +
                    "<td id='" + id + "-best'>"+ 0.0 +"</td>" +
                    "<td id='" + id + "-feasible'>"+ 0   +"</td>" +
                    "<td id='" + id + "-infeasible'>"+ 0   +"</td>" +
                    "<td id='" + id + "-percent'>"+ 0.0 +"</td>" +
                    
                "</tr>";
            }
            
            //Add Table Header
            html = "<p>Particle Details</p><table><thead><tr><th>ID</th><th>Iterations</th><th>Fitness</th><th>Best</th><th>Feasible</th><th>Infeasbile</th><th>Percent</th></tr></thead><tbody>"
            
            for(var i = 0; i < gtl.Node.Particles.length; i++){
                if(i%2){
                    html += AddRow(i);
                }
                else{
                    html += AddAltRow(i);
                }
            }
            
            html += "</tbody></table>";
            document.getElementById("node-overview").innerHTML += html;
            
        },
        Events: function(){
            //Node Type
            document.getElementById('node-select-control').addEventListener('click', gtl.Set.Node.Type.Control);
            document.getElementById('node-select-control').addEventListener('touchend', gtl.Set.Node.Type.Control);
            document.getElementById('node-select-process').addEventListener('click', gtl.Set.Node.Type.Process);
            document.getElementById('node-select-process').addEventListener('touchend', gtl.Set.Node.Type.Process);
            
            //Device Type
            document.getElementById('node-select-desktop').addEventListener('click', gtl.Set.Node.Device.Type.Desktop);
            document.getElementById('node-select-desktop').addEventListener('touchend', gtl.Set.Node.Device.Type.Desktop);
            document.getElementById('node-select-laptop').addEventListener('click', gtl.Set.Node.Device.Type.Laptop);
            document.getElementById('node-select-laptop').addEventListener('touchend', gtl.Set.Node.Device.Type.Laptop);
            document.getElementById('node-select-tablet').addEventListener('click', gtl.Set.Node.Device.Type.Tablet);
            document.getElementById('node-select-tablet').addEventListener('touchend', gtl.Set.Node.Device.Type.Tablet);
            document.getElementById('node-select-phone').addEventListener('click', gtl.Set.Node.Device.Type.Phone);
            document.getElementById('node-select-phone').addEventListener('touchend', gtl.Set.Node.Device.Type.Phone);
            
            //Device OS
            document.getElementById('node-select-apple').addEventListener('click', gtl.Set.Node.Device.OS.Apple);
            document.getElementById('node-select-apple').addEventListener('touchend', gtl.Set.Node.Device.OS.Apple);
            document.getElementById('node-select-windows').addEventListener('click', gtl.Set.Node.Device.OS.Windows);
            document.getElementById('node-select-windows').addEventListener('touchend', gtl.Set.Node.Device.OS.Windows);
            document.getElementById('node-select-linux').addEventListener('click', gtl.Set.Node.Device.OS.Linux);
            document.getElementById('node-select-linux').addEventListener('touchend', gtl.Set.Node.Device.OS.Linux);
            document.getElementById('node-select-android').addEventListener('click', gtl.Set.Node.Device.OS.Android);
            document.getElementById('node-select-android').addEventListener('touchend', gtl.Set.Node.Device.OS.Android);
            
            //Node Type
            document.getElementById('network-problem-set').addEventListener('click', gtl.Set.Problem.Type);
            document.getElementById('network-problem-set').addEventListener('touchend', gtl.Set.Problem.Type);
            document.getElementById('network-problem-start').addEventListener('click', gtl.Set.Problem.Start);
            document.getElementById('network-problem-start').addEventListener('touchend', gtl.Set.Problem.Start);
            document.getElementById('network-problem-stop').addEventListener('click', gtl.Set.Problem.Stop);
            document.getElementById('network-problem-stop').addEventListener('touchend', gtl.Set.Problem.Stop);
            
            //Set Problem Size
            document.getElementById('set-problem-small').addEventListener('click', gtl.Set.Problem.Size.Small);
            document.getElementById('set-problem-small').addEventListener('touchend', gtl.Set.Problem.Size.Small);
            document.getElementById('set-problem-medium').addEventListener('click', gtl.Set.Problem.Size.Medium);
            document.getElementById('set-problem-medium').addEventListener('touchend', gtl.Set.Problem.Size.Medium);
            document.getElementById('set-problem-large').addEventListener('click', gtl.Set.Problem.Size.Large);
            document.getElementById('set-problem-large').addEventListener('touchend', gtl.Set.Problem.Size.Large);
            document.getElementById('set-problem-custom').addEventListener('click', gtl.Set.Problem.Size.Custom);
            document.getElementById('set-problem-custom').addEventListener('touchend', gtl.Set.Problem.Size.Custom);
            
        },
        States: function(){
            //
            //  Node Select State
            gtl.States.SNodeSelect = new CState("SNodeSelect");
            gtl.States.SNodeSelect.html = document.getElementById("SNodeSelect");
            gtl.States.SNodeSelect.Enter = function(){
                
            }
            gtl.States.SNodeSelect.Execute = function(){
                
            }
            gtl.States.SNodeSelect.Exit = function(){
                
            }
            
            //
            //  Device Select State
            gtl.States.SDeviceSelect = new CState("SDeviceSelect");
            gtl.States.SDeviceSelect.html = document.getElementById("SDeviceSelect");
            gtl.States.SDeviceSelect.Enter = function(){
                
            }
            gtl.States.SDeviceSelect.Execute = function(){
                
            }
            gtl.States.SDeviceSelect.Exit = function(){
                
            }
            //
            //  OS Select State
            gtl.States.SOSSelect = new CState("SOSSelect");
            gtl.States.SOSSelect.html = document.getElementById("SOSSelect");
            gtl.States.SOSSelect.Enter = function(){
                
            }
            gtl.States.SOSSelect.Execute = function(){
                
            }
            gtl.States.SOSSelect.Exit = function(){
                
            }
            //
            //  Network Register State
            gtl.States.SNetworkRegister = new CState("SNetworkRegister");
            gtl.States.SNetworkRegister.html = document.getElementById("SNetworkRegister");
            gtl.States.SNetworkRegister.Enter = function(){
                if(gtl.Node.Socket == 'unknown'){
                    gtl.Node.Socket = io.connect(gtl.domain);
                    gtl.Node.Socket.on('connect', gtl.Events.Connect);
                    gtl.Node.Socket.on('register', gtl.Events.Register);
                    gtl.Node.Socket.on('stats', gtl.Events.Stats);
                    gtl.Node.Socket.on('disconnect', gtl.Events.Disconnect);
                }
            }
            gtl.States.SNetworkRegister.Execute = function(){
                
            }
            gtl.States.SNetworkRegister.Exit = function(){
                
            }
            //
            //  Processing State
            gtl.States.SProcessing = new CState("SProcessing");
            gtl.States.SProcessing.html = document.getElementById("SProcessing");
            gtl.States.SProcessing.Enter = function(){
                
            }
            gtl.States.SProcessing.Execute = function(){
                
            }
            gtl.States.SProcessing.Exit = function(){
                
            }
            //
            //  Control State
            gtl.States.SControl = new CState("SControl");
            gtl.States.SControl.html = document.getElementById("SControl");
            gtl.States.SControl.Enter = function(){
               
            }
            gtl.States.SControl.Execute = function(){
                
            }
            gtl.States.SControl.Exit = function(){
                
            }
        }
    }
}