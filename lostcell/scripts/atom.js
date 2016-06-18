var jos = os; //Hello World
var Atom = {
	Init: function(){
		Atom.Load.HTML();
		Atom.Connect();

		//Atom.Start();

	},
	socket: null,
	Connect: function(){
		Atom.Players = new CMap();
		Atom.socket = new WebSocket("ws://bmtsock-bluehelix.rhcloud.com:8000");
		Atom.socket.onopen = function(e){
			var pkt = new CDiCEPacket();
			pkt.type = 6; //Admin packet
			Atom.socket.send(pkt.serialize());
		}
		Atom.socket.onmessage = Atom.HandleMessage;
	},
	HandleMessage: function(msg){
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
				console.log("Player: " + pkt.int1);
				console.log("Prob: " + pkt.int2);
				player.Profile.id = pkt.int1;
				player.Problem.id = pkt.int2;
				Atom.Players.put(player.Profile.id, player);
				Atom.pArray.push(player);
				player.id = Atom.pArray.length;
				if(Atom.pArray.length > 5){Atom.pArray.shift()}
			}

			if(player.id = 1){
				Atom.Data.d1.score = soln.score;
			}
			else if(player.id = 2){
				Atom.Data.d2.score = soln.score;
			}
			else if(player.id = 3){
				Atom.Data.d3.score = soln.score;
			}
			else if(player.id = 4){
				Atom.Data.d4.score = soln.score;
			}
			else if(player.id = 5){
				Atom.Data.d5.score = soln.score;
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

			Atom.Data.datasets.push(Atom.Data.d1);
			Atom.Data.datasets.push(Atom.Data.d2);
			Atom.Data.datasets.push(Atom.Data.d3);
			Atom.Data.datasets.push(Atom.Data.d4);
			Atom.Data.datasets.push(Atom.Data.d5);

			Chart.defaults.global.animation = false;
			Chart.defaults.global.defaultColor =  'rgb(240, 248, 255, 1)';

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
			fillColor: "rgba(255, 69, 0, 0.2)",
			strokeColor: "#FF4500", //"rgba(220,220,220,1)",
			pointColor: "#FF4500", //"rgba(220,220,220,1)",
			pointStrokeColor: "#FF4500", //"#fff",
			pointHighlightFill: "#FF4500", //"#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [  ]
		},
		d2: {
			connected: false,
			label: "Drone 2",
			username: "",
			score: 0.0,
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "#CC5B94",
			pointColor: "#CC5B94",
			pointStrokeColor: "#CC5B94",
			pointHighlightFill: "#CC5B94",
			pointHighlightStroke: "rgba(204, 91, 148, 0.2)",
			data: []
		},
		d3: {
			connected: false,
			label: "Drone 3",
			username: "",
			score: 0.0,
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "#0DDA00",
			pointColor: "#0DDA00",
			pointStrokeColor: "#0DDA00",
			pointHighlightFill: "#0DDA00",
			pointHighlightStroke: "rgba(13, 218, 0, 0.2)",
			data: []
		},
		d4: {
			connected: false,
			label: "",
			username: "",
			score: 0.0,
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "#2D2F6B",
			pointColor: "#2D2F6B",
			pointStrokeColor: "#2D2F6B",
			pointHighlightFill: "#2D2F6B",
			pointHighlightStroke: "rgba(45, 47, 107, 0.2)",
			data: []
		},
		d5: {
			connected: false,
			label: "",
			username: "",
			score: 0.0,
			fillColor: "rgba(151,5,205,0.2)",
			strokeColor: "#2D2F6B",
			pointColor: "#2D2F6B",
			pointStrokeColor: "#2D2F6B",
			pointHighlightFill: "#2D2F6B",
			pointHighlightStroke: "rgba(45, 47, 107, 0.2)",
			data: [ ]
		}

	},
	Draw: {
		Data: {
			GlobalScoreNames: function(){
				Atom.HTML.ctx.font      = '18pt zekton_rg_1';
				Atom.HTML.ctx.fillStyle = '#303035';
				Atom.HTML.ctx.fillText  (Atom.Data.globals[0].player, 176, 193);
				Atom.HTML.ctx.fillText  (Atom.Data.globals[1].player, 176, 224);
				Atom.HTML.ctx.fillText  (Atom.Data.globals[2].player, 176, 257);
				Atom.HTML.ctx.fillText  (Atom.Data.globals[3].player, 176, 289);
				Atom.HTML.ctx.fillText  (Atom.Data.globals[4].player, 176, 321);
			},
			GlobalScores: function(){
				Atom.HTML.ctx.font      = '18pt zekton_rg_1';
				Atom.HTML.ctx.fillStyle = '#303035';
				Atom.HTML.ctx.fillText  (Atom.Data.globals[0].score, 368, 193);
				Atom.HTML.ctx.fillText  (Atom.Data.globals[1].score, 368, 224);
				Atom.HTML.ctx.fillText  (Atom.Data.globals[2].score, 368, 257);
				Atom.HTML.ctx.fillText  (Atom.Data.globals[3].score, 368, 289);
				Atom.HTML.ctx.fillText  (Atom.Data.globals[4].score, 368, 321);
			},
			UserScoresUsernames: function(){
				Atom.HTML.ctx.font      = '18pt zekton_rg_1';
				Atom.HTML.ctx.fillStyle = '#303035';
				Atom.HTML.ctx.fillText  ("Player: " + Atom.Data.d1.username, 176, 437);
				Atom.HTML.ctx.fillText  ("Player: " + Atom.Data.d2.username, 176, 468);
				Atom.HTML.ctx.fillText  ("Player: " + Atom.Data.d3.username, 176, 501);
				Atom.HTML.ctx.fillText  ("Player: " + Atom.Data.d4.username, 176, 533);
				Atom.HTML.ctx.fillText  ("Player: " + Atom.Data.d5.username, 176, 565);
			},
			UserScores: function(){

				Atom.HTML.ctx.font      = '18pt zekton_rg_1';
				Atom.HTML.ctx.fillStyle = '#303035';
				Atom.HTML.ctx.fillText  (Atom.Data.d1.score.toFixed(3), 368, 437);
				Atom.HTML.ctx.fillText  (Atom.Data.d2.score.toFixed(3), 368, 468);
				Atom.HTML.ctx.fillText  (Atom.Data.d3.score.toFixed(3), 368, 501);
				Atom.HTML.ctx.fillText  (Atom.Data.d4.score.toFixed(3), 368, 533);
				Atom.HTML.ctx.fillText  (Atom.Data.d5.score.toFixed(3), 368, 565);
				
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
				for(var i = 0; i < 100; i++){
					var pl = Atom.pArray[0];
					if(Atom.pArray[0]){
						var length = pl.solutions.length;
						Atom.Data.d1.username = Atom.pArray[0].Profile.id;
						if(length > 0){
							if((pl.solutions.length - 1) >= i)
							Atom.HTML.chart.datasets[0].setPointData(i, pl.solutions[i].time, pl.solutions[i].score, 1);
							else{

								Atom.HTML.chart.datasets[0].setPointData(i, pl.solutions[length-1 < 0 ? 0 : length-1].time, pl.solutions[length-1 < 0 ? 0 : length-1].score, 1);
							}
						}
						

							
					}
					if(Atom.pArray[1]){
						var p2 = Atom.pArray[1];
						var length = p2.solutions.length;
						Atom.Data.d1.username = Atom.pArray[1].Profile.id;
						if(length > 0){
							if((p2.solutions.length - 1) >= i && length > 0)
								Atom.HTML.chart.datasets[1].setPointData(i, p2.solutions[i].time, p2.solutions[i].score, 1);
							else
								Atom.HTML.chart.datasets[1].setPointData(i, p2.solutions[length-1 < 0 ? 0 : length-1].time, p2.solutions[length-1 < 0 ? 0 : length-1].score, 1);
						}
					}else if(pl){
						if((pl.solutions.length - 1) >= i)
							Atom.HTML.chart.datasets[1].setPointData(i, pl.solutions[i].time, pl.solutions[i].score, 1);
						else if(pl.solutions.length >0){

							Atom.HTML.chart.datasets[1].setPointData(i, pl.solutions[length-1 < 0 ? 0 : length-1].time, pl.solutions[length-1 < 0 ? 0 : length-1].score, 1);
						}
					}

					if(Atom.pArray[2]){
						var p3 = Atom.pArray[2];
						var length = pl.solutions.length;
						Atom.Data.d1.username = Atom.pArray[2].Profile.id;
						if(length > 0){
							if((p3.solutions.length - 1) >= i)
								Atom.HTML.chart.datasets[2].setPointData(i, p3.solutions[i].time, p3.solutions[i].score, 1);
							else
								Atom.HTML.chart.datasets[2].setPointData(i, p3.solutions[length-1 < 0 ? 0 : length-1].time, p3.solutions[length-1 < 0 ? 0 : length-1].score, 1);
						}
					}else if(pl){
						if((pl.solutions.length - 1) >= i)
							Atom.HTML.chart.datasets[2].setPointData(i, pl.solutions[i].time, pl.solutions[i].score, 1);
						else if(pl.solutions.length >0){

							Atom.HTML.chart.datasets[2].setPointData(i, pl.solutions[length-1 < 0 ? 0 : length-1].time, pl.solutions[length-1 < 0 ? 0 : length-1].score, 1);
						}
					}


					if(Atom.pArray[3]){
						var p4 = Atom.pArray[3];
						var length = p4.solutions.length;
						Atom.Data.d1.username = Atom.pArray[3].Profile.id;
						if(length > 0){
							if((p4.solutions.length - 1) >= i )
								Atom.HTML.chart.datasets[3].setPointData(i, p4.solutions[i].time, p4.solutions[i].score, 1);
							else
								Atom.HTML.chart.datasets[3].setPointData(i, p4.solutions[length-1 < 0 ? 0 : length-1].time, p4.solutions[length-1 < 0 ? 0 : length-1].score, 1);
						}
					}
					else if(pl){
						if((pl.solutions.length - 1) >= i)
							Atom.HTML.chart.datasets[3].setPointData(i, pl.solutions[i].time, pl.solutions[i].score, 1);
						else if(pl.solutions.length >0){

							Atom.HTML.chart.datasets[3].setPointData(i, pl.solutions[length-1 < 0 ? 0 : length-1].time, pl.solutions[length-1 < 0 ? 0 : length-1].score, 1);
						}
					}

					if(Atom.pArray[4]){
						var p5 = Atom.pArray[4];
						var length = p5.solutions.length;
						Atom.Data.d1.username = Atom.pArray[4].Profile.id;
						if(length > 0){
							if((p5.solutions.length - 1) >= i)
								Atom.HTML.chart.datasets[4].setPointData(i, p5.solutions[i].time, p5.solutions[i].score, 1);
							else
								Atom.HTML.chart.datasets[4].setPointData(i, p5.solutions[length-1 < 0 ? 0 : length-1].time, p5.solutions[length-1 < 0 ? 0 : length-1].score, 1);
						}
					}
					else if(pl){
						if((pl.solutions.length - 1) >= i)
							Atom.HTML.chart.datasets[4].setPointData(i, pl.solutions[i].time, pl.solutions[i].score, 1);
						else if(pl.solutions.length >0){

							Atom.HTML.chart.datasets[4].setPointData(i, pl.solutions[length-1 < 0 ? 0 : length-1].time, pl.solutions[length-1 < 0 ? 0 : length-1].score, 1);
						}
					}
						
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
			//Atom.Draw.Data.GlobalScoreNames()
			//Atom.Draw.Data.GlobalScores();
			Atom.Draw.Data.UserScoresUsernames();
			Atom.Draw.Data.UserScores();
			Atom.Draw.Data.Chart();

			
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