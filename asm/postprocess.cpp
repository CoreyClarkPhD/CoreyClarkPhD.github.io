#include <iostream>
#include "postprocess.h"
#include <stdlib.h>  //abs
#include <math.h>	 //sqrt
#include <algorithm> //min max

//http://stackoverflow.com/questions/429632/how-to-speed-up-floating-point-to-integer-number-conversion
// inline int float2int( double d )
// {
//    union Cast
//    {
//       double d;
//       long l;
//     };
//    volatile Cast c;
//    c.d = d + 6755399441055744.0;
//    return c.l;
// }

// this is the same thing but it's
// not always optimizer safe
inline int float2int( double d )
{
   d += 6755399441055744.0;
   return reinterpret_cast<int&>(d);
}

//Initalize
void PostProcess::Init(void){
	pixels = width * height;
	length = pixels * 4;

	dataOut =  new unsigned char[length];
	image  =  new unsigned char[length];
	current = new unsigned char[length];

	dataOutf =  new float[length];
	imagef  =  new float[length];
	currentf = new float[length];

	imageui = new unsigned int[length];

	for(int i = 0; i < length; i++){
		dataOutf[i] = 1.0;
		imagef[i] = 1.0;
		currentf[i] = 1.0;

		imageui[i] = 5;
	}
};

