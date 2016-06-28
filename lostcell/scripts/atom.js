var jos = os; //Hello World
var Atom = {
	Init: function(){
		Atom.Load.HTML();
		Atom.Connect();

		//Atom.Start();
		os.debugbar.Disable();

	},
	active: false,
	timeSinceNetworkTraffic: 0,
	networkUpdateInterval: 30000,
	socket: null,
	globals: null,
	Connect: function(){

		Atom.Players = new CMap();
		Atom.socket = new WebSocket("ws://bmtsock-bluehelix.rhcloud.com:8000");
		Atom.socket.onopen = function(e){
			Atom.timeSinceNetworkTraffic = Date.now();
			var pkt = new CDiCEPacket();
			pkt.type = 6; //Admin packet
			Atom.socket.send(pkt.serialize());
			Atom.active = true;
		}
		Atom.socket.onmessage = Atom.HandleMessage;
	},
	HandleMessage: function(msg){
		Atom.timeSinceNetowrkTraffic = Date.now();
		var pkt = new CDiCEPacket(msg.data);
		// Type: 3
		// Int1: PlayerID
		// Int2: GRN ID
		// iArray[0]: time
		// Float1: BDe
		// Float2: normalized BDe
		// String1: network
		//console.log("Got message");
		if(pkt.type == 3){ //Solution
			var player = Atom.Players.get(pkt.int1);
			var soln =  new CSolution(pkt);
			if(player){//Player Exist
				player.solutions.push(soln);
				if(player.solutions.length > 100){player.solutions.shift();}
			}
			else{ //New player
				player = new CPlayer();
				console.log("Player: " + pkt.string2 + " ID: " + pkt.int1);
				console.log("Prob: " + pkt.int2);
				player.Profile.id = pkt.int1;
				player.Profile.name = pkt.string2;
				player.Problem.id = pkt.int2;
				Atom.Players.put(player.Profile.id, player);
				Atom.pArray.push(player);
				player.id = Atom.pArray.length;
				if(Atom.pArray.length > 5){Atom.pArray.shift()}
			}

			player.last = soln.score;
			Atom.globals.push({score: soln.score, name: player.Profile.name}, soln.score);
			Atom.globals.sort();
			if(Atom.globals.size() > 5){
				Atom.globals.content.length = 5;
			}
			
		}
		if(Atom.firstPacket){
			Atom.firstPacket = false;
			var pl = Atom.Data.d1;
			var p2 = Atom.Data.d2;
			var p3 = Atom.Data.d3;
			var p4 = Atom.Data.d4;
			var p5 = Atom.Data.d5;
			for(var i = 0; i < 100; i++){
				Atom.HTML.chart.datasets[0].setPointData(i, soln.time, soln.score, 1);
				Atom.HTML.chart.datasets[1].setPointData(i, soln.time, soln.score, 1);
				Atom.HTML.chart.datasets[2].setPointData(i, soln.time, soln.score, 1);
				Atom.HTML.chart.datasets[3].setPointData(i, soln.time, soln.score, 1);
				Atom.HTML.chart.datasets[4].setPointData(i, soln.time, soln.score, 1);
			}
			
		}


	},
	firstPacket: true,
	pArray: [],
	Players: null,
	Load: {
		HTML: function(){
			Atom.HTML.canvas = document.getElementById('canvas');
			Atom.HTML.ctx = Atom.HTML.canvas.getContext('2d');
			Atom.HTML.ss.src = "./images/LostCell/Atom/8Cell_MasterSpriteSheet.png";
			Atom.HTML.ss.addEventListener('load', Atom.Start, false);

			Atom.Data.datasets.push(Atom.Data.d5);
			Atom.Data.datasets.push(Atom.Data.d4);
			Atom.Data.datasets.push(Atom.Data.d3);
			Atom.Data.datasets.push(Atom.Data.d2);
			Atom.Data.datasets.push(Atom.Data.d1);

			Chart.defaults.global.animation = false;
			//Chart.defaults.global.defaultColor =  'rgb(240, 248, 255, 1)';

			Atom.HTML.chartCtx = document.getElementById("myChart").getContext("2d");
			for(var i = 0; i < 100; i++){
				Atom.Data.d1.data.push({ x: 0.0, y: 0.0, r:1 });
				Atom.Data.d2.data.push({ x: 0.0, y: 0.0, r:1 });
				Atom.Data.d3.data.push({ x: 0.0, y: 0.0, r:1 });
				Atom.Data.d4.data.push({ x: 0.0, y: 0.0, r:1 });
				Atom.Data.d5.data.push({ x: 0.0, y: 0.0, r:1 });
			}
			options={};
			Atom.HTML.chart = new Chart(Atom.HTML.chartCtx).Scatter(Atom.Data.datasets, options);

			Atom.Data.globals.push({player:"Name", score: -80000});
			Atom.Data.globals.push({player:"Name", score: -80000});
			Atom.Data.globals.push({player:"Name", score: -80000});
			Atom.Data.globals.push({player:"Name", score: -80000});
			Atom.Data.globals.push({player:"Name", score: -80000});

			Atom.globals = CPriorityQueue({low: true});
		}
	},
	HTML: {
		ss: new Image(),
		canvas: null,
		ctx: null,
		chart: null,
		chartCtx: null,
		Data: {
		}
	},
	Data: {
		data: {
			labels: []
		},	
		globals: [],
		datasets: [],	
		d1: {
			connected: false,
			label: "Drone 1",
			username: "",
			score: 0.0,
			fillColor: "rgba(255, 0,0,0.2)",//255, 69, 0, 0.2)",
			strokeColor: "rgba(255, 0,0,0.2)",//"#FF4500", //"rgba(220,220,220,1)",
			pointColor: "rgba(255, 0,0,0.2)",//"#FF4500", //"rgba(220,220,220,1)",
			pointStrokeColor: "rgba(255, 0,0,0.2)",//"#FF4500", //"#fff",
			pointHighlightFill: "rgba(255, 0,0,0.2)",//"#FF4500", //"#fff",
			pointHighlightStroke: "rgba(255, 0,0,0.2)",//"rgba(220,220,220,1)",
			data: [  ]
		},
		d2: {
			connected: false,
			label: "Drone 2",
			username: "",
			score: 0.0,
			fillColor: "rgba(0, 255, 0, 0.2)",//151,187,205,0.2)",
			strokeColor: "rgba(0, 255, 0, 0.2)",//"#CC5B94",
			pointColor: "rgba(0, 255, 0, 0.2)",//"#CC5B94",
			pointStrokeColor: "rgba(0, 255, 0, 0.2)",//"#CC5B94",
			pointHighlightFill: "rgba(0, 255, 0, 0.2)",//"#CC5B94",
			pointHighlightStroke: "rgba(0, 255, 0, 0.2)",//"rgba(204, 91, 148, 0.2)",
			data: []
		},
		d3: {
			connected: false,
			label: "Drone 3",
			username: "",
			score: 0.0,
			fillColor: "rgba(0,0,255,0.2)",//187,151,205,0.2)",
			strokeColor: "rgba(0,0,255,0.2)",//"#0DDA00",
			pointColor: "rgba(0,0,255,0.2)",//"#0DDA00",
			pointStrokeColor: "rgba(0,0,255,0.2)",//"#0DDA00",
			pointHighlightFill: "rgba(0,0,255,0.2)",//"#0DDA00",
			pointHighlightStroke: "rgba(0,0,255,0.2)",//"rgba(13, 218, 0, 0.2)",
			data: []
		},
		d4: {
			connected: false,
			label: "",
			username: "",
			score: 0.0,
			fillColor: "rgba(0,0,0,0.8)",//151,205,187,0.2)",
			strokeColor: "rgba(0,0,0,0.8)",//"#2D2F6B",
			pointColor: "rgba(0,0,0,0.8)",//"#2D2F6B",
			pointStrokeColor: "rgba(0,0,0,0.8)",//"#2D2F6B",
			pointHighlightFill: "rgba(0,0,0,0.8)",//"#2D2F6B",
			pointHighlightStroke: "rgba(0,0,0,0.8)",//"rgba(45, 47, 107, 0.2)",
			data: []
		},
		d5: {
			connected: false,
			label: "",
			username: "",
			score: 0.0,
			fillColor: "rgba(255, 0, 255, 0.2)", //151,5,205,0.2)",
			strokeColor: "rgba(255, 0, 255, 0.2)", //"#2D2F6B",
			pointColor: "rgba(255, 0, 255, 0.2)", //"#2D2F6B",
			pointStrokeColor: "rgba(255, 0, 255, 0.2)", //"#2D2F6B",
			pointHighlightFill: "rgba(255, 0, 255, 0.2)", //"#2D2F6B",
			pointHighlightStroke: "rgba(255, 0, 255, 0.2)", //"rgba(45, 47, 107, 0.2)",
			data: [ ]
		}
	},
	Draw: {
		Data: {
			GlobalScoreNames: function(){
				var p1,p2,p3,p4,p5;
				p1 = Atom.globals.content[0];
				p2 = Atom.globals.content[1];
				p3 = Atom.globals.content[2];
				p4 = Atom.globals.content[3];
				p5 = Atom.globals.content[4];


				Atom.HTML.ctx.font      = '18pt zekton_rg_1';
				Atom.HTML.ctx.fillStyle = '#303035';
				Atom.HTML.ctx.fillText  ((p1 ? p1.object.name : ""), 176, 193);
				Atom.HTML.ctx.fillText  ((p2 ? p2.object.name : ""), 176, 224);
				Atom.HTML.ctx.fillText  ((p3 ? p3.object.name : ""), 176, 257);
				Atom.HTML.ctx.fillText  ((p4 ? p4.object.name : ""), 176, 289);
				Atom.HTML.ctx.fillText  ((p5 ? p5.object.name : ""), 176, 321);
			},
			GlobalScores: function(){
				var p1,p2,p3,p4,p5;
				p1 = Atom.globals.content[0];
				p2 = Atom.globals.content[1];
				p3 = Atom.globals.content[2];
				p4 = Atom.globals.content[3];
				p5 = Atom.globals.content[4];

				Atom.HTML.ctx.font      = '18pt zekton_rg_1';
				Atom.HTML.ctx.fillStyle = '#303035';
				Atom.HTML.ctx.fillText  ((p1 ? p1.object.score.toFixed(2) : ""), 348, 193);
				Atom.HTML.ctx.fillText  ((p2 ? p2.object.score.toFixed(2) : ""), 348, 224);
				Atom.HTML.ctx.fillText  ((p3 ? p3.object.score.toFixed(2) : ""), 348, 257);
				Atom.HTML.ctx.fillText  ((p4 ? p4.object.score.toFixed(2) : ""), 348, 289);
				Atom.HTML.ctx.fillText  ((p5 ? p5.object.score.toFixed(2) : ""), 348, 321);
			},
			UserScoresUsernames: function(){
				var p1,p2,p3,p4,p5;
				p1 = Atom.pArray[0];
				p2 = Atom.pArray[1];
				p3 = Atom.pArray[2];
				p4 = Atom.pArray[3];
				p5 = Atom.pArray[4];

				Atom.HTML.ctx.font      = '18pt zekton_rg_1';
				Atom.HTML.ctx.fillStyle = '#303035';
				Atom.HTML.ctx.fillText  ((p1 ? p1.Profile.name : ""), 176, 437);
				Atom.HTML.ctx.fillText  ((p2 ? p2.Profile.name : ""), 176, 468);
				Atom.HTML.ctx.fillText  ((p3 ? p3.Profile.name : ""), 176, 501);
				Atom.HTML.ctx.fillText  ((p4 ? p4.Profile.name : ""), 176, 533);
				Atom.HTML.ctx.fillText  ((p5 ? p5.Profile.name : ""), 176, 565);
			},
			UserScores: function(){
				var p1,p2,p3,p4,p5;
				p1 = Atom.pArray[0];
				p2 = Atom.pArray[1];
				p3 = Atom.pArray[2];
				p4 = Atom.pArray[3];
				p5 = Atom.pArray[4];

				Atom.HTML.ctx.font      = '18pt zekton_rg_1';
				Atom.HTML.ctx.fillStyle = '#303035';
				Atom.HTML.ctx.fillText  ((p1 ? p1.last.toFixed(2) : ""), 348, 437);
				Atom.HTML.ctx.fillText  ((p2 ? p2.last.toFixed(2) : ""), 348, 468);
				Atom.HTML.ctx.fillText  ((p3 ? p3.last.toFixed(2) : ""), 348, 501);
				Atom.HTML.ctx.fillText  ((p4 ? p4.last.toFixed(2) : ""), 348, 533);
				Atom.HTML.ctx.fillText  ((p5 ? p5.last.toFixed(2) : ""), 348, 565);
				
			},
			Background: function(){
				//Home
				Atom.HTML.ctx.drawImage(Atom.HTML.ss, 0, 0, 128, 120, 0, 0, 128, 120);
				//Drone
				Atom.HTML.ctx.drawImage(Atom.HTML.ss, 0, 120, 128, 120, 0, 120, 128, 120);
				//Log
				Atom.HTML.ctx.drawImage(Atom.HTML.ss, 0, 240, 128, 120, 0, 240, 128, 120);
				//Data
				Atom.HTML.ctx.drawImage(Atom.HTML.ss, 0, 360, 128, 120, 0, 360, 128, 120);
				//Game
				Atom.HTML.ctx.drawImage(Atom.HTML.ss, 0, 480, 128, 120, 0, 480, 128, 120);
				//Settings
				Atom.HTML.ctx.drawImage(Atom.HTML.ss, 0, 600, 128, 120, 0, 600, 128, 120);
				//Header 1
				Atom.HTML.ctx.drawImage(Atom.HTML.ss, 257, 120, 1136, 61, 144, 45, 1136, 61);
				//Header 6
				Atom.HTML.ctx.drawImage(Atom.HTML.ss, 256, 600, 336, 45, 144, 122, 336, 45);
				Atom.HTML.ctx.drawImage(Atom.HTML.ss, 256, 600, 336, 45, 144, 366, 336, 45);

				//Font
				Atom.HTML.ctx.font      = '46pt zekton_rg_1';
				Atom.HTML.ctx.fillStyle = '#EBEBEB';
				Atom.HTML.ctx.fillText  ('Data', 176, 98);

				Atom.HTML.ctx.font      = '24pt zekton_rg_1';
				Atom.HTML.ctx.fillStyle = '#EBEBEB';
				Atom.HTML.ctx.fillText  ('Global High Score', 176, 157);

				Atom.HTML.ctx.font      = '24pt zekton_rg_1';
				Atom.HTML.ctx.fillStyle = '#EBEBEB';
				Atom.HTML.ctx.fillText  ('User Last Scores', 176, 400);
			},
			Chart: function(){
				var point = {
					time: 0,
					score: 0.0
				}
				var p1,p2,p3,p4,p5;
				p1 = Atom.pArray[0];
				p2 = Atom.pArray[1];
				p3 = Atom.pArray[2];
				p4 = Atom.pArray[3];
				p5 = Atom.pArray[4];

				for(var i = 0; i < 100; i++){

					if(p1){//Does p1 Exist?
						if(p1.solutions.length > 0){//Does p1 have any solutions
							if(p1.solutions.length > i ){//Verify p1 has enough data points
								point.time = p1.solutions[i].time;
								point.score = p1.solutions[i].score;	
							}
							else{ //Duplciate al points to last avalible solution
								point.time = p1.solutions[p1.solutions.length-1].time;
								point.score = p1.solutions[p1.solutions.length-1].score;
							}
						}	
					}
					Atom.HTML.chart.datasets[0].setPointData(i, point.time, point.score, 1);
					
					if(p2){
						if(p2.solutions.length > 0){//Does player have any solutions
							if(p2.solutions.length > i ){//Verify player has enough data points
								point.time = p2.solutions[i].time;
								point.score = p2.solutions[i].score;	
							}
							else{ //Duplciate al points to last avalible solution
								point.time = p2.solutions[p2.solutions.length-1].time;
								point.score = p2.solutions[p2.solutions.length-1].score;
							}
						}	
					}
					Atom.HTML.chart.datasets[1].setPointData(i, point.time, point.score, 1);
					
					if(p3){
						if(p3.solutions.length > 0){//Does player have any solutions
							if(p3.solutions.length > i ){//Verify player has enough data points
								point.time = p3.solutions[i].time;
								point.score = p3.solutions[i].score;	
							}
							else{ //Duplciate al points to last avalible solution
								point.time = p3.solutions[p3.solutions.length-1].time;
								point.score = p3.solutions[p3.solutions.length-1].score;
							}
						}	
					}
					Atom.HTML.chart.datasets[2].setPointData(i, point.time, point.score, 1);

					if(p4){
						if(p4.solutions.length > 0){//Does player have any solutions
							if(p4.solutions.length > i ){//Verify player has enough data points
								point.time = p4.solutions[i].time;
								point.score = p4.solutions[i].score;	
							}
							else{ //Duplciate al points to last avalible solution
								point.time = p4.solutions[p4.solutions.length-1].time;
								point.score = p4.solutions[p4.solutions.length-1].score;
							}
						}	
					}
					Atom.HTML.chart.datasets[3].setPointData(i, point.time, point.score, 1);

					if(p5){
						if(p5.solutions.length > 0){//Does player have any solutions
							if(p5.solutions.length > i ){//Verify player has enough data points
								point.time = p5.solutions[i].time;
								point.score = p5.solutions[i].score;	
							}
							else{ //Duplciate al points to last avalible solution
								point.time = p5.solutions[p5.solutions.length-1].time;
								point.score = p5.solutions[p5.solutions.length-1].score;
							}
						}	
					}
					Atom.HTML.chart.datasets[4].setPointData(i, point.time, point.score, 1);
				}
				Atom.HTML.chart.update();
				
			}
		}
	},
	updateInterval: 100,
	lastUpdate: 0,
	Update: function(){
		var time = Date.now();
		if( (time - Atom.lastUpdate) > Atom.updateInterval){
			Atom.lastUpdate = time;

			Atom.HTML.canvas.width = 1280;
			Atom.Draw.Data.Background();
			Atom.Draw.Data.GlobalScoreNames()
			Atom.Draw.Data.GlobalScores();
			Atom.Draw.Data.UserScoresUsernames();
			Atom.Draw.Data.UserScores();
			Atom.Draw.Data.Chart();

			
		}
		var keepAlive = (time - Atom.timeSinceNetworkTraffic) > Atom.networkUpdateInterval ;
		if(Atom.active && keepAlive ){
			Atom.timeSinceNetworkTraffic = time;

			var pkt = new CDiCEPacket();
			pkt.type = 6; //Admin packet
			if(Atom.socket && Atom.socket.OPEN){
				Atom.socket.send(pkt.serialize());
			}
			
		}
		window.requestAnimationFrame(Atom.Update);
	},
	Start: function(){
		window.requestAnimationFrame(Atom.Update);
	}
}

