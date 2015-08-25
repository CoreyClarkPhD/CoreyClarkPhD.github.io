
//g++ main.cpp postprocess.cpp -o test 

#include <iostream>
#include <ctime>
#include "./postprocess.h"

int main(void){
	PostProcess pp;

	pp.width = 400;
	pp.height = 300;
	
	std::cout << "Initializing Post Process" << std::endl;
	pp.Init();

	//Setup
	std::cout << "Setting Techinques" << std::endl;
	//Set Default Techniques

	pp.setGray(true);
	pp.setBlur(true);
	pp.setLoG(true);
	pp.setStep(true);
	pp.setInvert(true);
	pp.setMultiply(true);
	pp.setCel(true);
	pp.setPostGray(true);

	std::cout << "Setting Default Convolution Settings" << std::endl;
	//Set default convolution values
	pp.setScale(2);
	pp.setThreshold(254);
	pp.setOffset(0);

	std::cout << "Fill image buffer with data" << std::endl;
	//Fill buffer
	for(int i = 0; i < pp.length; i++){
		pp.image[i] = 128;
	}

	std::cout << "Run Test" << std::endl;
	//Run test
	std::clock_t start;
	double duration;
	pp.Update();
	start = std::clock();
	
	duration = ( std::clock() - start) / (double) CLOCKS_PER_SEC;

	std::cout << "Complete: Duration: "<< duration * 1000 << "ms, " << pp.width << ", " << pp.height << ", " << pp.pixels << std::endl;

	return 0;
}