//JaHOVA OS


var com = {};



/***h* JaHOVA
 *  LINKS
 *
 *  NAME
 *      JaHOVA
 *      
 *  AUTHOR
 *      Corey Clark PhD
 *      cclark@coreyclarkphd.com
 *      
 *  HISTORY
 *      Created 4.14.2011
 *      
 *  DESCRIPTION
 *      This is the wrapper/namespace for the entire
 *      OS, Core and Utilities Modules
 *
 *  USAGE
 */
com.jahova = {}
/*
*  NOTES
*     N/A
*
*  IDEAS
*     N/A
*
*  TODO
*
*  
**/

/**h* JaHOVA/OS
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p>
*
*  NAME
*       JaHOVA OS Module
*    
*  AUTHOR
*       Corey Clark
*       cclark@coreyclarkphd.com
*
*  HISTORY
*       Created: 4/14/2011
*   
*
*  DESCRIPTION
*       This module is a Singletong that holds all of the OS Objects:
*       Kernel
*       Internal JaHOVA Cores
*     
*  EXAMPLE
*       os = com.jahova.os.Instance()
*       
*  NOTES
*     N/A
*
*  IDEAS
*     N/A
*
*  TODO
*  
**/
com.jahova.os = (function()
            {
                
                var pInstance;
                
                /**m* OS/Constructor
                 *
                 *  NAME
                 *      OS Constructor
                 *      
                 *  DESCRIPTION
                 *      Private Method called by Public Static Instance Method
                 *
                 *  USAGE
                 */
                function constructor()
                {
                    
                    //******************
                    //PRIVATE ATTRIBUTES
                    //******************
                    
                    //CONSTANTS
                    var NAME = "JaHOVA OS";
                    var VERSION = "0v5";
                    var PATH = "scripts/jahova/OS/jahova.os.js";
                    var DOMAIN = "http://gametheorylabs.com/JaHOVAOS/";
                
                    
                    //******************
                    //PRIVATE METHODS AND OBJECTS
                    //******************
                    
                    return{
                        
                    
                        //******************
                        //PUBLIC ATTRIBUTES
                        //******************
                            //OS MODULE
                            os: null,
                            kernel: null,
                            command: null,
                            resschmgr: null,
                            instruction: null,
                            
                            //Internal Cores/APIs
                            cores: null,
                            network: null,
                            threads: null,
                            html: null,
                            windows: null,
                            datbase: null,
                            audio: null,
                            graphics: null,
                            
                            //UTILITIES MODULE
                            utilities: null,
                            console: null,
                            debugbar: null,
                            timer: null,
                            
                            //OS ATTRIBUTES
                            queryString: null,
                            
                            //Splash Screen
                            splash: null,
                            video: null,
                        
                        
                        //******************
                        //PUBLIC PRIVILEDGE METHODS
                        //******************
                            //Accessor and Interface Methods
                            
                            GetName: function(){
                                return NAME;
                            },
                            
                            GetVersion: function(){
                                return VERSION;
                            },
                            
                            GetPath: function(){
                                return PATH;
                            },
                            
                            GetDomain: function(){
                                return DOMAIN;
                            },
                            
                            Load: function(app){
                                this.video = document.createElement("video");//new Image();
                                if(this.video.canPlayType('video/m4v;')){
                                    this.video.src = "images/splash.m4v";
                                }
                                else{
                                    this.video.src = "images/splash.webm";
                                }
                                
                                this.video.setAttribute('preload', 'auto');
                                this.video.setAttribute('autoplay', 'autoplay');
                                this.video.style.width = "100%";
                                this.video.style.height = "100%";
                                //this.video.style.position = "absolute";
                                //this.video.style.zIndex = 1000;
                                
                                this.os = com.jahova.os.Instance();
                                
                                this.utilities = com.jahova.utilities.Instance();
                                
                                this.kernel = this.os.Kernel.Instance();
                                this.kernel.Initialize();
                                
                                this.console = this.utilities.Console.Instance();
                                this.console.Initialize();
                                
                                this.debugbar = this.utilities.DebugBar.Instance();
                                this.debugbar.Initialize();
                                                                
                                this.resschmgr = this.kernel.ResSchMgr.Instance();
                                this.resschmgr.Initialize();
                                
                                this.timer = this.utilities.Timer.Instance();
                                this.timer.Initialize();
                                
                                this.instruction = this.kernel.Instruction.Instance();
                                this.instruction.Initialize();
                                
                                this.command = this.kernel.Command.Instance();
                                this.command.Initialize();
                                
                                this.cores = this.os.Cores.Instance();
                                this.cores.Initialize();
                                
                                this.network = this.cores.Network.Instance();
                                this.network.Initialize();
                                
                                this.threads = this.cores.Threads.Instance();
                                this.threads.Initialize();
                                
                                this.html = this.cores.HTML.Instance();
                                this.html.Initialize();
                                
                                this.windows = this.cores.Windows.Instance();
                                this.windows.Initialize();
                                
                                this.database = this.cores.Database.Instance();
                                this.database.Initialize();
                                
                                this.audio = this.cores.Audio.Instance();
                                this.audio.Initialize();
                                
                                this.graphics = this.cores.Graphics.Instance();
                                this.graphics.Initialize();
                                
                                this.physics = this.cores.Physics.Instance();
                                this.physics.Initialize();
                                
                                this.console.AppendComment("\n**************************\n\nOS LOADING COMPLETE\n\n**************************\n\n");
                                this.console.AppendComment("Loaded Modules")
                                this.console.AppendComment("    " + this.os.GetName());
                                this.console.AppendComment("        " + this.kernel.GetName());
                                this.console.AppendComment("            " + this.command.GetName());
                                this.console.AppendComment("            " + this.resschmgr.GetName());
                                this.console.AppendComment("            " + this.instruction.GetName());
                                this.console.AppendComment("        " + this.cores.GetName());
                                this.console.AppendComment("            " + this.network.GetName());
                                this.console.AppendComment("            " + this.threads.GetName());
                                this.console.AppendComment("            " + this.html.GetName());
                                this.console.AppendComment("            " + this.windows.GetName());
                                this.console.AppendComment("            " + this.database.GetName());
                                this.console.AppendComment("            " + this.audio.GetName());
                                this.console.AppendComment("            " + this.graphics.GetName());
                                this.console.AppendComment("            " + this.physics.GetName());
                                this.console.AppendComment("    " + this.utilities.GetName());
                                this.console.AppendComment("        " + this.console.GetName());
                                this.console.AppendComment("        " + this.timer.GetName());
                                this.console.AppendComment("        " + this.debugbar.GetName());
                                this.console.AppendComment("");
                                
                                pInstance.splash = pInstance.os.windows.WindowsManager.Create.Window("", "PC");
                                pInstance.splash.Hide.menubar();
                                pInstance.splash.Hide.statusbar();
                                pInstance.splash.Hide.titlebar();
                                pInstance.splash.Hide.toolbar();
                                pInstance.splash.Set.width(480);
                                pInstance.splash.Set.height(270);
                                
                                pInstance.splash.elements.content.AppendChild(pInstance.os.video);
                                pInstance.splash.elements.content.html().style.overflow = 'hidden';
                                        
                                pInstance.splash.Set.position((window.innerHeight / 2) - 135,(window.innerWidth / 2) - 240);
                                this.PlaySplash = function(){
                                        
                                        pInstance.splash.Display.window();
                                        this.video.play();
                                        setTimeout(pInstance.splash.Hide.window, 4000);
                                    }
                                    
                                this.console.AppendComment("\n\nLoading Terminal Commands, type help to see a list of available commands\n");
                                this.console.LoadCommands();
                                
                                this.console.AppendComment("\n\Initializing Query Variables\n");
                                pInstance.os.queryString = pInstance.os.resschmgr.Create.Map();
                                pInstance.os.GetQueryString();
                                
                                this.console.Comment("");
                                
                                //Execute any Console or Applications in Query String
                                pInstance.os.ExecuteQuery();
                                
                                if(app){
                                    this.PlaySplash;
                                    app()
                                };
                                
                                
                            },
                            GetQueryString: function(){
                                
                                var re = /[?&]([^=]+)(?:=([^&]*))?/g;
                                var matchInfo;
                                
                                matchInfo = re.exec(location.search)
                                while(matchInfo)
                                {
                                    pInstance.os.queryString.put(matchInfo[1].toUpperCase(), unescape(matchInfo[2]));
                                    matchInfo = re.exec(location.search)
                                }
                                
                                for( var i = 0; i < pInstance.os.queryString.size; i++)
                                {
                                    pInstance.os.console.AppendComment("Key: " + pInstance.os.queryString.key() + ", Value: " + pInstance.os.queryString.value());
                                    pInstance.os.queryString.next();
                                }
                                pInstance.os.console.Comment("");
                            },
                            ExecuteQuery: function(){
                                var cmdConsole = pInstance.os.queryString.get("CONSOLE");
                                var cmdApp = pInstance.os.queryString.get("APP");
                                
                                if(cmdConsole){
                                    pInstance.console.cmdWindow.value += cmdConsole;
                                    pInstance.console.ProcessInputString();
                                }
                                else if(cmdApp){
                                    
                                    pInstance.PlaySplash();
                                    //Gamepad();
                                    window[cmdApp]();
                                }
                            },
                        
                        //PUBLIC OBJECTS/CLASSES
                            Kernel: null,
                            Cores: null,
                            
                            //HTML Elements
                            Elements: {
                                JaHOVA: null,
                                Console: null,
                                OS: null,
                                Documentation: null,
                                Demos: null,
                                Application: null,
                                IDE: null
                            }
                            
                            
                    }
                }
                
                return {
                    //OBJECT ACCESSOR
                    Instance: function()
                    {
                        if(!pInstance)
                        {
                            //Instantiate if pInstance does not exist
                            pInstance = constructor();
                            os = com.jahova.os.Instance();
                        }
                        
                        return pInstance;
                    }
                }
            })();
//JaHOVA OS Utilities
//      Dependent upone JaHOVA OS

/**h* JaHOVA/Utilities
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p> 
*
*  NAME
*    JaHOVA Utilities 
*    
*  AUTHOR
*   Corey Clark
*   cclark@coreyclarkphd.com
*
*  HISTORY
*   Created: 4/14/2011
*   
*
*  DESCRIPTION
*     This is the Utilities module for JaHOVA
*       Adds functionality not directly needed for
*       OS operation, but can be used to interface with
*       OS (i.e. command window,etc)
*     
*  Example
*  util = com.jahova.utilities.Instance();
**/



com.jahova.utilities = (function()
                    {
                        var pInstance;
                        /**m* Utilities/Constructor
                        *
                        *  SOURCE
                        */
                        function constructor()
                        {
                            //PRIVATE ATTRIBUTES
                            var NAME = "JaHOVA Utilities";
                            var VERSION = "0v3";
                            var PATH = "scripts/jahova/Utilities/jahova.utilities.js";
                            var os = null
                            var utilities = null;
                            var console = null;
                        
                            //PRIVATE METHODS
                            
                            //Adds inheritance method to Function object
                            /*
                                MyChild = function(){ ... }
                                MyChild.inheritsFrom(MyParent);
                            */
                            Function.prototype.inherits = function( parentClassOrObject )
                            { 
                                if ( parentClassOrObject.constructor == Function ) 
                                { 
                                        //Normal Inheritance 
                                        this.prototype = new parentClassOrObject;
                                        this.prototype.constructor = this;
                                        this.prototype.parent = parentClassOrObject.prototype;
                                } 
                                else 
                                { 
                                        //Pure Virtual Inheritance 
                                        this.prototype = parentClassOrObject;
                                        this.prototype.constructor = this;
                                        this.prototype.parent = parentClassOrObject;
                                } 
                                return this;
                            }
                            
                            //Adds a bind method to Function object, that will ensure
                            //  scope of the "this" parameter is set appropriately
                            /*
                                myClass = function()
                                {
                                    this.myFunc = function()
                                    {
                                          ... do stuff ...
                                    }.bind(this);
                                  
                                }
                                
                                myClass.prototype.secondFun = function()
                                {
                                  
                                }
                                var testObj = new myClass();
                                someObj.func = testObj.secondFun.bind(testObj);
                            */
                            Function.prototype.bind = function(scope)
                            {
                                var _function = this;
                                
                                return function() {
                                  return _function.apply(scope, arguments);
                                }
                            }
                            /*
                            **/
                            return{
                                //PUBLIC ATTRIBUTES
                                
                                //PUBLIC PRIVILEDGE METHODS
                                /**m* Utilities/GetName
                                *
                                *  SOURCE
                                */
                                GetName: function()
                                {
                                    return NAME;
                                },
                                /*
                                 **/
                                /**m* Utilities/GetVersion
                                *
                                *  SOURCE
                                */
                                GetVersion: function()
                                {
                                    return VERSION;
                                },
                                /*
                                 **/
                                /**m* Utilities/GetPath
                                *
                                *  SOURCE
                                */
                                GetPath: function()
                                {
                                    return PATH;
                                },
                                /*
                                 **/
                                //PUBLIC OBJECT/CLASSES
                                Console: null
                            }
                        }
                        
                        return {
                            //OBJECT ACCESSOR
                            Instance: function()
                            {
                                if(!pInstance)
                                {
                                    //Instantiate if pInstance does not exist
                                    pInstance = constructor();
                                }
                                
                                return pInstance;
                            }
                        }
                    })();
//JaHOVA Utilities : Console 
//      Dependent on JaHOVA Utilities

/**h* Utilities/Console
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p>
*
*  NAME
*    JaHOVA Utilities Console
*    
*  AUTHOR
*   Corey Clark
*   cclark@coreyclarkphd.com
*
*  HISTORY
*   Created: 4/14/2011
*   
*
*  DESCRIPTION
*     This module adds console window and functionality
*     
*
*  EXAMPLE
*   console = com.jahova.utilities.Instance().Console.Instance();
**/


com.jahova.utilities.Instance().Console = (function()
                        {
                            var pInstance;
                           
                            function constructor()
                            {
                                //******************
                                //PRIVATE ATTRIBUTES
                                //******************
                                
                                var NAME = "JaHOVA Utilities : Console Module";
                                var VERSION = "0v4";
                                var PATH = "scripts/jahova/Utilities/Console/jahova.utilities.console.js";
                                var ENABLED = true;
                                
                                var os = com.jahova.os.Instance();
                                var prompt = "~JaHOVA OS >>";
                                var console = this;

                                //******************
                                //PRIVATE METHODS
                                //******************
                                
                                
                                //******************
                                //INITALIZATION
                                //******************

                                
                                return{
                                    //PUBLIC ATTRIBUTES
                                    
                                    cmdWindow: null,
                                    length: 0,
                                    Pinned: false,
                                    ConsoleHover: false,
                                    APIPinned: false,
                                    APIHover: false,
                                    Commands: null,
                                    
                                    //PUBLIC PRIVILEDGE METHODS
                                    
                                    GetName: function(){
                                        return NAME;
                                    },
                                    
                                    GetVersion: function(){
                                        return VERSION;
                                    },
                                    
                                    GetPath: function(){
                                        return PATH;
                                    },
                                    
                                    GetStatus: function(){
                                        return ENABLED;
                                    },
                                    GetPrompt: function(){
                                        return prompt;
                                    },
                                    Enable: function(){
                                        ENABLED = true;
                                        console.cmdWindow.onkeydown = console.EvaluateInput;
                                    },
                                    
                                    Disable: function(){
                                        ENABLED = false;
                                        console.cmdWindow.onkeydown = null;
                                    },
                                    
                                    Initialize: function(){
                                        console = this;
                                        
                                        if(os.Elements.ConsoleTabText)
                                        {
                                            os.Elements.ConsoleTabText.onclick = console.PinHover;
                                            os.Elements.ConsoleTabPageHeaderPin.onclick = console.Pin;
                                        }
                                        else
                                        {
                                            //os.Elements.FolderViewHeaderPin.onclick = console.SEHide;
                                            //os.Elements.IdeFolderViewHeaderPin.onclick = console.SEShow;
                                            //os.Elements.ConsoleH3.onclick = console.MakeActive;
                                            //os.Elements.ErrorH3.onclick = console.MakeActive;
                                            //
                                            //os.Elements.DocH31.onclick = console.MakeFileActive;
                                            //os.Elements.DocH32.onclick = console.MakeFileActive;
                                        }
                                        
                                        //Setup Console Window
                                        console.cmdWindow = document.createElement("textarea");
                                        console.cmdWindow.id = "com.jahova.console.textarea";
                                        console.cmdWindow.className = "console";
                                        console.cmdWindow.onkeydown = console.EvaluateInput;
                                    
                                        console.cmdWindow.value = prompt;
                                        //os.Elements.OutputConsoleDiv.appendChild(console.cmdWindow);
                                        
                                        

                                    },
                                    
                                    LoadCommands: function(){
                                        this.Commands = os.resschmgr.Create.Map();
                                        
                                        //Load Default Commands
                                        var help = "Clears command window\nExample >> clear";
                                        this.AddCommand("clear", function(){this.cmdWindow.value = "";}, this, help);
                                        
                                        help = "Displays a list of all loaded commands\nExample >> help";
                                        this.AddCommand("help", this.DisplayCommands, this, help);
                                        
                                        help = "Pins the console and prevents from sliding back\nExample >> pin"
                                        this.AddCommand("pin", this.Pin, this, help);
                                        
                                        help = "Load Multi-threaded Physics Demo\nExample >>threads";
                                        this.AddCommand("threads", this.ThreadDemo, this, help);
                                        
                                        help = "Load Isometric Mutlithreaded Physics Demo\nExample >>threads2";
                                        this.AddCommand("threads2", this.ThreadDemo2, this, help);
                                        
                                        help = "Create a socket and connect to test server, ";
                                        help += "Allows the use of SocketSend and SocketClose Commands";
                                        help += "\nExample >>SocketOpen";
                                        this.AddCommand("SocketOpen", this.SocketCreate,this, help);
                                        
                                        help = "Sends message to server via connected socket, ";
                                        help += "Message will be broadcast to all connected users and display in console";
                                        help += "\nExample >> SocketSend your message here";
                                        this.AddCommand("SocketSend", this.SocketSend, this, help);
                                        
                                        help = "Closes connected socket\nExample >> SocketClose";
                                        this.AddCommand("SocketClose", this.SocketClose, this, help);
                                        
                                        help = "Create a Window\nExample >>CreateWindow [ID Name Width Height Top Left]";
                                        this.AddCommand("CreateWindow", this.CreateWindow, this, help);
                                        
                                        help = "Start Timer\nExample >>StartTimer";
                                        this.AddCommand("StartTimer", this.StartTimer, this, help);
                                        
                                        help = "Stop Timer\nExample >>StopTimer";
                                        this.AddCommand("StopTimer", this.StopTimer, this, help);
                                        
                                        help = "Lap Timer\nExample >>LapTimer lapName";
                                        this.AddCommand("LapTimer", this.LapTimer, this, help);
                                        
                                        help = "Get Time for specific Lap\nExample >>GetLap lapName";
                                        this.AddCommand("GetLap", this.GetLap, this, help);
                                        
                                        help = "Remove Lap From Timer Log\nExample >>RemoveLap lapName";
                                        this.AddCommand("RemoveLap", this.RemoveLap, this, help);
                                        
                                        help = "List All Laps in Log\nExample >>ListLaps";
                                        this.AddCommand("ListLaps", this.ListLaps, this, help);
                                        
                                        help = "Get Total Elapsed Time\nExample >>ElapsedTime";
                                        this.AddCommand("GetElapsedTime", this.GetElapsedTime, this, help);
                                        
                                        help = "Clear Timer Log and Reset\nExample >>ResetTimer";
                                        this.AddCommand("ResetTimer", this.ResetTimer, this, help);
                                        
                                        help = "Create Thread API Thread Controller\nExample >>CreateController";
                                        this.AddCommand("CreateController", this.CreateThreadController, this, help);
                                        
                                        help = "Create Thread\nExample >>CreateController name type priority suspend callback input pool maxThreadCount";
                                        this.AddCommand("CreateThread", this.CreateThread, this, help);
                                        
                                        help = "Execute Thread\nExample >>ExecuteThread";
                                        this.AddCommand("ExecuteThread", this.ExecuteThread, this, help);
                                        
                                        help = "Suspend Thread\nExample >>SuspendThread";
                                        this.AddCommand("SuspendThread", this.SuspendThread, this, help);
                                        
                                        help = "Resume Thread\nExample >>ResumeThread";
                                        this.AddCommand("ResumeThread", this.ResumeThread, this, help);
                                        
                                        help = "Get Thread Suspend Count\nExample >>GetSuspendCount";
                                        this.AddCommand("GetSuspendCount", this.GetSuspendCount, this, help);
                                        
                                        help = "Get Thread Function\nExample >>GetThreadFunction";
                                        this.AddCommand("GetThreadFunction", this.GetThreadFunction, this, help);
                                        
                                        help = "Add Thread Task, will be queue if busy\nExample >>AddThreadTask";
                                        this.AddCommand("AddThreadTask", this.AddThreadTask, this, help);
                                        
                                        help = "Get Current Task of Thread\nExample >>GetThreadCurrentTask";
                                        this.AddCommand("GetThreadCurrentTask", this.GetThreadCurrentTask, this, help);
                                        
                                        help = "Get All Pending Task For Thread\nExample >>GetThreadPendingTask";
                                        this.AddCommand("GetThreadPendingTask", this.GetThreadPendingTask, this, help);
                                        
                                        help = "Get Thread Status\nExample >>GetThreadStatus";
                                        this.AddCommand("GetThreadStatus", this.GetThreadStatus, this, help);
                                        
                                        help = "Get Thread Priority\nExample >>GetThreadPriority";
                                        this.AddCommand("GetThreadPriority", this.GetThreadPriority, this, help);
                                        
                                        help = "Set Thread Priority\nExample >>SetThreadPriority";
                                        this.AddCommand("SetThreadPriority", this.SetThreadPriority, this, help);
                                        
                                        help = "Get Thread Filename\nExample >>GetThreadFilename";
                                        this.AddCommand("GetThreadFilename", this.GetThreadFilename, this, help);
                                        
                                        help = "Create WebSocket in Thread Controller\nExample >>CreateThreadSocket";
                                        this.AddCommand("CreateThreadSocket", this.CreateThreadSocket, this, help);
                                        
                                        help = "Close WebSocket in Thread Controller\nExample >>CloseThreadSocket";
                                        this.AddCommand("CloseThreadSocket", this.CloseThreadSocket, this, help);
                                        
                                        help = "Load Unearthed Web Client\nExample >>UE";
                                        this.AddCommand("UE", this.UE, this, help);
                                        
                                        help = "Get A File From WebDAV Server and Display\nExample >>GetFile filename";
                                        this.AddCommand("GetFile", this.GetFile, this, help);
                                        
                                        help = "Get A Folder From WebDAV Server and Display\nExample >>GetFolder foldername/";
                                        this.AddCommand("GetFolder", this.GetFolder, this, help);
                                        
                                        help = "Save contents of file to WebDAV Server\nExample >>SaveFile filename ";
                                        this.AddCommand("SaveFile", this.SaveFile, this, help);
                                        
                                        help = "Delete file from WebDAV Server\nExample >>DeleteFile filename ";
                                        this.AddCommand("DeleteFile", this.DeleteFile, this, help);
                                        
                                        help = "Grabs Query String and Display Key/Value Pairs\nExample >>GetQueryString ";
                                        this.AddCommand("GetQueryString", this.GetQueryString, this, help);
                                        
                                        help = "Plot Distribution from File\nExample >>Graph filename ";
                                        this.AddCommand("Graph", this.Graph, this, help);
                                        
                                        help = "PHP Echo Test via AJAX\nExample >>PHPEcho value [values...] ";
                                        this.AddCommand("PHPEcho", this.PHPEcho, this, help);
                                        
                                        help = "Open MySQL DB via AJAX/PHP\nExample >>DBOpen url username password databaseName ";
                                        this.AddCommand("DBOpen", this.DBOpen, this, help);
                                        
                                        help = "Creates a Pop Up Window to Install the Sercuirty Certificate\nCalls Server To Enable Cross Orgin Communication\nAllows HTTP to Communicated with HTTPS\nExample >>DBEnableSecureAccess ";
                                        this.AddCommand("DBEnableSecureAccess", this.DBEnableSecureAccess, this, help);
                                        
                                        help = "Open MySQL DB via AJAX/PHP Secure HTTPS Connection\nExample >>DBOpenSecure url username password databaseName ";
                                        this.AddCommand("DBOpenSecure", this.DBOpenSecure, this, help);
                                        
                                        help = "Selects All from test MySQL Database\nExample >>DBSelectAll  ";
                                        this.AddCommand("DBSelectAll", this.DBSelectAll, this, help);
                                        
                                        help = "Inserts a record into MySQL Database\nExample >>DBInsert  ";
                                        this.AddCommand("DBInsert", this.DBInsert, this, help);
                                        
                                        help = "Installs the Desktop Enviroment\nExample >>Desktop  ";
                                        this.AddCommand("Desktop", this.Desktop, this, help);
                                        
                                        help = "Displays Sample Error Window\nExample >>CreateErrorWindow  ";
                                        this.AddCommand("CreateErrorWindow", this.CreateErrorWindow, this, help);
                                        
                                        help = "Runs WebGL Demo\nExample >>WebGL  ";
                                        this.AddCommand("WebGL", this.WebGL, this, help);
                                        
                                        help = "Runs JaHOVA OS Server Demo\nExample >>JOSS  ";
                                        this.AddCommand("JOSS", this.JOSS, this, help);
                                        
                                        help = "Runs WebGL CubeMap Demo\nExample >>CubeMap  ";
                                        this.AddCommand("CubeMap", this.CubeMap, this, help);
                                        
                                        help = "Runs WebGL Dynamic Shadow Demo\nExample >>DynamicShadow  ";
                                        this.AddCommand("DynamicShadow", this.DynamicShadow, this, help);
                                        
                                        help = "Runs WebGL Fog Demo\nExample >>Fog  ";
                                        this.AddCommand("Fog", this.Fog, this, help);
                                        
                                        help = "Add Audio\nExample >>AudioAdd  ";
                                        this.AddCommand("AudioAdd", this.AudioAdd, this, help);
                                        
                                        help = "Play Audio\nExample >>AudioPlay  ";
                                        this.AddCommand("AudioPlay", this.AudioPlay, this, help);
                                        
                                        help = "Pause Audio\nExample >>AudioPause  ";
                                        this.AddCommand("AudioPause", this.AudioPause, this, help);
                                        
                                        help = "Runs Physics Demo\nExample >>Physics  ";
                                        this.AddCommand("Physics", this.Physics, this, help);
                                        
                                        help = "Runs Collision Detection\nExample >>Collision  ";
                                        this.AddCommand("Collision", this.Collision, this, help);
                                        
                                        help = "Opens Chrome Developer Tools\nExample >>Tools  ";
                                        this.AddCommand("Tools", this.Tools, this, help);
                                        //Display Loaded Commands
                                        //os.console.AppendComment("Commands Loaded: \n");
                                        //this.DisplayCommands();
                                        
                                    },
                                    //******************************************
                                    //
                                    //  THREAD API DEMO METHODS
                                    //
                                    //******************************************
                                    CreateThreadController: function(){
                                        os.threads.ThreadManager.CreateThreadController();
                                        os.console.AppendComment("Creating Thread Controller");
                                    },
                                    CreateThread: function(input){
                                        var params = input.split(" ");
                                        
                                        //Create Thread Function
                                        var myFunc = function(input){
                                            var sum = input.a + input.b;
                                            return "Sum: " + sum;
                                        };
                                        
                                        //Get Body of Function
                                        var body = os.threads.ThreadManager.GetFunctionBody(myFunc.toString());
                                        
                                        var callback = function(cmd){
                                            os.console.AppendComment("Message Type: " + cmd.msgType + "\nMessage Data: " + cmd.data);
                                        };
                                        //name, type, priority, suspend, callback, filename, input, pool, maxThreadCount
                                        //var thread = os.thread.ThreadManager.CreateThread(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7]);
                                        var thread = os.threads.ThreadManager.CreateThread("Test Thread", "DYNAMIC", 0, "true", callback ,body, "0", "false", 0);
                                        if(thread){
                                            os.console.AppendComment("Thread Created: ");
                                            os.console.AppendComment("     Thread Name:     " + thread.name);
                                            os.console.AppendComment("     Thread ID:       " + thread.ID);
                                            os.console.AppendComment("     Thread Type:     " + thread.type);
                                            os.console.AppendComment("     Thread Priority: " + thread.priority);
                                            os.console.AppendComment("     Thread Function: \n          var sum = input.a + input.b; \n          return sum\n\n")
                                        }
                                        else{
                                            os.console.AppendComment("Returned null, Thread name already exist in map");
                                        }
                                        
                                    },
                                    ExecuteThread: function(input){
                                        //Get Thread Object
                                        var thread = os.threads.ThreadManager.GetThreadByName("Test Thread");
                                        
                                        os.console.AppendComment("Executing Thread: Summing 2 and 3");
                                        //Initialize Input for Thread Execution
                                        var data = {};
                                        data.a = 2;
                                        data.b = 3;
                                        
                                        //Execute Thread
                                        thread.Execute(data);
                                    },
                                    SuspendThread: function(input){
                                        //Get Thread Object
                                        var thread = os.threads.ThreadManager.GetThreadByName("Test Thread");
                                        
                                        os.console.AppendComment("Suspending Thread");
                                        
                                        thread.Suspend();
                                    },
                                    ResumeThread: function(input){
                                        //Get Thread Object
                                        var thread = os.threads.ThreadManager.GetThreadByName("Test Thread");
                                        
                                        os.console.AppendComment("Resuming Thread");
                                        
                                        thread.Resume();
                                    },
                                    GetSuspendCount: function(input){
                                        //Get Thread Object
                                        var thread = os.threads.ThreadManager.GetThreadByName("Test Thread");
                                        
                                        os.console.AppendComment("Getting Resume Count For Thread");
                                        
                                        thread.GetSuspendCount();
                                    },
                                    AddThreadTask: function(input){
                                        //Get Thread Object
                                        var thread = os.threads.ThreadManager.GetThreadByName("Test Thread");
                                        
                                        os.console.AppendComment("Executing Thread: Summing 5 and 6");
                                        //Initialize Input for Thread Execution
                                        var data = {};
                                        data.a = 5;
                                        data.b = 6;
                                        
                                        //Execute Thread
                                        thread.AddTask(data);
                                    },
                                    GetThreadCurrentTask: function(input){
                                        //Get Thread Object
                                        var thread = os.threads.ThreadManager.GetThreadByName("Test Thread");
                                        
                                        os.console.AppendComment("Requesting Current Task");
                                        
                                        thread.GetCurrentTask();
                                    },
                                    GetThreadPendingTask: function(input){
                                        //Get Thread Object
                                        var thread = os.threads.ThreadManager.GetThreadByName("Test Thread");
                                        
                                        os.console.AppendComment("Requesting List Of All Pending Task");
                                        
                                        thread.GetPendingTask();
                                    },
                                    GetThreadStatus: function(input){
                                        //Get Thread Object
                                        var thread = os.threads.ThreadManager.GetThreadByName("Test Thread");
                                        
                                        os.console.AppendComment("Getting Thread Status");
                                        
                                        thread.GetStatus();
                                    },
                                    GetThreadFunction: function(input){
                                        //Get Thread Object
                                        var thread = os.threads.ThreadManager.GetThreadByName("Test Thread");
                                        
                                        os.console.AppendComment("Getting Thread Function");
                                        
                                        thread.GetFunction();    
                                    },
                                    SetThreadPriority: function(input){
                                        //Get Thread Object
                                        var thread = os.threads.ThreadManager.GetThreadByName("Test Thread");
                                        var data = 1;
                                        os.console.AppendComment("Setting Thread Priority");
                                        
                                        thread.SetPriority(data);
                                    },
                                    GetThreadPriority: function(input){
                                        //Get Thread Object
                                        var thread = os.thread.ThreadManager.GetThreadByName("Test Thread");
                                        
                                        os.console.AppendComment("Getting Thread Priority");
                                        
                                        thread.GetPriority();
                                    },
                                    GetThreadFilename: function(input){
                                        //Get Thread Object
                                        var thread = os.threads.ThreadManager.GetThreadByName("Test Thread");
                                        
                                        os.console.AppendComment("Getting Thread Filename");
                                        
                                        thread.GetFilename();
                                    },
                                    CreateThreadSocket: function(input){
                                        os.console.AppendComment("Requesting Socket Creation in Thread Controller");
                                        os.thread.ThreadManager.CreateSocket();    
                                    },
                                    CloseThreadSocket: function(input){
                                        os.console.AppendComment("Requesting Close Socket in Thread Controller");
                                        os.thread.ThreadManager.CloseSocket();
                                    },
                                    //******************************************
                                    //
                                    //  TIMER DEMO METHODS
                                    //
                                    //******************************************
                                    StartTimer: function(){
                                        os.console.AppendComment("Start Time: " + os.timer.Start());
                                    },
                                    StopTimer: function(){
                                        os.console.AppendComment("Stop Time: " + os.timer.Stop());
                                    },
                                    LapTimer: function(lapName){
                                        os.console.AppendComment("Lap Time: " + os.timer.Lap(lapName));
                                    },
                                    
                                    GetLap: function(lapName){
                                        os.console.AppendComment(lapName + " Time: " + (os.timer.GetLap(lapName)).time);
                                    },
                                    
                                    RemoveLap: function(lapName){
                                        os.console.AppendComment("Removing Lap: " + lapName)
                                    },
                                    
                                    ListLaps: function(){
                                      var log = os.timer.log;
                                      var laps = os.timer.log.length;
                                      //os.console.AppendComment("");
                                      if(laps > 0)
                                      {
                                        for(var i = 0; i < laps; i++)
                                        {
                                          os.console.AppendComment(log[i].name + ": " + log[i].time);
                                        }
                                      }
                                      //os.console.Comment("");
                                    },
                                    
                                    GetElapsedTime: function(){
                                        os.console.AppendComment("Elapsed Time: " + os.timer.GetElapsedTime());
                                    },
                                    
                                    ResetTimer: function(){
                                        os.timer.Reset();
                                        os.console.AppendComment("Timer Reset");
                                    },
                                    
                                    //******************************************
                                    //
                                    //  MULTITHREADING PHYSICS DEMOS
                                    //
                                    //******************************************
                                    ThreadDemo: function(){
                                        os.console.Comment("\nCalling Demo Initialization");
                                        demo.Initialize();
                                    },
                                    
                                    ThreadDemo2: function(){
                                        os.console.Comment("\nCalling Demo Initialization");
                                        demoII.Initialize();
                                    },
                                    
                                    //******************************************
                                    //
                                    //  WINDOW DEMO
                                    //
                                    //******************************************
                                    CreateWindow: function(msg){
                                        //var dims = msg.split(" ");
                                        //os.resschmgr.Create.Window(dims[0], dims[1], dims[2], dims[3], dims[4], dims[5]);
                                        //os.resschmgr.Create.Window("win100", "Test Window: Hello World", 500, 500, 100, 100);
                                        
                                        //Load Desktop
                                        os.windows.Desktop.Load();
                                        
                                        //Bare Minimum to get a window working...
                                        macWin = os.windows.Create.Window();
                                        macWin.Display.window();
                                        macWin.Set.title("Mac Window");
                                        macWin.Set.onFocus(function(){macWin.Set.statusbarText("Got Focus");},window);
                                        macWin.Set.onBlur(function(){macWin.Set.statusbarText("Got Blur");});
                                        
                                        //                                               [Title   ,  Theme]
                                        pcWin = os.windows.WindowsManager.Create.Window("PC Window", "PC");
                                        pcWin.Set.position(300,300);
                                        pcWin.Set.statusbarText("Status Message");
                                        pcWin.Display.window();
                                        
                                        //Application 1
                                        var app1 = os.windows.Desktop.Create.Application();
                                        app1.Set.DisplayText("Create PC");
                                        app1.onClickScope = window;
                                        app1.onClick = function(){
                                                (os.windows.WindowsManager.Create.Window("PC Window", "PC")).Display.window();
                                            };
                                        os.windows.Desktop.AddApplication(app1);
                                        
                                        //Application 2
                                        var app2 = os.windows.Desktop.Create.Application();
                                        app2.Set.DisplayText("Create Mac");
                                        app2.onClickScope = window;
                                        app2.onClick = function(){
                                                (os.windows.WindowsManager.Create.Window("Mac Window", "Mac")).Display.window();
                                            };
                                         os.windows.Desktop.AddApplication(app2);   

                                        
                                    },
                                    CreateErrorWindow: function(msg){
                                        os.windows.Create.ErrorWindow("Tetst Error", "Test Message");
                                    },
                                    //******************************************
                                    //
                                    //  SOCKET DEMO
                                    //
                                    //******************************************
                                    socketID: null,
                                    SocketCreate: function(){
                                        
                                        var socket = os.network.SocketManager.CreateSocket("demo.jahovaos.com", "8080", " ");
                                        socketID = socket.GetID();
                                        os.console.AppendComment("Socket Created, ID: " + socketID);
                                        
                                        var myWin = os.resschmgr.Create.Window("socketDemo", "JaHOVA OS Web Socket Demo", 500, 400, 200, 200);
                                        os.resschmgr.WindowManager.Windows.value().Elements.Window.style.overflow = "auto";
                                        myWin.onclose = os.console.SocketClose;
                                        myWin.onclosescope = os.console;
                                        
                                        socket.onmessage =  os.console.SocketOnMessage;//function(msg){ os.resschmgr.WindowManager.Windows.value().Elements.Body.innerHTML += "<br/>Server: " + msg;};
                                        socket.onmessagescope = os.console;
                                        
                                        socket.onclose = function(){os.console.AppendComment("Socket Closed");};
                                        socket.onclosescope = os.console;
                                        
                                        socket.onopen = function(){os.resschmgr.WindowManager.Windows.value().Elements.Body.innerHTML += "<br/>Local: Socket Open";};
                                        socket.onopenscope = os.console;
                                        
                                        os.console.AppendComment("Callbacks Set");
                                        //os.console.Comment("");
                                        
                                        
                                        socket.Open();
                                    },
                                    SocketOnMessage: function(msg){
                                        console.AppendComment(msg);
                                    },
                                    SocketSend: function(msg){
                                        os.console.AppendComment("\nSending... ");
                                        (os.network.SocketManager.Sockets.get(socketID)).Send(msg); //value().Send(msg);
                                        var div = document.createElement("div");
                                        div.innerHTML = "<br/>Local: " + msg;
                                        os.resschmgr.WindowManager.Windows.value().Elements.Body.innerHTML += "<br/>Local: " + msg;//appendChild(div);
                                    },
                                   
                                    SocketClose: function(){
                                        if(os.network.SocketManager.Sockets.size > 0){
                                            os.console.AppendComment("\nClosing Socket");
                                            os.network.SocketManager.Sockets.value().Close();
                                            //var id = os.network.SocketManager.Sockets.value().GetID();
                                            os.network.SocketManager.Sockets.remove(socketID);
                                            os.resschmgr.WindowManager.Windows.value().Elements.Body.innerHTML += "<br/>Local: Socket Closed";
                                        }
                                        
                                        //os.resschmgr.WindowManager.Windows.value().Close();
                                        
                                        
                                    },
                                    
                                    //******************************************
                                    //
                                    //  SIDEBAR PIN FUNCTIONS
                                    //
                                    //******************************************
                                    Pin: function(){
                                        if(os.console.Pinned){
                                            os.Elements.ConsoleTabPage.className = "debugPage";
                                            os.Elements.ConsoleTabPage.style.width = "";
                                            os.Elements.ConsoleTabPageHeaderPin.className = "pin";
                                            console.cmdWindow.className = "console";
                                            os.console.Pinned = false;
                                        }
                                        else{
                                            os.Elements.ConsoleTabPage.className = "debugPagePin";
                                            os.Elements.ConsoleTabPage.style.width = "700px";
                                            os.Elements.ConsoleTabPageHeaderPin.className = "pinPin";
                                            console.cmdWindow.className = "consolePin";
                                            os.console.Pinned = true;
                                        }
                                    },
                                    
                                    PinHover: function(){
                                        //console.ConsoleHover = !console.ConsoleHover;
                                        //os.Elements.ConsoleTab.className = (console.ConsoleHover ? id : '')
                                    },
                                    
                                    PinAPIDoc: function(){
                                        if(os.console.APIPinned){
                                            os.Elements.DocumentationTabPage.className = "debugPage";
                                            os.Elements.DocumentationTabPage.style.width = "";
                                            os.Elements.DocumentationTabPageHeaderPin.className = "pin";
                                            os.Elements.DocumentationIFrame.className = "jahovaIFrame"
                                            os.console.APIPinned = false;
                                        }
                                        else{
                                            os.Elements.DocumentationTabPage.className = "debugPagePin";
                                            os.Elements.DocumentationTabPage.style.width = "700px";
                                            os.Elements.DocumentationTabPageHeaderPin.className = "pinPin";
                                            os.Elements.DocumentationIFrame.className = "jahovaIFramePin"
                                            os.console.APIPinned = true;
                                        }
                                        
                                    },
                                    
                                    PinAPIDocHover: function(){
                                        if( document.createEvent ) {
                                            var evObj = document.createEvent('MouseEvents');
                                            evObj.initEvent( 'mouseover', true, false );
                                            elem.dispatchEvent(evObj);
                                        } else if( document.createEventObject ) {
                                            elem.fireEvent('onmouseover');
                                        }

                                        
                                    },
                                    //******************************************
                                    //
                                    //  IDE CLICK FUNCTIONS
                                    //
                                    //******************************************
                                    Tools: function(){
                                        // Load native UI library
                                        var gui = require('nw.gui');
                                        
                                        // Get the current window
                                        var win = gui.Window.get();
                                        
                                        win.showDevTools();//'frame0', true);
                                        //win.on("devtools-opened", function(url) {
                                        //    console.log("devtools-opened: " + url);
                                        //    document.getElementById('devtools').src = url;
                                        //});
                                    },
                                    MakeActive: function(e){
                                        console.MakeAllInactive();
                                      
                                        var consoleTab = e.currentTarget.id.indexOf("console");
                                        if(consoleTab >= 0)
                                        {
                                            os.Elements.OutputConsoleDiv.className = "outputDivCurrent outputContentBkgColor";
                                            //os.Elements.OutputTabConsole.className = "outputSection";
                                            os.Elements.ConsoleH3.className = "outputH3 jahova_borRadB2 outputTabColorSelected textColorBlack";
                                            
                                            console.cmdWindow.scrollTop = console.cmdWindow.scrollHeight; 
                                        }
                                        else
                                        {
                                            //Output Tab
                                            os.Elements.OutputErrorDiv.className = "outputDivCurrent outputContentBkgColor";
                                            //os.Elements.OutputTabOutput.className = "outputSection";
                                            os.Elements.ErrorH3.className = "outputH3 jahova_borRadB2 outputTabColorSelected textColorBlack";
                                        }
                                        
                                        //console.Comment("Clicked: " + e.currentTarget.id);
                                      
                                    },
                                    MakeConsoleActive: function(){
                                        console.MakeAllInactive();
                                        os.Elements.OutputConsoleDiv.className = "outputDivCurrent outputContentBkgColor";
                                        //os.Elements.OutputTabConsole.className = "outputSection";
                                        os.Elements.ConsoleH3.className = "outputH3 jahova_borRadB2 outputTabColorSelected textColorBlack";
                                    },
                                    MakeAllInactive: function(){
                                        
                                        //Console Tab
                                        os.Elements.OutputConsoleDiv.className = "outputDiv ";
                                        os.Elements.OutputConsole.className = "outputSection";
                                        os.Elements.ConsoleH3.className = "outputH3 jahova_borRadB2  textColorWhite";
                                        
                                        //Output Tab
                                        os.Elements.OutputErrorDiv.className = "outputDiv";
                                        os.Elements.OutputError.className = "outputSection";
                                        os.Elements.ErrorH3.className = "outputH3 jahova_borRadB2 textColorWhite";
                                    },
                                    MakeFileActive: function(e){
                                        
                                        console.MakeAllFilesInactive();
                                        
                                        var file1 = e.currentTarget.id.indexOf("file1");
                                        
                                        if(file1 > -1)
                                        {
                                            os.Elements.DocSection1.className = "docSection jahova_borRadT2 tabColorSelected";
                                            os.Elements.DocH31.className = "docH3 jahova_borRadT2";
                                            os.Elements.DocDiv.className = "docDivCurrent jahova_borRadB2 viewContentBkgColor";
                                            os.console.file1.value = "CreateThread = " + os.thread.ThreadManager.CreateThread.toString() ;
                                        }
                                        else
                                        {
                                            os.Elements.DocSection2.className = "docSection jahova_borRadT2 tabColorSelected";
                                            os.Elements.DocH32.className = "docH3 jahova_borRadT2";
                                            os.Elements.DocDivCurrent.className = "docDivCurrent jahova_borRadB2 viewContentBkgColor";
                                        }
                                        
                                        //console.Comment("Clicked: " + e.currentTarget.id);
                                    },
                                    MakeAllFilesInactive: function(){
                                        
                                        os.Elements.DocSection1.className = "docSection jahova_borRadT2";
                                        os.Elements.DocH31.className = "docH3 jahova_borRadT2 textColorWhite";
                                        os.Elements.DocDiv.className = "docDiv viewContentBkgColor";
                                        
                                        os.Elements.DocSection2.className = "docSection jahova_borRadT2";
                                        os.Elements.DocH32.className = "docH3 jahova_borRadT2 textColorWhite";
                                        os.Elements.DocDivCurrent.className = "docDiv viewContentBkgColor";
                                    },
                                    SEHide: function(){
                                        //os.console.Comment("Clicked Pin");
                                        //os.Elements.FolderView.className = "folderViewDisplayed jahova_borRadT2"
                                        os.Elements.FolderView.className = "folderView jahova_borRadT2"
                                        
                                        //os.Elements.DocView.className = "docView jahova_borRadB2 appBaseColor";
                                        os.Elements.DocView.className = "docViewNFV jahova_borRadB2 appBaseColor";
                                        
                                        //os.Elements.OutputView.className = "outputView jahova_borRadB2 appBaseColor";
                                        os.Elements.OutputView.className = "outputViewNFV jahova_borRadB2 appBaseColor";
                                    },
                                    SEShow: function(){
                                        os.Elements.FolderView.className = "folderViewDisplayed jahova_borRadT2"
                                        //os.Elements.FolderView.className = "folderView jahova_borRadT2"
                                        
                                        os.Elements.DocView.className = "docView jahova_borRadB2 appBaseColor";
                                        //os.Elements.DocView.className = "docViewNFV jahova_borRadB2 appBaseColor";
                                        
                                        os.Elements.OutputView.className = "outputView jahova_borRadB2 appBaseColor";
                                        //os.Elements.OutputView.className = "outputViewNFV jahova_borRadB2 appBaseColor";
                                    },
                                    //******************************************
                                    //
                                    //  UNEARTHED FUNCTIONS
                                    //
                                    //******************************************
                                    UE: function(){
                                         //var frame = document.createElement("iframe");
                                        //frame.style.display = "none";
                                        window.open("http://demo.jahovaos.com/Unearthed/webClient.html");
                                        
                                                    
                                                    
                                    },
                                    //******************************************
                                    //
                                    //  WEBDAV DEMOS
                                    //
                                    //******************************************
                                    GetFile: function(input){
                                        var params = input.split(" ");
                                        var xhr = os.resschmgr.Create.XHRObject();
                                        var filepath = 'http://demo.jahovaos.com/' + input;
                                        os.console.AppendComment("Requesting:\n" + filepath);
                                        
                                        xhr.open('GET',filepath,true);
                                        xhr.onreadystatechange = function(){
                                          if(xhr.readyState==4) //4==DONE
                                            os.console.file1.value = xhr.responseText;
                                        }
                                        xhr.send();
                                        
                                        //xhr.open('GET',filepath, false);
                                        //xhr.send();
                                        
                                        
                                    },
                                    GetFolder: function(input){
                                        var params = input.split(" ");
                                        var xhr = os.resschmgr.Create.XHRObject();
                                        var filepath = "";
                                        var pathLength = 0;
                                        
                                        if(input.toUpperCase() == "GETFOLDER")
                                        {
                                            filepath = 'http://demo.jahovaos.com/';
                                            
                                        }
                                        else{
                                            filepath = 'http://demo.jahovaos.com/' + input;
                                            pathLength = input.length;
                                        }
                                        
                                        os.console.AppendComment("Requesting:\n" + filepath);
                                        
                                        xhr.open('PROPFIND',filepath,true);
                                        xhr.setRequestHeader('Depth', '1');
                                        xhr.onreadystatechange = function(){
                                          if(xhr.readyState==4) //4==DONE
                                          {
                                            var xml = xhr.responseXML;
                                            var output  = "";
                                            var temp = "";
                                            //WebKit XML notation
                                            var hrefs = xml.getElementsByTagName("href")
                                            if(hrefs.length == 0)
                                            {
                                                //Firefox XML notation
                                                hrefs = xml.getElementsByTagName("D:href");
                                            }
                                            
                                             for(var i = 0; i < hrefs.length; i++)
                                             {
                                                temp = hrefs[i].textContent;
                                                temp = temp.substring(pathLength + 1);
                                                if(temp[temp.length - 1] == "/")
                                                {
                                                    output += "\n" + "Folder: " + temp.substring(0, temp.length-1);
                                                }
                                                else
                                                {
                                                    output += "\n" + "File:   " + temp
                                                }
                                                
                                             }
                                            os.console.file1.value = output;
                                          }
                                        }
                                        xhr.send();
                                    },
                                    SaveFile: function(input){
                                        var params = input.split(" ");
                                        var xhr = os.resschmgr.Create.XHRObject();
                                        
                                        var fileContents = os.console.file1.value;
                                        var fileName = params[0];
                                        //var filePath = params[1];
                                        os.console.AppendComment("Requesting to Save File:\n" + "http://demo.jahovaos.com/" + fileName)
                                        xhr.open('PUT',"http://demo.jahovaos.com/" + fileName,true);
                                        //xhr.setRequestHeader('Depth', '1');
                                        xhr.onreadystatechange = function(){
                                          if(xhr.readyState==4) //4==DONE
                                            os.console.file1.value = xhr.responseText;
                                        }
                                        xhr.send(fileContents);
                                        
                                        
                                    },
                                    DeleteFile: function(input){
                                        var params = input.split(" ");
                                        var xhr = os.resschmgr.Create.XHRObject();
                                        var fileName = params[0];
                                        //var filePath = params[1];
                                        os.console.AppendComment("Requesting to Delete File:\n" + "http://demo.jahovaos.com/" + fileName)
                                        xhr.open('DELETE',"http://demo.jahovaos.com/" + fileName,true);
                                        //xhr.setRequestHeader('Depth', '1');
                                        xhr.onreadystatechange = function(){
                                          if(xhr.readyState==4) //4==DONE
                                            os.console.file1.value = xhr.responseText;
                                        }
                                        xhr.send();
                                        
                                        
                                    },
                                    //******************************************
                                    //
                                    //  MYSQL DEMOS
                                    //
                                    //******************************************
                                    PHPEcho: function(input){
                                        var xhr = os.resschmgr.Create.XHRObject();
                                        
                                        var url = "http://demo.jahovaos.com/MySQL/echo.php";
                                        
                                        var output = "";
                                        var values = input.split(" ");
                                        
                                        var jsonString = JSON.stringify(values);
                                        output = "JSON=" + encodeURIComponent(jsonString);
                                        
                                        xhr.open("POST", url, true);
                                        
                                        //Send the proper header information along with the request
                                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                        
                                        xhr.onreadystatechange = function() {//Call a function when the state changes.
                                                if(xhr.readyState == 4) {
                                                    if(xhr.status == 200)
                                                    {
                                                        os.console.Comment("PHP Response: " + xhr.responseText);
                                                    }
                                                    else{
                                                        os.console.Comment("PHP ERROR: " + xhr.responseText);
                                                    }
                                                }
                                        }
                                        xhr.send(output);
                                    },
                                    DBOpen: function(input){
                                        var xhr = os.resschmgr.Create.XHRObject();
                                        
                                        var url = "http://demo.jahovaos.com/MySQL/DBOpen.php";
                                        
                                        var output = "";
                                        var dbObj = input.split(" ");
                                        
                                        values = {};
                                        values.url = dbObj[0];
                                        values.un = dbObj[1];
                                        values.pw = dbObj[2];
                                        values.db = dbObj[3];
                                        
                                        var jsonString = JSON.stringify(values);
                                        output = "JSON=" + encodeURIComponent(jsonString);
                                        
                                        xhr.open("POST", url, true);
                                        
                                        //Send the proper header information along with the request
                                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                        
                                        xhr.onreadystatechange = function() {//Call a function when the state changes.
                                                if(xhr.readyState == 4) {
                                                    if(xhr.status == 200)
                                                    {
                                                        os.console.Comment("PHP Response: " + xhr.responseText);
                                                    }
                                                    else{
                                                        os.console.Comment("PHP ERROR: " + xhr.responseText);
                                                    }
                                                }
                                        }
                                        xhr.send(output);
                                    },
                                    DBOpenSecure: function(input){
                                        var xhr = os.resschmgr.Create.XHRObject();
                                        
                                        var url = "https://demo.jahovaos.com/MySQL/DBOpen.php";
                                        
                                        var output = "";
                                        var dbObj = input.split(" ");
                                        
                                        values = {};
                                        values.url = dbObj[0];
                                        values.un = dbObj[1];
                                        values.pw = dbObj[2];
                                        values.db = dbObj[3];
                                        
                                        var jsonString = JSON.stringify(values);
                                        output = "JSON=" + encodeURIComponent(jsonString);
                                        
                                        xhr.open("POST", url, true);
                                        
                                        //Send the proper header information along with the request
                                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                        
                                        xhr.onreadystatechange = function() {//Call a function when the state changes.
                                                if(xhr.readyState == 4) {
                                                    if(xhr.status == 200)
                                                    {
                                                        os.console.Comment("PHP Response: " + xhr.responseText);
                                                    }
                                                    else{
                                                        os.console.Error("Could not create secure connection");
                                                        os.console.AppendComment("Your browser does not have the JaHOVA OS Certficate Installed\n")
                                                        os.console.AppendComment("The pop up window will allow you to install the certificate");
                                                        os.console.AppendComment("Or you may go to https://demo.jahovaos.com/MySQL/InstallSSL.html, to install it manually");
                                                        os.console.AppendComment("\nOnce installed, try your request again");
                                                        os.console.Comment();
                                                        os.console.DBEnableSecureAccess();
                                                    }
                                                }
                                        }
                                        xhr.send(output);
                                    },
                                    DBEnableSecureAccess: function(input){
                                    
                                        window.open ("https://demo.jahovaos.com/MySQL/InstallSSL.html","Enable Secure Access","scrollbars=1,menubar=1,resizable=1,width=320,height=480");

                                    },
                                    DBSelectAll: function(input){
                                        var xhr = os.resschmgr.Create.XHRObject();
                                        
                                        var url = "https://demo.jahovaos.com/MySQL/MySQL.php";
                                        
                                        var output = "";
                                        var db = {};
                                        
                                        db.url = "demo.jahovaos.com";
                                        db.un = "student";
                                        db.pw = "devry";
                                        db.db = "servers";
                                        db.queryType = "SELECT";
                                        db.query = "SELECT * FROM available";
                                        
                                        var jsonString = JSON.stringify(db);
                                        output = "JSON=" + encodeURIComponent(jsonString);
                                        
                                        xhr.open("POST", url, true);
                                        
                                        //Send the proper header information along with the request
                                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                        
                                        xhr.onreadystatechange = function() {//Call a function when the state changes.
                                                if(xhr.readyState == 4) {
                                                    if(xhr.status == 200)
                                                    {
                                                        os.console.Comment("PHP Response: " + xhr.responseText);
                                                    }
                                                    else{
                                                        os.console.Error("Could not create secure connection");
                                                        os.console.AppendComment("Your browser does not have the JaHOVA OS Certficate Installed\n")
                                                        os.console.AppendComment("The pop up window will allow you to install the certificate");
                                                        os.console.AppendComment("Or you may go to https://demo.jahovaos.com/MySQL/InstallSSL.html, to install it manually");
                                                        os.console.AppendComment("\nOnce installed, try your request again");
                                                        os.console.Comment();
                                                        os.console.DBEnableSecureAccess();
                                                    }
                                                }
                                        }
                                        xhr.send(output);
                                    },
                                    DBInsert: function(input){
                                        var xhr = os.resschmgr.Create.XHRObject();
                                        
                                        var url = "https://demo.jahovaos.com/MySQL/MySQL.php";
                                        
                                        var output = "";
                                        var db = {};
                                        
                                        db.url = "demo.jahovaos.com";
                                        db.un = "student";
                                        db.pw = "devry";
                                        db.db = "servers";
                                        db.queryType = "INSERT";
                                        db.query = "INSERT INTO available(IP, lifetime, utimestamp) VALUES('70.234.209.144', '0', '1285823299')" ;
                                        
                                        var jsonString = JSON.stringify(db);
                                        output = "JSON=" + encodeURIComponent(jsonString);
                                        
                                        xhr.open("POST", url, true);
                                        
                                        //Send the proper header information along with the request
                                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                        
                                        xhr.onreadystatechange = function() {//Call a function when the state changes.
                                                if(xhr.readyState == 4) {
                                                    if(xhr.status == 200)
                                                    {
                                                        os.console.Comment("PHP Response: " + xhr.responseText);
                                                    }
                                                    else{
                                                        os.console.Error("Could not create secure connection");
                                                        os.console.AppendComment("Your browser does not have the JaHOVA OS Certficate Installed\n")
                                                        os.console.AppendComment("The pop up window will allow you to install the certificate");
                                                        os.console.AppendComment("Or you may go to https://demo.jahovaos.com/MySQL/InstallSSL.html, to install it manually");
                                                        os.console.AppendComment("\nOnce installed, try your request again");
                                                        os.console.Comment();
                                                        os.console.DBEnableSecureAccess();
                                                    }
                                                }
                                        }
                                        xhr.send(output);
                                    },
                                    //******************************************
                                    //
                                    //  DESKTOP DEMOS
                                    //
                                    //******************************************
                                    Desktop: function(input){
                                        
                                        os.windows.Desktop.Load();
                                        
                                        //Create Application
                                        var app1 = os.windows.Desktop.Create.Application();
                                        app1.Set.DisplayText("Daily Receipts");
                                        app1.onClickScope = window;
                                        app1.onClick = function(){
                                                (os.windows.WindowsManager.Create.Window("Daily Receipts", "PC")).Display.window();
                                            };
                                        
                                        os.windows.Desktop.AddApplication(app1);
                                        
                                        var app2 = os.windows.Desktop.Create.Application();
                                        app2.Set.DisplayText("Pending Receipts");
                                        app2.onClickScope = window;
                                        app2.onClick = function(){
                                                (os.windows.WindowsManager.Create.Window("Pending Receipts", "Mac")).Display.window();
                                            };
                                        
                                        os.windows.Desktop.AddApplication(app2);
                                        
                                        var app3 = os.windows.Desktop.Create.Application();
                                        app3.Set.DisplayText("Report Generator");
                                        app3.onClickScope = window;
                                        app3.onClick = function(){
                                                (os.windows.WindowsManager.Create.Window("Report Generator", "Mac")).Display.window();
                                            };
                                        
                                        os.windows.Desktop.AddApplication(app3);
                                        
                                    },
                                    //******************************************
                                    //
                                    //  DYNAMIC TEST FUNCTIONS
                                    //
                                    //******************************************
                                    GetQueryString: function(){
                                        //os.queryString = os.resschmgr.Create.Map();
                                        var re = /[?&]([^=]+)(?:=([^&]*))?/g;
                                        var matchInfo;
                                        
                                        matchInfo = re.exec(location.search)
                                        while(matchInfo)
                                        {
                                            os.queryString.put(matchInfo[1], matchInfo[2]);
                                            matchInfo = re.exec(location.search)
                                        }
                                        
                                        for( var i = 0; i < os.queryString.size; i++)
                                        {
                                            os.console.AppendComment("Key: " + os.queryString.key() + ", Value: " + os.queryString.value());
                                            os.queryString.next();
                                        }
                                        
                                    },
                                    Graph: function(input){
                                        var params = input.split(" ");
                                        
                                        //Get File
                                        var xhr = os.resschmgr.Create.XHRObject();
                                        var filepath = 'http://demo.jahovaos.com/' + input;
                                        os.console.AppendComment("Requesting:\n" + filepath);
                                                                                
                                        xhr.open('GET',filepath, false);
                                        xhr.send(); 
                                        //Save Raw Text
                                        var rawFile = xhr.responseText;
                                        
                                        /*
                                        //Parse File
                                        var tmpSeries = rawFile.split("*");
                                        var fileElements = tmpSeries[0].split("||");
                                        var s = [];
                                        for(var i=0;i<tmpSeries.length;i++) {
                                            s[i] = tmpSeries[i].split("||");
                                        }
                                        */
                                        //Chart Class
                                        var CChart = function(canvasID){
                                            
                                            this.Canvas = {
                                                object: "",
                                                context: "",
                                                width: "",
                                                height: ""
                                            };
                                            
                                            this.Properties ={
                                                XAxis: {
                                                    x: 0,
                                                    y: 0,
                                                    min: 0,
                                                    max: 0,
                                                    divisions: 0,
                                                    label: "",
                                                    labelOffset: 0
                                                },
                                                
                                                YAxis: {
                                                    x: 0,
                                                    y: 0,
                                                    min: 0,
                                                    max: 0,
                                                    divixions: 0,
                                                    label: "",
                                                    labelOffset: 0
                                                },
                                                Type: "",
                                                Title: "",
                                                LegendVisible: true,
                                                TitleVisible: true,
                                                XAxisLabelVisible: true,
                                                YAxisLabelVisible: true,
                                                DataPointWidth: 0,
                                                NumOfSeries: 0
                                            };
                                            this.PlotArea ={
                                              x: 0,
                                              y: 0,
                                              x1: 0,
                                              y1: 0,
                                              width: 0,
                                              height: 0,
                                              pad: 0
                                            };
                                            
                                            this.Legend = {
                                                x: 0,
                                                y: 0,
                                                width: 0,
                                                height: 0,
                                                tabs: [],
                                                CTab: function() {
                                                    this.x = 0;
                                                    this.y = 0;
                                                    this.width = 0;
                                                    this.height = 0;
                                                    this.id = 0;
                                                    this.color = [];
                                                    this.label = "";
                                                    this.Init = (function() {
                                                                
                                                    }.bind(this))();
                                                }
                                            };
                                            
                                            this.Data = {
                                                file: "",
                                                min: 0,
                                                max: 0,
                                                ymin: 0,
                                                ymax: 0,
                                                xLabel: "",
                                                yLabel: "",
                                                series: [],
                                                order: [],
                                                numOfSeries: 0,
                                                numOfBins: 0,
                                                dOrder: [],
                                                title: "",
                                                CSeries: function() {
                                                    this.rawData = [];
                                                    this.browser = "";
                                                    this.color = [0,0,0]; //rgb: i.e. [255, 0, 0] for red
                                                    this.data = [];
                                                    this.bins = [];
                                                    this.stats = [];
                                                    this.min = 0;
                                                    this.max = 0;
                                                    this.minY = 0;
                                                    this.maxY = 0;
                                                    this.stdev = 0;
                                                    this.num = 0;
                                                    this.avg = 0;
                                                    var Init = (function(){
                                                        
                                                    }.bind(this))();
                                                }
                                            };
                                            /*
                                            this.Series = [];
                                            this.CData = {
                                                series: "",
                                                x: "",
                                                y: ""
                                            };
                                            */
                                            this.Box = {
                                                pi: "",
                                                rad: "",
                                                depth: "",
                                                theta: "",
                                                wBar: "",
                                                nSeries: "",
                                                xOffset: "",
                                                yOffset: "",
                                                BackPanel: {
                                                    x: "",
                                                    y: "",
                                                    w: "",
                                                    h: ""
                                                }
                                            };
                                           
                                            //***********************************
                                            //
                                            //      BUILD FUNCTIONS
                                            //
                                            //***********************************
                                            this.MouseClick = function(e) {
                                                //os.console.Comment("x value: " + (e.clientX-chart.Window.left));
                                                //os.console.Comment("y value: " + (e.clientY-chart.Window.top-20));
                                                var testX = e.clientX-chart.Window.left;
                                                var testY = e.clientY-chart.Window.top-20;
                                                for(var i=0; i<this.Legend.tabs.length; i++){
                                                    var x = this.Legend.tabs[i].x;
                                                    var y = this.Legend.tabs[i].y;
                                                    var x1 = this.Legend.tabs[i].x + this.Legend.tabs[i].width;
                                                    var y1 = this.Legend.tabs[i].y + this.Legend.tabs[i].height;
                                                    if(testX > x && testX < x1 && testY > y && testY < y1) {
                                                        //os.console.Comment("tab: " + i + " was clicked");
                                                        this.Data.dOrder[this.Data.series.length-1] = i;
                                                        for(var j=0,k=0; j<this.Legend.tabs.length; j++){
                                                            if(j != i){
                                                                this.Data.dOrder[k] = j;
                                                                k++;
                                                            }
                                                        }
                                                        this.DrawData();
                                                        this.DrawLegend();
                                                        
                                                    }
                                                }
                                                
                                            }.bind(this);
                                            
                                            var Init = (function(){
                                                this.Canvas.object = document.getElementById(canvasID);
                                                this.Canvas.context = this.Canvas.object.getContext('2d');
                                                
                                                this.Properties.NumOfSeries = 3;
                                                this.PlotArea.pad = 10;
                                                this.PlotArea.x = 100;
                                                this.PlotArea.y = 75;
                                                //var mytab = new this.Legend.CTab();
                                                //mytab.color = "c";
                                                this.Canvas.object.onmousedown = this.MouseClick;
                                                
                                            }.bind(this))();
                                            
                                            this.LoadData = function(input){
                                                //Parse File
                                                var tmpSeries = input.split("*");
                                                var fileElements = tmpSeries[0].split("||");
                                                var s = [];
                                                for(var i=0;i<tmpSeries.length;i++) {
                                                    s[i] = tmpSeries[i].split("||");
                                                }
                                                this.Data.title = fileElements[1];
                                                this.Data.xLabel = fileElements[2];
                                                this.Data.yLabel = fileElements[3];
                                                this.Data.numOfSeries = tmpSeries.length;
                                                for(var i=0;i<tmpSeries.length;i++){
                                                    this.Data.dOrder[i] = i; //initialize draw order
                                                    var mySeries = new this.Data.CSeries();
                                                    this.Data.series[i] = mySeries;
                                                    this.Data.series[i].rawData = s[i];
                                                    this.Data.series[i].browser = barChart.Data.series[i].rawData[0];
                                                    var d = this.Data.series[i].rawData.slice(4);
                                                    this.Data.series[i].data = d[0].split("|");
                                                    this.Data.series[i].data.pop();
                                                    this.Data.series[i].color[i] = 128;
                                                    this.Data.series[i].max = Number(this.Data.series[i].data[0]);
                                                    this.Data.series[i].min = Number(this.Data.series[i].data[0]);
                                                }
                                                    this.Data.min = Number(this.Data.series[0].data[0]);
                                                    this.Data.max = Number(this.Data.series[0].data[0]);
                                                    this.Data.ymin = Number(this.Data.series[0].data[0]);
                                                    this.Data.ymax = Number(this.Data.series[0].data[0]);
                                                    //this.Data.series[i].avg = 0;
                                                    //this.Data.series[i].num = 0;
                                                for(var i=0;i<this.Data.series.length;i++){
                                                    //Get Number of Bins
                                                    if(this.Data.numOfBins < Number((Math.sqrt(this.Data.series[i].data.length)).toFixed())){
                                                        this.Data.numOfBins = Number((Math.sqrt(this.Data.series[i].data.length)).toFixed());
                                                    }
                                                    for(var k = 0; k < this.Data.series[i].data.length; k++)
                                                    {
                                                        this.Data.series[i].avg += Number(this.Data.series[i].data[k]);
                                                        if(Number(this.Data.series[i].data[k]) > Number(this.Data.series[i].max)){this.Data.series[i].max = Number(this.Data.series[i].data[k]);}
                                                        if(Number(this.Data.series[i].data[k]) < Number(this.Data.series[i].min)){this.Data.series[i].min = Number(this.Data.series[i].data[k]);}
                                                    }
                                                    if(Number(this.Data.series[i].min) < Number(this.Data.min)){this.Data.min = Number(this.Data.series[i].min);}
                                                    this.Data.series[i].stats.push('Min: ' && this.Data.series[i].min);
                                                    if(Number(this.Data.series[i].max) > Number(this.Data.max)){this.Data.max = Number(this.Data.series[i].max);}
                                                    this.Data.series[i].stats.push('Max: ' && this.Data.series[i].max);
                                                }
                                                for(var i=0;i<this.Data.series.length;i++){  
                                                    //
                                                    //Calculate Average, Max and Min
                                                    //
                                                    this.Data.series[i].num = this.Data.series[i].data.length;
                                                    this.Data.series[i].stats.push('N: ' && this.Data.series[i].num);
                                                    this.Data.series[i].avg = Number(this.Data.series[i].avg)/this.Data.series[i].data.length;
                                                    this.Data.series[i].stats.push('Mean: ' && this.Data.series[i].avg);
                                                    
                                                    this.Data.series[i].stdev = 0;
                                                    
                                                    for(var k = 0; k < this.Data.series[i].data.length; k++)
                                                    {
                                                        this.Data.series[i].stdev += Math.pow(Number(this.Data.series[i].avg) - Number(this.Data.series[i].data[k]),2);
                                                    }
                                                    this.Data.series[i].stdev = this.Data.series[i].stdev/this.Data.series[i].data.length;
                                                    this.Data.series[i].stdev = Math.sqrt(this.Data.series[i].stdev);
                                                    this.Data.series[i].stats.push('Stdev: ' && this.Data.series[i].stdev);
                                                    
                                                    //Determine Bin Ranges
                                                    this.Data.series[i].bins[0] = {bin: this.Data.min, count: 0};
                                                    for(k = 1; k <= this.Data.numOfBins; k++)
                                                    {
                                                        this.Data.series[i].bins[k] = {bin: Number(this.Data.series[i].bins[k-1].bin) + (this.Data.max - this.Data.min)/this.Data.numOfBins, count: 0};
                                                    }
                                                    
                                                    //Determine Frequency of Each Bin
                                                    // and max/min Y
                                                    this.Data.series[i].maxY = this.Data.series[i].bins[0].count;
                                                    this.Data.series[i].minY = this.Data.series[i].bins[0].count;
                                                    
                                                    for(var k = 0; k < this.Data.series[i].data.length; k++)
                                                    {
                                                        var j = 0;
                                                        while( (this.Data.series[i].data[k] > this.Data.series[i].bins[j].bin) && (j < this.Data.series[i].bins.length-1) )
                                                        {
                                                            j++;
                                                        }
                                                        this.Data.series[i].bins[j].count++;
                                                        if(Number(this.Data.series[i].bins[j].count) > this.Data.series[i].maxY){this.Data.series[i].maxY = Number(this.Data.series[i].bins[j].count);}
                                                        if(Number(this.Data.series[i].bins[j].count) < this.Data.series[i].minY){this.Data.series[i].minY = Number(this.Data.series[i].bins[j].count);}
                                                        os.console.file1.value += "\nBin: " + this.Data.series[i].bins[j].bin + ", Count: " + this.Data.series[i].bins[j].count;   
                                                    }
                                                    // x axis min/max
                                                    //if(this.Data.series[i].max > this.Data.max){this.Data.max = Number(this.Data.series[i].max);}
                                                    //if(this.Data.series[i].min < this.Data.min){this.Data.min = Number(this.Data.series[i].min);}
                                                    // y axis min/max
                                                    if(this.Data.series[i].maxY > this.Data.ymax){this.Data.ymax = Number(this.Data.series[i].maxY);}
                                                    if(this.Data.series[i].minY < this.Data.ymin){this.Data.ymin = Number(this.Data.series[i].minY);} 
                                                }
                                                
                                                this.Properties.NumOfSeries = tmpSeries.length;
                                                this.Properties.XAxis.label = this.Data.xLabel;
                                                this.Properties.YAxis.label = this.Data.yLabel;
                                                this.Type = 'Histogram';
                                                this.Title = 'Time to Send Large Messages';
                                                this.Properties.XAxis.min = this.Data.min;
                                                this.Properties.XAxis.max = this.Data.max;
                                                this.Properties.YAxis.min = 0;
                                                this.Properties.YAxis.max = this.Data.ymax;
                                                this.DataPointWidth  = 10;
                                            }.bind(this);
                                            var BuildBox = function(){
                                                this.Box.pi = 3.14159265;
                                                this.Box.theta = 45;
                                                this.Box.rad = this.Box.theta*this.Box.pi/180;
                                                this.Box.nSeries = this.Properties.NumOfSeries;
                                                this.Box.wBar = this.DataPointWidth;
                                                this.Box.depth = this.Box.wBar*this.Box.nSeries*1.5;
                                                this.Box.xOffset = this.Box.depth*(Math.cos(this.Box.rad));
                                                this.Box.yOffset = this.Box.depth*(Math.sin(this.Box.rad));
                                                this.Box.BackPanel.x = this.PlotArea.x+this.Box.xOffset;
                                                this.Box.BackPanel.y = this.PlotArea.y;
                                                this.Box.BackPanel.w = this.PlotArea.width - this.Box.xOffset;
                                                this.Box.BackPanel.h = this.PlotArea.height - this.Box.yOffset;
                                            }.bind(this);
                                            var DrawBox = function(){
                                                BuildBox();
                                                // draw back panel
                                                this.Canvas.context.fillStyle = "white"; //color;
                                                this.Canvas.context.fillRect(this.Box.BackPanel.x, this.Box.BackPanel.y, this.Box.BackPanel.w + this.DataPointWidth, this.Box.BackPanel.h);
                                                // draw left side panel
                                                this.Canvas.context.fillStyle = "white"; //color;
                                                this.Canvas.context.beginPath();
						this.Canvas.context.moveTo(this.Box.BackPanel.x, this.Box.BackPanel.y);
						this.Canvas.context.lineTo(this.Box.BackPanel.x - this.Box.xOffset, this.Box.BackPanel.y+this.Box.yOffset);
						this.Canvas.context.lineTo(this.Box.BackPanel.x - this.Box.xOffset, this.Box.BackPanel.y+this.Box.yOffset+this.Box.BackPanel.h);
						this.Canvas.context.lineTo(this.Box.BackPanel.x, this.Box.BackPanel.y+this.Box.BackPanel.h);
						this.Canvas.context.fill();
                                                // draw bottom panel
                                                this.Canvas.context.fillStyle = "white"; //color;
                                                this.Canvas.context.beginPath();
						this.Canvas.context.moveTo(this.Box.BackPanel.x, this.Box.BackPanel.y+this.Box.BackPanel.h);
						this.Canvas.context.lineTo(this.Box.BackPanel.x - this.Box.xOffset, this.Box.BackPanel.y+this.Box.yOffset+this.Box.BackPanel.h);
						this.Canvas.context.lineTo(this.Box.BackPanel.x - this.Box.xOffset + this.Box.BackPanel.w + this.DataPointWidth, this.Box.BackPanel.y+this.Box.yOffset+this.Box.BackPanel.h);
						this.Canvas.context.lineTo(this.Box.BackPanel.x + this.Box.BackPanel.w + this.DataPointWidth, this.Box.BackPanel.y+this.Box.BackPanel.h);
						this.Canvas.context.fill();      
                                            }.bind(this);
                                            var BuildLegend = function(){
                                                var hTitle = 16;
                                                var hTab = 16;
                                                var hStats = this.Data.series[0].stats.length*hTab;
                                                this.Legend.width = 80;
                                                var wTab = this.Legend.width/this.Data.series.length;
                                                this.Legend.height = hTitle + hTab + hStats;
                                                this.Legend.x = this.PlotArea.x1 + (this.Canvas.width - this.PlotArea.x1-this.Legend.width)/2;
                                                this.Legend.y = this.PlotArea.y;
                                                for(var i=0; i<this.Data.series.length; i++){
                                                    this.Legend.tabs[i] = new this.Legend.CTab();
                                                    this.Legend.tabs[i].label = this.Data.series[i].browser;
                                                    this.Legend.tabs[i].width = wTab;
                                                    this.Legend.tabs[i].height = hTab;
                                                    this.Legend.tabs[i].x = this.Legend.x + (wTab*i);
                                                    this.Legend.tabs[i].y = this.Legend.y + hTitle;
                                                    this.Legend.tabs[i].color = this.Data.series[i].color;
                                                }
                                            }.bind(this);
                                            //***********************************
                                            //
                                            //      DRAW FUNCTIONS
                                            //
                                            //***********************************
                                            this.DrawData = function(){
                                                Draw();
                                                for(var h = 0; h < this.Properties.NumOfSeries; h++)
                                                {
                                                    for(var i = 0; i < this.Data.series[h].bins.length; i++)
                                                    {
                                                        DrawBar(this.Data.series[this.Data.dOrder[h]].bins[i].bin, this.Data.series[this.Data.dOrder[h]].bins[i].count, h+1, this.Data.series[this.Data.dOrder[h]].color);
                                                    }
                                                }
                                            }.bind(this);
                                            var Draw = function(){
                                                var linGrd = this.Canvas.context.createLinearGradient(0, 0 , this.Canvas.width , this.Canvas.height );
                                                linGrd.addColorStop(0.0, "lightsteelblue");
                                                linGrd.addColorStop(1.0, "whitesmoke");
                                                this.Canvas.context.fillStyle = linGrd; //color;
                                                
                                                //this.Canvas.context.fillStyle = "black";
                                                this.Canvas.context.fillRect(0, 0 , this.Canvas.width , this.Canvas.height);
                                                this.PlotArea.width = this.Canvas.width - 300;
                                                this.PlotArea.height = this.Canvas.height - 150;
                                                this.PlotArea.x1 = this.PlotArea.x + this.PlotArea.width;
                                                this.PlotArea.y1 = this.PlotArea.y + this.PlotArea.height;
                                                DrawTitle();
                                                //DrawPlotBackground();
                                                DrawBox();
                                                //DrawYAxis();
                                                //DrawYGrid();
                                                DrawYDataLabels();
                                                DrawYAxisLabel();
                                                //DrawXAxis();
                                                //DrawXGrid();
                                                DrawXDataLabels();
                                                DrawXAxisLabel();
                                                
                                                
                                            }.bind(this);
                                            
                                            var DrawTitle = function(){
                                                var offsetY = -30;
                                                this.Canvas.context.font = "14px sans-serif";
                                                this.Canvas.context.fillStyle = "black";
                                                this.Canvas.context.textAlign = "center";
                                                this.Canvas.context.textBaseline = "bottom";
                                                this.Canvas.context.fillText(this.Data.title, this.Canvas.width / 2, this.PlotArea.y + offsetY);
                                            }.bind(this);
                                            var DrawPlotBackground = function(){
                                                var w = this.DataPointWidth/2;
                                                var offset = this.Series.length * this.DataPointWidth;
                                                // draw just a filled rectangle in the xy plane: xy plane
                                                this.Canvas.context.fillStyle = "white"; //color;
                                                this.Canvas.context.fillRect(this.PlotArea.x + this.DataPointWidth + offset, this.PlotArea.y - offset, this.PlotArea.width, this.PlotArea.height + offset);
                                                // draw a parallelagram for the z plane at 0 x-axis
                                                
						this.Canvas.context.fillStyle = "lightgray";
						this.Canvas.context.beginPath();
						this.Canvas.context.moveTo(this.PlotArea.x, this.PlotArea.y1);
						this.Canvas.context.lineTo(this.PlotArea.x + w,this.PlotArea.y1 - w);
						this.Canvas.context.lineTo(this.PlotArea.x1 + w, this.PlotArea.y1 - w);
						this.Canvas.context.lineTo(this.PlotArea.x1, this.PlotArea.y1);
						this.Canvas.context.fill();
                                                
                                            }.bind(this);
                                            
                                            
                                            var DrawYAxis = function(){
                                                
                                            }.bind(this);
                                            
                                            var DrawYGrid = function(){
                                                
                                            }.bind(this);
                                            
                                            var DrawYDataLabels = function(){
                                                var interval = Number((this.Data.ymax/10).toFixed());
                                                var tmpInterval = 0;
                                                var step = Number((this.Box.BackPanel.h/10).toFixed());
                                                
                                                this.Canvas.context.textAlign = "right";
                                                this.Canvas.context.textBaseline = "middle";
                                                this.Canvas.context.fillStyle = "black";
                                                this.Canvas.context.font = "12px sans-serif";
                                                
                                                for(var i = 0; i < 10; i++) {
                                                    this.Canvas.context.fillText(this.Properties.YAxis.min + tmpInterval, this.PlotArea.x - 5, this.PlotArea.y1-(i*step));
                                                    tmpInterval += interval;
                                                    
                                                    this.Canvas.context.strokeStyle = "lightgray";
                                                    // draw a closed path
                                                    this.Canvas.context.beginPath();
                                                    this.Canvas.context.moveTo(this.PlotArea.x, this.PlotArea.y1-(i*step));
                                                    this.Canvas.context.lineTo(this.Box.BackPanel.x, this.PlotArea.y1-(i*step)-this.Box.yOffset);
                                                    this.Canvas.context.lineTo(this.Box.BackPanel.x+this.Box.BackPanel.w+this.DataPointWidth, this.PlotArea.y1-(i*step)-this.Box.yOffset);
                                                    this.Canvas.context.stroke();
                                                }
                                                this.Canvas.context.fillText(tmpInterval, this.PlotArea.x - 5, this.PlotArea.y1-(10*step));
                                                this.Canvas.context.strokeStyle = "lightgray";
                                                // draw a closed path
                                                this.Canvas.context.beginPath();
                                                this.Canvas.context.moveTo(this.Box.BackPanel.x, this.Box.BackPanel.y+this.Box.BackPanel.h);
                                                this.Canvas.context.lineTo(this.Box.BackPanel.x, this.Box.BackPanel.y);
                                                this.Canvas.context.stroke();
                                            }.bind(this);
                                            
                                            var DrawYAxisLabel = function(){
                                                this.Canvas.context.save();
                                                this.Canvas.context.translate(this.PlotArea.x - 50, this.PlotArea.y1 - this.PlotArea.height/2);
                                                this.Canvas.context.rotate(-Math.PI/2);
                                                this.Canvas.context.textAlign = "center";
                                                this.Canvas.context.fillStyle = "black";
                                                this.Canvas.context.font = "12px sans-serif";
                                                this.Canvas.context.fillText(this.Properties.YAxis.label, 0, 0);
                                                this.Canvas.context.restore();
                                            }.bind(this);
                                            
                                            var DrawXAxis = function(){
                                                
                                            }.bind(this);
                                            
                                            var DrawXGrid = function(){
                                                
                                            }.bind(this);
                                            
                                            var DrawXDataLabels = function(){
                                                var interval = Number(((this.Data.max-this.Data.min)/5).toFixed(1));
                                                var tmpInterval = 0;
                                                var step = Number((this.Box.BackPanel.w/5).toFixed(1));
                                                
                                                this.Canvas.context.textAlign = "left";
                                                this.Canvas.context.fillStyle = "black";
                                                this.Canvas.context.font = "12px sans-serif";
                                                
                                                for(var i = 0; i < 5; i++) {
                                                    var p = Number((Number(this.Data.min.toFixed(1)) + Number(tmpInterval.toFixed(1))).toFixed(1));
                                                    this.Canvas.context.fillText(Number((Number(this.Data.min.toFixed(1)) + Number(tmpInterval.toFixed(1))).toFixed(1)), this.PlotArea.x + (i*step) - 5, this.PlotArea.y1 + 15);
                                                    tmpInterval += interval;
                                                }
                                                this.Canvas.context.fillText(Number((Number(this.Data.min.toFixed(1)) + Number(tmpInterval.toFixed(1))).toFixed(1)), this.PlotArea.x + (5*step), this.PlotArea.y1 + 15);
                                            }.bind(this);
                                            
                                            var DrawXAxisLabel = function(){
                                                var offsetY = 40;
                                                this.Canvas.context.fillStyle = "black";
                                                this.Canvas.context.font = "12px sans-serif";
                                                this.Canvas.context.textAlign = "center";
                                                this.Canvas.context.textBaseline = "bottom";
                                                //this.Canvas.context.fillText(this.Properties.XAxis.label, this.Canvas.width / 2, this.Canvas.height - offsetY);
                                                this.Canvas.context.fillText(this.Properties.XAxis.label, this.PlotArea.x + (this.PlotArea.width/2), this.PlotArea.y1 + offsetY);
                                                //this.Canvas.context.fillText(this.Properties.XAxis.min, this.PlotArea.x,this.Canvas.height - offsetY);
                                                //this.Canvas.context.fillText(this.Properties.XAxis.max, this.PlotArea.x + this.PlotArea.width,this.Canvas.height - offsetY)
                                            }.bind(this); 

                                            this.DrawLegend = function(){
                                                
                                                BuildLegend();
                                                
                                                this.Canvas.context.strokeStyle = "black";
                                                this.Canvas.context.strokeRect(this.Legend.x, this.Legend.y, this.Legend.width, this.Legend.height);
                                                
                                                this.Canvas.context.font = "12px sans-serif";
                                                //var hF = this.Canvas.context.font;
                                                //hf = hf.slice(2);
                                                this.Canvas.context.fillStyle = "black";
                                                this.Canvas.context.textAlign = "center";
                                                this.Canvas.context.textBaseline = "bottom";
                                                this.Canvas.context.fillText("Statistics", this.Legend.x + (this.Legend.width/2), this.Legend.y + 14);
                                                
                                                for(var i=0; i<this.Legend.tabs.length; i++){
                                                    this.Canvas.context.fillStyle = "rgb(" + this.Data.series[i].color[0] + ", " + this.Data.series[i].color[1]+ ", " + this.Data.series[i].color[2] + ")"
                                                    this.Canvas.context.fillRect(this.Legend.tabs[i].x, this.Legend.tabs[i].y, this.Legend.tabs[i].width, this.Legend.tabs[i].height);
                                                }
                                                
                                                //this.Canvas.context.fillStyle = "white";
                                                //this.Canvas.context.fillRect(this.Legend.x, this.Legend.tabs[0].y + this.Legend.tabs[0].height, this.Legend.x + this.Legend.width, this.Legend.y + this.Legend.height);
                                                this.Canvas.context.font = "10px monaco";
                                                this.Canvas.context.textAlign = "left";
                                                this.Canvas.context.fillStyle = "black";
                                                var f = this.Data.dOrder[this.Data.series.length-1];
                                                var h = this.Legend.tabs[0].y + this.Legend.tabs[0].height;
                                                this.Canvas.context.fillText("Min:   " + this.Data.series[f].stats[0].toFixed(2), this.Legend.x  + 3 , h+(this.Legend.tabs[0].height-3)*1);
                                                this.Canvas.context.fillText("Max:   " + this.Data.series[f].stats[1].toFixed(2), this.Legend.x  + 3 , h+(this.Legend.tabs[0].height-3)*2);
                                                this.Canvas.context.fillText("N:     " + this.Data.series[f].stats[2].toFixed(), this.Legend.x  + 3 , h+(this.Legend.tabs[0].height-3)*3);
                                                this.Canvas.context.fillText("Mean:  " + this.Data.series[f].stats[3].toFixed(2), this.Legend.x  + 3 , h+(this.Legend.tabs[0].height-3)*4);
                                                this.Canvas.context.fillText("Stdev: " + this.Data.series[f].stats[4].toFixed(2), this.Legend.x  + 3 , h+(this.Legend.tabs[0].height-3)*5);
                                                
                                                this.Canvas.context.strokeStyle = "black";
                                                this.Canvas.context.strokeRect(this.Legend.x, this.Legend.y + this.Legend.height + 10, this.Legend.width, 75);
                                                
                                                this.Canvas.context.font = "12px sans-serif";
                                                this.Canvas.context.fillStyle = "black";
                                                this.Canvas.context.textAlign = "center";
                                                this.Canvas.context.textBaseline = "bottom";
                                                this.Canvas.context.fillText("Legend", this.Legend.x + (this.Legend.width/2), this.Legend.y + this.Legend.height + 25);
                                                for(var i=0, k=16; i<this.Data.series.length; i++){
                                                    this.Canvas.context.fillStyle = "rgb(" + this.Data.series[i].color[0] + ", " + this.Data.series[i].color[1]+ ", " + this.Data.series[i].color[2] + ")"
                                                    this.Canvas.context.fillRect(this.Legend.x, this.Legend.y + this.Legend.height + 15 + (k*(1+i)), 14, 14);
                                                    
                                                    this.Canvas.context.font = "12px sans-serif";
                                                    this.Canvas.context.textAlign = "left";
                                                    if(this.Data.dOrder[this.Data.series.length-1] == i){
                                                        this.Canvas.context.fillStyle = "rgb(" + this.Data.series[i].color[0] + ", " + this.Data.series[i].color[1]+ ", " + this.Data.series[i].color[2] + ")"
                                                    }
                                                    else {this.Canvas.context.fillStyle = "black";}
                                                    this.Canvas.context.fillText(this.Data.series[i].browser, this.Legend.x + 20, this.Legend.y + this.Legend.height + 30 + (k*(1+i)));
                                                    
                                                }
                                                
                                            
                                                
                                            
                                                
                                                
                                                
                                            }.bind(this);

                                            var DrawBar = function(x,y,z,color){
                                                
                                                var pX = this.PlotArea.x + (x - this.Properties.XAxis.min) * ( this.Box.BackPanel.w / (this.Properties.XAxis.max - this.Properties.XAxis.min) );
                                                var height = (y - this.Properties.YAxis.min) * ( this.Box.BackPanel.h / (this.Properties.YAxis.max - this.Properties.YAxis.min) );
                                                var pY = this.PlotArea.y + this.PlotArea.height - height;//.BackPanel.h - height;
                                                var width = this.DataPointWidth;
                                                
                                                var depth = this.Box.depth/(2*this.Box.nSeries-1);
                                                var sxOffset = depth*Math.cos(this.Box.rad)*2;
                                                var syOffset = depth*Math.sin(this.Box.rad)*2;
                                                var bxOffset = depth*Math.cos(this.Box.rad);
                                                var byOffset = depth*Math.sin(this.Box.rad);
                                                
                                                var width = this.DataPointWidth;
                                                // adjust pX and pY for series number
                                                pX = pX + sxOffset*(this.Box.nSeries-z);
                                                pY = pY - syOffset*(this.Box.nSeries-z);
                                                
                                                //JaHOVA/Tests/WebWorker/External/Results/CreateFirstWorkerSafari.txt
                                                
                                                // draw a filled rectangle in the xy plane: front of column
                                                //os.console.AppendComment("Color[1]: " + color[1] + ", Converted: " + color[1].toString(16));
                                                
						this.Canvas.context.fillStyle = "rgb(" + color[0] + ", " + color[1]+ ", " + color[2] + ")";
                                                //os.console.AppendComment("Color: " + this.Canvas.context.fillStyle);
                                                
						this.Canvas.context.fillRect(pX, pY, width, height);
						var dColor = 60
						// draw a filled rectangle in the xy plane: right side of column
						this.Canvas.context.fillStyle = "rgb(" + (color[0] - dColor) + ", " + (color[1] - dColor)+ ", " + (color[2] - dColor) + ")";
						// draw a closed path
						this.Canvas.context.beginPath();
						this.Canvas.context.moveTo(pX+width,pY);
						this.Canvas.context.lineTo(pX+width,pY+height);
						this.Canvas.context.lineTo(pX+width+bxOffset,pY+height-byOffset);
						this.Canvas.context.lineTo(pX+width+bxOffset,pY-byOffset);
						this.Canvas.context.fill();
						
						// draw a filled rectangle in the xy plane: top of column
						this.Canvas.context.fillStyle = "rgb(" + (color[0] + dColor) + ", " + (color[1] + dColor)+ ", " + (color[2] + dColor) + ")";
						// draw a closed path
						this.Canvas.context.beginPath();
						this.Canvas.context.moveTo(pX,pY);
						this.Canvas.context.lineTo(pX+width,pY);
						this.Canvas.context.lineTo(pX+width+bxOffset,pY-byOffset);
						this.Canvas.context.lineTo(pX+bxOffset,pY-byOffset);
						this.Canvas.context.fill();
                            
                                                
                                            }.bind(this);

                                        }
                                        
                                        //Create and Initialize Chart Object
                                        var chart = {};   
                                        chart.Title = 'My Test Chart';
                                        //chart.XAxisLabel = fileElements[2];
                                        //chart.YAxisLabel = fileElements[3];
                                        //chart.Data = fileElements.slice(4);
                                        /*
                                        os.console.file1.value ="";
                                        os.console.file1.value += "Title: " + chart.Title + "\n";
                                        os.console.file1.value += "X Axis Label: " + chart.XAxisLabel + "\n";
                                        os.console.file1.value += "Y Axis Label: " + chart.YAxisLabel + "\n";
                                        os.console.file1.value += "Data:\n ";
                                        chart.Data.forEach(function(x){os.console.file1.value += "\n" + x;});
                                        */
                                        //Create an output Window
                                        chart.Window = os.resschmgr.Create.Window("chart", "Distribution Plot", 900, 600, 100, 100);
                                        chart.Window.Elements.Window.style.backgroundImage = "url()";
                                        
                                        //Create Canvas Element
                                        chart.Canvas = document.createElement('canvas');
                                        chart.Canvas.id = chart.Title;
                                        chart.Canvas.width = '900';
                                        chart.Canvas.height = '580';
                                        chart.Plot = chart.Canvas.getContext('2d');
                                        
                                        chart.Window.Elements.Body.appendChild(chart.Canvas);
                                        
                                        //Create Bar Chart Object
                                        var barChart = new CChart(chart.Title);
                                        /*
                                        for(var i=0;i<tmpSeries.length;i++){
                                            var mySeries = new CSeries();
                                            barChart.Series[i] = mySeries;
                                            barChart.Series[i].rawData = s[i];
                                            barChart.Series[i].browser = barChart.Series[i].rawData[0];
                                            var d = barChart.Series[i].rawData.slice(4);
                                            barChart.Series[i].data = d[0].split("|");
                                            barChart.Series[i].data.pop();
                                        }
                                        */
                                        
                                        barChart.Canvas.width = '900';
                                        barChart.Canvas.height = '580';
                                        /*
                                        barChart.Properties.NumOfSeries = tmpSeries.length;
                                        barChart.Properties.XAxis.label = fileElements[2];
                                        barChart.Properties.YAxis.label = fileElements[3];
                                        barChart.Type = 'Histogram';
                                        barChart.Title = fileElements[1];
                                        barChart.Properties.XAxis.min = min;
                                        barChart.Properties.XAxis.max = max;
                                        barChart.Properties.YAxis.min = minY;
                                        barChart.Properties.YAxis.max = maxY;
                                        barChart.DataPointWidth  = 10;
                                        */
                                        barChart.LoadData(rawFile);
                                        barChart.DrawData();
                                        barChart.DrawLegend();
                                    },
                                    //******************************************
                                    //
                                    //  WEBGL DEMO
                                    //
                                    //******************************************
                                    WebGL: function(){
                                        canvas =  os.resschmgr.Create.HTMLElement("canvas"); //document.getElementById("glCanvas");
                                        canvas.html().style.width = "100%";
                                        canvas.html().style.height = "100%";
                                        
                                        Win = os.windows.WindowsManager.Create.Window("WebGL Demo", "PC");
                                        Win.Set.position(300,300);
                                        Win.elements.content.AppendChild(canvas.html());
                                        Win.elements.content.html().style.overflow = "hidden";
                                        Win.Set.statusbarText("FPS: ");
                                        Win.Display.window();
                                        Win.Set.width(400);
                                        Win.Set.height(300);
                                        Win.Set.onMax(os.graphics.OnReset);
                                        Win.Set.onMin(os.graphics.Pause);
                                        
                                        //Load WebGL (Debug: false, fullscreen: false, canvas HTML object)
                                        os.graphics.Load(true, false, canvas.html());
                                        
                                        //Load default mesh and texture
                                        os.graphics.Managers.Texture.Create.Texture("scorpion", "scripts/jahovaos/graphics/textures/scorpion.jpg");
                                        os.graphics.Managers.Mesh.Create.Mesh("scorpion", "scripts/jahovaos/graphics/meshes/scorpion.json");
                                        
                                        os.graphics.Managers.Texture.Create.Texture("goliath", "scripts/jahovaos/graphics/textures/goliath.jpg");
                                        os.graphics.Managers.Mesh.Create.Mesh("goliath", "scripts/jahovaos/graphics/meshes/goliath.json");
                                        
                                        //Creates a standard entity object and extends the graphics object
                                        ent = os.graphics.Managers.Entity.Create();
                                        
                                        //Adds mesh and texture to object
                                        ent.Graphics.Add.Mesh("scorpion");
                                        ent.Graphics.Add.Texture("scorpion");
                                        ent.Graphics.Vectors.Scale.set([0.5,0.5,0.5]);
                                        ent.Graphics.Update = function(dt){
                                            ent.roll += 0.05 * dt;
                                            //ent.yaw += 0.1 * dt;
                                            ent.pitch += 0.05 * dt;
                                            
                                            Win.Set.statusbarText("FPS: " + (1/dt * 1000).toFixed(3));
                                        }
                                        
                                        //Adds object to be auto updated and drawn
                                        os.graphics.AddToWorld(ent);
                                        
                                        //Start graphics context to draw and update
                                        os.graphics.Start();
                                        
                                        
                                        
                                        
                                        
                                        
                                    },
                                    Fog: function(){
                                        var canvas = os.resschmgr.Create.HTMLElement("canvas");
                                        canvas.html().style.width = "100%";
                                        canvas.html().style.height = "100%";
                                        
                                        document.body.appendChild(canvas.html());
                                        document.body.style.overflow = "hidden";
                                        
                                        //Load WebGL (Debug: false, fullscreen: false, canvas HTML object)
                                        os.graphics.Load(false, false, canvas.html());
                                        
                                        //Load default mesh and texture
                                        os.graphics.Managers.Texture.Create.Texture("starhawk", "scripts/jahovaos/graphics/textures/starhawk.jpg");
                                        os.graphics.Managers.Mesh.Create.Mesh("starhawk", "scripts/jahovaos/graphics/meshes/starhawk.json");
                                        quad = os.graphics.Managers.Mesh.Create.Primitive.Quad("quad");
                                        quad.Initialize();
                                        
                                        //Load Dynamic Shadow VS and FS
                                        os.graphics.Managers.Shader.Create.VertexShader("shadow", "scripts/jahovaos/graphics/shaders/shadow.vs");
                                        os.graphics.Managers.Shader.Create.FragmentShader("shadow", "scripts/jahovaos/graphics/shaders/shadow.fs");
                                        
                                        //Set Up Control Window
                                        Win = os.windows.WindowsManager.Create.Window("Fog", "PC");
                                        Win.Set.position(0,0);
                                        Win.elements.content.html().style.overflow = "hidden";
                                        Win.Set.statusbarText("");
                                        Win.Display.window();
                                        Win.Set.width(200);
                                        Win.Set.height(60);
                                        Win.Set.onMax(os.graphics.OnReset);
                                        Win.Set.onMin(os.graphics.Pause);
                                        
                                        //Create Terrain Quad
                                        terrain = os.graphics.Managers.Entity.Create();
                                        terrain.Graphics.Add.Mesh("quad");
                                        terrain.Graphics.Set.light(false);
                                        terrain.Graphics.Set.useBlendColor(true);
                                        terrain.Graphics.Set.texture(false);
                                        terrain.Graphics.Set.blendColor([0.17,0.26,0.40]);
                                        terrain.Set.Scale(2000,2000,2000);
                                        terrain.pitch = 90;
                                        terrain.Set.Position(0,1999,0);
                                        terrain.Graphics.Set.fog(true);
                                        terrain.Graphics.Set.fogEndPosition(1000.0);
                                        terrain.Graphics.Set.fogBeginPosition(200.0);
                                        os.graphics.AddToWorld(terrain);

                                        //Create Ship Entity
                                        starhawk = os.graphics.Managers.Entity.Create();
                                        
                                        //Adds mesh and texture to object
                                        starhawk.Graphics.Add.Mesh("starhawk");
                                        starhawk.Graphics.Add.Texture("starhawk");
                                        starhawk.Graphics.Vectors.Scale.set([0.5,0.5,0.5]);
                                        starhawk.Set.Position(0,50,100);
                                        starhawk.Graphics.Update = function(dt){
                                            //starhawk.roll += 0.05 * dt;
                                            starhawk.yaw += 0.05 * dt;
                                            //starhawk.pitch += 0.05 * dt;
                                            
                                        }
                                        
                                        
                                        starhawk.Graphics.Set.fog(true);
                                        starhawk.Graphics.Set.fogEndPosition(1500.0);
                                        starhawk.Graphics.Set.fogBeginPosition(200.0);
                                        //Build Shadow Program and Link
                                        var prgShadow = os.graphics.Managers.Shader.Create.Program("shadow", "shadow", "shadow");
                                        
                                         //Add Attributes to Shadow Program
                                        prgShadow.CreateAttribute("aVertexPosition");
                                                        
                                        //Add Uniforms to Skybox Program
                                        prgShadow.CreateUniform("uPMatrix");
                                        prgShadow.CreateUniform("uVMatrix");
                                        prgShadow.CreateUniform("uWMatrix");
                                        prgShadow.CreateUniform("uLight");
                                        
                                        //Create Shadow Shader for Ship
                                        var shadowShader = starhawk.Graphics.Add.Shader("shadow", "shadow");
                                        
                                        //Add Attribute and Uniform Pointers
                                        shadowShader.AddAttribute("aVertexPosition", "FLOAT", null, "VERTEX", null);
                                        
                                        //Add Uniforms to Entity
                                        shadowShader.AddUniform("uPMatrix", "4X4", os.graphics.Matrix.Projection);
                                        shadowShader.AddUniform("uVMatrix", "4X4", os.graphics.Matrix.View);
                                        shadowShader.AddUniform("uWMatrix", "4X4", starhawk.Graphics.Matrix.World);
                                        shadowShader.AddUniform("uLight", "VEC3", [0.0, 1000.0, 500.0]);

                                        //Adds object to be auto updated and drawn
                                        os.graphics.AddToUpdate(starhawk);
                                        
                                        //User Defined Draw Call
                                        FogDraw = function(){
                                            starhawk.Graphics.Draw("default");
                                            starhawk.Graphics.Draw("shadow");
                                        }
                                        
                                        FogUpdate = function(dt){
                                            Win.Set.statusbarText("FPS: " + (1/dt * 1000).toFixed(3));
                                        }
                                        
                                        
                                        //Register User Defined Callbacks 
                                        os.graphics.Set.Callback.Draw(FogDraw);
                                        os.graphics.Set.Callback.Update(FogUpdate);
                                        
                                        //Give Camera Default Position and Rotation                                        
                                        os.graphics.Managers.Camera.MoveUp(150);
                                        os.graphics.Managers.Camera.Rotation.pitch = 5;
                                        
                                        //Setup Input Controls
                                        Input = {
                                            Mouse: {
                                                lastX: 0,
                                                lastY: 0,
                                                pressed: false
                                            }
                                        }
                                        onKeyDown = function(e){
                                            if(String.fromCharCode(e.keyCode) == "W"){     //Forward
                                                os.graphics.Managers.Camera.MoveForward(10);   
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "S"){     //Backware
                                                os.graphics.Managers.Camera.MoveBackward(10);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "A"){     //Straif Left
                                                os.graphics.Managers.Camera.MoveLeft(10);  
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "D"){     //Straif Right
                                                os.graphics.Managers.Camera.MoveRight(10);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "Q"){     //Straif Up
                                                os.graphics.Managers.Camera.MoveUp(5);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "E"){     //Straif Down
                                                os.graphics.Managers.Camera.MoveDown(10);
                                            }
                                            
                                            
                                        }
                                        onMouseDown = function(e){
                                            Input.Mouse.lastX = e.clientX;
                                            Input.Mouse.lastY = e.clientY;
                                            Input.Mouse.pressed = true;
                                        }
                                        
                                        onMouseUp = function(e){
                                            Input.Mouse.pressed = false;
                                        }
                                        
                                        onMouseMove = function(e){
                                            if (!Input.Mouse.pressed) {
                                                return;
                                            }
                                            var cam = os.graphics.Managers.Camera;
                                            
                                            var newX = e.clientX;
                                            var newY = e.clientY;
                                        
                                            var deltaX = newX - Input.Mouse.lastX
                                            cam.Rotation.yaw += deltaX / 10;
                                            
                                            if(cam.Rotation.yaw > 360){ cam.Rotation.yaw  -= 360;}
                                            else if(cam.Rotation.yaw < 0) { cam.Rotation.yaw += 360; }
                                        
                                            var deltaY = newY - Input.Mouse.lastY;
                                            cam.Rotation.pitch += deltaY / 10;
                                            if(cam.Rotation.pitch > 360){ cam.Rotation.pitch  -= 360;}
                                            else if(cam.Rotation.pitch < 0) { cam.Rotation.pitch += 360; }
                                        
                                            Input.Mouse.lastX = newX
                                            Input.Mouse.lastY = newY;   
                                        }
                                        
                                        
                                        // Setup Event Handlers for User Input
                                        window.addEventListener("keydown", onKeyDown, false);
                                        os.graphics.Get.Canvas().addEventListener("mousedown", onMouseDown, false);
                                        document.addEventListener("mouseup", onMouseUp, false);
                                        document.addEventListener("mousemove", onMouseMove, false);
                                        
                                        
                                        //Start graphics context to draw and update
                                        os.graphics.Start();
                                    },
                                    DynamicShadow: function(){
                                        var canvas = os.resschmgr.Create.HTMLElement("canvas");
                                        canvas.html().style.width = "100%";
                                        canvas.html().style.height = "100%";
                                        
                                        document.body.appendChild(canvas.html());
                                        document.body.style.overflow = "hidden";
                                        
                                        //Load WebGL (Debug: false, fullscreen: false, canvas HTML object)
                                        os.graphics.Load(false, false, canvas.html());
                                        
                                        //Load default mesh and texture
                                        os.graphics.Managers.Texture.Create.Texture("starhawk", "scripts/jahovaos/graphics/textures/starhawk.jpg");
                                        os.graphics.Managers.Mesh.Create.Mesh("starhawk", "scripts/jahovaos/graphics/meshes/starhawk.json");
                                        quad = os.graphics.Managers.Mesh.Create.Primitive.Quad("quad");
                                        quad.Initialize();
                                        
                                        //Load Dynamic Shadow VS and FS
                                        os.graphics.Managers.Shader.Create.VertexShader("shadow", "scripts/jahovaos/graphics/shaders/shadow.vs");
                                        os.graphics.Managers.Shader.Create.FragmentShader("shadow", "scripts/jahovaos/graphics/shaders/shadow.fs");
                                        
                                        //Set Up Control Window
                                        Win = os.windows.WindowsManager.Create.Window("Dynamic Shadows", "PC");
                                        Win.Set.position(0,0);
                                        Win.elements.content.html().style.overflow = "hidden";
                                        Win.Set.statusbarText("");
                                        Win.Display.window();
                                        Win.Set.width(200);
                                        Win.Set.height(60);
                                        Win.Set.onMax(os.graphics.OnReset);
                                        Win.Set.onMin(os.graphics.Pause);
                                        
                                        //Create Terrain Quad
                                        terrain = os.graphics.Managers.Entity.Create();
                                        terrain.Graphics.Add.Mesh("quad");
                                        terrain.Graphics.Set.light(false);
                                        terrain.Graphics.Set.useBlendColor(true);
                                        terrain.Graphics.Set.texture(false);
                                        terrain.Graphics.Set.blendColor([0.17,0.26,0.40]);
                                        terrain.Set.Scale(2000,2000,2000);
                                        terrain.pitch = 90;
                                        terrain.Set.Position(0,1999,0);
                                        os.graphics.AddToWorld(terrain);

                                        //Create Ship Entity
                                        starhawk = os.graphics.Managers.Entity.Create();
                                        
                                        //Adds mesh and texture to object
                                        starhawk.Graphics.Add.Mesh("starhawk");
                                        starhawk.Graphics.Add.Texture("starhawk");
                                        starhawk.Graphics.Vectors.Scale.set([0.5,0.5,0.5]);
                                        starhawk.Set.Position(0,250,500);
                                        starhawk.Graphics.Update = function(dt){
                                            starhawk.roll += 0.05 * dt;
                                            //starhawk.yaw += 0.05 * dt;
                                            starhawk.pitch += 0.05 * dt;
                                            
                                            Win.Set.statusbarText("FPS: " + (1/dt * 1000).toFixed(3));
                                        }
                                        
                                        //Build Shadow Program and Link
                                        var prgShadow = os.graphics.Managers.Shader.Create.Program("shadow", "shadow", "shadow");
                                        
                                         //Add Attributes to Shadow Program
                                        prgShadow.CreateAttribute("aVertexPosition");
                                                        
                                        //Add Uniforms to Skybox Program
                                        prgShadow.CreateUniform("uPMatrix");
                                        prgShadow.CreateUniform("uVMatrix");
                                        prgShadow.CreateUniform("uWMatrix");
                                        prgShadow.CreateUniform("uLight");
                                        
                                        //Create Shadow Shader for Ship
                                        var shadowShader = starhawk.Graphics.Add.Shader("shadow", "shadow");
                                        
                                        //Add Attribute and Uniform Pointers
                                        shadowShader.AddAttribute("aVertexPosition", "FLOAT", null, "VERTEX", null);
                                        
                                        //Add Uniforms to Entity
                                        shadowShader.AddUniform("uPMatrix", "4X4", os.graphics.Matrix.Projection);
                                        shadowShader.AddUniform("uVMatrix", "4X4", os.graphics.Matrix.View);
                                        shadowShader.AddUniform("uWMatrix", "4X4", starhawk.Graphics.Matrix.World);
                                        shadowShader.AddUniform("uLight", "VEC3", [0.0, 1000.0, 500.0]);

                                        //Adds object to be auto updated and drawn
                                        os.graphics.AddToUpdate(starhawk);
                                        
                                        //User Defined Draw Call
                                        ShadowDraw = function(){
                                            starhawk.Graphics.Draw("default");
                                            starhawk.Graphics.Draw("shadow");
                                        }
                                        
                                        //Register User Defined Draw 
                                        os.graphics.Set.Callback.Draw(ShadowDraw);
                                        
                                        //Give Camera Default Position and Rotation                                        
                                        os.graphics.Managers.Camera.MoveUp(150);
                                        os.graphics.Managers.Camera.Rotation.pitch = 5;
                                        
                                        //Setup Input Controls
                                        Input = {
                                            Mouse: {
                                                lastX: 0,
                                                lastY: 0,
                                                pressed: false
                                            }
                                        }
                                        onKeyDown = function(e){
                                            if(String.fromCharCode(e.keyCode) == "W"){     //Forward
                                                os.graphics.Managers.Camera.MoveForward(10);   
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "S"){     //Backware
                                                os.graphics.Managers.Camera.MoveBackward(10);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "A"){     //Straif Left
                                                os.graphics.Managers.Camera.MoveLeft(10);  
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "D"){     //Straif Right
                                                os.graphics.Managers.Camera.MoveRight(10);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "Q"){     //Straif Up
                                                os.graphics.Managers.Camera.MoveUp(5);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "E"){     //Straif Down
                                                os.graphics.Managers.Camera.MoveDown(10);
                                            }
                                            
                                            
                                        }
                                        onMouseDown = function(e){
                                            Input.Mouse.lastX = e.clientX;
                                            Input.Mouse.lastY = e.clientY;
                                            Input.Mouse.pressed = true;
                                        }
                                        
                                        onMouseUp = function(e){
                                            Input.Mouse.pressed = false;
                                        }
                                        
                                        onMouseMove = function(e){
                                            if (!Input.Mouse.pressed) {
                                                return;
                                            }
                                            var cam = os.graphics.Managers.Camera;
                                            
                                            var newX = e.clientX;
                                            var newY = e.clientY;
                                        
                                            var deltaX = newX - Input.Mouse.lastX
                                            cam.Rotation.yaw += deltaX / 10;
                                            
                                            if(cam.Rotation.yaw > 360){ cam.Rotation.yaw  -= 360;}
                                            else if(cam.Rotation.yaw < 0) { cam.Rotation.yaw += 360; }
                                        
                                            var deltaY = newY - Input.Mouse.lastY;
                                            cam.Rotation.pitch += deltaY / 10;
                                            if(cam.Rotation.pitch > 360){ cam.Rotation.pitch  -= 360;}
                                            else if(cam.Rotation.pitch < 0) { cam.Rotation.pitch += 360; }
                                        
                                            Input.Mouse.lastX = newX
                                            Input.Mouse.lastY = newY;   
                                        }
                                        
                                        
                                        // Setup Event Handlers for User Input
                                        window.addEventListener("keydown", onKeyDown, false);
                                        os.graphics.Get.Canvas().addEventListener("mousedown", onMouseDown, false);
                                        document.addEventListener("mouseup", onMouseUp, false);
                                        document.addEventListener("mousemove", onMouseMove, false);
                                        
                                        
                                        //Start graphics context to draw and update
                                        os.graphics.Start();
                                    },
                                    CubeMap: function(){
                                        var canvas = os.resschmgr.Create.HTMLElement("canvas");
                                        canvas.html().style.width = "100%";
                                        canvas.html().style.height = "100%";
                                        
                                        document.body.appendChild(canvas.html());
                                        document.body.style.overflow = "hidden";
                                        
                                        //Load WebGL (Debug: false, fullscreen: false, canvas HTML object)
                                        os.graphics.Load(false, false, canvas.html());
                                        
                                        Win = os.windows.WindowsManager.Create.Window("Cube Map", "PC");
                                        Win.Set.position(0,0);
                                        Win.elements.content.html().style.overflow = "hidden";
                                        Win.Set.statusbarText("");
                                        Win.Display.window();
                                        Win.Set.width(100);
                                        Win.Set.height(60);
                                        Win.Set.onMax(os.graphics.OnReset);
                                        Win.Set.onMin(os.graphics.Pause);
                                        
    
                                        //Load Cube Maps
                                        
                                        //var arch = os.graphics.Managers.Texture.Create.CubeMap("arch");
                                        //arch.Load.positiveX("scripts/jahovaos/graphics/textures/cubemaps/arch/arch_positive_x.jpg");
                                        //arch.Load.negativeX("scripts/jahovaos/graphics/textures/cubemaps/arch/arch_negative_x.jpg");
                                        //arch.Load.positiveY("scripts/jahovaos/graphics/textures/cubemaps/arch/arch_positive_y.jpg");
                                        //arch.Load.negativeY("scripts/jahovaos/graphics/textures/cubemaps/arch/arch_negative_y.jpg");
                                        //arch.Load.positiveZ("scripts/jahovaos/graphics/textures/cubemaps/arch/arch_positive_z.jpg");
                                        //arch.Load.negativeZ("scripts/jahovaos/graphics/textures/cubemaps/arch/arch_negative_z.jpg");
                                        //
                                        //var brightday = os.graphics.Managers.Texture.Create.CubeMap("brightday");
                                        //brightday.Load.positiveX("scripts/jahovaos/graphics/textures/cubemaps/brightday/brightday2_positive_x.png");
                                        //brightday.Load.negativeX("scripts/jahovaos/graphics/textures/cubemaps/brightday/brightday2_negative_x.png");
                                        //brightday.Load.positiveY("scripts/jahovaos/graphics/textures/cubemaps/brightday/brightday2_positive_y.png");
                                        //brightday.Load.negativeY("scripts/jahovaos/graphics/textures/cubemaps/brightday/brightday2_negative_y.png");
                                        //brightday.Load.positiveZ("scripts/jahovaos/graphics/textures/cubemaps/brightday/brightday2_positive_z.png");
                                        //brightday.Load.negativeZ("scripts/jahovaos/graphics/textures/cubemaps/brightday/brightday2_negative_z.png");
                                        //
                                        //var grandcanyon = os.graphics.Managers.Texture.Create.CubeMap("grandcanyon");
                                        //grandcanyon.Load.positiveX("scripts/jahovaos/graphics/textures/cubemaps/grandcanyon/grandcanyon_positive_x.jpg");
                                        //grandcanyon.Load.negativeX("scripts/jahovaos/graphics/textures/cubemaps/grandcanyon/grandcanyon_negative_x.jpg");
                                        //grandcanyon.Load.positiveY("scripts/jahovaos/graphics/textures/cubemaps/grandcanyon/grandcanyon_positive_y.jpg");
                                        //grandcanyon.Load.negativeY("scripts/jahovaos/graphics/textures/cubemaps/grandcanyon/grandcanyon_negative_y.jpg");
                                        //grandcanyon.Load.positiveZ("scripts/jahovaos/graphics/textures/cubemaps/grandcanyon/grandcanyon_positive_z.jpg");
                                        //grandcanyon.Load.negativeZ("scripts/jahovaos/graphics/textures/cubemaps/grandcanyon/grandcanyon_negative_z.jpg");
                                        //
                                        //var hills = os.graphics.Managers.Texture.Create.CubeMap("hills");
                                        //hills.Load.positiveX("scripts/jahovaos/graphics/textures/cubemaps/hills/hills_positive_x.png");
                                        //hills.Load.negativeX("scripts/jahovaos/graphics/textures/cubemaps/hills/hills_negative_x.png");
                                        //hills.Load.positiveY("scripts/jahovaos/graphics/textures/cubemaps/hills/hills_positive_y.png");
                                        //hills.Load.negativeY("scripts/jahovaos/graphics/textures/cubemaps/hills/hills_negative_y.png");
                                        //hills.Load.positiveZ("scripts/jahovaos/graphics/textures/cubemaps/hills/hills_positive_z.png");
                                        //hills.Load.negativeZ("scripts/jahovaos/graphics/textures/cubemaps/hills/hills_negative_z.png");
                                        //
                                        //var mars = os.graphics.Managers.Texture.Create.CubeMap("mars");
                                        //mars.Load.positiveX("scripts/jahovaos/graphics/textures/cubemaps/mars/mars_positive_x.jpg");
                                        //mars.Load.negativeX("scripts/jahovaos/graphics/textures/cubemaps/mars/mars_negative_x.jpg");
                                        //mars.Load.positiveY("scripts/jahovaos/graphics/textures/cubemaps/mars/mars_positive_y.jpg");
                                        //mars.Load.negativeY("scripts/jahovaos/graphics/textures/cubemaps/mars/mars_negative_y.jpg");
                                        //mars.Load.positiveZ("scripts/jahovaos/graphics/textures/cubemaps/mars/mars_positive_z.jpg");
                                        //mars.Load.negativeZ("scripts/jahovaos/graphics/textures/cubemaps/mars/mars_negative_z.jpg");
                                        //
                                        //var museum = os.graphics.Managers.Texture.Create.CubeMap("museum");
                                        //museum.Load.positiveX("scripts/jahovaos/graphics/textures/cubemaps/museum/museum_positive_x.png");
                                        //museum.Load.negativeX("scripts/jahovaos/graphics/textures/cubemaps/museum/museum_negative_x.png");
                                        //museum.Load.positiveY("scripts/jahovaos/graphics/textures/cubemaps/museum/museum_positive_y.png");
                                        //museum.Load.negativeY("scripts/jahovaos/graphics/textures/cubemaps/museum/museum_negative_y.png");
                                        //museum.Load.positiveZ("scripts/jahovaos/graphics/textures/cubemaps/museum/museum_positive_z.png");
                                        //museum.Load.negativeZ("scripts/jahovaos/graphics/textures/cubemaps/museum/museum_negative_z.png");
                                        //
                                        //var snow = os.graphics.Managers.Texture.Create.CubeMap("snow");
                                        //snow.Load.positiveX("scripts/jahovaos/graphics/textures/cubemaps/snow/snow_positive_x.jpg");
                                        //snow.Load.negativeX("scripts/jahovaos/graphics/textures/cubemaps/snow/snow_negative_x.jpg");
                                        //snow.Load.positiveY("scripts/jahovaos/graphics/textures/cubemaps/snow/snow_positive_y.jpg");
                                        //snow.Load.negativeY("scripts/jahovaos/graphics/textures/cubemaps/snow/snow_negative_y.jpg");
                                        //snow.Load.positiveZ("scripts/jahovaos/graphics/textures/cubemaps/snow/snow_positive_z.jpg");
                                        //snow.Load.negativeZ("scripts/jahovaos/graphics/textures/cubemaps/snow/snow_negative_z.jpg");
                                        //
                                        
                                        var space = os.graphics.Managers.Texture.Create.CubeMap("space");
                                        space.Load.positiveX("scripts/jahovaos/graphics/textures/cubemaps/space/space_positive_x.png");
                                        space.Load.negativeX("scripts/jahovaos/graphics/textures/cubemaps/space/space_negative_x.png");
                                        space.Load.positiveY("scripts/jahovaos/graphics/textures/cubemaps/space/space_positive_y.png");
                                        space.Load.negativeY("scripts/jahovaos/graphics/textures/cubemaps/space/space_negative_y.png");
                                        space.Load.positiveZ("scripts/jahovaos/graphics/textures/cubemaps/space/space_positive_z.png");
                                        space.Load.negativeZ("scripts/jahovaos/graphics/textures/cubemaps/space/space_negative_z.png");
                                        
                                        //var terrain = os.graphics.Managers.Texture.Create.CubeMap("terrain");
                                        //terrain.Load.positiveX("scripts/jahovaos/graphics/textures/cubemaps/terrain/terrain_positive_x.png");
                                        //terrain.Load.negativeX("scripts/jahovaos/graphics/textures/cubemaps/terrain/terrain_negative_x.png");
                                        //terrain.Load.positiveY("scripts/jahovaos/graphics/textures/cubemaps/terrain/terrain_positive_y.png");
                                        //terrain.Load.negativeY("scripts/jahovaos/graphics/textures/cubemaps/terrain/terrain_negative_y.png");
                                        //terrain.Load.positiveZ("scripts/jahovaos/graphics/textures/cubemaps/terrain/terrain_positive_z.png");
                                        //terrain.Load.negativeZ("scripts/jahovaos/graphics/textures/cubemaps/terrain/terrain_negative_z.png");
                                        //
                                        
                                        os.graphics.Managers.Texture.Create.Texture("scorpion", "scripts/jahovaos/graphics/textures/scorpion.jpg");
                                        os.graphics.Managers.Mesh.Create.Mesh("scorpion", "scripts/jahovaos/graphics/meshes/scorpion.json");
                                        
                                        ent = os.graphics.Managers.Entity.Create();
                                        
                                        //Adds mesh and texture to object
                                        ent.Graphics.Add.Mesh("scorpion");
                                        ent.Graphics.Add.Texture("scorpion");
                                        ent.Graphics.Vectors.Scale.set([0.1,0.1,0.1]);
                                        ent.Graphics.Update = function(dt){
                                            //ent.roll += 0.05 * dt;
                                            //ent.yaw += 0.1 * dt;
                                            //ent.pitch += 0.05 * dt;
                                            
                                            Win.Set.statusbarText("FPS: " + (1/dt * 1000).toFixed(3));
                                        }
                                        
                                        //Adds object to be auto updated and drawn
                                        os.graphics.AddToWorld(ent);
                                        
                                        //Load Skybox VS and FS
                                        os.graphics.Managers.Shader.Create.VertexShader("skybox", "scripts/jahovaos/graphics/shaders/skybox.vs");
                                        os.graphics.Managers.Shader.Create.FragmentShader("skybox", "scripts/jahovaos/graphics/shaders/skybox.fs");
                                    
                                        //Build Skybox Program and Link
                                        var prgSkybox = os.graphics.Managers.Shader.Create.Program("skybox", "skybox", "skybox");
                                        
                                        //Add Attributes to Skybox Program
                                        prgSkybox.CreateAttribute("aVertexPosition");
                                        prgSkybox.CreateAttribute("aVertexNormal");
                                                        
                                        //Add Uniforms to Skybox Program
                                        prgSkybox.CreateUniform("uPMatrix");
                                        prgSkybox.CreateUniform("uVMatrix");
                                        prgSkybox.CreateUniform("uWMatrix");
                                        prgSkybox.CreateUniform("uNMatrix");
                                        prgSkybox.CreateUniform("uSampler");
                                        
                                        //Create Entity with Skybox Program
                                        skybox = os.graphics.Managers.Entity.Create("skybox");
                                        
                                        //Create Shader
                                        var skyboxShader = skybox.Graphics.Add.Shader("skybox", "skybox");
                                        
                                        //Add Attributes
                                        skyboxShader.AddAttribute("aVertexPosition", "FLOAT", null, "VERTEX", null);
                                        skyboxShader.AddAttribute("aVertexNormal", "FLOAT", null, "NORMAL", null);
                                        
                                        //Add Uniforms to Entity
                                        skyboxShader.AddUniform("uPMatrix", "4X4", os.graphics.Matrix.Projection);
                                        skyboxShader.AddUniform("uVMatrix", "4X4", os.graphics.Matrix.View);
                                        skyboxShader.AddUniform("uWMatrix", "4X4", skybox.Graphics.Matrix.World);
                                        skyboxShader.AddUniform("uNMatrix", "3X3", skybox.Graphics.Matrix.Normal);
                                    
                                        //Build a Cube Primitive for Skybox
                                        var skyCube = os.graphics.Managers.Mesh.Create.Primitive.Cube("skybox");
                                        
                                        //Remove Texture Coordinate
                                        skyCube.model.vertexTextureCoords = null;
                                        
                                        //Initialize Mesh (i.e. Build Buffers, etc.)
                                        skyCube.Initialize();
                                        
                                        //Add Skybox Mesh and Texture to Skybox Entity
                                        skybox.Graphics.Add.Mesh("skybox");
                                        skybox.Graphics.Add.Texture("space");
                                        
                                        //Scale Skybox
                                        skybox.Set.Scale(5000,5000,5000);
                                        
                                        //Extend Attach Function
                                        skybox.Attach = function(ent){
                                            skybox.attachedEntity = ent;
                                            
                                            if(ent){
                                                skybox.attached = true;
                                            }
                                            else
                                                skybox.atached = false;
                                        }
                                        skybox.attached = false;
                                        skybox.attachedEntity = null;
                                        
                                        //Set Skybox to follow Camera
                                        skybox.Attach(os.graphics.Managers.Camera);
    
                                        //Setup Update Function
                                        skybox.Graphics.Update = function(dt){
                                            if(skybox.attached){
                                                vec3.set(skybox.attachedEntity.Position, skybox.Position);
                                            }
                                        }.bind(skybox);
                                        //Add to world for Auto Update and Draw
                                        os.graphics.AddToWorld(skybox);
                                        Input = {
                                            Mouse: {
                                                lastX: 0,
                                                lastY: 0,
                                                pressed: false
                                            }
                                        }
                                        onKeyDown = function(e){
                                            if(String.fromCharCode(e.keyCode) == "W"){     //Forward
                                                os.graphics.Managers.Camera.MoveForward(10);   
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "S"){     //Backware
                                                os.graphics.Managers.Camera.MoveBackward(10);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "A"){     //Straif Left
                                                os.graphics.Managers.Camera.MoveLeft(10);  
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "D"){     //Straif Right
                                                os.graphics.Managers.Camera.MoveRight(10);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "Q"){     //Straif Up
                                                os.graphics.Managers.Camera.MoveUp(5);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "E"){     //Straif Down
                                                os.graphics.Managers.Camera.MoveDown(10);
                                            }
                                            //else if(String.fromCharCode(e.keyCode) == "1"){     //Arch
                                            //   skybox.Graphics.Texture.removeAll();
                                            //   skybox.Graphics.Add.Texture("arch");
                                            //   skybox.Set.Scale(5000,5000,5000);
                                            //}
                                            //else if(String.fromCharCode(e.keyCode) == "2"){     //Blue Sofa
                                            //    skybox.Graphics.Texture.removeAll();
                                            //    skybox.Graphics.Add.Texture("brightday");
                                            //    skybox.Set.Scale(5000,5000,5000);
                                            //}
                                            //else if(String.fromCharCode(e.keyCode) == "3"){     //Mars
                                            //    skybox.Graphics.Texture.removeAll();
                                            //    skybox.Graphics.Add.Texture("grandcanyon");
                                            //    skybox.Set.Scale(5000,5000,5000);
                                            //}
                                            //else if(String.fromCharCode(e.keyCode) == "4"){     //Mars
                                            //    skybox.Graphics.Texture.removeAll();
                                            //    skybox.Graphics.Add.Texture("hills");
                                            //    skybox.Set.Scale(5000,5000,5000);
                                            //}
                                            //else if(String.fromCharCode(e.keyCode) == "5"){     //Mars
                                            //    skybox.Graphics.Texture.removeAll();
                                            //    skybox.Graphics.Add.Texture("mars");
                                            //    skybox.Set.Scale(5000,5000,5000);
                                            //}
                                            //else if(String.fromCharCode(e.keyCode) == "6"){     //museum
                                            //    skybox.Graphics.Texture.removeAll();
                                            //    skybox.Graphics.Add.Texture("museum");
                                            //    skybox.Set.Scale(5000,5000,5000);
                                            //}
                                            //else if(String.fromCharCode(e.keyCode) == "7"){     //opensea
                                            //    skybox.Graphics.Texture.removeAll();
                                            //    skybox.Graphics.Add.Texture("snow");
                                            //    skybox.Set.Scale(5000,5000,5000);
                                            //}
                                            else if(String.fromCharCode(e.keyCode) == "1"){     //space
                                                skybox.Graphics.Texture.removeAll();
                                                skybox.Graphics.Add.Texture("space");
                                                skybox.Set.Scale(5000,5000,5000);
                                            }
                                            //else if(String.fromCharCode(e.keyCode) == "9"){     //Mars
                                            //    skybox.Graphics.Texture.removeAll();
                                            //    skybox.Graphics.Add.Texture("terrain");
                                            //    skybox.Set.Scale(5000,5000,5000);
                                            //}
                                            
                                        }
                                        onMouseDown = function(e){
                                            Input.Mouse.lastX = e.clientX;
                                            Input.Mouse.lastY = e.clientY;
                                            Input.Mouse.pressed = true;
                                        }
                                        
                                        onMouseUp = function(e){
                                            Input.Mouse.pressed = false;
                                        }
                                        
                                        onMouseMove = function(e){
                                            if (!Input.Mouse.pressed) {
                                                return;
                                            }
                                            var cam = os.graphics.Managers.Camera;
                                            
                                            var newX = e.clientX;
                                            var newY = e.clientY;
                                        
                                            var deltaX = newX - Input.Mouse.lastX
                                            cam.Rotation.yaw += deltaX / 10;
                                            
                                            if(cam.Rotation.yaw > 360){ cam.Rotation.yaw  -= 360;}
                                            else if(cam.Rotation.yaw < 0) { cam.Rotation.yaw += 360; }
                                        
                                            var deltaY = newY - Input.Mouse.lastY;
                                            cam.Rotation.pitch += deltaY / 10;
                                            if(cam.Rotation.pitch > 360){ cam.Rotation.pitch  -= 360;}
                                            else if(cam.Rotation.pitch < 0) { cam.Rotation.pitch += 360; }
                                        
                                            Input.Mouse.lastX = newX
                                            Input.Mouse.lastY = newY;   
                                        }
                                        
                                        
                                        // Setup Event Handlers for User Input
                                        window.addEventListener("keydown", onKeyDown, false);
                                        os.graphics.Get.Canvas().addEventListener("mousedown", onMouseDown, false);
                                        document.addEventListener("mouseup", onMouseUp, false);
                                        document.addEventListener("mousemove", onMouseMove, false);
    
    
                                        //Start graphics context to draw and update
                                        os.graphics.Start();
                                    },
                                    
                                    JOSS: function(){
                                        //Network Testing
                                        //Create JaHOVA OS Network Object
                                        server = os.network.Create.JOSServer("demo.jahovaos.com", "8081", "");
                                        
                                        server.Events.onMessage = function(msg){
                                            os.windows.Create.ErrorWindow("JOS Server Message", "Messabe Received: <br/>" +
                                                                          "UserID: " + msg.UserID + " <br/>" +
                                                                          "SessionID: " + msg.SessionID + " <br/>" +
                                                                          "ModuleID: " + msg.ModuleID + " <br/>" +
                                                                          "Data Type: " + msg.Data.Type + " <br/>" +
                                                                          "Data Args: " + msg.Data.Args + " <br/>" +
                                                                          "Func ID: " + msg.FunctionID + " <br/>");
                                        }
                                        
                                        //Connect to Server
                                        server.Connect();
                                        
                                        //Send Request
                                        //server.AccessModule("MainSession", "AdminModule", "godfather");
                                    },
                                    //******************************************
                                    //
                                    //  Audio DEMO
                                    //
                                    //******************************************
                                    AudioAdd: function(){
                                        os.audio.Add("battle","scripts/jahovaos/audio/BattleTheme",true, false);
                                    },
                                    AudioPlay: function(){
                                        os.audio.Play("battle");
                                        os.audio.Set.Volume("battle", 1.0);
                                    },
                                    AudioPause: function(){
                                        os.audio.Pause("battle");
                                    },
                                    //******************************************
                                    //
                                    //  Physics DEMO
                                    //
                                    //******************************************
                                    Collision: function(){
                                        //var canvas = os.resschmgr.Create.HTMLElement("canvas");
                                        //canvas.html().style.width = "100%";
                                        //canvas.html().style.height = "100%";
                                        
                                        //document.body.appendChild(canvas.html());
                                        //document.body.style.overflow = "hidden";
                                        //Load WebGL (Debug: false, fullscreen: false, canvas HTML object)
                                        os.graphics.Load(false, true);//, canvas.html());
                                        
                                        var quad = os.graphics.Managers.Mesh.Create.Primitive.Quad("quad");
                                        quad.Initialize();
                                        
                                        var cube = os.graphics.Managers.Mesh.Create.Primitive.Cube("cube");
                                        cube.Initialize();
                                        
                                        var sphMesh = os.graphics.Managers.Mesh.Create.Primitive.Sphere("sphere");
                                        sphMesh.Initialize();
                                        
                                        //Set Up Control Window
                                        Win = os.windows.WindowsManager.Create.Window("Collision Detection", "PC");
                                        Win.Set.position(0,0);
                                        Win.elements.content.html().style.overflow = "hidden";
                                        Win.Set.statusbarText("");
                                        Win.Display.window();
                                        Win.Set.width(200);
                                        Win.Set.height(60);
                                        Win.Hide.menubar();
                                        Win.Set.onMax(os.graphics.OnReset);
                                        Win.Set.onMin(os.graphics.Pause);
                                        
                                        //Create Terrain Quad
                                        var terrain = os.graphics.Managers.Entity.Create();
                                        terrain.Graphics.Add.Mesh("quad");
                                        terrain.Graphics.Set.light(false);
                                        terrain.Graphics.Set.useBlendColor(true);
                                        terrain.Graphics.Set.texture(false);
                                        terrain.Graphics.Set.blendColor([0.17,0.26,0.40]);
                                        terrain.Set.Scale(2000,2000,1);
                                        terrain.pitch = 90;
                                        terrain.Set.Position(0,0,0);
                                        terrain.Graphics.Set.fog(true);
                                        terrain.Graphics.Set.fogEndPosition(1000.0);
                                        terrain.Graphics.Set.fogBeginPosition(200.0);
                                        os.graphics.AddToWorld(terrain);
                                        
                                        var red = [0.57,0.26,0.40];
                                        var blue = [0.17,0.26,0.80];
                                        
                                        box = os.graphics.Managers.Entity.Create();
                                        box.Graphics.Add.Mesh("cube");
                                        box.Set.Position(-1,0,0);
                                        box.Set.Scale(1.01,1.01,1.01);
                                        box.Graphics.Set.useBlendColor(true);
                                        box.Graphics.Set.texture(false);
                                        box.Graphics.Set.blendColor(blue);
                                        //os.graphics.AddToWorld(box);
                                        
                                        sphere = os.graphics.Managers.Entity.Create();
                                        sphere.Graphics.Add.Mesh("sphere");
                                        sphere.Set.Position(1,0,0);
                                        sphere.Set.Scale(0.05,0.05,0.05);
                                        sphere.Graphics.Set.useBlendColor(true);
                                        sphere.Graphics.Set.texture(false);
                                        sphere.Graphics.Set.blendColor(blue);
                                        //os.graphics.AddToWorld(sphere);
                                        
                                        var numOfFrames = 0;
                                        var time = 0;
                                        var PhysicsUpdate = function(dt){
                                            time += os.graphics.Time.dt
                                            numOfFrames++;
                                            
                                            if(time > 1000){
                                                time = time / 1000;
                                                Win.Set.statusbarText("FPS: " + (numOfFrames/time).toFixed(3));
                                                time = 0;
                                                numOfFrames = 0;
                                            }
                                            
                                            if(obj1.physics.bv.CollisionTest(obj2.physics.bv)){
                                                obj1.graphics.Graphics.Set.blendColor(red);
                                                obj2.graphics.Graphics.Set.blendColor(red);
                                            }
                                            else{
                                                obj1.graphics.Graphics.Set.blendColor(blue);
                                                obj2.graphics.Graphics.Set.blendColor(blue);
                                            }
                                            //os.physics.Update.All(0.033);
                                            //p1.Get.PointInWorld(anchor, origin.Position)
                                            //os.physics.Update.All(dt/1000);
                                        }
                                        
                                        var PhysicsDraw = function(){
                                            obj1.graphics.Physics = obj1.physics;
                                            obj1.graphics.Graphics.Draw();
                                            
                                            obj2.graphics.Physics = obj2.physics;
                                            obj2.graphics.Graphics.Draw();
                                        }
                                        
                                        //Register User Defined Callbacks 
                                        os.graphics.Set.Callback.Draw(PhysicsDraw);
                                        os.graphics.Set.Callback.Update(PhysicsUpdate);
                                        
                                        //Give Camera Default Position and Rotation                                        
                                        //os.graphics.Managers.Camera.MoveUp(150);
                                        os.graphics.Managers.Camera.Position[0] = 0;
                                        os.graphics.Managers.Camera.Position[1] = 5;
                                        os.graphics.Managers.Camera.Position[2] = -25;
                                        os.graphics.Managers.Camera.Rotation.pitch = 5;
                                        
                                        var box1 = os.physics.Create.Entity(0.1);
                                        box1.Add.InertialTensor(os.physics.Create.InertialTensor.Cube(box1,1,1,1));
                                        box1.position[0] = -1;
                                        box1.position[1] = 0;
                                        box1.position[2] = 0;
                                        box1.CalculateDerivedData();
                                        box1.bv = os.physics.Create.BV.OBB(box1, [1,1,1]);
                                        
                                        var box2 = os.physics.Create.Entity(0.1);
                                        box2.Add.InertialTensor(os.physics.Create.InertialTensor.Cube(box2,1,1,1));
                                        box2.position[0] = -1;
                                        box2.position[1] = 0;
                                        box2.position[2] = 0;
                                        box2.CalculateDerivedData();
                                        box2.bv = os.physics.Create.BV.OBB(box2, [1,1,1]);
                                        
                                        var sphere1 = os.physics.Create.Entity(0.1);
                                        sphere1.Add.InertialTensor(os.physics.Create.InertialTensor.SphereSolid(sphere1,1,1,1));
                                        sphere1.position[0] = 1;
                                        sphere1.position[1] = 0;
                                        sphere1.position[2] = 0;
                                        sphere1.CalculateDerivedData();
                                        sphere1.bv = os.physics.Create.BV.Sphere(sphere1, 1);
                                        
                                        var sphere2 = os.physics.Create.Entity(0.1);
                                        sphere2.Add.InertialTensor(os.physics.Create.InertialTensor.SphereSolid(sphere2,1,1,1));
                                        sphere2.position[0] = 1;
                                        sphere2.position[1] = 0;
                                        sphere2.position[2] = 0;
                                        sphere2.CalculateDerivedData();
                                        sphere2.bv = os.physics.Create.BV.Sphere(sphere2, 1);
                                        
                                        obj1 = {
                                            graphics: sphere,
                                            physics: sphere1
                                        }
                                        obj2 = {
                                            graphics: sphere,
                                            physics: sphere2
                                        }
                                        
                                        Win.elements.content.html().innerHTML = "Press 1-4";
                                        //Setup Input Controls
                                        Input = {
                                            Mouse: {
                                                lastX: 0,
                                                lastY: 0,
                                                pressed: false
                                            }
                                        }
                                        onKeyDown = function(e){
                                            if(String.fromCharCode(e.keyCode) == "W"){     //Forward
                                                //os.graphics.Managers.Camera.MoveForward(1);
                                                obj1.physics.position[2]+= 0.1;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "S"){     //Backware
                                                //os.graphics.Managers.Camera.MoveBackward(1);
                                                obj1.physics.position[2]-=0.1;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "A"){     //Straif Left
                                                //os.graphics.Managers.Camera.MoveLeft(1);
                                                obj1.physics.position[0]-=0.1;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "D"){     //Straif Right
                                                //os.graphics.Managers.Camera.MoveRight(1);
                                                obj1.physics.position[0]+= 0.1;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "Q"){     //Straif Up
                                                //os.graphics.Managers.Camera.MoveUp(1);
                                                obj1.physics.position[1]+= 0.1;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "E"){     //Straif Down
                                                //os.graphics.Managers.Camera.MoveDown(1);
                                                obj1.physics.position[1]-= 0.1;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "R"){     //Reset
                                                //os.graphics.Managers.Camera.MoveDown(1);
                                                obj1.physics.position[0] = -1;
                                                obj1.physics.position[1] = 0;
                                                obj1.physics.position[2] = 0;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "1"){     //Sphere-Sphere
                                                Win.elements.content.html().innerHTML = "Sphere-Sphere";
                                                obj1.graphics = sphere;
                                                obj1.physics = sphere1;
                                                
                                                obj2.graphics = sphere;
                                                obj2.physics = sphere2;
                                                
                                                obj1.physics.position[0] = -1;
                                                obj1.physics.position[1] = 0;
                                                obj1.physics.position[2] = 0;
                                                
                                                obj2.physics.position[0] = 1;
                                                obj2.physics.position[1] = 0;
                                                obj2.physics.position[2] = 0;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "2"){     //Sphere-OBB
                                                Win.elements.content.html().innerHTML = "Sphere-OBB";
                                                obj1.graphics = sphere;
                                                obj1.physics = sphere1;
                                                
                                                obj2.graphics = box;
                                                obj2.physics = box2;
                                                obj2.graphics.yaw = 0;
                                                obj2.graphics.pitch = 0;
                                                BuildOrientation(obj2);
                                                
                                                obj1.physics.position[0] = -1;
                                                obj1.physics.position[1] = 0;
                                                obj1.physics.position[2] = 0;
                                                
                                                obj2.physics.position[0] = 1;
                                                obj2.physics.position[1] = 0;
                                                obj2.physics.position[2] = 0;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "3"){     //OBB-Sphere
                                                Win.elements.content.html().innerHTML = "OBB-Sphere";
                                                obj1.graphics = box;
                                                obj1.physics = box1;
                                                
                                                obj2.graphics = sphere;
                                                obj2.physics = sphere2;
                                                
                                                obj1.physics.position[0] = -1;
                                                obj1.physics.position[1] = 0;
                                                obj1.physics.position[2] = 0;
                                                obj1.graphics.yaw   = 0;
                                                obj1.graphics.pitch = 0;
                                                BuildOrientation(obj1);
                                                
                                                obj2.physics.position[0] = 1;
                                                obj2.physics.position[1] = 0;
                                                obj2.physics.position[2] = 0;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "4"){     //OBB-OBB
                                                Win.elements.content.html().innerHTML = "OBB-OBB";
                                                obj1.graphics = box;
                                                obj1.physics = box1;
                                                
                                                obj2.graphics = box;
                                                obj2.physics = box2;
                                                
                                                obj1.physics.position[0] = -1;
                                                obj1.physics.position[1] = 0;
                                                obj1.physics.position[2] = 0;
                                                obj1.graphics.yaw   = 0;
                                                obj1.graphics.pitch = 0;
                                                BuildOrientation(obj1);
                                                
                                                obj2.physics.position[0] = 1;
                                                obj2.physics.position[1] = 0;
                                                obj2.physics.position[2] = 0;
                                                obj2.graphics.yaw   = 0;
                                                obj2.graphics.pitch = 0;
                                                BuildOrientation(obj2);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "5"){     //OBB-OBB
                                                Win.elements.content.html().innerHTML = "OBB-OBB";
                                                obj1.graphics = box;
                                                obj1.physics = box1;
                                                
                                                obj2.graphics = box;
                                                obj2.physics = box2;
                                                
                                                obj1.physics.position[0] = -1;
                                                obj1.physics.position[1] = 0;
                                                obj1.physics.position[2] = 0;
                                                obj1.graphics.yaw   = -45;
                                                obj1.graphics.pitch = 45;
                                                BuildOrientation(obj1);
                                                
                                                obj2.physics.position[0] = 1;
                                                obj2.physics.position[1] = 0;
                                                obj2.physics.position[2] = 0;
                                                obj2.graphics.yaw   = 0;
                                                obj2.graphics.pitch = 0;
                                                BuildOrientation(obj2);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "6"){     //Sphere-OBB
                                                Win.elements.content.html().innerHTML = "Sphere-OBB";
                                                obj1.graphics = sphere;
                                                obj1.physics = sphere1;
                                                
                                                obj2.graphics = box;
                                                obj2.physics = box2;
                                                obj2.graphics.yaw = -45;
                                                obj2.graphics.pitch = 0;
                                                BuildOrientation(obj2);
                                                
                                                obj1.physics.position[0] = -1;
                                                obj1.physics.position[1] = 0;
                                                obj1.physics.position[2] = 0;
                                                
                                                obj2.physics.position[0] = 1;
                                                obj2.physics.position[1] = 0;
                                                obj2.physics.position[2] = 0;
                                            }
                                        }
                                        onMouseDown = function(e){
                                            Input.Mouse.lastX = e.clientX;
                                            Input.Mouse.lastY = e.clientY;
                                            Input.Mouse.pressed = true;
                                        }
                                        
                                        onMouseUp = function(e){
                                            Input.Mouse.pressed = false;
                                        }
                                        
                                        onMouseMove = function(e){
                                            if (!Input.Mouse.pressed) {
                                                return;
                                            }
                                            
                                            //var x = quat4.create([1,0,0,degToRad(os.graphics.Managers.Camera.Rotation.pitch)]);
                                            //var y = quat4.create([0,1,0,degToRad(os.graphics.Managers.Camera.Rotation.yaw)]);
                                            //var z = quat4.create([0,0,-1,degToRad(os.graphics.Managers.Camera.Rotation.roll)]);
                                            


                                            var cam = os.graphics.Managers.Camera;
                                            
                                            var newX = e.clientX;
                                            var newY = e.clientY;
                                        
                                            var deltaX = newX - Input.Mouse.lastX
                                            obj1.graphics.yaw += deltaX / 10;
                                            
                                            if(obj1.graphics.yaw > 360){ obj1.graphics.yaw  -= 360;}
                                            else if(obj1.graphics.yaw < 0) { obj1.graphics.yaw += 360; }
                                        
                                            var deltaY = newY - Input.Mouse.lastY;
                                            obj1.graphics.pitch += deltaY / 10;
                                            if(obj1.graphics.pitch > 360){ obj1.graphics.pitch  -= 360;}
                                            else if(obj1.graphics.pitch < 0) { obj1.graphics.pitch += 360; }
                                            
                                            BuildOrientation(obj1)
                                            
                                            Input.Mouse.lastX = newX
                                            Input.Mouse.lastY = newY;   
                                        }
                                        
                                        var BuildOrientation = function(obj){
                                            
                                            var cosX = Math.cos(degToRad(obj.graphics.pitch/2));
                                            var sinX = Math.sin(degToRad(obj.graphics.pitch/2));
                                            
                                            var cosY = Math.cos(degToRad(obj.graphics.yaw/2));
                                            var sinY = Math.sin(degToRad(obj.graphics.yaw/2));
                                            
                                            var cosZ = Math.cos(degToRad(obj.graphics.roll/2));
                                            var sinZ = Math.sin(degToRad(obj.graphics.roll/2));
                                            
                                            var orient = [];
                                            var qx = [sinX,0,0,cosX];
                                            var qy = [0,sinY,0,cosY];
                                            var qz = [0,0,sinZ,cosZ];
                                            
                                            quat4.multiply(qz,qy, orient);
                                            quat4.multiply(orient, qx, orient);
                                            
                                            quat4.normalize(orient, orient);
                                            orient[3]*=-1;
                                            //orient[0] = sinX*cosY*cosZ + cosX*sinY*sinZ;
                                            //orient[1] = cosX*sinY*cosZ + sinX*cosY*sinZ;
                                            //orient[2] = cosX*cosY*sinZ + sinX*sinY*cosZ;
                                            //orient[3] = -cosX*cosY*cosZ - sinX*sinY*sinZ;
                                            //
                                            //quat4.normalize(orient, orient);
                                            quat4.set(orient, obj.physics.orientation);
                                            
                                        }
                                        // Setup Event Handlers for User Input
                                        window.addEventListener("keydown", onKeyDown, false);
                                        os.graphics.Get.Canvas().addEventListener("mousedown", onMouseDown, false);
                                        document.addEventListener("mouseup", onMouseUp, false);
                                        document.addEventListener("mousemove", onMouseMove, false);
                                        
                                        
                                        //Start graphics context to draw and update
                                        os.graphics.Start();
                                        
                                    },
                                    Physics: function(){
                                        var canvas = os.resschmgr.Create.HTMLElement("canvas");
                                        canvas.html().style.width = "100%";
                                        canvas.html().style.height = "100%";
                                        
                                        document.body.appendChild(canvas.html());
                                        document.body.style.overflow = "hidden";
                                        
                                        //Load WebGL (Debug: false, fullscreen: false, canvas HTML object)
                                        os.graphics.Load(false, false, canvas.html());
                                        os.graphics.Managers.Texture.Create.Texture("scorpion", "scripts/jahovaos/graphics/textures/starhawk.jpg");
                                        os.graphics.Managers.Mesh.Create.Mesh("scorpion", "scripts/jahovaos/graphics/meshes/starhawk.json");
                                        os.graphics.Managers.Texture.Create.Texture("crate", "scripts/jahovaos/graphics/textures/crate.jpg");
                                        
                                        
                                        var quad = os.graphics.Managers.Mesh.Create.Primitive.Quad("quad");
                                        quad.Initialize();
                                        
                                        var cube = os.graphics.Managers.Mesh.Create.Primitive.Cube("cube");
                                        cube.Initialize();
                                        
                                        //Set Up Control Window
                                        Win = os.windows.WindowsManager.Create.Window("Physics Demo", "PC");
                                        Win.Set.position(0,0);
                                        Win.elements.content.html().style.overflow = "hidden";
                                        Win.Set.statusbarText("");
                                        Win.Display.window();
                                        Win.Set.width(200);
                                        Win.Set.height(60);
                                        Win.Set.onMax(os.graphics.OnReset);
                                        Win.Set.onMin(os.graphics.Pause);
                                        
                                        //Create Terrain Quad
                                        var terrain = os.graphics.Managers.Entity.Create();
                                        terrain.Graphics.Add.Mesh("quad");
                                        terrain.Graphics.Set.light(false);
                                        terrain.Graphics.Set.useBlendColor(true);
                                        terrain.Graphics.Set.texture(false);
                                        terrain.Graphics.Set.blendColor([0.17,0.26,0.40]);
                                        terrain.Set.Scale(2000,2000,1);
                                        terrain.pitch = 90;
                                        terrain.Set.Position(0,0,0);
                                        terrain.Graphics.Set.fog(true);
                                        terrain.Graphics.Set.fogEndPosition(1000.0);
                                        terrain.Graphics.Set.fogBeginPosition(200.0);
                                        os.graphics.AddToWorld(terrain);
                                        
                                        var box1 = os.graphics.Managers.Entity.Create();
                                        box1.Graphics.Add.Mesh("scorpion");
                                        box1.Graphics.Add.Texture("scorpion");
                                        box1.Set.Scale(0.02,0.02,0.02);
                                        box1.Set.Position(0,0,0);
                                        //box1.Graphics.Set.useBlendColor(true);
                                        box1.Graphics.Set.texture(true);
                                        //box1.Graphics.Set.blendColor([0.17,0.26,0.80]);
                                        os.graphics.AddToWorld(box1);
                                        
                                        var box2 = os.graphics.Managers.Entity.Create();
                                        box2.Graphics.Add.Mesh("cube");
                                        box2.Graphics.Add.Texture("crate");
                                        box2.Set.Position(0,0,0);
                                        box2.Graphics.Set.useBlendColor(true);
                                        box2.Graphics.Set.texture(false);
                                        box2.Graphics.Set.blendColor([0.57,0.26,0.40]);
                                        os.graphics.AddToWorld(box2);
                                        
                                        var box3 = os.graphics.Managers.Entity.Create();
                                        box3.Graphics.Add.Mesh("cube");
                                        box3.Graphics.Add.Texture("crate");
                                        box3.Set.Position(0,0,0);
                                        box3.Graphics.Set.useBlendColor(true);
                                        box3.Graphics.Set.texture(false);
                                        box3.Graphics.Set.blendColor([0.17,0.66,0.40]);
                                        os.graphics.AddToWorld(box3);
                                        
                                        var box4 = os.graphics.Managers.Entity.Create();
                                        box4.Graphics.Add.Mesh("cube");
                                        box4.Graphics.Add.Texture("crate");
                                        box4.Set.Position(0,0,0);
                                        box4.Graphics.Set.useBlendColor(true);
                                        box4.Graphics.Set.texture(false);
                                        box4.Graphics.Set.blendColor([0.57,0.26,0.80]);
                                        os.graphics.AddToWorld(box4);
                                        
                                        var origin = os.graphics.Managers.Entity.Create();
                                        origin.Graphics.Add.Mesh("cube");
                                        origin.Graphics.Add.Texture("crate");
                                        origin.Set.Position(0,0,0);
                                        origin.Set.Scale(0.1,0.1,0.1);
                                        os.graphics.AddToWorld(origin);
                                        time = 0;
                                        
                                        var anchor = [0,0,-70];
                                        PhysicsUpdate = function(dt){
                                            Win.Set.statusbarText("FPS: " + (1/dt * 1000).toFixed(3));
                                            time += 0.016;
                                            os.physics.Update.All(0.033);
                                            //p1.Get.PointInWorld(anchor, origin.Position)
                                            //os.physics.Update.All(dt/1000);
                                        }
                                        
                                        PhysicsDraw = function(){
                                            //box1.Set.Scale(1,1,1);
                                            //box1.Set.Position(p1.position[0], p1.position[1], p1.position[2]);
                                            //box1.Graphics.Draw();
                                            
                                            //box2.Set.Scale(1,1,1);
                                            //box2.Set.Position(p2.position[0], p2.position[1], p2.position[2]);
                                            //box2.Graphics.Draw();
                                            
                                            //box.Set.Scale(0.1,0.1,0.1)
                                            //box.Set.Position(0,-1,0);
                                            //box.Graphics.Draw();
                                                
                                            //box.Set.Position(0,4,0);
                                            //box.Graphics.Draw();
                                            //for(var i = 0; i < 3; i++){
                                            //    box.Set.Position(0,i*2,0);
                                            //    box.Graphics.Draw();
                                            //}
                                            
                                        }
                                        //Register User Defined Callbacks 
                                        //os.graphics.Set.Callback.Draw(PhysicsDraw);
                                        os.graphics.Set.Callback.Update(PhysicsUpdate);
                                        
                                        //Give Camera Default Position and Rotation                                        
                                        //os.graphics.Managers.Camera.MoveUp(150);
                                        os.graphics.Managers.Camera.Position[0] = 0;
                                        os.graphics.Managers.Camera.Position[1] = 15;
                                        os.graphics.Managers.Camera.Position[2] = -85;
                                        os.graphics.Managers.Camera.Rotation.pitch = 5;
                                        
                                        
                                        //
                                        //  PHYSICS DEMO 
                                        //
                                        
                                        //Create Physics Entity
                                        var p1 = os.physics.Create.Entity(0.1);
                                        var p2 = os.physics.Create.Entity(0.1);
                                        var p3 = os.physics.Create.Entity(0.1);
                                        var p4 = os.physics.Create.Entity(0.1);
                                        
                                        //blue
                                        box1.Physics = p1;
                                        p1.linearDampening = 0.95;
                                        p1.angularDampening = 0.9;
                                        p1.position[0] = 10;
                                        p1.position[1] = 0;
                                        p1.position[2] = -30;
                                        p1.Add.InertialTensor(os.physics.Create.InertialTensor.Cube(p1,20,20,20));
                                        p1.CalculateDerivedData();
                                        
                                        
                                        //red
                                        box2.Physics = p2;
                                        p2.linearDampening = 0.99;
                                        p2.angularDampening = 0.99;
                                        p2.position[0] = -10;
                                        p2.position[1] = 0;
                                        p2.position[2] = -30;
                                        p2.Add.InertialTensor(os.physics.Create.InertialTensor.Cube(p2,2,2,2));
                                        p2.CalculateDerivedData();
                                        
                                        //green
                                        box3.Physics = p3;
                                        p3.linearDampening = 0.99;
                                        p3.angularDampening = 0.99;
                                        p3.position[0] = 5;
                                        p3.position[1] = 0;
                                        p3.position[2] = -30;
                                        p3.Add.InertialTensor(os.physics.Create.InertialTensor.Cube(p3,2,2,2));
                                        p3.CalculateDerivedData();
                                        
                                        //purple
                                        box4.Physics = p4;
                                        p4.linearDampening = 0.99;
                                        p4.angularDampening = 0.95;
                                        p4.position[0] = 0;
                                        p4.position[1] = 0;
                                        p4.position[2] = -30;
                                        p4.Add.InertialTensor(os.physics.Create.InertialTensor.Cube(p4,2,2,2));
                                        p4.CalculateDerivedData();
                                        
                                        var force1 = os.physics.Create.Force.Spring(p1, 0.25, 20, anchor,[0,0,0]);//, p2);
                                        var force2 = os.physics.Create.Force.Spring(p2, 2, 20, [0,0,0],[0,0,0]);//;, p1);
                                        var force3 = os.physics.Create.Force.Spring(p3, 2, 20, [0,0,0],[0,0,0]);//;, p1);
                                        var force4 = os.physics.Create.Force.Spring(p4, 2, 20, [0,0,0],[0,0,0]);//;, p1);
                                        
                                        //Setup Input Controls
                                        Input = {
                                            Mouse: {
                                                lastX: 0,
                                                lastY: 0,
                                                pressed: false
                                            }
                                        }
                                        onKeyDown = function(e){
                                            if(String.fromCharCode(e.keyCode) == "W"){     //Forward
                                                os.graphics.Managers.Camera.MoveForward(1);   
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "S"){     //Backware
                                                os.graphics.Managers.Camera.MoveBackward(1);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "A"){     //Straif Left
                                                os.graphics.Managers.Camera.MoveLeft(1);  
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "D"){     //Straif Right
                                                os.graphics.Managers.Camera.MoveRight(1);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "Q"){     //Straif Up
                                                os.graphics.Managers.Camera.MoveUp(1);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "E"){     //Straif Down
                                                os.graphics.Managers.Camera.MoveDown(1);
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "R"){     //Straif Down
                                                p1.inverseMass = 3;
                                                p1.position[0] = 50;
                                                p1.position[0] = 0;
                                                p1.position[0] = 0;
                                                
                                                p2.inverseMass = 3;
                                                p2.position[0] = -50;
                                                p2.position[0] = 0;
                                                p2.position[0] = 0;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "T"){     //Straif Down
                                                p1.inverseMass = 5;
                                                p1.position[0] = 50;
                                                p1.position[0] = 0;
                                                p1.position[0] = 0;
                                                
                                                p2.inverseMass = 5;
                                                p2.position[0] = -50;
                                                p2.position[0] = 0;
                                                p2.position[0] = 0;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "Y"){     //Straif Down
                                                force1.springConstant++;
                                                force2.springConstant++;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "H"){     //Straif Down
                                                force1.springConstant--;
                                                force2.springConstant--;
                                            }
                                            else if(String.fromCharCode(e.keyCode) == "U"){     //Straif Down
                                                p2.PrintRot();
                                            }
                                            if(String.fromCharCode(e.keyCode) == "I"){     //Forward
                                                os.physics.Create.Force.Impulse(p2,[0,0,0],[0,0,100]);
                                            }
                                            if(String.fromCharCode(e.keyCode) == "K"){     //Forward
                                                os.physics.Create.Force.Impulse(p2,[0,0,0],[0,0,-100]);
                                            }
                                            if(String.fromCharCode(e.keyCode) == "J"){     //Forward
                                                os.physics.Create.Force.Impulse(p2,[-10,0,0],[0,0,100]);
                                            }
                                            if(String.fromCharCode(e.keyCode) == "L"){     //Forward
                                                 os.physics.Create.Force.Impulse(p2,[10,0,0],[0,0,100]);
                                            }
                                        }
                                        onMouseDown = function(e){
                                            Input.Mouse.lastX = e.clientX;
                                            Input.Mouse.lastY = e.clientY;
                                            Input.Mouse.pressed = true;
                                        }
                                        
                                        onMouseUp = function(e){
                                            Input.Mouse.pressed = false;
                                        }
                                        
                                        onMouseMove = function(e){
                                            if (!Input.Mouse.pressed) {
                                                return;
                                            }
                                            var cam = os.graphics.Managers.Camera;
                                            
                                            var newX = e.clientX;
                                            var newY = e.clientY;
                                        
                                            var deltaX = newX - Input.Mouse.lastX
                                            cam.Rotation.yaw += deltaX / 10;
                                            
                                            if(cam.Rotation.yaw > 360){ cam.Rotation.yaw  -= 360;}
                                            else if(cam.Rotation.yaw < 0) { cam.Rotation.yaw += 360; }
                                        
                                            var deltaY = newY - Input.Mouse.lastY;
                                            cam.Rotation.pitch += deltaY / 10;
                                            if(cam.Rotation.pitch > 360){ cam.Rotation.pitch  -= 360;}
                                            else if(cam.Rotation.pitch < 0) { cam.Rotation.pitch += 360; }
                                        
                                            Input.Mouse.lastX = newX
                                            Input.Mouse.lastY = newY;   
                                        }
                                        
                                        
                                        // Setup Event Handlers for User Input
                                        window.addEventListener("keydown", onKeyDown, false);
                                        os.graphics.Get.Canvas().addEventListener("mousedown", onMouseDown, false);
                                        document.addEventListener("mouseup", onMouseUp, false);
                                        document.addEventListener("mousemove", onMouseMove, false);
                                        
                                        
                                        //Start graphics context to draw and update
                                        os.graphics.Start();
                                        
                                        
                                    },
                                    //******************************************
                                    //
                                    //  CONSOLE COMMAND FUNCTIONS
                                    //
                                    //******************************************
                                    AddCommand: function(name, callback, scope, help){
                                        this.Commands.put(name.toUpperCase(),os.resschmgr.Create.Command(name, callback, scope, help));
                                    },
                                    
                                    RemoveCommand: function(name){
                                        this.Commands.remove(name.toUpperCase());  
                                    },
                                    
                                    GetCommand: function(name){
                                        return this.Commands.get(name.toUpperCase());
                                    },
                                    
                                    DisplayCommands: function(){
                                        
                                        for(var i = 0; i++ < this.Commands.size; this.Commands.next())
                                        {
                                            os.console.AppendComment("Command: " + this.Commands.value().name);
                                            os.console.AppendComment("Description:");
                                            os.console.AppendComment(this.Commands.value().help);
                                            os.console.AppendComment("");
                                        }

                                    },
                                    
                                    //******************************************
                                    //
                                    //  CONSOLE OUTPUT FUNCTIONS
                                    //
                                    //******************************************
                                    log: function(comment){
                                        //console.cmdWindow.value += "\n" + comment;
                                        //console.cmdWindow.scrollTop = console.cmdWindow.scrollHeight;
                                    },
                                    AppendComment: function(comment){
                                        
                                        console.cmdWindow.value += "\n" + comment;
                                        console.cmdWindow.scrollTop = console.cmdWindow.scrollHeight;

                                    },
                                   
                                    Comment: function(comment){
                                        
                                        console.cmdWindow.value += comment + "\n" + prompt;
                                        console.cmdWindow.scrollTop = console.cmdWindow.scrollHeight;                                        
                                    },
                                    
                                    Warning: function(comment){
                                        console.cmdWindow.value += "\n~WARNING~ " + comment + "\n" + prompt;
                                        console.cmdWindow.scrollTop = console.cmdWindow.scrollHeight;                                        
                                    },
                                    
                                    Error: function(comment){
                                        console.cmdWindow.value += "\n~ERROR~ " + comment + "\n" + prompt;
                                        console.cmdWindow.scrollTop = console.cmdWindow.scrollHeight;                                        
                                    },
                                    
                                    Clear: function(){
                                        console.cmdWindow.value = prompt;
                                        console.cmdWindow.scrollTop = console.cmdWindow.scrollHeight;                                        
                                    },
                                    
                                    //******************************************
                                    //
                                    //  CONSOLE COMMAND EVALUATION FUNCTION
                                    //
                                    //******************************************
                                    EvaluateInput: function(e){
                                        var keyCode = e.keyCode ? e.keyCode : e.charCode;
                                        
                                        //Return Key
                                        if (keyCode == 13)
                                        {
                                            e.preventDefault();
                                            //this.cmdWindow = document.getElementById('com.jahova.console.window');
                                            //var txtVal = this.cmdWindow.value;
                                            lastIndex = os.console.cmdWindow.value.lastIndexOf(prompt);
                                            lastInput = os.console.cmdWindow.value.substring(lastIndex + prompt.length);
                                            cmdIndex = lastInput.indexOf(" ");
                                            cmdString = cmdIndex > 0 ? lastInput.substring(0, cmdIndex).toUpperCase() : lastInput.toUpperCase();
                                            
                                            cmd = os.console.Commands.get(cmdString);
                                            if(cmd){
                                                //Executes command and passes command string (without cmd naame) as input
                                                cmd.Execute(lastInput.substring(cmdIndex + 1));
                                            }
                                            else{
                                                console.AppendComment("Command: " + cmdString + "\nNot Found, type help to get a list of loaded commands");
                                            }
                                            
                                            console.Comment("");
                                            
                                            
                                            os.console.length = 0;
                                        }
                                        //Up Arrow - Repeat last command
                                        else if (keyCode == 38){
                                            if(cmd){
                                                
                                                //Executes command and passes command string (without cmd naame) as input
                                                //cmd.Execute(lastInput.substring(cmdIndex + 1));
                                                //os.console.Comment("");
                                                //console.cmdWindow.blur();
                                                console.cmdWindow.value += lastInput;//comment + "\n" + prompt;
                                                console.cmdWindow.scrollTop = console.cmdWindow.scrollHeight;
                                                //console.cmdWindow.focus();
                                                //os.console.AppendComment(lastInput);
                                                
                                                //if (os.console.cmdWindow.createTextRange) {
                                                    //var range = os.console.cmdWindow.createTextRange();
                                                    //range.collapse(true);
                                                    //range.moveEnd('character', os.console.cmdWindow.value.length);
                                                    //range.moveStart('character', os.console.cmdWindow.value.length);
                                                    //range.select();
                                                //}
                                            }
                                        }
                                        else if (keyCode == 8) {
                                            if (os.console.length > 0)
                                                os.console.length--;
                                            else {
                                                e.preventDefault();
                                                //this.cmdWindow.value += ">";
                                            }
                                        }
                                        else if (keyCode > 31) {
                                            os.console.length++;
                                        }
                                        
                                    },
                                    ProcessInputString: function(){
                                        lastIndex = os.console.cmdWindow.value.lastIndexOf(prompt);
                                        lastInput = os.console.cmdWindow.value.substring(lastIndex + prompt.length);
                                        cmdIndex = lastInput.indexOf(" ");
                                        cmdString = cmdIndex > 0 ? lastInput.substring(0, cmdIndex).toUpperCase() : lastInput.toUpperCase();
                                        
                                        cmd = os.console.Commands.get(cmdString);
                                        if(cmd){
                                            //Executes command and passes command string (without cmd naame) as input
                                            cmd.Execute(lastInput.substring(cmdIndex + 1));
                                        }
                                        else{
                                            console.AppendComment("Command: " + cmdString + "\nNot Found, type help to get a list of loaded commands");
                                        }
                                        
                                        console.Comment("");
                                        
                                        
                                        os.console.length = 0;
                                    }

                                }
                            }
                            
                            return {
                                //OBJECT ACCESSOR
                                Instance: function()
                                {
                                    if(!pInstance)
                                    {
                                        //Instantiate if pInstance does not exist
                                        pInstance = constructor();
                                    }
                                    
                                    return pInstance;
                                }
                            }
                        })();
//JaHOVA Utilities : Timer 
//      Dependent on JaHOVA Utilities

/**h* Utilities/Console
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p>
*
*  NAME
*    JaHOVA Utilities Timer
*    
*  AUTHOR
*   Corey Clark
*   cclark@coreyclarkphd.com
*
*  HISTORY
*   Created: 7/28/2011
*   
*
*  DESCRIPTION
*     This module adds timer capability
*     
*
*  EXAMPLE
*   console = com.jahova.utilities.Instance().Timer.Instance();
**/


com.jahova.utilities.Instance().Timer = (function()
                        {
                            var pInstance;
                            /**m* Console/Constructor
                            *
                            *  SOURCE
                            */
                            function constructor()
                            {
                                //******************
                                //PRIVATE ATTRIBUTES
                                //******************
                                
                                var NAME = "JaHOVA Utilities : Timer Module";
                                var VERSION = "0v3";
                                var PATH = "scripts/jahova/Utilities/Console/jahova.utilities.timer.js";
                                
                                var os = com.jahova.os.Instance();
                                var timer = this;
                                
                                var startTime = null;
                                var elapsedTime = null;
                                var lapElapsedTime = null;
                                var running = false;
                                var date = new Date();
                                var _log = os.resschmgr.Create.Map();
                                var CLap = function(lapName, lapTime)
                                {
                                    this.name = lapName;
                                    this.time = lapTime;
                                }
                                
                                //******************
                                //PRIVATE METHODS
                                //******************
                                
                                
                                //******************
                                //INITALIZATION
                                //******************

                                
                                return{
                                    //PUBLIC ATTRIBUTES
                                    log: null,
                                    Initialize: function(){
                                        timer = this;
                                        this.log = [];
                                        lapElapsedTime = 0;
                                        
                                    },
                                    
                                    Start: function(){
                                        running = true;
                                        return startTime = (new Date).getTime();
                                        
                                    },
                                    
                                    Stop: function(){
                                        var currentTime = (new Date).getTime();
                                        running = false;
                                        return elapsedTime += currentTime - startTime;
                                    },
                                    
                                    Lap: function(lapName){
                                        var currentTime = (new Date).getTime();                                        
                                        if(running)
                                        {
                                            elapsedTime += currentTime - startTime;
                                            
                                            var lapTime = elapsedTime - lapElapsedTime;
                                            
                                            lapElapsedTime += lapTime
                                            var logEntry = new CLap(lapName, lapTime);
                                            this.log.push(logEntry);
                                            
                                            _log.put(lapName, logEntry);
                                            
                                            //elapsedTime += lapTime;
                                            
                                            startTime = (new Date).getTime();
                                            return lapTime;
                                        }
                                        return null;
                                        
                                    },
                                    
                                    Reset: function(){
                                        startTime = 0;
                                        elapsedTime = 0;
                                        lapElapsedTime = 0;
                                        this.log = [];
                                        _log.removeAll();
                                    },
                                    GetElapsedTime: function(){
                                        var currentTime = (new Date).getTime();
                                        if(running)
                                        {
                                            elapsedTime += currentTime - startTime;
                                            startTime = currentTime;
                                        }
                                        return elapsedTime;
                                    },
                                    GetName: function(){
                                        return NAME;
                                    },
                                    
                                    GetLap: function(lapName){
                                        return _log.get(lapName);  
                                    },
                                    
                                    RemoveLap: function(lapName){
                                        _log.remove(lapName);
                                    },
        
                                    GetVersion: function(){
                                        return VERSION;
                                    },

                                    GetPath: function(){
                                        return PATH;
                                    }
                                }
                            }
                            
                            return {
                                //OBJECT ACCESSOR
                                Instance: function()
                                {
                                    if(!pInstance)
                                    {
                                        //Instantiate if pInstance does not exist
                                        pInstance = constructor();
                                    }
                                    
                                    return pInstance;
                                }
                            }
                        })();

com.jahova.utilities.Instance().DebugBar = (function()
                        {
                            var pInstance;
                           
                            function constructor()
                            {
                                //******************
                                //PRIVATE ATTRIBUTES
                                //******************
                                
                                var NAME = "JaHOVA Utilities : Debug Bar";
                                var VERSION = "0v5";
                                var PATH = "scripts/jahova/Utilities/DebugBar/jahova.utilities.debugbar.js";
                                var ENABLED = true;
                                
                                var os = com.jahova.os.Instance();
                                var debugbar = os.debugbar;
                                var prompt = "~JaHOVA OS >>";
                                

                                //******************
                                //PRIVATE METHODS
                                //******************
                                
                                
                                //******************
                                //INITALIZATION
                                //******************

                                
                                return{
                                    //PUBLIC ATTRIBUTES
                                    ConsolePagePinned: false,
                                    LogsPagePinned: false,
                                    SettingsPagePinned: false,
                                    
                                    //PUBLIC PRIVILEDGE METHODS
                                    
                                    GetName: function(){
                                        return NAME;
                                    },
                                    
                                    GetVersion: function(){
                                        return VERSION;
                                    },
                                    
                                    GetPath: function(){
                                        return PATH;
                                    },
                                    
                                    GetStatus: function(){
                                        return ENABLED;
                                    },
                                    
                                    Enable: function(){
                                        ENABLED = true;
                                        os.Elements.DebugBar.style.display = "block";
                                        
                                    },
                                    
                                    Disable: function(){
                                        ENABLED = false;
                                        os.Elements.DebugBar.style.display = "none";
                                        
                                    },
                                    
                                    Initialize: function(){
                                        window.onkeydown = os.debugbar.EvaluateShortCuts;
                                        os.debugbar.Build();
                                    },
                                    
                                    Build: function(){
                                        
                                        //Debug Bar Wrapper
                                        os.Elements.DebugBar = document.createElement("div");
                                        os.Elements.DebugBar.id = "com.jahova.debugBar";
                                        os.Elements.DebugBar.className = "ideSidebar appBaseColor";
                                        document.body.appendChild(os.Elements.DebugBar);
                                        
                                        
                                        //***********************************
                                        //
                                        //  CONSOLE
                                        //
                                        //***********************************                                        
                                        
                                        //Debug Bar Tab
                                        os.Elements.DebugBarConsoleTab = document.createElement("div");
                                        os.Elements.DebugBarConsoleTab.id = "com.jahova.debugBar.Console.Tab";
                                        os.Elements.DebugBarConsoleTab.className = "ideSidebarTabFolderView jahova_borRadR2 sidebarTabColor";
                                        os.Elements.DebugBar.appendChild(os.Elements.DebugBarConsoleTab);
                                        
                                        //Debug Bar Tab Label
                                        os.Elements.DebugBarConsoleTabLabel = document.createElement("div");
                                        os.Elements.DebugBarConsoleTabLabel.id = "com.jahova.debugBar.Console.Tab.Label";
                                        os.Elements.DebugBarConsoleTabLabel.className = "ideSidebarTabTextFolderView textColorWhite";
                                        os.Elements.DebugBarConsoleTabLabel.innerHTML = "Console";
                                        os.Elements.DebugBarConsoleTab.appendChild(os.Elements.DebugBarConsoleTabLabel);
                                        
                                        //Debug Bar Content Wrapper
                                        os.Elements.DebugBarConsole = document.createElement("div");
                                        os.Elements.DebugBarConsole.id = "com.jahova.debugBar.Console.Wrapper";
                                        os.Elements.DebugBarConsole.className = "ideSidebarPageFolderView sidebarTabColor jahova_borRadL2 jahova_borRadB2 jahova_transWp5s";
                                        //os.Elements.DebugBarConsole.style.visibility = "visible";
                                        //os.Elements.DebugBarConsole.style.width = "260px";
                                        os.Elements.DebugBarConsoleTab.appendChild(os.Elements.DebugBarConsole);
                                        
                                        //Debug Bar Content Header
                                        os.Elements.DebugBarConsoleHeader = document.createElement("div");
                                        os.Elements.DebugBarConsoleHeader.id = "com.jahova.debugBar.Console.Header";
                                        os.Elements.DebugBarConsoleHeader.className = "ideSidebarFolderHeader jahova_borRadT2 menuColor";
                                        os.Elements.DebugBarConsole.appendChild(os.Elements.DebugBarConsoleHeader);
                                        
                                        //Debug Bar Content Header Label
                                        os.Elements.DebugBarConsoleHeaderLabel = document.createElement("div");
                                        os.Elements.DebugBarConsoleHeaderLabel.id = "com.jahova.debugBar.Console.Header.Label";
                                        os.Elements.DebugBarConsoleHeaderLabel.className = "ideSidebarFolderH3";
                                        os.Elements.DebugBarConsoleHeaderLabel.innerHTML = "Terminal Window";
                                        os.Elements.DebugBarConsoleHeader.appendChild(os.Elements.DebugBarConsoleHeaderLabel);
                                        
                                        //Debug Bar Header Pin
                                        os.Elements.DebugBarConsoleHeaderPin = document.createElement("div");
                                        os.Elements.DebugBarConsoleHeaderPin.id = "com.jahova.debugBar.Console.Header.Pin";
                                        os.Elements.DebugBarConsoleHeaderPin.className = "ideSidebarPin";
                                        os.Elements.DebugBarConsoleHeaderPin.onclick = this.AnchorPage;
                                        os.Elements.DebugBarConsoleHeader.appendChild(os.Elements.DebugBarConsoleHeaderPin);
                                      
                                        //Debug Bar Icon
                                        os.Elements.DebugBarConsoleIconHeader = document.createElement("div");
                                        os.Elements.DebugBarConsoleIconHeader.id = "com.jahova.debugBar.Console.Icons";
                                        os.Elements.DebugBarConsoleIconHeader.className = "ideSidebarFolderIconHeader iconColor";
                                        os.Elements.DebugBarConsole.appendChild(os.Elements.DebugBarConsoleIconHeader);
                                        
                                        //Debug Bar Content Area
                                        os.Elements.DebugBarConsoleContent = document.createElement("div");
                                        os.Elements.DebugBarConsoleContent.id = "com.jahova.debugBar.Console.Content";
                                        os.Elements.DebugBarConsoleContent.className = "ideSidebarFolderContent jahova_borRadB2 viewContentBkgColor";
                                        os.Elements.DebugBarConsole.appendChild(os.Elements.DebugBarConsoleContent);
                                        
                                        os.console.cmdWindow.style.border = "0px";
                                        os.console.cmdWindow.style.height = "503px";
                                        os.Elements.DebugBarConsoleContent.appendChild(os.console.cmdWindow);
                                        
                                        
                                        //***********************************
                                        //
                                        //  LOGS
                                        //
                                        //***********************************
                                        
                                        //Debug Bar Tab
                                        os.Elements.DebugBarLogTab = document.createElement("div");
                                        os.Elements.DebugBarLogTab.id = "com.jahova.debugBar.Log.Tab";
                                        os.Elements.DebugBarLogTab.className = "ideSidebarTabFolderView jahova_borRadR2 sidebarTabColor";
                                        os.Elements.DebugBar.appendChild(os.Elements.DebugBarLogTab);
                                        
                                        //Debug Bar Tab Label
                                        os.Elements.DebugBarLogTabLabel = document.createElement("div");
                                        os.Elements.DebugBarLogTabLabel.id = "com.jahova.debugBar.Log.TabLabel";
                                        os.Elements.DebugBarLogTabLabel.className = "ideSidebarTabTextFolderView textColorWhite";
                                        os.Elements.DebugBarLogTabLabel.innerHTML = "Logs";
                                        os.Elements.DebugBarLogTab.appendChild(os.Elements.DebugBarLogTabLabel);
                                        
                                        //Debug Bar Content Wrapper
                                        os.Elements.DebugBarLog = document.createElement("div");
                                        os.Elements.DebugBarLog.id = "com.jahova.debugBar.Log.Wrapper";
                                        os.Elements.DebugBarLog.className = "ideSidebarPageFolderView sidebarTabColor jahova_borRadL2 jahova_borRadB2 jahova_transWp5s";
                                        os.Elements.DebugBarLogTab.appendChild(os.Elements.DebugBarLog);
                                        
                                        //Debug Bar Content Header
                                        os.Elements.DebugBarLogHeader = document.createElement("div");
                                        os.Elements.DebugBarLogHeader.id = "com.jahova.debugBar.Log.Header";
                                        os.Elements.DebugBarLogHeader.className = "ideSidebarFolderHeader jahova_borRadT2 menuColor";
                                        os.Elements.DebugBarLog.appendChild(os.Elements.DebugBarLogHeader);
                                        
                                        //Debug Bar Content Header Label
                                        os.Elements.DebugBarLogHeaderLabel = document.createElement("div");
                                        os.Elements.DebugBarLogHeaderLabel.id = "com.jahova.debugBar.Log.Header.Label";
                                        os.Elements.DebugBarLogHeaderLabel.className = "ideSidebarFolderH3";
                                        os.Elements.DebugBarLogHeaderLabel.innerHTML = "JaHOVA Logs";
                                        os.Elements.DebugBarLogHeader.appendChild(os.Elements.DebugBarLogHeaderLabel);
                                        
                                        //Debug Bar Header Pin
                                        os.Elements.DebugBarLogHeaderPin = document.createElement("div");
                                        os.Elements.DebugBarLogHeaderPin.id = "com.jahova.debugBar.Log.Header.Pin";
                                        os.Elements.DebugBarLogHeaderPin.className = "ideSidebarPin";
                                        os.Elements.DebugBarLogHeaderPin.onclick = this.AnchorPage;
                                        os.Elements.DebugBarLogHeader.appendChild(os.Elements.DebugBarLogHeaderPin);
                                        
                                        //Debug Bar Icon
                                        os.Elements.DebugBarLogIconHeader = document.createElement("div");
                                        os.Elements.DebugBarLogIconHeader.id = "com.jahova.debugBar.Log.Icons";
                                        os.Elements.DebugBarLogIconHeader.className = "ideSidebarFolderIconHeader iconColor";
                                        os.Elements.DebugBarLog.appendChild(os.Elements.DebugBarLogIconHeader);
                                        
                                        //Debug Bar Content Area
                                        os.Elements.DebugBarLogContent = document.createElement("pre");
                                        os.Elements.DebugBarLogContent.id = "com.jahova.debugBar.Log.Content";
                                        os.Elements.DebugBarLogContent.className = "ideSidebarFolderContent jahova_borRadB2 viewContentBkgColor";
                                        os.Elements.DebugBarLog.appendChild(os.Elements.DebugBarLogContent);
                                        
                                        
                                        //***********************************
                                        //
                                        //  SETTINGS
                                        //
                                        //***********************************
                                        
                                        //Debug Bar Tab
                                        os.Elements.DebugBarSettingsTab = document.createElement("div");
                                        os.Elements.DebugBarSettingsTab.id = "com.jahova.debugBar.Settings.Tab";
                                        os.Elements.DebugBarSettingsTab.className = "ideSidebarTabFolderView jahova_borRadR2 sidebarTabColor";
                                        os.Elements.DebugBar.appendChild(os.Elements.DebugBarSettingsTab);
                                        
                                        //Debug Bar Tab Label
                                        os.Elements.DebugBarSettingsTabLabel = document.createElement("div");
                                        os.Elements.DebugBarSettingsTabLabel.id = "com.jahova.debugBar.Settings.TabLabel";
                                        os.Elements.DebugBarSettingsTabLabel.className = "ideSidebarTabTextFolderView textColorWhite";
                                        os.Elements.DebugBarSettingsTabLabel.innerHTML = "Settings";
                                        os.Elements.DebugBarSettingsTab.appendChild(os.Elements.DebugBarSettingsTabLabel);
                                        
                                        //Debug Bar Content Wrapper
                                        os.Elements.DebugBarSettings = document.createElement("div");
                                        os.Elements.DebugBarSettings.id = "com.jahova.debugBar.Settings.Wrapper";
                                        os.Elements.DebugBarSettings.className = "ideSidebarPageFolderView sidebarTabColor jahova_borRadL2 jahova_borRadB2 jahova_transWp5s";
                                        os.Elements.DebugBarSettingsTab.appendChild(os.Elements.DebugBarSettings);
                                        
                                        //Debug Bar Content Header
                                        os.Elements.DebugBarSettingsHeader = document.createElement("div");
                                        os.Elements.DebugBarSettingsHeader.id = "com.jahova.debugBar.Settings.Header";
                                        os.Elements.DebugBarSettingsHeader.className = "ideSidebarFolderHeader jahova_borRadT2 menuColor";
                                        os.Elements.DebugBarSettings.appendChild(os.Elements.DebugBarSettingsHeader);
                                        
                                        //Debug Bar Content Header Label
                                        os.Elements.DebugBarSettingsHeaderLabel = document.createElement("div");
                                        os.Elements.DebugBarSettingsHeaderLabel.id = "com.jahova.debugBar.Settings.Header.Label";
                                        os.Elements.DebugBarSettingsHeaderLabel.className = "ideSidebarFolderH3";
                                        os.Elements.DebugBarSettingsHeaderLabel.innerHTML = "JaHOVA Settings";
                                        os.Elements.DebugBarSettingsHeader.appendChild(os.Elements.DebugBarSettingsHeaderLabel);
                                        
                                        //Debug Bar Header Pin
                                        os.Elements.DebugBarSettingsHeaderPin = document.createElement("div");
                                        os.Elements.DebugBarSettingsHeaderPin.id = "com.jahova.debugBar.Settings.Header.Pin";
                                        os.Elements.DebugBarSettingsHeaderPin.className = "ideSidebarPin";
                                        os.Elements.DebugBarSettingsHeaderPin.onclick = this.AnchorPage;
                                        os.Elements.DebugBarSettingsHeader.appendChild(os.Elements.DebugBarSettingsHeaderPin);
                                        
                                        
                                        //Debug Bar Icon
                                        os.Elements.DebugBarSettingsIconHeader = document.createElement("div");
                                        os.Elements.DebugBarSettingsIconHeader.id = "com.jahova.debugBar.Settings.Icons";
                                        os.Elements.DebugBarSettingsIconHeader.className = "ideSidebarFolderIconHeader iconColor";
                                        os.Elements.DebugBarSettings.appendChild(os.Elements.DebugBarSettingsIconHeader);
                                        
                                        //Debug Bar Content Area
                                        os.Elements.DebugBarSettingsContent = document.createElement("div");
                                        os.Elements.DebugBarSettingsContent.id = "com.jahova.debugBar.Settings.Content";
                                        os.Elements.DebugBarSettingsContent.className = "ideSidebarFolderContent jahova_borRadB2 viewContentBkgColor";
                                        os.Elements.DebugBarSettings.appendChild(os.Elements.DebugBarSettingsContent);

                                    },
                                    
                                    //******************************************
                                    //
                                    //  SIDEBAR PIN FUNCTIONS
                                    //
                                    //******************************************
                                    AnchorPage: function(e){
                                        var identifier = "com.jahova.debugBar."
                                        var name = e.target.id;
                                        name = name.substring(identifier.length);
                                        name = name.substring(0, name.indexOf('.'));
                                        
                                        if(name.toUpperCase() == "CONSOLE"){
                                            os.debugbar.AnchorConsolePage(e);   
                                        }
                                        else if(name.toUpperCase() == "LOG"){
                                            os.debugbar.AnchorLogsPage(e);
                                        }
                                        else if(name.toUpperCase() == "SETTINGS"){
                                            os.debugbar.AnchorSettingsPage(e);
                                        }
                                        
                                    },
                                    AnchorConsole: function(){
                                        if(this.ConsolePagePinned == false){
                                            this.ConsolePagePinned = true;
                                            os.Elements.DebugBarConsole.className = "ideSidebarPageFolderViewPinned sidebarTabColor jahova_borRadL2 jahova_borRadB2";
                                            os.Elements.DebugBarConsole.style.width = "560px";
                                            os.Elements.DebugBarConsoleHeaderPin.className = "ideSidebarPinned";
                                            os.Elements.DebugBarConsoleHeaderLabel.className = "ideSidebarFolderH3Pinned";
                                            os.Elements.DebugBarConsoleContent.className = "ideSidebarFolderContentPinned jahova_borRadB2 viewContentBkgColor";
                                            os.Elements.DebugBarConsoleHeaderLabel.innerHTML = "Terminal Window";
                                        }
                                        else{
                                            os.Elements.DebugBarConsole.className = "ideSidebarPageFolderView sidebarTabColor jahova_borRadL2 jahova_borRadB2 jahova_transWp5s";
                                            os.Elements.DebugBarConsole.style.width = "";
                                            os.Elements.DebugBarConsoleHeaderPin.className = "ideSidebarPin";
                                            os.Elements.DebugBarConsoleHeaderLabel.className = "ideSidebarFolderH3";
                                            os.Elements.DebugBarConsoleContent.className = "ideSidebarFolderContent jahova_borRadB2 viewContentBkgColor";
                                            os.Elements.DebugBarConsoleHeaderLabel.innerHTML = "Terminal Window";
                                            this.ConsolePagePinned = false;
                                        }
                                        
                                        
                                    },
                                    AnchorSettings: function(){
                                        if(this.SettingsPagePinned == true){
                                            os.Elements.DebugBarSettings.className = "ideSidebarPageFolderView sidebarTabColor jahova_borRadL2 jahova_borRadB2 jahova_transWp5s";
                                            os.Elements.DebugBarSettingsHeaderPin.className = "ideSidebarPin";
                                            os.Elements.DebugBarSettingsHeaderLabel.className = "ideSidebarFolderH3";
                                            os.Elements.DebugBarSettingsContent.className = "ideSidebarFolderContent jahova_borRadB2 viewContentBkgColor";
                                            os.Elements.DebugBarSettingsHeaderLabel.innerHTML = "JaHOVA Settings";
                                            this.SettingsPagePinned = false;
                                        }
                                        else{
                                            os.Elements.DebugBarSettings.className = "ideSidebarPageFolderViewPinned sidebarTabColor jahova_borRadL2 jahova_borRadB2";
                                            os.Elements.DebugBarSettingsHeaderPin.className = "ideSidebarPinned";
                                            os.Elements.DebugBarSettingsHeaderLabel.className = "ideSidebarFolderH3Pinned";
                                            os.Elements.DebugBarSettingsContent.className = "ideSidebarFolderContentPinned jahova_borRadB2 viewContentBkgColor";
                                            os.Elements.DebugBarSettingsHeaderLabel.innerHTML = "JaHOVA Settings";
                                            this.SettingsPagePinned = true;
                                        }
                                    },
                                    AnchorConsolePage: function(e){
                                        
                                            //if(e.target.classList[0] == "ideSidebarPinned"){
                                            if(os.Elements.DebugBarConsoleHeaderPin.className == "ideSidebarPinned"){
                                                os.Elements.DebugBarConsole.className = "ideSidebarPageFolderView sidebarTabColor jahova_borRadL2 jahova_borRadB2 jahova_transWp5s";
                                                os.Elements.DebugBarConsole.style.width = "";
                                                os.Elements.DebugBarConsoleHeaderPin.className = "ideSidebarPin";
                                                os.Elements.DebugBarConsoleHeaderLabel.className = "ideSidebarFolderH3";
                                                os.Elements.DebugBarConsoleContent.className = "ideSidebarFolderContent jahova_borRadB2 viewContentBkgColor";
                                                os.Elements.DebugBarConsoleHeaderLabel.innerHTML = "Terminal Window";
                                                this.ConsolePagePinned = false;
                                            }
                                            else{
                                                os.Elements.DebugBarConsole.className = "ideSidebarPageFolderViewPinned sidebarTabColor jahova_borRadL2 jahova_borRadB2";
                                                os.Elements.DebugBarConsole.style.width = "560px";
                                                os.Elements.DebugBarConsoleHeaderPin.className = "ideSidebarPinned";
                                                os.Elements.DebugBarConsoleHeaderLabel.className = "ideSidebarFolderH3Pinned";
                                                os.Elements.DebugBarConsoleContent.className = "ideSidebarFolderContentPinned jahova_borRadB2 viewContentBkgColor";
                                                os.Elements.DebugBarConsoleHeaderLabel.innerHTML = "Terminal Window";
                                                this.ConsolePagePinned = true;
                                            }
                                    },
                                    AnchorLogsPage: function(e){
                                        
                                            if(e.target.classList[0] == "ideSidebarPinned"){
                                                os.Elements.DebugBarLog.className = "ideSidebarPageFolderView sidebarTabColor jahova_borRadL2 jahova_borRadB2 jahova_transWp5s";
                                                os.Elements.DebugBarLogHeaderPin.className = "ideSidebarPin";
                                                os.Elements.DebugBarLogHeaderLabel.className = "ideSidebarFolderH3";
                                                os.Elements.DebugBarLogContent.className = "ideSidebarFolderContent jahova_borRadB2 viewContentBkgColor";
                                                os.Elements.DebugBarLogHeaderLabel.innerHTML = "JaHOVA Logs";
                                                this.LogsPagePinned = false;
                                            }
                                            else{
                                                os.Elements.DebugBarLog.className = "ideSidebarPageFolderViewPinned sidebarTabColor jahova_borRadL2 jahova_borRadB2";
                                                os.Elements.DebugBarLogHeaderPin.className = "ideSidebarPinned";
                                                os.Elements.DebugBarLogHeaderLabel.className = "ideSidebarFolderH3Pinned";
                                                os.Elements.DebugBarLogContent.className = "ideSidebarFolderContentPinned jahova_borRadB2 viewContentBkgColor";
                                                os.Elements.DebugBarLogHeaderLabel.innerHTML = "JaHOVA Logs";
                                                this.LogsPagePinned = true;
                                            }
                                    },
                                    AnchorSettingsPage: function(e){
                                        
                                            if(e.target.classList[0] == "ideSidebarPinned"){
                                                os.Elements.DebugBarSettings.className = "ideSidebarPageFolderView sidebarTabColor jahova_borRadL2 jahova_borRadB2 jahova_transWp5s";
                                                os.Elements.DebugBarSettingsHeaderPin.className = "ideSidebarPin";
                                                os.Elements.DebugBarSettingsHeaderLabel.className = "ideSidebarFolderH3";
                                                os.Elements.DebugBarSettingsContent.className = "ideSidebarFolderContent jahova_borRadB2 viewContentBkgColor";
                                                os.Elements.DebugBarSettingsHeaderLabel.innerHTML = "JaHOVA Settings";
                                                this.SettingsPagePinned = false;
                                            }
                                            else{
                                                os.Elements.DebugBarSettings.className = "ideSidebarPageFolderViewPinned sidebarTabColor jahova_borRadL2 jahova_borRadB2";
                                                os.Elements.DebugBarSettingsHeaderPin.className = "ideSidebarPinned";
                                                os.Elements.DebugBarSettingsHeaderLabel.className = "ideSidebarFolderH3Pinned";
                                                os.Elements.DebugBarSettingsContent.className = "ideSidebarFolderContentPinned jahova_borRadB2 viewContentBkgColor";
                                                os.Elements.DebugBarSettingsHeaderLabel.innerHTML = "JaHOVA Settings";
                                                this.SettingsPagePinned = true;
                                            }
                                    },
                                    
                                    EvaluateShortCuts:function(e){
                                        var keyCode = e.keyCode ? e.keyCode : e.charCode;
                                        
                                        //Ctrl Key
                                        // Short Cuts
                                        if(e.ctrlKey){
                                            //~ ` key - Hide/Show Debug Bar
                                            if (keyCode == 192)
                                            {
                                                if(os.debugbar.GetStatus()){
                                                    //Disable Debug Bar
                                                    os.debugbar.Disable();
                                                }
                                                else{
                                                    //Enable Debug Bar
                                                    os.debugbar.Enable();
                                                }
                                            }
                                        }
                                    }
                                    

                                }
                            }
                            
                            return {
                                //OBJECT ACCESSOR
                                Instance: function()
                                {
                                    if(!pInstance)
                                    {
                                        //Instantiate if pInstance does not exist
                                        pInstance = constructor();
                                    }
                                    
                                    return pInstance;
                                }
                            }
                        })();
//JaHOVA OS : Kernel
//      Dependent on JaHOVA OS

/**h* OS/Kernel
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p>
*
*  NAME
*    JaHOVA OS Kernel
*    
*  AUTHOR
*   Corey Clark
*   cclark@coreyclarkphd.com
*
*  HISTORY
*   Created: 4/14/2011
*   
*
*  DESCRIPTION
*     This Singleton is a wrapper for all of the Kernel Objects/Modules:
*     Command
*     Resource and Scheduler
*     Instruction
*     
*
*  EXAMPLE
*   kernel = com.jahova.os.Instance().Kernel.Instance()
*   
**/

com.jahova.os.Instance().Kernel = (function()
                        {
                            var pInstance;
                            
                            /**m* Kernel/Constructor
                             *
                             *  SOURCE
                             */
                            function constructor()
                            {
                                //******************
                                //PRIVATE ATTRIBUTES
                                //******************
                                
                                
                                //DEFINES
                                var NAME = "JaHOVA OS Kernel";
                                var VERSION = "0v3";
                                var PATH = "scripts/jahova/OS/Kernel/jahova.os.kernel.js";
                                
                                //MODULE POINTERS
                                var os = com.jahova.os.Instance();
                                var kernel = null;
                                
                                var utilities = null;
                                var console = null;
                            /*
                             **/
                                //******************
                                //PRIVATE METHODS
                                //******************
                                
                                
                                //******************
                                //PRIVATE OBJECTS
                                //******************
                                
                                
                                //******************
                                //INITALIZATION
                                //******************
                                
                               
                                
                                return{
                                    //PUBLIC ATTRIBUTES
                                    
                                    //PUBLIC PRIVILEDGE METHODS
                                    
                                    GetName: function()
                                    {
                                        return NAME;
                                    },
                                    
                                    GetVersion: function()
                                    {
                                        return VERSION;
                                    },
                                    
                                    GetPath: function()
                                    {
                                        return PATH;
                                    },
                                    
                                    Initialize: function()
                                    {
                                        //Initialize Module Pointers
                                        kernel = os.Kernel.Instance();
                                        utilities = com.jahova.utilities.Instance();
                                        console = utilities.Console.Instance();
                                        debug = utilities.DebugBar.Instance();
                                        
                                         //Set up HTML Elements                             
                                        if(document.getElementById("com.jahova"))
                                        {
                                            os.Elements.JaHOVA = document.getElementById("com.jahova");
                                            os.Elements.JaHOVA.className = "mainContent appBaseColor";
                                        }
                                        else
                                        {
                                            //os.Elements.JaHOVA = document.createElement("div");
                                            //os.Elements.JaHOVA.id = "com.jahova";
                                            //os.Elements.JaHOVA.className = "mainContent appBaseColor";
                                            //os.Elements.Com.appendChild(os.Elements.JaHOVA);
                                        }
                                        
                                    },
                                    /*
                                    **/
                                    //PUBLIC OBJECTS
                                    Command: null,
                                    ResSchMgr: null,
                                    Instruction: null
                                }
                            }
                            
                            return {
                                //OBJECT ACCESSOR
                                Instance: function()
                                {
                                    if(!pInstance)
                                    {
                                        //Instantiate if pInstance does not exist
                                        pInstance = constructor();
                                    }
                                    
                                    return pInstance;
                                }
                            }
                        })();
//JaHOVA OS : Kernel : Command
//      Dependent on JaHOVA OS : Kernel

/**h* Kernel/Command
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p>
*
*  NAME
*    JaHOVA OS Kernel Command Module
*    
*  AUTHOR
*   Corey Clark
*   cclark@coreyclarkphd.com
*
*  HISTORY
*   Created: 4/14/2011
*   
*
*  DESCRIPTION
*     This singleton holds the Kernels Command Module
*     
*
*  EXAMPLE
*
*   command = com.jahova.os.Instance().Kernel.Instance().Command.Instance();
*   command = os.command;
**/
com.jahova.os.Instance().Kernel.Instance().Command = (function()
                        {
                            var pInstance;
                            /**m* Command/Constructor
                             *
                             *  SOURCE
                             */
                            function constructor()
                            {
                                //PRIVATE ATTRIBUTES
                                var NAME = "JaHOVA OS Kernel : Command Module";
                                var VERSION = "0v3";
                                var PATH = "scripts/jahova/OS/Kernel/jahova.os.kernel.command.js";
                                
                                var os = com.jahova.os.Instance();
                                var console = com.jahova.utilities.Instance().Console.Instance();
                             /*
                              **/
                                //PRIVATE METHODS
                                
                                
                                //INITIALIZATION

                                
                                return{
                                    //PUBLIC ATTRIBUTES
                                    /**o* Command/Core
                                    *   DESCRIPTION
                                    *       This holds a pointer to the Core object
                                    *       created by the Resource and Schedule Core Manager
                                    *       This allows for callbacks and OS Messages to reach the command Module
                                    *  SOURCE
                                    */
                                    Core: null,
                                    /*
                                     **/
                                    //PUBLIC PRIVILEDGE METHODS
                                    /**m* Command/GetName
                                    *
                                    *  SOURCE
                                    */
                                    GetName: function(){
                                        return NAME;
                                    },
                                    /*
                                     **/
                                    /**m* Command/GetVersion
                                    *
                                    *  SOURCE
                                    */
                                    GetVersion: function(){
                                        return VERSION;
                                    },
                                    /*
                                     **/
                                    /**m* Command/GetPath
                                    *
                                    *  SOURCE
                                    */
                                    GetPath: function(){
                                        return PATH;
                                    },
                                    /*
                                     **/
                                    /**m* Command/Interface
                                    *   DESCRIPTION
                                    *   This object will hold a pointer to all interface methods
                                    *   that are accessible to users for the OS
                                    *  SOURCE
                                    */
                                    Interface: null,
                                    /*
                                     **/
                                    /**m* Command/Initialize
                                    *
                                    *  SOURCE
                                    */
                                    Initialize: function(){
                                        os.console.AppendComment("Initializing Command Module\n");
                                    
                                        os.command.Interface = os.resschmgr.Create.Map();
                                        
                                        //Register with Resource and Schedule Manager
                                        var id = os.resschmgr.CoreManager.RegisterResource("com.jahova.os.kernel.command", os.command.GetPath(), false);
                                        
                                        //Get pointer to Core Object
                                        os.command.Core = os.resschmgr.CoreManager.GetCoreByID(id);
                                        
                                        os.command.Core.OnRequest = os.command.OnRequest;
                                        
                                        //Activate Module with Resource and Schedule Module
                                        os.resschmgr.CoreManager.ActivateResource(id);
                                        
                                        //Load Interface Methods
                                        os.command.Interface.put("GetResources", os.command.GetResources);
                                        os.command.Interface.put("Display", os.command.Display);
                                        
                                    },
                                    /*
                                     **/
                                    /**m* Command/OnRequest
                                    *
                                    *  SOURCE
                                    */
                                    OnRequest:function(input){
                                        var request = input.jahovaos;
                                        var numOfRequest = request.length;
                                        
                                        //Loop through sending all request received
                                        for(var i = 0; i < numOfRequest; i++)
                                        {
                                            
                                            if(request[i].InterfaceName != null){//Try Call by interface name 
                                                (os.command.Interface.get(request[i].InterfaceName))(request[i]);
                                            }
                                            else{//Try call by Interface ID
                                                (os.command.Interface.get(request[i].InterfaceID))(request[i]);
                                            }
                                            
                                        }
                                    },
                                    /*
                                     **/
                                    //
                                    //  Interface Methods
                                    //
                                    /**m* Command/Display
                                    *   DESCRIPTION
                                    *       Interface Method that will Display a JaHOVA Instruction
                                    *       to Console
                                    *  SOURCE
                                    */
                                    Display: function(request){
                                        var time = (new Date()).getTime();
    
                                        console.AppendComment("Kernel::Command Module:: Request Received");
                                        console.AppendComment("Current Time: " + time);
                                        console.AppendComment("Transit Time: " + (time - request.SendTime) + "ms");
                                        console.AppendComment("     Sender ID:       " + request.SenderID);
                                        console.AppendComment("     Receiver ID:     " + request.ReceiverID);
                                        console.AppendComment("     Data:         "    + request.Data);
                                        console.AppendComment("     Priority:        " + request.Priority);
                                        console.AppendComment("     Interface ID:    " + request.InterfaceID);
                                        console.AppendComment("     Interface Name:  " + request.InterfaceName);
                                        console.AppendComment("     Send Time:       " + request.SendTime);
                                        console.AppendComment("     Delivery Time:   " + request.DeliveryTime);
                                        console.AppendComment("     Call Back Func:  " + request.CallBackFunction);
                                        console.AppendComment("     Call Back ID:    " + request.CallBackInterfaceID);
                                    
                                        console.Comment("");
                                    },
                                    /*
                                     **/
                                    /**m* Command/GetResources
                                    *   DESCRIPTION
                                    *       Interface Method that will responds with a
                                    *       JaHOVA Instrution holding all currently registered
                                    *       Resources in a single obect in the following form:
                                    *       { id, name, path }
                                    *  SOURCE
                                    */
                                    GetResources: function(request){
                                        //console.Comment("Command::GetResources");
                                        var res = os.resschmgr.CoreManager.GetAllResources();
                                        var data = [];
                                        var numOfResources = res.length;
                                        
                                        for(var i = 0; i < numOfResources; i++){
                                            data.push({"id": res[i].GetID(), "name": res[i].name, "path" : res[i].path})
                                        }
                                            
                                        //Get current time
                                        var time = (new Date()).getTime();
                                        
                                        //Create A New Instruction
                                        var response = os.resschmgr.Create.Instruction();
                                        
                                        //Set Instruction Values
                                        response.SenderID               = os.command.Core.GetID();      //Resource ID requesting execution
                                        response.ReceiverID             = request.SenderID;             //Resource ID or resource to be executed
                                        response.Data                   = data;                         //Data, input parameters, arguments to be used by interface
                                        response.Priority               = request.Priority;             //Priority level of request, only used if allowed
                                        response.InterfaceID            = request.CallBackInterfaceID;  //ID of interface method being requested
                                        response.InterfaceName          = request.CallBackFunction;     //Name of interface method being requested
                                        response.SendTime               = time;                         //Time of request
                                        response.DeliveryTime           = time;                         //Time of Interpreter calling interface
                                        response.CallBackInterfaceID    = request.CallBackInterfaceID;  //Call Back Interface ID, allows external cores to associate a call back function
                                        
                                        var output = [];
                                        output.push(response);
                                        
                                        //Send Response
                                        var core = os.resschmgr.CoreManager.GetCoreByID(response.ReceiverID)
                                        var EventObject = os.resschmgr.EventManager.GetEventObjectByName(core.name);
                                        var onRequestEvent = EventObject.GetEventsByName("onRequest")[0];
                                        os.command.Core.SendRequest.apply(onRequestEvent, [output]);
                                    }
                                    /*
                                     **/
                                }
                            }
                            
                            return {
                                //OBJECT ACCESSOR
                                Instance: function()
                                {
                                    if(!pInstance)
                                    {
                                        //Instantiate if pInstance does not exist
                                        pInstance = constructor();
                                    }
                                    
                                    return pInstance;
                                }
                            }
                        })();
//JaHOVA OS : Kernel : Resource and Schedule Manager
//      Dependent on JaHOVA OS : Kernel

/**h* Kernel/ResSchMgr
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p>
*
*  NAME
*    JaHOVA OS Kernel Resource and Schedule Manager Module
*    
*  AUTHOR
*   Corey Clark
*   cclark@coreyclarkphd.com
*
*  HISTORY
*   Created: 4/14/2011
*   
*
*  DESCRIPTION
*     This singleton holds the Kernel Resource and Schedule Manager Module.
*     
*
*  EXAMPLE
*   resschmgr = com.jahova.os.Instance().Kernel.Instance().ResSchMgr.Instance();
*   
**/



com.jahova.os.Instance().Kernel.Instance().ResSchMgr = (function()
                        {
                            
                            var pInstance;
                           
                           
                            function constructor()
                            {
                                //******************
                                //PRIVATE ATTRIBUTES
                                //******************
                                
                                var NAME = "JaHOVA OS Kernel : Resource and Schedule Manager Module";
                                var VERSION = "0v5";
                                var PATH = "scripts/jahova/OS/Kernel/jahova.os.kernel.resschmgr.js";
                                var ID = null;
                                
                                var os = com.jahova.os.Instance();
                                var utilities = com.jahova.utilities.Instance();
                            
                                
                                //******************
                                //PRIVATE METHODS
                                //******************
                                
                                
                                //******************
                                // PRIVATE CLASSES
                                //******************
                                
                                var CXHRObject = function(){
                                    var xhrObj = false;

                                    try {
                                        xhrObj = new XMLHttpRequest();
                                    }
                                    catch (e) {
                                        var progid = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
                                        for (var i = 0; i < progid.length; ++i) {
                                            try {
                                                xhrObj = new ActiveXObject(progid[i]);
                                            }
                                            catch (e) {
                                                continue;
                                            }
                                            break;
                                        }
                                    }
                        
                                    finally {
                                        return xhrObj;
                                    }
                                };
                                
                                var CCore = function(id){
                                    //Private Members
                                    var _id = id;
                                    var _state
                                    
                                    //Public Members
                                    
                                    //OS Pointers
                                    this.os = com.jahova.os.Instance();
                                    this.utilities = com.jahova.utilities.Instance();
                                    
                                    
                                    this.name = null;       //User Defined Name
                                    this.osName = null;     //OS Defined Name
                                    this.path = null;       //url path to core code
                                    this.threadSafe = null; //bool : can core be run as a thread
                                    
                                    //Method Pointers
                                    this.SendRequest = null;    // Pointer to Instruction Module
                                    this.Dispatcher = null;     // Pointer to Event->Dispatch
                                    this.OnRequest = null;      // Instruction Request Handler
                                    
                                    //Map Containg Pointers to Core Interface Methods
                                    this.Interface = this.os.resschmgr.Create.Map();
                                    
                                    //Accesors and Mutators
                                    this.SetID = function(id)
                                    {
                                        _id = id;
                                    }
                                    
                                    this.GetID = function()
                                    {
                                        return _id;
                                    }
                                    
                                    this.SetState = function(state)
                                    {
                                        _state = state;
                                    }
                                    
                                    this.GetState = function()
                                    {
                                        return _state;
                                    }
                                };
                                
                                
                                var CEvent = function(id, target, name, eventType, custom, can_bubble, cancelable){
                                    //OS Pointers
                                    this.os = com.jahova.os.Instance();
                                    this.utilities = com.jahova.utilities.Instance();
                                    this.scope = this;
                                    
                                    this.id = id;
                                    this.target = target;               // Event Object, this event belongs too
                                    this.name = name;                   //click, mouseover, com_jahova, etc
                                    this.eventType = eventType;         //HTMLEvent, MouseEvent, KeyboardEvent, etc
                                    this.custom = custom;               //true or false
                                    this.can_bubble = false;
                                    this.cancelable = false;
                                    this.event;                         //event DOM object
                                    this.nextID = 0;                    //ID supplied to Subscribers
                                    
                                    this.Subscribers =  this.os.resschmgr.Create.Map();      //Map containing Subscribers   
                                    this.Name2ID = this.os.resschmgr.Create.Map();           //Map containing Subscribers Name as Key and ID as value
                                    //Test for custom or default event
                                    if(this.custom)
                                    {
                                        //Custom Event Type - Use click event
                                        if(document.createEvent) //gecko, safari
                                        {   
                                            //Creating a message event for worker
                                            if(window.Worker && (this.target instanceof Worker))
                                            {
                                                this.event = document.createEvent("MessageEvent");
                                            }
                                            else //if(/Konqueror|Safari|KHTML/.test(navigator.userAgent))
                                            {
                                                this.event = document.createEvent("MouseEvents");
                                                this.event.initMouseEvent("click", false, true, window, 0,0,0,0,0,false, false, false, false, 0, null);
                                            }
                                        }
                                        else //msie
                                        {
                                            if(this.target.constructor != Worker)
                                            {
                                                this.event = document.createEventObject();    
                                            }
                                            else{
                                                //Error worker not supported in IE
                                            }    
                                        }
                                    }
                                    else  //Not a custom event, standard event 
                                    {
                                        if(document.createEvent) //gecko, safari
                                        {
                                            
                                            if(/Konqueror|Safari|KHTML/.test(navigator.userAgent))
                                            {
                                                this.event = document.createEvent(this.eventType);   
                                                this.event.initEvent(this.name, this.can_bubble, this.cancelable);
                                            }
                                            else //gecko MouseEvents
                                            {
                                                this.event = document.createEvent(this.eventType);
                                //
                                //Need to have a look up technique
                                //  to find the proper init Method
                                //  based on the event type.
                                //
                                                this.event.initMouseEvent(this.name, this.can_bubble, this.cancelable, window, 0,0,0,0,0,false, false, false, false, 0, null);
                                            }
                                        }
                                        else //msie
                                        {
                                            this.event = document.createEventObject();    
                                        }
                                    }

                                    
                                };
                                CEvent.prototype.Subscribe = function(name, eventName, callback, capture){
                                    //Create a subscriber and push to Q
                                    this.nextID++;  //Get next ID
                                    var id = this.nextID; 
                                    var sub = new this.os.resschmgr.Create.Subscriber(name, id, eventName, callback, capture);
                                    this.Subscribers.put(id,sub);
                                    this.Name2ID.put(name,id);
                                    
                                    //Attach event to target
                                    if(this.custom)
                                    {
                                        if(window.Worker && ( this.target instanceof Worker))
                                        {
                                            if(this.target.attachEvent != undefined)
                                            {
                                                this.target.attachEvent("onmessage", callback);
                                            }
                                            else
                                            {
                                                this.target.addEventListener("message", callback, capture);    
                                            }                
                                        }
                                        else
                                        {
                                            if(this.target.attachEvent != undefined)
                                            {
                                                this.target.attachEvent("onclick", callback);
                                            }
                                            else
                                            {
                                                this.target.addEventListener("click", callback, capture);    
                                            } 
                                        } 
                                    }
                                    else
                                    {
                                        if(this.target.attachEvent != undefined)
                                        {
                                            //IE
                                            this.target.attachEvent("on" + this.name, callback);
                                        }
                                        else
                                        {
                                            //Everyone else
                                            this.target.addEventListener(this.name, callback, capture);    
                                        }   
                                    }
                                     
                                     return sub;    
                                }
                                
                                CEvent.prototype.Unsubscribe = function(subID){
                                    //Get subscriber
                                    var sub  = this.Subscribers.get(subID);
                                    
                                    if(this.custom)
                                    {
                                        //Remove Listener from target
                                        if(this.target.detachEvent != undefined)
                                        {
                                            //IE
                                            this.target.detachEvent("onclick", sub.callback);
                                        }
                                        else
                                        {
                                            //Everyone else
                                            this.target.removeEventListener("click", sub.callback, false);    
                                        }  
                                        
                                    }
                                    else
                                    {
                                        if(this.target.detachEvent != undefined)
                                        {
                                            //IE
                                            this.target.detachEvent("on" + this.name, sub.callback);
                                        }
                                        else
                                        {
                                            //Everyone else
                                            this.target.removeEventListener(this.name, sub.callback, sub.capture);    
                                        }   
                                        
                                    }
                                    
                                    //Remove Subscriber from Maps
                                    Name2ID.remove(sub.name);
                                    Subscribers.remove(subID);
                                     
                                }
                                
                                CEvent.prototype.RemoveAllSubscribers = function(){
                                    
                                    for(var i = 0; i++ < this.Subscribers.size; this.Subscribers.next())
                                    {
                                        this.Unsubscribe(Subscribers.value().id);
                                    }

                                }
                                
                                CEvent.prototype.Dispatch = function(data){
                                        if(this.custom)
                                        {
                                            //For custom event add data to event object
                                            this.event.jahovaos = data;
                                            
                                            if(document.createEvent)
                                            {
                                                if(window.Worker && (this.target instanceof Worker))
                                                {
                                                    return this.target.postMessage(data);
                                                }
                                                else
                                                {
                                                    return this.target.dispatchEvent(this.event);
                                                }
                                            }
                                            else
                                            {
                                                return this.target.fireEvent('onclick', this.event);    
                                            }   
                                        }
                                        else
                                        {
                                            if(document.createEvent)
                                            {
                                                return this.target.dispatchEvent(this.event);
                                            }
                                            else
                                            {
                                                return this.target.fireEvent('on'+this.name, this.event);    
                                            }   
                                            
                                        }
                                };
                                
                                CEvent.prototype.GetSubscriberByID = function(id){
                                    return this.Subscribers.get(id);
                                }
                                
                                CEvent.prototype.GetSubscribersByName = function(name){
                                    var output = false;
    
                                    for(var i = 0; i++ < this.Subscribers.size; this.Subscribers.next())
                                    {
                                        if(this.Subscribers.value().name == name)
                                        {
                                            if(!output)
                                            {
                                                output = [];
                                            }
                                            
                                            output.push(this.Subscribers.value());
                                        }
                                    }
                                    return output;
                                }
                                
                                CEvent.prototype.GetSubscriberID = function(name){
                                    return this.Subscribers.get(this.Name2ID.get(name));
                                }
                                
                                var CEventObject = function(id, name, custom, targetID){
                                    //OS Pointers
                                    this.os = com.jahova.os.Instance();
                                    this.utilities = com.jahova.utilities.Instance();
                                    
                                    this.id = id;
                                    this.name = name;
                                    this.target;
                                    this.targetID = targetID;
                                    this.custom = custom;
                                    this.nextID = 0;
                                     
                                    this.PublishedEvents = this.os.resschmgr.Create.Map();
                                    this.Name2ID = this.os.resschmgr.Create.Map();
                                    
                                    if(this.custom)
                                    {
                                        //Test to see if target ID is non numeric
                                        //  If so then creating a thread and ID is path
                                        if(isNaN(this.targetID))
                                        {
                                            this.target = new Worker(this.targetID);

                                        }
                                        else
                                        {
                                            this.target  = document.createElement("a");
                                            this.target.name = this.name;
                                            this.target.id = this.targetID;
                                            document.body.appendChild(this.target);
                                        }
                                        
                                    }
                                    else
                                    {
                                        this.target = document.getElementById(this.targetID);
                                    }
                                    
                                };
                                
                                CEventObject.prototype.PublishEvent = function(name, eventType, can_bubble, cancelable){
                                    //Create an Event 
                                    this.nextID++;
                                    var id = this.nextID;
                                    var event = this.os.resschmgr.Create.Event(id, this.target, name, eventType, this.custom, can_bubble, cancelable);
                                    
                                    //Add Event to PublishedEvents and Name2ID Maps
                                    this.PublishedEvents.put(id,event);
                                    this.Name2ID.put(name,id);
                                    return event;
                                };
                                
                                CEventObject.prototype.UnpublishEvent = function(id){
                                    //Get Event
                                    var event = this.PublishedEvents.get(id);
                                    
                                    //Remove all subscribers of event
                                    event.RemoveAllSubscribers();
                                    
                                    //Remove event from the PublishedEvent Name2ID Maps
                                    this.Name2ID.remove(event.name);
                                    this.PublishedEvents.remove(id);
                                    
                                }
                                
                                CEventObject.prototype.UnpublishAllEvents = function(){
                                    
                                    for(var i = 0; i++ < this.PublishedEvents.size; this.PublishedEvents.next())
                                    {
                                        var event = this.PublishedEvents.value();
                                        
                                        event.RemoveAllSubscribers();
                                    }
                                    
                                }
                                
                                CEventObject.prototype.GetEventByID = function(id){
                                    return this.PublishedEvents.get(id);
                                }
                               
                                CEventObject.prototype.GetEventsByName = function(name){
                                    var output = false;
    
                                    for(var i = 0; i++ < this.PublishedEvents.size; this.PublishedEvents.next())
                                    {
                                        if(this.PublishedEvents.value().name == name)
                                        {
                                            if(!output)
                                            {
                                                output = [];
                                            }
                                            
                                            output.push(this.PublishedEvents.value());
                                        }
                                    }
                                    return output;
                                }
                                
                                CEventObject.prototype.GetEventID = function(name){
                                    return this.PublishedEvents.get(this.Name2ID.get(name));
                                }
                                
                                var CSubscriber = function(name, id, eventName, callback, capture){
                                    this.name = name;
                                    this.id = id;
                                    this.eventName = eventName;
                                    this.callback = callback;
                                    this.capture = capture;
                                };
                                
                                var CInstruction = function(){
                                    this.SenderID = null;              //Resource ID requesting execution
                                    this.ReceiverID = null;            //Resource ID or resource to be executed
                                    this.Data = null;                  //Data, input parameters, arguments to be used by interface
                                    this.Priority = null;              //Priority level of request, only used if allowed
                                    this.InterfaceID = null;           //ID of interface method being requested
                                    this.InterfaceName = null;         //Name of interface method being requested
                                    this.SendTime = null;              //Time of request
                                    this.DeliveryTime = null;          //Time of Interpreter calling interface
                                    this.CallBackFunction = null;      //CallBack Function, only allowed for internal OS cores
                                    this.CallBackInterfaceID = null;   //Call Back Interface ID, allows external cores to associate a call back function
                                };
                                
                                var CCommand = function(name, callback, scope, help){
                                    this.name = name;
                                    this.callback = callback;
                                    this.scope = scope;
                                    this.help = help;
                                }
                                
                                CCommand.prototype.Execute = function(){
                                    this.callback.apply(this.scope, arguments)
                                }
                                
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
                                
                                var CQueue = function(){
                                     this.q = [];
                                };
                                
                                CQueue.prototype.push = function(obj){          //Adds obj to end of queue
                                    this.q.push(obj);   
                                }
                                
                                CQueue.prototype.pop = function(){              //Returns the object from beginning of queue
                                     return this.q.splice(0,1);
                                    
                                }
                                
                                CQueue.prototype.push_front = function(obj){    //Inserts item at beginning of queue (acts as stack)
                                    this.q.unshift(obj);
                                    
                                }
                                
                                CQueue.prototype.push_back = function(obj){     //Inserts item at end of queue
                                    
                                    this.q.push(obj);
                                }
                                
                                CQueue.prototype.pop_front = function(){        //Returns the item at beginning of queue
                                    return this.q.splice(0,1);
                                    
                                }
                                
                                CQueue.prototype.pop_back = function(){         //Returns the item at end of queue (acts as stack)
                                    return this.q.pop();
                                }
                                
                                CQueue.prototype.length = function(){           //Returns queue length
                                    return this.q.length;
                                }
                                
                                CQueue.prototype.toString = function(){         //Returns q as a string
                                    
                                    return this.q.toString();
                                }
                                
                                CQueue.prototype.at = function(index){          //Returns the value at respected index
                                    return this.q[index];
                                }
                               
                                CQueue.prototype.set = function(index, obj){    //Set object at given index
                                    this.q[index] = obj;
                                }
                                
                                CQueue.prototype.find = function(searchStr){    //Returns array of indexs of searchStr (or regex) found in array, or false if not found
                                    var returnArray = false;
                                    for (var i=0; i< this.q.length; i++)
                                    {
                                        if (typeof(searchStr) == 'function')
                                        {
                                            if (searchStr.test(this.q[i]))
                                            {
                                                if (!returnArray)
                                                {
                                                    returnArray = []
                                                }
                                            
                                                returnArray.push(i);
                                            }
                                        }
                                        else
                                        {
                                            if (this.q[i]===searchStr)
                                            {
                                                if (!returnArray)
                                                {
                                                    returnArray = []
                                                }
                                                returnArray.push(i);
                                            }
                                        }
                                    }
                                    
                                    return returnArray;
                                    
                                }
                                
                                CQueue.prototype.remove = function(index){      //Removes value at index
                                    this.q.splice(index,1);
                                }                                    
                                
                                
                                var CWindow = function(uID,uName, uWidth, uHeight, uTop, uLeft){
                                    var ID = uID
                                    var NAME = uName;
                                    
                                    var _onclose = function(e){
                                        
                                        if(this.onclose != null){
                                            this.onclose.apply(this.onclosescope, [e]);
                                        }
                                        
                                        os.resschmgr.WindowManager.Windows.remove(ID);
                                        document.body.removeChild(this.Elements.Window);
                                    }.bind(this);
                                    
                                    var _onmin = function(e){
                                        
                                        if(this.onmin != null){
                                            this.onmin.apply(this.onminscope, [e]);
                                        }
                                        
                                        if(!this.isMinimized){
                                            this.Elements.Body.style.display = "none";
                                            this.Elements.Status.style.display = "none";
                                            this.Elements.Menu.style.display = "none";
                                            this.Elements.HeaderButtons.style.display = "none";
                                            //this.Elements.HeaderText.style.textAlign = "left";
                                            this.Elements.Header.style.overflow = "hidden";
                                            this.Elements.Header.style.resize = "none";
                                            this.Elements.Header.style.width = "100%";
                                            this.Elements.Header.style.height = "100%";
                                            this.Elements.Header.style.borderTopLeftRadius = "0px";
                                            this.Elements.Header.style.borderTopRightRadius = "0px";
                                            
                                            this.left = this.Elements.Window.style.left;
                                            this.top = this.Elements.Window.style.top;
                                            
                                            this.Elements.Window.className = "";
                                            this.Elements.Window.style.height = "25px";
                                            this.Elements.Window.style.width = "150px";
                                            this.Elements.Window.style.top = "";
                                            this.Elements.Window.style.left  ="";
                                            this.Elements.Window.style.borderRight = "1px solid black";
                                            this.Elements.Window.style.position = "relative";
                                            this.Elements.Window.style.float = "left";
                                            this.Elements.Window.style.cssFloat = "left";
                                            this.Elements.Window.style.display = "inline-block";
                                            //this.Elements.Window.style.borderRadius = "0px";
                                            
                                            //if(os.Elements.Dock){
                                            if(os.windows.Desktop.Get.state.desktop() == "VISIBLE"){
                                                os.windows.Desktop.Elements.dock.AppendChild(this.Elements.Window);
                                                //os.Elements.Dock.appendChild(this.Elements.Window);
                                                this.Elements.Header.onclick = _onmin;
                                            }
                                            this.isMinimized = true;
                                            e.stopPropagation();
                                        }
                                        else{
                                            
                                            this.Elements.Body.setAttribute("style","");
                                            this.Elements.Status.setAttribute("style","");
                                            this.Elements.Menu.setAttribute("style","");
                                            this.Elements.HeaderButtons.setAttribute("style","");
                                            this.Elements.Header.setAttribute("style","");
                                            
                                            this.Elements.Window.style.position = "absolute";
                                            this.Elements.Window.style.width = this.width + "px";
                                            this.Elements.Window.style.height = this.height + "px";
                                            this.Elements.Window.style.top = this.top;
                                            this.Elements.Window.style.left = this.left;
                                            this.Elements.Window.className = "outputWindow";
                                            
                                            document.body.appendChild(this.Elements.Window);
                                            this.Elements.Header.onclick = "";
                                            
                                            this.isMinimized = false;
                                            e.stopPropagation();
                                        }
                                        
                                        
                                    }.bind(this);
                                    
                                    var _onmax = function(e){
                                        
                                        if(this.onmax != null){
                                            this.onmax.apply(this.onmaxscope, [e]);
                                        }
                                        
                                        if(!this.isMaximized){
                                            this.isMaximized = true;
                                            this.left = this.Elements.Window.style.left;
                                            this.top = this.Elements.Window.style.top;
                                            this.Elements.Window.style.width =   "100%";
                                            this.Elements.Window.style.height =   (window.innerHeight - 46) + "px";
                                            this.Elements.Window.style.top = "20px";
                                            this.Elements.Window.style.left  = "0px";
                                            this.Elements.Window.style.border = "none";
                                            this.makeActive();
                                            e.stopPropagation();
                                        }
                                        else{
                                            this.isMaximized = false;
                                            this.Elements.Window.style.width = this.width + "px";
                                            this.Elements.Window.style.height = this.height + "px";
                                            this.Elements.Window.style.top = this.top;
                                            this.Elements.Window.style.left = this.left;
                                            this.Elements.Window.style.borderRight = "";
                                            this.Elements.Status.setAttribute("style","");
                                            e.stopPropagation();
                                        }
                                    }.bind(this);
                     
                                    this.makeActive = function(e){
                                        if(os.resschmgr.WindowManager.ActiveWindow){
                                            os.resschmgr.WindowManager.ActiveWindow.Elements.Header.onmousedown = os.resschmgr.WindowManager.ActiveWindow.BeginDrag;
                                            os.resschmgr.WindowManager.ActiveWindow.Elements.Window.onclick = os.resschmgr.WindowManager.ActiveWindow.makeActive;
                                            os.resschmgr.WindowManager.ActiveWindow.Elements.Window.style.zIndex = 20;
                                            os.resschmgr.WindowManager.ActiveWindow.Elements.StatusText.innerHTML = "Status: Inactive";
                                            os.resschmgr.WindowManager.ActiveWindow.Elements.Menu.style.display = "none";
                                        }
                                        
                                        this.Elements.Header.onmousedown = this.BeginDrag;
                                        this.Elements.Window.onclick = "";
                                        this.Elements.Window.style.zIndex = 25;
                                        this.Elements.StatusText.innerHTML = "Status: Active";
                                        this.Elements.Menu.setAttribute("style","");
                                        os.resschmgr.WindowManager.ActiveWindow = this;
                                    }.bind(this);
                                    
                                    this.width = uWidth;
                                    this.height = uHeight;
                                    this.top = uTop;
                                    this.left = uLeft;
                                    
                                    this.startX = null;
                                    this.startY = null;
                                    this.startLeft = null;
                                    this.startTop = null;
                                    
                                    this.onclose = null;
                                    this.onmin = null;
                                    this.onmax = null;
                                    this.onfocus = null;
                                    
                                    this.onclosescope = null;
                                    this.onminscope = null;
                                    this.onmaxscope = null;
                                    this.onfocusscope = null;
                                    
                                    this.isMinimized = false;
                                    this.isMaximized = false;
                                    this.Elements = {
                                        Window: document.createElement("div"),
                                        Header: document.createElement("div"),
                                        HeaderText: document.createElement("div"),
                                        HeaderButtons: document.createElement("div"),
                                        Close: document.createElement("div"),
                                        Min: document.createElement("div"),
                                        Max: document.createElement("div"),
                                        Body: document.createElement("div"),
                                        Status: document.createElement("div"),
                                        StatusText: document.createElement("div"),
                                        Menu: document.createElement("div"),
                                        File: document.createElement("div"),
                                        Edit: document.createElement("div"),
                                        View: document.createElement("div")
                                    };
                                    
                                    this.Elements.Window.style.position = "absolute";
                                    this.Elements.Window.style.width = this.width + "px";
                                    this.Elements.Window.style.height = this.height + "px";
                                    this.Elements.Window.style.top = this.top + "px";
                                    this.Elements.Window.style.left = this.left + "px";
                                    this.Elements.Window.className = "outputWindow";
                                    this.Elements.Window.id = ID;
                                    this.Elements.Window.name = ID;
                                    this.Elements.Window.onclick = this.makeActive;
                                    this.Elements.Window.onfocus = function(){alert("On Focus")};
                                    this.Elements.Window.onblur = function(){alert("On Blur")};
                                    this.Elements.Window.onactivate = function(){alert("On Activate")};
                                    
                                    
                                    this.Elements.Header.className = "windowTitleBar";
                                    this.Elements.Header.id = ID;
                                    
                                    this.Elements.HeaderButtons.className = "macButtonsContainer";
                                    this.Elements.Close.className = "mac_os_x_close";                                    
                                    this.Elements.HeaderButtons.appendChild(this.Elements.Close);
                                    
                                    this.Elements.Min.className = "mac_os_x_minimize";                                    
                                    this.Elements.HeaderButtons.appendChild(this.Elements.Min);
                                    
                                    this.Elements.Max.className = "mac_os_x_maximize";                                    
                                    this.Elements.HeaderButtons.appendChild(this.Elements.Max);
                                    
                                    this.Elements.Header.appendChild(this.Elements.HeaderButtons);
                                    this.Elements.Header.name = ID;
                                    
                                    this.Elements.HeaderText.innerHTML = uName;
                                    this.Elements.HeaderText.className = "windowTitle";
                                    this.Elements.HeaderText.name = ID;
                                    this.Elements.Header.appendChild(this.Elements.HeaderText);
                                    
                                    this.Elements.Window.appendChild(this.Elements.Header);
                                    //this.Elements.Header.innerHTML = uName;
                                    
                                    this.Elements.Close.onclick = _onclose;
                                    this.Elements.Min.onclick = _onmin;
                                    this.Elements.Max.onclick = _onmax;
                                    
                                    this.Elements.File.className = "windowMenu";
                                    this.Elements.File.innerHTML = "File";
                                    
                                    this.Elements.Edit.className = "windowMenu";
                                    this.Elements.Edit.innerHTML = "Edit";
                                    
                                    this.Elements.View.className = "windowMenu";
                                    this.Elements.View.innerHTML = "View";
                                    this.Elements.Menu.className = "windowMenuBarMac";
                                    this.Elements.Menu.name = ID;
                                    
                                    this.Elements.Menu.appendChild(this.Elements.File);
                                    this.Elements.Menu.appendChild(this.Elements.Edit);
                                    this.Elements.Menu.appendChild(this.Elements.View);
                                    
                                    this.Elements.Window.appendChild(this.Elements.Menu);
                                    
                                    this.Elements.Window.appendChild(this.Elements.Body);
                                    
                                    this.Elements.Status.className = "windowStatusBar";
                                    this.Elements.Status.name = ID;
                                    this.Elements.StatusText.innerHTML = "Status: Active";
                                    this.Elements.StatusText.className = "windowStatus";
                                    this.Elements.StatusText.name = ID;
                                    this.Elements.Status.appendChild(this.Elements.StatusText);
                                    this.Elements.Window.appendChild(this.Elements.Status);
                                    
                                    
                                    
                                    document.body.appendChild(this.Elements.Window);
                                    os.resschmgr.WindowManager.Windows.put(uID, this);
                                    //os.resschmgr.WindowManager.ActiveWindow = this;
                                    this.makeActive();
                                    return this;
                                };
                                
                                CWindow.prototype.BeginDrag = function(event){
                                    var obj = os.resschmgr.WindowManager.Windows.get(event.target.name);
                                    //var obj = os.resschmgr.WindowManager.Windows.value();
                                    
                                    //document.addEventListener("mouseup", this.DragStop.apply(this,arguments), false);
                                    //document.addEventListener("mousemove", this.DragStart.apply(this,arguments), false);
                                    //this.Elements.Header.onmouseup = this.DragStop.bind(this);
                                    //this.Elements.Header.mousemove = this.DragStart.bind(this);
                                   if(obj){
                                        obj.Elements.Window.style.zIndex = 21;
                                        if(os.resschmgr.WindowManager.ActiveWindow){
                                            os.resschmgr.WindowManager.ActiveWindow.Elements.Window.style.zIndex = 20;
                                        }
                                        
                                        //os.resschmgr.WindowManager.ActiveWindow = obj;
                                        obj.makeActive();
                                        document.addEventListener("mouseup", obj.DragStop, false);
                                        document.addEventListener("mousemove", obj.DragStart, false);
                                        obj.startX = event.clientX + window.scrollX;
                                        obj.startY = event.clientY + window.scrollY;
                                        obj.startLeft = parseInt(obj.Elements.Window.style.left, 10);
                                        obj.startTop = parseInt(obj.Elements.Window.style.top, 10);
                                        
                                        if (isNaN(obj.startLeft)) obj.startLeft = 0;
                                        if (isNaN(obj.startTop))  obj.startTop  = 0;
                                        
                                        //obj.Elements.Window.style.zIndex = 20;
                                   }
                                    event.preventDefault();
                                };
                                
                                CWindow.prototype.DragStart = function(event, obj){
                                    var object = os.resschmgr.WindowManager.ActiveWindow;//os.resschmgr.WindowManager.Windows.get(event.target.name);//os.resschmgr.WindowManager.Windows.value();
                                    var x,y;
                                    
                                    x = event.clientX + window.scrollX;
                                    y = event.clientY + window.scrollY;
                                    
                                    if(object){
                                        object.Elements.Window.style.left = (object.startLeft + x - object.startX) + "px";
                                        object.Elements.Window.style.top  = (object.startTop  + y - object.startY) + "px";
                                    }
                                    //object.Elements.Body.innerHTML = "<br/>Top: " + (object.startLeft + x - object.startX) ;
                                    //object.Elements.Body.innerHTML += "<br/>Left: " + (object.startTop  + y - object.startY);
                                    //object.Elements.Body.innerHTML += "<br/>Cursor X: " + event.clientY;
                                    //object.Elements.Body.innerHTML += "<br/>Cursor Y: " + event.clientX;
                                    event.preventDefault();

                                };
                                
                                CWindow.prototype.DragStop = function(event,obj){
                                    var object = os.resschmgr.WindowManager.ActiveWindow;//os.resschmgr.WindowManager.Windows.get(event.target.name);//os.resschmgr.WindowManager.Windows.value();
                                    if(object){
                                        document.removeEventListener("mousemove", object.DragStart,false);
                                        document.removeEventListener("mouseup", object.DragStop, false);
                                    }

                                };
                               
                                CWindow.prototype.Close = function(){
                                    os.resschmgr.WindowManager.Windows.remove(ID);
                                    document.body.removeChild(this.Elements.Window);
                                };
                                
                                CWindow.prototype.Move = function(top, left){
                                    this.Elements.Window.style.top = top + "px";
                                    this.Elements.Window.style.left = left + "px";
                                    this.top = top;
                                    this.left = left;
                                };
                                
                                CWindow.prototype.Resize = function(width, height){
                                    this.Elements.Window.style.width = width + "px";
                                    this.Elements.Window.style.height = height + "px";
                                    this.width = width;
                                    this.height = height;
                                };
                                //var CHTMLElement = function(tag){
                                //    var _html = null;
                                //        var _classes = "";
                                //        
                                //        //Adjust classes of HTML Element
                                //        this.Class = {                                    
                                //            //Adds a class to the current class list
                                //            Add: function(sClass){
                                //                _classes += sClass + " ";
                                //                _html.className = _classes;
                                //                return _classes;
                                //            },
                                //            
                                //            //removes an individual class from the class list
                                //            Remove: function(sClass){
                                //                
                                //                _classes = _classes.replace(sClass, "");
                                //                
                                //                return _classes;
                                //            },
                                //            
                                //            //removes all classes from class list
                                //            ClearAll: function(){
                                //                _classes = "";
                                //                _html.className = "";
                                //            },
                                //            
                                //            Get: function(){return _classes;}   
                                //        };
                                //        
                                //        this.AppendToID = function(parentID){
                                //            
                                //            document.getElementById(parentID).appendChild(_html);
                                //        };
                                //        this.AppendTo = function(parent){
                                //            parent.appendChild(_html);
                                //        };
                                //        this.AppendChild = function(child){
                                //            _html.appendChild(child);
                                //        }
                                //        this.GetHeight = function(){
                                //            return _html.clientHeight;
                                //        }
                                //        //Creates HTML element
                                //        _html = document.createElement(tag);
                                //        
                                //        this.html = function(){return _html};
                                //        return this;
                                //};
                                
                                
                                return{
                                    //PUBLIC CLASSES
                                    CHTMLElement: function(tag){
                                        var _html = null;
                                        var _classes = "";
                                        
                                        //Adjust classes of HTML Element
                                        this.Class = {                                    
                                            //Adds a class to the current class list
                                            Add: function(sClass){
                                                _classes += sClass + " ";
                                                _html.className = _classes;
                                                return _classes;
                                            },
                                            
                                            //removes an individual class from the class list
                                            Remove: function(sClass){
                                                
                                                _classes = _classes.replace(sClass, "");
                                                
                                                return _classes;
                                            },
                                            
                                            //removes all classes from class list
                                            ClearAll: function(){
                                                _classes = "";
                                                _html.className = "";
                                            },
                                            
                                            Get: function(){return _classes;}   
                                        };
                                        
                                        this.AppendToID = function(parentID){
                                            
                                            document.getElementById(parentID).appendChild(_html);
                                        };
                                        this.AppendTo = function(parent){
                                            parent.appendChild(_html);
                                        };
                                        this.AppendChild = function(child){
                                            _html.appendChild(child);
                                        }
                                        this.GetHeight = function(){
                                            return _html.clientHeight;
                                        }
                                        this.SetHTML = function(tag){
                                            _html = document.createElement(tag);
                                        }
                                        this.RemoveAllChildren = function(){
                                            
                                            if ( _html.hasChildNodes() )
                                            {
                                                while ( _html.childNodes.length >= 1 )
                                                {
                                                    _html.removeChild( _html.firstChild );       
                                                } 
                                            }
                                        }
                                        //Creates HTML element
                                        _html = document.createElement(tag);
                                        
                                        this.html = function(){return _html};
                                        return this;
                                    },
                                    CEntity: function(id){
                                        var _id = id;
                                        
                                        this.ID = function(){ return _id;};
                                        
                                        this.Get = {
                                            id: function(){
                                                return _id;
                                            }.bind(this)
                                        }
                                        
                                        this.Set = {
                                            
                                        }
                                                                               
                                        this.Graphics = null;
                                        this.AI = null;
                                        this.Physics = null;
                                        
                                    },
                                    //PUBLIC ATTRIBUTES
                                    
                                    //PUBLIC PRIVILEDGE METHODS
                                    
                                    GetName: function(){
                                        return NAME;
                                    },
                                    
                                    GetVersion: function(){
                                        return VERSION;
                                    },
                                    
                                    GetPath: function(){
                                        return PATH;
                                    },
                                    
                                    GetID: function(){
                                        return ID;
                                    },
                                    
                                    Initialize: function(){
                                        //Initialize Managers
                                        os.console.AppendComment("Initializing Resource and Schedule Manager");
                                        
                                        os.console.AppendComment("        Initializing Core Manager");
                                        this.CoreManager.Initialize();
                                        
                                        os.console.AppendComment("        Initializing Event Manager");
                                        this.EventManager.Initialize();
                                        
                                        os.console.AppendComment("        Initializing Schedule Manager");
                                        this.ScheduleManager.Initialize();
                                        
                                        os.console.AppendComment("");
                                        
                                        //Register Resource and Schedule Manager
                                        //  Create a Core Instance and sets ID
                                        //os.console.AppendComment("Registering Resource and Schedule Manager")
                                        ID = this.CoreManager.RegisterResource("com.jahova.os.kernel.resschmgr", PATH, false);
                                        
                                        //os.console.AppendComment("        Adding Resource and Schedule Manager to Cores Map");
                                        //Save a pointer to instance of Core loacted in Core Manager
                                        this.Core = this.CoreManager.Cores.get(ID);
                                        this.Core.OnRequest = this.OnRequest;
                                        
                                        //os.console.AppendComment("            Name: " + this.Core.name);
                                        //os.console.AppendComment("            ID:   " + this.Core.GetID());
                                        //os.console.AppendComment("");
                                    },
                                   
                                    Core: null,
                                   
                                    OnRequest: function(e){
                                            var requests = e.jahovaos;
                                    },
                                
                                    Create: {                     //Resource Factory                                      
                                        XHRObject: function(){
                                            return new CXHRObject();
                                        },
                                        Core: function(id){
                                            return new CCore(id);
                                        },
                                        Command: function(name, callback, scope, help){
                                            return new CCommand(name, callback, scope, help);
                                        },
                                        Event: function(id, target, name, eventType, custom, can_bubble, cancelable){
                                            return new CEvent(id, target, name, eventType, custom, can_bubble, cancelable);
                                        },
                                        EventObject:function(id, name, custom, targetID){
                                            return new CEventObject(id, name, custom, targetID);
                                        },
                                        Subscriber: function(name, id, eventName, callback, capture){
                                            return new CSubscriber(name, id, eventName, callback, capture);
                                        },
                                        Instruction: function(){
                                            return new CInstruction();
                                        },
                                        Map: function(linkEntries){
                                            return new CMap(linkEntries);
                                        },
                                        Queue: function(){
                                            return new CQueue();
                                        },
                                        Window: function(uID,uName, uWidth, uHeight, uTop, uLeft){
                                            return new CWindow(uID,uName, uWidth, uHeight, uTop, uLeft);
                                        },
                                        HTMLElement: function(tag){
                                            return new os.resschmgr.CHTMLElement(tag);
                                        },
                                        Entity: function(id){
                                            return new os.resschmgr.CEntity(id);   
                                        }
                                    },
                                    
                                    //PUBLIC OBJECTS                                   
                                    
                                    
                                    WindowManager:{
                                        NextID: 0,
                                        ActiveWindow: null,
                                        Windows: new CMap()
                                    },
                                    
                                    CoreManager: {
                                    
                                        NextID: 0,
                                        
                                        Cores: null,
                                        
                                        Name2ID: null,
                                        
                                        GetCoreByID: function(id){
                                            return this.Cores.get(id);
                                        },
                                        
                                        GetCoreByName: function(name){
                                            return this.Cores.get(this.Name2ID.get(name));
                                        },
                                        
                                        GetAllResources: function(){
                                            var output = [];
                                            
                                            for(var i = 0; i++ < os.resschmgr.CoreManager.Cores.size; os.resschmgr.CoreManager.Cores.next()){
                                                output.push(os.resschmgr.CoreManager.Cores.value());
                                            }
                                            
                                            return output;
                                        },
                                        
                                        Initialize: function(){
                                            this.Cores = os.resschmgr.Create.Map();
                                            this.Name2ID = os.resschmgr.Create.Map();
                                        },
                                        
                                        RegisterResource: function(resName, resPath, threadSafe){
                                            //Inputs:
                                            //  name: Module name (without com_jahovaos)
                                            //  path: Absolute path to resource
                                            //  threadSafe:  bool, is the module capable of being threaded with webworkers
                                            
                                            //Gets ID, returns -1 resource already exist
                                            var id = this.Name2ID.get(resName);
                                            
                                            //verifies core name/path combo does not exist already
                                            if(!id)
                                            {
                                                id = this.NextID++;
                                                //Creates a resource with same id as module
                                                var core = os.resschmgr.Create.Core(id);
                                                
                                                //Initialize resource parameters
                                                core.name = resName;
                                                core.SetID(id);
                                                core.osName = "com_jahovaos_res_" + resName;
                                                core.path = resPath;
                                                core.threadSafe = threadSafe;
                                                
                                                //Add Core to Maps
                                                this.Cores.put(id,core);
                                                this.Name2ID.put(resName, id);
                                            }
                                            else{
                                                id = -1;
                                            }
                                            
                                            //Returns ID of newly created resource, or -1 if resource already exist
                                            return id;
   
                                        },
                                        
                                        ActivateResource: function(ID){
                                            var core = this.Cores.get(ID);
                                            var EventObj;
                                            var e;
                                            
                                            //--------------------------------
                                            //
                                            //  EVENT MANAGER REGISTRATION
                                            //
                                            //--------------------------------
                                            
                                            //Does Browser Support Web Worker
                                            //  and is core capable of running as webworker
                                            if(window.Worker && core.threadSafe)
                                            {
                                                //Create an Event Object (will create a Worker and Message Event)
                                                //os.console.AppendComment("      Creating Event Object");
                                                EventObj = os.resschmgr.EventManager.PublishThread(core.name, os.GetDomain() + core.path);
                                                
                                                //Create a  Message Event for Worker
                                                //os.console.AppendComment("      Creating Event");
                                                e = EventObj.PublishEvent("onRequest", "message", false, true);
                                                
                                                //Subscribe InstructionModule::AddRequest as EventListener for
                                                //  Messages sent from Worker
                                                //os.console.AppendComment("      Subscribing To Event");
                                                e.Subscribe(core.name, "onRequest", os.instruction.AddRequest, false);
                                                
                                                core.OnRequest = os.instruction.Core.Dispatcher;
                                            }
                                            else
                                            {
                                                //os.console.AppendComment("      Creating Event Object");
                                                //Create an Event Object
                                                EventObj = os.resschmgr.EventManager.PublishEventObject(core.name, true, core.GetID());
                                                
                                                //os.console.AppendComment("      Creating Event");
                                                //Create an Event
                                                e = EventObj.PublishEvent("onRequest", "click", false, true);
                                                
                                                //os.console.AppendComment("      Subscribing To Event");
                                                
                                                //Set onRequest as a Subscriber to Event
                                                e.Subscribe(core.name, "onRequest", core.OnRequest, false);
                                            }
                                                
                                            //Register Interpreter to Event Dispatch
                                                core.Dispatcher = e.Dispatch;
                                                
                                            //Register SendRequest to Instruction Module AddRequest
                                                core.SendRequest = os.instruction.Core.Dispatcher;
                                            
                                            //---------------------------------------
                                            //
                                            //  INSTRUCTION MODULE REGISTRATION
                                            //
                                            //---------------------------------------
                                            
                                            os.instruction.AddResource(core);
                                            
                                            //Set Core State to Registered: 2
                                            core.SetState(2);
                                        },
                                        
                                        ActivateResSchMgrModule: function(){
                                            var activationSuccess = false;
                                            
                                            os.resschmgr.Core.OnRequest = os.resschmgr.OnRequest;
                                            //ACTIVATE WITH RESOURCE AND SCHEDULE MANAGER MODULE
                                            //  INPUT: Core ID and Callback Function for Instructions
                                            this.ActivateResource(ID);
                                            
                                            //Test to see if state was updated to Registered: 2
                                            if(os.resschmgr.Core.GetState() == 2)
                                            {
                                                activationSuccess = true;   
                                            }
                                            
                                            return activationSuccess;
                                        },
                                        
                                        ExecuteResource: function(){
                                            //
                                            //  Old Utilities Modules AddRequest Execute
                                            //
                                        }
                                        /*
                                         **/
                                    },
                                    
                                    EventManager: {
                                    
                                        NextID: 0,
                                        
                                        PublishedEventObjects: null,
                                        
                                        Name2ID: null,
                                        
                                        Initialize: function(){
                                            this.PublishedEventObjects = os.resschmgr.Create.Map();
                                            this.Name2ID = os.resschmgr.Create.Map();
                                        },
                                        
                                        PublishEventObject: function(name, custom, targetID){
                                            //Get next ID
                                            this.NextID++;
                                            var id = this.NextID;
                                            
                                            //Create Event Object
                                            var eventObject = os.resschmgr.Create.EventObject(id, name, custom, targetID);
                                            
                                            //Add Object to PublishedObjects Q
                                            this.PublishedEventObjects.put(eventObject.id, eventObject);
                                            this.Name2ID.put(name,id);
                                            return eventObject;
                                            
                                        },
                                        
                                        PublishThread: function(name, path){
                                            //uses path instead of targetID for threads
                                            return this.PublishEventObject(name, true, path);
                                           
                                        },
                                        
                                        UnpublishEventObject: function(id){
                                            //Get Event Object
                                            var eventObj = this.PublishedEventObjects.get(id);
                                            
                                            //Remove all Events and Subscribers
                                            eventObj.UnpublishAllEvents();
                                            
                                            //Remove from Maps
                                            this.Name2ID.remove(eventObj.name);
                                            this.PublishedEventObjects.remove(id);
                                            
                                        },
                                        
                                        GetEventObjectByID: function(id){
                                            return this.PublishedEventObjects.get(id);
                                        },
                                        
                                        GetEventObjectByName: function(name){
                                            var id = this.Name2ID.get(name);
                                            var event = this.GetEventObjectByID(id);
                                            return this.PublishedEventObjects.get(this.Name2ID.get(name));
                                        },
                                        
                                        GetEventObjectID: function(name){
                                            return this.GetEventObjectByName(name).id;
                                        }
                                        
                                    },
                                   
                                    ScheduleManager:{
                                    
                                        NextID:0,
                                        
                                        Initialize: function(){
                                            
                                        }
                                        
                                    }
                                    
                                }
                            }
                            
                            return {
                                //OBJECT ACCESSOR
                                Instance: function()
                                {
                                    if(!pInstance)
                                    {
                                        //Instantiate if pInstance does not exist
                                        pInstance = constructor();
                                    }
                                    
                                    return pInstance;
                                }
                            }
                        })();
//JaHOVA OS : Kernel : Instruction
//      Dependent on JaHOVA OS : Kernel

/**h* Kernel/Instruction
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p>
*
*  NAME
*    JaHOVA OS Kernel Instruction Module
*    
*  AUTHOR
*   Corey Clark
*   cclark@coreyclarkphd.com
*
*  HISTORY
*   Created: 4/14/2011
*   
*
*  DESCRIPTION
*     This module holds the Kernel Instruction Module.
*     
*
*  EXAMPLE
*   instruction = com.jahova.os.Instance().Kernel.Instance().Instruction.Instance();
*   
**/
com.jahova.os.Instance().Kernel.Instance().Instruction = (function()
                        {
                            var pInstance;
                            /**m* Instruction/Constructor
                             *
                             *  SOURCE
                             */
                            function constructor(){
                                
                                //PRIVATE ATTRIBUTES
                                var NAME = "JaHOVA OS Kernel : Instruction Module";
                                var VERSION = "0v3";
                                var PATH = "scripts/jahova/OS/Kernel/jahova.os.kernel.instruction.js";
                                var ID = null;

                                var os = com.jahova.os.Instance();
                                var utilities = com.jahova.utilities.Instance();
                            /*
                            **/
                                //PRIVATE METHODS
                                
                                return{
                                    //PUBLIC ATTRIBUTES
                                    
                                    //PUBLIC PRIVILEDGE METHODS
                                    /**m* Instruction/GetName
                                    *
                                    *  SOURCE
                                    */
                                    GetName: function(){
                                        return NAME;
                                    },
                                    /*
                                     **/
                                    /**m* Instruction/GetVersion
                                    *
                                    *  SOURCE
                                    */
                                    GetVersion: function(){
                                        return VERSION;
                                    },
                                    /*
                                     **/
                                    /**m* Instruction/GetPath
                                    *
                                    *  SOURCE
                                    */
                                    GetPath: function(){
                                        return PATH;
                                    },
                                    /*
                                     **/
                                    /**m* Instruction/GetID
                                    *
                                    *  SOURCE
                                    */
                                    GetID: function(){
                                        return ID;
                                    },
                                    /*
                                     **/
                                    /**o* Instruction/Core
                                    *   DESCRIPTION
                                    *       Holds a pointer to the Core Object created by
                                    *       Resource and Schedule Core Manager upon
                                    *       Module Activation
                                    *  SOURCE
                                    */
                                    Core: null,
                                    /*
                                     **/
                                    /**m* Instruction/Initialize
                                    *
                                    *  SOURCE
                                    */
                                    Initialize: function(){
                                        os.console.AppendComment("Initializing Instruction Module");
                                        
                                        os.console.AppendComment("     Initializing Router");
                                        this.Router.Initialize();
                                        
                                        os.console.AppendComment("");
                                        
                                        //Register Resource and Schedule Manager
                                        //  Create a Core Instance and sets ID
                                        //os.console.AppendComment("Registering Instruction Module")
                                        ID = os.resschmgr.CoreManager.RegisterResource("com.jahova.os.kernel.instruction", PATH, false);
                                        
                                        //os.console.AppendComment("        Adding Instruction Core to Cores Map");
                                        //Save a pointer to instance of Core loacted in Core Manager
                                        this.Core = os.resschmgr.CoreManager.Cores.get(ID);
                                        //os.console.AppendComment("            Name: " + this.Core.name);
                                        //os.console.AppendComment("            ID:   " + this.Core.GetID());                                        
                                        
                                        //os.console.AppendComment("");
                                        
                                        //Activation with OS a success
                                        var activationSuccess = false;
   
                                        //os.console.AppendComment("        Setting State");
                                        //Update State to Executed: 1
                                        this.Core.SetState(1);
                                        //os.console.AppendComment("            State: " + this.Core.GetState());
                                        
                                        
                                        //os.console.AppendComment("        Setting Callback function");
                                        //Set Callback for Messages from OS
                                        this.Core.OnRequest = this.AddRequest;
                                        
                                        //os.console.AppendComment("            Callback function: " + this.Core.onRequest);
                                        
                                       //os.console.AppendComment("");
                                        //os.console.AppendComment("Activating Instruction Module");
                                        //ACTIVATE WITH RESOURCE AND SCHEDULE MANAGER MODULE
                                        //  INPUT: Core ID and Callback Function for Instructions
                                        os.resschmgr.CoreManager.ActivateResource(this.Core.GetID());
                                        
                                        //Test to see if state was updated to Registered: 2
                                        if(this.Core.GetState() == 2)
                                        {
                                            activationSuccess = true;   
                                        }
                                        
                                        //os.console.AppendComment("        Activation Success: " + activationSuccess);
                                        
                                        //ACTIVATE WITH RESOURCE AND SCHEDULE MANAGER MODULE
                                        //  INPUT: Core ID and Callback Function for Instructions
                                        //os.console.AppendComment("");
                                        //os.console.AppendComment("Activating Resource and Schedule Manager Module");
                                        //os.resschmgr.CoreManager.ActivateResSchMgrModule();
                                        
                                        //Test to see if state was updated to Registered: 2
                                        var ResSchSuccess = false;
                                        if(os.resschmgr.Core.GetState() == 2)
                                        {
                                             ResSchSuccess = true;   
                                        }
                                        
                                        //os.console.AppendComment("        Activation Success: " + ResSchSuccess);
                                        //os.console.AppendComment("");
                                        return activationSuccess;
                                    },
                                    /*
                                     **/
                                    /**m* Instruction/AddRequest
                                    *
                                    *  SOURCE
                                    */
                                    AddRequest: function( Requests){
                                        //Standard JaHOVA OS Event
                                        if(Requests instanceof MouseEvent)
                                        {
                                            //os.console.AppendComment("Instruction Module: Click Request Received, " + Requests.jahovaos.length + " request in package");
                                            //os.console.AppendComment("Instruction Module: Click Request From - ID: " + Requests.jahovaos[0].SenderID );
                                            //os.console.AppendComment("Instruction Module: Click Request To - ID: " + Requests.jahovaos[0].ReceiverID );
                                            //os.console.Comment("Instruction Module: Click Request Calling Method - ID: " + Requests.jahovaos[0].InterfaceName ); 
                                            os.instruction.Router.Process(Requests.jahovaos); 
                                        }
                                        // Message from WebWorker
                                        else if(Requests.target instanceof Worker)
                                        {
                                            //os.console.AppendComment("Instruction Module: WebWorker Request Received, " + Requests.data.length + " request in package");
                                            //os.console.AppendComment("Instruction Module: WebWorker Request From - ID: " + Requests.data[0].SenderID );
                                            //os.console.AppendComment("Instruction Module: WebWorker Request To - ID: " + Requests.data[0].ReceiverID );
                                            //os.console.Comment("Instruction Module: Click Request Calling Method - ID: " + Requests.data[0].InterfaceName ); 
                                            os.instruction.Router.Process(Requests.data);                                             
                                        }
                                        //CInstruction being passed
                                        else
                                        {
                                            //os.console.Comment("Instruction Module: Request Received, " + Requests.length + " request in package"); 
                                            os.instruction.Router.Process(Requests); 
                                        }
                                        
                                    },
                                    /*
                                     **/
                                    /**m* Instruction/AddResource
                                    *
                                    *  SOURCE
                                    */
                                    AddResource: function(core){
                                        //Adds a blank Q to Router::Cores for incomming request
                                        //  Uses Core ID as key to store values
                                        if(core.GetID() != ID)
                                        {
                                            this.Router.Cores.put(core.GetID(),{"info" : core, "requests" : os.resschmgr.Create.Queue()});
                                        }
                                    },
                                    /*
                                     **/
                                    /**m* Instruction/GetName
                                    *
                                    *  SOURCE
                                    */
                                    RemoveResource: function(core){
                                        this.Router.Cores.remove(core.GetID());
                                    },
                                    /*
                                     **/
                                    //PUBLIC OBJECTS
                                    /**o* Instruction/Router
                                    *
                                    *  DESCRIPTION
                                    *  This object processes all incomming instructions to OS
                                    *  and sends/routes to the appropriate cores/resources
                                    *
                                    *  SOURCE
                                    */
                                    Router: {
                                    /*
                                     **/
                                        /**o* Router/Request
                                        *   DESCRIPTION
                                        *   A Queue that holds all incomming instructions/request
                                        *  SOURCE
                                        */
                                        Requests: null,
                                        /*
                                         **/
                                        /**o* Router/Cores
                                        *   DESCRIPTION
                                        *   A Map that holds all regiestered cores that have been
                                        *   activated by Resource and Schedule Core Manager
                                        *  SOURCE
                                        */
                                        Cores: null,
                                        /*
                                         **/
                                        /**m* Router/Initialize
                                        *   
                                        *  SOURCE
                                        */
                                        Initialize: function(){
                                            this.Requests = os.resschmgr.Create.Queue();
                                            this.Cores = os.resschmgr.Create.Map();
                                        },
                                        /*
                                         **/
                                        /**m* Router/Process
                                        *   DESCRIPTION
                                        *   Used to break up incomming request into single instructions
                                        *   and add to the appropriate Core Queue
                                        *  SOURCE
                                        */
                                        Process: function(Requests){
                                            //Get request and store in core specific q
                                            var numOfRequest = Requests.length;
                                            for(var i = 0; i < numOfRequest; i++)
                                            {
                                                //Get Request
                                                var req = Requests.pop();
                                                
                                                //Get Core info from Cores Map for the given Reciever ID
                                                //  identified in current request
                                                var core = this.Cores.get(req.ReceiverID);
                                                //os.console.Comment("\nAdded: " + req.InterfaceName + "\nRequest Onto " + core.info.GetID() + ": " + core.info.name + " Queue");
                                                
                                                //Push request onto CoreQ
                                                core.requests.push(req);
                                       
                                            }
                                                
                                            this.Route();
                                                
                                        },
                                        /*
                                         **/
                                        /**m* Router/Route
                                        *   DESCRIPTION
                                        *   Checks cores queues and call their dispatch method for any pending
                                        *   instructions for the associated core
                                        *  SOURCE
                                        */
                                        Route: function(){
                                            //Call Interpreter for each core
                                            //  to deliver messages
                                            var numOfQs = this.Cores.size;
                                            
                                            for(var i = 0; i++ < numOfQs; this.Cores.next())
                                            {
                                                var core = this.Cores.value();
                                                
                                                if(core.requests.q.length > 0)
                                                {
                                                    var request = []
                                                    var numOfReq = core.requests.q.length;
                                                    
                                                    for(var j = 0; j < numOfReq; j++)
                                                    {
                                                        request.push(core.requests.q[j]);
                                                        core.requests.remove(j);
                                                    }
                                                    
                                                    //os.console.Comment("Calling " + core.info.name + " Dispatcher");
                                                    var EventObject = os.resschmgr.EventManager.GetEventObjectByName(core.info.name);
                                                    var onRequestEvent = EventObject.GetEventsByName("onRequest")[0];
                                                    core.info.Dispatcher.apply(onRequestEvent, [request]);
                                                }
                                                
                                            }
                                            
                                            
                                            //Check to see if there are any new request
                                            //  if so, call Process.  Otherwise exit
                                            if(this.Requests.q.length > 0)
                                            {
                                                this.Process();
                                            }
                                        }
                                        /*
                                         **/
                                    }
                                    

                                }
                                
                            }
                            
                            return {
                                //OBJECT ACCESSOR
                                Instance: function(){
                                    if(!pInstance){
                                        //Instantiate if pInstance does not exist
                                        pInstance = constructor();
                                    }
                                    
                                    return pInstance;
                                }
                            }
                        })();
//JaHOVA OS : Cores
//      Dependent on JaHOVA OS

/**h* OS/InternalCores
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p>
*
*  NAME
*    JaHOVA OS Cores
*    
*  AUTHOR
*   Corey Clark
*   cclark@coreyclarkphd.com
*
*  HISTORY
*   Created: 4/14/2011
*   
*
*  DESCRIPTION
*     This Singleton holds pointers to Internal JaHOVA OS Cores
*
*  EXAMPLE
*       cores = com.jahova.os.Instance().Cores.Instance()
*
**/
com.jahova.os.Instance().Cores = (function()
                        {
                            var pInstance;
                            
                            /**m* InternalCores/Constructor
                             *
                             *  SOURCE
                             **/
                            function constructor()
                            {
                                //PRIVATE ATTRIBUTES
                                var NAME = "JaHOVA OS Internal APIs";
                                var VERSION = "0v3";
                                var PATH = "scripts/jahova/OS/Cores/jahova.os.cores.js";
                                var ID = null;
                                
                                //MODULE POINTERS
                                var os = com.jahova.os.Instance();
                                var kernel = os.kernel;
                                
                                var utilities = os.utilities;
                                var console = os.console;
                             /*
                            **/
                                //PRIVATE METHODS
                                
                                return{
                                    //PUBLIC ATTRIBUTES

                                    
                                    //PUBLIC PRIVILEDGE METHODS
                                   
                                    GetName: function(){
                                        return NAME;
                                    },
                                                                       
                                    GetVersion: function(){
                                        return VERSION;
                                    },
                                                                       
                                    GetPath: function(){
                                        return PATH;
                                    },
                                                                     
                                    GetID: function(){
                                        return ID;
                                    },
                                    
                                    Initialize: function(){
                                        
                                    },
                                    
                                    //PUBLIC OBJECTS
                                    Network: null,      //WebSocket, WebDAV, XHR
                                    HTML: null,         //Wrapped DOM Calls
                                    Threads: null,      //Generic WebWorker Object, allows for spinning off generic functions into threads
                                    Database: null,     //MySQL connector
                                    Audio: null,        //HTML5 Audio Wrapper
                                    Windows: null,      //Desktop style windows
                                    Graphics: null,     //2D and 3D (WebGL) Graphics core
                                    Physics: null      //3D Rigid Body Physics
                                }
                            }
                            
                            return {
                                //OBJECT ACCESSOR
                                Instance: function()
                                {
                                    if(!pInstance)
                                    {
                                        //Instantiate if pInstance does not exist
                                        pInstance = constructor();
                                    }
                                    
                                    return pInstance;
                                }
                            }
                        })();
//JaHOVA OS : Cores : Network
//      Dependent on JaHOVA OS : Cores

/**h* InternalCores/Network
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p> 
*
*  NAME
*    JaHOVA OS Network Core
*    
*  AUTHOR
*   Corey Clark
*   cclark@coreyclarkphd.com
*
*  HISTORY
*   Created: 4/14/2011
*   
*
*  DESCRIPTION
*     This Singleton holds the Internal JaHOVA OS Network Core
*
*  EXAMPLE
*     network = com.jahova.os.Instance().Cores.Instance().Network.Instance();
*
**/
com.jahova.os.Instance().Cores.Instance().Network = (function()
                        {
                            var pInstance;
                    
                            function constructor()
                            {
                                //PRIVATE ATTRIBUTES
                                var NAME = "JaHOVA OS Internal API : Network Core";
                                var VERSION = "0v3";
                                var PATH = "scripts/jahova/OS/Cores/Network/jahova.os.cores.network.js";
                                var ID = null;
                                
                                var os = com.jahova.os.Instance();
                                var utilities = com.jahova.utilities.Instance();
                                
                                
                                
                                
                                //Private Classes
                                var CNetworkMessage = function(){
                                    this.SenderID;          // CUser ID
                                    this.ReceiverID;        // CSession Name
                                    this.Data  = {       
                                        Type: null,         // Message Type
                                        Args: null,         // Arguments for Interface Call
                                        ModuleID: null      // CModule Name
                                    }
                                    
                                    this.InterfaceID        // CFunction Name
                                }
                                var CJOSServerMessage = function(){
                                    this.UserID = "";
                                    this.SessionID = "";
                                    this.ModuleID = "";
                                    this.Data = {
                                        Type: "",
                                        Args: ""
                                    };
                                    this.FunctionID = "";
                                    
                                    this.Parse = function(msgJSON){
                                        var msg = "";
                                        try{
                                            msg = JSON.parse(msgJSON);
                                            this.UserID = msg.UserID;
                                            this.SessionID = msg.SessionID;
                                            this.Data = msg.Data;
                                            this.ModuleID = msg.ModuleID;
                                            this.FunctionID = msg.FunctionID;
                                        }
                                        catch(e){
                                            os.windows.Create.ErrorWindow("ERROR: JOS Server", "Unable to parse message: <br/>" + msgJSON);
                                        }
                                        
                                    };
                                    this.Serialize = function(){
                                        
                                        return JSON.stringify(this);
                                    };
                                }
                                
                                var CJOSServer = function(){
                                    
                                    //**********************
                                    //   PRIVATE METHODS
                                    //**********************
                                    var _onOpen = function(){
                                        os.console.Comment("JaHOVA OS Server: Connection Opened");
                                        if(this.Events.onOpen){
                                            this.Events.onOpen();
                                        }
                                        
                                    }.bind(this);
                                    
                                    var _onClose = function(){
                                        os.console.Comment("JaHOVA OS Server: Connection Closed");
                                        if(this.Events.onClose){
                                            this.Events.onClose();
                                        }
                                    }.bind(this);
                                    
                                    var _onMessage = function(msgJSON){
                                        var msg = new CJOSServerMessage();
                                        msg.Parse(msgJSON);
                                        
                                        if(this.Events.onMessage){
                                            this.Events.onMessage(msg);
                                        }
                                        
                                        if(msg.Data.Type == "userID"){
                                            this.userID = msg.Data.Args[0];
                                            this.mainSessionID = msg.SessionID;
                                            os.console.Comment("JaHOVA OS Server ID Set: " + this.userID);
                                        }
                                        
                                    }.bind(this);
                                    
                                    var _onError = function(e){
                                        
                                        if(this.Events.onError){
                                            this.Events.onError(e);
                                        }
                                        
                                    }.bind(this);
                                
                                    this.socket = null;
                                    this.message = null;
                                    this.userID = null;
                                    this.mainSessionID = null;
                                    
                                    this.Events = {
                                        onOpen: null,
                                        onMessage: null,
                                        onClose: null,
                                        onError: null
                                    };
                                    this.Connect = function(){
                                        this.socket.Events.onOpen = _onOpen;
                                        this.socket.Events.onMessage = _onMessage;
                                        this.socket.Events.onClose = _onClose;
                                        this.socket.Events.onError = _onError;
                                        
                                        this.socket.Open();
                                    }
                                    this.Send = function(msg){
                                        this.socket.Send(msg.Serialize());
                                    };
                                    this.Disconnect = function(){
                                        
                                        //Send Disconnect Message to Server
                                        var msg = new CJOSServerMessage();
                                        msg.UserID = this.userID;
                                        msg.Data.Type = "disconnect";
                                        
                                        this.Send(msg);
                                    };
                                    this.Create ={
                                        Session: function(sessionType, password, params){
                                            var msg = new CJOSServerMessage();
                                            msg.SessionID = this.mainSessionID;
                                            msg.UserID = this.userID; 
                                            msg.Data.Type = "createSession";
                                            msg.Data.Args = [sessionType, password, params];
                                            msg.ModuleID = "";
                                        
                                            this.Send(msg);
                                            
                                        }.bind(this),
                                        RegisteredSession: function(sessionType, password){
                                            var msg = new CJOSServerMessage();
                                            msg.SessionID = this.mainSessionID;
                                            msg.UserID = this.userID; 
                                            msg.Data.Type = "createRegisteredSession";
                                            msg.Data.Args = [sessionType, password];
                                            msg.ModuleID = "";
                                        
                                            this.Send(msg);
                                        }.bind(this),
                                        Module: function(moudule, password){
                                            var msg = new CJOSServerMessage();
                                            msg.SessionID = "";
                                            msg.UserID = this.userID; 
                                            msg.Data.Type = "createModule";
                                            msg.Data.Args = [password];
                                            msg.ModuleID = module;
                                            this.Send(msg);
                                        }.bind(this),
                                        Function: function(module, funcName, funcBody, funcInput){
                                            var msg = new CJOSServerMessage();
                                            msg.SessionID = "";
                                            msg.UserID = this.userID; 
                                            msg.Data.Type = "createFunction";
                                            msg.Data.Args = [module, funcName, funcBody, funcInput];
                                            msg.ModuleID = module;
                                            this.Send(msg);
                                        }.bind(this),
                                        Message: function(){
                                            var msg =  new CJOSServerMessage();
                                            msg.UserID = this.userID;
                                            return msg;
                                        }.bind(this)
                                    }
                                    this.Get = {
                                        SessionList: function(sessionType){
                                            var msg = new CJOSServerMessage();
                                            msg.SessionID = this.mainSessionID;
                                            msg.UserID = this.userID; 
                                            msg.Data.Type = "getList";
                                            msg.Data.Args = [sessionType];
                                            msg.ModuleID = "";
                                        
                                            this.Send(msg);
                                        }.bind(this),
                                        SessionPropertyTypes: function(sessionID){
                                            var msg = new CJOSServerMessage();
                                            msg.SessionID = sessionID;
                                            msg.UserID = this.userID; 
                                            msg.Data.Type = "getSessionProperties";
                                            msg.Data.Args = [];
                                            msg.ModuleID = "";
                                        
                                            this.Send(msg);
                                        }.bind(this),
                                        SessionPropertyValues: function(sessionID){
                                            var msg = new CJOSServerMessage();
                                            msg.SessionID = sessionID;
                                            msg.UserID = this.userID; 
                                            msg.Data.Type = "getSessionValues";
                                            msg.Data.Args = [];
                                            msg.ModuleID = "";
                                        
                                            this.Send(msg);
                                        }.bind(this)
                                    }
                                    this.Set = {
                                        SessionProperty: function(session, key, value){
                                            var msg = new CJOSServerMessage();
                                            msg.SessionID = session;
                                            msg.UserID = this.userID; 
                                            msg.Data.Type = "setSessionProperty";
                                            msg.Data.Args = [key,value];
                                            msg.ModuleID = "";
                                        
                                            this.Send(msg);
                                        }.bind(this)
                                    }
                                    this.JoinSession = function(session, password){
                                        var msg = new CJOSServerMessage();
                                        msg.SessionID = session;
                                        msg.UserID = this.userID; 
                                        msg.Data.Type = "joinSession";
                                        msg.Data.Args = [password];
                                        msg.ModuleID = "";
                                        
                                        this.Send(msg);
                                    };
                                    this.Broadcast = function(session, data){
                                        var msg = new CJOSServerMessage();
                                        msg.SessionID = session;
                                        msg.UserID = this.userID; 
                                        msg.Data.Type = "sessionBroadcast";
                                        msg.Data.Args = [data];
                                        msg.ModuleID = "";
                                        
                                        this.Send(msg);
                                    }
                                    this.LeaveSession = function(session){
                                        var msg = new CJOSServerMessage();
                                        msg.SessionID = session;
                                        msg.UserID = this.userID; 
                                        msg.Data.Type = "leaveSession";
                                        msg.ModuleID = "";
                                        
                                        this.Send(msg);
                                    }
                                    this.AccessModule = function(session, module, password){
                                        var msg = new CJOSServerMessage();
                                        msg.SessionID = session;
                                        msg.UserID = this.userID; //"MainSession";
                                        msg.Data.Type = "accessModule";
                                        msg.Data.Args = [password]; //["godfather"];
                                        msg.ModuleID = module; //"AdminModule";
                                        
                                        this.Send(msg);
                                    };
                                    
                                    
                                    this.ExecuteFunction = function(params, module, func){
                                        var msg = new CJOSServerMessage();
                                        msg.SessionID = ""
                                        msg.UserID = this.userID; 
                                        msg.Data.Type = "executeFunction";
                                        msg.Data.Args = [param];
                                        msg.ModuleID = module;
                                        
                                        this.Send(msg);
                                    };
                                    
                                    
                                }
                                
                                var CSocketIO = function(domain, port, path, id){
                                    //**********************
                                    //  PRIVATE ATTRIBUTES
                                    //**********************
                                    var PATH =  path;
                                    var DOMAIN = domain;
                                    var PORT = port;
                                    var ID = id;
                                    var socket = null;
                                    
                                    //**********************
                                    //   PRIVATE METHODS
                                    //**********************
                                    var _onOpen = function(){
                                        
                                        if(this.Events.onOpen){
                                            this.Events.onOpen();
                                        }
                                        
                                    }.bind(this);
                                    
                                    var _onClose = function(){
                                        
                                        if(this.Events.onClose){
                                            this.Events.onClose();
                                        }
                                    }.bind(this);
                                    
                                    var _onMessage = function(msg){
                                        if(this.Events.onMessage){
                                            this.Events.onMessage(msg);
                                        }
                                    }.bind(this);
                                    
                                    var _onError = function(e){
                                        
                                        if(this.Events.onError){
                                            this.Events.onError(e);
                                        }
                                        
                                        
                                    }.bind(this);
                                    
                                    //**********************
                                    //   PUBLIC ATTRIBUTES
                                    //**********************
                                    
                                    this.Events = {
                                        onOpen: null,
                                        onMessage: null,
                                        onClose: null,
                                        onError: null
                                    };
                                    
                                    //**********************
                                    //   PUBLIC METHODS
                                    //**********************
                                    
                                    this.GetID = function(){
                                        return ID;
                                    }
                                    
                                    this.Open = function(){
                                        
                                        if(socket == null){
                                            socket = io.connect( DOMAIN + ":" + PORT +"/" + PATH);                                            
                                            socket.on("connect", _onOpen);
                                            socket.on("disconnect" , _onClose);
                                            socket.on("message" , _onMessage);
                                            socket.on("error" , _onError);    
                                        }
                                         
                                    };
                                    
                                    this.Close = function(){
                                         
                                         
                                    };
                                    
                                    this.Send = function(msg){
                                         socket.send(msg);
                                    }
                                    
                                }
                                var CWebSocket = function(domain, port, path, id){
                                    
                                    //**********************
                                    //  PRIVATE ATTRIBUTES
                                    //**********************
                                    var PATH =  path;
                                    var DOMAIN = domain;
                                    var PORT = port;
                                    var ID = id;
                                    var socket = null;
                                    
                                    //**********************
                                    //   PRIVATE METHODS
                                    //**********************
                                    
                                    
                                    var _OnOpenFunc = function(msg){
                                         this.state = socket.readyState;
                                         if(this.Event.onConnect != null){
                                             this.Event.onConnect();
                                         }
                                    }.bind(this);
                                    
                                    var _OnCloseFunc = function(msg){
                                         this.state = socket.readyState;
                                         if(this.Events.onClose != null){
                                             this.Events.onClose();
                                         }
                                    }.bind(this);
                                    
                                    var _OnMessageFunc = function(msg){
                                         this.state = socket.readyState;
                                         if(this.Events.onMessage != null){
                                             this.Events.onMessage();
                                         }
                                    }.bind(this);
                                    
                                    var _OnErrorFunc = function(){
                                         this.state = socket.readyState;
                                         if(this.Events.onError != null){
                                             this.Events.onError();
                                         }
                                    }.bind(this);
                                    
                                    //**********************
                                    //   PUBLIC ATTRIBUTES
                                    //**********************
                                    this.Events = {
                                        onOpen: null,
                                        onMessage: null,
                                        onClose: null,
                                        onError: null
                                    };
                                    
                                    //**********************
                                    //   PUBLIC METHODS
                                    //**********************
                                    
                                    this.GetID = function(){
                                        return ID;
                                    }
                                    
                                    this.Open = function(){
                                         if(socket == null){
                                            socket = new WebSocket("ws://" + DOMAIN + ":" + PORT +"/" + PATH);
                                            this.state = socket.readyState;
                                            
                                            socket.onopen = _OnOpenFunc.bind(this);
                                            socket.onclose = _OnCloseFunc.bind(this);//function(){alert("Socket Closed");};
                                            socket.onmessage = _OnMessageFunc.bind(this);
                                            socket.onerror = _OnErrorFunc.bind(this);
                                            return this.state;
                                         }
                                         else{
                                             return "Already Initialized";
                                         }
                                    };
                                    
                                    this.Close = function(){
                                         socket.close();
                                    };
                                    
                                    this.Send = function(msg){
                                         socket.send(msg);
                                    }
                                    
                                 };

                                return{
                                    //PUBLIC ATTRIBUTES
                                    
                                    //PUBLIC PRIVILEDGE METHODS
                                    
                                    GetName: function(){
                                        return NAME;
                                    },
                                    
                                    GetVersion: function(){
                                        return VERSION;
                                    },
                                    
                                    GetPath: function(){
                                        return PATH;
                                    },
                                    
                                    GetID: function(){
                                        return ID;
                                    },
                                    
                                    Initialize: function(){
                                        
                                    },
                                    
                                    SocketManager:{
                                    
                                        Sockets: os.resschmgr.Create.Map(),
                                        
                                        CreateSocket: function(domain,port,path){
                                        
                                            //Get new ID for socket
                                            var id = (new Date()).getTime();
                                            
                                            //Create new socket
                                            var socket = new CWebSocket(domain, port, path, id);
                                        
                                            //register socket with Socket Manager
                                            this.Sockets.put(id, socket);
                                        
                                            return socket;
                                        }
                                        
                                        
                                    },
                                    Create: {
                                        Socket: function(domain,port,path){
                                            //Get new ID for socket
                                            var id = (new Date()).getTime();
                                            
                                            //Create new socket
                                            var socket = new CWebSocket(domain, port, path, id);
                                        
                                            //register socket with Socket Manager
                                            os.network.SocketManager.Sockets.put(id, socket);
                                        
                                            return socket;
                                        },
                                        SocketIO: function(domain, port, path){
                                            //Get new ID for socket
                                            var id = (new Date()).getTime();
                                            
                                            //Create new socket
                                            var socket = new CSocketIO(domain, port, path, id);
                                        
                                            //register socket with Socket Manager
                                            os.network.SocketManager.Sockets.put(id, socket);
                                        
                                            return socket;
                                        },
                                        JOSServer: function(domain,port,path){
                                            var joss = new CJOSServer();
                                            
                                            //Test to see if socket.io is installed
                                            if(io){
                                                joss.socket = os.network.Create.SocketIO(domain, port, path);
                                            }
                                            else{
                                                joss.socket = os.network.Create.Socket(domain, port, path);
                                            }
                                            
                                            return joss;
                                        }
                                    }
                                    
                                }
                            }
                            
                            return {
                                //OBJECT ACCESSOR
                                Instance: function()
                                {
                                    if(!pInstance)
                                    {
                                        //Instantiate if pInstance does not exist
                                        pInstance = constructor();
                                    }
                                    
                                    return pInstance;
                                }
                            }
                        })();
//JaHOVA OS : Cores : Thread
//      Dependent on JaHOVA OS : Cores

/**h* InternalCores/Network
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p> 
*
*  NAME
*    JaHOVA OS Multithreading Core
*    
*  AUTHOR
*   Corey Clark
*   cclark@coreyclarkphd.com
*
*  HISTORY
*   Created: 8/6/2011
*   
*
*  DESCRIPTION
*     This Singleton holds the Internal JaHOVA OS Multithreading Core
*
*  EXAMPLE
*     network = com.jahova.os.Instance().Cores.Instance().Multithreading.Instance();
*
**/

/*
    Features
    Create Thread
        Delayed Execution - Need Execute Method
        Immediate Execution
    Static Type - loads a .js file
    Dynamic Type, creates a blob
    Conditional Execution
        Only executed after dependencies from other threads have been met
        Paused variable, increment for depencies, decrement when finsihed
        List of pending threads, calls paused variable of dependent thread
    Name assigned by user
    Send new inputs to thread
    Update Callback function of thread
    Create Thread Pool
        Set number of workers for given thread
    Delete Thread
    Set Max Threads
*/
com.jahova.os.Instance().Cores.Instance().Threads = (function()
                        {
                            var pInstance;
                    
                            function constructor()
                            {
                                //
                                //PRIVATE ATTRIBUTES
                                //
                                var NAME = "JaHOVA OS Internal API : Multithreading Core";
                                var VERSION = "0v3";
                                var PATH = "scripts/jahova/OS/Cores/jahova.os.cores.thread.js";
                                var ID = null;
                                
                                var os = com.jahova.os.Instance();
                                var utilities = com.jahova.utilities.Instance();
                                
                                //
                                //  API Specific Private Variables
                                //
                                
                                
                                
                                //
                                //PRIVATE METHODS
                                //
                                
                                //
                                //Private Classes
                                //
                                var CThread = function(Name, Type, Priority, Pool, MaxThreadCount){
                                    this.ID = os.threads.ThreadManager.NextID++;
                                    this.name = Name;
                                    this.type = Type;
                                    this.pool = Pool;
                                    this.frame = null;
                                    this.maxThreadCount = MaxThreadCount;
                                    this.priority = Priority;
                                    this.callbacks = os.resschmgr.Create.Map();
                                }
                                CThread.prototype.Suspend = function(input){
                                    var cmd =  new CCommand();
                                    
                                    cmd.msgType = "SUSPENDTHREAD";
                                    //cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                
                                CThread.prototype.Resume = function(input){
                                    var cmd =  new CCommand();
                                    
                                    cmd.msgType = "RESUMETHREAD";
                                    //cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                
                                CThread.prototype.GetSuspendCount = function(input){
                                    var cmd =  new CCommand();
                                    
                                    cmd.msgType = "GETSUSPENDCOUNT";
                                    //cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                CThread.prototype.Execute = function(input){
                                    var cmd = new CCommand();
                                    
                                    cmd.msgType = "EXECUTETHREAD";
                                    cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                
                                CThread.prototype.SetPriority = function(input){
                                    var cmd = new CCommand();
                                    
                                    cmd.msgType = "SETPRIORITY";
                                    cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                
                                CThread.prototype.GetPriority = function(){
                                    var cmd = new CCommand();
                                    
                                    cmd.msgType = "GETPRIORITY";
                                    //cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                
                                CThread.prototype.AddTask = function(input){
                                    var cmd = new CCommand();
                                    
                                    cmd.msgType = "ADDTASK";
                                    cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                
                                CThread.prototype.GetPendingTask = function(){
                                    var cmd = new CCommand();
                                    
                                    cmd.msgType = "GETPENDINGTASK";
                                    //cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                
                                CThread.prototype.Exit = function(){
                                    var cmd = new CCommand();
                                    
                                    cmd.msgType = "EXITTHREAD";
                                    //cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                
                                CThread.prototype.SetMaxThreadCount = function(input){
                                    var cmd = new CCommand();
                                    
                                    cmd.msgType = "SETMAXTHREADCOUNT";
                                    cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                CThread.prototype.GetFunction = function(){
                                    var cmd = new CCommand();
                                    
                                    cmd.msgType = "GETFUNCTION";
                                    //cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                CThread.prototype.GetCurrentTask = function(){
                                    var cmd = new CCommand();
                                    
                                    cmd.msgType = "GETCURRENTTASK";
                                    //cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                CThread.prototype.GetFilename = function(){
                                    var cmd = new CCommand();
                                    
                                    cmd.msgType = "GETFILENAME";
                                    //cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                CThread.prototype.AddCallback = function(){
                                    
                                };
                                
                                CThread.prototype.RemoveCallback = function(){
                                    
                                };
                                
                                CThread.prototype.GetStatus = function(){
                                    var cmd = new CCommand();
                                    
                                    cmd.msgType = "GETTHREADSTATUS";
                                    //cmd.data = input;
                                    cmd.priority = 0;
                                    cmd.sendTime = (new Date()).getTime();
                                    cmd.osThreadID = this.ID;
                                    
                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                };
                                
                                var CCommand = function(){
                                    this.msgID = os.threads.ThreadManager.NextMessageID++;
                                    this.msgType = "";
                                    this.data = "";
                                    this.priority = "";
                                    this.sendTime = "";
                                    this.deliveryTime = "";
                                    this.osThreadID = "";
                                    this.cntrlThreadID = "";
                                    this.callbackCoreID = "";
                                    this.callbackFunctionID = "";
                                };
                                
                                CCommand.prototype.Serialize = function(){
                                    return JSON.stringify(this);
                                };
                                
                                CCommand.prototype.Parse = function(input){
                                    var temp = JSON.parse(input);
                                    
                                    this.msgID              = temp.msgID;
                                    this.msgType            = temp.msgType;
                                    this.data               = temp.data;
                                    this.priority           = temp.priority;
                                    this.sendTime           = temp.sendTime;
                                    this.deliveryTime       = temp.deliveryTime;
                                    this.osThreadID         = temp.osThreadID;
                                    this.cntrlThreadID      = temp.cntrlThreadID;
                                    this.callbackCoreID     = temp.callbackCoreID;
                                    this.callbackFunctionID = temp.callbackFunctionID;
                                };
                            

                                return{
                                    //PUBLIC ATTRIBUTES
                                    
                                    //PUBLIC PRIVILEDGE METHODS
                                   
                                    GetName: function(){
                                        return NAME;
                                    },
                                    
                                    GetVersion: function(){
                                        return VERSION;
                                    },
                                    
                                    GetPath: function(){
                                        return PATH;
                                    },
                                   
                                    GetID: function(){
                                        return ID;
                                    },
                                    
                                    Initialize: function(){
                                        
                                        //Initialize Thread Manager
                                        this.ThreadManager.Initialize();
                                    },
                                    
                                    //PUBLIC PRIVILEDGE OBJECTS
                                    ThreadManager: {
                                        NextID: 0,
                                        SharedWorkers: false,
                                        NextMessageID: 0,
                                        ThreadController: null,
                                        ThreadControllerPath: null,
                                        SWThreadControllerPath: null,
                                        ThreadPath:null,
                                        ThreadNameMap: null,
                                        ThreadIDMap: null,
                                        ControllerCallbacksMap: null,
                                        ControllerID: -1,
                                        PendingCommandsMap: null,
                                        CommandFunctionsMap: null,
                                        Initialize: function(){
                                            
                                            os.console.AppendComment("Initializing Thread Core")
                                            
                                            //Create Maps
                                            os.console.AppendComment("        Creating Thread Maps");
                                            this.ThreadNameMap = os.resschmgr.Create.Map();
                                            this.ThreadIDMap = os.resschmgr.Create.Map();
                                            this.ControllerCallbacksMap = os.resschmgr.Create.Map();
                                            this.PendingCommandsMap = os.resschmgr.Create.Map();
                                            this.CommandFunctionsMap = os.resschmgr.Create.Map();
                                            
                                            //Set Controller Path
                                            this.ThreadControllerPath = "scripts/jahovaos/threads/jahova.os.cores.thread.controller.js";
                                            this.SWThreadControllerPath = "scripts/jahovaos/threads/jahova.os.cores.thread.swcontroller.js";
                                            os.console.AppendComment("        Path Set: " + this.ThreadControllerPath);
                                            
                                            //Set Dynamic Thread Path
                                            this.ThreadPath = 'scripts/Applications/Threads/jahova.os.cores.thread.dynamic.js'
                                            os.console.AppendComment("        Set Dynamic Thread Path");
                                            
                                            //Testing for Web Worker Support
                                            if(window.Worker)
                                            {
                                                os.console.AppendComment("        Web Workers Supported: true");
                                                //Testing for Shared Worker capability
                                                if(window.SharedWorker)
                                                {
                                                    this.SharedWorkers = true;
                                                }
                                                
                                                os.console.AppendComment("        Shared Workers Supported: " + this.SharedWorkers);
                                                
                                                
                                            }
                                            else
                                            {
                                                os.console.AppendComment("        Web Workers Supported: false");
                                            }
                                            
                                            
                                            
                                            
                                        },
                                        CreateCommand: function(){
                                            return new CCommand();  
                                        },
                                        CreateThread: function(name, type, priority, suspend, callback, filename, input, pool, maxThreadCount){
                                            
                                            var thread = null
                                            
                                            //Verify name does not already exist
                                            if(!this.ThreadNameMap.get(name))
                                            {
                                                //Create Thread Object
                                                thread = new CThread(name, type, priority, pool, maxThreadCount);
                                                
                                                if(callback){thread.callbacks.put(callback, callback);};
                                                
                                                if(this.SharedWorkers)
                                                {
                                                    thread.frame = document.createElement("iframe");
                                                    thread.frame.style.display = "none";
                                                    thread.frame.name = thread.name;
                                                    thread.frame.id = thread.ID;
                                                    document.body.appendChild(thread.frame);
                                                    
                                                    
                                                    var script = document.createElement("script");
                                                    script.type = "text/javascript";
                                                    if(type == "DYNAMIC"){
                                                        script.src = "scripts/Applications/Threads/jahova.os.cores.thread.swdynamic.js";
                                                    }
                                                    else{
                                                        script.src = filename;
                                                    }
                                                    
                                                    thread.frame.contentDocument.head.appendChild(script);
                                                }
                                                
                                                
                                                //Register with the Thread Manager Maps
                                                this.ThreadIDMap.put(thread.ID, thread);
                                                this.ThreadNameMap.put(thread.name, thread);
                                                
                                                // {id, name, type, priority, pooled, maxPooledThreads, suspend, filename, data{func: , input: }}
                                                var data ={
                                                    id: thread.ID,
                                                    name: thread.name,
                                                    type: thread.type,
                                                    priority: thread.priority,
                                                    pooled: thread.pool,
                                                    maxPooledThreads: thread.maxThreadCount,
                                                    suspend: suspend,
                                                    filename: filename,
                                                    data:{
                                                        func: filename,
                                                        input: input
                                                    }
                                                }
                                                //Send CCommand to Thread Controller to create Thread
                                                var cmd = new CCommand();
                                                
                                                cmd.msgType = "CreateThread";
                                                cmd.data = JSON.stringify(data);
                                                cmd.priority = priority;
                                                cmd.sendTime = (new Date()).getTime();
                                                cmd.deliveryTime;
                                                cmd.osThreadID = thread.ID;
                                                cmd.cntrlThreadID = null;
                                                cmd.callbackCoreID = callback;
                                                cmd.callbackFunctionID;
                                                    
                                                this.SendToController(cmd.Serialize());
                                                
                                            }
                                            
                                            return thread;
                                        },
                                        GetActiveThreads: function(){
                                            var cmd = new CCommand();
                                            cmd.msgType = "GETACTIVETHREADS";
                                            cmd.data = "";
                                            cmd.priority = 0;
                                            cmd.sendTime = (new Date()).getTime();
                                            cmd.deliveryTime;
                                            cmd.osThreadID = -1;
                                            cmd.cntrlThreadID = null;
                                            cmd.callbackCoreID = null;
                                            cmd.callbackFunctionID;
                                                
                                            os.threads.ThreadManager.SendToController(cmd.Serialize());
                                        },
                                        ExitThread: function(){
                                            
                                        },
                                        GetFunctionBody: function(func){
                                            var start = func.indexOf("{") + 1;
                                            var end = func.lastIndexOf("}");
                                            
                                            var body = func.slice(start,end);
                                            
                                            return body;
                                        },
                                        GetThreadByName: function(name){
                                            return this.ThreadNameMap.get(name);
                                        },
                                        GetThreadByID: function(){
                                            
                                        },
                                        CreateThreadController: function(callback){
                                            
                                            if(this.ThreadController == null)
                                            {
                                                //os.console.AppendComment("Controller Doesnt Exist");
                                                if(window.Worker)
                                                {   
                                                    os.threads.ThreadManager.ControllerCallbacksMap.put(callback, callback);
                                                    
                                                    //os.console.AppendComment("Workers Exist");
                                                    if(this.SharedWorkers)
                                                    {
                                                        //os.console.AppendComment("Creating Shared Worker");
                                                        this.ThreadController = new SharedWorker(this.SWThreadControllerPath);
                                                        this.ThreadController.port.start();
                                                        this.ThreadController.port.onmessage = this.ProcessControllerRequest;
                                                        this.ThreadController.port.onerror = function(e) {  
                                                            alert("Error in file: "+e.filename+"\nline: "+e.lineno+"\nDescription: "+e.message);  
                                                        };  
                                                        var cmd = new CCommand();
                                                        cmd.msgType = "Start";
                                                        cmd.data = "Thread Core Requesting Controller Initialize";
                                                        
                                                        cmd.osThreadID = -1;
                                                    
                                                        //this.SendToController(cmd.Serialize());
                                                        
                                                    }
                                                    else
                                                    {
                                                        
                                                        //os.console.AppendComment("Creating Nested Worker");
                                                        this.ThreadController = new Worker(this.ThreadControllerPath);
                                                        this.ThreadController.addEventListener('message',this.ProcessControllerRequest ,false);
                                                        this.ThreadController.onerror = function(e) {  
                                                            alert("Error in file: "+e.filename+"\nline: "+e.lineno+"\nDescription: "+e.message);  
                                                        }; 
                                                        var cmd = new CCommand();
                                                        cmd.msgType = "Start";
                                                        cmd.data = "Thread Core Requesting Controller Initialize";
                                                        
                                                        cmd.osThreadID = -1;
                                                    
                                                        this.SendToController(cmd.Serialize());
                                                    }
                                                    
                                                }
                                                else{
                                                    os.console.Comment("");
                                                    os.console.Warning("\nCan not create Thread Controller \nYour Browser Does Not Support Web Workers");
                                                }
                                            }
                                            else
                                            {
                                                os.console.Comment("");
                                                os.console.Warning("Thread Controller already exist");
                                            }
                                        },
                                        SendToController: function(JSONcmd){
                                            if(this.SharedWorkers){os.threads.ThreadManager.ThreadController.port.postMessage(JSONcmd);}
                                            else{os.threads.ThreadManager.ThreadController.postMessage(JSONcmd);}
                                             
                                        },
                                        SharedMemory: {
                                            Get: {
                                                Entry: function(key){
                                                    var cmd = new CCommand();
                                                
                                                    cmd.msgType = "GetSharedMemoryEntry";
                                                    cmd.data = key;
                                                    cmd.priority = "";
                                                    cmd.sendTime = (new Date()).getTime();
                                                    cmd.deliveryTime;
                                                    cmd.osThreadID = os.threads.ThreadManager.ControllerID;
                                                    cmd.cntrlThreadID = null;
                                                    cmd.callbackCoreID = "";
                                                    cmd.callbackFunctionID;
                                                    
                                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                                },
                                                All: function(){
                                                    var cmd = new CCommand();
                                                
                                                    cmd.msgType = "GetSharedMemory";
                                                    cmd.data = "";
                                                    cmd.priority = "";
                                                    cmd.sendTime = (new Date()).getTime();
                                                    cmd.deliveryTime;
                                                    cmd.osThreadID = os.threads.ThreadManager.ControllerID;
                                                    cmd.cntrlThreadID = null;
                                                    cmd.callbackCoreID = "";
                                                    cmd.callbackFunctionID;
                                                    
                                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                                }
                                            },
                                            Set: {
                                                Entry: function(key, value){
                                                    var cmd = new CCommand();
                                                
                                                    cmd.msgType = "SetSharedMemoryEntry";
                                                    cmd.data = {};
                                                    cmd.data.key = key;
                                                    cmd.data.value = value;
                                                    cmd.priority = "";
                                                    cmd.sendTime = (new Date()).getTime();
                                                    cmd.deliveryTime;
                                                    cmd.osThreadID = os.threads.ThreadManager.ControllerID;
                                                    cmd.cntrlThreadID = null;
                                                    cmd.callbackCoreID = "";
                                                    cmd.callbackFunctionID;
                                                    
                                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                                },
                                                All: function(list){
                                                    var cmd = new CCommand();
                                                
                                                    cmd.msgType = "SetSharedMemory";
                                                    cmd.data = list;
                                                    cmd.priority = "";
                                                    cmd.sendTime = (new Date()).getTime();
                                                    cmd.deliveryTime;
                                                    cmd.osThreadID = os.threads.ThreadManager.ControllerID;
                                                    cmd.cntrlThreadID = null;
                                                    cmd.callbackCoreID = "";
                                                    cmd.callbackFunctionID;
                                                    
                                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                                }
                                            },
                                            Update: {
                                                Entry: function(key, property, value){
                                                    var cmd = new CCommand();
                                                
                                                    cmd.msgType = "UpdateSharedMemoryEntry";
                                                    cmd.data = {};
                                                    cmd.data.key = key;
                                                    cmd.data.value = value;
                                                    cmd.data.property = property;
                                                    cmd.priority = "";
                                                    cmd.sendTime = (new Date()).getTime();
                                                    cmd.deliveryTime;
                                                    cmd.osThreadID = os.threads.ThreadManager.ControllerID;
                                                    cmd.cntrlThreadID = null;
                                                    cmd.callbackCoreID = "";
                                                    cmd.callbackFunctionID;
                                                    
                                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                                },
                                                All: function(list){
                                                    var cmd = new CCommand();
                                                
                                                    cmd.msgType = "UpdateSharedMemory";
                                                    cmd.data = list;
                                                    cmd.priority = "";
                                                    cmd.sendTime = (new Date()).getTime();
                                                    cmd.deliveryTime;
                                                    cmd.osThreadID = os.threads.ThreadManager.ControllerID;
                                                    cmd.cntrlThreadID = null;
                                                    cmd.callbackCoreID = "";
                                                    cmd.callbackFunctionID;
                                                    
                                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                                }
                                            },
                                            Remove: {
                                                Entry: function(key){
                                                    var cmd = new CCommand();
                                                
                                                    cmd.msgType = "RemoveSharedMemoryEntry";
                                                    cmd.data = key;
                                                    cmd.priority = "";
                                                    cmd.sendTime = (new Date()).getTime();
                                                    cmd.deliveryTime;
                                                    cmd.osThreadID = os.threads.ThreadManager.ControllerID;
                                                    cmd.cntrlThreadID = null;
                                                    cmd.callbackCoreID = "";
                                                    cmd.callbackFunctionID;
                                                    
                                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                                },
                                                All: function(){
                                                    var cmd = new CCommand();
                                                
                                                    cmd.msgType = "RemoveSharedMemory";
                                                    cmd.data = "";
                                                    cmd.priority = "";
                                                    cmd.sendTime = (new Date()).getTime();
                                                    cmd.deliveryTime;
                                                    cmd.osThreadID = os.threads.ThreadManager.ControllerID;
                                                    cmd.cntrlThreadID = null;
                                                    cmd.callbackCoreID = "";
                                                    cmd.callbackFunctionID;
                                                    
                                                    os.threads.ThreadManager.SendToController(cmd.Serialize());
                                                }
                                            }
                                        },
                                        ProcessControllerRequest: function(e){
                                            //Parse incomming Command
                                            var cmd = new CCommand();
                                            cmd.Parse(e.data);
                                            var thread = os.threads.ThreadManager.ThreadIDMap.get(cmd.osThreadID);
                                            
                                            //Test to see if it is a message from Thread Controller
                                            if(cmd.osThreadID == -1){
                                                var numOfCallbacks = os.threads.ThreadManager.ControllerCallbacksMap.size;
                                                
                                                for(var i = 0; i++ < numOfCallbacks; os.threads.ThreadManager.ControllerCallbacksMap.next())
                                                {
                                                    (os.threads.ThreadManager.ControllerCallbacksMap.value())(cmd);
                                                }
                                                
                                                return;
                                            }
                                            
                                            
                                            
                                            //Test to see if thread exist
                                            else if(thread)
                                            {
                                                var numOfCallbacks = thread.callbacks.size;
                                                if(numOfCallbacks > 0)
                                                {
                                                    for(var i = 0; i++ < numOfCallbacks; thread.callbacks.next())
                                                    {
                                                        (thread.callbacks.value())(cmd);
                                                    }
                                                }
                                                else
                                                {
                                                    os.console.AppendComment("\nNo Callback Assigned For Thread");
                                                    os.console.AppendComment("Message Type: " + cmd.msgType +"\nMessage Data: " + cmd.data);
                                                }
                                            }
                                            else
                                            {
                                                os.console.AppendComment("\nNo Thread Found to Handle Command Callback");
                                                os.console.AppendComment("Message Type: " + cmd.msgType +"\nMessage Data: " + cmd.data);
                                            }
                                            
                                            
                                            //os.console.Comment("");
                                        },
                                        CreateSocket: function(){
                                            var cmd = new CCommand();
                                    
                                            cmd.msgType = "CREATESOCKET";
                                            //cmd.data = input;
                                            cmd.priority = 0;
                                            cmd.sendTime = (new Date()).getTime();
                                            cmd.osThreadID = this.ID;
                                            
                                            os.threads.ThreadManager.SendToController(cmd.Serialize());
                                        },
                                        CloseSocket: function(){
                                            var cmd = new CCommand();
                                    
                                            cmd.msgType = "CLOSESOCKET";
                                            //cmd.data = input;
                                            cmd.priority = 0;
                                            cmd.sendTime = (new Date()).getTime();
                                            cmd.osThreadID = this.ID;
                                            
                                            os.threads.ThreadManager.SendToController(cmd.Serialize());
                                        }
                                        
                                    }
                                    
                                }
                            }
                            
                            return {
                                //OBJECT ACCESSOR
                                Instance: function()
                                {
                                    if(!pInstance)
                                    {
                                        //Instantiate if pInstance does not exist
                                        pInstance = constructor();
                                    }
                                    
                                    return pInstance;
                                }
                            }
                        })();
//JaHOVA OS : Cores : DOM
//      Dependent on JaHOVA OS : Cores

/**h* InternalCores/Network
*  LINKS
* |html <p><a href="http://jahovaos.com/JaHOVA/Documentation/Full/toc_index.html">   Table of Contents </a></p> 
*
*  NAME
*    JaHOVA OS DOM Core
*    
*  AUTHOR
*   Corey Clark
*   cclark@coreyclarkphd.com
*
*  HISTORY
*   Created: 8/62011
*   
*
*  DESCRIPTION
*     This Singleton holds the Internal JaHOVA OS DOM Core
*
*  EXAMPLE
*     network = com.jahova.os.Instance().Cores.Instance().Multithreading.Instance();
*
**/
com.jahova.os.Instance().Cores.Instance().HTML = (function()
                        {
                            var pInstance;
                    
                            function constructor()
                            {
                                //PRIVATE ATTRIBUTES
                                var NAME = "JaHOVA OS Internal API : HTML Core";
                                var VERSION = "0v5";
                                var PATH = "scripts/jahova/OS/Cores/HTML/jahova.os.cores.html.js";
                                var ID = null;
                                
                                var os = com.jahova.os.Instance();
                                var utilities = com.jahova.utilities.Instance();
                                /*
                                 **/
                                //PRIVATE METHODS
                                
                                
                                //Private Classes
                                

                                return{
                                    //PUBLIC ATTRIBUTES
                                    
                                    //PUBLIC PRIVILEDGE METHODS
                                   
                                    GetName: function(){
                                        return NAME;
                                    },
                                    
                                    GetVersion: function(){
                                        return VERSION;
                                    },
                                    
                                    GetPath: function(){
                                        return PATH;
                                    },
                                   
                                    GetID: function(){
                                        return ID;
                                    },
                                    
                                    Initialize: function(){
                                        
                                    }
                                    
                                }
                            }
                            
                            return {
                                //OBJECT ACCESSOR
                                Instance: function()
                                {
                                    if(!pInstance)
                                    {
                                        //Instantiate if pInstance does not exist
                                        pInstance = constructor();
                                    }
                                    
                                    return pInstance;
                                }
                            }
                        })();
com.jahova.os.Instance().Cores.Instance().Windows = (function()
{
    var pInstance;

    function constructor()
    {
        //PRIVATE ATTRIBUTES
        var NAME = "JaHOVA OS Internal API : Windows Core";
        var VERSION = "0v5";
        var PATH = "scripts/jahova/OS/Cores/Windows/jahova.os.cores.windows.js";
        var ID = null;
        
        var os = com.jahova.os.Instance();
        var utilities = com.jahova.utilities.Instance();
        
        //PRIVATE METHODS
        
        
        //Private Classes
        var CWindow = function(windowID, windowTitle, themeName){
            
            var _state = {
                window:    "HIDDEN",
                titlebar:  "VISIBLE",
                menubar:   "VISIBLE",
                toolbar:   "VISIBLE",
                statusbar: "VISIBLE",
                content:   "VISIBLE",
                buttons:   "VISIBLE"
            };
            var _position = {
                top: 0,
                left: 0
            };
            var _title = windowTitle;
            var _id = windowID;
            var _width = null;
            var _height = null;
            
            this.type = null;
            this.theme = null;
            this.menu = null;
            this.isMin = false;
            this.isMax = false;
   
            this.Callbacks = {
                onOpen: null,
                onClose: null,
                onMax: null,
                onMin: null,
                onFocus: null,
                onBlur: null
            };
            
            this.Scope = {
                onOpen: null,
                onClose: null,
                onMax: null,
                onMin: null,
                onFocus: null,
                onBlur: null
            };
            
            this.Hide = {
                    window: function(){
                        this.elements.window.html().style.display = "none";
                        _state.window = "HIDDEN";
                    }.bind(this),
                    titlebar: function(){
                        this.elements.titlebar.html().style.display = "none";
                        _state.titlebar = "HIDDEN";
                        
                        //Set Content Area height
                        var windowHeight = this.elements.window.GetHeight();
                        var titlebarHeight = this.elements.titlebar.GetHeight();
                        var menubarHeight = this.elements.menubar.GetHeight();
                        var statusbarHeight = this.elements.statusbar.GetHeight();
                        var toolbarHeight = this.elements.toolbar.GetHeight();
                        
                        if(this.theme.menubarIntegrated){
                            this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                        }
                        else{
                            this.elements.content.html().style.height = (windowHeight - titlebarHeight - statusbarHeight -  toolbarHeight) + "px";
                        }
                        
                    }.bind(this),
                    menubar:  function(){
                        this.elements.menubar.html().style.display = "none";
                        _state.menubar = "HIDDEN";
                        
                        if(this.theme.menubarIntegrated){
                            //Set Content Area height
                            var windowHeight = this.elements.window.GetHeight();
                            var titlebarHeight = this.elements.titlebar.GetHeight();
                            var menubarHeight = this.elements.menubar.GetHeight();
                            var statusbarHeight = this.elements.statusbar.GetHeight();
                            var toolbarHeight = this.elements.toolbar.GetHeight();
                            this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                        }
                        
                    }.bind(this),
                    toolbar: function(){
                        this.elements.toolbar.html().style.display = "none";
                        _state.toolbar = "HIDDEN";
                        
                        //Set Content Area height
                        var windowHeight = this.elements.window.GetHeight();
                        var titlebarHeight = this.elements.titlebar.GetHeight();
                        var menubarHeight = this.elements.menubar.GetHeight();
                        var statusbarHeight = this.elements.statusbar.GetHeight();
                        var toolbarHeight = this.elements.toolbar.GetHeight();
                        
                        if(this.theme.menubarIntegrated){
                            this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                        }
                        else{
                            this.elements.content.html().style.height = (windowHeight - titlebarHeight - statusbarHeight -  toolbarHeight) + "px";
                        }
                        
                    }.bind(this),
                    statusbar: function(){
                        this.elements.statusbar.html().style.display = "none";
                        _state.statusbar = "HIDDEN";
                        
                        //Set Content Area height
                        var windowHeight = this.elements.window.GetHeight();
                        var titlebarHeight = this.elements.titlebar.GetHeight();
                        var menubarHeight = this.elements.menubar.GetHeight();
                        var statusbarHeight = this.elements.statusbar.GetHeight();
                        var toolbarHeight = this.elements.toolbar.GetHeight();
                        
                        if(this.theme.menubarIntegrated){
                            this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                        }
                        else{
                            this.elements.content.html().style.height = (windowHeight - titlebarHeight - statusbarHeight -  toolbarHeight) + "px";
                        }
                        
                    }.bind(this),
                    content: function(){
                        this.elements.content.html().style.display = "none";
                        _state.content = "HIDDEN";
                    }.bind(this),
                    buttons: function(){
                        this.elements.titlebar.buttons.html().style.display = "none";
                        _state.buttons = "HIDDEN";
                    }.bind(this)
            };
            
            this.Display = {
                window: function(){
                    this.elements.window.html().style.display = "block";
                    _state.window = "VISIBLE";
                    this.MakeActive();
                    
                    //Set Content Area height
                    var windowHeight = this.elements.window.GetHeight();
                    var titlebarHeight = this.elements.titlebar.GetHeight();
                    var menubarHeight = this.elements.menubar.GetHeight();
                    var statusbarHeight = this.elements.statusbar.GetHeight();
                    var toolbarHeight = this.elements.toolbar.GetHeight();
                    
                    if(this.theme.menubarIntegrated){
                        this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                    }
                    else{
                        this.elements.content.html().style.height = (windowHeight - titlebarHeight - statusbarHeight -  toolbarHeight ) + "px";
                    }
                }.bind(this),
                
                titlebar: function(){
                    this.elements.titlebar.html().style.display = "block";
                    _state.titlebar = "VISIBLE";
                    
                    //Set Content Area height
                    var windowHeight = this.elements.window.GetHeight();
                    var titlebarHeight = this.elements.titlebar.GetHeight();
                    var menubarHeight = this.elements.menubar.GetHeight();
                    var statusbarHeight = this.elements.statusbar.GetHeight();
                    var toolbarHeight = this.elements.toolbar.GetHeight();
                    
                    if(this.theme.menubarIntegrated){
                        this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                    }
                    else{
                        this.elements.content.html().style.height = (windowHeight - titlebarHeight - statusbarHeight -  toolbarHeight) + "px";
                    }
                }.bind(this),
                
                menubar:  function(){
                    this.elements.menubar.html().style.display = "block";
                    _state.menubar = "VISIBLE";
                    
                    //Set Content Area height
                    
                    
                    if(this.theme.menubarIntegrated){
                        var windowHeight = this.elements.window.GetHeight();
                        var titlebarHeight = this.elements.titlebar.GetHeight();
                        var menubarHeight = this.elements.menubar.GetHeight();
                        var statusbarHeight = this.elements.statusbar.GetHeight();
                        var toolbarHeight = this.elements.toolbar.GetHeight();
                        this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                    }
                    
                }.bind(this),
                
                toolbar: function(){
                    this.elements.toolbar.html().style.display = "block";
                    _state.toolbar = "VISIBLE";
                    
                    //Set Content Area height
                    var windowHeight = this.elements.window.GetHeight();
                    var titlebarHeight = this.elements.titlebar.GetHeight();
                    var menubarHeight = this.elements.menubar.GetHeight();
                    var statusbarHeight = this.elements.statusbar.GetHeight();
                    var toolbarHeight = this.elements.toolbar.GetHeight();
                    
                    if(this.theme.menubarIntegrated){
                        this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                    }
                    else{
                        this.elements.content.html().style.height = (windowHeight - titlebarHeight - statusbarHeight -  toolbarHeight) + "px";
                    }
                    
                }.bind(this),
                
                statusbar: function(){
                    this.elements.statusbar.html().style.display = "block";
                    _state.statusbar = "VISIBLE";
                    
                    //Set Content Area height
                    var windowHeight = this.elements.window.GetHeight();
                    var titlebarHeight = this.elements.titlebar.GetHeight();
                    var menubarHeight = this.elements.menubar.GetHeight();
                    var statusbarHeight = this.elements.statusbar.GetHeight();
                    var toolbarHeight = this.elements.toolbar.GetHeight();
                    
                    if(this.theme.menubarIntegrated){
                        this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                    }
                    else{
                        this.elements.content.html().style.height = (windowHeight - titlebarHeight - statusbarHeight -  toolbarHeight) + "px";
                    }
                    
                }.bind(this),
                
                content: function(){
                    this.elements.content.html().style.display = "block";
                    _state.content = "VISIBLE";
                    
                    
                }.bind(this),
                buttons: function(){
                    this.elements.titlebar.buttons.html().style.display = "block";
                    _state.buttons = "VISIBLE";
                }.bind(this)
            };
            
            this.Get = {
                State: {
                    window: function(){
                        return _state.window;
                    },
                    titlebar: function(){
                        return _state.titlebar;
                    },
                    menubar: function(){
                        return _state.menubar;
                    },
                    toolbar: function(){
                        return _state.toolbar;
                    },
                    statusbar: function(){
                        return _state.statusbar;
                    },
                    content: function(){
                        return _state.content;
                    }  
                },
                theme: function(){
                    return this.theme;
                }.bind(this),
                
                id: function(){
                    return _id;
                },
                position: function(){
                    return {top: _position.top,
                            left: _position.left};
                },
                title: function(){
                    return _title;
                } 
            };
            
            this.Set = {
                position: function(iTop, iLeft){
                    _position.top = iTop;
                    _position.left = iLeft;
                    
                    this.elements.window.html().style.top = iTop + "px";
                    this.elements.window.html().style.left = iLeft + "px";
                    
                }.bind(this),
                
                width: function(iWidth){
                    
                    _width = iWidth;
                    this.elements.window.html().style.width = _width + "px";
                    
                }.bind(this),
                
                height: function(iHeight){
                    
                    _height = iHeight;
                    this.elements.window.html().style.height = _height + "px";
                    
                    //Set Content Area height
                    var windowHeight = this.elements.window.GetHeight();
                    var titlebarHeight = this.elements.titlebar.GetHeight();
                    var menubarHeight = this.elements.menubar.GetHeight();
                    var statusbarHeight = this.elements.statusbar.GetHeight();
                    var toolbarHeight = this.elements.toolbar.GetHeight();
                    
                    if(this.theme.menubarIntegrated){
                        this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                    }
                    else{
                        this.elements.content.html().style.height = (windowHeight - titlebarHeight - statusbarHeight -  toolbarHeight) + "px";
                    }
                    
                }.bind(this),
                
                title: function(sTitle){
                    
                    _title = sTitle;
                    this.elements.titlebar.text.html().innerHTML = _title;
                    
                }.bind(this),
                
                statusbarText: function(sStatus){
                    this.elements.statusbar.text.html().innerHTML = sStatus;
                    
                }.bind(this),
                
                theme:function(sThemeName){
                    this.LoadTheme(sThemeName);
                }.bind(this),
                
                onOpen: function(fName, scope){
                    
                    this.Callbacks.onOpen = fName;
                    this.Scope.onOpen = scope;
                    
                }.bind(this),
                
                onClose: function(fName, scope){
                    
                    this.Callbacks.onClose = fName;
                    this.Scope.onClose = scope;
                    
                }.bind(this),
                
                onMin: function(fName, scope){
                    
                    this.Callbacks.onMin = fName;
                    this.Scope.onMin = scope;
                    
                }.bind(this),
                
                onMax: function(fName, scope){
                    
                    this.Callbacks.onMax = fName;
                    this.Scope.onMax = scope;
                    
                }.bind(this),
                
                onFocus: function(fName, scope){
                    
                    this.Callbacks.onFocus = fName;
                    this.Scope.onFocus = scope;
                    
                }.bind(this),
                
                onBlur: function(fName, scope){
                    
                    this.Callbacks.onBlur = fName;
                    this.Scope.onBlur = scope;
                    
                }.bind(this)
            }
            var _Events = {
                onOpen: function(e){
                    
                    //Call user defined function if exist
                    if(this.Callbacks.onOpen){
                        
                        if(this.Scope.onOpen){
                            
                            this.Callbacks.onOpen.apply(this.Scope.onOpen, [e]);
                            
                        }
                        else{
                            
                            this.Callbacks.onOpen(e);
                            
                        }
                    }
                    
                    //Calling OS related code....
                    
                    
                }.bind(this),
                
                onClose: function(e){
                                        
                    //Calling OS related code....
                    os.windows.WindowsManager.Windows.remove(ID);
                    document.body.removeChild(this.elements.window.html());
                    
                    //Call user defined function if exist
                    if(this.Callbacks.onClose){
                        
                        if(this.Scope.onClose){
                            
                            this.Callbacks.onClose.apply(this.Scope.onClose, [e]);
                            
                        }
                        else{
                            
                            this.Callbacks.onClose(e);
                            
                        }
                    }
                                        
                                        
                }.bind(this),
                
                onMin: function(e){
                    
                    
                    
                    //Calling OS related code....
                    if(!this.isMin){
                        
                        this.Hide.content();
                        this.Hide.statusbar();
                        this.Hide.menubar();
                        this.Hide.buttons();
                        this.elements.titlebar.Class.ClearAll();
                        this.elements.titlebar.Class.Add(this.theme.Class.titlebarMinimized);

                        this.elements.window.Class.ClearAll();
                        this.elements.window.Class.Add(this.theme.Class.windowMinimized);
                        
                        this.elements.window.html().style.width = "150px";
                        this.elements.window.html().style.height = "25px";
                        
                        this.elements.titlebar.html().onclick = _Events.onMin;
                        
                        //Does Desktop Exist
                        if(os.windows.Desktop.Get.state.desktop() == "VISIBLE"){
                            this.elements.window.html().style.top = "";
                            this.elements.window.html().style.left = "";
                            os.windows.Desktop.Elements.dock.AppendChild(this.elements.window.html());
                            
                        }
                        //No desktop, minimize at spot
                        else{
                            this.elements.window.html().style.position = "absolute";
                        }
                        
                        this.isMin = true;
                        if(e){e.stopPropagation();}
                        
                        
                    }
                    else{
                        
                        this.Display.content();
                        
                        
                        this.Display.statusbar();
                        
                        if(_state.menubar == "VISIBLE")
                            this.Display.menubar();
                        
                        this.Display.buttons();
                        
                        this.elements.titlebar.Class.ClearAll();
                        this.elements.titlebar.Class.Add(this.theme.Class.titlebar);
                        
                        this.elements.window.Class.ClearAll();
                        this.elements.window.Class.Add(this.theme.Class.window);
                        this.Set.position(_position.top, _position.left);
                        this.Set.width(_width);
                        this.Set.height(_height);
                        
                        this.elements.titlebar.html().onclick = "";
                        
                        if(os.windows.Desktop.Get.state.desktop() == "VISIBLE"){
                            
                            document.body.appendChild(this.elements.window.html());
                        }
                        
                        //Set Content Area height
                        var windowHeight = this.elements.window.GetHeight();
                        var titlebarHeight = this.elements.titlebar.GetHeight();
                        var menubarHeight = this.elements.menubar.GetHeight();
                        var statusbarHeight = this.elements.statusbar.GetHeight();
                        var toolbarHeight = this.elements.toolbar.GetHeight();
                        if(this.theme.menubarIntegrated){
                            this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                        }
                        else{
                            this.elements.content.html().style.height = (windowHeight - titlebarHeight - statusbarHeight -  toolbarHeight) + "px";
                        }
                        this.isMin= false;
                        if(e){e.stopPropagation();}
                        
                    }
                    
                    //Call user defined function if exist
                    if(this.Callbacks.onMin){
                        
                        if(this.Scope.onMin){
                            
                            this.Callbacks.onMin.apply(this.Scope.onMin, [e]);
                            
                        }
                        else{
                            
                            this.Callbacks.onMin(e);
                            
                        }
                    }                    
                    
                }.bind(this),
                
                onMax: function(e){
                    
                    
                    
                    //Calling OS related code....
                    if(!this.isMax){
                        this.isMax = true;
                        
                        
                        this.elements.window.Class.ClearAll();
                        this.elements.window.Class.Add(this.theme.Class.windowMaximized);
                        
                        this.elements.window.html().style.left = "0px";
                        this.elements.window.html().style.width = "";
                        
                        
                        
                        var dockHeight = os.windows.Desktop.Elements.dock.html().clientHeight;
                        var windowHeight = this.elements.window.GetHeight();
                        var titlebarHeight = this.elements.titlebar.GetHeight();
                        var menubarHeight = this.elements.menubar.GetHeight();
                        var statusbarHeight = this.elements.statusbar.GetHeight();
                        var toolbarHeight = this.elements.toolbar.GetHeight();
                        
                        if(this.theme.menubarIntegrated){
                            this.elements.content.html().style.height = (window.innerHeight - dockHeight - titlebarHeight - statusbarHeight - menubarHeight - toolbarHeight) + "px";
                            this.elements.window.html().style.height = (window.innerHeight - dockHeight) + "px";
                            this.elements.window.html().style.top = "0px";
                        }
                        else{
                            this.elements.content.html().style.height = (window.innerHeight - dockHeight - titlebarHeight - statusbarHeight - toolbarHeight) + "px";
                            this.elements.window.html().style.height = (window.innerHeight - dockHeight - menubarHeight) + "px";
                            this.elements.window.html().style.top = "20px";
                        }
                        
                        if(e){e.stopPropagation();}
                    }
                    else{
                        this.isMax = false;
                        this.elements.window.Class.ClearAll();
                        this.elements.window.Class.Add(this.theme.Class.window);
                        this.elements.window.html().style.height = _height + "px";
                        this.Set.position(_position.top, _position.left);
                        this.Set.width(_width);
                        this.Set.height(_height);
                        
                        var windowHeight = this.elements.window.GetHeight();
                        var titlebarHeight = this.elements.titlebar.GetHeight();
                        var menubarHeight = this.elements.menubar.GetHeight();
                        var statusbarHeight = this.elements.statusbar.GetHeight();
                        var toolbarHeight = this.elements.toolbar.GetHeight();
                        if(this.theme.menubarIntegrated){
                            this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
                        }
                        else{
                            this.elements.content.html().style.height = (windowHeight - titlebarHeight - statusbarHeight -  toolbarHeight) + "px";
                        }
                        if(e){e.stopPropagation();}
                    }
                    
                    //Call user defined function if exist
                    if(this.Callbacks.onMax){
                        
                        if(this.Scope.onMax){
                            
                            this.Callbacks.onMax.apply(this.Scope.onMax, [e]);
                            
                        }
                        else{
                            
                            this.Callbacks.onMax(e);
                            
                        }
                    }
                }.bind(this),
                
                onFocus: function(e){
                    
                    //Call user defined function if exist
                    if(this.Callbacks.onFocus){
                        
                        if(this.Scope.onFocus){
                            
                            this.Callbacks.onFocus.apply(this.Scope.onFocus, [e]);
                            
                        }
                        else{
                            
                            this.Callbacks.onFocus(e);
                            
                        }
                    }
                    
                    //Calling OS related code....
                    
                }.bind(this),
                
                onBlur: function(e){

                    //Calling OS related code....
                    this.elements.window.html().onclick = this.MakeActive;
                    this.elements.window.html().style.zIndex = 20;
                    
                    //Hide menubar if not integrated
                    if(!this.theme.menubarIntegrated){
                        this.Hide.menubar();
                    }
                    
                    //Call user defined function if exist
                    if(this.Callbacks.onBlur){
                        
                        if(this.Scope.onBlur){
                            
                            this.Callbacks.onBlur.apply(this.Scope.onBlur, [e]);
                            
                        }
                        else{
                            
                            this.Callbacks.onBlur(e);
                            
                        }
                    }
                    
                }.bind(this)
            }
            this.MakeActive = function(e){
                
                _Events.onFocus();
                
                if(os.windows.WindowsManager.ActiveWindow && (os.windows.WindowsManager.ActiveWindow != this)){
                   
                    os.windows.WindowsManager.ActiveWindow.Blur();
                   
                }
                os.windows.WindowsManager.ActiveWindow = this;
                this.elements.window.html().onclick = "";
                this.elements.window.html().style.zIndex = 25;
                
                //Hide menubar if not integrated
                if(!this.theme.menubarIntegrated){
                    if(_state.menubar == "VISIBLE")
                    this.Display.menubar();
                }
                
                
            }.bind(this);
            
            this.Blur = function(){
                _Events.onBlur();
            }.bind(this);
            
            this.Maximize = function(){
                _Events.onMax();
            };
            
            this.Minimize = function(){
                _Events.onMin();
            };
            this.LoadTheme = function(themeName){
                //Theme Name was supplied
                if(themeName){
                    this.theme = os.windows.WindowsManager.Themes.get(themeName)
                    
                    //verify Theme was found
                    if(!this.theme){
                        alert(themeName + " Window Theme was not found");
                    }
                    
                }
                //default to Mac Theme
                else{
                    
                    this.theme = os.windows.WindowsManager.Themes.get("Mac");
                }
                
                
                //
                //  Set Theme classes to Window Elements
                //
                
                //Clear Existing classes
                ClearThemeClasses();
                
                //Set Classes
                this.elements.window.Class.Add(this.theme.Class.window);
                this.elements.titlebar.Class.Add(this.theme.Class.titlebar);
                this.elements.menubar.Class.Add(this.theme.Class.menubar);
                this.elements.toolbar.Class.Add(this.theme.Class.toolbar);
                this.elements.statusbar.Class.Add(this.theme.Class.statusbar);
                this.elements.content.Class.Add(this.theme.Class.content);
                this.elements.titlebar.text.Class.Add(this.theme.Class.titlebarText);
                this.elements.titlebar.buttons.Class.Add(this.theme.Class.titlebarButtonContainer);
                this.elements.titlebar.buttons.max.Class.Add(this.theme.Class.titlebarButtonMax);
                this.elements.titlebar.buttons.min.Class.Add(this.theme.Class.titlebarButtonMin);
                this.elements.titlebar.buttons.close.Class.Add(this.theme.Class.titlebarButtonClose);
                this.elements.statusbar.text.Class.Add(this.theme.Class.statusbarText);
                this.elements.window.html().id = _id;
                
                //Set Default Window Postion
                this.Set.position(this.theme.Position.top, this.theme.Position.left)
                
                //Set Default Width/Height
                this.Set.width(this.theme.width);
                this.Set.height(this.theme.height);
                
                
                
                
            };
            
            var ClearThemeClasses = function(){
                //Top Level
                this.elements.window.Class.ClearAll();
                this.elements.titlebar.Class.ClearAll();
                this.elements.menubar.Class.ClearAll();
                this.elements.toolbar.Class.ClearAll();
                this.elements.statusbar.Class.ClearAll();
                this.elements.content.Class.ClearAll();
                this.elements.titlebar.text.Class.ClearAll();
                this.elements.titlebar.buttons.Class.ClearAll();
                this.elements.titlebar.buttons.max.Class.ClearAll();
                this.elements.titlebar.buttons.min.Class.ClearAll();
                this.elements.titlebar.buttons.close.Class.ClearAll();
                this.elements.statusbar.text.Class.ClearAll();

            }.bind(this);

            //
            //HTML Elements
            //
            
            //Top Level
            this.elements = {
                window: os.resschmgr.Create.HTMLElement("div"),
                titlebar: os.resschmgr.Create.HTMLElement("div"),
                menubar: os.resschmgr.Create.HTMLElement("div"),
                toolbar: os.resschmgr.Create.HTMLElement("div"),
                statusbar: os.resschmgr.Create.HTMLElement("div"),
                content: os.resschmgr.Create.HTMLElement("div")
            }
            
            //Title Bar
            this.elements.titlebar.text = os.resschmgr.Create.HTMLElement("div");
            this.elements.titlebar.buttons = os.resschmgr.Create.HTMLElement("div");
            this.elements.titlebar.buttons.max = os.resschmgr.Create.HTMLElement("div");
            this.elements.titlebar.buttons.min = os.resschmgr.Create.HTMLElement("div");
            this.elements.titlebar.buttons.close = os.resschmgr.Create.HTMLElement("div");
            
            //Menu Bar
            this.elements.menubar.children = os.resschmgr.Create.Map();
            
            //Tool Bar
            this.elements.toolbar.children = os.resschmgr.Create.Map();
            
            //Status Bar
            this.elements.statusbar.text = os.resschmgr.Create.HTMLElement("div");
            
            //
            //  Begin Window Initialization
            //
            this.LoadTheme(themeName);
            
            
            
            //Set Title Bar Title
            if(_title)
                this.elements.titlebar.text.html().innerHTML = _title;
            
            //Set ID's
            this.elements.window.html().id =                    _id;
            this.elements.titlebar.html().id =                  _id;
            this.elements.menubar.html().id =                   _id;
            this.elements.toolbar.html().id =                   _id;
            this.elements.statusbar.html().id =                 _id;
            this.elements.content.html().id =                   _id;
            this.elements.titlebar.text.html().id =             _id;
            this.elements.titlebar.buttons.html().id =          _id;
            this.elements.titlebar.buttons.max.html().id =      _id;
            this.elements.titlebar.buttons.min.html().id =      _id;
            this.elements.titlebar.buttons.close.html().id =    _id;
            this.elements.statusbar.text.html().id =            _id;
            
            //Set Callbacks
            this.elements.titlebar.buttons.max.html().onclick =      _Events.onMax;
            this.elements.titlebar.buttons.min.html().onclick =      _Events.onMin;
            this.elements.titlebar.buttons.close.html().onclick =    _Events.onClose;
            this.elements.titlebar.html().onmousedown = os.windows.WindowsManager.BeginDrag;
                
            //***************************
            //      CONNECT ELEMENTS
            //***************************
                
            //Build Title Bar
            this.elements.titlebar.buttons.AppendChild(this.elements.titlebar.buttons.close.html());
            this.elements.titlebar.buttons.AppendChild(this.elements.titlebar.buttons.min.html());
            this.elements.titlebar.buttons.AppendChild(this.elements.titlebar.buttons.max.html());
            this.elements.titlebar.AppendChild(this.elements.titlebar.buttons.html());
            this.elements.titlebar.AppendChild(this.elements.titlebar.text.html());
            
            //Build Status Bar
            this.elements.statusbar.AppendChild(this.elements.statusbar.text.html());
            
            this.elements.window.AppendChild(this.elements.titlebar.html());
            this.elements.window.AppendChild(this.elements.menubar.html());
            this.elements.window.AppendChild(this.elements.toolbar.html());
            this.elements.window.AppendChild(this.elements.content.html());
            this.elements.window.AppendChild(this.elements.statusbar.html());
            
            //Attach to document
            document.body.appendChild(this.elements.window.html());
            
            
            //Set Content Area height
            var windowHeight = this.elements.window.GetHeight();
            var titlebarHeight = this.elements.titlebar.GetHeight();
            var menubarHeight = this.elements.menubar.GetHeight();
            var statusbarHeight = this.elements.statusbar.GetHeight();
            var toolbarHeight = this.elements.toolbar.GetHeight();
            
            if(this.theme.menubarIntegrated){
                this.elements.content.html().style.height = (windowHeight - titlebarHeight - menubarHeight - statusbarHeight -  toolbarHeight) + "px";
            }
            else{
                this.elements.content.html().style.height = (windowHeight - titlebarHeight - statusbarHeight -  toolbarHeight) + "px";
            }
            
            //Default Window to be hidden
            this.Hide.window();
            
            //Registar with Windows Manager
            os.windows.WindowsManager.Windows.put(windowID, this);
            
            
        };
        
        var CWindowTheme = function(sName){
            this.type = null;
            this.name = sName;
            this.url = null;
            this.menubarIntegrated = null;
            this.Class = {
                window: null,
                windowMinimized: null,
                windowMaximized: null,
                titlebar: null,
                titlebarText: null,
                titlebarButtonContainer: null,
                titlebarButtonMax: null,
                titlebarButtonMin:null,
                titlebarButtonClose: null,
                titlebarMinimized: null,
                menubar: null,
                menubarElement: null,
                toolbar: null,
                toolbarElement: null,
                content: null,
                statusbar: null,
                statusbarText: null
            };
            
            this.Position = {
                top: 0,
                left: 0
            };
            
            this.width = 400;
            this.height = 300;
            this.resizable = false;
            
        };
        
                
        var CMenuElement = function(){
            this.SetHTML("div");
            this.children = [];
            this.theme = null;
            this.onClickScope = null;
            this.onClick = null;
            
            this.AddChild = function(){
                
            };
        };
        CMenuElement.inherits(os.resschmgr.CHTMLElement);
        
        var CToolbarElement = function(){
            this.SetHTML("div");
            this.imageURL = null;
            this.theme = null;
            this.tooltipText = null;
            this.tooltipEnabled = false;
            this.onClickScope = null;
            this.onClick = null;
        };
        CToolbarElement.inherits(os.resschmgr.CHTMLElement);
        
        var CDesktopTheme = function(sName){ 
            this.name = sName;
            this.url = null;
            this.Class = {
                desktop: null,
                dock: null,
                startButton: null,
                startButtonText: null,
                startMenu: null,
                application: null
            };
            
            
        };
        
        var CApplication = function(id){
            this.SetHTML("div");
            
            var _displayText = null;
            var _tooltipText = null;
            var _tooltipEnabled = false;
            var _imageURL = null;
            var _theme = null;
            var _id = id;
            var _onClick = function(e){
                //Call user defined function if exist
                if(this.onClick){
                    
                    if(this.onClickScope){
                        
                        this.onClick.apply(this.onClickScope, [e]);
                        
                    }
                    else{
                        
                        this.onClick(e);
                        
                    }
                }
                
                //Calling OS related code....
                
                
            }.bind(this);
            
            this.onClickScope = null;
            this.onClick = null;
            
            this.Get ={
                ID: function(){
                    return _id;
                }.bind(this),
                
                DisplayText: function(){
                    
                }.bind(this),
                
                TooltipText: function(){
                    
                }.bind(this),
                
                Callback: function(){
                    
                }.bind(this),
                
                Image: function(){
                    
                }.bind(this)
            }
            
            this.Set = {
                DisplayText: function(sDisplayText){
                    
                    this.html().innerHTML = sDisplayText;
                    _displayText = sDisplayText;
                    
                }.bind(this),
                
                TooltipText: function(){
                    
                }.bind(this),
                
                Callback: function(func, scope){
                    this.onClick = func;
                    if(scope){
                        this.onClickScope = scope;
                    }
                }.bind(this),
                
                Image: function(){
                    
                }.bind(this),
                
                Theme: function(theme){
                    
                    _theme = theme;
                    this.Class.ClearAll();
                    this.Class.Add(theme.Class.application);
                    
                }.bind(this)
            };
            
            this.EnableTooltip = function(){
                
            };
            
            this.DisableTooltip = function(){
                
            };
            
            this.html().onclick = _onClick;
            os.windows.Desktop.Applications.put(id, this);
            
            
        };
        CApplication.inherits(os.resschmgr.CHTMLElement);

        return{
            //PUBLIC OBJECTS
            Create: {
                Window: function(wndTitle, themeName){
                    return new CWindow("jahova.window.id." + os.windows.WindowsManager.nextID++, wndTitle, themeName);
                },
                ErrorWindow: function(wndTitle, message){
                    var width = 400;
                    var height = 100;
                    macWin = os.windows.Create.Window("ERROR: " + wndTitle, "PC");
                    
                    macWin.elements.content.html().innerHTML = message;
                    
                    macWin.elements.content.html().style.backgroundImage = "none";
                    
                    macWin.Set.width(width);
                    macWin.Set.height(height);
                    macWin.Set.position((window.innerHeight/2) - (height / 2), (window.innerWidth / 2) - (width / 2));
                    
                    macWin.Hide.statusbar();
                    macWin.Hide.menubar();
                    macWin.Hide.toolbar();
                    
                    macWin.Display.window();
                    
                        
                },
                MessageWindow: function(wndTitle, message){
                    var width = 400;
                    var height = 100;
                    macWin = os.windows.Create.Window(" " + wndTitle, "PC");
                    
                    macWin.elements.content.html().innerHTML = message;
                    
                    macWin.elements.content.html().style.backgroundImage = "none";
                    
                    macWin.Set.width(width);
                    macWin.Set.height(height);
                    macWin.Set.position((window.innerHeight/2) - (height / 2), (window.innerWidth / 2) - (width / 2));
                    
                    macWin.Hide.statusbar();
                    macWin.Hide.menubar();
                    macWin.Hide.toolbar();
                    
                    macWin.Display.window();
                    
                        
                },
                Theme: function(name){
                    var theme = new CWindowTheme(name);
                    os.windows.WindowsManager.Themes.put(name, theme);
                    return theme;
                },
                MenuElement: function(){
                    return new CMenuElement();
                },
                ToolbarElement: function(){
                    return new CToolbarElement();
                }
            },
            WindowsManager: {
                nextID: 0,
                Windows: null,
                Themes: null,
                BuildDefaultThemes: function(){
                    //
                    //      Build PC Theme
                    //
                    var pcTheme = new os.windows.Create.Theme("PC");
                    pcTheme.menubarIntegrated = true;
                    pcTheme.type = "STD";
                    pcTheme.url = os.GetDomain + "styles/jahova.window.pc.css";
                    pcTheme.Position.top = 50;
                    pcTheme.Position.left = 50;
                    pcTheme.Class.window = "pcWindow";
                    pcTheme.Class.windowMinimized = "pcWindowMinimized";
                    pcTheme.Class.windowMaximized = "pcWindowMaximized";
                    pcTheme.Class.titlebar = "pcTitlebar";
                    pcTheme.Class.titlebarText = "pcTitlebarText";
                    pcTheme.Class.titlebarButtonContainer = "pcButtonContainer";
                    pcTheme.Class.titlebarButtonMax = "pcButtonMax";
                    pcTheme.Class.titlebarButtonMin = "pcButtonMin";
                    pcTheme.Class.titlebarButtonClose = "pcButtonClose";
                    pcTheme.Class.titlebarMinimized = "pcTitlebarMinimized";
                    pcTheme.Class.menubar = "pcMenubar";
                    pcTheme.Class.menubarElement = "pcMenubarElement";
                    pcTheme.Class.toolbar = "pcToolbar";
                    pcTheme.Class.toolbarElement = "pcToolbarElement";
                    pcTheme.Class.content = "pcContent";
                    pcTheme.Class.statusbar = "pcStatusbar";
                    pcTheme.Class.statusbarText = "pcStatusbarText";
                    
                    //save theme
                    os.windows.WindowsManager.Themes.put(pcTheme.name, pcTheme);
                    
                    //
                    //      Build Mac Theme
                    //
                    var macTheme = os.windows.Create.Theme("Mac");
                    macTheme.type = "STD";
                    macTheme.menubarIntegrated = false;
                    macTheme.url = os.GetDomain + "styles/jahova.window.mac.css";
                    macTheme.Position.top = 50;
                    macTheme.Position.left = 50;
                    macTheme.Class.window = "macWindow";
                    macTheme.Class.windowMinimized = "macWindowMinimized";
                    macTheme.Class.windowMaximized = "macWindowMaximized";
                    macTheme.Class.titlebar = "macTitlebar";
                    macTheme.Class.titlebarText = "macTitlebarText";
                    macTheme.Class.titlebarButtonContainer = "macButtonsContainer";
                    macTheme.Class.titlebarButtonMax = "macButtonMax";
                    macTheme.Class.titlebarButtonMin = "macButtonMin";
                    macTheme.Class.titlebarButtonClose = "macButtonClose";
                    macTheme.Class.titlebarMinimized = "macTitlebarMinimized";
                    macTheme.Class.menubar = "macMenubar";
                    macTheme.Class.menubarElement = "macMenubarElement";
                    macTheme.Class.toolbar = "macToolbar";
                    macTheme.Class.toolbarElement = "macToolbarElement";
                    macTheme.Class.content = "macContent";
                    macTheme.Class.statusbar = "macStatusbar";
                    macTheme.Class.statusbarText = "macStatusbarText";
                    
                    //save theme
                    os.windows.WindowsManager.Themes.put("Mac", macTheme);
                    
                    
                },
                ActiveWindow: null,
                Create: {
                    Window: function(wndTitle, themeName){
                        return new CWindow("jahova.window.id." + os.windows.WindowsManager.nextID++, wndTitle, themeName);
                    },
                    Theme: function(name){
                        var theme = new CWindowTheme(name);
                        os.windows.WindowsManager.Themes.put(name, theme);
                        return theme;
                        
                    },
                    MenuElement: function(){
                        return new CMenuElement();
                    },
                    ToolbarElement: function(){
                        return new CToolbarElement();
                    }
                    
                },
                BeginDrag: function(e){
                    var obj = os.windows.WindowsManager.Windows.get(e.target.id);
                    
                    if(obj){
                        
                        if(os.windows.WindowsManager.ActiveWindow){
                            os.windows.WindowsManager.ActiveWindow.elements.window.html().zIndex = 20;
                        }
                        
                        obj.MakeActive();
                        
                        document.addEventListener("mousemove", os.windows.WindowsManager.DragStart, false);
                        document.addEventListener("mouseup", os.windows.WindowsManager.DragStop, false);
                        
                        obj.startX = e.clientX + window.scrollX;
                        obj.startY = e.clientY + window.scrollY;
                        
                        obj.startTop = obj.Get.position().top;
                        obj.startLeft = obj.Get.position().left;
                        
                    }
                    e.preventDefault();
                },
                DragStart: function(e){
                    var object = os.windows.WindowsManager.ActiveWindow;
                    var x,y;
                    
                    x = e.clientX + window.scrollX;
                    y = e.clientY + window.scrollY;
                    
                    if(object){
                        
                        object.Set.position((object.startTop  + y - object.startY), (object.startLeft + x - object.startX) );
                        
                    }

                    e.preventDefault();
                },
                DragStop: function(e){
                    var object = os.windows.WindowsManager.ActiveWindow;
                    if(object){
                        document.removeEventListener("mousemove", os.windows.WindowsManager.DragStart,false);
                        document.removeEventListener("mouseup", os.windows.WindowsManager.DragStop, false);
                    }
                    
                    e.preventDefault();
                },
                BeginResize: function(e){
                    
                },
                ResizeStart: function(e){
                    
                },
                ResizeStop: function(e){
                    
                }
                
            },
            
            Desktop: {
                Themes: null,
                Applications: null,
                nextID: 0,
                theme: null,
                _state: {
                    desktop: null,
                    dock: null,
                    startButton: null,
                    startButtonText: null,
                    startMenu: null
                },
                Get: {
                    state: {
                        desktop: function(){
                            return os.windows.Desktop._state.desktop;
                        },
                        dock: function(){
                            return os.windows.Desktop._state.dock;
                        },
                        startButton: function(){
                            return os.windows.Desktop._state.startButton;
                        },
                        startButtonText: function(){
                            return os.windows.Desktop._state.startButtonText;
                        },
                        startMenu: function(){
                            return os.windows.Desktop._state.startMenu;
                        }
                    }
                },
                Create: {
                    Theme: function(name){
                        
                        var theme = new CDesktopTheme(name);
                        os.windows.Desktop.Themes.put(name, theme);
                        return theme;
                    },
                    Application: function(){
                        return new CApplication(os.windows.Desktop.nextID++);
                    }
                },
                Display: {
                    desktop: function(){
                        os.windows.Desktop.Elements.desktop.html().style.display = "block";
                        os.windows.Desktop._state.desktop = "VISIBLE";
                    },
                    dock: function(){
                        os.windows.Desktop.Elements.dock.html().style.display = "block";
                        os.windows.Desktop._state.dock = "VISIBLE";
                    },
                    startButton: function(){
                        os.windows.Desktop.Elements.startButton.html().style.display = "block";
                        os.windows.Desktop._state.startButton = "VISIBLE";
                    },
                    startButtonText: function(){
                        os.windows.Desktop.Elements.startButtonText.html().style.display = "block";
                        os.windows.Desktop._state.startButtonText = "VISIBLE";
                    },
                    startMenu: function(){
                        os.windows.Desktop.Elements.startMenu.html().style.display = "block";
                        os.windows.Desktop._state.startMenu = "VISIBLE";
                    }
                },
                Hide: {
                    desktop: function(){
                        os.windows.Desktop.Elements.desktop.html().style.display = "none";
                        os.windows.Desktop._state.desktop = "HIDDEN";
                    },
                    dock: function(){
                        os.windows.Desktop.Elements.dock.html().style.display = "none";
                        os.windows.Desktop._state.dock = "HIDDEN";
                    },
                    startButton: function(){
                        os.windows.Desktop.Elements.startButton.html().style.display = "none";
                        os.windows.Desktop._state.startButton = "HIDDEN";
                    },
                    startButtonText: function(){
                        os.windows.Desktop.Elements.startButtonText.html().style.display = "none";
                        os.windows.Desktop._state.startButtonText = "HIDDEN";
                    },
                    startMenu: function(){
                        os.windows.Desktop.Elements.startMenu.html().style.display = "none";
                        os.windows.Desktop._state.startMenu = "HIDDEN";
                    }
                },
                Set: {

                },
                BuildDefaultTheme: function(){
                    var jDesktop = os.windows.Desktop.Create.Theme("default");
                    
                    jDesktop.url = os.GetDomain + "styles/jahova.window.desktop.css";
                    jDesktop.Class.desktop =           "jDesktop";
                    jDesktop.Class.dock =              "jDock";
                    jDesktop.Class.startButton =       "jStartButton";
                    jDesktop.Class.startButtonText =   "jStartButtonText";
                    jDesktop.Class.startMenu =         "jStartMenu";
                    jDesktop.Class.application =       "jApplication";
                
                },
                AddApplication: function(app){
                    
                    app.Set.Theme(os.windows.Desktop.theme);
                    os.windows.Desktop.Elements.startMenu.AppendChild(app.html());
                },
                RemoveApplication: function(){
                    
                },
                LoadTheme: function(theme){
                    //Set Theme 
                    os.windows.Desktop.theme = theme;
                    
                    //Clear any existing Theme
                    os.windows.Desktop.ClearTheme();
                    
                    //Load Desktop Classes
                    os.windows.Desktop.Elements.desktop.Class.Add(theme.Class.desktop);
                    os.windows.Desktop.Elements.dock.Class.Add(theme.Class.dock);
                    os.windows.Desktop.Elements.startButton.Class.Add(theme.Class.startButton);
                    os.windows.Desktop.Elements.startButtonText.Class.Add(theme.Class.startButtonText);
                    os.windows.Desktop.Elements.startMenu.Class.Add(theme.Class.startMenu);
                    document.body.className = "jDesktop";
                    
                    //Loop through any applications
                    for(var i = 0; i < os.windows.Desktop.Applications.size; i++){
                        os.windows.Applications.value().Set.Theme(theme);
                    }
                    
                    
                },
                ClearTheme: function(){
                    os.windows.Desktop.Elements.desktop.Class.ClearAll();
                    os.windows.Desktop.Elements.dock.Class.ClearAll();
                    os.windows.Desktop.Elements.startButton.Class.ClearAll();
                    os.windows.Desktop.Elements.startButtonText.Class.ClearAll();
                    os.windows.Desktop.Elements.startMenu.Class.ClearAll();
                    document.body.className = "";
                },
                Elements: {
                    desktop: os.resschmgr.Create.HTMLElement("div"),
                    dock: os.resschmgr.Create.HTMLElement("div"),
                    startButton: os.resschmgr.Create.HTMLElement("div"),
                    startButtonText: os.resschmgr.Create.HTMLElement("div"),
                    startMenu: os.resschmgr.Create.HTMLElement("div")
                },
                Load: function(sTheme){
                    var theme;
                    
                    //Did user provide a theme, if not load default
                    if(sTheme){
                        
                        theme = os.windows.Desktop.Themes.get(sTheme);
                    
                    }
                    else{
                        
                        theme = os.windows.Desktop.Themes.get("default");
                    
                    }
                    
                    //Set Theme
                    os.windows.Desktop.LoadTheme(theme);
                    
                    //Set IDs
                    os.windows.Desktop.Elements.desktop.html().id = "jdesktop";
                    os.windows.Desktop.Elements.dock.html().id = "jdesktop.dock";
                    os.windows.Desktop.Elements.startButton.html().id = "jdesktop.startButton";
                    os.windows.Desktop.Elements.startButtonText.html().id = "jdesktop.startButtonText";
                    os.windows.Desktop.Elements.startMenu.html().id = "jdesktop.startMenu";
                    
                    //Set Text
                    os.windows.Desktop.Elements.startButtonText.html().innerHTML = "Start";
                    
                    //Connect Elements
                    os.windows.Desktop.Elements.desktop.AppendChild(os.windows.Desktop.Elements.dock.html());
                    os.windows.Desktop.Elements.dock.AppendChild(os.windows.Desktop.Elements.startButton.html());
                    os.windows.Desktop.Elements.startButton.AppendChild(os.windows.Desktop.Elements.startButtonText.html());
                    os.windows.Desktop.Elements.startButton.AppendChild(os.windows.Desktop.Elements.startMenu.html());
                    
                    document.body.appendChild(os.windows.Desktop.Elements.desktop.html());
                    
                    //Set States
                    os.windows.Desktop._state.desktop =         "VISIBLE";
                    os.windows.Desktop._state.dock =            "VISIBLE";
                    os.windows.Desktop._state.startButton =     "VISIBLE";
                    os.windows.Desktop._state.startButtonText = "VISIBLE";
                    os.windows.Desktop._state.startMenu =       "VISIBLE";
                }
                
            },
            //PUBLIC ATTRIBUTES
            
            //PUBLIC PRIVILEDGE METHODS
           
            GetName: function(){
                return NAME;
            },
            
            GetVersion: function(){
                return VERSION;
            },
            
            GetPath: function(){
                return PATH;
            },
           
            GetID: function(){
                return ID;
            },
            
            Initialize: function(){
                
                //Initialize Windows Manager
                os.windows.WindowsManager.Windows = os.resschmgr.Create.Map();
                os.windows.WindowsManager.Themes = os.resschmgr.Create.Map();
                
                os.windows.WindowsManager.BuildDefaultThemes();
                
                
                //Initialize Desktop
                os.windows.Desktop.Themes = os.resschmgr.Create.Map();
                os.windows.Desktop.Applications = os.resschmgr.Create.Map();
                
                os.windows.Desktop.BuildDefaultTheme();
            }
            
        }
    }
    
    return {
        //OBJECT ACCESSOR
        Instance: function()
        {
            if(!pInstance)
            {
                //Instantiate if pInstance does not exist
                pInstance = constructor();
            }
            
            return pInstance;
        }
    }
})();com.jahova.os.Instance().Cores.Instance().Database = (function()
{
    var pInstance;

    function constructor()
    {
        //PRIVATE ATTRIBUTES
        var NAME = "JaHOVA OS Internal API : Database Core";
        var VERSION = "0v5";
        var PATH = "scripts/jahova/OS/Cores/Database/jahova.os.cores.database.js";
        var ID = null;
        
        var os = com.jahova.os.Instance();
        var utilities = com.jahova.utilities.Instance();
        /*
         **/
        //PRIVATE METHODS
        
        
        //Private Classes
        

        return{
            //PUBLIC ATTRIBUTES
            
            //PUBLIC PRIVILEDGE METHODS
           
            GetName: function(){
                return NAME;
            },
            
            GetVersion: function(){
                return VERSION;
            },
            
            GetPath: function(){
                return PATH;
            },
           
            GetID: function(){
                return ID;
            },
            
            Initialize: function(){
                
            }
            
        }
    }
    
    return {
        //OBJECT ACCESSOR
        Instance: function()
        {
            if(!pInstance)
            {
                //Instantiate if pInstance does not exist
                pInstance = constructor();
            }
            
            return pInstance;
        }
    }
})();
com.jahova.os.Instance().Cores.Instance().Audio = (function()
{
    var pInstance;

    function constructor()
    {
        //PRIVATE ATTRIBUTES
        var NAME = "JaHOVA OS Internal API : Audio Core";
        var VERSION = "0v5";
        var PATH = "scripts/jahova/OS/Cores/Audio/jahova.os.cores.audio.js";
        var ID = null;
        
        var os = com.jahova.os.Instance();
        var utilities = com.jahova.utilities.Instance();
        
        var sounds = null;
        /*
         **/
        //PRIVATE METHODS
        
        
        //Private Classes
        var CSound =  function(sKey){
            this.key = sKey;
            this.path = "";
            this.loop = false;
            this.autoplay = false;
            this.type = "";
            this.duration = "";
            this.volume = "";
            this.audio = os.resschmgr.Create.HTMLElement("audio");
        }

        return{
            //PUBLIC ATTRIBUTES
            
            //PUBLIC PRIVILEDGE METHODS
            Add: function(sKey, sPath, bLoop, bAutoplay, sType){       
                var snd = new CSound(sKey);
                snd.loop = bLoop;
                snd.autoplay = bAutoplay;
                
                if(sType){
                    snd.type = sType;
                    snd.path = sPath;
                    var source = document.createElement('source');
                    if(sType.toUpperCase() == "MP3"){
                        
                        if (snd.audio.html().canPlayType('audio/mpeg;')) {
                            source.type= 'audio/mpeg';
                            source.src= sPath;
                            snd.audio.html().setAttribute('preload', 'auto');
                            
                            if(bLoop){snd.audio.html().setAttribute('loop', bLoop);}
                            if(bAutoplay){snd.audio.html().setAttribute('autoplay', bAutoplay);}
                            
                            snd.audio.html().appendChild(source);
                            
                            sounds.put(sKey, snd);
                        }
                        else{
                            os.windows.Create.ErrorWindow(" Audio", "Audio File: " +  sKey + " not loaded <br/>Audio File Type: " + sType + " is not supported by browser")
                        }
                        
                    }
                    else if(sType.toUpperCase() == "OGG"){
                        
                        if(snd.audio.html().canPlayType('audio/ogg;')) {
                            
                            source.type= 'audio/ogg';
                            source.src= sPath + ".ogg";
                            snd.audio.html().setAttribute('preload', 'auto');
                            
                            if(bLoop){snd.audio.html().setAttribute('loop', bLoop);}
                            if(bAutoplay){snd.audio.html().setAttribute('autoplay', bAutoplay);}
                            
                            snd.audio.html().appendChild(source);
                            
                            sounds.put(sKey, snd);
                        
                            //source.type= 'audio/ogg';
                            //source.src= sPath;
                            //snd.audio.html().setAttribute('preload', 'auto');
                            //
                            //if(loop){snd.audio.html().setAttribute('loop', bLoop);}
                            //if(autoplay){snd.audio.html().setAttribute('autoplay', bAutoplay);}
                            //
                            //snd.audio.html().appendChild(source);
                            //
                            //sounds.put(sKey, snd);
                        }
                        else{
                            os.windows.Create.ErrorWindow(" Audio", "Audio File: " +  sKey + " not loaded <br/>Audio File Type: " + sType + " is not supported by browser")
                        }
                    }
                }
                else{
                    snd.type = sType;
                    snd.path = sPath;
                    var source = document.createElement('source');
                    
                    if (snd.audio.html().canPlayType('audio/mpeg;')) {
                        source.type= 'audio/mpeg';
                        source.src= sPath + ".mp3";
                        snd.audio.html().setAttribute('preload', 'auto');
                        
                        if(bLoop){snd.audio.html().setAttribute('loop', bLoop);}
                        if(bAutoplay){snd.audio.html().setAttribute('autoplay', bAutoplay);}
                        
                        snd.audio.html().appendChild(source);
                        
                        sounds.put(sKey, snd);
                    }
                    else if(snd.audio.html().canPlayType('audio/ogg;')) {
                        source.type= 'audio/ogg';
                        source.src= sPath + ".ogg";
                        snd.audio.html().setAttribute('preload', 'auto');
                        
                        if(bLoop){snd.audio.html().setAttribute('loop', bLoop);}
                        if(bAutoplay){snd.audio.html().setAttribute('autoplay', bAutoplay);}
                        
                        snd.audio.html().appendChild(source);
                        
                        sounds.put(sKey, snd);
                    }
                    
                }
                
                snd.duration = snd.audio.html().duration;
                snd.volume = snd.audio.html().volume;
                
                return snd;
                
            },
            Get: {
                Volume: function(sKey){
                    return sounds.get(sKey).volume;
                },
                Sound: function(sKey){
                    return sounds.get(sKey);
                },
                Duration: function(sKey){
                    return sounds.get(sKey).audio.html().duration;
                }
                
            },
            Set: {
                Volume: function(sKey, vol){
                    var snd = sounds.get(sKey);
                    snd.audio.html().volume = vol;
                    snd.volume = vol;
                },
                CurrentTime: function(sKey, time){
                    var snd = sounds.get(sKey);
                    snd.audio.html().currentTime = time;
                }
            },
            Play: function(sKey){
                sounds.get(sKey).audio.html().play();
            },
            Pause: function(sKey){
                sounds.get(sKey).audio.html().pause();
            },
            GetName: function(){
                return NAME;
            },
            
            GetVersion: function(){
                return VERSION;
            },
            
            GetPath: function(){
                return PATH;
            },
           
            GetID: function(){
                return ID;
            },
            
            Initialize: function(){
                sounds = os.resschmgr.Create.Map();   
            }
            
        }
    }
    
    return {
        //OBJECT ACCESSOR
        Instance: function()
        {
            if(!pInstance)
            {
                //Instantiate if pInstance does not exist
                pInstance = constructor();
            }
            
            return pInstance;
        }
    }
})();
com.jahova.os.Instance().Cores.Instance().Input = (function()
{
    var pInstance;

    function constructor()
    {
        //PRIVATE ATTRIBUTES
        var NAME = "JaHOVA OS Internal API : Input Core";
        var VERSION = "0v5";
        var PATH = "scripts/jahova/OS/Cores/Audio/jahova.os.cores.audio.js";
        var ID = null;
        
        var os = com.jahova.os.Instance();
        var utilities = com.jahova.utilities.Instance();
        
       
        /*
         **/
        //PRIVATE METHODS
        
        
        //Private Classes
        var _eventID = 0;
        var CGamepad = function(rawGamepad){
            //ADD ARRAY THAT HOLDS INDICIES OF RAW GAMEPAD ARRAY
            //  USE THIS ARRAY TO PULL PROPER INDEX, THEREBY ALLOWING THE
            //  ARRAY TO BE MODIFIED AND CUSTOMIZE BUTTON SCHEMES
            var raw = rawGamepad; /*{
                buttons: [],
                axes: [],
                timestamep: rawGamepad.timestamp
            };
            raw.buttons = rawGamepad.buttons.slice(0,rawGamepad.buttons.length);
            raw.axes = rawGamepad.axes.slice(0,rawGamepad.axes.length);
            */
            this.debugRaw = raw;
            this.id = rawGamepad.index;
            var self = this;
            this.indicies ={
                Dpad: {
                    up: 12,
                    down: 13,
                    left: 14,
                    right: 15
                },
                LeftShoulder: {
                    top: 4,
                    bottom: 6
                },
                RightShoulder: {
                    top: 5,
                    bottom: 7
                },
                Buttons: {
                    top: 3,
                    bottom: 0,
                    left: 2,
                    right: 1
                },
                LeftStick: {
                    x: 0,
                    y: 1,
                    button: 10
                },
                RightStick: {
                    x: 2,
                    y: 3,
                    button: 11
                },
                select: 8,
                start: 9
            }
            this.type = ((rawGamepad.id).toUpperCase()).indexOf("PLAYSTATION") < 0 ? "XBOX" : "PLAYSTATION";
            this.Dpad ={
                Up: function(){
                    return raw.buttons[self.indicies.Dpad.up]
                },
                Down: function(){
                    return raw.buttons[self.indicies.Dpad.down]
                },
                Left: function(){
                    return raw.buttons[self.indicies.Dpad.left]
                },
                Right: function(){
                    return raw.buttons[self.indicies.Dpad.right]
                }
            }
            this.LeftShoulder ={
                Top: function(){
                    return raw.buttons[self.indicies.LeftShoulder.top]
                },
                Bottom: function(){
                    return raw.buttons[self.indicies.LeftShoulder.bottom]
                }
            }           
            this.RightShoulder ={
                Top: function(){
                    return raw.buttons[self.indicies.RightShoulder.top]
                },
                Bottom: function(){
                    return raw.buttons[self.indicies.RightShoulder.bottom]
                }
            }
            
            this.Buttons = {
                Top: function(){
                    return raw.buttons[self.indicies.Buttons.top]
                },
                Bottom: function(){
                    return raw.buttons[self.indicies.Buttons.bottom]
                },
                Left: function(){
                    return raw.buttons[self.indicies.Buttons.left]
                },
                Right: function(){
                    return raw.buttons[self.indicies.Buttons.right]
                }
            }
            this.LeftStick = {
                X: function(){
                    return raw.axes[self.indicies.LeftStick.x]
                },
                Y: function(){
                    return raw.axes[self.indicies.LeftStick.y]
                },
                Button: function(){
                    return raw.buttons[self.indicies.LeftStick.button]
                }
            }
            this.RightStick ={
                X: function(){
                    return raw.axes[self.indicies.RightStick.x]
                },
                Y: function(){
                    return raw.axes[self.indicies.RightStick.y]
                },
                Button: function(){
                    return raw.buttons[self.indicies.RightStick.button]
                }
            }
            
            this.Select = function(){ return raw.buttons[self.indicies.select];}
            this.Start =  function(){ return raw.buttons[self.indicies.start];}

            this.Delete = function(){
                os.input.Gamepads.current.remove(this.id);
                //os.input.Gamepads.previous.remove(this.id);
            }
            this.Update = function(rawGPad){

                    if(this.type != "PLAYSTATION"){
                        //Default setup is Playstation, so save raw value
                        //raw.buttons = os.input.Gamepads.Raw.current[this.id].buttons.slice(0,os.input.Gamepads.Raw.current[this.id].buttons.length);
                        //raw.axes = os.input.Gamepads.Raw.current[this.id].axes.slice(0,os.input.Gamepads.Raw.current[this.id].axes.length);
                        //raw.timestamp = os.input.Gamepads.Raw.current[this.id].timestamp;
                        
                        //Convert to XBOX mapping and save
                        raw = os.input.Gamepads.Raw.current[this.id];
                    }

                
            }
        }
        
        // Extend object by using GamepadEvent['gamepadID'] = Array [CCallback]
        var CGamepadEvent = function(){
            
        }
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
                    
                    var callbackArray = e.keyCode > 47 && e.keyCode < 91 ? _KeyDownEvents.get(String.fromCharCode(e.keyCode)) : _KeyDownControlKeyEvents.get(e.keyCode);
                                      
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
                    var callbackArray = e.keyCode > 47 && e.keyCode < 91 ? _KeyUpEvents.get(String.fromCharCode(e.keyCode)) : _KeyUpControlKeyEvents.get(e.keyCode);
                                      
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
            },
            Gamepad: {
                Connect: function(e){
                    var gp = new CGamepad(e);
                    os.input.Gamepads.current.put(gp.id, gp);
                    //var pgp = new CGamepad(e);
                    //os.input.Gamepads.previous.put(pgp.id, pgp);
                    
                    var callbackArray = _GamepadEvents.get("CONNECT");
                    if(callbackArray){
                        for(var i = callbackArray.length - 1; i >= 0 ; i--){
                            if(callbackArray[i].scope){
                                callbackArray[i].func.apply(callbackArray.scope, [gp]);
                            }else{
                                callbackArray[i].func(gp);
                            }
                        }
                    }
                },
                Disconnect: function(e){
                    var gp = os.input.Gamepads.current.get(e.index);
                    
                    var callbackArray = _GamepadEvents.get("DISCONNECT");
                    if(callbackArray){
                        for(var i = callbackArray.length - 1; i >= 0 ; i--){
                            if(callbackArray[i].scope){
                                callbackArray[i].func.apply(callbackArray.scope, [gp]);
                            }else{
                                callbackArray[i].func(gp);
                            }
                        }
                    }
                    
                    gp.Delete();
                    
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
        
        
        
        
        //Holds state of mouse for all registered states
        var _Mouse = {
            lastX: 0,
            lastY: 0,
            pressed: false
        }
        //      key: mouseEventType, value: Array[CCallbacks]
        var _TouchEvents = null;

        //      key: mouseEventType, value: Array[CCallbacks]
        var _MouseEvents = null;
        
        
        //Holds states/events of all keys
        //      key: keyCode, value: true/false
        var _KeyboardStates = null;
        
        //      key: keyCode, value: Array[CCallbacks];
        var _KeyDownEvents = null;
        var _KeyUpEvents = null;
        var _KeyDownControlKeyEvents = null;
        var _KeyUpControlKeyEvents = null;
        
        var _GamepadEvents = null;
        return{
            //PUBLIC ATTRIBUTES
            currentTime: 0,
            previousTime: 0,
            //PUBLIC PRIVILEDGE METHODS
            Update: function(dt){
                
                //Update current and check for new Gamepads
                os.input.Gamepads.Update(dt);
                
            },
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
                    },
                    Gamepad: function(gamepadID){
                        return _Gamepads.get(gamepadID);
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
                                eventArray = _KeyDownControlKeyEvents.get(Key);
                            }
                            else{
                                eventArray = _KeyDownControlKeyEvents.get(Key);
                            }
                            
                            
                            if(!eventArray){
                                eventArray = [];
                                if(isNaN(Key)){ _KeyDownEvents.put(Key, eventArray);}
                                else{_KeyDownControlKeyEvents.put(Key, eventArray);}
                                
                            }
                            eventArray.push(e);
                            return e;
                        },
                        Keyup: function(Key, fFunction, oScope){
                            var e = new CCallback(_eventID++, fFunction, oScope);
                            var eventArray;
                            
                            if(isNaN(Key)){
                                eventArray = _KeyUpControlKeyEvents.get(Key);
                            }
                            else{
                                eventArray = _KeyUpControlKeyEvents.get(Key);
                            }
                            
                            
                            if(!eventArray){
                                eventArray = [];
                                if(isNaN(Key)){ _KeyUpEvents.put(Key, eventArray);}
                                else{_KeyUpControlKeyEvents.put(Key, eventArray);}
                                
                            }
                            eventArray.push(e);
                            return e;
                            
                        }
                    },
                    State: {
                        
                    }
                },
                Gamepad: {
                    Event: {
                        Connected: function(fFunction, oScope){
                            var e = new CCallback(_eventID++, fFunction, oScope);
                            _GamepadEvents.get("CONNECT").push(e);
                            return e;
                        },
                        Disconnected: function(fFunction, oScope){
                            var e = new CCallback(_eventID++, fFunction, oScope);
                            _GamepadEvents.get("DISCONNECT").push(e);
                            return e;
                        }
                    },
                    State: {
                        
                    }
                }
            },
            Gamepads: {
                Raw: {
                    current:  [undefined, undefined,undefined, undefined],
                    previous: [undefined, undefined,undefined, undefined]
                },
                current: null,
                previous: null,
                Poll: function(dt){
                    
                    for(var i = 3; i >= 0; i--){
                        os.input.Gamepads.Raw.previous[i] = os.input.Gamepads.Raw.current[i];
                    }
                    // Get the array of gamepads – the first method (function call)
                    // is the most modern one, the second is there for compatibility with
                    // slightly older versions of Chrome, but it shouldn’t be necessary
                    // for long.
                    os.input.Gamepads.Raw.current =
                        (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
                        navigator.webkitGamepads;
                
                    if (os.input.Gamepads.Raw.current) {
                      // We don’t want to use rawGamepads coming straight from the browser,
                      // since it can have “holes” (e.g. if you plug two gamepads, and then
                      // unplug the first one, the remaining one will be at index [1]).
                      
                
                      // We only refresh the display when we detect some gamepads are new
                      // or removed; we do it by comparing raw gamepad table entries to
                      // “undefined.”
                      var gamepadsChanged = false;
                
                      for (var i = 3; i >= 0; i--) {
                        
                        if (typeof os.input.Gamepads.Raw.current[i] != typeof os.input.Gamepads.Raw.previous[i]) {
                          
                            if(typeof os.input.Gamepads.Raw.previous[i] == "undefined"){
                                _InputEvents.Gamepad.Connect(os.input.Gamepads.Raw.current[i])
                            }
                            else{
                                _InputEvents.Gamepad.Disconnect(os.input.Gamepads.Raw.previous[i])
                            }
                          
                            //os.input.Gamepads.Raw.previous[i] = os.input.Gamepads.Raw.current[i];
                        }
                        
                        
                      }
                    }
                },
                Update: function(dt){
                    os.input.Gamepads.Poll(dt);
                    for(var i = os.input.Gamepads.current.size - 1; i >=0; i--){
                        os.input.Gamepads.current.value().Update();
                        os.input.Gamepads.current.next();
                    }
                }
            },
            GetName: function(){
                return NAME;
            },
            
            GetVersion: function(){
                return VERSION;
            },
            
            GetPath: function(){
                return PATH;
            },
           
            GetID: function(){
                return ID;
            },
            
            Initialize: function(){
                document.addEventListener("touchstart", _InputEvents.Touch.Start, false);
                document.addEventListener("touchend", _InputEvents.Touch.End, false);
                document.addEventListener("touchmove", _InputEvents.Touch.Move, false);
                
                document.addEventListener("mousedown", _InputEvents.Mouse.Down, false);
                document.addEventListener("mouseup", _InputEvents.Mouse.Up, false);
                document.addEventListener("mousemove", _InputEvents.Mouse.Move, false);
                
                window.addEventListener("keydown", _InputEvents.Keyboard.Keydown, false);
                window.addEventListener("keyup", _InputEvents.Keyboard.Keyup, false);
                
                //      key: mouseEventType, value: Array[CCallbacks]
                _TouchEvents = os.resschmgr.Create.Map();
                _TouchEvents.put("START", []);
                _TouchEvents.put("END", []);
                _TouchEvents.put("MOVE", []);
        
                //      key: mouseEventType, value: Array[CCallbacks]
                _MouseEvents = os.resschmgr.Create.Map();
                _MouseEvents.put("DOWN", []);
                _MouseEvents.put("UP", []);
                _MouseEvents.put("MOVE", []);
                
                
                
                //Holds states/events of all keys
                //      key: keyCode, value: true/false
                _KeyboardStates = os.resschmgr.Create.Map();
                
                //      key: keyCode, value: Array[CCallbacks];
                _KeyDownEvents = os.resschmgr.Create.Map();
                _KeyUpEvents = os.resschmgr.Create.Map();
                _KeyDownControlKeyEvents = os.resschmgr.Create.Map();
                _KeyUpControlKeyEvents = os.resschmgr.Create.Map();
                
                _GamepadEvents = os.resschmgr.Create.Map();
                pInstance.Gamepads.current = os.resschmgr.Create.Map();
                pInstance.Gamepads.previous = os.resschmgr.Create.Map();
                _GamepadEvents.put("CONNECT", []);
                _GamepadEvents.put("DISCONNECT",[]);
            }
            
        }
    }
    
    return {
        //OBJECT ACCESSOR
        Instance: function()
        {
            if(!pInstance)
            {
                //Instantiate if pInstance does not exist
                pInstance = constructor();
            }
            
            return pInstance;
        }
    }
})();
/* 
 * glMatrix.js - High performance matrix and vector operations for WebGL
 * version 0.9.4
 */
 
/*
 * Copyright (c) 2010 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

// Fallback for systems that don't support WebGL
if(typeof Float32Array != 'undefined') {
	glMatrixArrayType = Float32Array;
} else if(typeof WebGLFloatArray != 'undefined') {
	glMatrixArrayType = WebGLFloatArray;
} else {
	glMatrixArrayType = Array;
}

/*
 * vec3 - 3 Dimensional Vector
 */
var vec3 = {};

/*
 * vec3.create
 * Creates a new instance of a vec3 using the default array type
 * Any javascript array containing at least 3 numeric elements can serve as a vec3
 *
 * Params:
 * vec - Optional, vec3 containing values to initialize with
 *
 * Returns:
 * New vec3
 */
vec3.create = function(vec) {
	var dest = new glMatrixArrayType(3);
	
	if(vec) {
		dest[0] = vec[0];
		dest[1] = vec[1];
		dest[2] = vec[2];
	}
	
	return dest;
};

/*
 * vec3.set
 * Copies the values of one vec3 to another
 *
 * Params:
 * vec - vec3 containing values to copy
 * dest - vec3 receiving copied values
 *
 * Returns:
 * dest
 */
vec3.set = function(vec, dest) {
	dest[0] = vec[0];
	dest[1] = vec[1];
	dest[2] = vec[2];
	
	return dest;
};

/*
 * vec3.add
 * Performs a vector addition
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.add = function(vec, vec2, dest) {
	if(!dest || vec == dest) {
		vec[0] += vec2[0];
		vec[1] += vec2[1];
		vec[2] += vec2[2];
		return vec;
	}
	
	dest[0] = vec[0] + vec2[0];
	dest[1] = vec[1] + vec2[1];
	dest[2] = vec[2] + vec2[2];
	return dest;
};

/*
 * vec3.subtract
 * Performs a vector subtraction
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.subtract = function(vec, vec2, dest) {
	if(!dest || vec == dest) {
		vec[0] -= vec2[0];
		vec[1] -= vec2[1];
		vec[2] -= vec2[2];
		return vec;
	}
	
	dest[0] = vec[0] - vec2[0];
	dest[1] = vec[1] - vec2[1];
	dest[2] = vec[2] - vec2[2];
	return dest;
};

/*
 * vec3.negate
 * Negates the components of a vec3
 *
 * Params:
 * vec - vec3 to negate
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.negate = function(vec, dest) {
	if(!dest) { dest = vec; }
	
	dest[0] = -vec[0];
	dest[1] = -vec[1];
	dest[2] = -vec[2];
	return dest;
};

/*
 * vec3.scale
 * Multiplies the components of a vec3 by a scalar value
 *
 * Params:
 * vec - vec3 to scale
 * val - Numeric value to scale by
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.scale = function(vec, val, dest) {
	if(!dest || vec == dest) {
		vec[0] *= val;
		vec[1] *= val;
		vec[2] *= val;
		return vec;
	}
	
	dest[0] = vec[0]*val;
	dest[1] = vec[1]*val;
	dest[2] = vec[2]*val;
	return dest;
};

/*
 * vec3.normalize
 * Generates a unit vector of the same direction as the provided vec3
 * If vector length is 0, returns [0, 0, 0]
 *
 * Params:
 * vec - vec3 to normalize
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.normalize = function(vec, dest) {
	if(!dest) { dest = vec; }
	
	var x = vec[0], y = vec[1], z = vec[2];
	var len = Math.sqrt(x*x + y*y + z*z);
	
	if (!len) {
		dest[0] = 0;
		dest[1] = 0;
		dest[2] = 0;
		return dest;
	} else if (len == 1) {
		dest[0] = x;
		dest[1] = y;
		dest[2] = z;
		return dest;
	}
	
	len = 1 / len;
	dest[0] = x*len;
	dest[1] = y*len;
	dest[2] = z*len;
	return dest;
};

/*
 * vec3.cross
 * Generates the cross product of two vec3s
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.cross = function(vec, vec2, dest){
	if(!dest) { dest = vec; }
	
	var x = vec[0], y = vec[1], z = vec[2];
	var x2 = vec2[0], y2 = vec2[1], z2 = vec2[2];
	
	dest[0] = y*z2 - z*y2;
	dest[1] = z*x2 - x*z2;
	dest[2] = x*y2 - y*x2;
	return dest;
};

/*
 * vec3.length
 * Caclulates the length of a vec3
 *
 * Params:
 * vec - vec3 to calculate length of
 *
 * Returns:
 * Length of vec
 */
vec3.length = function(vec){
	var x = vec[0], y = vec[1], z = vec[2];
	return Math.sqrt(x*x + y*y + z*z);
};

/*
 * vec3.dot
 * Caclulates the dot product of two vec3s
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 *
 * Returns:
 * Dot product of vec and vec2
 */
vec3.dot = function(vec, vec2){
	return vec[0]*vec2[0] + vec[1]*vec2[1] + vec[2]*vec2[2];
};

/*
 * vec3.direction
 * Generates a unit vector pointing from one vector to another
 *
 * Params:
 * vec - origin vec3
 * vec2 - vec3 to point to
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.direction = function(vec, vec2, dest) {
	if(!dest) { dest = vec; }
	
	var x = vec[0] - vec2[0];
	var y = vec[1] - vec2[1];
	var z = vec[2] - vec2[2];
	
	var len = Math.sqrt(x*x + y*y + z*z);
	if (!len) { 
		dest[0] = 0; 
		dest[1] = 0; 
		dest[2] = 0;
		return dest; 
	}
	
	len = 1 / len;
	dest[0] = x * len; 
	dest[1] = y * len; 
	dest[2] = z * len;
	return dest; 
};

/*
 * vec3.str
 * Returns a string representation of a vector
 *
 * Params:
 * vec - vec3 to represent as a string
 *
 * Returns:
 * string representation of vec
 */
vec3.str = function(vec) {
	return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ']'; 
};

/*
 * mat3 - 3x3 Matrix
 */
var mat3 = {};

/*
 * mat3.create
 * Creates a new instance of a mat3 using the default array type
 * Any javascript array containing at least 9 numeric elements can serve as a mat3
 *
 * Params:
 * mat - Optional, mat3 containing values to initialize with
 *
 * Returns:
 * New mat3
 */
mat3.create = function(mat) {
	var dest = new glMatrixArrayType(9);
	
	if(mat) {
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[3];
		dest[4] = mat[4];
		dest[5] = mat[5];
		dest[6] = mat[6];
		dest[7] = mat[7];
		dest[8] = mat[8];
		dest[9] = mat[9];
	}
	
	return dest;
};

/*
 * mat3.set
 * Copies the values of one mat3 to another
 *
 * Params:
 * mat - mat3 containing values to copy
 * dest - mat3 receiving copied values
 *
 * Returns:
 * dest
 */
mat3.set = function(mat, dest) {
	dest[0] = mat[0];
	dest[1] = mat[1];
	dest[2] = mat[2];
	dest[3] = mat[3];
	dest[4] = mat[4];
	dest[5] = mat[5];
	dest[6] = mat[6];
	dest[7] = mat[7];
	dest[8] = mat[8];
	return dest;
};

/*
 * mat3.identity
 * Sets a mat3 to an identity matrix
 *
 * Params:
 * dest - mat3 to set
 *
 * Returns:
 * dest
 */
mat3.identity = function(dest) {
	dest[0] = 1;
	dest[1] = 0;
	dest[2] = 0;
	dest[3] = 0;
	dest[4] = 1;
	dest[5] = 0;
	dest[6] = 0;
	dest[7] = 0;
	dest[8] = 1;
	return dest;
};

/*
 * mat3.toMat4
 * Copies the elements of a mat3 into the upper 3x3 elements of a mat4
 *
 * Params:
 * mat - mat3 containing values to copy
 * dest - Optional, mat4 receiving copied values
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat3.toMat4 = function(mat, dest) {
	if(!dest) { dest = mat4.create(); }
	
	dest[0] = mat[0];
	dest[1] = mat[1];
	dest[2] = mat[2];
	dest[3] = 0;

	dest[4] = mat[3];
	dest[5] = mat[4];
	dest[6] = mat[5];
	dest[7] = 0;

	dest[8] = mat[6];
	dest[9] = mat[7];
	dest[10] = mat[8];
	dest[11] = 0;

	dest[12] = 0;
	dest[13] = 0;
	dest[14] = 0;
	dest[15] = 1;
	
	return dest;
}

/*
 * mat3.str
 * Returns a string representation of a mat3
 *
 * Params:
 * mat - mat3 to represent as a string
 *
 * Returns:
 * string representation of mat
 */
mat3.str = function(mat) {
	return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + 
		', ' + mat[3] + ', '+ mat[4] + ', ' + mat[5] + 
		', ' + mat[6] + ', ' + mat[7] + ', '+ mat[8] + ']';
};
mat3.multiply = function(mat, mat2, dest) {
	if(!dest) { dest = mat }
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2];
	var a10 = mat[3], a11 = mat[4], a12 = mat[5];
	var a20 = mat[6], a21 = mat[7], a22 = mat[8];
	
	var b00 = mat2[0], b01 = mat2[1], b02 = mat2[2];
	var b10 = mat2[3], b11 = mat2[4], b12 = mat2[5];
	var b20 = mat2[6], b21 = mat2[7], b22 = mat2[8];
	
	dest[0] = b00*a00 + b01*a10 + b02*a20;
	dest[1] = b00*a01 + b01*a11 + b02*a21;
	dest[2] = b00*a02 + b01*a12 + b02*a22;
	
	dest[3] = b10*a00 + b11*a10 + b12*a20;
	dest[4] = b10*a01 + b11*a11 + b12*a21;
	dest[5] = b10*a02 + b11*a12 + b12*a22;
	
	dest[6] = b20*a00 + b21*a10 + b22*a20;
	dest[7] = b20*a01 + b21*a11 + b22*a21;
	dest[8] = b20*a02 + b21*a12 + b22*a22;
	
	
	return dest;
};
mat3.multiplyVec3 = function(mat, vec, dest) {
	if(!dest) { dest = vec }
	
	var x = vec[0], y = vec[1], z = vec[2];
	
	dest[0] = mat[0]*x + mat[3]*y + mat[6]*z;
	dest[1] = mat[1]*x + mat[4]*y + mat[7]*z;
	dest[2] = mat[2]*x + mat[5]*y + mat[8]*z;
	
	
	return dest;
	
};
mat3.transpose = function (a, b) {
    if (!b || a == b) {
        var c = a[1],
            d = a[2],
            e = a[5];
			a[1] = a[3];
			a[2] = a[6];
			a[3] = c;
			a[5] = a[7];
			a[6] = d;
			a[7] = e;
			return a
    }
    b[0] = a[0];
    b[1] = a[3];
    b[2] = a[6];
    b[3] = a[1];
    b[4] = a[4];
    b[5] = a[7];
    b[6] = a[2];
    b[7] = a[5];
    b[8] = a[8];
    return b
};
/*
 * mat4 - 4x4 Matrix
 */
var mat4 = {};

/*
 * mat4.create
 * Creates a new instance of a mat4 using the default array type
 * Any javascript array containing at least 16 numeric elements can serve as a mat4
 *
 * Params:
 * mat - Optional, mat4 containing values to initialize with
 *
 * Returns:
 * New mat4
 */
mat4.create = function(mat) {
	var dest = new glMatrixArrayType(16);
	
	if(mat) {
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[3];
		dest[4] = mat[4];
		dest[5] = mat[5];
		dest[6] = mat[6];
		dest[7] = mat[7];
		dest[8] = mat[8];
		dest[9] = mat[9];
		dest[10] = mat[10];
		dest[11] = mat[11];
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
	}
	
	return dest;
};

/*
 * mat4.set
 * Copies the values of one mat4 to another
 *
 * Params:
 * mat - mat4 containing values to copy
 * dest - mat4 receiving copied values
 *
 * Returns:
 * dest
 */
mat4.set = function(mat, dest) {
	dest[0] = mat[0];
	dest[1] = mat[1];
	dest[2] = mat[2];
	dest[3] = mat[3];
	dest[4] = mat[4];
	dest[5] = mat[5];
	dest[6] = mat[6];
	dest[7] = mat[7];
	dest[8] = mat[8];
	dest[9] = mat[9];
	dest[10] = mat[10];
	dest[11] = mat[11];
	dest[12] = mat[12];
	dest[13] = mat[13];
	dest[14] = mat[14];
	dest[15] = mat[15];
	return dest;
};

/*
 * mat4.identity
 * Sets a mat4 to an identity matrix
 *
 * Params:
 * dest - mat4 to set
 *
 * Returns:
 * dest
 */
mat4.identity = function(dest) {
	dest[0] = 1;
	dest[1] = 0;
	dest[2] = 0;
	dest[3] = 0;
	dest[4] = 0;
	dest[5] = 1;
	dest[6] = 0;
	dest[7] = 0;
	dest[8] = 0;
	dest[9] = 0;
	dest[10] = 1;
	dest[11] = 0;
	dest[12] = 0;
	dest[13] = 0;
	dest[14] = 0;
	dest[15] = 1;
	return dest;
};

/*
 * mat4.transpose
 * Transposes a mat4 (flips the values over the diagonal)
 *
 * Params:
 * mat - mat4 to transpose
 * dest - Optional, mat4 receiving transposed values. If not specified result is written to mat
 *
 * Returns:
 * dest is specified, mat otherwise
 */
mat4.transpose = function(mat, dest) {
	// If we are transposing ourselves we can skip a few steps but have to cache some values
	if(!dest || mat == dest) { 
		var a01 = mat[1], a02 = mat[2], a03 = mat[3];
		var a12 = mat[6], a13 = mat[7];
		var a23 = mat[11];
		
		mat[1] = mat[4];
		mat[2] = mat[8];
		mat[3] = mat[12];
		mat[4] = a01;
		mat[6] = mat[9];
		mat[7] = mat[13];
		mat[8] = a02;
		mat[9] = a12;
		mat[11] = mat[14];
		mat[12] = a03;
		mat[13] = a13;
		mat[14] = a23;
		return mat;
	}
	
	dest[0] = mat[0];
	dest[1] = mat[4];
	dest[2] = mat[8];
	dest[3] = mat[12];
	dest[4] = mat[1];
	dest[5] = mat[5];
	dest[6] = mat[9];
	dest[7] = mat[13];
	dest[8] = mat[2];
	dest[9] = mat[6];
	dest[10] = mat[10];
	dest[11] = mat[14];
	dest[12] = mat[3];
	dest[13] = mat[7];
	dest[14] = mat[11];
	dest[15] = mat[15];
	return dest;
};

/*
 * mat4.determinant
 * Calculates the determinant of a mat4
 *
 * Params:
 * mat - mat4 to calculate determinant of
 *
 * Returns:
 * determinant of mat
 */
mat4.determinant = function(mat) {
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];

	return	a30*a21*a12*a03 - a20*a31*a12*a03 - a30*a11*a22*a03 + a10*a31*a22*a03 +
			a20*a11*a32*a03 - a10*a21*a32*a03 - a30*a21*a02*a13 + a20*a31*a02*a13 +
			a30*a01*a22*a13 - a00*a31*a22*a13 - a20*a01*a32*a13 + a00*a21*a32*a13 +
			a30*a11*a02*a23 - a10*a31*a02*a23 - a30*a01*a12*a23 + a00*a31*a12*a23 +
			a10*a01*a32*a23 - a00*a11*a32*a23 - a20*a11*a02*a33 + a10*a21*a02*a33 +
			a20*a01*a12*a33 - a00*a21*a12*a33 - a10*a01*a22*a33 + a00*a11*a22*a33;
};

/*
 * mat4.inverse
 * Calculates the inverse matrix of a mat4
 *
 * Params:
 * mat - mat4 to calculate inverse of
 * dest - Optional, mat4 receiving inverse matrix. If not specified result is written to mat
 *
 * Returns:
 * dest is specified, mat otherwise
 */
mat4.inverse = function(mat, dest) {
	if(!dest) { dest = mat; }
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
	
	var b00 = a00*a11 - a01*a10;
	var b01 = a00*a12 - a02*a10;
	var b02 = a00*a13 - a03*a10;
	var b03 = a01*a12 - a02*a11;
	var b04 = a01*a13 - a03*a11;
	var b05 = a02*a13 - a03*a12;
	var b06 = a20*a31 - a21*a30;
	var b07 = a20*a32 - a22*a30;
	var b08 = a20*a33 - a23*a30;
	var b09 = a21*a32 - a22*a31;
	var b10 = a21*a33 - a23*a31;
	var b11 = a22*a33 - a23*a32;
	
	// Calculate the determinant (inlined to avoid double-caching)
	var invDet = 1/(b00*b11 - b01*b10 + b02*b09 + b03*b08 - b04*b07 + b05*b06);
	
	dest[0] = (a11*b11 - a12*b10 + a13*b09)*invDet;
	dest[1] = (-a01*b11 + a02*b10 - a03*b09)*invDet;
	dest[2] = (a31*b05 - a32*b04 + a33*b03)*invDet;
	dest[3] = (-a21*b05 + a22*b04 - a23*b03)*invDet;
	dest[4] = (-a10*b11 + a12*b08 - a13*b07)*invDet;
	dest[5] = (a00*b11 - a02*b08 + a03*b07)*invDet;
	dest[6] = (-a30*b05 + a32*b02 - a33*b01)*invDet;
	dest[7] = (a20*b05 - a22*b02 + a23*b01)*invDet;
	dest[8] = (a10*b10 - a11*b08 + a13*b06)*invDet;
	dest[9] = (-a00*b10 + a01*b08 - a03*b06)*invDet;
	dest[10] = (a30*b04 - a31*b02 + a33*b00)*invDet;
	dest[11] = (-a20*b04 + a21*b02 - a23*b00)*invDet;
	dest[12] = (-a10*b09 + a11*b07 - a12*b06)*invDet;
	dest[13] = (a00*b09 - a01*b07 + a02*b06)*invDet;
	dest[14] = (-a30*b03 + a31*b01 - a32*b00)*invDet;
	dest[15] = (a20*b03 - a21*b01 + a22*b00)*invDet;
	
	return dest;
};

/*
 * mat4.toMat3
 * Copies the upper 3x3 elements of a mat4 into a mat3
 *
 * Params:
 * mat - mat4 containing values to copy
 * dest - Optional, mat3 receiving copied values
 *
 * Returns:
 * dest is specified, a new mat3 otherwise
 */
mat4.toMat3 = function(mat, dest) {
	if(!dest) { dest = mat3.create(); }
	
	dest[0] = mat[0];
	dest[1] = mat[1];
	dest[2] = mat[2];
	dest[3] = mat[4];
	dest[4] = mat[5];
	dest[5] = mat[6];
	dest[6] = mat[8];
	dest[7] = mat[9];
	dest[8] = mat[10];
	
	return dest;
};

/*
 * mat4.toInverseMat3
 * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
 * The resulting matrix is useful for calculating transformed normals
 *
 * Params:
 * mat - mat4 containing values to invert and copy
 * dest - Optional, mat3 receiving values
 *
 * Returns:
 * dest is specified, a new mat3 otherwise
 */
mat4.toInverseMat3 = function(mat, dest) {
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10];
	
	var b01 = a22*a11-a12*a21;
	var b11 = -a22*a10+a12*a20;
	var b21 = a21*a10-a11*a20;
		
	var d = a00*b01 + a01*b11 + a02*b21;
	if (!d) { return null; }
	var id = 1/d;
	
	if(!dest) { dest = mat3.create(); }
	
	dest[0] = b01*id;
	dest[1] = (-a22*a01 + a02*a21)*id;
	dest[2] = (a12*a01 - a02*a11)*id;
	dest[3] = b11*id;
	dest[4] = (a22*a00 - a02*a20)*id;
	dest[5] = (-a12*a00 + a02*a10)*id;
	dest[6] = b21*id;
	dest[7] = (-a21*a00 + a01*a20)*id;
	dest[8] = (a11*a00 - a01*a10)*id;
	
	return dest;
};

/*
 * mat4.multiply
 * Performs a matrix multiplication
 *
 * Params:
 * mat - mat4, first operand
 * mat2 - mat4, second operand
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.multiply = function(mat, mat2, dest) {
	if(!dest) { dest = mat }
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
	
	var b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b03 = mat2[3];
	var b10 = mat2[4], b11 = mat2[5], b12 = mat2[6], b13 = mat2[7];
	var b20 = mat2[8], b21 = mat2[9], b22 = mat2[10], b23 = mat2[11];
	var b30 = mat2[12], b31 = mat2[13], b32 = mat2[14], b33 = mat2[15];
	
	dest[0] = b00*a00 + b01*a10 + b02*a20 + b03*a30;
	dest[1] = b00*a01 + b01*a11 + b02*a21 + b03*a31;
	dest[2] = b00*a02 + b01*a12 + b02*a22 + b03*a32;
	dest[3] = b00*a03 + b01*a13 + b02*a23 + b03*a33;
	dest[4] = b10*a00 + b11*a10 + b12*a20 + b13*a30;
	dest[5] = b10*a01 + b11*a11 + b12*a21 + b13*a31;
	dest[6] = b10*a02 + b11*a12 + b12*a22 + b13*a32;
	dest[7] = b10*a03 + b11*a13 + b12*a23 + b13*a33;
	dest[8] = b20*a00 + b21*a10 + b22*a20 + b23*a30;
	dest[9] = b20*a01 + b21*a11 + b22*a21 + b23*a31;
	dest[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
	dest[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;
	dest[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
	dest[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
	dest[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
	dest[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;
	
	return dest;
};

/*
 * mat4.multiplyVec3
 * Transforms a vec3 with the given matrix
 * 4th vector component is implicitly '1'
 *
 * Params:
 * mat - mat4 to transform the vector with
 * vec - vec3 to transform
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
mat4.multiplyVec3 = function(mat, vec, dest) {
	if(!dest) { dest = vec }
	
	var x = vec[0], y = vec[1], z = vec[2];
	
	dest[0] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12];
	dest[1] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13];
	dest[2] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14];
	
	return dest;
};

/*
 * mat4.multiplyVec4
 * Transforms a vec4 with the given matrix
 *
 * Params:
 * mat - mat4 to transform the vector with
 * vec - vec4 to transform
 * dest - Optional, vec4 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
mat4.multiplyVec4 = function(mat, vec, dest) {
	if(!dest) { dest = vec }
	
	var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
	
	dest[0] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12]*w;
	dest[1] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13]*w;
	dest[2] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14]*w;
	dest[3] = mat[3]*x + mat[7]*y + mat[11]*z + mat[15]*w;
	
	return dest;
};

/*
 * mat4.translate
 * Translates a matrix by the given vector
 *
 * Params:
 * mat - mat4 to translate
 * vec - vec3 specifying the translation
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.translate = function(mat, vec, dest) {
	var x = vec[0], y = vec[1], z = vec[2];
	
	if(!dest || mat == dest) {
		mat[12] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12];
		mat[13] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13];
		mat[14] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14];
		mat[15] = mat[3]*x + mat[7]*y + mat[11]*z + mat[15];
		return mat;
	}
	
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	
	dest[0] = a00;
	dest[1] = a01;
	dest[2] = a02;
	dest[3] = a03;
	dest[4] = a10;
	dest[5] = a11;
	dest[6] = a12;
	dest[7] = a13;
	dest[8] = a20;
	dest[9] = a21;
	dest[10] = a22;
	dest[11] = a23;
	
	dest[12] = a00*x + a10*y + a20*z + mat[12];
	dest[13] = a01*x + a11*y + a21*z + mat[13];
	dest[14] = a02*x + a12*y + a22*z + mat[14];
	dest[15] = a03*x + a13*y + a23*z + mat[15];
	return dest;
};

/*
 * mat4.scale
 * Scales a matrix by the given vector
 *
 * Params:
 * mat - mat4 to scale
 * vec - vec3 specifying the scale for each axis
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.scale = function(mat, vec, dest) {
	var x = vec[0], y = vec[1], z = vec[2];
	
	if(!dest || mat == dest) {
		mat[0] *= x;
		mat[1] *= x;
		mat[2] *= x;
		mat[3] *= x;
		mat[4] *= y;
		mat[5] *= y;
		mat[6] *= y;
		mat[7] *= y;
		mat[8] *= z;
		mat[9] *= z;
		mat[10] *= z;
		mat[11] *= z;
		return mat;
	}
	
	dest[0] = mat[0]*x;
	dest[1] = mat[1]*x;
	dest[2] = mat[2]*x;
	dest[3] = mat[3]*x;
	dest[4] = mat[4]*y;
	dest[5] = mat[5]*y;
	dest[6] = mat[6]*y;
	dest[7] = mat[7]*y;
	dest[8] = mat[8]*z;
	dest[9] = mat[9]*z;
	dest[10] = mat[10]*z;
	dest[11] = mat[11]*z;
	dest[12] = mat[12];
	dest[13] = mat[13];
	dest[14] = mat[14];
	dest[15] = mat[15];
	return dest;
};

/*
 * mat4.rotate
 * Rotates a matrix by the given angle around the specified axis
 * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * axis - vec3 representing the axis to rotate around 
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotate = function(mat, angle, axis, dest) {
	var x = axis[0], y = axis[1], z = axis[2];
	var len = Math.sqrt(x*x + y*y + z*z);
	if (!len) { return null; }
	if (len != 1) {
		len = 1 / len;
		x *= len; 
		y *= len; 
		z *= len;
	}
	
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	var t = 1-c;
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	
	// Construct the elements of the rotation matrix
	var b00 = x*x*t + c, b01 = y*x*t + z*s, b02 = z*x*t - y*s;
	var b10 = x*y*t - z*s, b11 = y*y*t + c, b12 = z*y*t + x*s;
	var b20 = x*z*t + y*s, b21 = y*z*t - x*s, b22 = z*z*t + c;
	
	if(!dest) { 
		dest = mat 
	} else if(mat != dest) { // If the source and destination differ, copy the unchanged last row
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
	}
	
	// Perform rotation-specific matrix multiplication
	dest[0] = a00*b00 + a10*b01 + a20*b02;
	dest[1] = a01*b00 + a11*b01 + a21*b02;
	dest[2] = a02*b00 + a12*b01 + a22*b02;
	dest[3] = a03*b00 + a13*b01 + a23*b02;
	
	dest[4] = a00*b10 + a10*b11 + a20*b12;
	dest[5] = a01*b10 + a11*b11 + a21*b12;
	dest[6] = a02*b10 + a12*b11 + a22*b12;
	dest[7] = a03*b10 + a13*b11 + a23*b12;
	
	dest[8] = a00*b20 + a10*b21 + a20*b22;
	dest[9] = a01*b20 + a11*b21 + a21*b22;
	dest[10] = a02*b20 + a12*b21 + a22*b22;
	dest[11] = a03*b20 + a13*b21 + a23*b22;
	return dest;
};

/*
 * mat4.rotateX
 * Rotates a matrix by the given angle around the X axis
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotateX = function(mat, angle, dest) {
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	
	// Cache the matrix values (makes for huge speed increases!)
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];

	if(!dest) { 
		dest = mat 
	} else if(mat != dest) { // If the source and destination differ, copy the unchanged rows
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[3];
		
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
	}
	
	// Perform axis-specific matrix multiplication
	dest[4] = a10*c + a20*s;
	dest[5] = a11*c + a21*s;
	dest[6] = a12*c + a22*s;
	dest[7] = a13*c + a23*s;
	
	dest[8] = a10*-s + a20*c;
	dest[9] = a11*-s + a21*c;
	dest[10] = a12*-s + a22*c;
	dest[11] = a13*-s + a23*c;
	return dest;
};

/*
 * mat4.rotateY
 * Rotates a matrix by the given angle around the Y axis
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotateY = function(mat, angle, dest) {
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	
	if(!dest) { 
		dest = mat 
	} else if(mat != dest) { // If the source and destination differ, copy the unchanged rows
		dest[4] = mat[4];
		dest[5] = mat[5];
		dest[6] = mat[6];
		dest[7] = mat[7];
		
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
	}
	
	// Perform axis-specific matrix multiplication
	dest[0] = a00*c + a20*-s;
	dest[1] = a01*c + a21*-s;
	dest[2] = a02*c + a22*-s;
	dest[3] = a03*c + a23*-s;
	
	dest[8] = a00*s + a20*c;
	dest[9] = a01*s + a21*c;
	dest[10] = a02*s + a22*c;
	dest[11] = a03*s + a23*c;
	return dest;
};

/*
 * mat4.rotateZ
 * Rotates a matrix by the given angle around the Z axis
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotateZ = function(mat, angle, dest) {
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	
	if(!dest) { 
		dest = mat 
	} else if(mat != dest) { // If the source and destination differ, copy the unchanged last row
		dest[8] = mat[8];
		dest[9] = mat[9];
		dest[10] = mat[10];
		dest[11] = mat[11];
		
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
	}
	
	// Perform axis-specific matrix multiplication
	dest[0] = a00*c + a10*s;
	dest[1] = a01*c + a11*s;
	dest[2] = a02*c + a12*s;
	dest[3] = a03*c + a13*s;
	
	dest[4] = a00*-s + a10*c;
	dest[5] = a01*-s + a11*c;
	dest[6] = a02*-s + a12*c;
	dest[7] = a03*-s + a13*c;
	
	return dest;
};

/*
 * mat4.frustum
 * Generates a frustum matrix with the given bounds
 *
 * Params:
 * left, right - scalar, left and right bounds of the frustum
 * bottom, top - scalar, bottom and top bounds of the frustum
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.frustum = function(left, right, bottom, top, near, far, dest) {
	if(!dest) { dest = mat4.create(); }
	var rl = (right - left);
	var tb = (top - bottom);
	var fn = (far - near);
	dest[0] = (near*2) / rl;
	dest[1] = 0;
	dest[2] = 0;
	dest[3] = 0;
	dest[4] = 0;
	dest[5] = (near*2) / tb;
	dest[6] = 0;
	dest[7] = 0;
	dest[8] = (right + left) / rl;
	dest[9] = (top + bottom) / tb;
	dest[10] = -(far + near) / fn;
	dest[11] = -1;
	dest[12] = 0;
	dest[13] = 0;
	dest[14] = -(far*near*2) / fn;
	dest[15] = 0;
	return dest;
};

/*
 * mat4.perspective
 * Generates a perspective projection matrix with the given bounds
 *
 * Params:
 * fovy - scalar, vertical field of view
 * aspect - scalar, aspect ratio. typically viewport width/height
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.perspective = function(fovy, aspect, near, far, dest) {
	var top = near*Math.tan(fovy*Math.PI / 360.0);
	var right = top*aspect;
	return mat4.frustum(-right, right, -top, top, near, far, dest);
};

/*
 * mat4.ortho
 * Generates a orthogonal projection matrix with the given bounds
 *
 * Params:
 * left, right - scalar, left and right bounds of the frustum
 * bottom, top - scalar, bottom and top bounds of the frustum
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.ortho = function(left, right, bottom, top, near, far, dest) {
	if(!dest) { dest = mat4.create(); }
	var rl = (right - left);
	var tb = (top - bottom);
	var fn = (far - near);
	dest[0] = 2 / rl;
	dest[1] = 0;
	dest[2] = 0;
	dest[3] = 0;
	dest[4] = 0;
	dest[5] = 2 / tb;
	dest[6] = 0;
	dest[7] = 0;
	dest[8] = 0;
	dest[9] = 0;
	dest[10] = -2 / fn;
	dest[11] = 0;
	dest[12] = (left + right) / rl;
	dest[13] = (top + bottom) / tb;
	dest[14] = (far + near) / fn;
	dest[15] = 1;
	return dest;
};

/*
 * mat4.ortho
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * Params:
 * eye - vec3, position of the viewer
 * center - vec3, point the viewer is looking at
 * up - vec3 pointing "up"
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.lookAt = function(eye, center, up, dest) {
	if(!dest) { dest = mat4.create(); }
	
	var eyex = eye[0],
		eyey = eye[1],
		eyez = eye[2],
		upx = up[0],
		upy = up[1],
		upz = up[2],
		centerx = center[0],
		centery = center[1],
		centerz = center[2];

	if (eyex == centerx && eyey == centery && eyez == centerz) {
		return mat4.identity(dest);
	}
	
	var z0,z1,z2,x0,x1,x2,y0,y1,y2,len;
	
	//vec3.direction(eye, center, z);
	z0 = eyex - center[0];
	z1 = eyey - center[1];
	z2 = eyez - center[2];
	
	// normalize (no check needed for 0 because of early return)
	len = 1/Math.sqrt(z0*z0 + z1*z1 + z2*z2);
	z0 *= len;
	z1 *= len;
	z2 *= len;
	
	//vec3.normalize(vec3.cross(up, z, x));
	x0 = upy*z2 - upz*z1;
	x1 = upz*z0 - upx*z2;
	x2 = upx*z1 - upy*z0;
	len = Math.sqrt(x0*x0 + x1*x1 + x2*x2);
	if (!len) {
		x0 = 0;
		x1 = 0;
		x2 = 0;
	} else {
		len = 1/len;
		x0 *= len;
		x1 *= len;
		x2 *= len;
	};
	
	//vec3.normalize(vec3.cross(z, x, y));
	y0 = z1*x2 - z2*x1;
	y1 = z2*x0 - z0*x2;
	y2 = z0*x1 - z1*x0;
	
	len = Math.sqrt(y0*y0 + y1*y1 + y2*y2);
	if (!len) {
		y0 = 0;
		y1 = 0;
		y2 = 0;
	} else {
		len = 1/len;
		y0 *= len;
		y1 *= len;
		y2 *= len;
	}
	
	dest[0] = x0;
	dest[1] = y0;
	dest[2] = z0;
	dest[3] = 0;
	dest[4] = x1;
	dest[5] = y1;
	dest[6] = z1;
	dest[7] = 0;
	dest[8] = x2;
	dest[9] = y2;
	dest[10] = z2;
	dest[11] = 0;
	dest[12] = -(x0*eyex + x1*eyey + x2*eyez);
	dest[13] = -(y0*eyex + y1*eyey + y2*eyez);
	dest[14] = -(z0*eyex + z1*eyey + z2*eyez);
	dest[15] = 1;
	
	return dest;
};

/*
 * mat4.str
 * Returns a string representation of a mat4
 *
 * Params:
 * mat - mat4 to represent as a string
 *
 * Returns:
 * string representation of mat
 */
mat4.str = function(mat) {
	return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] + 
		', '+ mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] + 
		', '+ mat[8] + ', ' + mat[9] + ', ' + mat[10] + ', ' + mat[11] + 
		', '+ mat[12] + ', ' + mat[13] + ', ' + mat[14] + ', ' + mat[15] + ']';
};

/*
 * quat4 - Quaternions 
 */
quat4 = {};

/*
 * quat4.create
 * Creates a new instance of a quat4 using the default array type
 * Any javascript array containing at least 4 numeric elements can serve as a quat4
 *
 * Params:
 * quat - Optional, quat4 containing values to initialize with
 *
 * Returns:
 * New quat4
 */
quat4.create = function(quat) {
	var dest = new glMatrixArrayType(4);
	
	if(quat) {
		dest[0] = quat[0];
		dest[1] = quat[1];
		dest[2] = quat[2];
		dest[3] = quat[3];
	}
	
	return dest;
};

/*
 * quat4.set
 * Copies the values of one quat4 to another
 *
 * Params:
 * quat - quat4 containing values to copy
 * dest - quat4 receiving copied values
 *
 * Returns:
 * dest
 */
quat4.set = function(quat, dest) {
	dest[0] = quat[0];
	dest[1] = quat[1];
	dest[2] = quat[2];
	dest[3] = quat[3];
	
	return dest;
};

/*
 * quat4.calculateW
 * Calculates the W component of a quat4 from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length. 
 * Any existing W component will be ignored. 
 *
 * Params:
 * quat - quat4 to calculate W component of
 * dest - Optional, quat4 receiving calculated values. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.calculateW = function(quat, dest) {
	var x = quat[0], y = quat[1], z = quat[2];

	if(!dest || quat == dest) {
		quat[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
		return quat;
	}
	dest[0] = x;
	dest[1] = y;
	dest[2] = z;
	dest[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
	return dest;
}

/*
 * quat4.inverse
 * Calculates the inverse of a quat4
 *
 * Params:
 * quat - quat4 to calculate inverse of
 * dest - Optional, quat4 receiving inverse values. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.inverse = function(quat, dest) {
	if(!dest || quat == dest) {
		quat[0] *= 1;
		quat[1] *= 1;
		quat[2] *= 1;
		return quat;
	}
	dest[0] = -quat[0];
	dest[1] = -quat[1];
	dest[2] = -quat[2];
	dest[3] = quat[3];
	return dest;
}

/*
 * quat4.length
 * Calculates the length of a quat4
 *
 * Params:
 * quat - quat4 to calculate length of
 *
 * Returns:
 * Length of quat
 */
quat4.length = function(quat) {
	var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
	return Math.sqrt(x*x + y*y + z*z + w*w);
}

/*
 * quat4.normalize
 * Generates a unit quaternion of the same direction as the provided quat4
 * If quaternion length is 0, returns [0, 0, 0, 0]
 *
 * Params:
 * quat - quat4 to normalize
 * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.normalize = function(quat, dest) {
	if(!dest) { dest = quat; }
	
	var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
	var len = Math.sqrt(x*x + y*y + z*z + w*w);
	if(len == 0) {
		dest[0] = 0;
		dest[1] = 0;
		dest[2] = 0;
		dest[3] = 0;
		return dest;
	}
	len = 1/len;
	dest[0] = x * len;
	dest[1] = y * len;
	dest[2] = z * len;
	dest[3] = w * len;
	
	return dest;
}

/*
 * quat4.multiply
 * Performs a quaternion multiplication
 *
 * Params:
 * quat - quat4, first operand
 * quat2 - quat4, second operand
 * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.multiply = function(quat, quat2, dest) {
	if(!dest) { dest = quat; }
	
	var qax = quat[0], qay = quat[1], qaz = quat[2], qaw = quat[3];
	var qbx = quat2[0], qby = quat2[1], qbz = quat2[2], qbw = quat2[3];
	
	dest[0] = qax*qbw + qaw*qbx + qay*qbz - qaz*qby;
	dest[1] = qay*qbw + qaw*qby + qaz*qbx - qax*qbz;
	dest[2] = qaz*qbw + qaw*qbz + qax*qby - qay*qbx;
	dest[3] = qaw*qbw - qax*qbx - qay*qby - qaz*qbz;
	
	return dest;
}

/*
 * quat4.multiplyVec3
 * Transforms a vec3 with the given quaternion
 *
 * Params:
 * quat - quat4 to transform the vector with
 * vec - vec3 to transform
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
quat4.multiplyVec3 = function(quat, vec, dest) {
	if(!dest) { dest = vec; }
	
	var x = vec[0], y = vec[1], z = vec[2];
	var qx = quat[0], qy = quat[1], qz = quat[2], qw = quat[3];

	// calculate quat * vec
	var ix = qw*x + qy*z - qz*y;
	var iy = qw*y + qz*x - qx*z;
	var iz = qw*z + qx*y - qy*x;
	var iw = -qx*x - qy*y - qz*z;
	
	// calculate result * inverse quat
	dest[0] = ix*qw + iw*-qx + iy*-qz - iz*-qy;
	dest[1] = iy*qw + iw*-qy + iz*-qx - ix*-qz;
	dest[2] = iz*qw + iw*-qz + ix*-qy - iy*-qx;
	
	return dest;
}

/*
 * quat4.toMat3
 * Calculates a 3x3 matrix from the given quat4
 *
 * Params:
 * quat - quat4 to create matrix from
 * dest - Optional, mat3 receiving operation result
 *
 * Returns:
 * dest if specified, a new mat3 otherwise
 */
quat4.toMat3 = function(quat, dest) {
	if(!dest) { dest = mat3.create(); }
	
	var x = quat[0], y = quat[1], z = quat[2], w = quat[3];

	var x2 = x + x;
	var y2 = y + y;
	var z2 = z + z;

	var xx = x*x2;
	var xy = x*y2;
	var xz = x*z2;

	var yy = y*y2;
	var yz = y*z2;
	var zz = z*z2;

	var wx = w*x2;
	var wy = w*y2;
	var wz = w*z2;

	dest[0] = 1 - (yy + zz);
	dest[1] = xy - wz;
	dest[2] = xz + wy;

	dest[3] = xy + wz;
	dest[4] = 1 - (xx + zz);
	dest[5] = yz - wx;

	dest[6] = xz - wy;
	dest[7] = yz + wx;
	dest[8] = 1 - (xx + yy);
	
	return dest;
}

/*
 * quat4.toMat4
 * Calculates a 4x4 matrix from the given quat4
 *
 * Params:
 * quat - quat4 to create matrix from
 * dest - Optional, mat4 receiving operation result
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
quat4.toMat4 = function(quat, dest) {
	if(!dest) { dest = mat4.create(); }
	
	var x = quat[0], y = quat[1], z = quat[2], w = quat[3];

	var x2 = x + x;
	var y2 = y + y;
	var z2 = z + z;

	var xx = x*x2;
	var xy = x*y2;
	var xz = x*z2;

	var yy = y*y2;
	var yz = y*z2;
	var zz = z*z2;

	var wx = w*x2;
	var wy = w*y2;
	var wz = w*z2;

	dest[0] = 1 - (yy + zz);
	dest[1] = xy - wz;
	dest[2] = xz + wy;
	dest[3] = 0;

	dest[4] = xy + wz;
	dest[5] = 1 - (xx + zz);
	dest[6] = yz - wx;
	dest[7] = 0;

	dest[8] = xz - wy;
	dest[9] = yz + wx;
	dest[10] = 1 - (xx + yy);
	dest[11] = 0;

	dest[12] = 0;
	dest[13] = 0;
	dest[14] = 0;
	dest[15] = 1;
	
	return dest;
}

quat4.slerp = function (quat, quat2, c, dest) {
    dest || (dest = quat);
    var e = c;
    if (quat[0] * quat2[0] + quat[1] * quat2[1] + quat[2] * quat2[2] + quat[3] * quat2[3] < 0) e = -1 * c;
    dest[0] = 1 - c * quat[0] + e * quat2[0];
    dest[1] = 1 - c * quat[1] + e * quat2[1];
    dest[2] = 1 - c * quat[2] + e * quat2[2];
    dest[3] = 1 - c * quat[3] + e * quat2[3];
    return dest
};

/*
 * quat4.str
 * Returns a string representation of a quaternion
 *
 * Params:
 * quat - quat4 to represent as a string
 *
 * Returns:
 * string representation of quat
 */
quat4.str = function(quat) {
	return '[' + quat[0] + ', ' + quat[1] + ', ' + quat[2] + ', ' + quat[3] + ']'; 
};

//Copyright (c) 2009 The Chromium Authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that can be
//found in the LICENSE file.

// Various functions for helping debug WebGL apps.

WebGLDebugUtils = function() {

/**
 * Wrapped logging function.
 * @param {string} msg Message to log.
 */
var log = function(msg) {
  if (window.console && window.console.log) {
    window.console.log(msg);
  }
};

/**
 * Which arguements are enums.
 * @type {!Object.<number, string>}
 */
var glValidEnumContexts = {

  // Generic setters and getters

  'enable': { 0:true },
  'disable': { 0:true },
  'getParameter': { 0:true },

  // Rendering

  'drawArrays': { 0:true },
  'drawElements': { 0:true, 2:true },

  // Shaders

  'createShader': { 0:true },
  'getShaderParameter': { 1:true },
  'getProgramParameter': { 1:true },

  // Vertex attributes

  'getVertexAttrib': { 1:true },
  'vertexAttribPointer': { 2:true },

  // Textures

  'bindTexture': { 0:true },
  'activeTexture': { 0:true },
  'getTexParameter': { 0:true, 1:true },
  'texParameterf': { 0:true, 1:true },
  'texParameteri': { 0:true, 1:true, 2:true },
  'texImage2D': { 0:true, 2:true, 6:true, 7:true },
  'texSubImage2D': { 0:true, 6:true, 7:true },
  'copyTexImage2D': { 0:true, 2:true },
  'copyTexSubImage2D': { 0:true },
  'generateMipmap': { 0:true },

  // Buffer objects

  'bindBuffer': { 0:true },
  'bufferData': { 0:true, 2:true },
  'bufferSubData': { 0:true },
  'getBufferParameter': { 0:true, 1:true },

  // Renderbuffers and framebuffers

  'pixelStorei': { 0:true, 1:true },
  'readPixels': { 4:true, 5:true },
  'bindRenderbuffer': { 0:true },
  'bindFramebuffer': { 0:true },
  'checkFramebufferStatus': { 0:true },
  'framebufferRenderbuffer': { 0:true, 1:true, 2:true },
  'framebufferTexture2D': { 0:true, 1:true, 2:true },
  'getFramebufferAttachmentParameter': { 0:true, 1:true, 2:true },
  'getRenderbufferParameter': { 0:true, 1:true },
  'renderbufferStorage': { 0:true, 1:true },

  // Frame buffer operations (clear, blend, depth test, stencil)

  'clear': { 0:true },
  'depthFunc': { 0:true },
  'blendFunc': { 0:true, 1:true },
  'blendFuncSeparate': { 0:true, 1:true, 2:true, 3:true },
  'blendEquation': { 0:true },
  'blendEquationSeparate': { 0:true, 1:true },
  'stencilFunc': { 0:true },
  'stencilFuncSeparate': { 0:true, 1:true },
  'stencilMaskSeparate': { 0:true },
  'stencilOp': { 0:true, 1:true, 2:true },
  'stencilOpSeparate': { 0:true, 1:true, 2:true, 3:true },

  // Culling

  'cullFace': { 0:true },
  'frontFace': { 0:true },
};

/**
 * Map of numbers to names.
 * @type {Object}
 */
var glEnums = null;

/**
 * Initializes this module. Safe to call more than once.
 * @param {!WebGLRenderingContext} ctx A WebGL context. If
 *    you have more than one context it doesn't matter which one
 *    you pass in, it is only used to pull out constants.
 */
function init(ctx) {
  if (glEnums == null) {
    glEnums = { };
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'number') {
        glEnums[ctx[propertyName]] = propertyName;
      }
    }
  }
}

/**
 * Checks the utils have been initialized.
 */
function checkInit() {
  if (glEnums == null) {
    throw 'WebGLDebugUtils.init(ctx) not called';
  }
}

/**
 * Returns true or false if value matches any WebGL enum
 * @param {*} value Value to check if it might be an enum.
 * @return {boolean} True if value matches one of the WebGL defined enums
 */
function mightBeEnum(value) {
  checkInit();
  return (glEnums[value] !== undefined);
}

/**
 * Gets an string version of an WebGL enum.
 *
 * Example:
 *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
 *
 * @param {number} value Value to return an enum for
 * @return {string} The string version of the enum.
 */
function glEnumToString(value) {
  checkInit();
  var name = glEnums[value];
  return (name !== undefined) ? name :
      ("*UNKNOWN WebGL ENUM (0x" + value.toString(16) + ")");
}

/**
 * Returns the string version of a WebGL argument.
 * Attempts to convert enum arguments to strings.
 * @param {string} functionName the name of the WebGL function.
 * @param {number} argumentIndx the index of the argument.
 * @param {*} value The value of the argument.
 * @return {string} The value as a string.
 */
function glFunctionArgToString(functionName, argumentIndex, value) {
  var funcInfo = glValidEnumContexts[functionName];
  if (funcInfo !== undefined) {
    if (funcInfo[argumentIndex]) {
      return glEnumToString(value);
    }
  }
  return value.toString();
}

function makePropertyWrapper(wrapper, original, propertyName) {
  //log("wrap prop: " + propertyName);
  wrapper.__defineGetter__(propertyName, function() {
    return original[propertyName];
  });
  // TODO(gmane): this needs to handle properties that take more than
  // one value?
  wrapper.__defineSetter__(propertyName, function(value) {
    //log("set: " + propertyName);
    original[propertyName] = value;
  });
}

// Makes a function that calls a function on another object.
function makeFunctionWrapper(original, functionName) {
  //log("wrap fn: " + functionName);
  var f = original[functionName];
  return function() {
    //log("call: " + functionName);
    var result = f.apply(original, arguments);
    return result;
  };
}

/**
 * Given a WebGL context returns a wrapped context that calls
 * gl.getError after every command and calls a function if the
 * result is not gl.NO_ERROR.
 *
 * @param {!WebGLRenderingContext} ctx The webgl context to
 *        wrap.
 * @param {!function(err, funcName, args): void} opt_onErrorFunc
 *        The function to call when gl.getError returns an
 *        error. If not specified the default function calls
 *        console.log with a message.
 */
function makeDebugContext(ctx, opt_onErrorFunc) {
  init(ctx);
  opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
        // apparently we can't do args.join(",");
        var argStr = "";
        for (var ii = 0; ii < args.length; ++ii) {
          argStr += ((ii == 0) ? '' : ', ') +
              glFunctionArgToString(functionName, ii, args[ii]);
        }
        log("WebGL error "+ glEnumToString(err) + " in "+ functionName +
            "(" + argStr + ")");
      };

  // Holds booleans for each GL error so after we get the error ourselves
  // we can still return it to the client app.
  var glErrorShadow = { };

  // Makes a function that calls a WebGL function and then calls getError.
  function makeErrorWrapper(ctx, functionName) {
    return function() {
      var result = ctx[functionName].apply(ctx, arguments);
      var err = ctx.getError();
      if (err != 0) {
        glErrorShadow[err] = true;
        opt_onErrorFunc(err, functionName, arguments);
      }
      return result;
    };
  }

  // Make a an object that has a copy of every property of the WebGL context
  // but wraps all functions.
  var wrapper = {};
  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
       wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
     } else {
       makePropertyWrapper(wrapper, ctx, propertyName);
     }
  }

  // Override the getError function with one that returns our saved results.
  wrapper.getError = function() {
    for (var err in glErrorShadow) {
      if (glErrorShadow[err]) {
        glErrorShadow[err] = false;
        return err;
      }
    }
    return ctx.NO_ERROR;
  };

  return wrapper;
}

function resetToInitialState(ctx) {
  var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
  var tmp = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
  for (var ii = 0; ii < numAttribs; ++ii) {
    ctx.disableVertexAttribArray(ii);
    ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
    ctx.vertexAttrib1f(ii, 0);
  }
  ctx.deleteBuffer(tmp);

  var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
  for (var ii = 0; ii < numTextureUnits; ++ii) {
    ctx.activeTexture(ctx.TEXTURE0 + ii);
    ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
    ctx.bindTexture(ctx.TEXTURE_2D, null);
  }

  ctx.activeTexture(ctx.TEXTURE0);
  ctx.useProgram(null);
  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
  ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
  ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
  ctx.disable(ctx.BLEND);
  ctx.disable(ctx.CULL_FACE);
  ctx.disable(ctx.DEPTH_TEST);
  ctx.disable(ctx.DITHER);
  ctx.disable(ctx.SCISSOR_TEST);
  ctx.blendColor(0, 0, 0, 0);
  ctx.blendEquation(ctx.FUNC_ADD);
  ctx.blendFunc(ctx.ONE, ctx.ZERO);
  ctx.clearColor(0, 0, 0, 0);
  ctx.clearDepth(1);
  ctx.clearStencil(-1);
  ctx.colorMask(true, true, true, true);
  ctx.cullFace(ctx.BACK);
  ctx.depthFunc(ctx.LESS);
  ctx.depthMask(true);
  ctx.depthRange(0, 1);
  ctx.frontFace(ctx.CCW);
  ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
  ctx.lineWidth(1);
  ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
  ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  // TODO: Delete this IF.
  if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
    ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
  }
  ctx.polygonOffset(0, 0);
  ctx.sampleCoverage(1, false);
  ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
  ctx.stencilMask(0xFFFFFFFF);
  ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
  ctx.viewport(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

  // TODO: This should NOT be needed but Firefox fails with 'hint'
  while(ctx.getError());
}

function makeLostContextSimulatingCanvas(canvas) {
  var unwrappedContext_;
  var wrappedContext_;
  var onLost_ = [];
  var onRestored_ = [];
  var wrappedContext_ = {};
  var contextId_ = 1;
  var contextLost_ = false;
  var resourceId_ = 0;
  var resourceDb_ = [];
  var numCallsToLoseContext_ = 0;
  var numCalls_ = 0;
  var canRestore_ = false;
  var restoreTimeout_ = 0;

  // Holds booleans for each GL error so can simulate errors.
  var glErrorShadow_ = { };

  canvas.getContext = function(f) {
    return function() {
      var ctx = f.apply(canvas, arguments);
      // Did we get a context and is it a WebGL context?
      if (ctx instanceof WebGLRenderingContext) {
        if (ctx != unwrappedContext_) {
          if (unwrappedContext_) {
            throw "got different context"
          }
          unwrappedContext_ = ctx;
          wrappedContext_ = makeLostContextSimulatingContext(unwrappedContext_);
        }
        return wrappedContext_;
      }
      return ctx;
    }
  }(canvas.getContext);

  function wrapEvent(listener) {
    if (typeof(listener) == "function") {
      return listener;
    } else {
      return function(info) {
        listener.handleEvent(info);
      }
    }
  }

  var addOnContextLostListener = function(listener) {
    onLost_.push(wrapEvent(listener));
  };

  var addOnContextRestoredListener = function(listener) {
    onRestored_.push(wrapEvent(listener));
  };


  function wrapAddEventListener(canvas) {
    var f = canvas.addEventListener;
    canvas.addEventListener = function(type, listener, bubble) {
      switch (type) {
        case 'webglcontextlost':
          addOnContextLostListener(listener);
          break;
        case 'webglcontextrestored':
          addOnContextRestoredListener(listener);
          break;
        default:
          f.apply(canvas, arguments);
      }
    };
  }

  wrapAddEventListener(canvas);

  canvas.loseContext = function() {
    if (!contextLost_) {
      contextLost_ = true;
      numCallsToLoseContext_ = 0;
      ++contextId_;
      while (unwrappedContext_.getError());
      clearErrors();
      glErrorShadow_[unwrappedContext_.CONTEXT_LOST_WEBGL] = true;
      var event = makeWebGLContextEvent("context lost");
      var callbacks = onLost_.slice();
      setTimeout(function() {
          //log("numCallbacks:" + callbacks.length);
          for (var ii = 0; ii < callbacks.length; ++ii) {
            //log("calling callback:" + ii);
            callbacks[ii](event);
          }
          if (restoreTimeout_ >= 0) {
            setTimeout(function() {
                canvas.restoreContext();
              }, restoreTimeout_);
          }
        }, 0);
    }
  };

  canvas.restoreContext = function() {
    if (contextLost_) {
      if (onRestored_.length) {
        setTimeout(function() {
            if (!canRestore_) {
              throw "can not restore. webglcontestlost listener did not call event.preventDefault";
            }
            freeResources();
            resetToInitialState(unwrappedContext_);
            contextLost_ = false;
            numCalls_ = 0;
            canRestore_ = false;
            var callbacks = onRestored_.slice();
            var event = makeWebGLContextEvent("context restored");
            for (var ii = 0; ii < callbacks.length; ++ii) {
              callbacks[ii](event);
            }
          }, 0);
      }
    }
  };

  canvas.loseContextInNCalls = function(numCalls) {
    if (contextLost_) {
      throw "You can not ask a lost contet to be lost";
    }
    numCallsToLoseContext_ = numCalls_ + numCalls;
  };

  canvas.getNumCalls = function() {
    return numCalls_;
  };

  function isWebGLObject(obj) {
    //return false;
    return (obj instanceof WebGLBuffer ||
            obj instanceof WebGLFramebuffer ||
            obj instanceof WebGLProgram ||
            obj instanceof WebGLRenderbuffer ||
            obj instanceof WebGLShader ||
            obj instanceof WebGLTexture);
  }

  function checkResources(args) {
    for (var ii = 0; ii < args.length; ++ii) {
      var arg = args[ii];
      if (isWebGLObject(arg)) {
        return arg.__webglDebugContextLostId__ == contextId_;
      }
    }
    return true;
  }

  function clearErrors() {
    var k = Object.keys(glErrorShadow_);
    for (var ii = 0; ii < k.length; ++ii) {
      delete glErrorShadow_[k];
    }
  }

  function loseContextIfTime() {
    ++numCalls_;
    if (!contextLost_) {
      if (numCallsToLoseContext_ == numCalls_) {
        canvas.loseContext();
      }
    }
  }

  // Makes a function that simulates WebGL when out of context.
  function makeLostContextFunctionWrapper(ctx, functionName) {
    var f = ctx[functionName];
    return function() {
      // log("calling:" + functionName);
      // Only call the functions if the context is not lost.
      loseContextIfTime();
      if (!contextLost_) {
        //if (!checkResources(arguments)) {
        //  glErrorShadow_[wrappedContext_.INVALID_OPERATION] = true;
        //  return;
        //}
        var result = f.apply(ctx, arguments);
        return result;
      }
    };
  }

  function freeResources() {
    for (var ii = 0; ii < resourceDb_.length; ++ii) {
      var resource = resourceDb_[ii];
      if (resource instanceof WebGLBuffer) {
        unwrappedContext_.deleteBuffer(resource);
      } else if (resource instanceof WebGLFramebuffer) {
        unwrappedContext_.deleteFramebuffer(resource);
      } else if (resource instanceof WebGLProgram) {
        unwrappedContext_.deleteProgram(resource);
      } else if (resource instanceof WebGLRenderbuffer) {
        unwrappedContext_.deleteRenderbuffer(resource);
      } else if (resource instanceof WebGLShader) {
        unwrappedContext_.deleteShader(resource);
      } else if (resource instanceof WebGLTexture) {
        unwrappedContext_.deleteTexture(resource);
      }
    }
  }

  function makeWebGLContextEvent(statusMessage) {
    return {
      statusMessage: statusMessage,
      preventDefault: function() {
          canRestore_ = true;
        }
    };
  }

  return canvas;

  function makeLostContextSimulatingContext(ctx) {
    // copy all functions and properties to wrapper
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'function') {
         wrappedContext_[propertyName] = makeLostContextFunctionWrapper(
             ctx, propertyName);
       } else {
         makePropertyWrapper(wrappedContext_, ctx, propertyName);
       }
    }

    // Wrap a few functions specially.
    wrappedContext_.getError = function() {
      loseContextIfTime();
      if (!contextLost_) {
        var err;
        while (err = unwrappedContext_.getError()) {
          glErrorShadow_[err] = true;
        }
      }
      for (var err in glErrorShadow_) {
        if (glErrorShadow_[err]) {
          delete glErrorShadow_[err];
          return err;
        }
      }
      return wrappedContext_.NO_ERROR;
    };

    var creationFunctions = [
      "createBuffer",
      "createFramebuffer",
      "createProgram",
      "createRenderbuffer",
      "createShader",
      "createTexture"
    ];
    for (var ii = 0; ii < creationFunctions.length; ++ii) {
      var functionName = creationFunctions[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return null;
          }
          var obj = f.apply(ctx, arguments);
          obj.__webglDebugContextLostId__ = contextId_;
          resourceDb_.push(obj);
          return obj;
        };
      }(ctx[functionName]);
    }

    var functionsThatShouldReturnNull = [
      "getActiveAttrib",
      "getActiveUniform",
      "getBufferParameter",
      "getContextAttributes",
      "getAttachedShaders",
      "getFramebufferAttachmentParameter",
      "getParameter",
      "getProgramParameter",
      "getProgramInfoLog",
      "getRenderbufferParameter",
      "getShaderParameter",
      "getShaderInfoLog",
      "getShaderSource",
      "getTexParameter",
      "getUniform",
      "getUniformLocation",
      "getVertexAttrib"
    ];
    for (var ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
      var functionName = functionsThatShouldReturnNull[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return null;
          }
          return f.apply(ctx, arguments);
        }
      }(wrappedContext_[functionName]);
    }

    var isFunctions = [
      "isBuffer",
      "isEnabled",
      "isFramebuffer",
      "isProgram",
      "isRenderbuffer",
      "isShader",
      "isTexture"
    ];
    for (var ii = 0; ii < isFunctions.length; ++ii) {
      var functionName = isFunctions[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return false;
          }
          return f.apply(ctx, arguments);
        }
      }(wrappedContext_[functionName]);
    }

    wrappedContext_.checkFramebufferStatus = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return wrappedContext_.FRAMEBUFFER_UNSUPPORTED;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.checkFramebufferStatus);

    wrappedContext_.getAttribLocation = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return -1;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.getAttribLocation);

    wrappedContext_.getVertexAttribOffset = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return 0;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.getVertexAttribOffset);

    wrappedContext_.isContextLost = function() {
      return contextLost_;
    };

    return wrappedContext_;
  }
}

return {
    /**
     * Initializes this module. Safe to call more than once.
     * @param {!WebGLRenderingContext} ctx A WebGL context. If
    }
   *    you have more than one context it doesn't matter which one
   *    you pass in, it is only used to pull out constants.
   */
  'init': init,

  /**
   * Returns true or false if value matches any WebGL enum
   * @param {*} value Value to check if it might be an enum.
   * @return {boolean} True if value matches one of the WebGL defined enums
   */
  'mightBeEnum': mightBeEnum,

  /**
   * Gets an string version of an WebGL enum.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
   *
   * @param {number} value Value to return an enum for
   * @return {string} The string version of the enum.
   */
  'glEnumToString': glEnumToString,

  /**
   * Converts the argument of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 0, gl.TEXTURE_2D);
   *
   * would return 'TEXTURE_2D'
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} argumentIndx the index of the argument.
   * @param {*} value The value of the argument.
   * @return {string} The value as a string.
   */
  'glFunctionArgToString': glFunctionArgToString,

  /**
   * Given a WebGL context returns a wrapped context that calls
   * gl.getError after every command and calls a function if the
   * result is not NO_ERROR.
   *
   * You can supply your own function if you want. For example, if you'd like
   * an exception thrown on any GL error you could do this
   *
   *    function throwOnGLError(err, funcName, args) {
   *      throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to" +
   *            funcName;
   *    };
   *
   *    ctx = WebGLDebugUtils.makeDebugContext(
   *        canvas.getContext("webgl"), throwOnGLError);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
   *     to call when gl.getError returns an error. If not specified the default
   *     function calls console.log with a message.
   */
  'makeDebugContext': makeDebugContext,

  /**
   * Given a canvas element returns a wrapped canvas element that will
   * simulate lost context. The canvas returned adds the following functions.
   *
   * loseContext:
   *   simulates a lost context event.
   *
   * restoreContext:
   *   simulates the context being restored.
   *
   * lostContextInNCalls:
   *   loses the context after N gl calls.
   *
   * getNumCalls:
   *   tells you how many gl calls there have been so far.
   *
   * setRestoreTimeout:
   *   sets the number of milliseconds until the context is restored
   *   after it has been lost. Defaults to 0. Pass -1 to prevent
   *   automatic restoring.
   *
   * @param {!Canvas} canvas The canvas element to wrap.
   */
  'makeLostContextSimulatingCanvas': makeLostContextSimulatingCanvas,

  /**
   * Resets a context to the initial state.
   * @param {!WebGLRenderingContext} ctx The webgl context to
   *     reset.
   */
  'resetToInitialState': resetToInitialState
};

}();

/*

 * Copyright 2010, Google Inc.

 * All rights reserved.

 *

 * Redistribution and use in source and binary forms, with or without

 * modification, are permitted provided that the following conditions are

 * met:

 *

 *     * Redistributions of source code must retain the above copyright

 * notice, this list of conditions and the following disclaimer.

 *     * Redistributions in binary form must reproduce the above

 * copyright notice, this list of conditions and the following disclaimer

 * in the documentation and/or other materials provided with the

 * distribution.

 *     * Neither the name of Google Inc. nor the names of its

 * contributors may be used to endorse or promote products derived from

 * this software without specific prior written permission.

 *

 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS

 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT

 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR

 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT

 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,

 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT

 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,

 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY

 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT

 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE

 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 */





/**

 * @fileoverview This file contains functions every webgl program will need

 * a version of one way or another.

 *

 * Instead of setting up a context manually it is recommended to

 * use. This will check for success or failure. On failure it

 * will attempt to present an approriate message to the user.

 *

 *       gl = WebGLUtils.setupWebGL(canvas);

 *

 * For animated WebGL apps use of setTimeout or setInterval are

 * discouraged. It is recommended you structure your rendering

 * loop like this.

 *

 *       function render() {

 *         window.requestAnimFrame(render, canvas);

 *

 *         // do rendering

 *         ...

 *       }

 *       render();

 *

 * This will call your rendering function up to the refresh rate

 * of your display but will stop rendering if your app is not

 * visible.

 */



WebGLUtils = function() {



/**

 * Creates the HTLM for a failure message

 * @param {string} canvasContainerId id of container of th

 *        canvas.

 * @return {string} The html.

 */

var makeFailHTML = function(msg) {

  return '' +

    '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +

    '<td align="center">' +

    '<div style="display: table-cell; vertical-align: middle;">' +

    '<div style="">' + msg + '</div>' +

    '</div>' +

    '</td></tr></table>';

};



/**

 * Mesasge for getting a webgl browser

 * @type {string}

 */

var GET_A_WEBGL_BROWSER = '' +

  'This page requires a browser that supports WebGL.<br/>' +

  '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';



/**

 * Mesasge for need better hardware

 * @type {string}

 */

var OTHER_PROBLEM = '' +

  "It doesn't appear your computer can support WebGL.<br/>" +

  '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';



/**

 * Creates a webgl context. If creation fails it will

 * change the contents of the container of the <canvas>

 * tag to an error message with the correct links for WebGL.

 * @param {Element} canvas. The canvas element to create a

 *     context from.

 * @param {WebGLContextCreationAttirbutes} opt_attribs Any

 *     creation attributes you want to pass in.

 * @param {function:(msg)} opt_onError An function to call

 *     if there is an error during creation.

 * @return {WebGLRenderingContext} The created context.

 */

var setupWebGL = function(canvas, opt_attribs, opt_onError) {

  function handleCreationError(msg) {

    var container = canvas.parentNode;

    if (container) {

      var str = window.WebGLRenderingContext ?

           OTHER_PROBLEM :

           GET_A_WEBGL_BROWSER;

      if (msg) {

        str += "<br/><br/>Status: " + msg;

      }

      container.innerHTML = makeFailHTML(str);

    }

  };



  opt_onError = opt_onError || handleCreationError;



  if (canvas.addEventListener) {

    canvas.addEventListener("webglcontextcreationerror", function(event) {

          opt_onError(event.statusMessage);

        }, false);

  }

  var context = create3DContext(canvas, opt_attribs);

  if (!context) {

    if (!window.WebGLRenderingContext) {

      opt_onError("");

    }

  }

  return context;

};



/**

 * Creates a webgl context.

 * @param {!Canvas} canvas The canvas tag to get context

 *     from. If one is not passed in one will be created.

 * @return {!WebGLContext} The created context.

 */

var create3DContext = function(canvas, opt_attribs) {

  var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

  var context = null;

  for (var ii = 0; ii < names.length; ++ii) {

    try {

      context = canvas.getContext(names[ii], opt_attribs);

    } catch(e) {}

    if (context) {

      break;

    }

  }

  return context;

}



return {

  create3DContext: create3DContext,

  setupWebGL: setupWebGL

};

}();



/**

 * Provides requestAnimationFrame in a cross browser way.

 */

window.requestAnimFrame = (function() {

  return window.requestAnimationFrame ||

         window.webkitRequestAnimationFrame ||

         window.mozRequestAnimationFrame ||

         window.oRequestAnimationFrame ||

         window.msRequestAnimationFrame ||

         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {

           window.setTimeout(callback, 1000/60);

         };

})();



//Requires:
//          glMatrix.js -     Googles Matrix Library
//          webgl-util.js  -  Google webgl context generation tool (checks for proper format based upon browser)
//          webgl-debug.js -  Google webgl debug context generation
function degToRad(degrees) {
        return degrees * (Math.PI / 180.0);
}

function radToDegrees(rad) {
        return rad * (180.0 / Math.PI);
}

com.jahova.os.Instance().Cores.Instance().Graphics = (function()
{
    var pInstance;

    function constructor()
    {
        //PRIVATE ATTRIBUTES
        var NAME = "JaHOVA OS Internal API : Graphics Core";
        var VERSION = "0v5";
        var PATH = "scripts/jahovaos/graphics/jahova.os.cores.graphics.js";
        var ID = null;
        
        var os = com.jahova.os.Instance();
        var utilities = com.jahova.utilities.Instance();
        
        var _viewport = {
                width:  0,
                height: 0
            };
            
        var _fullscreen = false;
        
        var _pause = false;
        
        var _canvas = null;     //WebGL Canvas Object
        
        var _update      = null;
        var _updateScope = null;
        
        var _draw       = null;
        var _drawScope  = null;
        
        var _reset      = null;
        var _resetScope = null;
        
        //PRIVATE METHODS
        var _get3DContext = function(canvas, opt_attribs) {
            var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
            var context = null;
            for (var ii = 0; ii < names.length; ++ii) {
              try {
                context = canvas.getContext(names[ii], opt_attribs);
              } catch(e) {}
              if (context) {
                break;
              }
            }
            if(context){}
            else{
              alert("Could Not Create WebGL Context");
            }
            
            return context;
        }

        
        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                   window.webkitRequestAnimationFrame ||
                   window.mozRequestAnimationFrame ||
                   window.oRequestAnimationFrame ||
                   window.msRequestAnimationFrame ||
                   function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                     window.setTimeout(callback, 1000/60);
                   };
          })();
        //Private Classes
        CVertexShader = function(key, url){
            this.filename = url;
            this.name = key;
            this.loaded = false;
            this.code = "";
            this.shader = null;
            this.compiled = false;
            this.onLoad = null;
            this.Load = function(){
                var xhr = os.resschmgr.Create.XHRObject();
                var filepath = this.filename;
                //os.console.Comment("Requesting:\n" + filepath);
                
                xhr.open('GET',filepath,false);
                xhr.onreadystatechange = function(){
                  if(xhr.readyState==4){ //4==DONE
                        if((xhr.status == 200) || (xhr.status == 0))
                        {
                            this.code = xhr.responseText;
                            this.loaded = true;
                            this.Initialize();
                            if(this.onLoad){
                                this.onLoad();
                            }
                        }
                        else{
                            os.windows.Create.ErrorWindow('Shader Failer', "Failed to load Vertex Shader: " + this.name +"<br/>At URL: " + this.filename + "<br/><br/>Check url and filename");
                        }
                  }
                    
                }.bind(this);
                
                xhr.send();
            };
            
            this.Initialize = function(){
                var gl = os.graphics.gl;
                
                //Create Shader Object
                this.shader = gl.createShader(gl.VERTEX_SHADER);
                
                //Add Code to Shader Object
                gl.shaderSource(this.shader, this.code);
                
                //Compile Shader
                gl.compileShader(this.shader);
                
                //Verify Shader was able to compile without Errors
                if(!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)){
                    os.windows.Create.ErrorWindow("Shader Compile Error","Vertex Shader: " + this.name + "<br/><br/>" + gl.getShaderInfoLog(this.shader));
                }
                else{
                    this.compiled = true;
                }
            }.bind(this);
            
            this.Load();
        };
        
        CFragmentShader = function(key, url){
            this.filename = url;
            this.name = key;
            this.loaded = false;
            this.code = "";
            this.shader = null;
            this.onLoad = null;
            this.Load = function(){
                var xhr = os.resschmgr.Create.XHRObject();
                var filepath = this.filename;
                //os.console.Comment("Requesting:\n" + filepath);
                
                xhr.open('GET',filepath,false);
                xhr.onreadystatechange = function(){
                  if(xhr.readyState==4){ //4==DONE
                        if((xhr.status == 200) || (xhr.status == 0))
                        {
                            this.code = xhr.responseText;
                            this.loaded = true;
                            this.Initialize();
                            if(this.onLoad){
                                this.onLoad();
                            }
                        }
                        else{
                            os.windows.Create.ErrorWindow('Shader Failer', "Failed to load Fragment Shader: " + this.name +"<br/>At URL: " + this.filename + "<br/><br/>Check url and filename");
                        }
                  }
                    
                }.bind(this);
                
                xhr.send();
            };
            
            this.Initialize = function(){
                var gl = os.graphics.gl;
                
                //Create Shader Object
                this.shader = gl.createShader(gl.FRAGMENT_SHADER);
                
                //Add Code to Shader Object
                gl.shaderSource(this.shader, this.code);
                
                //Compile Shader
                gl.compileShader(this.shader);
                
                //Verify Shader was able to compile without Errors
                if(!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)){
                    os.windows.Create.ErrorWindow("Shader Compile Error", "Fragment Shader: " + this.name + "<br/><br/>" +gl.getShaderInfoLog(this.shader));
                }
                else{
                    this.compiled = true;
                }
            }.bind(this);
            
            this.Load();
        };
        
        CProgram = function(vs, fs, key){
            var gl = os.graphics.gl;
            
            this.name = key;
            this.compiled = false;
            this.attributes = os.resschmgr.Create.Map();
            this.uniforms = os.resschmgr.Create.Map();
            
            //Get fragment and vertex shader objects
            this.fragment = os.graphics.Managers.Shader.Maps.FragmentShaders.get(fs);
            this.vertex = os.graphics.Managers.Shader.Maps.VertexShaders.get(vs);
            
            //Create program object
            this.program = gl.createProgram();
            
            //Attach compiled shaders to program
            gl.attachShader(this.program, this.fragment.shader);
            gl.attachShader(this.program, this.vertex.shader);
            
            //Link/build program
            gl.linkProgram(this.program);
            
            //Test if linking was successful
            if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)){
                os.windows.Create.ErrorWindow("Program Link Error", "Program: " + this.name + "<br/><br/>Unable to initialize program<br/><br/>" + gl.getProgramInfoLog(this.program))

            }
            else
                this.compiled = true;
            
            this.CreateAttribute = function(aName){
                
                //Test if program is active, if not, set active
                if(os.graphics.Managers.Shader.ActiveProgram != this.name){
                    os.graphics.Managers.Shader.SetActiveProgram(this);
                }
                
                //Get pointer to attribute variable in program
                var attrib = gl.getAttribLocation(this.program, aName);
                
                //Save attribute pointer in map
                this.attributes.put(aName, attrib);
                
                //Enable Attribute in Shader
                gl.enableVertexAttribArray(attrib);
            };
            
            this.CreateUniform = function(uName){
                //Test if program is active, if not, set active
                if(os.graphics.Managers.Shader.ActiveProgram != this.name){
                    os.graphics.Managers.Shader.SetActiveProgram(this);
                }
                
                //Get pointer to attribute variable in program
                var uniform = gl.getUniformLocation(this.program, uName);
                
                //Save attribute pointer in map
                this.uniforms.put(uName, uniform);
                
            }
            
        };
        
        CShader = function(prg){
            //Maps to hold shader varibles
            this.Uniforms = os.resschmgr.Create.Map();
            this.Attributes = os.resschmgr.Create.Map();
            
            //Shader Program Object
            this.Program = prg;
            
            //Connect Variable to Attribute in Program
            this.AddAttribute = function(shdVarName, shdDataType, jsBufferPointer, attributeType, itemSize){
                //Test if program is active, if not, set active
                if(os.graphics.Managers.Shader.ActiveProgram != this.name){
                    os.graphics.Managers.Shader.SetActiveProgram(this);
                }
                
                var a = os.graphics.Managers.Shader.Create.Attribute(shdVarName, shdDataType, attributeType);
                a.location = this.Program.attributes.get(shdVarName);
                
                //If attribute Type = Vertex, Normal or Texture, don't need jsBufferPointer,
                //  values will be pulled from active mesh during draw call
    
                //If type is CUSTOM, gl.Buffer object needs to be created
                //      and jsBufferPointer needs to be loaded as data values
                //      pointer to attribute array must be set so it
                //      can be binded on loop through in Shader Draw method
                if(attributeType.toUpperCase() == "CUSTOM"){
                    var gl = os.graphics.gl;
                    
                    //Create WebGL Buffer to hold Vertex Normals
                    a.value = gl.createBuffer();
                    
                    //Set array as Active Buffer for WebGL Operations
                    gl.bindBuffer(gl.ARRAY_BUFFER, a.buffer);
                        
                    //Set Array as Data for Active Buffer 
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(jsBufferPointer), gl.STATIC_DRAW);
                    
                    //3 Elements Per Data Point
                    a.buffer.itemSize = itemSize;
                    
                    //Total Number Data points
                    a.buffer.numItems = jsBufferPointer.length / a.buffer.itemSize;
                        
                }
                
                this.Attributes.put(a.key, a);
            }.bind(this);
            
            //Connect Variable to Uniform in Program
            this.AddUniform = function(shdVarName, shdVarType, jsVarPtr){
                //Test if program is active, if not, set active
                if(os.graphics.Managers.Shader.ActiveProgram != this.Program.name){
                    os.graphics.Managers.Shader.SetActiveProgram(this.Program.name);
                }
                
                var u  = os.graphics.Managers.Shader.Create.Uniform(shdVarName, shdVarType, jsVarPtr);
                u.location = this.Program.uniforms.get(shdVarName);
                
                this.Uniforms.put(u.key, u);
            }.bind(this);
            //Bind Attribute Buffers
            this.BindAttributes = function(msh){
                var gl = os.graphics.gl;
                //loop this.Attributes
                //  if attributeType == CUSTOM, bind data in value property
                //  if attributeType == VERTEX, set mesh.Buffer.Vertex as data
                for(var i = this.Attributes.size; i--; this.Attributes.next()){
                    
                    var a = this.Attributes.value();
                    
                    if(a.attributeType.toUpperCase() == "CUSTOM"){
                        gl.bindBuffer(gl.ARRAY_BUFFER,a.buffer );
                        gl.vertexAttribPointer(a.location, a.buffer.itemSize, gl.FLOAT, false, 0, 0);
                    }
                    else{
                        if(this.Attributes.value().attributeType.toUpperCase() == "VERTEX"){
                            gl.bindBuffer(gl.ARRAY_BUFFER, msh.Buffers.Vertex );
                            gl.vertexAttribPointer(a.location, msh.Buffers.Vertex.itemSize, gl.FLOAT, false, 0, 0);
                        }
                        else if(this.Attributes.value().attributeType.toUpperCase() == "NORMAL"){
                            gl.bindBuffer(gl.ARRAY_BUFFER, msh.Buffers.Normal );
                            gl.vertexAttribPointer(a.location, msh.Buffers.Normal.itemSize, gl.FLOAT, false, 0, 0);
                        }
                        else if(this.Attributes.value().attributeType.toUpperCase() == "TEXTURE"){
                            gl.bindBuffer(gl.ARRAY_BUFFER, msh.Buffers.Texture );
                            gl.vertexAttribPointer(a.location, msh.Buffers.Texture.itemSize, gl.FLOAT, false, 0, 0);
                        }
                        else if(this.Attributes.value().attributeType.toUpperCase() == "INSTANCE"){
                            gl.bindBuffer(gl.ARRAY_BUFFER, msh.Buffers.Instance );
                            gl.vertexAttribPointer(a.location, msh.Buffers.Instance.itemSize, gl.FLOAT, false, 0, 0);
                        }
                    }
                }
            }.bind(this);
            
            //Set Uniform values before Draw Command
            this.SetUniforms = function(){
                
                for(i = this.Uniforms.size; i--; this.Uniforms.next()){
                    var u = this.Uniforms.value();
                    var gl = os.graphics.gl;
                    
                    if(u.type == "BOOL"){
                        gl.uniform1i(u.location, u.value);
                    }
                    else if(u.type == "4X4"){
                        gl.uniformMatrix4fv(u.location, false, u.value);
                    }
                    else if(u.type == "3X3"){
                        gl.uniformMatrix3fv(u.location, false, u.value);
                    }
                    else if(u.type == "VEC3"){
                        gl.uniform3f(u.location, u.value[0],u.value[1],u.value[2]);
                    }
                    else if(u.type == "VEC4"){
                        gl.uniform4f(u.location, u.value[0],u.value[1],u.value[2],u.value[3]);
                    }
                    else if(u.type == "FLOAT"){
                        gl.uniform1f(u.location, u.value);
                    }
                    else if(u.type == "ARRAY_VEC3"){
                        gl.uniform3fv(u.location, u.value);
                    }
                    else if(u.type == "ARRAY_VEC4"){
                        gl.uniform4fv(u.location, u.value);
                    }
                    else{
                        os.windows.Create.ErrorWindow("Shader Error","Unknown Uniform Type: " + u.type + " Found During SetUniforms()");
                    }
                }
            }.bind(this);
            
            
        };
        
        CAttribute = function(shdVarName, shdDataType, attributeType){
            this.key = shdVarName;
            this.variableName = shdVarName;
            this.buffer = null;
            this.location = "";
            this.dataType = shdDataType;
            this.attributeType = attributeType;
            this.itemSize = null;
        };
        
        CUniform = function(shdVarName, shdVarType, jsVarPtr){
            this.key = shdVarName;
            this.variableName = shdVarName;
            this.value = jsVarPtr;              //JavaScript Variable Pointer/Value
            this.location = "";                 //Shader Uniform Location
            this.type = shdVarType;             //(bool, 4x4,3x3,vec3,vec4,float,etc)

        };
        
        CTexture = function(key, url){
            var gl = os.graphics.gl;
            
            this.key = key;
            this.initialized = false;
            this.type = gl.TEXTURE_2D;
            
            //Create gl Texture object
            this.texture = gl.createTexture();
            
            //Create HTML Image
            this.image = new Image();
            this.image.src = url;
            this.onLoad = null;
            this.image.onload = function(){
                this.Initialize();
                if(this.onLoad){
                    this.onLoad();
                }
            }.bind(this);
            
            this.Initialize = function(){
                
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
                gl.generateMipmap(gl.TEXTURE_2D);
                
                gl.bindTexture(gl.TEXTURE_2D, null);
                
                this.initialized = true;
            }.bind(this);
        };
        CRenderTexture = function(sKey, iWidth, iHeight){
            var gl = os.graphics.gl;
            
            this.key = sKey;
            this.initialized = false;
            this.type = gl.TEXTURE_2D;
            this.width = iWidth;
            this.height = iHeight;
            
            //Create gl Texture object
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
            this.initialized = true;
        };
        CCubeMap = function(key){
            var gl = os.graphics.gl;
            
            var _count = 0;
            this.type = gl.TEXTURE_CUBE_MAP;
            this.key = key;
            this.initialized = false;
            this.texture = gl.createTexture();
            this.callback = null;
            var OnLoad = function(){
                _count++;
                if(_count == 6){
                    Initialize();
                    if(this.callback){
                        this.callback();
                    }
                }
            }.bind(this);
            
            var Initialize = function(){
                
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
                
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.Images.positiveX);
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.Images.negativeX);
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.Images.positiveY);
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.Images.negativeY);
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.Images.positiveZ);
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.Images.negativeZ);
        
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        
            }.bind(this);
            
            this.GetCount = function(){return _count;}
            this.Images = {
                positiveX: null,
                negativeX: null,
                positiveY: null,
                negativeY: null,
                positiveZ: null,
                negativeZ: null
            };
            
            this.Load = {
                positiveX: function(url){
                    this.Images.positiveX = new Image();
                    this.Images.positiveX.src = url;
                    
                    this.Images.positiveX.onload = OnLoad;
                    
                }.bind(this),
                negativeX: function(url){
                    this.Images.negativeX = new Image();
                    this.Images.negativeX.src = url;
                    
                    this.Images.negativeX.onload = OnLoad;
                }.bind(this),
                positiveY: function(url){
                    this.Images.positiveY = new Image();
                    this.Images.positiveY.src = url;
                    
                    this.Images.positiveY.onload = OnLoad;
                }.bind(this),
                negativeY: function(url){
                    this.Images.negativeY = new Image();
                    this.Images.negativeY.src = url;
                    
                    this.Images.negativeY.onload = OnLoad;
                }.bind(this),
                positiveZ: function(url){
                    this.Images.positiveZ = new Image();
                    this.Images.positiveZ.src = url;
                    
                    this.Images.positiveZ.onload = OnLoad;
                }.bind(this),
                negativeZ: function(url){
                    this.Images.negativeZ = new Image();
                    this.Images.negativeZ.src = url;
                    
                    this.Images.negativeZ.onload = OnLoad;
                }.bind(this)
            };
            
            
        };
        
        CMesh = function(key, url){
            this.name = key;
            this.filename = url;
            this.loaded = false;
            this.numOfPolys = 0;
            this.numOfVerts = 0;
            this.instanced = false;
            this.model = null;
            this.onLoad = null;
            this.Buffers = {
                Vertex: null,
                Normal: null,
                Texture: null,
                Instance: null,
                Index: null
            }
            
            this.Load = function(){
                
                var xhr = os.resschmgr.Create.XHRObject();
                var filepath = this.filename;
                //os.console.Comment("Requesting:\n" + filepath);
                
                xhr.open('GET',filepath,true);
                xhr.onreadystatechange = function(){
                  if(xhr.readyState==4){ //4==DONE
                        if((xhr.status == 200) || (xhr.status == 0))
                        {
                            try{
                                this.model = JSON.parse(xhr.responseText);
                                this.Initialize();
                                if(this.onLoad){
                                    this.onLoad();
                                }
                            }
                            catch(e){
                                os.windows.Create.ErrorWindow('Mesh Failer', "Failed to parse Mesh: " + this.name +"<br/>At URL: " + this.filename + "<br/><br/>The file was not a compatiable JSON format");
                            }
                            
                        }
                        else{
                            os.windows.Create.ErrorWindow('Mesh Failure', "Failed to load Mesh: " + this.name +"<br/>At URL: " + this.filename + "<br/><br/>Check url and filename");
                        }
                  }
                    
                }.bind(this);
                
                xhr.send();
                
            }.bind(this);
            
            this.Initialize = function(){
                var gl = os.graphics.gl;
                
                //**************************
                //  NORMAL BUFFER
                //**************************
                
                //Test to see if model has vertex normals
                if(this.model.vertexNormals){
                    
                    //Create WebGL Buffer to hold Vertex Normals
                    this.Buffers.Normal = gl.createBuffer();
                    
                    //Set Normal array as Active Buffer for WebGL Operations
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.Buffers.Normal);
                        
                    //Set Normal Array as Data for Active Buffer 
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.model.vertexNormals), gl.STATIC_DRAW);
                    
                    //3 Elements Per Data Point
                    this.Buffers.Normal.itemSize = 3;
                    
                    //Total Number Data points
                    this.Buffers.Normal.numItems = this.model.vertexNormals.length / this.Buffers.Normal.itemSize;
                }
                
                
                
                
                //**************************
                //  TEXTURE BUFFER
                //**************************
                
                //Test to see if model has texture data
                if(this.model.vertexTextureCoords){
                    
                    //Create WebGL Buffer to hold Texture Coordinates
                    this.Buffers.Texture = gl.createBuffer();
                    
                    //Set Texture array as Active Buffer for WebGL Operations
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.Buffers.Texture);
                        
                    //Set Texture Array as Data for Active Buffer 
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.model.vertexTextureCoords), gl.STATIC_DRAW);
                    
                    //Elements Per Data Point
                    this.Buffers.Texture.itemSize = 2;
                    
                    //Total Number Data points
                    this.Buffers.Texture.numItems = this.model.vertexTextureCoords.length / this.Buffers.Texture.itemSize;
                    
                }
                
                
                //**************************
                //  INDEX BUFFER
                //**************************
                
                //Test to see if model has indicies
                if(this.model.indices){
                    //Create WebGL Buffer to hold Indicies
                    this.Buffers.Index = gl.createBuffer();
                    
                    //Set Index array as Active Buffer for WebGL Operations
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.Buffers.Index);
                        
                    //Set Index Array as Data for Active Buffer
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.model.indices), gl.STATIC_DRAW);
                    
                    //Elements Per Data Point
                    this.Buffers.Index.itemSize = 1;
                    
                    //Total Number Data points
                    this.Buffers.Index.numItems = this.model.indices.length / this.Buffers.Index.itemSize;
                    
                    
                }
                
                //**************************
                //  INSTANCE BUFFER
                //**************************
                
                //Test to see if model has texture data
                if(this.model.instance){
                    
                    //Create WebGL Buffer to hold Texture Coordinates
                    this.Buffers.Instance = gl.createBuffer();
                    
                    //Set Texture array as Active Buffer for WebGL Operations
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.Buffers.Instance);
                        
                    //Set Texture Array as Data for Active Buffer 
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.model.instance), gl.STATIC_DRAW);
                    
                    //Elements Per Data Point
                    this.Buffers.Instance.itemSize = 1;
                    
                    //Total Number Data points
                    this.Buffers.Instance.numItems = this.model.instance.length / this.Buffers.Instance.itemSize;
                    
                    this.instanced = true;
                    
                }
                
                //**************************
                //  Vertex BUFFER
                //**************************
                
                //Create WebGL Buffer to hold Vertex Positions
                this.Buffers.Vertex = gl.createBuffer();
                
                //Set Position array as Active Buffer for WebGL Operations
                gl.bindBuffer(gl.ARRAY_BUFFER, this.Buffers.Vertex);
                    
                //Set Position Array as Data for Active Buffer 
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.model.vertexPositions), gl.STATIC_DRAW);
                
                //Elements Per Data Point
                this.Buffers.Vertex.itemSize = 3;
                
                //Total Number Data points
                this.Buffers.Vertex.numItems = this.model.vertexPositions.length / this.Buffers.Vertex.itemSize;
 
                // Total Numver of Verts and Polys for Given Mesh
                this.numOfVerts = this.Buffers.Vertex.numItems;
                this.numOfPolys = this.Buffers.Index.numItems / 3;
                
                //Set Loaded Property so Draw Method will be called
                this.loaded = true;

            }.bind(this);
            
            this.Draw = function(){
                var gl = os.graphics.gl;
                
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.Buffers.Index);
                gl.drawElements(gl.TRIANGLES, this.Buffers.Index.numItems, gl.UNSIGNED_SHORT, 0);
                
                os.graphics.Managers.Mesh.totalPolys += this.numOfPolys;
                os.graphics.Managers.Mesh.totalVerts += this.numOfVerts;
            }
            this.DrawArray = function(){
                var gl = os.graphics.gl;
                
                gl.drawArrays(gl.TRIANGLES, 0, this.Buffers.Vertex.numItems);
            }
            
            //If url was passed in, download and initialize Mesh
            if(url){this.Load();}
        };
        CGraphicsEntity = function(ent){
            
            //Holds Parent CEntity object
            this.parent = ent;
            
            //Holds textures used for the Entity
            this.Texture = os.resschmgr.Create.Map();
            
            //Holds the Mesh (and/or Sub Meshes)
            this.Mesh = os.resschmgr.Create.Map();
            
            //Holds the Shaders used for drawing
            this.Shaders = os.resschmgr.Create.Map();
            
            this.Vectors = {
                Position: vec3.create(),
                Scale: vec3.create([1,1,1]),
                Rotate: vec3.create(),
                Offset: vec3.create()
                
            };
            this.Matrix = {
                World: mat4.create(),
                Translate: mat4.create(),
                Parent: mat4.create(),
                Scale: mat4.create(),
                Rotation: mat4.create(),
                RotateX: mat4.create(),
                RotateY: mat4.create(),
                RotateZ: mat4.create(),
                Normal: mat3.create()
            };
            mat4.identity(this.Matrix.Parent);
            this.Add = {
                Shader: function(shaderKey, prgKey){
                    //Get Program Object
                    var prg = os.graphics.Managers.Shader.Maps.Programs.get(prgKey);
                    //Create new shader with desire program object
                    var shd = os.graphics.Managers.Shader.Create.Shader(prg);
                    
                    //Place shader in Map
                    this.Shaders.put(shaderKey, shd);
                    
                    return shd;
                }.bind(this),
                Mesh: function(mshID){
                    var msh = os.graphics.Managers.Mesh.meshes.get(mshID);
                    
                    //If mesh is instanced, and default shader is used, enable Instacing
                    if(msh.instanced){
                        var shd = this.Shaders.get("default");
                        if(shd){
                            shd.Program.CreateAttribute("aInstance");
                            shd.AddAttribute("aInstance", "FLOAT", null, "INSTANCE", null);
                            
                            shd.Uniforms.get("uUseInstacing").value = true;
                        }
                    }
                    
                    this.Mesh.put(mshID, msh);
                    
                    return msh;
                }.bind(this),
                Texture: function(textID){
                    var texture = os.graphics.Managers.Texture.textures.get(textID);
                    this.Texture.put(textID, texture);
                    return texture;
                }.bind(this)
            }
            this.Update = function(dt){
                
            }
            
            this.Draw = function(shdID, mshID){
                var shd = null;
                var msh = null;
                
                //Draw()            : Draw All Meshes with current shader
                //Draw(shd),        : Draw All Meshes with supplied Shader
                //Draw(shd, msh)    : Draw supplied mesh with supplied shader
                
                if(shdID){  //Test to see if Shader was passed in
                    shd = this.Shaders.get(shdID);
                }
                else{       //Else get current Shader in map
                    shd = this.Shaders.value();
                }
                
                
                if(mshID){   //Test to see if meshID was supplied
                    msh = this.Mesh.get(mshID);
                    _Draw(msh,shd);
                    
                }
                else{       //loop through all mesh object in draw
                    
                    for(var i = this.Mesh.size; i--; this.Mesh.next()){
                        _Draw(this.Mesh.value(),shd);
                    }
                }

                
               
            }
            //Private Method that will draw a specific Mesh with Specific shader
            var _Draw = function(msh, shd){
                var gl = os.graphics.gl;
                
                //Test if program is active, if not, set active
                if(os.graphics.Managers.Shader.ActiveProgram != shd.Program.name){
                    os.graphics.Managers.Shader.SetActiveProgram(shd.Program);
                }
                
                //If mesh has not been loaded, return 
                if(!msh.loaded){return;}
                
                //*********************************
                //  BUILD TRANSFORMS
                //*********************************
                
                
                
                //Build Scale Matrix
                mat4.identity(this.Matrix.Scale);
                mat4.scale(this.Matrix.Scale, this.Vectors.Scale, this.Matrix.Scale);
                
                //Build Translation Matrix
                mat4.identity(this.Matrix.Translate);
                if(this.parent.Physics){
                    mat4.translate(this.Matrix.Translate, this.parent.Physics.position);
                }
                else{
                    mat4.translate(this.Matrix.Translate, this.parent.Position);
                }
                
                
                //Build Translation Default Offset Matrix
                //var offset = mat4.create();
                //mat4.identity(offset);
                //mat4.translate(offset, this.parent.Default.Offset);
                
                //var toLocal = mat4.create();
                //mat4.identity(toLocal);
                //mat4.translate(toLocal, [-1 * this.parent.Position[0],-1 * this.parent.Position[1], -1 * this.parent.Position[2]]);
                //mat4.translate(this.Matrix.Translate, this.Vectors.Position);
                //mat4.translate(this.Matrix.Translate, [- this.Offset.x, - this.Offset.y, - this.Offset.z]);
                
                

                if(this.parent.Physics){
                    quat4.normalize(this.parent.Physics.orientation, this.parent.Physics.orientation);
                    mat4.set(quat4.toMat4(this.parent.Physics.orientation),this.Matrix.Rotation);
                    mat4.multiply(this.parent.Default.Rotation, this.Matrix.Rotation, this.Matrix.Rotation);
                    
                }
                else{
                    //Build Rotation Matrix              
                    this.CalculateRotationMatrix();
                    
                    mat4.identity(this.Matrix.RotateX);
                    mat4.identity(this.Matrix.RotateY);
                    mat4.identity(this.Matrix.RotateZ);
                    
                    //Build Rotation Matrix
                    mat4.rotateZ(this.Matrix.RotateZ, degToRad(this.parent.roll), this.Matrix.RotateZ);
                    
                    mat4.rotateX(this.Matrix.RotateX, degToRad(this.parent.pitch), this.Matrix.RotateX);
                    
                    mat4.rotateY(this.Matrix.RotateY, degToRad(this.parent.yaw), this.Matrix.RotateY);
                    
                    mat4.identity(this.Matrix.Rotation);
                    //mat4.multiply(this.Matrix.RotateY, this.Matrix.RotateX, this.Matrix.Rotation);
                    //mat4.multiply(this.Matrix.Rotation, this.Matrix.RotateZ, this.Matrix.Rotation);
                    
                    mat4.multiply(this.parent.Default.Rotation, this.Matrix.RotateY, this.Matrix.Rotation);
                    mat4.multiply(this.Matrix.Rotation, this.Matrix.RotateX, this.Matrix.Rotation);
                    mat4.multiply(this.Matrix.Rotation, this.Matrix.RotateZ, this.Matrix.Rotation);
                }
                
                //Build Rotation Matrix
                //mat4.rotateZ(this.Matrix.RotateZ, degToRad(this.parent.roll), this.Matrix.RotateZ);
                //
                //mat4.rotateX(this.Matrix.RotateX, degToRad(this.parent.pitch), this.Matrix.RotateX);
                //
                //mat4.rotateY(this.Matrix.RotateY, degToRad(this.parent.yaw), this.Matrix.RotateY);
                //
                //mat4.identity(this.Matrix.Rotation);
                ////mat4.multiply(this.Matrix.RotateY, this.Matrix.RotateX, this.Matrix.Rotation);
                ////mat4.multiply(this.Matrix.Rotation, this.Matrix.RotateZ, this.Matrix.Rotation);
                //
                //mat4.multiply(this.parent.Default.Rotation, this.Matrix.RotateY, this.Matrix.Rotation);
                //mat4.multiply(this.Matrix.Rotation, this.Matrix.RotateX, this.Matrix.Rotation);
                //mat4.multiply(this.Matrix.Rotation, this.Matrix.RotateZ, this.Matrix.Rotation);
                
                //Build Translation Matrix
                //var Translate2 = mat4.create();
                //mat4.identity(Translate2);
                //mat4.translate(Translate2, [this.Vectors.Position[0] + this.Vectors.Offset[0], this.Vectors.Position[1] + this.Vectors.Offset[1], this.Vectors.Position[2] + this.Vectors.Offset[2]]);
                //mat4.translate(Translate2, [this.Position.x + this.Offset.x, this.Position.y + this.Offset.y, this.Position.z + this.Offset.z]);
                
                //Buidl World Matrix
                mat4.identity(this.Matrix.World);
                
                mat4.multiply(this.Matrix.Parent, this.Matrix.World, this.Matrix.World );
                mat4.multiply(this.Matrix.World, this.Matrix.Translate, this.Matrix.World);
                mat4.multiply(this.Matrix.World, this.Matrix.Rotation, this.Matrix.World);
                mat4.multiply(this.Matrix.World, this.Matrix.Scale, this.Matrix.World);
                mat4.multiply(this.Matrix.World, this.parent.Default.Offset, this.Matrix.World);
                
                //mat4.multiply(this.Matrix.World, Translate2, this.Matrix.World);
                //mat4.multiply(this.Matrix.RotateZ, this.Matrix.RotateX, this.Matrix.Rotation);
                //mat4.multiply(this.Matrix.Rotation, this.Matrix.RotateY, this.Matrix.Rotation);
                //
                //mat4.multiply(this.Matrix.Translate, this.Matrix.Rotation, this.Matrix.World);
                //mat4.multiply(this.Matrix.World, this.Matrix.Scale, this.Matrix.World);
                
                //Build Normal Matrix (View Matrix must already be calculated)
                var temp = mat4.create();
                
                //mat4.identity(this.Matrix.Normal);
                //mat4.multiply(this.Matrix.World, os.graphics.Matrix.View, temp);
                //mat4.toInverseMat3(temp, this.Matrix.Normal);
                //mat3.transpose(this.Matrix.Normal, this.Matrix.Normal);
                
                mat4.toInverseMat3(this.Matrix.World, this.Matrix.Normal);
                mat3.transpose(this.Matrix.Normal, this.Matrix.Normal);
                
                
                //mat3.transpose(this.Matrix.World, this.Matrix.Normal);
                
                //*********************************
                //  SET TEXTURE
                //*********************************
                if(shd.Program.name == "default"){
                    var useTexture = shd.Uniforms.get("uUseTextures")
                    if(useTexture){
                        if(useTexture.value){
                            if(this.Texture.value())
                            {
                                gl.activeTexture(gl.TEXTURE0);
                                gl.bindTexture(this.Texture.value().type, this.Texture.value().texture);
                                gl.generateMipmap(gl.TEXTURE_2D);   
                                gl.uniform1i(shd.Uniforms.get("uSampler"), 0);
                            }
                            else{
                                throw new Error("Error: Texture Enabled for Entity: " + this.Texture.value().key + " , But No Texture Loaded");
                                
                                //os.windows.Create.ErrorWindow("Texture Error", "Error: Texture Enabled for Entity: " + this.Texture.value().key + " , But No Texture Loaded");
                            }
                        }
                    } 
                }
                else if(this.Texture.size > 0){
                
                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(this.Texture.value().type, this.Texture.value().texture);
                    gl.uniform1i(shd.Uniforms.get("uSampler"), 0);
                   
                }
                
                
                
                //*********************************
                //  SET UNIFORMS
                //*********************************
                shd.SetUniforms();
                
                //*********************************
                //  BIND VERTEX BUFFERS
                //*********************************
                shd.BindAttributes(msh);
                
                //*********************************
                //  DRAW MESH
                //*********************************
                msh.Draw();
                
                
            }.bind(this);
            
        }

        return{
            //PUBLIC CLASSES
            
            //PUBLIC ATTRIBUTES
            gl: null,
            Managers: {
                Shader:{
                    Maps: {
                        VertexShaders: new os.resschmgr.Create.Map(),
                        FragmentShaders: new os.resschmgr.Create.Map(),
                        Programs: new os.resschmgr.Create.Map()
                    },
                    Create: {
                        VertexShader: function(key, url){
                            var shd = new CVertexShader(key, url);
                            os.graphics.Managers.Shader.Maps.VertexShaders.put(key,shd);
                            return shd;
                        },
                        FragmentShader: function(key, url){
                            var shd = new CFragmentShader(key, url);
                            os.graphics.Managers.Shader.Maps.FragmentShaders.put(key,shd);
                            return shd;
                        },
                        Program: function(vs, fs, key){
                            //Create Program
                            var prg = new CProgram(vs, fs, key);
                            
                            //Register Program with Manager
                            os.graphics.Managers.Shader.Maps.Programs.put(key, prg);
                            
                            return prg;    
                        },
                        Shader: function(prg){
                            var shd =  new CShader(prg);
                        
                            return shd;
                        },
                        Uniform: function(shdVarName, shdVarType, jsVarPtr){
                            var u = new CUniform(shdVarName, shdVarType, jsVarPtr);
                            
                            return u;
                        },
                        Attribute: function(shdVarName, shdDataType, attributeType){
                            var a = new CAttribute(shdVarName, shdDataType, attributeType)
                            
                            return a;
                        }
                    },
                    SetActiveProgram: function(prg){
                        //Set key to Active Program
                        os.graphics.Managers.Shader.ActiveProgram = prg.name;
                        
                        //Assign Active Program to gl
                        os.graphics.gl.useProgram(prg.program);
                    },
                    ActiveProgram: null
                },
                Mesh:{
                    meshes: os.resschmgr.Create.Map(),
                    totalPolys: 0,
                    totalVerts: 0,
                    Create: {
                        Mesh: function(key, url){
                            var msh = new CMesh(key, url);
                            
                            os.graphics.Managers.Mesh.meshes.put(key, msh);
                            
                            return msh;
                        },
                        Primitive: {
                            Cube:   function(key){
                                var msh = new CMesh(key);
                                
                                msh.model = {};
                                msh.model.indices = [
                                    0, 1, 2,      0, 2, 3,    // Front face
                                    4, 5, 6,      4, 6, 7,    // Back face
                                    8, 9, 10,     8, 10, 11,  // Top face
                                    12, 13, 14,   12, 14, 15, // Bottom face
                                    16, 17, 18,   16, 18, 19, // Right face
                                    20, 21, 22,   20, 22, 23  // Left face
                                ];
                                
                                msh.model.vertexNormals = [
                                    // Front face
                                    0.0,  0.0,  1.0,
                                    0.0,  0.0,  1.0,
                                    0.0,  0.0,  1.0,
                                    0.0,  0.0,  1.0,
                            
                                   // Back face
                                    0.0,  0.0, -1.0,
                                    0.0,  0.0, -1.0,
                                    0.0,  0.0, -1.0,
                                    0.0,  0.0, -1.0,
                                   
                                   // Top face
                                    0.0,  1.0,  0.0,
                                    0.0,  1.0,  0.0,
                                    0.0,  1.0,  0.0,
                                    0.0,  1.0,  0.0,
                                   
                                   // Bottom face
                                    0.0, -1.0,  0.0,
                                    0.0, -1.0,  0.0,
                                    0.0, -1.0,  0.0,
                                    0.0, -1.0,  0.0,
                                   
                                   // Right face
                                    1.0,  0.0,  0.0,
                                    1.0,  0.0,  0.0,
                                    1.0,  0.0,  0.0,
                                    1.0,  0.0,  0.0,
                                   
                                   // Left face
                                   -1.0,  0.0,  0.0,
                                   -1.0,  0.0,  0.0,
                                   -1.0,  0.0,  0.0,
                                   -1.0,  0.0,  0.0
                                ];
                                msh.model.vertexPositions = [
                                    //// Front face
                                    -1.0, -1.0,  1.0,
                                     1.0, -1.0,  1.0,
                                     1.0,  1.0,  1.0,
                                    -1.0,  1.0,  1.0,
                                    
                                    // Back face
                                    -1.0, -1.0, -1.0,
                                    -1.0,  1.0, -1.0,
                                     1.0,  1.0, -1.0,
                                     1.0, -1.0, -1.0,
                                    
                                    // Top face
                                    -1.0,  1.0, -1.0,
                                    -1.0,  1.0,  1.0,
                                     1.0,  1.0,  1.0,
                                     1.0,  1.0, -1.0,
                                    
                                    // Bottom face
                                    -1.0, -1.0, -1.0,
                                     1.0, -1.0, -1.0,
                                     1.0, -1.0,  1.0,
                                    -1.0, -1.0,  1.0,
                                    
                                    // Right face
                                     1.0, -1.0, -1.0,
                                     1.0,  1.0, -1.0,
                                     1.0,  1.0,  1.0,
                                     1.0, -1.0,  1.0,
                                    
                                    // Left face
                                    -1.0, -1.0, -1.0,
                                    -1.0, -1.0,  1.0,
                                    -1.0,  1.0,  1.0,
                                    -1.0,  1.0, -1.0
                                ];
                                msh.model.vertexTextureCoords = [
                                    // Front face
                                    0.0, 0.0,
                                    1.0, 0.0,
                                    1.0, 1.0,
                                    0.0, 1.0,
                          
                                    // Back face
                                    1.0, 0.0,
                                    1.0, 1.0,
                                    0.0, 1.0,
                                    0.0, 0.0,
                          
                                    // Top face
                                    0.0, 1.0,
                                    0.0, 0.0,
                                    1.0, 0.0,
                                    1.0, 1.0,
                          
                                    // Bottom face
                                    1.0, 1.0,
                                    0.0, 1.0,
                                    0.0, 0.0,
                                    1.0, 0.0,
                          
                                    // Right face
                                    1.0, 0.0,
                                    1.0, 1.0,
                                    0.0, 1.0,
                                    0.0, 0.0,
                          
                                    // Left face
                                    0.0, 0.0,
                                    1.0, 0.0,
                                    1.0, 1.0,
                                    0.0, 1.0,
                                ];
                                //msh.Initialize();
                                //msh.loaded = true;
                                
                                os.graphics.Managers.Mesh.meshes.put(key, msh);
                                
                                return msh;
                            },
                            Quad: function(key){
                                var msh = new CMesh(key);
                                
                                msh.model ={};
                                msh.model.indices = [
                                    0, 1, 2,
                                    0, 2, 3    
                                ];
                                msh.model.vertexNormals = [
                                    0.0,  0.0,  1.0,
                                    0.0,  0.0,  1.0,
                                    0.0,  0.0,  1.0,
                                    0.0,  0.0,  1.0
                                ];
                                msh.model.vertexPositions =[
                                    -1.0, -1.0,  1.0,
                                     1.0, -1.0,  1.0,
                                     1.0,  1.0,  1.0,
                                    -1.0,  1.0,  1.0
                                ];
                                msh.model.vertexTextureCoords = [
                                    0.0, 0.0,
                                    1.0, 0.0,
                                    1.0, 1.0,
                                    0.0, 1.0
                                ];
                                
                                os.graphics.Managers.Mesh.meshes.put(key, msh);
                                
                                return msh;
                            },
                            Sphere: function(key){
                                var msh = new CMesh(key);
                                msh.model ={};
                                msh.model.vertexPositions = [3.1164155077197375e-17, 20, 1.5582077538598687e-17, 3.1164155077197375e-17, 18.476, - 7.652, - 2.928, 18.476, - 7.072, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, - 5.412, 18.476, - 5.412, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, - 7.072, 18.476, - 2.928, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, - 7.652, 18.476, 1.5582077538598687e-17, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, - 7.072, 18.476, 2.928, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, - 5.412, 18.476, 5.412, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, - 2.928, 18.476, 7.072, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, 3.1164155077197375e-17, 18.476, 7.652, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, 2.928, 18.476, 7.072, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, 5.412, 18.476, 5.412, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, 7.072, 18.476, 2.928, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, 7.652, 18.476, 1.5582077538598687e-17, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, 7.072, 18.476, - 2.928, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, 5.412, 18.476, - 5.412, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, 2.928, 18.476, - 7.072, 3.1164155077197375e-17, 20, 1.5582077538598687e-17, 3.1164155077197375e-17, 18.476, - 7.652, 3.1164155077197375e-17, 14.144, - 14.144, - 5.412, 14.144, - 13.064, - 10, 14.144, - 10, - 13.064, 14.144, - 5.412, - 14.144, 14.144, 1.5582077538598687e-17, - 13.064, 14.144, 5.412, - 10, 14.144, 10, - 5.412, 14.144, 13.064, 3.1164155077197375e-17, 14.144, 14.144, 5.412, 14.144, 13.064, 10, 14.144, 10, 13.064, 14.144, 5.412, 14.144, 14.144, 1.5582077538598687e-17, 13.064, 14.144, - 5.412, 10, 14.144, - 10, 5.412, 14.144, - 13.064, 3.1164155077197375e-17, 14.144, - 14.144, 3.1164155077197375e-17, 14.144, - 14.144, 3.1164155077197375e-17, 18.476, - 7.652, 3.1164155077197375e-17, 7.652, - 18.476, - 7.072, 7.652, - 17.072, - 13.064, 7.652, - 13.064, - 17.072, 7.652, - 7.072, - 18.476, 7.652, 1.5582077538598687e-17, - 17.072, 7.652, 7.072, - 13.064, 7.652, 13.064, - 7.072, 7.652, 17.072, 3.1164155077197375e-17, 7.652, 18.476, 7.072, 7.652, 17.072, 13.064, 7.652, 13.064, 17.072, 7.652, 7.072, 18.476, 7.652, 1.5582077538598687e-17, 17.072, 7.652, - 7.072, 13.064, 7.652, - 13.064, 7.072, 7.652, - 17.072, 3.1164155077197375e-17, 7.652, - 18.476, 3.1164155077197375e-17, 7.652, - 18.476, 3.1164155077197375e-17, 14.144, - 14.144, 3.1164155077197375e-17, 0, - 20, - 7.652, 0, - 18.476, - 14.144, 0, - 14.144, - 18.476, 0, - 7.652, - 20, 0, 1.5582077538598687e-17, - 18.476, 0, 7.652, - 14.144, 0, 14.144, - 7.652, 0, 18.476, 3.1164155077197375e-17, 0, 20, 7.652, 0, 18.476, 14.144, 0, 14.144, 18.476, 0, 7.652, 20, 0, 1.5582077538598687e-17, 18.476, 0, - 7.652, 14.144, 0, - 14.144, 7.652, 0, - 18.476, 3.1164155077197375e-17, 0, - 20, 3.1164155077197375e-17, 0, - 20, 3.1164155077197375e-17, 7.652, - 18.476, 3.1164155077197375e-17, - 7.652, - 18.476, - 7.072, - 7.652, - 17.072, - 13.064, - 7.652, - 13.064, - 17.072, - 7.652, - 7.072, - 18.476, - 7.652, 1.5582077538598687e-17, - 17.072, - 7.652, 7.072, - 13.064, - 7.652, 13.064, - 7.072, - 7.652, 17.072, 3.1164155077197375e-17, - 7.652, 18.476, 7.072, - 7.652, 17.072, 13.064, - 7.652, 13.064, 17.072, - 7.652, 7.072, 18.476, - 7.652, 1.5582077538598687e-17, 17.072, - 7.652, - 7.072, 13.064, - 7.652, - 13.064, 7.072, - 7.652, - 17.072, 3.1164155077197375e-17, - 7.652, - 18.476, 3.1164155077197375e-17, - 7.652, - 18.476, 3.1164155077197375e-17, 0, - 20, 3.1164155077197375e-17, - 14.144, - 14.144, - 5.412, - 14.144, - 13.064, - 10, - 14.144, - 10, - 13.064, - 14.144, - 5.412, - 14.144, - 14.144, 1.5582077538598687e-17, - 13.064, - 14.144, 5.412, - 10, - 14.144, 10, - 5.412, - 14.144, 13.064, 3.1164155077197375e-17, - 14.144, 14.144, 5.412, - 14.144, 13.064, 10, - 14.144, 10, 13.064, - 14.144, 5.412, 14.144, - 14.144, 1.5582077538598687e-17, 13.064, - 14.144, - 5.412, 10, - 14.144, - 10, 5.412, - 14.144, - 13.064, 3.1164155077197375e-17, - 14.144, - 14.144, 3.1164155077197375e-17, - 14.144, - 14.144, 3.1164155077197375e-17, - 7.652, - 18.476, 3.1164155077197375e-17, - 18.476, - 7.652, - 2.928, - 18.476, - 7.072, - 5.412, - 18.476, - 5.412, - 7.072, - 18.476, - 2.928, - 7.652, - 18.476, 1.5582077538598687e-17, - 7.072, - 18.476, 2.928, - 5.412, - 18.476, 5.412, - 2.928, - 18.476, 7.072, 3.1164155077197375e-17, - 18.476, 7.652, 2.928, - 18.476, 7.072, 5.412, - 18.476, 5.412, 7.072, - 18.476, 2.928, 7.652, - 18.476, 1.5582077538598687e-17, 7.072, - 18.476, - 2.928, 5.412, - 18.476, - 5.412, 2.928, - 18.476, - 7.072, 3.1164155077197375e-17, - 18.476, - 7.652, 3.1164155077197375e-17, - 18.476, - 7.652, 3.1164155077197375e-17, - 14.144, - 14.144, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 20, 1.5582077538598687e-17, 3.1164155077197375e-17, - 18.476, - 7.652],
                                msh.model.vertexNormals = [7.11818e-9, 0.998314, 0, - 0.0224853, 0.906764, - 0.417791, - 0.180472, 0.90674, - 0.37753, 7.11818e-9, 0.998314, 0, - 0.311318, 0.906746, - 0.279589, 7.11818e-9, 0.998314, 0, - 0.394568, 0.906769, - 0.139153, 7.11818e-9, 0.998314, 0, - 0.417791, 0.906764, 0.0224853, 7.11818e-9, 0.998314, 0, - 0.37753, 0.90674, 0.180472, 7.11818e-9, 0.998314, 0, - 0.279589, 0.906746, 0.311318, 7.11818e-9, 0.998314, 0, - 0.139153, 0.906769, 0.394568, 7.11818e-9, 0.998314, 0, 0.0224853, 0.906764, 0.417791, 7.11818e-9, 0.998314, 0, 0.180472, 0.90674, 0.37753, 7.11818e-9, 0.998314, 0, 0.311318, 0.906746, 0.279589, 7.11818e-9, 0.998314, 0, 0.394568, 0.906769, 0.139153, 7.11818e-9, 0.998314, 0, 0.417791, 0.906764, - 0.0224853, 7.11818e-9, 0.998314, 0, 0.37753, 0.90674, - 0.180472, 7.11818e-9, 0.998314, 0, 0.279589, 0.906746, - 0.311318, 7.11818e-9, 0.998314, 0, 0.139153, 0.906769, - 0.394568, 7.11818e-9, 0.998314, 0, - 0.0224853, 0.906764, - 0.417791, - 0.00917635, 0.707194, - 0.706031, - 0.278733, 0.707191, - 0.648748, - 0.505698, 0.707148, - 0.492845, - 0.655821, 0.707147, - 0.261774, - 0.706031, 0.707194, 0.00917635, - 0.648748, 0.707191, 0.278733, - 0.492845, 0.707148, 0.505698, - 0.261774, 0.707147, 0.655821, 0.00917636, 0.707194, 0.706031, 0.278733, 0.707191, 0.648748, 0.505698, 0.707148, 0.492845, 0.655821, 0.707147, 0.261774, 0.706031, 0.707194, - 0.00917635, 0.648748, 0.707191, - 0.278733, 0.492845, 0.707148, - 0.505698, 0.261774, 0.707147, - 0.655821, - 0.00917635, 0.707194, - 0.706031, - 0.00917635, 0.707194, - 0.706031, - 0.0224853, 0.906764, - 0.417791, - 0.0048527, 0.382737, - 0.923233, - 0.357826, 0.382836, - 0.85104, - 0.656292, 0.38289, - 0.649265, - 0.854791, 0.382793, - 0.34882, - 0.923233, 0.382737, 0.0048527, - 0.85104, 0.382836, 0.357826, - 0.649265, 0.38289, 0.656292, - 0.34882, 0.382793, 0.854791, 0.0048527, 0.382737, 0.923233, 0.357826, 0.382836, 0.85104, 0.656292, 0.38289, 0.649265, 0.854791, 0.382793, 0.34882, 0.923233, 0.382737, - 0.0048527, 0.85104, 0.382836, - 0.357826, 0.649265, 0.38289, - 0.656292, 0.34882, 0.382793, - 0.854791, - 0.0048527, 0.382737, - 0.923233, - 0.0048527, 0.382737, - 0.923233, - 0.00917635, 0.707194, - 0.706031, 0, 7.74103e-9, - 0.999475, - 0.382382, - 0.000064306, - 0.923435, - 0.706737, 5.16123e-9, - 0.706736, - 0.923435, 0.0000643112, - 0.382382, - 0.999475, - 7.74103e-9, 2.58034e-9, - 0.923435, - 0.000064306, 0.382382, - 0.706736, 2.58061e-9, 0.706737, - 0.382382, 0.000064306, 0.923435, 2.58034e-9, - 2.58034e-9, 0.999475, 0.382382, - 0.000064306, 0.923435, 0.706737, 5.16123e-9, 0.706736, 0.923435, 0.0000643112, 0.382382, 0.999475, - 7.74103e-9, - 2.58034e-9, 0.923435, - 0.000064306, - 0.382382, 0.706736, 2.58061e-9, - 0.706737, 0.382382, 0.000064306, - 0.923435, 0, 7.74103e-9, - 0.999475, 0, 7.74103e-9, - 0.999475, - 0.0048527, 0.382737, - 0.923233, 0.0048527, - 0.382737, - 0.923233, - 0.34882, - 0.382793, - 0.854791, - 0.649265, - 0.38289, - 0.656292, - 0.85104, - 0.382836, - 0.357826, - 0.923233, - 0.382737, - 0.0048527, - 0.854791, - 0.382793, 0.34882, - 0.656292, - 0.38289, 0.649265, - 0.357826, - 0.382836, 0.85104, - 0.0048527, - 0.382737, 0.923233, 0.34882, - 0.382793, 0.854791, 0.649265, - 0.38289, 0.656292, 0.85104, - 0.382836, 0.357826, 0.923233, - 0.382737, 0.0048527, 0.854791, - 0.382793, - 0.34882, 0.656292, - 0.38289, - 0.649265, 0.357826, - 0.382836, - 0.85104, 0.0048527, - 0.382737, - 0.923233, 0.0048527, - 0.382737, - 0.923233, 0, 7.74103e-9, - 0.999475, 0.00917636, - 0.707194, - 0.706031, - 0.261774, - 0.707147, - 0.655821, - 0.492845, - 0.707148, - 0.505698, - 0.648748, - 0.707191, - 0.278732, - 0.706031, - 0.707194, - 0.00917636, - 0.655821, - 0.707147, 0.261774, - 0.505698, - 0.707148, 0.492845, - 0.278732, - 0.707191, 0.648748, - 0.00917636, - 0.707194, 0.706031, 0.261774, - 0.707147, 0.655821, 0.492845, - 0.707148, 0.505698, 0.648748, - 0.707191, 0.278732, 0.706031, - 0.707194, 0.00917636, 0.655821, - 0.707147, - 0.261774, 0.505698, - 0.707148, - 0.492845, 0.278732, - 0.707191, - 0.648748, 0.00917636, - 0.707194, - 0.706031, 0.00917636, - 0.707194, - 0.706031, 0.0048527, - 0.382737, - 0.923233, 0.0224853, - 0.906764, - 0.417791, - 0.139153, - 0.906769, - 0.394568, - 0.279589, - 0.906746, - 0.311318, - 0.37753, - 0.90674, - 0.180472, - 0.417791, - 0.906764, - 0.0224853, - 0.394568, - 0.906769, 0.139153, - 0.311318, - 0.906746, 0.279589, - 0.180472, - 0.90674, 0.37753, - 0.0224853, - 0.906764, 0.417791, 0.139153, - 0.906769, 0.394568, 0.279589, - 0.906746, 0.311318, 0.37753, - 0.90674, 0.180472, 0.417791, - 0.906764, 0.0224853, 0.394568, - 0.906769, - 0.139153, 0.311318, - 0.906746, - 0.279589, 0.180472, - 0.90674, - 0.37753, 0.0224853, - 0.906764, - 0.417791, 0.0224853, - 0.906764, - 0.417791, 0.00917636, - 0.707194, - 0.706031, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 1.18636e-9, - 0.998314, 9.49091e-10, 0.0224853, - 0.906764, - 0.417791],
                                msh.model.vertexTextureCoords = [0, 1, 0, 0.875, 0.0625, 0.875, 0.0625, 1, 0.125, 0.875, 0.125, 1, 0.1875, 0.875, 0.1875, 1, 0.25, 0.875, 0.25, 1, 0.3125, 0.875, 0.3125, 1, 0.375, 0.875, 0.375, 1, 0.4375, 0.875, 0.4375, 1, 0.5, 0.875, 0.5, 1, 0.5625, 0.875, 0.5625, 1, 0.625, 0.875, 0.625, 1, 0.6875, 0.875, 0.6875, 1, 0.75, 0.875, 0.75, 1, 0.8125, 0.875, 0.8125, 1, 0.875, 0.875, 0.875, 1, 0.9375, 0.875, 0.9375, 1, 1, 0.875, 0, 0.75, 0.0625, 0.75, 0.125, 0.75, 0.1875, 0.75, 0.25, 0.75, 0.3125, 0.75, 0.375, 0.75, 0.4375, 0.75, 0.5, 0.75, 0.5625, 0.75, 0.625, 0.75, 0.6875, 0.75, 0.75, 0.75, 0.8125, 0.75, 0.875, 0.75, 0.9375, 0.75, 1, 0.75, 1, 0.75, 1, 0.875, 0, 0.625, 0.0625, 0.625, 0.125, 0.625, 0.1875, 0.625, 0.25, 0.625, 0.3125, 0.625, 0.375, 0.625, 0.4375, 0.625, 0.5, 0.625, 0.5625, 0.625, 0.625, 0.625, 0.6875, 0.625, 0.75, 0.625, 0.8125, 0.625, 0.875, 0.625, 0.9375, 0.625, 1, 0.625, 1, 0.625, 1, 0.75, 0, 0.5, 0.0625, 0.5, 0.125, 0.5, 0.1875, 0.5, 0.25, 0.5, 0.3125, 0.5, 0.375, 0.5, 0.4375, 0.5, 0.5, 0.5, 0.5625, 0.5, 0.625, 0.5, 0.6875, 0.5, 0.75, 0.5, 0.8125, 0.5, 0.875, 0.5, 0.9375, 0.5, 1, 0.5, 1, 0.5, 1, 0.625, 0, 0.375, 0.0625, 0.375, 0.125, 0.375, 0.1875, 0.375, 0.25, 0.375, 0.3125, 0.375, 0.375, 0.375, 0.4375, 0.375, 0.5, 0.375, 0.5625, 0.375, 0.625, 0.375, 0.6875, 0.375, 0.75, 0.375, 0.8125, 0.375, 0.875, 0.375, 0.9375, 0.375, 1, 0.375, 1, 0.375, 1, 0.5, 0, 0.25, 0.0625, 0.25, 0.125, 0.25, 0.1875, 0.25, 0.25, 0.25, 0.3125, 0.25, 0.375, 0.25, 0.4375, 0.25, 0.5, 0.25, 0.5625, 0.25, 0.625, 0.25, 0.6875, 0.25, 0.75, 0.25, 0.8125, 0.25, 0.875, 0.25, 0.9375, 0.25, 1, 0.25, 1, 0.25, 1, 0.375, 0, 0.125, 0.0625, 0.125, 0.125, 0.125, 0.1875, 0.125, 0.25, 0.125, 0.3125, 0.125, 0.375, 0.125, 0.4375, 0.125, 0.5, 0.125, 0.5625, 0.125, 0.625, 0.125, 0.6875, 0.125, 0.75, 0.125, 0.8125, 0.125, 0.875, 0.125, 0.9375, 0.125, 1, 0.125, 1, 0.125, 1, 0.25, 0, 0, 0.0625, 0, 0.125, 0, 0.1875, 0, 0.25, 0, 0.3125, 0, 0.375, 0, 0.4375, 0, 0.5, 0, 0.5625, 0, 0.625, 0, 0.6875, 0, 0.75, 0, 0.8125, 0, 0.875, 0, 0.9375, 0, 1, 0.125],
                                msh.model.indices = [0, 1, 2, 3, 2, 4, 5, 4, 6, 7, 6, 8, 9, 8, 10, 11, 10, 12, 13, 12, 14, 15, 14, 16, 17, 16, 18, 19, 18, 20, 21, 20, 22, 23, 22, 24, 25, 24, 26, 27, 26, 28, 29, 28, 30, 31, 30, 32, 1, 33, 34, 1, 34, 2, 2, 34, 35, 2, 35, 4, 4, 35, 36, 4, 36, 6, 6, 36, 37, 6, 37, 8, 8, 37, 38, 8, 38, 10, 10, 38, 39, 10, 39, 12, 12, 39, 40, 12, 40, 14, 14, 40, 41, 14, 41, 16, 16, 41, 42, 16, 42, 18, 18, 42, 43, 18, 43, 20, 20, 43, 44, 20, 44, 22, 22, 44, 45, 22, 45, 24, 24, 45, 46, 24, 46, 26, 26, 46, 47, 26, 47, 28, 28, 47, 48, 28, 48, 30, 30, 48, 49, 30, 50, 51, 33, 52, 53, 33, 53, 34, 34, 53, 54, 34, 54, 35, 35, 54, 55, 35, 55, 36, 36, 55, 56, 36, 56, 37, 37, 56, 57, 37, 57, 38, 38, 57, 58, 38, 58, 39, 39, 58, 59, 39, 59, 40, 40, 59, 60, 40, 60, 41, 41, 60, 61, 41, 61, 42, 42, 61, 62, 42, 62, 43, 43, 62, 63, 43, 63, 44, 44, 63, 64, 44, 64, 45, 45, 64, 65, 45, 65, 46, 46, 65, 66, 46, 66, 47, 47, 66, 67, 47, 67, 48, 48, 67, 68, 48, 69, 70, 52, 71, 72, 52, 72, 53, 53, 72, 73, 53, 73, 54, 54, 73, 74, 54, 74, 55, 55, 74, 75, 55, 75, 56, 56, 75, 76, 56, 76, 57, 57, 76, 77, 57, 77, 58, 58, 77, 78, 58, 78, 59, 59, 78, 79, 59, 79, 60, 60, 79, 80, 60, 80, 61, 61, 80, 81, 61, 81, 62, 62, 81, 82, 62, 82, 63, 63, 82, 83, 63, 83, 64, 64, 83, 84, 64, 84, 65, 65, 84, 85, 65, 85, 66, 66, 85, 86, 66, 86, 67, 67, 86, 87, 67, 88, 89, 71, 90, 91, 71, 91, 72, 72, 91, 92, 72, 92, 73, 73, 92, 93, 73, 93, 74, 74, 93, 94, 74, 94, 75, 75, 94, 95, 75, 95, 76, 76, 95, 96, 76, 96, 77, 77, 96, 97, 77, 97, 78, 78, 97, 98, 78, 98, 79, 79, 98, 99, 79, 99, 80, 80, 99, 100, 80, 100, 81, 81, 100, 101, 81, 101, 82, 82, 101, 102, 82, 102, 83, 83, 102, 103, 83, 103, 84, 84, 103, 104, 84, 104, 85, 85, 104, 105, 85, 105, 86, 86, 105, 106, 86, 107, 108, 90, 109, 110, 90, 110, 91, 91, 110, 111, 91, 111, 92, 92, 111, 112, 92, 112, 93, 93, 112, 113, 93, 113, 94, 94, 113, 114, 94, 114, 95, 95, 114, 115, 95, 115, 96, 96, 115, 116, 96, 116, 97, 97, 116, 117, 97, 117, 98, 98, 117, 118, 98, 118, 99, 99, 118, 119, 99, 119, 100, 100, 119, 120, 100, 120, 101, 101, 120, 121, 101, 121, 102, 102, 121, 122, 102, 122, 103, 103, 122, 123, 103, 123, 104, 104, 123, 124, 104, 124, 105, 105, 124, 125, 105, 126, 127, 109, 128, 129, 109, 129, 110, 110, 129, 130, 110, 130, 111, 111, 130, 131, 111, 131, 112, 112, 131, 132, 112, 132, 113, 113, 132, 133, 113, 133, 114, 114, 133, 134, 114, 134, 115, 115, 134, 135, 115, 135, 116, 116, 135, 136, 116, 136, 117, 117, 136, 137, 117, 137, 118, 118, 137, 138, 118, 138, 119, 119, 138, 139, 119, 139, 120, 120, 139, 140, 120, 140, 121, 121, 140, 141, 121, 141, 122, 122, 141, 142, 122, 142, 123, 123, 142, 143, 123, 143, 124, 124, 143, 144, 124, 145, 146, 147, 129, 128, 148, 130, 129, 149, 131, 130, 150, 132, 131, 151, 133, 132, 152, 134, 133, 153, 135, 134, 154, 136, 135, 155, 137, 136, 156, 138, 137, 157, 139, 138, 158, 140, 139, 159, 141, 140, 160, 142, 141, 161, 143, 142, 162, 163, 143];
                                os.graphics.Managers.Mesh.meshes.put(key, msh);
                                
                                return msh;
                            }
                        },
                        Instanced: function(sMesh, sKey, number){
                            //Mesh to be instanced
                            var msh = os.graphics.Managers.Mesh.GetMesh(sMesh);
                            
                            //Instanced Mesh
                            var out = os.graphics.Managers.Mesh.Create.Mesh(sKey);
                            
                            //Building Model Buffers
                            out.model = {};
                            out.model.indices = [];
                            out.model.vertexNormals = [];
                            out.model.vertexPositions = [];
                            out.model.vertexTextureCoords = [];
                            out.model.instance = [];
                            
                            for(var i = 0; i < number; i++){
                                
                                out.model.vertexPositions = out.model.vertexPositions.concat(msh.model.vertexPositions);
                                out.model.vertexNormals = out.model.vertexNormals.concat(msh.model.vertexNormals);
                                out.model.vertexTextureCoords = out.model.vertexTextureCoords.concat(msh.model.vertexTextureCoords);
                                //out.model.indices = out.model.indices.concat(msh.model.indices);
                                
                                for(var j = 0; j < msh.model.indices.length; j++){
                                    out.model.indices.push(msh.model.indices[j] + (i * msh.numOfVerts));
                                    //out.model.indices.push(msh.model.indices[j]);
                                    
                                }
                                
                                for(var k = 0; k < msh.numOfVerts; k++){
                                    out.model.instance.push(i);
                                }
                            }
                            
                            out.instanced = true;
                            os.graphics.Managers.Mesh.meshes.put(sKey, out);
                            
                            return out;
                        }
                    },
                    
                    GetMesh: function(key){
                        return os.graphics.Managers.Mesh.meshes.get(key);
                    }
                    
                },
                Sprite:{
                },
                Texture:{
                    textures: new os.resschmgr.Create.Map(),
                    Create: {
                        Texture:   function(key, url){
                            var tex = new CTexture(key, url);
                            
                            os.graphics.Managers.Texture.textures.put(key, tex);
                            
                            return tex;
                        },
                        CubeMap: function(key){
                            var tex = new CCubeMap(key);
                            
                            os.graphics.Managers.Texture.textures.put(key, tex);
                            
                            return tex;
                        },
                        RenderTexture: function(sKey, iWidth, iHeight){
                            var tex = new CRenderTexture(sKey, iWidth, iHeight);
                            os.graphics.Managers.Texture.textures.put(sKey, tex);
                            
                            return tex;
    
                        }
                    },
                    GetTexture: function(key){
                       return os.graphics.Managers.Texture.textures.get(key);
                    }
                },
                Entity:{
                    Entities: new os.resschmgr.Create.Map(),
                    _count: 0,
                    Create : function(program, id){
                        var entID;
                        
                        //If ID passed in, use as key for entity map
                        //  otherwise increment count and place in entity map
                        if(id){
                            entID = id;
                            os.graphics.Managers.Entity._count++;
                        }
                        else{
                            entID = os.graphics.Managers.Entity._count++;
                        }
                        
                        //Create Base Entity
                        var ent =  new os.resschmgr.Create.Entity(entID);
                        
                        //Add Graphics Object to Entity
                        os.graphics.Managers.Entity.EnableGraphics(ent, program);
                        

                        return ent;
                        
                    },
                    EnableGraphics: function(ent, program){
                        
                        ent.Graphics = new CGraphicsEntity(ent);
                        
                        ent.Graphics.Set = {};
                        //Add Default shader to object if program is set to default or not defined
                        if((!program) || (program == "default")){
                            
                                                         //shader name , program name
                            var shd = ent.Graphics.Add.Shader("default", "default");
                            
                            //Add Attributes
                            //shd.AddAttribute(shdVarName, shdDataType, jsBufferPointer, attributeType, itemSize);
                            shd.AddAttribute("aVertexPosition", "FLOAT", null, "VERTEX", null);
                            shd.AddAttribute("aVertexNormal", "FLOAT", null, "NORMAL", null);
                            shd.AddAttribute("aTextureCoord","FLOAT", null, "TEXTURE", null);
                                                        

                            //Add Uniforms to Entity
                            //shd.AddUniform(shdVarName, shdVarType, jsVarPtr);
                            shd.AddUniform("uPMatrix", "4X4", os.graphics.Matrix.Projection);
                            shd.AddUniform("uVMatrix", "4X4", os.graphics.Matrix.View);
                            shd.AddUniform("uWMatrix", "4X4", ent.Graphics.Matrix.World);
                            shd.AddUniform("uNMatrix", "3X3", ent.Graphics.Matrix.Normal);
                            shd.AddUniform("uVIMatrix", "4X4", os.graphics.Matrix.ViewInverse);
                            
                            //Control Variables
                            shd.AddUniform("uShowSpecularHighlights", "BOOL", true);
                            shd.AddUniform("uUseTextures", "BOOL", true);
                            shd.AddUniform("uUseLighting", "BOOL", true);
                            shd.AddUniform("uUseBlendColor", "BOOL", false);
                            shd.AddUniform("uUseFog", "BOOL", false);
                            shd.AddUniform("uUseInstacing", "BOOL", false);
                            
                            //Lighting Variables
                            shd.AddUniform("uMaterialShininess", "FLOAT", 32);
                            shd.AddUniform("uAmbientColor", "VEC3", [0.6,0.6,0.6]);
                            shd.AddUniform("uBlendColor", "VEC3", [0.0,0.0,0.0]);
                            shd.AddUniform("uPointLightDiffuseColor", "VEC3", [0.8,0.8,0.8]);
                            shd.AddUniform("uPointLightLocation", "VEC3",[75,120,211]);// [-10.0, 4.0, -20.0]);
                            
                            
                            //Fog Variables
                            shd.AddUniform("uFogColor", "VEC3", [0.0,0.0,0.0]);
                            shd.AddUniform("uFogEndPosition", "FLOAT", 100.0);
                            shd.AddUniform("uFogBeginPosition", "FLOAT", 10.0);
                            shd.AddUniform("uCameraPosition", "VEC3", os.graphics.Managers.Camera.Position);
                            
                            //Texture Sampler
                            //Texture Handled independently at the momemnt
                            
                            //Instanced Variables
                            ent.Graphics.Instanced = {};
                            ent.Graphics.Instanced.position = [0,0,0];
                            ent.Graphics.Instanced.color = [0,0,0,0]; //need to create uniform and need to look at the for loop below and make sure to fill this appropreately
                            //for(var i = 2; i < 299; i++)
                            //    ent.Graphics.Instanced.position.push(0);
                            //for(i = 3; i < 399; i++)
                            //    ent.Graphics.Instanced.color.push(0);
                            
                            shd.AddUniform("uInstancePosition", "ARRAY_VEC3", ent.Graphics.Instanced.position);
                            shd.AddUniform("uInstanceColor", "ARRAY_VEC4", ent.Graphics.Instanced.color);
                            
                            //Add Accessor Object to Adjust Uniforms
                            ent.Graphics.Set.lightPosition = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    vec3.set(val, shd.Uniforms.get("uPointLightLocation").value);
                                    
                                }.bind(ent);
                            ent.Graphics.Set.light = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    shd.Uniforms.get("uUseLighting").value = val;
                                    
                                }.bind(ent);
                            ent.Graphics.Set.specular = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    shd.Uniforms.get("uShowSpecularHighlights").value = val;
                                    
                                }.bind(ent);
                            ent.Graphics.Set.ambientColor = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    shd.Uniforms.get("uAmbientColor").value = val;
                                    
                                }.bind(ent);
                            ent.Graphics.Set.texture = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    shd.Uniforms.get("uUseTextures").value = val;
                                    
                                }.bind(ent);
                            ent.Graphics.Set.fog = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    shd.Uniforms.get("uUseFog").value = val;
                                    
                                }.bind(ent);
                            ent.Graphics.Set.fogColor = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    shd.Uniforms.get("uFogColor").value = val;
                                    
                                }.bind(ent);
                            ent.Graphics.Set.fogBeginPosition = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    shd.Uniforms.get("uFogBeginPosition").value = val;
                                    
                                }.bind(ent);
                            ent.Graphics.Set.fogEndPosition = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    shd.Uniforms.get("uFogEndPosition").value = val;
                                    
                                }.bind(ent);
                            ent.Graphics.Set.glow = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    shd.Uniforms.get("uUseGlow").value = val;
                                    
                                }.bind(ent);
                            ent.Graphics.Set.useBlendColor = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    shd.Uniforms.get("uUseBlendColor").value = val;
                                    
                                }.bind(ent);
                            ent.Graphics.Set.blendColor = function(val){
                                
                                    var shd = this.Graphics.Shaders.get("default");
                                    shd.Uniforms.get("uBlendColor").value = val;
                                    
                                }.bind(ent);
                            
                            

                        }
                        
                        ent.Position = vec3.create();
                        ent.yaw = 0;
                        ent.pitch = 0;
                        ent.roll = 0;
                        
                        ent.Set.Position = function(x, y, z){
                            this.Position[0] = x;
                            this.Position[1] = y;
                            this.Position[2] = z;
                        }.bind(ent);
                        
                        ent.Set.Rotation = function(x,y,z){
                            this.yaw = y;
                            this.pitch = x;
                            this.roll = z;
                        }.bind(ent);
                        ent.Set.Scale = function(x,y,z){
                                vec3.set([x,y,z], this.Graphics.Vectors.Scale);
                        }.bind(ent);
                        
                        ent.Default = {
                            Look:  vec3.create([0,0,1]),
                            Right: vec3.create([1,0,0]),
                            Up:    vec3.create([0,1,0]),
                            Offset: mat4.create(),
                            Rotation: mat4.create(),
                            yaw: 0,
                            pitch: 0,
                            roll: 0,
                            Position: vec3.create([0,0,0])
                        }
                        mat4.identity(ent.Default.Offset);
                        ent.Attach = function(entity){
                            ent.attachedEntity = entity;
                            
                            if(entity){
                                ent.attached = true;
                                ent.Position = entity.Physics ? entity.Physics.position : entity.Position;
                                //ent.Position = entity.Position;
                            }
                            else{
                                
                                ent.atached = false;
                                ent.Position = vec3.create();
                                vec3.set(entity.Position, ent.Position);
                            }
                        }
                        ent.Axis = {
                            Look:  vec3.create(ent.Default.Look),
                            Right: vec3.create(ent.Default.Right),
                            Up:    vec3.create(ent.Default.Up)
                            
                        }
                        
                        
                        ent.Matrix = {
                            Yaw:   mat4.create(),
                            Pitch: mat4.create(),
                            Roll:  mat4.create(),
                            Rotation: mat4.create()
                        };
                        mat4.identity(ent.Default.Rotation);
                        ent.Graphics.CalculateRotationMatrix = function(){
                            //Reset Axis
                            vec3.set(this.Default.Up,  this.Axis.Up);
                            vec3.set(this.Default.Look, this.Axis.Look);
                            vec3.set(this.Default.Right,  this.Axis.Right);
                            
                            //Clear Rotation Matrices
                            mat4.identity(this.Matrix.Yaw);
                            mat4.identity(this.Matrix.Pitch);
                            mat4.identity(this.Matrix.Roll);
                            
                            //Calculate Rotations
                            
                            mat4.rotate(this.Matrix.Yaw, degToRad(this.yaw), this.Axis.Up);
                            mat4.multiplyVec3(this.Matrix.Yaw, this.Axis.Look);
                            mat4.multiplyVec3(this.Matrix.Yaw, this.Axis.Right);
                            
                            mat4.rotate(this.Matrix.Pitch, degToRad(this.pitch), this.Axis.Right);
                            mat4.multiplyVec3(this.Matrix.Pitch, this.Axis.Look);
                            mat4.multiplyVec3(this.Matrix.Pitch, this.Axis.Up);

                            mat4.rotate(this.Matrix.Roll, degToRad(this.roll), this.Axis.Look);
                            mat4.multiplyVec3(this.Matrix.Roll, this.Axis.Right);
                            mat4.multiplyVec3(this.Matrix.Roll, this.Axis.Up);
                            
                            var pos = vec3.create([ent.Position[0], ent.Position[1], ent.Position[2]]);
                            
                            ent.Matrix.Rotation[0] =  this.Axis.Right[0];
                            ent.Matrix.Rotation[1] =  this.Axis.Up[0];
                            ent.Matrix.Rotation[2] =  this.Axis.Look[0];
                            ent.Matrix.Rotation[3] =  0;
                            ent.Matrix.Rotation[4] =  this.Axis.Right[1];
                            ent.Matrix.Rotation[5] =  this.Axis.Up[1];
                            ent.Matrix.Rotation[6] =  this.Axis.Look[1];
                            ent.Matrix.Rotation[7] =  0;
                            ent.Matrix.Rotation[8] =  this.Axis.Right[2];
                            ent.Matrix.Rotation[9] =  this.Axis.Up[2];
                            ent.Matrix.Rotation[10] = this.Axis.Look[2];
                            ent.Matrix.Rotation[11] = 0;
                            ent.Matrix.Rotation[12] = -1 * vec3.dot(pos, this.Axis.Right);//-(x0*eyex + x1*eyey + x2*eyez);
                            ent.Matrix.Rotation[13] = -1 * vec3.dot(pos, this.Axis.Up);   //-(y0*eyex + y1*eyey + y2*eyez);
                            ent.Matrix.Rotation[14] = -1 * vec3.dot(pos, this.Axis.Look); //-(z0*eyex + z1*eyey + z2*eyez);
                            ent.Matrix.Rotation[15] = 1;
                            
                            return ent.Matrix.Rotation;
                        }.bind(ent);
                        
                        ent.Move = {
                            Forward: function(distance){
                                
                                this.Position[0] += this.Axis.Look[0] * distance;
                                this.Position[1] += this.Axis.Look[1] * distance;
                                this.Position[2] += this.Axis.Look[2] * distance;
                            
                            }.bind(ent),
                            Backward: function(distance){
                               
                                this.Position[0] -= this.Axis.Look[0] * distance;
                                this.Position[1] -= this.Axis.Look[1] * distance;
                                this.Position[2] -= this.Axis.Look[2] * distance;
                                
                            }.bind(ent),
                            Left: function(distance){
                                
                                this.Position[0] -= this.Axis.Right[0] * distance;
                                this.Position[1] -= this.Axis.Right[1] * distance;
                                this.Position[2] -= this.Axis.Right[2] * distance;
                                
                            }.bind(ent),
                            Right: function(distance){
                                
                                this.Position[0] += this.Axis.Right[0] * distance;
                                this.Position[1] += this.Axis.Right[1] * distance;
                                this.Position[2] += this.Axis.Right[2] * distance;
                                
                            }.bind(ent),
                            Up: function(distance){
                                 
                                this.Position[0] += this.Axis.Up[0] * distance;
                                this.Position[1] += this.Axis.Up[1] * distance;
                                this.Position[2] += this.Axis.Up[2] * distance;
                                
                            }.bind(ent),
                            Down: function(distance){
                                 
                                this.Position[0] -= this.Axis.Up[0] * distance;
                                this.Position[1] -= this.Axis.Up[1] * distance;
                                this.Position[2] -= this.Axis.Up[2] * distance;
                                
                            }.bind(ent)
                        }
                        ent.AttachCamera = function(x, y, z){
                                vec3.set([x,y,z],ent.CameraOffset);
                                
                                os.graphics.Managers.Camera.Position = ent.Position;
                                os.graphics.Managers.Camera.Offset = ent.CameraOffset;
                        }
                        ent.CameraOffset = vec3.create();
                        
                        
                        return ent;
                    }
                },
                Camera:{
                    Position: vec3.create([0,0,0]),
                    Offset: vec3.create([0,0,0]),
                    Attach: function(ent){
                        
                        os.graphics.Managers.Camera.attachedEntity = ent;
                        vec3.set([0,0,0], os.graphics.Managers.Camera.Offset);
                        
                        if(ent){
                            os.graphics.Managers.Camera.attached = true;
                        }
                        else
                            os.graphics.Managers.Camera.attached = false;
                    },
                    attached: false,
                    attachedEntity: null,
                    Rotation: {
                        yaw:   0,
                        pitch: 0,
                        roll:  0
                    },
                    LookAtPoint: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    Axis: {
                        Look:  vec3.create([0,0,-1]),
                        Right: vec3.create([1,0,0]),
                        Up:    vec3.create([0,1,0])
                    },
                    Matrix: {
                        Yaw:   mat4.create(),
                        Pitch: mat4.create(),
                        Roll:  mat4.create(),
                        Rotation: mat4.create(),
                        RotationInverse: mat4.create(),
                        Translate: mat4.create()
                    },
                    MoveForward: function(distance){
                        //var pos = vec3.create(os.graphics.Managers.Camera.Position);
                        //
                        //mat4.multiplyVec4(os.graphics.Matrix.View, [0,0,-1*distance,0], pos);
                        //
                        //os.graphics.Managers.Camera.Position[0] += pos[0];
                        //os.graphics.Managers.Camera.Position[1] += pos[1];
                        //os.graphics.Managers.Camera.Position[2] += pos[2];
                        
                        var dist =[]
                        vec3.scale(os.graphics.Managers.Camera.Axis.Look, -distance,dist);
                        vec3.add(os.graphics.Managers.Camera.Position, dist, os.graphics.Managers.Camera.Position);
                        
                    },
                    MoveBackward: function(distance){
                        //var pos = vec3.create(os.graphics.Managers.Camera.Position);
                        //
                        //mat4.multiplyVec4(os.graphics.Matrix.View, [0,0,distance,0],pos);
                        //
                        //os.graphics.Managers.Camera.Position[0] += pos[0];
                        //os.graphics.Managers.Camera.Position[1] += pos[1];
                        //os.graphics.Managers.Camera.Position[2] += pos[2];
                        
                        var dist =[]
                        vec3.scale(os.graphics.Managers.Camera.Axis.Look, distance,dist);
                        vec3.add(os.graphics.Managers.Camera.Position, dist, os.graphics.Managers.Camera.Position);
                        
                        
                    },
                    MoveLeft: function(distance){
                        //var pos = vec3.create(os.graphics.Managers.Camera.Position);
                        //
                        //mat4.multiplyVec4(os.graphics.Matrix.View, [-1*distance,0,0,0],pos);
                        //
                        //os.graphics.Managers.Camera.Position[0] += pos[0];
                        //os.graphics.Managers.Camera.Position[1] += pos[1];
                        //os.graphics.Managers.Camera.Position[2] += pos[2];
                        
                        var dist =[]
                        vec3.scale(os.graphics.Managers.Camera.Axis.Right, -distance,dist);
                        vec3.add(os.graphics.Managers.Camera.Position, dist, os.graphics.Managers.Camera.Position);
                        
                    },
                    MoveRight: function(distance){
                        //var pos = vec3.create(os.graphics.Managers.Camera.Position);
                        //
                        //mat4.multiplyVec4(os.graphics.Matrix.View, [distance,0,0,0],pos);
                        //
                        //os.graphics.Managers.Camera.Position[0] += pos[0];
                        //os.graphics.Managers.Camera.Position[1] += pos[1];
                        //os.graphics.Managers.Camera.Position[2] += pos[2];
                        var dist =[]
                        vec3.scale(os.graphics.Managers.Camera.Axis.Right, distance,dist);
                        vec3.add(os.graphics.Managers.Camera.Position, dist, os.graphics.Managers.Camera.Position);
                        
                    },
                    MoveUp: function(distance){
                        //var pos = vec3.create(os.graphics.Managers.Camera.Position);
                        //
                        //mat4.multiplyVec4(os.graphics.Matrix.View, [0,distance,0,0],pos);
                        //
                        //os.graphics.Managers.Camera.Position[0] += pos[0];
                        //os.graphics.Managers.Camera.Position[1] += pos[1];
                        //os.graphics.Managers.Camera.Position[2] += pos[2];
                        
                        var dist =[]
                        vec3.scale(os.graphics.Managers.Camera.Axis.Up, distance,dist);
                        vec3.add(os.graphics.Managers.Camera.Position, dist, os.graphics.Managers.Camera.Position);
                        
                    },
                    MoveDown: function(distance){
                        //var pos = vec3.create(os.graphics.Managers.Camera.Position);
                        //
                        //mat4.multiplyVec4(os.graphics.Matrix.View, [0,-1*distance,0,0],pos);
                        //
                        //os.graphics.Managers.Camera.Position[0] += pos[0];
                        //os.graphics.Managers.Camera.Position[1] += pos[1];
                        //os.graphics.Managers.Camera.Position[2] += pos[2];
                        
                        var dist =[]
                        vec3.scale(os.graphics.Managers.Camera.Axis.Up, -distance,dist);
                        vec3.add(os.graphics.Managers.Camera.Position, dist, os.graphics.Managers.Camera.Position);
                        
                    },
                    Roll: function(angle){
                        
                    },
                    Pitch: function(angle){
                        
                    },
                    Yaw: function(angle){
                        
                    },
                    CalculateViewMatrix: function(){
                        var cam = os.graphics.Managers.Camera;
                        var pos;
                        
                        if(cam.attached)
                        {
                                pos = vec3.create([cam.attachedEntity.Position[0], cam.attachedEntity.Position[1], cam.attachedEntity.Position[2]]);
                                pos[0] += cam.Axis.Look[0] * cam.Offset[2];
                                pos[1] += cam.Axis.Look[1] * cam.Offset[2];
                                pos[2] += cam.Axis.Look[2] * cam.Offset[2];
                                
                                pos[0] += cam.Axis.Right[0] * cam.Offset[0];
                                pos[1] += cam.Axis.Right[1] * cam.Offset[0];
                                pos[2] += cam.Axis.Right[2] * cam.Offset[0];
                                
                                pos[0] += cam.Axis.Up[0] * cam.Offset[1];
                                pos[1] += cam.Axis.Up[1] * cam.Offset[1];
                                pos[2] += cam.Axis.Up[2] * cam.Offset[1];
                        }
                        else{
                                pos = vec3.create([cam.Position[0], cam.Position[1], cam.Position[2]]);
                        }
                        
                        
                        //var x = quat4.create([1,0,0,degToRad(os.graphics.Managers.Camera.Rotation.pitch)]);
                        //var y = quat4.create([0,1,0,degToRad(os.graphics.Managers.Camera.Rotation.yaw)]);
                        //var z = quat4.create([0,0,-1,degToRad(os.graphics.Managers.Camera.Rotation.roll)]);
                        //var cosX = Math.cos(degToRad(os.graphics.Managers.Camera.Rotation.pitch/2));
                        //var sinX = Math.sin(degToRad(os.graphics.Managers.Camera.Rotation.pitch/2));
                        //
                        //var cosY = Math.cos(degToRad(os.graphics.Managers.Camera.Rotation.yaw/2));
                        //var sinY = Math.sin(degToRad(os.graphics.Managers.Camera.Rotation.yaw/2));
                        //
                        //var cosZ = Math.cos(degToRad(os.graphics.Managers.Camera.Rotation.roll/2));
                        //var sinZ = Math.sin(degToRad(os.graphics.Managers.Camera.Rotation.roll/2));
                        //
                        //var orient = [];
                        //orient[0] = sinX*cosY*cosZ + cosX*sinY*sinZ;
                        //orient[1] = cosX*sinY*cosZ + sinX*cosY*sinZ;
                        //orient[2] = cosX*cosY*sinZ + sinX*sinY*cosZ;
                        //orient[3] = -cosX*cosY*cosZ - sinX*sinY*sinZ;
                        
                        //quat4.multiply(y, z, orient);
                        //quat4.multiply(orient, x, orient);
                        
                        //var view = os.graphics.Matrix.View;
                        //quat4.toMat4(orient, os.graphics.Matrix.View);
                        ////mat4.rotate(view, orient[3], orient, view);
                        //
                        //vec3.set([view[0],view[4],view[8]],  os.graphics.Managers.Camera.Axis.Right);
                        //vec3.set([view[1],view[5],view[9]],  os.graphics.Managers.Camera.Axis.Up);
                        //vec3.set([view[2],view[6],view[10]], os.graphics.Managers.Camera.Axis.Look);
                        //
                        //os.graphics.Matrix.View[12] = -1 * vec3.dot(pos, os.graphics.Managers.Camera.Axis.Right);//-(x0*eyex + x1*eyey + x2*eyez);
                        //os.graphics.Matrix.View[13] = -1 * vec3.dot(pos, os.graphics.Managers.Camera.Axis.Up);   //-(y0*eyex + y1*eyey + y2*eyez);
                        //os.graphics.Matrix.View[14] = -1 * vec3.dot(pos, os.graphics.Managers.Camera.Axis.Look); //-(z0*eyex + z1*eyey + z2*eyez);
                        //
                        //mat4.transpose(os.graphics.Matrix.View, os.graphics.Matrix.ViewInverse)
                        
                        //Reset Axis
                        vec3.set([0,1,0],  os.graphics.Managers.Camera.Axis.Up);
                        vec3.set([0,0,-1], os.graphics.Managers.Camera.Axis.Look);
                        vec3.set([1,0,0],  os.graphics.Managers.Camera.Axis.Right);
                        
                        //Clear Rotation Matracies
                        mat4.identity(os.graphics.Managers.Camera.Matrix.Yaw);
                        mat4.identity(os.graphics.Managers.Camera.Matrix.Pitch);
                        mat4.identity(os.graphics.Managers.Camera.Matrix.Roll);
                        mat4.identity(os.graphics.Managers.Camera.Matrix.Rotation);
                        
                        mat4.rotate(os.graphics.Managers.Camera.Matrix.Yaw, degToRad(os.graphics.Managers.Camera.Rotation.yaw), os.graphics.Managers.Camera.Axis.Up);
                        mat4.multiplyVec3(os.graphics.Managers.Camera.Matrix.Yaw, os.graphics.Managers.Camera.Axis.Look);
                        mat4.multiplyVec3(os.graphics.Managers.Camera.Matrix.Yaw, os.graphics.Managers.Camera.Axis.Right);
                        
                        
                        mat4.rotate(os.graphics.Managers.Camera.Matrix.Pitch, degToRad(os.graphics.Managers.Camera.Rotation.pitch), os.graphics.Managers.Camera.Axis.Right);
                        mat4.multiplyVec3(os.graphics.Managers.Camera.Matrix.Pitch, os.graphics.Managers.Camera.Axis.Look);
                        mat4.multiplyVec3(os.graphics.Managers.Camera.Matrix.Pitch, os.graphics.Managers.Camera.Axis.Up);
                        
                        mat4.rotate(os.graphics.Managers.Camera.Matrix.Roll, degToRad(os.graphics.Managers.Camera.Rotation.roll), os.graphics.Managers.Camera.Axis.Look);
                        mat4.multiplyVec3(os.graphics.Managers.Camera.Matrix.Roll, os.graphics.Managers.Camera.Axis.Right);
                        mat4.multiplyVec3(os.graphics.Managers.Camera.Matrix.Roll, os.graphics.Managers.Camera.Axis.Up);
                        
                        vec3.normalize(os.graphics.Managers.Camera.Axis.Up);
                        vec3.normalize(os.graphics.Managers.Camera.Axis.Look);
                        vec3.normalize(os.graphics.Managers.Camera.Axis.Right);
                        
                        os.graphics.Matrix.View[0] =  os.graphics.Managers.Camera.Axis.Right[0];
                        os.graphics.Matrix.View[1] =  os.graphics.Managers.Camera.Axis.Up[0];
                        os.graphics.Matrix.View[2] =  os.graphics.Managers.Camera.Axis.Look[0];
                        os.graphics.Matrix.View[3] =  0;
                        os.graphics.Matrix.View[4] =  os.graphics.Managers.Camera.Axis.Right[1];
                        os.graphics.Matrix.View[5] =  os.graphics.Managers.Camera.Axis.Up[1];
                        os.graphics.Matrix.View[6] =  os.graphics.Managers.Camera.Axis.Look[1];
                        os.graphics.Matrix.View[7] =  0;
                        os.graphics.Matrix.View[8] =  os.graphics.Managers.Camera.Axis.Right[2];
                        os.graphics.Matrix.View[9] =  os.graphics.Managers.Camera.Axis.Up[2];
                        os.graphics.Matrix.View[10] = os.graphics.Managers.Camera.Axis.Look[2];
                        os.graphics.Matrix.View[11] = 0;
                        os.graphics.Matrix.View[12] = -1 * vec3.dot(pos, os.graphics.Managers.Camera.Axis.Right);//-(x0*eyex + x1*eyey + x2*eyez);
                        os.graphics.Matrix.View[13] = -1 * vec3.dot(pos, os.graphics.Managers.Camera.Axis.Up);   //-(y0*eyex + y1*eyey + y2*eyez);
                        os.graphics.Matrix.View[14] = -1 * vec3.dot(pos, os.graphics.Managers.Camera.Axis.Look); //-(z0*eyex + z1*eyey + z2*eyez);
                        os.graphics.Matrix.View[15] = 1;
                        
                        mat4.transpose(os.graphics.Matrix.View, os.graphics.Matrix.ViewInverse)
                        
                        
                    },
                    ResetAxis: function(){
                        
                    },
                    GetViewMatrix: function(){
                        
                    }
                }
            },
            Matrix: {
                Projection: mat4.create(),
                View: mat4.create(),
                ViewInverse: mat4.create()
            },
            Time: {
                current:    0,
                previous:   0,
                elapsed:    0,
                dt:         0
            },
            
            Get: {
                Canvas: function(){return _canvas;},
                Pause: function(){return _pause;},
                Fullscreen: function(){return _fullscreen;},
                Width: function(){return _canvas.width;},
                Height: function(){return _canvas.height;}
            },
            Set: {
                Callback:{
                    Update: function(updateFunction, updateScope){
                        _update = updateFunction;
                        _updateScope = updateScope;
                    },
                    Draw: function(drawFunction, drawScope){
                        _draw = drawFunction;
                        _drawScope = drawScope;
                    },
                    Reset: function(resetFunction, resetScope){
                        _reset = resetFunction;
                        _resetScope = resetScope;
                    }
                    
                },
                Fullscreen: function(isFullscreen){
                    //Call 
                },
                Viewport: function(width, height){
                    
                }
            },
            Maps: {
                update: null,
                draw: null,
                name2id: null
            },
            
            //PUBLIC PRIVILEDGE METHODS
            Initialize: function(){
                //Initialize Managers
                
                //Create Entity Maps
                os.graphics.Maps.update = os.resschmgr.Create.Map();
                os.graphics.Maps.draw = os.resschmgr.Create.Map();
                os.graphics.Maps.name2id = os.resschmgr.Create.Map();
                
                //Create mat4 for Matrices
                os.graphics.Matrix.View = mat4.create();
                os.graphics.Matrix.Projection = mat4.create();
                
                //Load Default Vertex and Fragment Shaders
            },
            Load: function(isDebug, isFullscreen, canvas){
                
                //If Canvas was passed in, use it, otherwise create a canvas object
                if(canvas){ _canvas = canvas; }
                else{
                    _canvas = document.createElement("canvas");
                    document.body.appendChild(_canvas);
                }
                
                //Set attribute to fullscreen if value exist
                if(isFullscreen){
                    _fullscreen = true;
                    _canvas.style.width = "100%";
                    _canvas.style.height = "100%";
                    document.body.style.overflow = "hidden";
                }
                else{_fullscreen = false;}
                
                //Create Debug context, otherwise create standard WebGL context
                if(isDebug){ os.graphics.gl = WebGLDebugUtils.makeDebugContext(_get3DContext(_canvas, {preserveDrawingBuffer: true,premultipliedAlpha: false}));}
                else{ os.graphics.gl = _get3DContext(_canvas);}
                
                var gl = os.graphics.gl;
                //gl = canvas.getContext("experimental-webgl", {premultipliedAlpha: false});
                
                //Set Default Camera Position
                //mat4.lookAt( [0,0,-1000], [0,0,0], [0,1,0],os.graphics.Matrix.View);
                os.graphics.Managers.Camera.Position[0] = 0;
                os.graphics.Managers.Camera.Position[1] = 0;
                os.graphics.Managers.Camera.Position[2] = -500;
                os.graphics.Managers.Camera.Rotation.pitch = 0;
                os.graphics.Managers.Camera.Rotation.yaw = 0;
                os.graphics.Managers.Camera.Rotation.roll = 0
                
                os.graphics.Managers.Camera.CalculateViewMatrix();
                
                _canvas.width = _canvas.clientWidth;
                _canvas.height = _canvas.clientHeight;
                
                //Set ViewPort
                mat4.perspective(45, _canvas.clientWidth / _canvas.clientHeight, 0.1, 10000.0, os.graphics.Matrix.Projection);
                gl.viewport(0,0,_canvas.clientWidth, _canvas.clientHeight);
                
                
                
                
                //_canvas.addEventListener("onchange", os.graphics.OnReset, false);
                window.onresize = os.graphics.OnReset;
        
        
                //Set Clear Color (r,g,b,a)
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                
                //Enable Depth Testing
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LESS);
                
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
                //Verify WebGL context was created
                //  download, build and complie default Shader and Program
                if(_canvas){
                
                    //Download and compile Default Shaders
                    os.graphics.Managers.Shader.Create.VertexShader("default", "scripts/jahovaos/graphics/shaders/default.vs");
                    os.graphics.Managers.Shader.Create.FragmentShader("default", "scripts/jahovaos/graphics/shaders/default.fs");
                    
                    //Build Default Program and Link
                    var prg = os.graphics.Managers.Shader.Create.Program("default", "default", "default");
                    
                    //Add Attributes to Default Program
                    prg.CreateAttribute("aVertexPosition");
                    prg.CreateAttribute("aVertexNormal");
                    prg.CreateAttribute("aTextureCoord");
                    
                    //Add Uniforms to Default Program
                    prg.CreateUniform("uPMatrix");
                    prg.CreateUniform("uVMatrix");
                    prg.CreateUniform("uWMatrix");
                    prg.CreateUniform("uNMatrix");
                    prg.CreateUniform("uVIMatrix");
                    prg.CreateUniform("uShowSpecularHighlights");
                    prg.CreateUniform("uUseTextures");
                    prg.CreateUniform("uUseLighting");
                    prg.CreateUniform("uUseBlendColor");
                    prg.CreateUniform("uUseInstacing");
                    prg.CreateUniform("uInstancePosition");
                    prg.CreateUniform("uInstanceColor");
                    prg.CreateUniform("uAmbientColor");
                    prg.CreateUniform("uBlendColor");
                    prg.CreateUniform("uPointLightSpecularColor");
                    prg.CreateUniform("uPointLightDiffuseColor");
                    prg.CreateUniform("uPointLightLocation");
                    prg.CreateUniform("uMaterialShininess");
                    prg.CreateUniform("uSampler");
                    prg.CreateUniform("uUseFog");
                    prg.CreateUniform("uCameraPosition");
                    prg.CreateUniform("uFogColor");
                    prg.CreateUniform("uFogEndPosition");
                    prg.CreateUniform("uFogBeginPosition");
                    

                }
                
                
                return _canvas;
                
            },
            Start: function(){
                if(!_pause){
                    requestAnimFrame(os.graphics.Start);
                    
                    os.graphics.Update();
                    
                    os.graphics.Draw();
                }
            },
            Pause: function(){
                if(!_pause){
                    
                    _pause = true;
                    
                }
                else{
                    os.graphics.Resume();
                }
            },
            Resume: function(){
                if(_pause){
                    
                    _pause = false;
                    
                    //Restore Time and Call os.graphics.Start()
                        //Save Previous
                    os.graphics.Time.previous = os.graphics.Time.current;
                    
                        //Get Current
                    os.graphics.Time.current = (new Date()).getTime();
                    
                        //Increment elapsed time with stored dt
                    os.graphics.Time.elapsed += os.graphics.Time.dt;
                    
                    os.graphics.Start();
                }
            },            
            Update: function(){
                
                //Update Time
                    //Save Previous
                os.graphics.Time.previous = os.graphics.Time.current;
                
                    //Get Current
                os.graphics.Time.current = (new Date()).getTime();
                
                    //Calculate dt
                os.graphics.Time.dt = os.graphics.Time.current - os.graphics.Time.previous;
                
                    //Increment elapsed time
                os.graphics.Time.elapsed += os.graphics.Time.dt;
                
                //Call user defined update funciton (if exist)
                if(_update){
                    
                    //If scope was set, call using scope, otherwise call directly
                    if(_updateScope){ _update.apply(_updateScope, os.graphics.Time.dt); }
                    else{ _update(os.graphics.Time.dt);}
                }
                
                //Loop through os.graphics.Maps.update and call Update(os.graphics.Time.dt) methods
                for(var i = os.graphics.Maps.update.size; i--; os.graphics.Maps.update.next())
                        os.graphics.Maps.update.value().Graphics.Update(os.graphics.Time.dt);
                
            },
            Draw: function(){
                var gl = os.graphics.gl;
                
                //Reset Poly/Vert Count
                os.graphics.Managers.Mesh.totalPolys = 0;
                os.graphics.Managers.Mesh.totalVerts = 0;
                
                os.graphics.Managers.Camera.CalculateViewMatrix();
        
                //Clear Color and Depth Buffers
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                
                //Call user defined draw function (if exist)
                if(_draw){
                    
                    //If scope was set, call using scope, otherwise call directly
                    if(_drawScope){ _draw.apply(_drawScope, os.graphics.Time.dt); }
                    else{ _draw(os.graphics.Time.dt);}
                }

                //Loop through os.graphics.Maps.draw and call Draw() methods
                for(var i = os.graphics.Maps.draw.size; i--; os.graphics.Maps.draw.next())
                        os.graphics.Maps.draw.value().Graphics.Draw();
            },
            AddToWorld: function(entity){
                os.graphics.AddToDraw(entity);
                os.graphics.AddToUpdate(entity);
            },
            AddToDraw: function(entity){
                os.graphics.Maps.draw.put(entity.ID(), entity);
            },
            AddToUpdate: function(entity){
                os.graphics.Maps.update.put(entity.ID(), entity);
            },
            RemoveFromWorld: function(ent){
                os.graphics.RemoveFromDraw(ent);
                os.graphics.RemoveFromUpdate(ent);
            },
            RemoveFromDraw: function(ent){
                os.graphics.Maps.draw.remove(ent.ID());
            },
            RemoveFromUpdate: function(ent){
                os.graphics.Maps.update.remove(ent.ID());
            },
            OnReset: function(){
                //Set ViewPort
                _canvas.width = _canvas.clientWidth;
                _canvas.height = _canvas.clientHeight;
                
                //Call user defined reset funciton (if exist)
                if(_reset){
                    
                    //If scope was set, call using scope, otherwise call directly
                    if(_resetScope){ _reset.apply(_resetScope, os.graphics.Time.dt); }
                    else{ _reset(os.graphics.Time.dt);}
                }
                
                
                
                os.graphics.gl.viewport(0,0,_canvas.clientWidth, _canvas.clientHeight);
                mat4.perspective(45, _canvas.clientWidth / _canvas.clientHeight, 0.1, 10000.0, os.graphics.Matrix.Projection);

            },
            
            GetName: function(){
                return NAME;
            },
            
            GetVersion: function(){
                return VERSION;
            },
            
            GetPath: function(){
                return PATH;
            },
           
            GetID: function(){
                return ID;
            } 
            
        }
    }
    
    return {
        //OBJECT ACCESSOR
        Instance: function()
        {
            if(!pInstance)
            {
                //Instantiate if pInstance does not exist
                pInstance = constructor();
            }
            
            return pInstance;
        }
    }
})();
com.jahova.os.Instance().Cores.Instance().Physics = (function()
{
    var pInstance;

    function constructor()
    {
        //PRIVATE ATTRIBUTES
        var NAME = "JaHOVA OS Internal API : Physics Core";
        var VERSION = "0v5";
        var PATH = "scripts/jahova/OS/Cores/Audio/jahova.os.cores.physics.js";
        var ID = null;
        
        var os = com.jahova.os.Instance();
        var utilities = com.jahova.utilities.Instance();
        
        var numOfForces = 0;
        var numOfEntities = 0;
        /*
         **/
        //PRIVATE METHODS
        
        
        //Private Classes
        var CImpulse = function(id, oEntity,vContactLocal, vForce){
            var _id = id;
            var point = [];
            var applied  = false;
            var entity = oEntity;
            var contact = vContactLocal;
            var force = vForce;
            
            this.Update = function(dt){
                
                entity.Get.PointInWorld(contact, point);
                entity.Add.ForceAtWorldPoint(force, point);
                applied = true;
                
               return -1;
                
            }
            
        }
        var CLocalImpulse = function(id, oEntity,vContactLocal, vForceLocal){
            var _id = id;
            var point = [];
            var applied  = false;
            var entity = oEntity;
            var contact = vContactLocal;
            var force = vForceLocal;
            
            this.Update = function(dt){
                var rot = [];
                //Get rotation matrix
                quat4.toMat4(entity.orientation, rot);
                //Convert Force from local to world cordinates
                mat4.multiplyVec3(rot, force, force);
                
                entity.Get.PointInWorld(contact, point);
                entity.Add.ForceAtWorldPoint(force, point);
                applied = true;
                
               return -1;
                
            }
            
        }
        var CSpringForce = function(id, oEntity, k, length, vPt1, vPt2, oSeconEntity){
            var _id = id;
            this.type = "SPRING";
            
            this.pt1 = vPt1;
            this.pt2 = vPt2;
            this.duration = 0;
            
            this.contactEntity = oSeconEntity;
            
            this.springConstant = k;
            this.restLength = length;
            var positive = null;
            
            //
            //  DEFAULT PROPERTIES/METHODS
            //
            this.entity = oEntity;
            this.Cancel = function(){
                this.duration = -1;
            }
            this.Update = function(dt){
                
                var entity = [];
                var anchor = [];
                
                //if contactEntity is null, pt2 is a world point
                //  otherwise it is anchored to another entity
                //  and pt2 is a local point of entity
                if(this.contactEntity){
                    
                    this.contactEntity.Get.PointInWorld(this.pt2, anchor);
                }
                else{
                    anchor = this.pt2;
                }
                this.entity.Get.PointInWorld(this.pt1 , entity);
                                    
                var kX = [];
                vec3.subtract(anchor, entity, kX);
                
                var mag = vec3.length(kX);  //Length of spring (stretched or compressed)
                
                dx = mag - this.restLength;     //Get ammount of compression or stretched (displacment from rest)
                
                dx = dx * this.springConstant;  //Magnitude of force
                
                vec3.normalize(kX);         //Directon of force
                vec3.scale(kX, dx, kX);   //Scaled by calculated magnitude
                
                //Apply force to object
                this.entity.Add.ForceAtWorldPoint(kX, entity);
                
                return this.duration;
                
                
            }
            this.ID = function(){
                return _id;
            }
            
            
        }
        
        
        var CPhysicsEntity =  function(ID, invMass){
            var self = this;
            var _id = ID;
            this.inverseMass = invMass;
            this.linearDampening = 1;
            this.angularDampening = 1;
            this.maxSpeed = 1000;
            
            this.orientation = quat4.create();
            this.position = vec3.create();
            this.velocity = vec3.create();
            this.omega = vec3.create();
            this.linearAccel = vec3.create();
            this.rotAccel = vec3.create();
            this.forceAccum = vec3.create();
            this.torqueAccum = vec3.create();
            this.gravity = vec3.create();
            
            this.awake = true;
            this.motion = 0;
            
            var inverseInertiaTensorWorld = mat3.create();
            var inverseInertiaTensorLocal = mat3.create();
            this.transformMatrix = mat4.create();
            
            
            //Initialize 3x3 Matrix
            //mat3.identity(this.inverseInertiaTensorLocal);
            //mat3.identity(this.inverseInertiaTensorWorld);
            
            //Set Zero Rotation
            quat4.set([0,0,0,1], this.orientation);
            
            //Initialize 4x4 Matrix
            mat4.identity(this.transformMatrix);
            
            this.Get = {
                ID: function(){
                    return _id;
                },
                PointInLocal: function(vPoint, vOut){
                    var inverse = [];
                    mat4.inverse(self.transformMatrix, inverse);
                    mat4.multiplyVec3(inverse, vPoint, vOut);
                    
                },
                PointInWorld: function(vPoint, vOut){
                    mat4.multiplyVec3(self.transformMatrix, vPoint, vOut);
                },
                InertialTensor: function(){
                    return inverseInertiaTensorLocal;
                }
            }
            
            this.Add ={
                ForceAtCM: function(){
                    
                },
                ForceAtWorldPoint: function(vForce, vPoint){
                    
                    //Linear Motion forceAccum += vForce
                    vec3.add(vForce, self.forceAccum, self.forceAccum);
                    
                    //Rotational
                    var r = []; //radial arm
                    vec3.subtract(vPoint, self.position, r);
                    
                    var torque = [];
                    vec3.cross(r, vForce, torque);
                    //vec3.cross(vForce, r, torque);
                    
                    //torqueAccum += torque
                    vec3.add(torque, self.torqueAccum, self.torqueAccum);

                    self.awake = true;
                    
                }.bind(this),
                ForceAtLocalPoint: function(vForce, vPoint){
                    var point = [];
                    self.Get.PointInWorld(vPoint, point);
                    self.Add.ForceAtWorldPoint(vForce, point);
                },
                Torque: function(){
                    
                },
                InertialTensor: function(mat){
                    inverseInertiaTensorLocal = mat;
                }
            }
            this.PrintRot = function(){
                var rot  = [];
                quat4.toMat3(self.orientation,rot);
                //mat3.transpose(rot, rot);
                
                var localX = [rot[0],rot[1],rot[2]];
                var localY = [rot[3],rot[4],rot[5]];
                var localZ = [rot[6],rot[7],rot[8]];
                
                vec3.normalize(localX, localX);
                vec3.normalize(localY, localY);
                vec3.normalize(localZ, localZ);
                
                os.console.Comment("Theta X: " + (180 * Math.acos(vec3.dot(localX, [1,0,0])).toFixed(2) / Math.PI));
                os.console.Comment("Theta Y: " + (180 * Math.acos(vec3.dot(localY, [0,1,0])).toFixed(2) / Math.PI));
                os.console.Comment("Theta Z: " + (180 * Math.acos(vec3.dot(localZ, [0,0,1])).toFixed(2) / Math.PI));
            }
            this.Clear = function(){
                vec3.set([0,0,0], self.forceAccum);
                vec3.set([0,0,0], self.torqueAccum);
            }
            
            this.CalculateDerivedData = function(){
                quat4.normalize(self.orientation, self.orientation);
                
                var rot = quat4.toMat3(self.orientation);
                var rotInv = [];
                
                mat3.transpose(rot, rotInv);//[rot[0], rot[3], rot[6], rot[1], rot[4], rot[7], rot[2], rot[5], rot[8]];//mat4.toInverseMat3(rot);
                
                //var rot = quat4.toMat4(self.orientation);
                //var rotInv = mat4.inverse(rot);
                
                //mat3.multiply(rotInv, inverseInertiaTensorLocal, inverseInertiaTensorWorld);
                //mat3.multiply(inverseInertiaTensorWorld, rot, inverseInertiaTensorWorld);
                
                mat3.multiply(rot, inverseInertiaTensorLocal, inverseInertiaTensorWorld);
                mat3.multiply(inverseInertiaTensorWorld, rotInv, inverseInertiaTensorWorld);
                
                mat4.identity(self.transformMatrix);
                quat4.toMat4(self.orientation,self.transformMatrix);
                //mat4.transpose(self.transformMatrix);
                //mat4.translate(self.transformMatrix, self.position, self.transformMatrix);
                self.transformMatrix[12] = self.position[0];
                self.transformMatrix[13] = self.position[1];
                self.transformMatrix[14] = self.position[2];
                
                //for debugging, was getting NaN in transform matrix
                if(isNaN(self.transformMatrix[0])){
                    var out = 0;
                    out++;
                }
            }
            this.Update = function(dt){
                if(self.awake){
                    self.CalculateDerivedData();
                    
                    
                    //***********************************
                    //  LINEAR MOTION
                    //***********************************
                    
                    //Calculate Linear Acceleration
                    // a = 1/m * F
                    vec3.scale(self.forceAccum, self.inverseMass, self.linearAccel);
                    
                    //Determine new velocity
                    //   V = Vo*d^dt + a*dt
                    var VoD = [];
                    var aDt = [];
                    vec3.scale(self.velocity, Math.pow(self.linearDampening,dt), VoD);
                    vec3.scale(self.linearAccel, dt, aDt);
                    
                    vec3.add( VoD, aDt, self.velocity);
                    
                    //if(vec3.length(self.velocity) > self.maxSpeed){
                    //    vec3.normalize(self.velocity, self.velocity);
                    //    vec3.scale(self.velocity, self.maxSpeed, self.velocity);
                    //}
                    //Determine new position
                    //   X = Xo + Vo*dt
                    var VoDt = [];
                    vec3.scale(self.velocity, dt, VoDt);
                    
                    vec3.add(self.position, VoDt, self.position);
                    
                    //***********************************
                    //  ROTATIONAL MOTION
                    //**********************************
                    
                    //Calculate Rotation Acceleration
                    // alpha = I^-1 * Torque
                    mat3.multiplyVec3(inverseInertiaTensorWorld, self.torqueAccum, self.rotAccel);                    
                    
                    //Determine new angular velocity
                    //    W = Wo*d^dt + alpha * dt
                    var WoD = [];
                    var alphaDt = [];
                    
                    vec3.scale(self.omega, Math.pow(self.angularDampening, dt),WoD );
                    vec3.scale(self.rotAccel, dt, alphaDt);
                    
                    vec3.add(WoD, alphaDt, self.omega);

                    //Determine new angular displacement
                    //    0 = 0o + t/2*Wo*0o
                    var temp = [];
                    quat4.multiply([self.omega[0], self.omega[1], self.omega[2],0],self.orientation, temp);
                    //quat4.multiplyVec3(self.orientation, self.omega, temp);
                    //quat4.normalize(temp,temp);
                    self.orientation = [self.orientation[0] + temp[0] * dt/2, self.orientation[1] + temp[1] * dt/2, self.orientation[2] + temp[2] * dt/2, self.orientation[3] + temp[3] * dt/2];
                    
                    
                    
                }
            }
            
            
        }
        var COBB = function(){
            var self = this;
            this.entity = null;
            this.name = "";
            this.type = "OBB";
            this.center = [];
            this.halfSize = [];
            this.orientation = [];
            this.transpose = [];
            this.CollisionTest = function(oBV){
                var collision = false;
                
                if(oBV.type ==  "OBB"){
                    collision = true;
                    var a0 = self.halfSize[0], a1 = self.halfSize[1], a2 = self.halfSize[2];
                    var b0 = oBV.halfSize[0],  b1 = oBV.halfSize[1],  b2 = oBV.halfSize[2];
                    var A = [];     //Transform Matrix of Current
                    var B = [];     //Transform Matrix of oBV
                    var C = [];     //Transform Matrix, C = A^T*B, A,B rotation/orientation matricies
                    var D = [];     //Distance Vector, distance between centers
                    
                    quat4.toMat3(this.orientation, A);
                    var A0 = [A[0], A[3], A[6]];
                    var A1 = [A[1], A[4], A[7]];
                    var A2 = [A[2], A[5], A[8]];
                    quat4.toMat3(oBV.orientation,  B);
                    var B0 = [B[0], B[3], B[6]];
                    var B1 = [B[1], B[4], B[7]];
                    var B2 = [B[2], B[5], B[8]];
                    
                    mat3.transpose(A, this.transpose);
                    //mat4.transpose(B, oBV.transpose);
                    mat3.multiply(this.transpose, B,C);
                                       
                    // Cache the matrix values (makes for huge speed increases!)
                    var c00 = C[0], c01 = C[1], c02 = C[2];
                    var c10 = C[3], c11 = C[4], c12 = C[5];
                    var c20 = C[6], c21 = C[7], c22 = C[8];
                    
                    vec3.subtract(oBV.center, this.center, D);
                    
                    //Non-Intersection Test if R > Ro + R1
                    var Ro, R1, R;
                    //
                    //  A
                    //
                    Ro = a0;
                    R1 = b0 * Math.abs(c00) + b1 * Math.abs(c10) + b2* Math.abs(c20);
                    R  = vec3.dot(A0, D);
                    if(R > (Ro + R1)){return false};
                    
                    Ro = a1;
                    R1 = b0 * Math.abs(c01) + b1 * Math.abs(c11) + b2 * Math.abs(c21);
                    R  = vec3.dot(A1, D);
                    if(R > (Ro + R1)){return false};
                    
                    Ro = a2;
                    R1 = b0 * Math.abs(c02) + b1 * Math.abs(c12) + b2 * Math.abs(c22);
                    R  = vec3.dot(A2, D);
                    if(R > (Ro + R1)){return false};
                    
                    //
                    //  B
                    //
                    Ro = a0 * Math.abs(c00) + a1* Math.abs(c01) + a2 * Math.abs(c02);
                    R1 = b0;
                    R  = vec3.dot(B0, D);
                    if(R > (Ro + R1)){return false};
                    
                    Ro = a0 * Math.abs(c10) + a1 * Math.abs(c11) + a2 * Math.abs(c12);
                    R1 = b1
                    R  = vec3.dot(B1, D);
                    if(R > (Ro + R1)){return false};
                    
                    Ro = a0 * Math.abs(c20) + a1 * Math.abs(c21) + a2 * Math.abs(c22);
                    R1 = b2;
                    R  = vec3.dot(B2, D);
                    if(R > (Ro + R1)){return false};
                    
                    //
                    //  A0 X Bi
                    //
                    Ro = a1 * Math.abs(c02) + a2 * Math.abs(c01);
                    R1 = b1 * Math.abs(c20) + b2 * Math.abs(c10);
                    R  = Math.abs(c01 * vec3.dot(A2,D) - c02 * vec3.dot(A1,D));
                    if(R > (Ro + R1)){return false};
                    
                    Ro = a1 * Math.abs(c12) + a2 * Math.abs(c11);
                    R1 = b0 * Math.abs(c20) + b2 * Math.abs(c00);
                    R  = Math.abs(c11 * vec3.dot(A2,D) - c12 * vec3.dot(A1,D));
                    if(R > (Ro + R1)){return false};
                    
                    Ro = a1 * Math.abs(c22) + a2 * Math.abs(c21);
                    R1 = b0 * Math.abs(c10) + b1 * Math.abs(c00);
                    R  = Math.abs(c21 * vec3.dot(A2,D) - c22 * vec3.dot(A1,D));
                    if(R > (Ro + R1)){return false};
                    
                    //
                    //  A1 X Bi
                    //
                    Ro = a0 * Math.abs(c02) + a2 * Math.abs(c00);
                    R1 = b1 * Math.abs(c21) + b2 * Math.abs(c11);
                    R  = Math.abs(c02 * vec3.dot(A0,D) - c00 * vec3.dot(A2,D));
                    if(R > (Ro + R1)){return false};
                    
                    Ro = a0 * Math.abs(c12) + a2 * Math.abs(c10);
                    R1 = b0 * Math.abs(c21) + b2 * Math.abs(c01);
                    R  = Math.abs(c12 * vec3.dot(A0,D) - c10 * vec3.dot(A2,D));
                    if(R > (Ro + R1)){return false};
                    
                    Ro = a0 * Math.abs(c22) + a2 * Math.abs(c20);
                    R1 = b0 * Math.abs(c11) + b1 * Math.abs(c01);
                    R  = Math.abs(c22 * vec3.dot(A0,D) - c20 * vec3.dot(A2,D));
                    if(R > (Ro + R1)){return false};
                    
                    //
                    //  A2 X Bi
                    //
                    Ro = a0 * Math.abs(c01) + a1 * Math.abs(c00);
                    R1 = b1 * Math.abs(c22) + b2 * Math.abs(c12);
                    R  = Math.abs(c00 * vec3.dot(A1,D) - c01 * vec3.dot(A0,D));
                    if(R > (Ro + R1)){return false};
                    
                    Ro = a0 * Math.abs(c11) + a1 * Math.abs(c10);
                    R1 = b0 * Math.abs(c22) + b2 * Math.abs(c02);
                    R  = Math.abs(c10 * vec3.dot(A1,D) - c11 * vec3.dot(A0,D));
                    if(R > (Ro + R1)){return false};
                    
                    Ro = a0 * Math.abs(c21) + a1 * Math.abs(c20);
                    R1 = b0 * Math.abs(c12) + b1 * Math.abs(c02);
                    R  = Math.abs(c20 * vec3.dot(A1,D) - c21 * vec3.dot(A0,D));
                    if(R > (Ro + R1)){return false};
                    
                    
                    collision = new CCollision();
                    collision.obj2 = oBV;
                    collision.point.obj2 = oBV.ClosestPoint(self.center);
                    
                    collision.obj1 = self;
                    collision.point.obj1 = self.ClosestPoint(oBV.center);
                    
                    vec3.subtract(collision.point.obj2, collision.point.obj1, collision.normal);
                    vec3.normalize(collision.normal,collision.normal);
                    
                    
                }
                else if(oBV.type == "AABB"){
                    
                }
                else if(oBV.type == "SPHERE"){
                    var r2 = oBV.halfSize * oBV.halfSize;
                    var closestPoint = self.ClosestPoint(oBV.center);
                    
                    var dist = [];
                    vec3.subtract(closestPoint, oBV.center,dist);
                    
                    collision  = r2 > vec3.dot(dist, dist) ? true : false;
                    if(collision){
                        collision = new CCollision();
                        collision.obj2 = oBV;
                        collision.point.obj2 = oBV.ClosestPoint(self.center);
                        
                        collision.obj1 = self;
                        collision.point.obj1 = closestPoint;
                        
                        vec3.subtract(collision.point.obj2, collision.point.obj1, collision.normal);
                        vec3.normalize(collision.normal,collision.normal);
                    }
                    
                }
                else{
                    //Error, unkknow type
                }
                
                return collision;
            }
            this.ClosestPoint = function(point){
                var distance = [];
                var out = [];
                var length = [];
                var A = []; //3x3 Transform Matrix
                quat4.toMat3(self.orientation, A);
                var Axis = [];
                Axis[0] = [A[0], A[3], A[6]];
                Axis[1] = [A[1], A[4], A[7]];
                Axis[2] = [A[2], A[5], A[8]];
                
                var temp = [];
                
                
                vec3.subtract(point, self.center, distance);
                vec3.set(self.center, out);
            
                for (var i = 0; i < 3; i++) {
                    length = vec3.dot(distance, Axis[i]);
            
                    if (length > self.halfSize[i]){ length =  self.halfSize[i];}
                    else if (length < -self.halfSize[i]){ length = -self.halfSize[i];}
                    
                    //out[i] += length;
                    vec3.scale(Axis[i], length, temp);
                    vec3.add(out, temp, out);
                }
                
                return out;
            }
        }
        var CSphere = function(){
            var self = this;
            this.entity = null;
            this.name = "";
            this.type = "SPHERE";
            this.center = [];
            this.halfSize = 0;
            this.CollisionTest = function(oBV){
                var collision = false;
                
                if(oBV.type ==  "OBB"){
                    var r2 = self.halfSize * self.halfSize;
                    var closestPoint = oBV.ClosestPoint(self.center);
                    
                    var dist = [];
                    vec3.subtract(self.center,closestPoint,dist);
                    
                    collision  = r2 > vec3.dot(dist, dist) ? true : false;
                    if(collision){
                        collision = new CCollision();
                        collision.obj2 = oBV;
                        collision.point.obj2 = closestPoint;
                        
                        collision.obj1 = self;                    
                        vec3.normalize(dist,collision.normal);
                        vec3.scale(dist,collision.normal, self.halfSize, dist);
                        collision.point.obj1 = dist;
                    }
                }
                else if(oBV.type == "AABB"){
                    
                }
                else if(oBV.type == "SPHERE"){
                    var r2 = (self.halfSize + oBV.halfSize) * (self.halfSize + oBV.halfSize);
                    var dist = [];
                    vec3.subtract(self.center, oBV.center,dist);
                    
                    collision  = r2 > vec3.dot(dist, dist) ? true : false;
                    if(collision){
                        collision = new CCollision();
                        
                        vec3.normalize(dist,collision.normal);
                        collision.obj1 = self;
                        vec3.scale(dist,collision.normal, self.halfSize, collision.point.obj1);
                        
                        collision.obj2 = oBV;
                        vec3.scale(collision.normal, oBV.halfSize, collision.point.obj2);
                        vec3.add(oBV.center,collision.point.obj2,collision.point.obj2);
                        
                        
                        
                        
                    }
                }
                else{
                    //Error, unkknow type
                }
                
                return collision;
            }
            this.ClosestPoint = function(point){
                var dir = [];
                vec3.subtract(point,self.center,dir);
                vec3.normalize(dir,dir);
                vec3.scale(dir, self.halfSize, dir);
                return dir;
            }
            
        }
        var CAABB = function(){
            var self = this;
            this.type = "AABB";
            this.center = [];
            this.halfSize = [];
            this.CollisionTest = function(oBV){
                var collision = false;
                
                if(oBV.type ==  "OBB"){
                    
                }
                else if(oBV.type == "AABB"){
                    collision = true;
                    if((Math.abs(self.center[0] - oBV.center[0]) > (self.halfSize[0] + oBV.halfSize[0]))){
                        collision = false;
                    }
                    else if((Math.abs(self.center[1] - oBV.center[1]) > (self.halfSize[1] + oBV.halfSize[1]))){
                        collision = false;
                    }
                    else if((Math.abs(self.center[2] - oBV.center[2]) > (self.halfSize[2] + oBV.halfSize[2]))){
                        collision = false;
                    }
                }
                else if(oBV.type == "SPHERE"){
                    
                }
                else{
                    //Error, unkknow type
                }
                
                return collision;
            }
        
        }
        var CCollision = function(){
            this.obj1 = null;
            this.obj2 = null;
            this.point = {
                obj1: [],
                obj2: []
            }
            this.normal = [];
        }
        return{
            //PUBLIC ATTRIBUTES
            forces: [],
            collisions: [],
            bvs:[],
            entities: null,
            forceMap: null,
            gravity: [],
            maxContacts: 10,
            contacts: [],
            Create: {
                Force: {
                    Impulse: function(oEntity, vContactLocal, vForce){
                        var force = new CImpulse(numOfForces++, oEntity,vContactLocal, vForce);
                        os.physics.forces.push(force);
                        //os.physics.forceMap.put(numOfForces, force);
                        return force;
                        
                    },
                    LocalImpulse: function(oEntity, vContactLocal, vForceLocal){
                        var force = new CLocalImpulse(numOfForces++, oEntity, vContactLocal, vForceLocal);
                        os.physics.forces.push(force);
                        return force;
                    },
                    Spring: function(oEntity, k, length, vPt1,vPt2,oSecondEntity){
                        var force = new CSpringForce(numOfForces++, oEntity, k, length, vPt1, vPt2, oSecondEntity);
                        os.physics.forces.push(force);
                        //os.physics.forceMap.put(numOfForces, force);
                        return force;
                    },
                    Blast: function(){
                        
                    }
                },
                BV: {
                    OBB: function(oPhysicsEntity, vHalfSize, vCenter){
                        var obb  = new COBB();
                        obb.entity = oPhysicsEntity;
                        obb.halfSize = vHalfSize;
                        obb.orientation = oPhysicsEntity ? oPhysicsEntity.orientation : [0,0,0,1];
                        if(vCenter){obb.center = vCenter;}
                        else{obb.center = oPhysicsEntity.position;}
                        os.physics.bvs.push(obb);
                        return obb;
                    },
                    Sphere: function(oPhysicsEntity, fRadius, vCenter){
                        var sphere  = new CSphere();
                        sphere.entity = oPhysicsEntity;
                        sphere.halfSize = fRadius;
                        if(vCenter){sphere.center = vCenter;}
                        else{sphere.center = oPhysicsEntity.position;}
                        os.physics.bvs.push(sphere);
                        return sphere;
                    },
                    ABB: function(oPhysicsEntity, vHalfSize, vCenter){
                        
                    }
                },
                Entity: function(invMass){
                    var ent = new CPhysicsEntity(numOfEntities++, invMass);
                    os.physics.entities.put(numOfEntities, ent)
                    return ent;
                },
                InertialTensor: {
                    SphereSolid: function(obj, radius){
                        var temp = (5/(2 * radius * radius) * obj.inverseMass)
                        
                        var it = [
                            temp,   0,      0,
                            0,      temp,   0,
                            0,      0,      temp];
                        
                        return it;
                    },
                    SphereHollow: function(obj, radius){
                        var temp = (3/(2 * radius * radius) * obj.inverseMass)
                        
                        var it = [
                            temp,   0,      0,
                            0,      temp,   0,
                            0,      0,      temp];
                        
                        return it;
                    },
                    EllipsoidSolid: function(obj, dx, dy, dz){
                        var temp1 = (5/(dy*dy + dz*dz) * obj.inverseMass);
                        var temp2 = (5/(dx*dx + dz*dz) * obj.inverseMass);
                        var temp3 = (5/(dx*dx + dy*dy) * obj.inverseMass);
                        
                        var it = [
                            temp1,  0,      0,
                            0,      temp2,  0,
                            0,      0,      temp3];
                        
                        return it;
                    },
                    Cone: function(obj, radius, height){
                        var temp1 = 1/( (3/5)*height*height + (3/20)*radius*radius) * obj.inverseMass;
                        var temp2 = (10/(3*radius*radius) * obj.inverseMass);
                        
                        var it = [
                            temp1,  0,      0,
                            0,      temp1,  0,
                            0,      0,      temp2];
                        
                        return it;
                    },
                    Cube: function(obj, dx, dy, dz){
                        var temp1 = (12/(dy*dy + dz*dz) * obj.inverseMass);
                        var temp2 = (12/(dx*dx + dz*dz) * obj.inverseMass);
                        var temp3 = (12/(dx*dx + dy*dy) * obj.inverseMass);
                        
                        var it = [
                            temp1,  0,      0,
                            0,      temp2,  0,
                            0,      0,      temp3];
                        
                        return it;
                    },
                    CylinderSolid: function(obj, radius, height){
                        var temp1 = 1/(12 * (3 * radius * radius + height * height)) * obj.inverseMass;
                        var temp2 = (2/(radius*radius) * obj.inverseMass);
                        
                        var it = [
                            temp1,  0,      0,
                            0,      temp1,  0,
                            0,      0,      temp2];
                        
                        return it;
                    },
                    CylinderHollow: function(obj, innerRadius, outerRadius, height){
                        var temp1 = 1/(12 * (3 * (innerRadius*innerRadius + outerRadius*outerRadius) + height * height)) * obj.inverseMass;
                        var temp2 = (2/((innerRadius*innerRadius + outerRadius*outerRadius)) * obj.inverseMass);
                        
                        var it = [
                            temp1,  0,      0,
                            0,      temp1,  0,
                            0,      0,      temp2];
                        
                        return it;
                    }
                }
            },
            Delete: {
                Force: function(){
                
                },
                Entity: function(){
                    
                }
            },        
            Register: {
                Force: function(){
                
                },
                Entity: function(){
                    
                }
            },
            Update: {
                All: function(dt){
                    os.physics.Update.Accumulators();
                    os.physics.Update.Forces(dt);
                    os.physics.Update.Entities(dt);
                },
                Accumulators: function(){
                    //Clear all Force/Torque Accumulators in Entities
                    for(var i = 0; i < os.physics.entities.size; i++){
                        (os.physics.entities.value()).Clear();
                        os.physics.entities.next();
                    }
                },
                Forces: function(dt){
                    
                    //Update all forces in regsitry
                    for(var i = os.physics.forces.length - 1; i >= 0 ; i--){
                        
                        if(os.physics.forces[i].Update(dt) < 0){
                            //Remove element if duration has gone to -1
                            os.physics.forces.splice(i,1);
                        }
                    }
                },
                Entities: function(dt){
                    //Update Physcis Entities Position/Rotations
                    for(var i = 0; i < os.physics.entities.size; i++){
                        (os.physics.entities.value()).Update(dt);
                        os.physics.entities.next();
                    }
                }
            },
            Contacts: {
                Generate: function(){
                    var collision = false;
                    for(var i = os.physics.bvs.length - 1; i >= 0; i--){
                        for(var j = i - 1; j >= 0; j--){
                            if(os.physics.bvs[i].CollisionTest(os.physics.bvs[j])){
                                //create Collision Object
                            }
                        }
                    }
                },
                Resolve: function(){
                    
                }
            },
            //PUBLIC PRIVILEDGE METHODS
            
            GetName: function(){
                return NAME;
            },
            
            GetVersion: function(){
                return VERSION;
            },
            
            GetPath: function(){
                return PATH;
            },
           
            GetID: function(){
                return ID;
            },
            
            Initialize: function(){
                os.physics.entities = os.resschmgr.Create.Map();
                //os.physics.bvs = os.resschmgr.Create.Map();
                os.physics.forceMap = os.resschmgr.Create.Map();
                vec3.create(os.physics.gravity);
            }
            
        }
    }
    
    return {
        //OBJECT ACCESSOR
        Instance: function()
        {
            if(!pInstance)
            {
                //Instantiate if pInstance does not exist
                pInstance = constructor();
            }
            
            return pInstance;
        }
    }
})();