var CDiCEPacket = function(data){
    
    try{
        var msg  = data ? JSON.parse(data) : {};
    }
    catch(e){
        console.log("Error parsing DiCEPacket: " + e);
        var msg = {}
    }
    
    this.type = msg.type ? msg.type : 0;

    this.iArray = msg.iArray ? msg.iArray : [];
    this.fArray = msg.fArray ? msg.fArray : [];
    
    this.int1 =  msg.int1 ? msg.int1 : 0;
    this.int2 =  msg.int2 ? msg.int2 : 0;
    
    this.float1 = msg.float1 ? msg.float1 : 0.0;
    this.float2 = msg.float2 ? msg.float2 : 0.0;

    this.string1 = msg.string1 ? msg.string1 : "";
    this.string2 = msg.string2 ? msg.string2 : "";
};
var CSolution = function(pkt){
	return {
		playerID: pkt.int1,
		problemID: pkt.int2,
		time: pkt.iArray[0],
		score: pkt.float1, 
		name: pkt.string2
	}
}
var CPlayer = function(){
    this.id     = -1;
    this.name   = "unknown";
    this.devices = "";
    this.Profile = {
        id:     -1,
        name:   "",
        achievements: [],
    };
    this.Device = {
        id:   -1,
        type: "",
        os:   "",
        perf: "",
        name: ""
    }
    this.Problem ={
        id:     -1,
        DAG:{
            id: -1,
            topology: ""
        },
        Expression: {
            id: -1,
            data: ""
        }  
    };
    this.Stats = {
        type:   "GRN",
        executionTime:  -1,
        globalScore:    -Number.MAX_VALUE,
        solutionsExplored: 0,
        validSolutions   : 0
    }
    this.solutions = [];
}

