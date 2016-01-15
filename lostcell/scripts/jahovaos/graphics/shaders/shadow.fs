#ifdef GL_ES
precision highp float;
#endif

void main(void){
    //Output Black for shadow
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}