//Techniques
void PostProcess::Convolve(unsigned char * data, int w, int h, bool normalize, float scale, float  *filter, int filterLength, int offset){
	//Type testing

	memset(dataOut,0,length);
	

	int filterDim = (int)sqrt((float)filterLength);
	int filterOffset = (filterDim - 1) / 2;

	int row = 0;
	int col = 0;

	int rowStart = 0;
	int rowEnd   = width - 1;

	float mag = 1.0;
	if(normalize == true){
		mag = 0.0;
		for(int i = 0; i < filterLength; i++){
			mag += abs(filter[i]);
		}
		// mag = 1.0/mag;
		// for(int i = 0; i < filterLength; i++){
		// 	filter[i] = mag * filter[i];
		// }
	}



	int dif = offset;

	//Loop Through Pixels
	for(int pix = 0; pix < pixels; pix++){

		//Update Row/Col
		if((pix % width) == 0){
			row++;
			col = 0;
			rowStart = pix;
			rowEnd   = rowStart + width - 1;
		}
		else{
			col++;
		}

		//Test if filter window in completely on image
		if ( ((pix - filterOffset) >= rowStart ) &&
			 ((pix + filterOffset) <= (rowEnd))  &&
			 ((pix - (filterOffset * width)) >= 0) &&
			 ((pix + (filterOffset * width)) <= (pixels)) ){

			float r = 0.0;
			float g = 0.0;
			float b = 0.0;

			// unsigned int r = 0;
			// unsigned int g = 0;
			// unsigned int b = 0;

			int index = 0;

			//Loop Through each row of filter
			for(int i = filterOffset; i >= -1*filterOffset; i--){
				int centerPixel = pix + (i * width);
				int filterStartPixel = centerPixel - filterOffset;
				int filterEndPixel   = centerPixel + filterOffset;

				//Get Filter Values for row
				for(int j = filterStartPixel; j <= filterEndPixel; j++){
					 r += (float)((float)(filter[index] / mag) * (float)(data[j * 4 + 0]));
					 g += (float)((float)(filter[index] / mag) * (float)(data[j * 4 + 1]));
					 b += (float)((float)(filter[index] / mag) * (float)(data[j * 4 + 2]));

					 // r += (float)((data[j * 4 + 0]));
					 // g += (float)((data[j * 4 + 1]));
					 // b += (float)((data[j * 4 + 2]));

					 // r += (float)((filter[index]));
					 // g += (float)((filter[index]));
					 // b += (float)((filter[index]));

					// r += 1.0;
					// g += 2.0;
					// b += 3.0;

					index++;
				}
			}
			r = scale * r + dif;
			g = scale * g + dif;
			b = scale * b + dif;

			// unsigned char ru = pix;
			// unsigned char gu = pix;
			// unsigned char bu = pix;

			// dataOut[pix * 4 + 0] = ru ;
   //          dataOut[pix * 4 + 1] = gu ;
   //          dataOut[pix * 4 + 2] = bu ;
   //          dataOut[pix * 4 + 3] = 255;


			 // dataOut[pix * 4 + 0] = r < 0.0 ? 0 : (r > 255.0 ? 255 : float2int(r));
    //          dataOut[pix * 4 + 1] = g < 0.0 ? 0 : (g > 255.0 ? 255 : float2int(g));
    //          dataOut[pix * 4 + 2] = b < 0.0 ? 0 : (b > 255.0 ? 255 : float2int(b));
    //          dataOut[pix * 4 + 3] = 255;

			if(r < 0.0){dataOut[pix * 4 + 0] = 0;}
			else if( r > 255.0){dataOut[pix * 4 + 0] = 255;}
			else{
				dataOut[pix * 4 + 0] = (unsigned char) r;
			}

			if(g < 0.0){dataOut[pix * 4 + 1] = 0;}
			else if( g > 255.0){dataOut[pix * 4 + 1] = 255;}
			else{
				dataOut[pix * 4 + 1] = (unsigned char) g;
			}

			if(b < 0.0){dataOut[pix * 4 + 2] = 0;}
			else if( b > 255.0){dataOut[pix * 4 + 2] = 255;}
			else{
				dataOut[pix * 4 + 2] = (unsigned char) b;
			}

			 // dataOut[pix * 4 + 0] = r < 0.0 ? 0 : (r > 255.0 ? 255 : (r));
    //          dataOut[pix * 4 + 1] = g < 0.0 ? 0 : (g > 255.0 ? 255 : (g));
    //          dataOut[pix * 4 + 2] = b < 0.0 ? 0 : (b > 255.0 ? 255 : (b));
             dataOut[pix * 4 + 3] = 255;

             // dataOut[pix * 4 + 0] = float2int(r);
             // dataOut[pix * 4 + 1] = float2int(g);
             // dataOut[pix * 4 + 2] = float2int(b);
             // dataOut[pix * 4 + 3] = 255;

			 // dataOut[pix * 4 + 0] = (r);
    //          dataOut[pix * 4 + 1] = (g);
    //          dataOut[pix * 4 + 2] = (b);
    //          dataOut[pix * 4 + 3] = 255;


            // data[pix * 4 + 0] = (unsigned char)r ;
            // data[pix * 4 + 1] = (unsigned char)g ;
            // data[pix * 4 + 2] = (unsigned char)b ;
            // data[pix * 4 + 3] = 255;



			// dataOut[pix * 4 + 0] = (unsigned char)(std::min(std::max((int)(scale * r + dif), 0), 255));
   //          dataOut[pix * 4 + 1] = (unsigned char)(std::min(std::max((int)(scale * g + dif), 0), 255));
   //          dataOut[pix * 4 + 2] = (unsigned char)(std::min(std::max((int)(scale * b + dif), 0), 255));
   //          dataOut[pix * 4 + 3] = 255;

		}
		else{
			//Not in window, make pixel invisible
			dataOut[pix * 4 + 3] = 0;
		}
	}

	memcpy(data, dataOut, length);
	//data = dataOut;
	//delete[] dataOut;
	 //delete[] data;
	 // data = dataOut;
	//return dataOut;
};






// //scale is int
// void PostProcess::Convolve(unsigned char * data, int w, int h, bool normalize, int scale, unsigned char  * filter, int filterLength, int offset){

// 	int filterDim = (int)sqrt((float)filterLength);
// 	int filterOffset = (filterDim - 1) / 2;

// 	int row = 0;
// 	int col = 0;

// 	int rowStart = 0;
// 	int rowEnd   = width - 1;

// 	int mag = 1;