CDiCEPacket.prototype.serialize = function(){
    return JSON.stringify(this);
};

CDiCEPacket.prototype.parse = function(data){
    //If data passed into contstructor, parse otherwise load with defaults
    try{
        var msg  = data ? JSON.parse(data) : {};
    }
    catch(e){
        console.log("Error parsing DiCEPacket: " + e);
        var msg = {}
    }
    
    this.type = msg.type ? msg.type : 0;

    this.iArray = msg.iArray ? msg.iArray : [];
    this.fArray = msg.fArray ? msg.fArray : [];
    
    this.int1 =  msg.int1 ? msg.int1 : 0;
    this.int2 =  msg.int2 ? msg.int2 : 0;
    
    this.float1 = msg.float1 ? msg.float1 : 0.0;
    this.float2 = msg.float2 ? msg.float2 : 0.0;

    this.string1 = msg.string1 ? msg.string1 : "";
    this.string2 = msg.string2 ? msg.string2 : "";
};
var CMap = function(linkEntries){
    this.current = undefined;
    this.size = 0;
    this.isLinked = true;

    if(linkEntries === false)
    {
            this.disableLinking();
    }
            
    this.from = function(obj, foreignKeys, linkEntries)
    {
        var map = new Map(linkEntries);

        for(var prop in obj) {
                if(foreignKeys || obj.hasOwnProperty(prop))
                        map.put(prop, obj[prop]);
        }

        return map;
    }
    
    this.noop = function()
    {
            return this;
    }
    
    this.illegal = function()
    {
            throw new Error('can\'t do this with unlinked maps');
    }
    
    this.reverseIndexTableFrom = function(array, linkEntries)
    {
        var map = new Map(linkEntries);

        for(var i = 0, len = array.length; i < len; ++i) {
                var	entry = array[i],
                        list = map.get(entry);

                if(list) list.push(i);
                else map.put(entry, [i]);
        }

        return map;
    }

    this.cross = function(map1, map2, func, thisArg)
    {
        var linkedMap, otherMap;
    
        if(map1.isLinked) {
                linkedMap = map1;
                otherMap = map2;
        }
        else if(map2.isLinked) {
                linkedMap = map2;
                otherMap = map1;
        }
        else Map.illegal();
    
        for(var i = linkedMap.size; i--; linkedMap.next()) {
                var key = linkedMap.key();
                if(otherMap.contains(key))
                        func.call(thisArg, key, map1.get(key), map2.get(key));
        }
    
        return thisArg;
    }

    this.uniqueArray = function(array)
    {
            var map = new Map;
    
            for(var i = 0, len = array.length; i < len; ++i)
                    map.put(array[i]);
    
            return map.listKeys();
    }                                    
};

