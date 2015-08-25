
#include <emscripten.h>

extern "C" {

// Not using size_t for array indices as the values used by the javascript code are signed.
void array_bounds_check(const int array_size, const int array_idx) {
  if (array_idx < 0 || array_idx >= array_size) {
    EM_ASM_INT({
      throw 'Array index ' + $0 + ' out of bounds: [0,' + $1 + ')';
    }, array_idx, array_size);
  }
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

// PostProcess

PostProcess* EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_PostProcess_0() {
  return new PostProcess();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_Init_0(PostProcess* self) {
  self->Init();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_Update_0(PostProcess* self) {
  self->Update();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setGray_1(PostProcess* self, bool arg0) {
  self->setGray(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setBlur_1(PostProcess* self, bool arg0) {
  self->setBlur(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setLoG_1(PostProcess* self, bool arg0) {
  self->setLoG(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setStep_1(PostProcess* self, bool arg0) {
  self->setStep(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setInvert_1(PostProcess* self, bool arg0) {
  self->setInvert(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setMultiply_1(PostProcess* self, bool arg0) {
  self->setMultiply(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setCel_1(PostProcess* self, bool arg0) {
  self->setCel(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setPostGray_1(PostProcess* self, bool arg0) {
  self->setPostGray(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setOffset_1(PostProcess* self, int arg0) {
  self->setOffset(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setScale_1(PostProcess* self, float arg0) {
  self->setScale(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setThreshold_1(PostProcess* self, char arg0) {
  self->setThreshold(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setWidth_1(PostProcess* self, int arg0) {
  self->setWidth(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_setHeight_1(PostProcess* self, int arg0) {
  self->setHeight(arg0);
}

void* EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_getDataOutPtr_0(PostProcess* self) {
  return self->getDataOutPtr();
}

void* EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_getImagePtr_0(PostProcess* self) {
  return self->getImagePtr();
}

void* EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_getCurrentPtr_0(PostProcess* self) {
  return self->getCurrentPtr();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_gray_0(PostProcess* self) {
  return self->gray;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_gray_1(PostProcess* self, bool arg0) {
  self->gray = arg0;
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_blur_0(PostProcess* self) {
  return self->blur;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_blur_1(PostProcess* self, bool arg0) {
  self->blur = arg0;
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_log_0(PostProcess* self) {
  return self->log;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_log_1(PostProcess* self, bool arg0) {
  self->log = arg0;
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_step_0(PostProcess* self) {
  return self->step;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_step_1(PostProcess* self, bool arg0) {
  self->step = arg0;
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_invert_0(PostProcess* self) {
  return self->invert;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_invert_1(PostProcess* self, bool arg0) {
  self->invert = arg0;
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_multiply_0(PostProcess* self) {
  return self->multiply;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_multiply_1(PostProcess* self, bool arg0) {
  self->multiply = arg0;
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_cel_0(PostProcess* self) {
  return self->cel;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_cel_1(PostProcess* self, bool arg0) {
  self->cel = arg0;
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_postGray_0(PostProcess* self) {
  return self->postGray;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_postGray_1(PostProcess* self, bool arg0) {
  self->postGray = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_offset_0(PostProcess* self) {
  return self->offset;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_offset_1(PostProcess* self, int arg0) {
  self->offset = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_scale_0(PostProcess* self) {
  return self->scale;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_scale_1(PostProcess* self, float arg0) {
  self->scale = arg0;
}

char EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_threshold_0(PostProcess* self) {
  return self->threshold;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_threshold_1(PostProcess* self, char arg0) {
  self->threshold = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_width_0(PostProcess* self) {
  return self->width;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_width_1(PostProcess* self, int arg0) {
  self->width = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_height_0(PostProcess* self) {
  return self->height;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_height_1(PostProcess* self, int arg0) {
  self->height = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_pixels_0(PostProcess* self) {
  return self->pixels;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_pixels_1(PostProcess* self, int arg0) {
  self->pixels = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_get_length_0(PostProcess* self) {
  return self->length;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess_set_length_1(PostProcess* self, int arg0) {
  self->length = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PostProcess___destroy___0(PostProcess* self) {
  delete self;
}

}

