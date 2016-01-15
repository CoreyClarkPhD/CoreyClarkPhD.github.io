attribute vec3 aVertexPosition;     //Vertex Position
attribute vec3 aVertexNormal;       //Vertex Normal
attribute vec2 aTextureCoord;       //Texture Coordinate
//attribute float aInstance;          //Instance ID

uniform mat4 uWMatrix;              //World
uniform mat4 uVMatrix;              //View
uniform mat4 uPMatrix;              //Projection
uniform mat3 uNMatrix;              //Normal Transform Matrix
uniform mat4 uVIMatrix;              //View Inverse
uniform vec3 uInstancePosition[1];  //Array Holding Positions for each Instanced Object
uniform vec4 uInstanceColor[1];     //Array Holding Colors for each Instanced Object
uniform bool uUseInstacing;         //Enable Insacing
varying vec2 vTextureCoord;         //Output Texture Coordinate
varying vec3 vTransformedNormal;    //Normal Transformed to Clip Space
varying vec4 vPosition;             //Ouput Vert Position in View Space
varying vec3 vPositionW;            //Vert Position in World Space
varying vec4 vColor;                //Particle blend color
//varying float vInstanceID;          //Object ID

void main(void) {
    vec4 posH;
    
    // View Space Position, used in Lighting Calculations in fragment shader
    vPosition = uVMatrix * uWMatrix * vec4(aVertexPosition, 1.0);

    //World Position of Vert
    vPositionW = vec4( uWMatrix * vec4(aVertexPosition, 1.0) ).xyz;
    
    //Output Texture Coord to Fragment Shader
    vTextureCoord = aTextureCoord;
    
    //Output Normal Trnasformed into View Space to Fragment Shader
    //      For Lighting Calculations
    vTransformedNormal = uNMatrix * aVertexNormal;
    
    
    if(!uUseInstacing){
        //Calculates Final Position of Vert
        posH = uPMatrix * uVMatrix * uWMatrix * vec4(aVertexPosition, 1.0);
        //World = uWMatrix;
        vColor = vec4(1.0, 1.0, 1.0, 1.0);
        
    }
    else{
    
        //float offsetX = uInstancePosition[int(aInstance)].x;//-500.0 + (3.0 * mod( float(aInstance), 300.0));
        //float offsetY = uInstancePosition[int(aInstance)].y;//200.0 - (3.0 * floor(float(aInstance)/300.0));
        //float offsetZ = uInstancePosition[int(aInstance)].z;//300.0;
        
        
        //vec4 color = uInstanceColor[int(aInstance)];
        //vColor = color;
        
        //mat4 WMatrix = mat4( uVIMatrix[0][0], uVIMatrix[0][1], uVIMatrix[0][2], uVIMatrix[0][3],
        //                     uVIMatrix[1][0], uVIMatrix[1][1], uVIMatrix[1][2], uVIMatrix[1][3],
        //                     uVIMatrix[2][0], uVIMatrix[2][1], uVIMatrix[2][2], uVIMatrix[2][3],
        //                    offsetX, offsetY, offsetZ, uVIMatrix[3][3] );
        //uVIMatrix[3][0] = offsetX;
        //uVIMatrix[3] = offsetY;
        //uVIMatrix[14] = offsetZ;
        //posH = uPMatrix * uVMatrix * WMatrix * vec4(aVertexPosition, 1.0);
        
        //Sets Instance ID;
        //vInstanceID = aInstance;
        
    }
    
    gl_Position = posH; 

}