CMap.prototype.disableLinking = function(){
    this.isLinked = false;
    this.link = Map.noop;
    this.unlink = Map.noop;
    this.disableLinking = Map.noop;
    this.next = Map.illegal;
    this.key = Map.illegal;
    this.value = Map.illegal;
    this.removeAll = Map.illegal;
    this.each = Map.illegal;
    this.flip = Map.illegal;
    this.drop = Map.illegal;
    this.listKeys = Map.illegal;
    this.listValues = Map.illegal;

    return this;
};

CMap.prototype.hash = function(value){
    return value instanceof Object ? (value.__hash ||
            (value.__hash = 'object ' + ++arguments.callee.current)) :
            (typeof value) + ' ' + String(value);
};

CMap.prototype.hash.current = 0;            
CMap.prototype.link = function(entry){
        if(this.size === 0) {
                entry.prev = entry;
                entry.next = entry;
                this.current = entry;
        }
        else {
                entry.prev = this.current.prev;
                entry.prev.next = entry;
                entry.next = this.current;
                this.current.prev = entry;
        }
};

CMap.prototype.unlink = function(entry) {
        if(this.size === 0)
                this.current = undefined;
        else {
                entry.prev.next = entry.next;
                entry.next.prev = entry.prev;
                if(entry === this.current)
                        this.current = entry.next;
        }
};

