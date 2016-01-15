attribute vec3 aVertexPosition;     //Vertex Position

uniform mat4 uWMatrix;    //World
uniform mat4 uVMatrix;    //View
uniform mat4 uPMatrix;    //Projection

uniform vec3 uLight;      //Location of Point Light


void main(void) {
    
    //Place Vertex Position in World Coordinates
    vec3 Pi = vec4(uWMatrix * vec4(aVertexPosition, 1.0) ).xyz;
    
    //Get Ray cast from light to vert
    vec3 V  = normalize( Pi - uLight);
    
    //Terrain Normal
    vec3 N  = vec3(0.0, 1.0, 0.0);
    
    //Point on terrain
    vec3 Po = vec3(0.0, 0.0, 0.0);
    
    //Calculate Scale of Light ray    
    float t = dot(N,(Po - Pi)) / dot(N,V);
    
    //Calculate new point for vert on terrain
    vec3 P = Pi + t*V;

    //Calculates Final Position of Vert
    gl_Position =  uPMatrix * uVMatrix * vec4(P, 1.0);

}