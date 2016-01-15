attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uWMatrix;              //World
uniform mat4 uVMatrix;              //View
uniform mat4 uPMatrix;              //Projection
uniform mat3 uNMatrix;              //Normal Transform Matrix

varying vec3 vVertexNormal;
varying vec3 vVertexPosition;

void main(){
    gl_Position = uPMatrix * uVMatrix * uWMatrix * vec4(aVertexPosition, 1.0);
    vVertexPosition = aVertexPosition;
    vVertexNormal = aVertexNormal;
}