CMap.prototype.get = function(key) {
        var entry = this[this.hash(key)];
        return typeof entry === 'undefined' ? undefined : entry.value;
};

CMap.prototype.put = function(key, value) {
        var hash = this.hash(key);

        if(this.hasOwnProperty(hash))
                this[hash].value = value;
        else {
                var entry = { key : key, value : value };
                this[hash] = entry;

                this.link(entry);
                ++this.size;
        }

        return this;
};

CMap.prototype.remove = function(key) {
        var hash = this.hash(key);

        if(this.hasOwnProperty(hash)) {
                --this.size;
                this.unlink(this[hash]);

                delete this[hash];
        }

        return this;
};

CMap.prototype.removeAll = function() {
        while(this.size)
                this.remove(this.key());

        return this;
};

CMap.prototype.contains = function(key) {
        return this.hasOwnProperty(this.hash(key));
};

CMap.prototype.isUndefined = function(key) {
        var hash = this.hash(key);
        return this.hasOwnProperty(hash) ?
                typeof this[hash] === 'undefined' : false;
};

CMap.prototype.next = function() {
        this.current = this.current.next;
};

CMap.prototype.key = function() {
        return this.current.key;
};

CMap.prototype.value = function() {
        return this.current.value;
};

CMap.prototype.each = function(func, thisArg) {
        if(typeof thisArg === 'undefined')
                thisArg = this;

        for(var i = this.size; i--; this.next()) {
                var n = func.call(thisArg, this.key(), this.value(), i > 0);
                if(typeof n === 'number')
                        i += n; // allows to add/remove entries in func
        }

        return this;
};