// 	if(normalize == true){
// 		mag = 0;
// 		for(int i = 0; i < filterLength; i++){
// 			mag += abs(filter[i]);
// 		}
// 	}

// 	int dif = offset;

// 	//Loop Through Pixels
// 	for(int pix = 0; pix < pixels; pix++){

// 		//Update Row/Col
// 		if((pix % width) == 0){
// 			row++;
// 			col = 0;
// 			rowStart = pix;
// 			rowEnd   = rowStart + width - 1;
// 		}
// 		else{
// 			col++;
// 		}

// 		//Test if filter window in completely on image
// 		if ( ((pix - filterOffset) >= rowStart ) &&
// 			 ((pix + filterOffset) <= (rowEnd))  &&
// 			 ((pix - (filterOffset * width)) >= 0) &&
// 			 ((pix + (filterOffset * width)) <= (pixels)) ){

// 			// float r = 0.0;
// 			// float g = 0.0;
// 			// float b = 0.0;

// 			int r = 0;
// 			int g = 0;
// 			int b = 0;

// 			int index = 0;

// 			//Loop Through each row of filter
// 			for(int i = filterOffset; i >= -1*filterOffset; i--){
// 				int centerPixel = pix + (i * width);
// 				int filterStartPixel = centerPixel - filterOffset;
// 				int filterEndPixel   = centerPixel + filterOffset;

// 				//Get Filter Values for row
// 				for(int j = filterStartPixel; j <= filterEndPixel; j++){
// 					r += (filter[index] / mag) * (data[j * 4 + 0]);
// 					g += (filter[index] / mag) * (data[j * 4 + 1]);
// 					b += (filter[index] / mag) * (data[j * 4 + 2]);

// 					index++;
// 				}
// 			}

// 			data[pix * 4 + 0] = (unsigned char)(std::min(std::max((int)(scale * r + dif), 0), 255));
//             data[pix * 4 + 1] = (unsigned char)(std::min(std::max((int)(scale * g + dif), 0), 255));
//             data[pix * 4 + 2] = (unsigned char)(std::min(std::max((int)(scale * b + dif), 0), 255));
//             data[pix * 4 + 3] = 255;

// 		}
// 		else{
// 			//Not in window, make pixel invisible
// 			data[pix * 4 + 3] = 0;
// 		}
// 	}
// };
// //unsigned int for image data
// void PostProcess::Convolve(unsigned int * data, int w, int h, bool normalize, float scale, float * filter, int filterLength, int offset){
// 	//Type testing

// 	//unsigned int* temp = new unsigned int[length];
// 	//

// 	int filterDim = (int)sqrt((float)filterLength);
// 	int filterOffset = (filterDim - 1) / 2;

// 	int row = 0;
// 	int col = 0;

// 	int rowStart = 0;
// 	int rowEnd   = width - 1;

// 	int mag = 1;

// 	if(normalize == true){
// 		mag = 0;
// 		for(int i = 0; i < filterLength; i++){
// 			mag += abs(filter[i]);
// 		}
// 		mag = 1/mag;
// 		for(int i = 0; i < filterLength; i++){
// 			filter[i] *= mag;
// 		}
// 	}

// 	int dif = offset;

// 	//Loop Through Pixels
// 	for(int pix = 0; pix < pixels; pix++){

// 		//Update Row/Col
// 		if((pix % width) == 0){
// 			row++;
// 			col = 0;
// 			rowStart = pix;
// 			rowEnd   = rowStart + width - 1;
// 		}
// 		else{
// 			col++;
// 		}

// 		//Test if filter window in completely on image
// 		if ( ((pix - filterOffset) >= rowStart ) &&
// 			 ((pix + filterOffset) <= (rowEnd))  &&
// 			 ((pix - (filterOffset * width)) >= 0) &&
// 			 ((pix + (filterOffset * width)) <= (pixels)) ){

// 			// float r = 0.0;
// 			// float g = 0.0;
// 			// float b = 0.0;

// 			 int r = 0;
// 			 int g = 0;
// 			 int b = 0;

