var jos = os; //Hello World
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
			Drone: null,
			Data: null,
			Upgrade: null,
			Login: null
		},
		droneStateDroneImageWrapper: null,
		droneStateAtomImageWrapper: null,
		dataStateDroneImageWrapper: null,
		dataStateAtomImageWrapper: null,
		loginButton: null
	},
	FSM: null,
	States: {
		Data: null,
		Upgrade: null,
		Drone: null
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
			//document.addEventListener("touchstart", _InputEvents.Touch.Start, false);
			//document.addEventListener("touchend", _InputEvents.Touch.End, false);
			//document.addEventListener("touchmove", _InputEvents.Touch.Move, false);
			
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
				//Cache for aniamted transition
				var nextName = ""; 
				var nextMessage = "";
				
				var self = this;
				var _Enter = function(oMessage){
					if(owner.HTML.States[_CurrentState.GetName()]){
						owner.HTML.States[_CurrentState.GetName()].AppendClass("activeState");
						owner.HTML.States[_CurrentState.GetName()].RemoveClass("inactiveState");
					}
					
					_CurrentState.Enter(owner, oMessage);
				}
				var _Exit = function(oMessage){
					if(owner.HTML.States[_CurrentState.GetName()]){
						owner.HTML.States[_CurrentState.GetName()].AppendClass("inactiveState");
						owner.HTML.States[_CurrentState.GetName()].RemoveClass("activeState");
					}
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
				this.AnimationBegin = "";
				this.AnimationEnd = "";
				this.AnimatedHTML = "";
				this.Animating = false;
				this.AnimatedTransition = function(sName, oMessage){
					if(!self.Animating){
						self.Animating = true;
						nextName = sName;
						nextMessage = oMessage;
						
						self.AnimatedHTML.RemoveClass(self.AnimationEnd);
						self.AnimatedHTML.AppendClass(self.AnimationBegin);
						//this.AnimatedHTML.html.addEventListener('webkitTransitionEnd', this.Animate, false);
						self.AnimatedHTML.html.addEventListener('transitionend', self.Animate, false);
					}
					
					
				}
				
				this.Animate = function(sName, oMessage){
					//Remove Event Listener
					//this.AnimatedHTML.html.removeEventListener('webkitTransitionEnd', this.Animate, false);
					self.AnimatedHTML.html.removeEventListener('transitionend', self.Animate, false);
					
					//Set Animating to False
					self.Animating = false;
					
					//Call Exit for Current State
					_Exit(nextMessage);
					
					//Get New State to Transition Too
					_CurrentState = _States.get(nextName);
					
					//Transition
					self.AnimatedHTML.RemoveClass(self.AnimationBegin);
					self.AnimatedHTML.AppendClass(self.AnimationEnd);
					
					//Call New States Setup and Exectue Methods
					_Enter(nextMessage);
					_Execute(nextMessage);
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
		OSHTMLELement: function(){
			//HTML element base class
			os.resschmgr.HTML = function(tag){
				//Creates HTML element if tag exist        
				this.html =  tag ? document.createElement(tag) : null;
	
			}
			os.resschmgr.HTML.prototype.AppendClass = function(sClass){
				this.html.className += " " + sClass + " ";
				return this.html.className;
			}
			os.resschmgr.HTML.prototype.AppendChild = function(childHTML){
				this.html.appendChild(childHTML);
			}
			os.resschmgr.HTML.prototype.AppendToID = function(parentID){
				document.getElementById(parentID).appendChild(this.html);
			}
			os.resschmgr.HTML.prototype.AppendToHTML = function(parentHTML){
				parentHTML.appendChild(this.html);
			}
			os.resschmgr.HTML.prototype.RemoveClass = function(sClass){
				//Remove class
				//var classes = this.html.className.replace(sClass, "");
				
				//Remove wthite space and split into array
				//classes = self.html.className.split(/\s+/);
				
				//Save array as string seperated by space
				var classes = ((this.html.className.replace(/^\s+|\s+$/g, "")).replace(sClass, "").split(/\s+/));
				classes.push(" ");
				
				this.html.className = classes.join(" ");
				
				return this.html.className;
			}
			os.resschmgr.HTML.prototype.RemoveChild = function(id){
				this.html.removeChild(document.getElementById(id));
			}
			os.resschmgr.HTML.prototype.RemoveAllClasses = function(){
	
				this.html.className = "";
			}
			os.resschmgr.HTML.prototype.RemoveAllChildren = function(){
			
				if ( this.html.hasChildNodes() )
				{
					while ( this.html.childNodes.length >= 1 )
					{
						this.html.removeChild( this.html.firstChild );       
					} 
				}
			}
			os.resschmgr.HTML.prototype.SetHTML = function(oHTML){
				this.html = oHTML;//document.getElementById(id);
			}
			os.resschmgr.HTML.prototype.CreateHTML = function(tag){
				this.html = document.createElement(tag);
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
			
			os.console.AppendComment("	Adding HTML Element Class");
			LostCell.Load.OSHTMLELement();
			
			//os.console.AppendComment("Adding Animation System");
			//LostCell.Load.OSAnimation();
			
			os.console.Comment("");
		},
		HTML: function(){
			os.console.Comment("Adding and Linking HTML");
			LostCell.HTML.app = new os.resschmgr.HTML();
			LostCell.HTML.app.SetHTML(document.getElementById("lostcell"));
			
			LostCell.HTML.States.Data = new os.resschmgr.HTML();
			LostCell.HTML.States.Data.SetHTML(document.getElementById("Data"));
			
			LostCell.HTML.States.Drone = new os.resschmgr.HTML();
			LostCell.HTML.States.Drone.SetHTML(document.getElementById("Drone"));
			
			LostCell.HTML.States.Upgrade = new os.resschmgr.HTML();
			LostCell.HTML.States.Upgrade.SetHTML(document.getElementById("Upgrade"));
			
			LostCell.HTML.States.Login = new os.resschmgr.HTML();
			LostCell.HTML.States.Login.SetHTML(document.getElementById("Login"));
			
			
			LostCell.HTML.droneStateDroneImageWrapper = document.getElementById('droneStateBetaDroneWrapper');
			LostCell.HTML.droneStateAtomImageWrapper = document.getElementById("droneStateAtomWrapper");
			
			LostCell.HTML.dataStateDroneImageWrapper = document.getElementById('dataStateBetaDroneWrapper');
			LostCell.HTML.dataStateAtomImageWrapper = document.getElementById("dataStateAtomWrapper");
			
			LostCell.HTML.loginButton = document.getElementById("loginButton");
			
						 
			
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
			os.console.Comment("Creating FSM");
			LostCell.FSM = LostCell.AIManager.FSM.Create(LostCell);
			LostCell.FSM.AnimationBegin = "flyOut";
			LostCell.FSM.AnimationEnd = "flyIn";
			LostCell.FSM.AnimatedHTML = LostCell.HTML.app;
			
			os.console.Comment("Laading Game States");
			LostCell.States.Drone = LostCell.AIManager.State.Create("Drone");
			LostCell.States.Drone.Enter = function(obj, msg){
				LostCell.HTML.droneStateDroneImageWrapper.addEventListener("mousedown", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
				LostCell.HTML.droneStateAtomImageWrapper.addEventListener("mousedown", function(){LostCell.FSM.AnimatedTransition("Data");}, false);
				LostCell.HTML.droneStateDroneImageWrapper.addEventListener("touchend", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
				LostCell.HTML.droneStateAtomImageWrapper.addEventListener("touchend", function(){LostCell.FSM.AnimatedTransition("Data");}, false);
			}
			LostCell.States.Drone.Execute = function(obj, msg){
				
			}
			LostCell.States.Drone.Exit = function(obj, msg){
				LostCell.HTML.droneStateDroneImageWrapper.removeEventListener("mousedown", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
				LostCell.HTML.droneStateAtomImageWrapper.removeEventListener("mousedown", function(){LostCell.FSM.AnimatedTransition("Data");}, false);
				LostCell.HTML.droneStateDroneImageWrapper.removeEventListener("touchend", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
				LostCell.HTML.droneStateAtomImageWrapper.removeEventListener("touchend", function(){LostCell.FSM.AnimatedTransition("Data");}, false);
			}
			
			
			LostCell.States.Upgrade = LostCell.AIManager.State.Create("Upgrade");
			LostCell.States.Upgrade.Enter = function(obj, msg){
				
			}
			LostCell.States.Upgrade.Execute = function(obj, msg){
				
			}
			LostCell.States.Upgrade.Exit = function(obj, msg){
				
			}
			
			LostCell.States.Data = LostCell.AIManager.State.Create("Data");
			LostCell.States.Data.Enter = function(obj, msg){
				LostCell.HTML.dataStateDroneImageWrapper.addEventListener("mousedown", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
				LostCell.HTML.dataStateAtomImageWrapper.addEventListener("mousedown", function(){LostCell.FSM.AnimatedTransition("Data");}, false);
				LostCell.HTML.dataStateDroneImageWrapper.addEventListener("touchend", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
				LostCell.HTML.dataStateAtomImageWrapper.addEventListener("touchend", function(){LostCell.FSM.AnimatedTransition("Data");}, false);
				
				//g2 = new Dygraph( document.getElementById("graphdiv2"),
				//					"temperatures.csv", // path to CSV file
				//					{});          // options
				//
				
					data = {
					labels: ["1", "2", "3", "4", "5", "6", "7"],
					datasets: [
						{
							label: "Drone 1",
							fillColor: "rgba(255, 69, 0, 0.2)",
							strokeColor: "#FF4500", //"rgba(220,220,220,1)",
							pointColor: "#FF4500", //"rgba(220,220,220,1)",
							pointStrokeColor: "#FF4500", //"#fff",
							pointHighlightFill: "#FF4500", //"#fff",
							pointHighlightStroke: "rgba(220,220,220,1)",
							data: [
									{ x: 19, y: 65 }, 
									{ x: 27, y: 59 }, 
									{ x: 28, y: 69 }, 
									{ x: 40, y: 81, r:3 },
									{ x: 48, y: 56 }
								  ]
							//data: [65, 59, 80, 81, 56, 55, 40]
						},
						
						{
							label: "Drone 2",
							fillColor: "rgba(151,187,205,0.2)",
							strokeColor: "#CC5B94",
							pointColor: "#CC5B94",
							pointStrokeColor: "#CC5B94",
							pointHighlightFill: "#CC5B94",
							pointHighlightStroke: "rgba(204, 91, 148, 0.2)",
							data: [
									{ x: 19, y: 75, r: 1 }, 
									{ x: 27, y: 69, r: 1 }, 
									{ x: 28, y: 70, r: 1 }, 
									{ x: 40, y: 31, r: 1 },
									{ x: 48, y: 76, r: 1 },
									{ x: 52, y: 23, r: 1 }, 
									{ x: 55, y: 32, r: 1 }
								  ]
						},
						{
							label: "Drone 3",
							fillColor: "rgba(151,187,205,0.2)",
							strokeColor: "#0DDA00",
							pointColor: "#0DDA00",
							pointStrokeColor: "#0DDA00",
							pointHighlightFill: "#0DDA00",
							pointHighlightStroke: "rgba(13, 218, 0, 0.2)",
							data: [
									{ x: 16, y: 75, r: 1 }, 
									{ x: 29, y: 69, r: 1 }, 
									{ x: 32, y: 70, r: 1 }, 
									{ x: 40, y: 31, r: 1 },
									{ x: 44, y: 76, r: 1 },
									{ x: 58, y: 23, r: 1 }, 
									{ x: 62, y: 32, r: 1 }
								  ]
						},
						{
							label: "Drone 4",
							fillColor: "rgba(151,187,205,0.2)",
							strokeColor: "#2D2F6B",
							pointColor: "#2D2F6B",
							pointStrokeColor: "#2D2F6B",
							pointHighlightFill: "#2D2F6B",
							pointHighlightStroke: "rgba(45, 47, 107, 0.2)",
							data: [
									{ x: 12, y: 75, r: 3 }, 
									{ x: 22, y: 69, r: 1 }, 
									{ x: 29, y: 70, r: 1 }, 
									{ x: 42, y: 31, r: 1 },
									{ x: 55, y: 85, r: 3 },
									{ x: 59, y: 23, r: 1 }, 
									{ x: 72, y: 32, r: 1 }
								  ]
						}
						
					]
				};
				ctx = document.getElementById("myChart").getContext("2d");
				options={};
				myLineChart = new Chart(ctx).Line(data, options);
				//myLineChart = new Chart(ctx).Scatter(data, options);
			}
			LostCell.States.Data.Execute = function(obj, msg){
				
			}
			LostCell.States.Data.Exit = function(obj, msg){
				LostCell.HTML.dataStateDroneImageWrapper.addEventListener("mousedown", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
				LostCell.HTML.dataStateAtomImageWrapper.addEventListener("mousedown", function(){LostCell.FSM.AnimatedTransition("Data");}, false);
				LostCell.HTML.dataStateDroneImageWrapper.removeEventListener("touchend", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
				LostCell.HTML.dataStateAtomImageWrapper.removeEventListener("touchend", function(){LostCell.FSM.AnimatedTransition("Data");}, false);
			}
			
			LostCell.States.Login = LostCell.AIManager.State.Create("Login");
			LostCell.States.Login.Enter = function(obj, msg){
				LostCell.HTML.loginButton.addEventListener("mousedown", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
				LostCell.HTML.loginButton.addEventListener("touchend", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
			}
			LostCell.States.Login.Execute = function(obj, msg){
				
			}
			LostCell.States.Login.Exit = function(obj, msg){
				LostCell.HTML.loginButton.removeEventListener("mousedown", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
				LostCell.HTML.loginButton.removeEventListener("touchend", function(){LostCell.FSM.AnimatedTransition("Drone");}, false);
			}
		
		}
	},
	Run: function(){
		os.debugbar.Disable();
		
		os.console.Comment("Running Lost Cell");
		//os.audio.Play("chirp");
		
		//os.input.Register.Touch.Event.End(LostCell.FullScreen, LostCell.FullScreen);
		//os.input.Register.Mouse.Event.Up(LostCell.FullScreen, LostCell.FullScreen);
		
		//LostCell.FSM.Transition("Login");
		LostCell.FSM.Transition("Data");
	},
	FullScreen: function(){
		//LostCell.HTML.app.requestFullscreen();
		if(LostCell.FSM.GetState() == "Drone"){
			LostCell.FSM.AnimatedTransition("Upgrade");
		}
		else{
			LostCell.FSM.AnimatedTransition("Drone");
		}
	}
}