CMap.prototype.flip = function(linkEntries) {
        var map = new Map(linkEntries);

        for(var i = this.size; i--; this.next()) {
                var	value = this.value(),
                        list = map.get(value);

                if(list) list.push(this.key());
                else map.put(value, [this.key()]);
        }

        return map;
};

CMap.prototype.drop = function(func, thisArg) {
        if(typeof thisArg === 'undefined')
                thisArg = this;

        for(var i = this.size; i--; ) {
                if(func.call(thisArg, this.key(), this.value())) {
                        this.remove(this.key());
                        --i;
                }
                else this.next();
        }

        return this;
};

CMap.prototype.listValues = function() {
        var list = [];

        for(var i = this.size; i--; this.next())
                list.push(this.value());

        return list;
}

CMap.prototype.listKeys = function() {
        var list = [];

        for(var i = this.size; i--; this.next())
                list.push(this.key());

        return list;
}

CMap.prototype.toString = function() {
        var string = '[object Map';

        function addEntry(key, value, hasNext) {
                string += '    { ' + this.hash(key) + ' : ' + value + ' }' +
                        (hasNext ? ',' : '') + '\n';
        }

        if(this.isLinked && this.size) {
                string += '\n';
                this.each(addEntry);
        }

        string += ']';
        return string;
};

