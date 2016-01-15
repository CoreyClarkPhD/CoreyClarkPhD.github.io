//Adds a bind method to Function object, that will ensure
//  scope of the "this" parameter is set appropriately
Function.prototype.bind = function(scope)
{
    var _function = this;
    
    return function() {
      return _function.apply(scope, arguments);
    }
}
var CCommand = function(){
    this.msgID;
    this.msgType;
    this.data;
    this.priority;
    this.sendTime;
    this.deliveryTime;
    this.osThreadID;
    this.cntrlThreadID;
    this.callbackCoreID;
    this.callbackFunctionID;
    this.event;
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


var CThread = function(){
    this.ID = ThreadController.NextID++;
    this.currentTask = null;
    this.type = null;
    this.osID = null;
    this.name = null;
    this.priority = null;
    this.pooled = null;
    this.maxPooledThreads = null;
    this.suspendCount = null;
    this.status = null;
    this.pWorker = null;
    this.filename = null;
    this.task = null;
    this.pooledThreads = null;
    this.port = null;
    
    this.ProcessTask = function(e){
    
        var msg = new CCommand();
        
        var response = new CTask();
        response.Parse(e.data);
        
        msg.msgID = response.msgID;
        msg.osThreadID = this.osID;//response.threadID;
        
        var thread = this; //ThreadController.Threads.get(response.threadID);

        if(thread)
        {
            
            //Handle Current Task Response
            if((response.taskType == "GetSharedMemory") || (response.taskType == "GetSharedMemoryEntry") ){
                 
                
                if(response.taskType == "GetSharedMemory"){
                    var out = new CTask();
                    out.taskType = "EXECUTE";
                    out.data = {};
                    out.data.type = "GetSharedMemory";
                    out.data.data = ThreadController.Memory.listValues();
                    out.threadID = this.ID;
                    out.msgID = response.msgID;
                    this.SendTask(out.Serialize());
                }
                else{
                    var out = new CTask();
                    out.taskType = "GetSharedMemoryEntry";
                    out.data = ThreadController.Memory.get(response.data);
                    out.threadID = this.ID;
                    out.msgID = response.msgID;
                    this.SendTask(out.Serialize());
                }
            }
            else if((response.taskType == "SetSharedMemory") || (response.taskType == "SetSharedMemoryEntry") ){
                if(response.taskType == "SetSharedMemoryEntry"){
                    ThreadController.Memory.put(response.data.key, response.data.value);
                }
                else{
                    for(var i = response.data.length - 1; i >= 0 ; i--){
                        ThreadController.Memory.put(response.data[i].key, response.data[i].value);
                    }
                }
            }
            else{ //Pass back to OS
                
                msg.data = response.data;
                
                ThreadController.SendToManager(msg.Serialize());
            }
            
            if(this.task.length > 0){      //Test to See if other task are pending
                    //Get Next Task
                    var nextArray = this.task.splice(0,1);
                    var next = nextArray[0];
                    
                    //Set Current Task
                    this.currentTask = next;
                    
                    //Send Next Task
                    this.SendTask(next.Serialize());
            }
            
            else{//No pending Task
                //Change Thread Status
                this.status = "IDLE";
            }
            
        }
        else{
            msg.data = {};
            msg.data.msg = "Error: Thread Not Found in Controller Thread Map";
            msg.data.cntrl = "Thread Map Size: " + ThreadController.Threads.size;
            msg.data.keys = ThreadController.Threads.listKeys();
            msg.data.values = ThreadController.Threads.listValues();
            msg.data.task = response;
            
            ThreadController.SendToManager(msg.Serialize());
        }
    }.bind(this);
}
CThread.prototype.SendTask = function(JSONtask){
    
    //this.status = "BUSY";
    this.pWorker.postMessage(JSONtask);
};
CThread.prototype.SetFunction = function(){
    
};
CThread.prototype.AddTask = function(cmd){
        
        var thread = this;
        var msg =  new CCommand();
        
        /*
            If Thread is IDLE & SUSEPEND COUNT <= 0send task
            ELSE   Add task to Task Array
        */
        
        //Test to see if Thread is currently being suspended and is IDLE
        if( (thread.suspendCount <= 0) && (thread.status == "IDLE"))
        {
            
                
                msg.data = "Thread Controller: Thread IDLE and Not Suspended, Request Sent";
                ThreadController.SendToManager(msg.Serialize());
                
                //Set Status to Busy
                thread.status = "BUSY";
                
                //Create new task object
                thread.currentTask.msgID = cmd.msgID;
                thread.currentTask.threadID = thread.ID;
                thread.currentTask.data = cmd.data;
                thread.currentTask.taskType = "EXECUTE";
                thread.currentTask.timeSent = (new Date()).getTime();
                
                //Send Task
                thread.SendTask(thread.currentTask.Serialize());
           
        }
        else // Thred is currently BUSY or suspended or by another process
        {
            //Create task object and push to Task Queue
            var tsk = new CTask();
            tsk.msgID = cmd.msgID;
            tsk.threadID = thread.ID;
            tsk.data = cmd.data;
            tsk.taskType = "EXECUTE";
            tsk.timeSent = (new Date()).getTime();
            thread.task.push(tsk);
            msg.data = "Thread Controller: Request Queued\nThread Suspend Count: " + thread.suspendCount + "\nStatus: "+ thread.status;
            ThreadController.SendToManager(msg.Serialize()); 
             
        }
        
};
CThread.prototype.Execute = function(cmd){
    var thread = this;
    var msg =  new CCommand();
    
    //Test to see if Thread is currently being suspended
    if(thread.suspendCount <= 0)
    {
        //Test to see if Thread is IDLE and ready for task
        if(thread.status == "IDLE")
        {
            
            //msg.data = "Thread Controller: Thread IDLE, Request Sent";
            //ThreadController.SendToManager(msg.Serialize());
            
            //Set Status to Busy
            //thread.status = "BUSY";
            
            //Create new task object
            thread.currentTask.msgID = cmd.msgID;
            thread.currentTask.threadID = thread.ID;
            thread.currentTask.data = cmd.data;
            thread.currentTask.taskType = "EXECUTE";
            thread.currentTask.timeSent = (new Date()).getTime();
            
            //Send Task
            thread.SendTask(thread.currentTask.Serialize());
        }
        else // Thread is busy working on a task
        {
            msg.data = "Thread Controller: Thread BUSY, Request Ignored";
            ThreadController.SendToManager(msg.Serialize());  
        }
    }
    else // Thred is currently suspended by another process
    {
        msg.data = "Thread Controller: Thread SUSPENDED (Count: " + thread.suspendCount + "), Request Ignored";
        ThreadController.SendToManager(msg.Serialize());  
    }
};
CThread.prototype.CreatePooledThread = function(){
    
};
CThread.prototype.GetStatus = function(cmd){
    var thread = this;
    
    cmd.data = {};
    cmd.data.ID = thread.ID;
    cmd.data.currentTask = thread.currentTask;
    cmd.data.type = thread.type;
    cmd.data.osID = thread.osID;
    cmd.data.name = thread.name;
    cmd.data.priority = thread.priority;
    cmd.data.pooled = thread.pooled;
    cmd.data.maxPooledThreads = thread.maxPooledThreads;
    cmd.data.suspendCount = thread.suspendCount;
    cmd.data.status = thread.status;
    cmd.data.filename = thread.filename;
    cmd.data.task = thread.task;
    cmd.data.pooledThreads = thread.pooledThreads;
    
    ThreadController.SendToManager(cmd.Serialize());
};
CThread.prototype.SendPendingTask = function(){
    var msg = new CCommand();
        
    var thread = this;
    
    //Test to See if other task are pending
    if(this.task.length > 0 && thread.status == "IDLE")
    {
        //Handle Current Task Response
        
        //
        //  MUST ADD HANDLEING OF THE TASK RESPONSE
        //
        
        //Get Next Task
        var nextArray = this.task.splice(0,1);
        var next = nextArray[0];
        
        //Set Current Task
        this.currentTask = next;
        
        //Send Next Task
        this.SendTask(next.Serialize());
        
        msg.msgType = "Pending Task"
        msg.data = "Sending Pending Task:\nTask ID: " + next.taskID + "\nTask Type: " + next.taskType + "\nTask Data: " + next.data;
        ThreadController.SendToManager(msg.Serialize());
    }
     
    
};



var CTask = function(){
    this.msgID = null;
    this.taskID = ThreadController.NextTaskID++;
    this.threadID;
    this.taskType = null;
    this.data = {};
    this.timeSent = null;
    
};
CTask.prototype.Serialize = function(){
    return JSON.stringify(this);
};

CTask.prototype.Parse = function(input){
    var temp = JSON.parse(input);
    
    this.msgID      = temp.msgID;
    this.taskID     = temp.taskID;
    this.threadID    = temp.threadID;
    this.taskType   = temp.taskType;
    this.data       = temp.data;
    this.timeSent   = temp.timeSent;
};

var CStatus = function(){
    this.name;
    this.id;
    this.osid;
    this.priority
    this.pool;
    this.suspendCount;
    this.status;
    this.filename;
    this.task;
    this.pooledThreads; 
};

CStatus.prototype.Serialize = function(){
    return JSON.stringify(this);
};

CStatus.prototype.Parse = function(jsonInput){
    var input = JSON.parse(jsonInput);
    
    this.name           = input.name;
    this.id             = input.id;
    this.osid           = input.osid;
    this.priority       = input.priority;
    this.pooled         = input.pooled;
    this.suspendCount   = input.suspendCount;
    this.status         = input.status;
    this.filename       = input.filename;
    this.task           = input.task;
    this.pooledThreads  = input.pooledThreads;

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
var ThreadController = {
    AvailableThreads: [],
    PendingThreads: [], //Threads requested by Core, but waiting for connect of iFrame
    ThreadCount: 0,
    NestedWorkers: false,
    MaxThreadCount: 10,
    Memory: null,
    NextID: 0,
    NextTaskID: 0,
    OSPort: null,
    Threads: null,
    OS2CNTRL: null,
    Running: false,
    CommandFunctions: null,
    Socket: null, //Just for demo of websocket in thread
    Initialize: function(){
        if(!ThreadController.Running)
        {
            var msg = new CCommand();
            msg.data = "ONLINE";
            msg.osThreadID = -1;
            self.addEventListener('connect',ThreadController.OnConnect , false);
            
            
            //Create Thread Map
            ThreadController.Threads = new CMap();
            ThreadController.OS2CNTRL =  new CMap();
            ThreadController.Memory = new CMap();
            
            //Create Command Function Map
            ThreadController.CommandFunctions = new CMap();
            
            //Load Command Functions into Map
            ThreadController.CommandFunctions.put("CREATETHREAD", ThreadController.CreateThread);
            ThreadController.CommandFunctions.put("EXITTHREAD", ThreadController.ExitThread);
            ThreadController.CommandFunctions.put("EXECUTETHREAD", ThreadController.ExecuteThread);
            ThreadController.CommandFunctions.put("GETTHREADSTATUS", ThreadController.GetThreadStatus);
            ThreadController.CommandFunctions.put("GETACTIVETHREADS", ThreadController.GetActiveThreads);
            ThreadController.CommandFunctions.put("SETMAXTHREADCOUNT", ThreadController.SetMaxThreadCount);
            ThreadController.CommandFunctions.put("ADDTASK", ThreadController.AddTask);
            ThreadController.CommandFunctions.put("SUSPENDTHREAD", ThreadController.SuspendThread);
            ThreadController.CommandFunctions.put("RESUMETHREAD", ThreadController.ResumeThread);
            ThreadController.CommandFunctions.put("SETPRIORITY", ThreadController.SetPriority);
            ThreadController.CommandFunctions.put("GETPRIORITY", ThreadController.GetPriority);
            ThreadController.CommandFunctions.put("GETFUNCTION", ThreadController.GetFunction);
            ThreadController.CommandFunctions.put("GETPENDINGTASK", ThreadController.GetPendingTask);
            ThreadController.CommandFunctions.put("GETCURRENTTASK", ThreadController.GetCurrentTask);
            ThreadController.CommandFunctions.put("GETSUSPENDCOUNT", ThreadController.GetSuspendCount);
            ThreadController.CommandFunctions.put("GETFILENAME", ThreadController.GetFilename);
            ThreadController.CommandFunctions.put("GETSHAREDMEMORYENTRY", ThreadController.SharedMemory.Get.Entry);
            ThreadController.CommandFunctions.put("GETSHAREDMEMORY", ThreadController.SharedMemory.Get.All);
            ThreadController.CommandFunctions.put("UPDATESHAREDMEMORYENTRY", ThreadController.SharedMemory.Update.Entry);
            ThreadController.CommandFunctions.put("UPDATESHAREDMEMORY", ThreadController.SharedMemory.Update.All);
            ThreadController.CommandFunctions.put("SETSHAREDMEMORYENTRY", ThreadController.SharedMemory.Set.Entry);
            ThreadController.CommandFunctions.put("SETSHAREDMEMORY", ThreadController.SharedMemory.Set.All);
            ThreadController.CommandFunctions.put("REMOVESHAREDMEMORYENTRY", ThreadController.SharedMemory.Remove.Entry);
            ThreadController.CommandFunctions.put("REMOVESHAREDMEMORY", ThreadController.SharedMemory.Remove.All);
            ThreadController.CommandFunctions.put("CREATESOCKET", ThreadController.CreateSocket);   //Just for demo of WebSocket in Thread
            ThreadController.CommandFunctions.put("CLOSESOCKET", ThreadController.CloseSocket);     //Just for demo of WebSocket in Thread
        }
        
    },
    OnConnect: function(e){
        
        var msg = new CCommand();
        
        if(ThreadController.OSPort == null)
        {
            //Set Callback Port to Thread Manager
            ThreadController.OSPort = e.ports[0];
            
            //Set Callback for Thread Manager
            e.ports[0].onmessage = ThreadController.ProcessRequest;
            
            msg.data = "ONLINE";
            msg.osThreadID = -1;
            ThreadController.SendToManager(msg.Serialize());
        }
        else
        {
            msg.data = "New Thread Connected";
            msg.osThreadID = -1;
            //Test to see if any threads are pending
            if(ThreadController.PendingThreads.length > 0)
            {
                var thread = ThreadController.PendingThreads.pop();
                
                //Create Worker Thread
                thread.pWorker = e.ports[0];
                
                //Initializing callback
                thread.pWorker.onmessage = thread.ProcessTask;
                //thread.pWorker.addEventListener('message',thread.ProcessTask ,false);
                
                //Send Task
                thread.SendTask(thread.currentTask.Serialize());
            }
            else
            {
                //Add Thread to Avaliable List
                ThreadController.AvailableThreads.push(e.ports[0]);
            }
            
        }
        
        
        
        //*****DEBUG
        //e.ports[0].postMessage(msg.Serialize());
        //ThreadController.SendToManager(msg.Serialize());
        //*********
    },
    ProcessRequest: function(e){

        //Create Command Object
        var cmd = new CCommand();
        
        //Initialize Command Object
        cmd.Parse(e.data);
    
        
        var msgHandler = false;
        
        if(cmd.msgType)
        {
            //Get a pointer to message handler
            msgHandler = ThreadController.CommandFunctions.get(cmd.msgType.toUpperCase());
        }
        
        if(msgHandler)
        {
            msgHandler(cmd);
        }
        else if(cmd.osThreadID == -1){
            
            ThreadController.SendToManager(cmd);
        }
        else
        {
            ThreadController.SendError(cmd);
        }
 
    },
    CreateThread: function(cmd){
            //out = new CCommand();
            //out.data = "Avalible Threads: " + ThreadController.AvailableThreads.length +", New Thread Created";
            //ThreadController.SendToManager(out.Serialize());
            //
            //id, name, type, priority, pooled, maxPooledThreads, suspend, filename, data{func: , input: }
            var properties = JSON.parse(cmd.data);
            
        
            //
            //  Thread Types: STATIC:   non jahova os, accepts CTask as Inputs,
            //                DYNAMIC:  jahova os file, accepts CTask as Inputs,
            //                CUSTOM:   non jahova os, user defined input type
            //
            //  Status: IDLE:   Waiting for input
            //          BUSY:   Processing input, waiting for callback
            //          FREE:   Dynamic Thread not be utilized, ready for re tasking 
            //
            
            var thread = new CThread();
           
            thread.osID = cmd.osThreadID;
            thread.name = properties.name;
            thread.type = properties.type;
            thread.priority = properties.priority;
            thread.pooled = properties.pooled;
            thread.maxPooledThreads = properties.maxPooledThreads;
            thread.suspendCount = 0;
            thread.currentTask = new CTask();
            thread.status = "IDLE";
            
            thread.task = new Array();
            thread.pooledThreads = [];
            
            ThreadController.Threads.put(thread.ID, thread);
            ThreadController.OS2CNTRL.put(thread.osID, thread.ID);
            
        if(thread.type == "DYNAMIC")
        {

            //thread.filename = "http://10.0.1.15/~cclark/Sandbox/JaHOVA/JaHOVA/Omega/MT/scripts/Applications/Threads/jahova.os.cores.thread.swdynamic.js";
            //thread.filename = "http://omega.gametheorylabs.com/MT/scripts/Applications/Threads/jahova.os.cores.thread.swdynamic.js";
            thread.filename = "scripts/Applications/Threads/jahova.os.cores.thread.swdynamic.js";
            thread.currentTask.data.func = properties.data.func;
            thread.currentTask.msgID = cmd.msgID;
            thread.currentTask.threadID = thread.ID;
            thread.currentTask.taskType = "SetFunction";
            
            
            if(ThreadController.AvailableThreads.length > 0)
            {
                
                
                //Create Worker Thread
                thread.pWorker = ThreadController.AvailableThreads.pop();
                
                //Initializing callback
                thread.pWorker.onmessage = thread.ProcessTask;
                //thread.pWorker.addEventListener('message',thread.ProcessTask ,false);
                
                //Send Task
                thread.SendTask(thread.currentTask.Serialize());
                
                
            }
            else
            {
                ThreadController.PendingThreads.push(thread);
                //cmd.data = "Error Creating Thread: No Avaliable Threads";
                //ThreadController.SendError(cmd);
            }
            
            
        }
        else if(thread.type == "CUSTOM")
        {
        
            //Get Filename for static file
            thread.filename = properties.filename;
            if(properties.suspend == "false")
            {
                thread.currentTask = properties.data.input
                thread.currentTask.threadID = thread.ID;
                thread.status = "BUSY";
            }
            //Create Worker Thread
            thread.pWorker = new Worker(thread.filename);
        
            //Initializing callback 
            thread.pWorker.addEventListener('message',ThreadController.ProcessTask ,false);
            
            //Send Task
            thread.SendTask(thread.currentTask.currentTask);
        }
        else if(thread.type == "STATIC")
        {
            //Get filename for static file
            thread.filename = properties.filename;
            
            thread.currentTask.data = "REGISTERED";// + thread.ID;//.func = properties.data.func;
            thread.currentTask.msgID = cmd.msgID;
            thread.currentTask.threadID = thread.ID;
            thread.currentTask.taskType = "ECHO";
            
            if(ThreadController.AvailableThreads.length > 0)
            {
                
                
                //Create Worker Thread
                thread.pWorker = ThreadController.AvailableThreads.pop();
                
                //Initializing callback
                thread.pWorker.onmessage = thread.ProcessTask;
                //thread.pWorker.addEventListener('message',thread.ProcessTask ,false);
                
                
                
                
            }
            else
            {
                ThreadController.PendingThreads.push(thread);
                //cmd.data = "Error Creating Thread: No Avaliable Threads";
                //ThreadController.SendError(cmd);
            }
            
            //Create Task to send
            if(properties.suspend == "false")
            {
                
                thread.currentTask.msgID = cmd.msgID;
                thread.currentTask.threadID = thread.ID;
                thread.currentTask.data.input = properties.data.input;
                //thread.status = "BUSY";
                
                //Send Task
                thread.SendTask(thread.currentTask.Serialize());
            }
            
            
        }
        else
        {
            // Unknown Thread Type, Send Error
            ThreadController.SendError(cmd);
        }

        
        
    },
    GetActiveThreads: function(cmd){
        var threads = [];
        for(var i = ThreadController.Threads.size; i--; ThreadController.Threads.next()){
            var t = ThreadController.Threads.value();
            threads[i] = {};
            threads[i].name = t.name;
            threads[i].id = t.ID;
            threads[i].osID = t.osID;
            threads[i].stats = t.status;
            
        }
        
        var output = new CCommand();
                
        output.data = threads
        output.osThreadID = cmd.osThreadID;
        output.msgType = cmd.msgType;
        
        ThreadController.SendToManager(output.Serialize());
        
    },
    ExecuteThread: function(cmd){
        
        //Get Thread Object
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        thread.Execute(cmd);

    },
    AddTask: function(cmd){
        
        //Get Thread Object
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        thread.AddTask(cmd);
        
    },
    ExitThread: function(){
        
    },
    GetThreadStatus: function(cmd){
        
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        
        thread.GetStatus(cmd);
        
    },
    SetMaxThreadCount: function(){
        
    },
    SuspendThread: function(cmd){
        //Get Thread Object
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        
        //Increase Suspend Count
        thread.suspendCount++;
        
        //
        //  DEBUGING INFORMATION BELOW, TO BE REMOVED
        //
        
        //Save Current Count to cmd
        cmd.data = thread.suspendCount;
        
        //Send back to Manager
        ThreadController.SendToManager(cmd.Serialize());
        
        
    },
    ResumeThread: function(cmd){
        //Get Thread Object
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        
        //Decrease Suspend Count
        thread.suspendCount--;
        
        //If Count = 0, see if any pending task need to be sent
        if(thread.suspendCount == 0)
        {
            //Send any pending task to thread
            thread.SendPendingTask();
        }
        
        if(thread.suspendCount < 0)
        {
            
            cmd.data = "WARNING: Thread Count has been set negative (Count: " + thread.suspendCount +"), possible Thread syncing error";
            
            
            //Send back to Manager
            ThreadController.SendToManager(cmd.Serialize());
            
            //Send any pending task to thread
            thread.SendPendingTask();
            
            thread.suspendCount = 0;
        }
        else
        {
            //
            //  DEBUGING INFORMATION BELOW, TO BE REMOVED
            //
            
            //Save Current Count to cmd
            cmd.data = thread.suspendCount;
            
            //Send back to Manager
            ThreadController.SendToManager(cmd.Serialize());
        }
    },
    SetPriority: function(cmd){
        //Get Thread Object
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        
        //Increase Suspend Count
        thread.suspendCount++;
        
        //
        //  DEBUGING INFORMATION BELOW, TO BE REMOVED
        //
        
        //Save Current Count to cmd
        thread.priority = cmd.data;
        
        //Send back to Manager
        ThreadController.SendToManager(cmd.Serialize());        
    },
    GetPriority: function(cmd){
        //Get Thread Object
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        
        //Save Current Count to cmd
        cmd.data = thread.priority;
        
        //Send back to Manager
        ThreadController.SendToManager(cmd.Serialize());        
    },
    GetFunction: function(cmd){
        //Get Thread Object
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        
        var task = new CTask();
        
        task.msgID = cmd.msgID;
        task.taskType = "GETCURRENTFUNCTION";
        task.threadID = thread.ID;
        task.timeSent = (new Date()).getTime();
        
        thread.SendTask(task.Serialize());
    },
    GetPendingTask: function(cmd){
        //Get Thread Object
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        
        //Get Task Queue and set to data member
        cmd.data = thread.task;
        
        //Respond with Task Queue
        ThreadController.SendToManager(cmd.Serialize());
    },
    GetCurrentTask: function(cmd){
        //Get Thread Object
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        
        //Get current task and save to command data member
        cmd.data = thread.currentTask;
        
        //Respond with current Task
        ThreadController.SendToManager(cmd.Serialize());
    },
    GetSuspendCount: function(cmd){
        //Get Thread Object
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        
        //Save Current Count to cmd
        cmd.data = thread.suspendCount;
        
        //Send back to Manager
        ThreadController.SendToManager(cmd.Serialize());        
    },
    GetFilename: function(cmd){
        //Get Thread Object
        var thread = ThreadController.Threads.get(ThreadController.OS2CNTRL.get(cmd.osThreadID));
        
        //Save Current Count to cmd
        cmd.data = thread.filename;
        
        //Send back to Manager
        ThreadController.SendToManager(cmd.Serialize());           
    },
    SharedMemory: {
        Get: {
            Entry: function(cmd){
                var output = new CCommand();
                
                output.data = ThreadController.Memory.get(cmd.data);
                output.osThreadID = cmd.osThreadID;
                output.msgType = cmd.msgType;
                
                ThreadController.SendToManager(output.Serialize());
            },
            All: function(cmd){
                var output = new CCommand();
                
                output.data = ThreadController.Memory.listValues();
                output.osThreadID = cmd.osThreadID;
                output.msgType = cmd.msgType;
                
                ThreadController.SendToManager(output.Serialize());
            }
        },
        Set: {
            Entry: function(cmd){
                ThreadController.Memory.put(cmd.data.key, cmd.data.value);
                
                //var output = new CCommand();
                //output.data = {};
                //output.data.key = cmd.data.key;
                //output.data.value = cmd.data.value;
                //output.osThreadID = cmd.osThreadID;
                //output.msgType = cmd.msgType;
                //
                //ThreadController.SendToManager(output.Serialize());
                
                
            },
            All: function(cmd){
                for(var i = 0; i < cmd.data.length; i++){
                    ThreadController.Memory.put(cmd.data[i].key, cmd.data[i].value);
                }
            }
        },
        Update: {
            Entry: function(cmd){
                var val = ThreadController.Memory.get(cmd.data.key);
                val[cmd.data.property] = cmd.data.value;
            },
            All: function(cmd){
                for(var i = cmd.data.length - 1; i >= 0; i--){
                    var val = ThreadController.Memory.get(cmd.data[i].key);
                    val[cmd.data[i].property] = cmd.data[i].value;
                }
            }
        },
        Remove: {
            Entry: function(cmd){
                ThreadController.Memory.remove(cmd.data);
            },
            All: function(cmd){
                ThreadController.Memory.removeAll();
            }
        }
    },
    SendToManager: function(data){
        ThreadController.OSPort.postMessage(data);
        //self.postMessage(data);
    },
    SendError: function(command){
        //Create new Command Message
        var output = new CCommand()
        
        //Initialize Command Message
        output.data = command.Serialize();
        output.msgID = command.msgID;
        output.msgType = "Error";
        output.osThreadID = -1;
        
        //Send Message To Manager
        this.SendToManager(output.Serialize());
    },
    CreateSocket: function(){
        
        ThreadController.Socket = new WebSocket("ws://demo.jahovaos.com:8080");
       
        ThreadController.Socket.onopen = function()
        {
            var cmd = new CCommand()
            cmd.data = "Socket Opened";
            ThreadController.SendToManager(cmd.Serialize());
          
        }
  
        ThreadController.Socket.onmessage = function(msg){
          
            var cmd = new CCommand()
            cmd.data = "Socket Message: " + msg.data;
            ThreadController.SendToManager(cmd.Serialize());
        }
        
        ThreadController.Socket.onclose = function(){
            var cmd = new CCommand()
            cmd.data = "Socket Closed";
            ThreadController.SendToManager(cmd.Serialize());
        }
      
    },
    CloseSocket: function(){
        ThreadController.Socket.close();
    }

};

ThreadController.Initialize();