// 			int index = 0;

// 			//Loop Through each row of filter
// 			for(int i = filterOffset; i >= -1*filterOffset; i--){
// 				int centerPixel = pix + (i * width);
// 				int filterStartPixel = centerPixel - filterOffset;
// 				int filterEndPixel   = centerPixel + filterOffset;

// 				//Get Filter Values for row
// 				for(int j = filterStartPixel; j <= filterEndPixel; j++){
// 					r += ((filter[index]) * (data[j * 4 + 0]));
// 					g += ((filter[index]) * (data[j * 4 + 1]));
// 					b += ((filter[index]) * (data[j * 4 + 2]));

// 					// r = ((data[j * 4 + 0]));
// 					// g = ((data[j * 4 + 1]));
// 					// b = ((data[j * 4 + 2]));

// 					index++;
// 				}
// 			}
// 			r = ( int)(scale * r + dif);
// 			g = ( int)(scale * g + dif);
// 			b = ( int)(scale * b + dif);

// 			r = r < 0 ? 0 : (r > 255 ? 255 : (r));
//             g = g < 0 ? 0 : (g > 255 ? 255 : (g));
//             b = b < 0 ? 0 : (b > 255 ? 255 : (b));

// 			// data[pix * 4 + 0] = r < 0.0 ? 0 : (r > 255.0 ? 255 : (r));
//    //          data[pix * 4 + 1] = g < 0.0 ? 0 : (g > 255.0 ? 255 : (g));
//    //          data[pix * 4 + 2] = b < 0.0 ? 0 : (b > 255.0 ? 255 : (b));
//    //          data[pix * 4 + 3] = 255;
// 			// unsigned char ru = r;
// 			// unsigned char gu = g;
// 			// unsigned char bu = b;

//             // data[pix * 4 + 0] = (unsigned char)r ;
//             // data[pix * 4 + 1] = (unsigned char)g ;
//             // data[pix * 4 + 2] = (unsigned char)b ;
//             // data[pix * 4 + 3] = 255;

//             dataOut[pix * 4 + 0] = (unsigned int)r ;
//             dataOut[pix * 4 + 1] = (unsigned  int)g ;
//             dataOut[pix * 4 + 2] = (unsigned  int)b ;
//             dataOut[pix * 4 + 3] = 255;

// 			// data[pix * 4 + 0] = (unsigned char)(std::min(std::max((int)(scale * r + dif), 0), 255));
//    //          data[pix * 4 + 1] = (unsigned char)(std::min(std::max((int)(scale * g + dif), 0), 255));
//    //          data[pix * 4 + 2] = (unsigned char)(std::min(std::max((int)(scale * b + dif), 0), 255));
//    //          data[pix * 4 + 3] = 255;

// 		}
// 		else{
// 			//Not in window, make pixel invisible
// 			dataOut[pix * 4 + 3] = 0;
// 		}
// 	}
// 	//memcpy(data, dataOut, length);
// 	// delete data;
// 	// data = temp;
// };
// //float for image data
// void PostProcess::Convolve(float * data, int w, int h, bool normalize, float scale, float * filter, int filterLength, int offset){

// 	int filterDim = (int)sqrt((float)filterLength);
// 	int filterOffset = (filterDim - 1) / 2;

// 	float temp[length];

// 	int row = 0;
// 	int col = 0;

// 	int rowStart = 0;
// 	int rowEnd   = width - 1;

// 	float mag = 1.0f;

// 	if(normalize == true){
// 		mag = 0;
// 		for(int i = 0; i < filterLength; i++){
// 			mag += abs(filter[i]);
// 		}
// 	}

// 	float dif = (float)offset;

// 	//Loop Through Pixels
// 	for(int pix = 0; pix < pixels; pix++){

// 		//Update Row/Col
// 		if((pix % width) == 0){
// 			row++;
// 			col = 0;
// 			rowStart = pix;
// 			rowEnd   = rowStart + width - 1;
// 		}
// 		else{
// 			col++;
// 		}