//Priority Queue - https://github.com/STRd6/PriorityQueue.js
            // var queue = PriorityQueue({low: true});
        var CPriorityQueue = function(options) {
            var contents = [];
        
            var sorted = false;
            var sortStyle;
        
            if(options && options.low) {
              sortStyle = prioritySortLow;
            } else {
              sortStyle = prioritySortHigh;
            }
        
            /**
             * @private
             */
            var sort = function() {
              contents.sort(sortStyle);
              sorted = true;
            };
        
            var self = {
            	content: contents,
            	sort: sort,
              /**
               * Removes and returns the next element in the queue.
               * @member PriorityQueue
               * @return The next element in the queue. If the queue is empty returns
               * undefined.
               *
               * @see PrioirtyQueue#top
               */
              pop: function() {
                if(!sorted) {
                  sort();
                }
        
                var element = contents.pop();
        
                if(element) {
                  return element.object;
                } else {
                  return undefined;
                }
              },
        
              /**
               * Returns but does not remove the next element in the queue.
               * @member PriorityQueue
               * @return The next element in the queue. If the queue is empty returns
               * undefined.
               *
               * @see PriorityQueue#pop
               */
              top: function() {
                if(!sorted) {
                  sort();
                }
        
                var element = contents[contents.length - 1];
        
                if(element) {
                  return element.object;
                } else {
                  return undefined;
                }
              },
        
              /**
               * @member PriorityQueue
               * @param object The object to check the queue for.
               * @returns true if the object is in the queue, false otherwise.
               */
              includes: function(object) {
                for(var i = contents.length - 1; i >= 0; i--) {
                  if(contents[i].object === object) {
                    return true;
                  }
                }
        
                return false;
              },
        
              /**
               * @member PriorityQueue
               * @returns the current number of elements in the queue.
               */
              size: function() {
                return contents.length;
              },
        
              /**
               * @member PriorityQueue
               * @returns true if the queue is empty, false otherwise.
               */
              empty: function() {
                return contents.length === 0;
              },
        
              /**
               * @member PriorityQueue
               * @param object The object to be pushed onto the queue.
               * @param priority The priority of the object.
               */
              push: function(object, priority) {
                contents.push({object: object, priority: priority});
                sorted = false;
              },
              clear: function(){
                return contents.length = 0;
              }
            };
        
            return self;
        }
        var prioritySortLow = function(a, b) {
          return b.priority - a.priority;
        };
        var prioritySortHigh = function(a, b) {
          return a.priority - b.priority;
        };