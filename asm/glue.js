
// Bindings utilities

function WrapperObject() {
}
WrapperObject.prototype = Object.create(WrapperObject.prototype);
WrapperObject.prototype.constructor = WrapperObject;
WrapperObject.prototype.__class__ = WrapperObject;
WrapperObject.__cache__ = {};
Module['WrapperObject'] = WrapperObject;

function getCache(__class__) {
  return (__class__ || WrapperObject).__cache__;
}
Module['getCache'] = getCache;

function wrapPointer(ptr, __class__) {
  var cache = getCache(__class__);
  var ret = cache[ptr];
  if (ret) return ret;
  ret = Object.create((__class__ || WrapperObject).prototype);
  ret.ptr = ptr;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  delete getCache(obj.__class__)[obj.ptr];
}
Module['destroy'] = destroy;

function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

// Converts a value into a C-style string.
function ensureString(value) {
  if (typeof value == 'string') return allocate(intArrayFromString(value), 'i8', ALLOC_STACK);
  return value;
}


// VoidPtr
function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

  VoidPtr.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
}
// PostProcess
function PostProcess() {
  this.ptr = _emscripten_bind_PostProcess_PostProcess_0();
  getCache(PostProcess)[this.ptr] = this;
};
PostProcess.prototype = Object.create(WrapperObject.prototype);
PostProcess.prototype.constructor = PostProcess;
PostProcess.prototype.__class__ = PostProcess;
PostProcess.__cache__ = {};
Module['PostProcess'] = PostProcess;

PostProcess.prototype['Init'] = function() {
  var self = this.ptr;
  _emscripten_bind_PostProcess_Init_0(self);
};

PostProcess.prototype['Update'] = function() {
  var self = this.ptr;
  _emscripten_bind_PostProcess_Update_0(self);
};

PostProcess.prototype['setGray'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setGray_1(self, arg0);
};

PostProcess.prototype['setBlur'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setBlur_1(self, arg0);
};

PostProcess.prototype['setLoG'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setLoG_1(self, arg0);
};

PostProcess.prototype['setStep'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setStep_1(self, arg0);
};

PostProcess.prototype['setInvert'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setInvert_1(self, arg0);
};

PostProcess.prototype['setMultiply'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setMultiply_1(self, arg0);
};

PostProcess.prototype['setCel'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setCel_1(self, arg0);
};

PostProcess.prototype['setPostGray'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setPostGray_1(self, arg0);
};

PostProcess.prototype['setOffset'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setOffset_1(self, arg0);
};

PostProcess.prototype['setScale'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setScale_1(self, arg0);
};

PostProcess.prototype['setThreshold'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setThreshold_1(self, arg0);
};

PostProcess.prototype['setWidth'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setWidth_1(self, arg0);
};

PostProcess.prototype['setHeight'] = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_setHeight_1(self, arg0);
};

PostProcess.prototype['getDataOutPtr'] = function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_getDataOutPtr_0(self);
};

PostProcess.prototype['getImagePtr'] = function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_getImagePtr_0(self);
};

PostProcess.prototype['getCurrentPtr'] = function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_getCurrentPtr_0(self);
};

  PostProcess.prototype['get_gray']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_gray_0(self);
}
    PostProcess.prototype['set_gray']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_gray_1(self, arg0);
}
  PostProcess.prototype['get_blur']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_blur_0(self);
}
    PostProcess.prototype['set_blur']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_blur_1(self, arg0);
}
  PostProcess.prototype['get_log']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_log_0(self);
}
    PostProcess.prototype['set_log']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_log_1(self, arg0);
}
  PostProcess.prototype['get_step']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_step_0(self);
}
    PostProcess.prototype['set_step']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_step_1(self, arg0);
}
  PostProcess.prototype['get_invert']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_invert_0(self);
}
    PostProcess.prototype['set_invert']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_invert_1(self, arg0);
}
  PostProcess.prototype['get_multiply']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_multiply_0(self);
}
    PostProcess.prototype['set_multiply']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_multiply_1(self, arg0);
}
  PostProcess.prototype['get_cel']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_cel_0(self);
}
    PostProcess.prototype['set_cel']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_cel_1(self, arg0);
}
  PostProcess.prototype['get_postGray']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_postGray_0(self);
}
    PostProcess.prototype['set_postGray']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_postGray_1(self, arg0);
}
  PostProcess.prototype['get_offset']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_offset_0(self);
}
    PostProcess.prototype['set_offset']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_offset_1(self, arg0);
}
  PostProcess.prototype['get_scale']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_scale_0(self);
}
    PostProcess.prototype['set_scale']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_scale_1(self, arg0);
}
  PostProcess.prototype['get_threshold']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_threshold_0(self);
}
    PostProcess.prototype['set_threshold']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_threshold_1(self, arg0);
}
  PostProcess.prototype['get_width']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_width_0(self);
}
    PostProcess.prototype['set_width']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_width_1(self, arg0);
}
  PostProcess.prototype['get_height']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_height_0(self);
}
    PostProcess.prototype['set_height']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_height_1(self, arg0);
}
  PostProcess.prototype['get_pixels']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_pixels_0(self);
}
    PostProcess.prototype['set_pixels']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_pixels_1(self, arg0);
}
  PostProcess.prototype['get_length']= function() {
  var self = this.ptr;
  return _emscripten_bind_PostProcess_get_length_0(self);
}
    PostProcess.prototype['set_length']= function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_PostProcess_set_length_1(self, arg0);
}
  PostProcess.prototype['__destroy__'] = function() {
  var self = this.ptr;
  _emscripten_bind_PostProcess___destroy___0(self);
}