// 		//Test if filter window in completely on image
// 		if ( ((pix - filterOffset) >= rowStart ) &&
// 			 ((pix + filterOffset) <= (rowEnd))  &&
// 			 ((pix - (filterOffset * width)) >= 0) &&
// 			 ((pix + (filterOffset * width)) <= (pixels)) ){

// 			float r = 0.0;
// 			float g = 0.0;
// 			float b = 0.0;

// 			// int r = 0;
// 			// int g = 0;
// 			// int b = 0;

// 			int index = 0;

// 			//Loop Through each row of filter
// 			for(int i = filterOffset; i >= -1*filterOffset; i--){
// 				int centerPixel = pix + (i * width);
// 				int filterStartPixel = centerPixel - filterOffset;
// 				int filterEndPixel   = centerPixel + filterOffset;

// 				//Get Filter Values for row
// 				for(int j = filterStartPixel; j <= filterEndPixel; j++){
// 					// r += (float)((float)filter[index] / (float)mag) * (float)(data[j * 4 + 0]);
// 					// g += (float)((float)filter[index] / (float)mag) * (float)(data[j * 4 + 1]);
// 					// b += (float)((float)filter[index] / (float)mag) * (float)(data[j * 4 + 2]);

// 					r += (float)((float)filter[index] / (float)mag);
// 					g += (float)((float)filter[index] / (float)mag);
// 					b += (float)((float)filter[index] / (float)mag);

// 					index++;
// 				}
// 			}

// 			// data[pix * 4 + 0] = (std::min(std::max((float)(scale * r + dif), 0.0f), 255.0f));
//    //          data[pix * 4 + 1] = (std::min(std::max((float)(scale * g + dif), 0.0f), 255.0f));
//    //          data[pix * 4 + 2] = (std::min(std::max((float)(scale * b + dif), 0.0f), 255.0f));
//    //          data[pix * 4 + 3] = 255.0;
// 			temp[pix * 4 + 0] = (float)r ;
//             temp[pix * 4 + 1] = (float)g ;
//             temp[pix * 4 + 2] = (float)b ;
//             temp[pix * 4 + 3] = 255.0f;

// 		}
// 		else{
// 			//Not in window, make pixel invisible
// 			temp[pix * 4 + 3] = 0;
// 		}
// 	}

// 	memcpy(data, temp, length);
// };

void PostProcess::Step(unsigned char * image, unsigned char threshold){

	for(int i = 0; i < length; i+=4){
		int val = image[i] + image[i + 1] + image[i + 2];
		val = (val/3);

		if((unsigned char)val > threshold){
			image[i] =     255;
        	image[i + 1] = 255;
          	image[i + 2] = 255;
          	image[i + 3] = image[i + 3] > 0 ? 255 : 0;
		}
		else{
			image[i] =     0;
        	image[i + 1] = 0;
          	image[i + 2] = 0;
          	image[i + 3] = image[i + 3] > 0 ? 255 : 0;
		}
	}
};
void PostProcess::GrayScale(unsigned char * image){
	
	for(int i = 0; i < length; i+=4){
		int val = image[i] + image[i + 1] + image[i + 2];
		val = (val/3);

		image[i] =     val;
    	image[i + 1] = val;
      	image[i + 2] = val;
      	image[i + 3] = image[i + 3] > 0 ? 255 : 0;

	}
};
void PostProcess::Cel(unsigned char * image){

    for(int i = 0; i < length; i+=4){
       image[i] =     image[i]     > 213 ? 255     : (image[i]     > 171 ? 213 : (image[i]         > 129 ? 171 : (image[i]     > 87 ? 129 : (image[i]     > 45 ? 87 : 45))));
       image[i + 1] = image[i + 1] > 213 ? 255     : (image[i + 1] > 171 ? 213 : (image[i + 1]     > 129 ? 171 : (image[i + 1] > 87 ? 129 : (image[i + 1] > 45 ? 87 : 45))));
       image[i + 2] = image[i + 2] > 213 ? 255     : (image[i + 2] > 171 ? 213 : (image[i + 2]     > 129 ? 171 : (image[i + 2] > 87 ? 129 : (image[i + 2] > 45 ? 87 : 45))));
       image[i + 3] = image[i + 3] > 0 ? 255 : 0;
    }
};
void PostProcess::Invert(unsigned char * image){
	for(int i = 0; i < length; i+=4){

		image[i] =     255 - image[i + 0];
    	image[i + 1] = 255 - image[i + 1];
      	image[i + 2] = 255 - image[i + 2];
      	image[i + 3] = image[i + 3] > 0 ? 255 : 0;

	}
};
void PostProcess::Multiply(unsigned char * image, unsigned char * dataOut){
    for(int i = 0; i < length; i+=4){

    	image[i] 	 = (unsigned char)(dataOut[i + 0] * (image[i + 0] > 0 ? 1 : 0));
        image[i + 1] = (unsigned char)(dataOut[i + 1] * (image[i + 1] > 0 ? 1 : 0));
        image[i + 2] = (unsigned char)(dataOut[i + 2] * (image[i + 2] > 0 ? 1 : 0));
        image[i + 3] = image[i + 3] > 0 ? 255 : 0;
    }
};

