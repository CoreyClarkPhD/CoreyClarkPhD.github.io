precision mediump float;

varying vec3 vVertexNormal;
varying vec3 vVertexPosition;

uniform samplerCube uSampler;
//uniform sampler2D uSampler;         //Texture being applied to Model
void main(){
    gl_FragColor = textureCube(uSampler, vVertexPosition);

}
