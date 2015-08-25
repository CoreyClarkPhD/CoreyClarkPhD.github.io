#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wc++11-extensions" //Ignoring Warning for C11 Inclass definition


class PostProcess {
private:



public:
	//Canvas Properties
	int width;	//number of pixels wide
	int height; //number of pixes high
	int pixels;	//number of pixels
	int length;	//Length of image data array
	
	void setWidth(int);
	void setHeight(int);

	//Convolution Settings
	int offset;
	float scale;
	unsigned char threshold;

	void setOffset(int);
	void setScale(float);
	void setThreshold(int);

	//Options
	bool gray;
	bool blur;
	bool log;
	bool step;
	bool invert;
	bool multiply;
	bool cel;
	bool postGray;

	void setGray(bool);
	void setBlur(bool);
	void setLoG(bool);
	void setStep(bool);
	void setInvert(bool);
	void setMultiply(bool);
	void setCel(bool);
	void setPostGray(bool);

	//Initalize
	void Init(void);

	//Techniques
	void  Convolve(unsigned char * data, int w, int h, bool normalize, float scale, float  *filter, int filterLength, int offset);


	void Convolve(unsigned char * data, int w, int h, bool normalize, int scale, unsigned char * filter, int filterLength, int offset);
	void Convolve(float * data, int w, int h, bool normalize, float scale, float * filter, int filterLength, int offset);
	void Convolve(unsigned int * data, int w, int h, bool normalize, float scale, float * filter, int filterLength, int offset);

	void Step(unsigned char * image, unsigned char threshold);
	void GrayScale(unsigned char * image);
	void Cel(unsigned char * image);
	void Invert(unsigned char * image);
	void Multiply(unsigned char * image, unsigned char * dataOut);

	//Upadte image
	void Update(void);

	//Data Arrays
	unsigned char * dataOut;
	unsigned char * image;
	unsigned char * current;

	float * dataOutf;
	float * imagef;
	float * currentf;

	unsigned int * imageui;

	//Data Array Getters
	// int getDataIn(void);
	// int getImage(void);
	// int getCurrent(void);
	void * getDataOutPtr(void);
	void * getImagePtr(void);
	void * getCurrentPtr(void);

	//Filters
	float BlurLinear3x3[9];

	float BlurGauss5x5[25] ={  1.0, 4.0,  7.0,  4.0,  1.0,
		                       4.0, 16.0, 26.0, 16.0, 4.0,
		                       7.0, 26.0, 41.0, 26.0, 7.0,
		                       4.0, 16.0, 26.0, 16.0, 4.0,
		                       1.0, 4.0,  7.0,  4.0,  1.0};

	float BlurGauss7x7[49] = { 0.00000067,	0.00002292,	0.00019117,	0.00038771,	0.00019117,	0.00002292,	0.00000067,
		                       0.00002292,	0.00078634,	0.00655965,	0.01330373,	0.00655965,	0.00078633,	0.00002292,
		                       0.00019117,	0.00655965,	0.05472157,	0.11098164,	0.05472157,	0.00655965,	0.00019117,
		                       0.00038771,	0.01330373,	0.11098164,	0.22508352,	0.11098164,	0.01330373,	0.00038771,
		                       0.00019117,	0.00655965,	0.05472157,	0.11098164,	0.05472157,	0.00655965,	0.00019117,
		                       0.00002292,	0.00078633,	0.00655965,	0.01330373,	0.00655965,	0.00078633,	0.00002292,
		                       0.00000067,	0.00002292,	0.00019117,	0.00038771,	0.00019117,	0.00002292,	0.00000067};

	unsigned char BlurGauss7x7i[49] = { 1,1,1,1,1,1,1,
										2,2,2,2,2,2,2,
										3,3,3,3,3,3,3,
										4,4,4,4,4,4,4,
										5,5,5,5,5,5,5,
										6,6,6,6,6,6,6,
										7,7,7,7,7,7,7};	                       

	float EdgeLaplacian3x3_4[9] = {	 0,  1,  0,
		                             1, -4,  1,
		                             0,  1,  0};

	float EdgeLaplacian3x3_8[9] = {	 1,  1,  1,
		                             1, -8,  1,
		                             1,  1,  1};

	float LoG9x9[81] = {  0,  1,  1,  2,  2,  2,  1,  1,  0,
			              1,  2,  4,  5,  5,  5,  4,  2,  1,
			              1,  4,  5,  3,  0,  3,  5,  4,  1,
			              2,  5,  3,-12,-24,-12,  3,  5,  2,
			              2,  5,  0,-24,-40,-24,  0,  5,  2,
			              2,  5,  3,-12,-24,-12,  3,  5,  2,
			              1,  4,  5,  3,  0,  3,  5,  4,  1,
			              1,  2,  4,  5,  5,  5,  4,  2,  1,
			              0,  1,  1,  2,  2,  2,  1,  1,  0};

unsigned char LoG9x9i[81] = {  0,  1,  1,  2,  2,  2,  1,  1,  0,
				              1,  2,  4,  5,  5,  5,  4,  2,  1,
				              1,  4,  5,  3,  0,  3,  5,  4,  1,
				              2,  5,  3,12,24,12,  3,  5,  2,
				              2,  5,  0,24,40,24,  0,  5,  2,
				              2,  5,  3,12,24,12,  3,  5,  2,
				              1,  4,  5,  3,  0,  3,  5,  4,  1,
				              1,  2,  4,  5,  5,  5,  4,  2,  1,
				              0,  1,  1,  2,  2,  2,  1,  1,  0};		              

	float Emboss3x3[9] = {	-2.0, -1.0, 0.0,
		                    -1.0,  1.0, 1.0,
		                     0.0,  1.0, 2.0};

	float Sharpen3x3[9] = {  0.0, -1.0,  0.0,
	                 	    -1.0,  5.0, -1.0,
	                         0.0, -1.0,  0.0};

	float Step3x3[9] = {     0.0,  0.0,    0.0,
		                     0.0,  255.0,  0.0,
		                     0.0,  0.0,    0.0};


	PostProcess();

};


#pragma clang diagnostic pop