//Upadte image
void PostProcess::Update(void){

	//Duplicate image to current
	memcpy(current, image, length);

	//Initial Gray Scale
	if(gray){
		//std::cout << "Initial Gray" << std::endl;
		GrayScale(image);
	}

	//Blur Image
	if(blur){
		//std::cout << "Blur" << std::endl;
		Convolve(image,			//Data
				 width,			//Canvas Width
				 height,		//Canvas Height
				 true,			//Normalize
				 1,				//Scale Factor
				 BlurGauss5x5,	//Filter
				 25,			//Filter Length
				 0);			//Offset Color
	}

	//Edge Detection
	if(log){
		//std::cout << "Edge" << std::endl;
		Convolve(image,			//Data
				 width,			//Canvas Width
				 height,		//Canvas Height
				 false,			//Normalize
				 scale,			//Scale Factor
				 EdgeLaplacian3x3_8,		//Filter
				 9,			//Filter Length
				 offset);		//Offset Color	
	}

	if(step){
		//std::cout << "Step" << std::endl;
		Step(image, threshold);
	}

	if(invert){
		//std::cout << "Invert" << std::endl;
		Invert(image);
	}

	if(multiply){
		//std::cout << "Multiply" << std::endl;
		Multiply(image, current);
	}

	if(cel){
		//std::cout << "Cel" << std::endl;
		Cel(image);
	}

	if(postGray){
		//std::cout << "Post Gray" << std::endl;
		GrayScale(image);
	}
};


void * PostProcess::getDataOutPtr(void){return dataOut;};
void * PostProcess::getImagePtr(void){return image;};
void * PostProcess::getCurrentPtr(void){return current;};


void PostProcess::setWidth(int val){width = val;};
void PostProcess::setHeight(int val){height = val;};
void PostProcess::setOffset(int val){offset = val;};
void PostProcess::setScale(float val){scale = val;};
void PostProcess::setThreshold(int val){threshold = val;};
void PostProcess::setGray(bool val){gray = val;};
void PostProcess::setBlur(bool val){blur = val;};
void PostProcess::setLoG(bool val){log = val;};
void PostProcess::setStep(bool val){step = val;};
void PostProcess::setInvert(bool val){invert = val;};
void PostProcess::setMultiply(bool val){multiply = val;};
void PostProcess::setCel(bool val){cel = val;};
void PostProcess::setPostGray(bool val){postGray = val;};

PostProcess::PostProcess(void){
	delete dataOut;
	delete image;
	delete current;
}

///Users/cclark/Sites/Sandbox/JaHOVA/JaHOVA/GTL_Git/emscripten/emcc postprocess.cpp -o output.js


