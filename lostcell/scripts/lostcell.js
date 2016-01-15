var jos = os;
var LostCell = {
	Init: function(){
		os.debugbar.AnchorConsole();
		os.console.Comment("Lost Cell Initialize");
		LostCell.Load.Cleanup();
		LostCell.Load.HTML();
		LostCell.Load.Console();
		LostCell.Load.Controls();
		LostCell.Load.Audio();
		LostCell.Load.States();
		

		
		
		
		LostCell.Run();
		
		
		
	},
	HTML: {
		app: null,
		States: {
			
		}
	},
	Load: {
		OSInput: function(){
			os.input = {
				currentTime: 0,
				previousTime: 0,
				Get: {
					State: {
						Mouse: function(){
							return _Mouse;
						},
						Touch: function(){
							return _Touch;
						},
						Keyboard: function(keyCode){
							return _KeyboardStates.get(keyCode);
						}
					}
				},
				Register: {
					Mouse: {
						Event: {
							Down: function(fFunction, oScope){
								var e = new CCallback(_eventID++, fFunction, oScope);
								_MouseEvents.get("DOWN").push(e);
								return e;
							},
							Up: function(fFunction, oScope){
								var e = new CCallback(_eventID++, fFunction, oScope);
								_MouseEvents.get("UP").push(e);
								return e;
							},
							Move: function(fFunction, oScope){
								var e = new CCallback(_eventID++, fFunction, oScope);
								_MouseEvents.get("MOVE").push(e);
								return e;
							}
						},
						State: {
							
						}
					},
					Touch: {
						Event: {
							Start: function(fFunction, oScope){
								var e = new CCallback(_eventID++, fFunction, oScope);
								_TouchEvents.get("START").push(e);
								return e;
							},
							End: function(fFunction, oScope){
								var e = new CCallback(_eventID++, fFunction, oScope);
								_TouchEvents.get("END").push(e);
								return e;
							},
							Move: function(fFunction, oScope){
								var e = new CCallback(_eventID++, fFunction, oScope);
								_TouchEvents.get("MOVE").push(e);
								return e;
							}
						},
						State: {
							
						}
					},
					Keyboard: {
						Event: {
							Keydown: function(Key, fFunction, oScope){
								var e = new CCallback(_eventID++, fFunction, oScope);
								var eventArray;
								
								if(isNaN(Key)){
									eventArray = _KeyboardControlKeyEvents.get(Key);
								}
								else{
									eventArray = _KeyboardControlKeyEvents.get(Key);
								}
								
								
								if(!eventArray){
									eventArray = [];
									if(isNaN(Key)){ _KeyDownEvents.put(Key, eventArray);}
									else{_KeyboardControlKeyEvents.put(Key, eventArray);}
									
								}
								eventArray.push(e);
								return e;
							},
							Keyup: function(Key, fFunction, oScope){
								var e = new CCallback(_eventID++, fFunction, oScope);
								var eventArray;
								
								if(isNaN(Key)){
									eventArray = _KeyboardControlKeyEvents.get(Key);
								}
								else{
									eventArray = _KeyboardControlKeyEvents.get(Key);
								}
								
								
								if(!eventArray){
									eventArray = [];
									if(isNaN(Key)){ _KeyUpEvents.put(Key, eventArray);}
									else{_KeyboardControlKeyEvents.put(Key, eventArray);}
									
								}
								eventArray.push(e);
								return e;
								
							}
						},
						State: {
							
						}
					}
				},
				Remove: {
					Mouse: {
						Event: {
							Down: function(id){
								var ev = _MouseEvents.get("DOWN");
								for(var i = ev.length - 1; i >= 0; i--){
									if(ev[i].id == iID){
										ev.splice(i,1);
									}
								}
							},
							Up: function(id){
								var ev = _MouseEvents.get("UP");
								for(var i = ev.length - 1; i >= 0; i--){
									if(ev[i].id == iID){
										ev.splice(i,1);
									}
								}
							},
							Move: function(id){
								var ev = _MouseEvents.get("MOVE");
								for(var i = ev.length - 1; i >= 0; i--){
									if(ev[i].id == iID){
										ev.splice(i,1);
									}
								}
							}
						}
					},
					Touch: {
						Event: {
							Start: function(iID){
								var ev = _TouchEvents.get("START");
								for(var i = ev.length - 1; i >= 0; i--){
									if(ev[i].id == iID){
										ev.splice(i,1);
									}
								}
							},
							End: function(iID){
								var ev = _TouchEvents.get("END");
								for(var i = ev.length - 1; i >= 0; i--){
									if(ev[i].id == iID){
										ev.splice(i,1);
									}
								}
							},
							Move: function(iID){
								var ev = _TouchEvents.get("MOVE");
								for(var i = ev.length - 1; i >= 0; i--){
									if(ev[i].id == iID){
										ev.splice(i,1);
									}
								}
							}
						}
					},
					Keyboard: {
						Event: {
							Keydown: function(Key, iID){
								var ev;
								
								if(isNaN(Key)){
									ev =  _KeyDownEvents.get(Key);
								}
								else{
									ev = _KeyboardControlKeyEvents.get(Key);
								}
								
								for(var i = ev.length - 1; i >= 0; i--){
									if(ev[i].id == iID){
										ev.splice(i,1);
									}
								}
							},
							Keyup: function(Key, iID){
								var ev;
								
								if(isNaN(Key)){
									ev =  _KeyUpEvents.get(Key);
								}
								else{
									ev = _KeyboardControlKeyEvents.get(Key);
								}
								for(var i = ev.length - 1; i >= 0; i--){
									if(ev[i].id == iID){
										ev.splice(i,1);
									}
								}
							}
							
						}
					}
				}
			}
			var _eventID = 0;
			
			var _InputEvents = {
				Mouse: {
					Down: function(e){
						_Mouse.lastX = e.clientX;
						_Mouse.lastY = e.clientY;
						_Mouse.pressed = true;
						
						var callbackArray = _MouseEvents.get("DOWN");
						if(callbackArray){
							for(var i = callbackArray.length - 1; i >= 0 ; i--){
								if(callbackArray[i].scope){
									callbackArray[i].func.apply(callbackArray.scope, [e]);
								}else{
									callbackArray[i].func(e);
								}
							}
						}
						
					},
					Up: function(e){
						_Mouse.pressed = false;
						
						var callbackArray = _MouseEvents.get("UP");
						if(callbackArray){
							for(var i = callbackArray.length - 1; i >= 0 ; i--){
								if(callbackArray[i].scope){
									callbackArray[i].func.apply(callbackArray.scope, [e]);
								}else{
									callbackArray[i].func(e);
								}
							}
						}
					},
					Move: function(e){
						if (!_Mouse.pressed) {
							return;
						}
						
						var callbackArray = _MouseEvents.get("MOVE");
						if(callbackArray){
							for(var i = callbackArray.length - 1; i >= 0 ; i--){
								if(callbackArray[i].scope){
									callbackArray[i].func.apply(callbackArray.scope, [e]);
								}else{
									callbackArray[i].func(e);
								}
							}
						}
					
						_Mouse.lastX = e.clientX;
						_Mouse.lastY = e.clientY; 
					}
				},
				Touch: {
					Start: function(e){
						e.preventDefault();
						_Touch.lastX = e.touches[0].pageX;
						_Touch.lastY = e.touches[0].pageY;
						_Touch.startX = e.touches[0].pageX;
						_Touch.startY = e.touches[0].pageY;
						_Touch.pressed = true;
						
						var callbackArray = _TouchEvents.get("START");
						if(callbackArray){
							for(var i = callbackArray.length - 1; i >= 0 ; i--){
								if(callbackArray[i].scope){
									callbackArray[i].func.apply(callbackArray.scope, [e]);
								}else{
									callbackArray[i].func(e);
								}
							}
						}
						
					},
					End: function(e){
						e.preventDefault();
						_Touch.pressed = false;
						_Touch.startX = 0;
						_Touch.startY = 0;
						
						var callbackArray = _TouchEvents.get("END");
						if(callbackArray){
							for(var i = callbackArray.length - 1; i >= 0 ; i--){
								if(callbackArray[i].scope){
									callbackArray[i].func.apply(callbackArray.scope, [e]);
								}else{
									callbackArray[i].func(e);
								}
							}
						}
					},
					Move: function(e){
						e.preventDefault();
						if (!_Touch.pressed) {
							return;
						}
						
						var callbackArray = _TouchEvents.get("MOVE");
						if(callbackArray){
							for(var i = callbackArray.length - 1; i >= 0 ; i--){
								if(callbackArray[i].scope){
									callbackArray[i].func.apply(callbackArray.scope, [e]);
								}else{
									callbackArray[i].func(e);
								}
							}
						}
					
						_Touch.lastX = e.touches[0].pageX;
						_Touch.lastY = e.touches[0].pageY; 
					}
				},
				Keyboard:{
					Keydown: function(e){
						
						var callbackArray = e.keyCode > 47 && e.keyCode < 91 ? _KeyDownEvents.get(String.fromCharCode(e.keyCode)) : _KeyboardControlKeyEvents.get(e.keyCode);
										  
						if(callbackArray){
							for(var i = callbackArray.length - 1; i >= 0 ; i--){
								if(callbackArray[i].scope){
									callbackArray[i].func.apply(callbackArray.scope, [e]);
								}else{
									callbackArray[i].func(e);
								}
							}
						}
					},
					Keyup: function(e){
						var callbackArray = e.keyCode > 47 && e.keyCode < 91 ? _KeyUpEvents.get(String.fromCharCode(e.keyCode)) : _KeyboardControlKeyEvents.get(e.keyCode);
										  
						if(callbackArray){
							for(var i = callbackArray.length - 1; i >= 0 ; i--){
								if(callbackArray[i].scope){
									callbackArray[i].func.apply(callbackArray.scope, [e]);
								}else{
									callbackArray[i].func(e);
								}
							}
						}
					}
				}
			}
			
			var CCallback = function(iID, fFunction, oScope){
				this.func = fFunction;
				this.scope =  oScope == undefined ? false : oScope;
				this.id = iID;
			}
			
			
			//Holds state for Touch Events
			var _Touch = {
				startX: 0,
				startY: 0,
				lastX: 0,
				lastY: 0,
				pressed: false
			}
			
			//      key: mouseEventType, value: Array[CCallbacks]
			var _TouchEvents = os.resschmgr.Create.Map();
			_TouchEvents.put("START", []);
			_TouchEvents.put("END", []);
			_TouchEvents.put("MOVE", []);
			document.addEventListener("touchstart", _InputEvents.Touch.Start, false);
			document.addEventListener("touchend", _InputEvents.Touch.End, false);
			document.addEventListener("touchmove", _InputEvents.Touch.Move, false);
			
			//Holds state of mouse for all registered states
			var _Mouse = {
				lastX: 0,
				lastY: 0,
				pressed: false
			}
			
			//      key: mouseEventType, value: Array[CCallbacks]
			var _MouseEvents = os.resschmgr.Create.Map();
			_MouseEvents.put("DOWN", []);
			_MouseEvents.put("UP", []);
			_MouseEvents.put("MOVE", []);
			document.addEventListener("mousedown", _InputEvents.Mouse.Down, false);
			document.addEventListener("mouseup", _InputEvents.Mouse.Up, false);
			document.addEventListener("mousemove", _InputEvents.Mouse.Move, false);
			
			//Holds states/events of all keys
			//      key: keyCode, value: true/false
			var _KeyboardStates = os.resschmgr.Create.Map();
			
			//      key: keyCode, value: Array[CCallbacks];
			var _KeyDownEvents = os.resschmgr.Create.Map();
			var _KeyUpEvents = os.resschmgr.Create.Map();
			var _KeyboardControlKeyEvents = os.resschmgr.Create.Map();
			window.addEventListener("keydown", _InputEvents.Keyboard.Keydown, false);
			window.addEventListener("keyup", _InputEvents.Keyboard.Keyup, false);
		},
		OSAnimation: function(){
			//
			//  Animation Classes
			//
			
			//Manager
			LostCell.AnimationManager = {
				spritesheets: os.resschmgr.Create.Map(),
				animations: os.resschmgr.Create.Map(),
				LoadJSON: function(sURL, callback, scope){
					var xhr = os.resschmgr.Create.XHRObject();//new CXHRObject();
					
					xhr.open('GET',sURL,false);
					
					xhr.onreadystatechange = function(){
					  if(xhr.readyState==4){ //4==DONE
							if(xhr.status == 200)
							{
								try{
									animations = JSON.parse(xhr.responseText);
									
									for(var i = 0; i < animations.length; i++){
										var data = animations[i];
										
										var ss = new CSpriteSheet(data.name);
		
										ss.width = data.ssWidth;
										ss.height = data.ssHeight;
										ss.cellWidth = data.cellWidth;
										ss.cellHeight = data.cellHeight;
										ss.rows = data.rows;
										ss.columns = data.columns;
										ss.path = data.src;
										ss.BuildClass(data.name);
										
										var options = {
											name: "",
											numOfFrames: 0,
											startRow: 0,
											startColumn: 0,
											spriteSheet: ss,
											speed: 0
										}
										
										for(var j = 0; j < data.animations.length; j++){
											var ani = data.animations[j];
											
											options.name = ani.name;
											options.numOfFrames = ani.numberOfFrames;
											options.startRow = ani.startRow;
											options.startColumn = ani.startColumn;
											options.speed = ani.speed;
											
											
											//CreateAnimation(Animation Name, number of frames, startRow, startColumn, SS, speed)
											new CAnimation(options.name, options);
											//new CAnimation(ani.name, ani.numberOfFrames, ani.startRow, ani.startColumn, ss, ani.speed);
										}
									}
									
									if(callback){
										scope ? callback.apply(scope, [animations]) : callback(animations);
									}
		
									//pInstance.Demo();
								}
								catch(e){
									console.error("Error parsing Animation Description: " + e);   
								}
							}
							else{
								console.error("Error loading Animation Description at: " + sURL);
							}
					  }
						
					}.bind(this);
					
					xhr.send();
				},
				AddFrames: function(sTarget, sSource){
					var target = LostCell.AnimationManager.animations.get(sTarget);
					var source = LostCell.AnimationManager.animations.get(sSource);
					
					for(var i = 0; i < source.frames.length; i++){
						target.frames.push(source.frames[i]);
					}
					target.numOfFrames = target.frames.length;
				},
				AddFramesReverse: function(sTarget, sSource){
					var target = LostCell.AnimationManager.animations.get(sTarget);
					var source = LostCell.AnimationManager.animations.get(sSource);
					
					for(var i = source.frames.length - 1; i >= 0; i--){
						target.frames.push(source.frames[i]);
					}
				},
				ReverseFrames: function(sSource){
					var source = LostCell.AnimationManager.animations.get(sSource);
					//Create temp array to hold frames
					var temp = [];
					
					//Store source frames in temp array, in reverse order
					for(var i = source.frames.length - 1; i >= 0; i--){
						temp.push(source.frames[i]);
					}
					
					//Clear out source frames array
					source.frames = [];
					
					//Push frames back to source via temp (in reverse order)
					for(var i = 0; i < temp.length; i++){
						source.frames.push(temp[i]);
					}
				}
			}
			
			
			//  Animation Objects
			//
			var CreateCSSClass = function(sClass, sStyle) {
						if (!document.styleSheets) {
							return;
						}
					
						if (document.getElementsByTagName("head").length == 0) {
							return;
						}
					
						var stylesheet;
						var mediaType;
						if (document.styleSheets.length > 0) {
							for (i = 0; i < document.styleSheets.length; i++) {
								if (document.styleSheets[i].disabled) {
									continue;
								}
								var media = document.styleSheets[i].media;
								mediaType = typeof media;
					
								if (mediaType == "string") {
									if (media == "" || (media.indexOf("screen") != -1)) {
										styleSheet = document.styleSheets[i];
									}
								} else if (mediaType == "object") {
									if (media.mediaText == "" || (media.mediaText.indexOf("screen") != -1)) {
										styleSheet = document.styleSheets[i];
									}
								}
					
								if (typeof styleSheet != "undefined") {
									break;
								}
							}
						}
					
						if (typeof styleSheet == "undefined") {
							var styleSheetElement = document.createElement("style");
							styleSheetElement.type = "text/css";
					
							document.getElementsByTagName("head")[0].appendChild(styleSheetElement);
					
							for (i = 0; i < document.styleSheets.length; i++) {
								if (document.styleSheets[i].disabled) {
									continue;
								}
								styleSheet = document.styleSheets[i];
							}
					
							var media = styleSheet.media;
							mediaType = typeof media;
						}
					
						if (mediaType == "string") {
							for (i = 0; i < styleSheet.rules.length; i++) {
								if (styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase() == sClass.toLowerCase()) {
									styleSheet.rules[i].style.cssText = sStyle;
									return;
								}
							}
					
							styleSheet.addRule(sClass, sStyle);
						}
						else if (mediaType == "object") {
							for (i = 0; i < styleSheet.cssRules.length; i++) {
								if (styleSheet.rules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == sClass.toLowerCase()) {
									styleSheet.cssRules[i].style.cssText = sStyle;
									return;
								}
							}
					
							styleSheet.insertRule(sClass + "{" + sStyle + "}", 0);
						}
					}
			var CSpriteSheet = function(sName){
				var self = this;
				this.img = null;
				this.width = 0;
				this.height = 0;
				this.cellWidth = 0;
				this.cellHeight = 0;
				this.rows = 0;
				this.columns = 0;
				this.path = "";
				this.id = 0;
				this.name = sName;
				var className = ""
				this.BuildClass = function(sClassName){
					className = sClassName ? sClassName.replace(/\s/g, "_") : self.name;
					this.img = new Image();
					this.img.src = this.path;
					
					var style = "position: absolute; ";
					style += "overflow: hidden;";
					style += "background: url('"+ window.location.href + this.path + "'); ";
					style += "width: " + this.cellWidth +"px;";
					style += "height: " + this.cellHeight + "px;";
					
					CreateCSSClass("."+className, style);
					LostCell.AnimationManager.spritesheets.put(this.name, this);
				}
				this.GetClass = function(){
					return className;
				}
			}
			var CAnimationFrame = function(iX, iY, iWidth, iHeight,iRow, iColumn, oSheet){
				this.x = iX;
				this.y = iY;
				this.width = iWidth;
				this.height = iHeight;
				this.frame = 0;         //Sprite Sheet Frame Number
				this.row = iRow;
				this.column = iColumn;
				this.sheet = oSheet;
			}
			var CAnimation = function(sName, options){
				var self = this;
				this.frames         = [];
				this.name           = sName.replace(/\s/g, "_");
				this.sheet          = "",
				this.numOfFrames    = "";
				this.speed          = 0;
				this.loop           = false;
				
											
				if(options){
					this.sheet          = options.spriteSheet;
					this.numOfFrames    = options.numOfFrames;
					this.speed          = options.speed ? options.speed : 0;
					this.loop           = options.loop ? options.loop : false; 
					
					
					//Populate frames array
					var _frame = 0;
					
					//need to have initial starting point, will be reset to 0 afterwards
					var _iStartColumn = options.startColumn;
					
					// runs through rows (y) and columns (x) and adds them to the frames array
					for(var y = options.startRow; y <= this.sheet.rows && _frame < this.numOfFrames; y++){
						for (var x = _iStartColumn; x <= this.sheet.columns && _frame < this.numOfFrames; x++,_frame++){
							var fr = new CAnimationFrame((x - 1)*this.sheet.cellWidth,(y - 1)*this.sheet.cellHeight,this.sheet.cellWidth,this.sheet.cellHeight, y, x, this.sheet);
							fr.frame = _frame;
							self.frames.push(fr);
						}
						// resetting starting column (x) to 0, so it goes through all following columns
						_iStartColumn = 1;
	
					}
	
				}
				 
				LostCell.AnimationManager.animations.put(this.name, this);
			}
   
		},
		OSAI: function(){
			//
        //  Artificial Intelligence
        //
        LostCell.AIManager = {
            FSM: {
					Create: function(oEntity){
						return new CFiniteStateMachine(oEntity);
					}
				},
				State: {
					Create: function(sName){
						var state = new CState(sName);
						_States.put(sName, state);
						return state;
					},
					Get: function(sName){
						return _States.get(sName);
					}
					
				}
			}
			//  Finite State Machine
			var CFiniteStateMachine = function(cEntity){
				var owner = cEntity;
				var _CurrentState = new CState();
				var self = this;
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
				this.Transition = function(sName, oMessage){
					//Call Exit for Current State
					_Exit(oMessage);
					
					//Get New State to Transition Too
					_CurrentState = _States.get(sName);
					
					//Call New States Setup and Exectue Methods
					_Enter(oMessage);
					_Execute(oMessage);
				}
				this.SetState = function(sName){
					_CurrentState = _States.get(sName);
				}
				this.Update = function(oMessage){
					_Execute(oMessage);
				}
				this.GetState = function(){
					return _CurrentState.GetName();
				}
			}
			//
			//Holds all states created
			// key: name, value: CState
			var _States = os.resschmgr.Create.Map();
			
			// States for FSM
			var CState = function(sName){
				var _name = sName || "default";
				var self = this;
	
				this.GetName = function(){
					return _name;
				}
	
			}
			CState.prototype.Enter = function(cEntity, oMessage){
				//Override this Method
			}
			CState.prototype.Exit = function(cEntity, oMessage){
				//Override this Method
			}
			CState.prototype.Execute = function(cEntity, oMessage){
				//Override this Method
			}
			
			
			
		},
		Cleanup: function(){
			os.console.AppendComment("	Extending JaHOVA Systems");
			//Remove Splash Window
			os.console.AppendComment("	Removing Uneeded HTML Tags");
			document.body.removeChild(os.windows.WindowsManager.Windows.current.value.elements.window.html());
			document.body.removeChild(document.getElementById('1'));
			document.body.removeChild(document.getElementById('2'));
			
			os.console.AppendComment("	Adding Input");
			LostCell.Load.OSInput();
			
			os.console.AppendComment("	Adding AI FSM");
			LostCell.Load.OSAI();
			
			//os.console.AppendComment("Adding Animation System");
			//LostCell.Load.OSAnimation();
			
			os.console.Comment("");
		},
		HTML: function(){
			os.console.Comment("Adding and Linking HTML");
			LostCell.HTML.app = document.getElementById("lostcell");
		},
		Console: function(){
			
			//  Adding JaHOVA OS terminal command
			
			//debug for mobile
			var help = "Run Lost Cell Demo";
			os.console.AddCommand("LostCell", LostCell.Run, LostCell.Run, help);

		},
		Controls: function(){
		    LostCell.HTML.app.requestFullscreen = LostCell.HTML.app.requestFullscreen ||
													LostCell.HTML.app.mozRequestFullScreen ||
													LostCell.HTML.app.webkitRequestFullscreen ||
													LostCell.HTML.app.msRequestFullscreen;
													
			document.exitFullscreen = document.exitFullscreen ||
									  document.mozCancelFullScreen ||
									  document.webkitExitFullscreen;
									  
			document.fullscreenEnabled = document.webkitIsFullScreen ||
										document.fullscreenEnabled ||
										 document.mozFullScreenEnabled;
										 
			document.addEventListener("webkitfullscreenchange", function(){console.log("Full Screen has changed");});


		},
		Audio: function(){
			os.console.Comment("Loading Audio");
			//Menu Chirp
			os.audio.Add("chirp", "scripts/jahovaos/audio/chirp", false, false);
		},
		States: function(){
			os.console.Comment("Laading Game States");
		}
	},
	Run: function(){
		os.debugbar.Disable();
		
		os.console.Comment("Running Lost Cell");
		os.audio.Play("chirp");
		
		os.input.Register.Touch.Event.End(LostCell.FullScreen, LostCell.FullScreen);
		os.input.Register.Mouse.Event.Up(LostCell.FullScreen, LostCell.FullScreen);
	},
	FullScreen: function(){
		LostCell.HTML.app.requestFullscreen();
	}
}