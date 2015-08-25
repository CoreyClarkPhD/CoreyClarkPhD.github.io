//Build  glue.js and glue.cpp
//  python /Users/cclark/Sites/Sandbox/JaHOVA/JaHOVA/GTL_Git/emscripten/tools/webidl_binder.py classes.idl glue

//Build output
// /Users/cclark/Sites/Sandbox/JaHOVA/JaHOVA/GTL_Git/emscripten/emcc postprocess.cpp wrapper.cpp --post-js glue.js -o asmModule.js -O2
// /Users/cclark/Sites/Sandbox/JaHOVA/JaHOVA/GTL_Git/emscripten/emcc postprocess.cpp wrapper.cpp --post-js glue.js -o asmModule.js -O2 -s ALLOW_MEMORY_GROWTH=1


//Nice Settings:
//  Scale: 4, Offset: 4, Thresh: 29 
//  Gray:0, Blur: 1, LoG: 1, Step: 1, Invert, 1, Multi: 0, Cel: 0, Gray: 0
//
//

//  Add timer output for perf



var Process ={
    interval: 5000,
    width: 400,
    height: 300,
    offset: null,
    scale: null,
    threshold: null,
    time: null,
    previousTime: 0,
    totalTime: 0,
    frames: 0,
    Options: {
            gray: false,
            blur: false,
            log: false,
            step: false,
            invert: false,
            multiply: false,
            cel: false,
            postGray: false,
            offset: null,
            scale: null,
            threshold: null
    },
    ASM:{
      module: null,
      image: null,
      dataIn: null,
      current: null,
      length: null,
      Start: function(){
        if(navigator.getUserMedia){
                navigator.getUserMedia({audio: false, video: true}, function(stream){
                    Process.Video.stream = stream;
                    Process.Video.element.src = window.URL.createObjectURL(Process.Video.stream);
                    Process.previousTime = Date.now();
                    Process.Update.Method();
                },
                Process.Events.onError);
            }
      }
    },
    Init: function(){
        Process.Load.HTML();
        Process.Load.Canvas();
        Process.Load.WebCam();
        Process.Load.Video();
        Process.Load.ASM();
        Process.Load.InitialConditions();
        
        //Start It Up        
        //Process.Update.Method = Process.Update.JS;
        Process.Update.Method = Process.Update.ASM;
        
        Process.Video.Start();

    },
    Load: {
        InitialConditions: function(){
          Process.Options.scale = 4.0;
          Process.Options.offset = 4;
          Process.Options.threshold = 29;

          //Set Default Techniques
          //  Gray:0, Blur: 1, LoG: 1 Step: 1, Invert, 1, Multi: 1, Cel: 1, Gray: 0
          //Create Local variable pointer
          var mod = Process.ASM.module;
          mod.setGray(false);
          mod.setBlur(true);
          mod.setLoG(true);
          mod.setStep(true);
          mod.setInvert(true);
          mod.setMultiply(false);
          mod.setCel(false);
          mod.setPostGray(false);

          //Set default convolution values
          mod.setScale(Process.Options.scale);
          mod.setThreshold(Process.Options.threshold);
          mod.setOffset(Process.Options.offset);


          Process.Options.blur = true;
          Process.Options.log = true;
          Process.Options.step = true;
          Process.Options.invert = true;
          Process.Options.multiply = false;
          Process.Options.cel = false;

          var html = "Gray, Blur, LoG, Step, Invert, Mult, Cel, Gray<br/>";
            html += "Scale: " + Process.Options.scale + "<br/>";
            html +=  "Offset: " + Process.Options.offset + "<br/>";
            html +=  "Threshold: " + Process.Options.threshold
            Process.output.innerHTML = html;

            Process.scale.value = "4";
          

        },
        ASM: function(){
          //Create Module Instance
          Process.ASM.module = new Module.PostProcess();
          
          //Create Local variable pointer
          var mod = Process.ASM.module;

          //Add Cavnas Width and Height
          mod.setWidth(Process.width);
          mod.setHeight(Process.height);

          //Initalize variables and create data buffers
          mod.Init();

          //Get Buffer Pointers
          Process.ASM.image =   mod.getImagePtr();
          Process.ASM.dataIn =  mod.getDataOutPtr();
          Process.ASM.current = mod.getCurrentPtr();

          

          

          //Length of data arrays
          Process.ASM.length = Process.width * Process.height * 4;
        },
        Canvas: function(){
            Process.Canvas.el = document.createElement('canvas');
            Process.Canvas.el.id = 'canvas';
            Process.Canvas.el.width = Process.width;
            Process.Canvas.el.height = Process.height;
            document.body.appendChild(Process.Canvas.el);
            
            Process.Canvas.ctx = Process.Canvas.el.getContext('2d');
            
            Process.Canvas.dataIn  = new Uint8Array(Process.width * Process.height * 4);
            Process.Canvas.current  = new Uint8Array(Process.width * Process.height * 4);
        },
        Video: function(){
            Process.Video.element = document.createElement('video');
            Process.Video.element.width = Process.width;
            Process.Video.element.height = Process.height;
            Process.Video.element.autoplay = true;
            Process.Video.element.style.position = 'absolute';
            document.body.appendChild((Process.Video.element));
        },
        WebCam: function(){
            navigator.getUserMedia =    navigator.getUserMedia ||
                                        navigator.webkitGetUserMedia ||
                                        navigator.mozGetUserMedia ||
                                        navigator.msGetUserMedia ||
                                        null;
            Process.Video.stream = null;
        },
        HTML: function(){
          Process.scale = document.createElement('input');
          Process.scale.type = 'range';
          Process.scale.max = 4;
          Process.scale.min = 0;
          Process.scale.value = 4;
          Process.scale.step = 0.01;
          document.body.appendChild(Process.scale);

          Process.offset = document.createElement('input');
          Process.offset.type = 'range';
          Process.offset.max = 255;
          Process.offset.min = -255;
          Process.offset.value = 4;
          Process.offset.step = 1;
          document.body.appendChild((Process.offset));

          Process.threshold = document.createElement('input');
          Process.threshold.type = 'range';
          Process.threshold.max = 255;
          Process.threshold.min = 0;
          Process.threshold.value = 29;
          Process.threshold.step = 1;
          document.body.appendChild(Process.threshold);

          Process.gray = document.createElement(('input'));
          Process.gray.type = 'checkbox';
          document.body.appendChild(Process.gray);
          Process.gray.onclick = function(){
            Process.Options.gray = Process.gray.checked;
            Process.ASM.module.setGray(Process.gray.checked);
          }

          Process.blur = document.createElement(('input'));
          Process.blur.type = 'checkbox';
          Process.blur.checked = true;
          document.body.appendChild(Process.blur);
          Process.blur.onclick = function(){
            Process.Options.blur = Process.blur.checked;
            Process.ASM.module.setBlur(Process.blur.checked);
          }

          Process.log = document.createElement(('input'));
          Process.log.type = 'checkbox';
          Process.log.checked = true;
          document.body.appendChild(Process.log);
          Process.log.onclick = function(){
            Process.Options.log = Process.log.checked;
            Process.ASM.module.setLoG(Process.log.checked);
          }

          Process.step = document.createElement(('input'));
          Process.step.type = 'checkbox';
          Process.step.checked = true;
          document.body.appendChild(Process.step);
          Process.step.onclick = function(){
            Process.Options.step = Process.step.checked;
            Process.ASM.module.setStep(Process.step.checked);
          }

          Process.invert = document.createElement(('input'));
          Process.invert.type = 'checkbox';
          Process.invert.checked = true;
          document.body.appendChild(Process.invert);
          Process.invert.onclick = function(){
            Process.Options.invert = Process.invert.checked;
            Process.ASM.module.setInvert(Process.invert.checked);
          }

          Process.multiply = document.createElement(('input'));
          Process.multiply.type = 'checkbox';
          Process.multiply.checked = false;
          document.body.appendChild(Process.multiply);
          Process.multiply.onclick = function(){
            Process.Options.multiply = Process.multiply.checked;
            Process.ASM.module.setMultiply(Process.multiply.checked);
          }
          
          Process.cel = document.createElement(('input'));
          Process.cel.type = 'checkbox';
          Process.cel.checked = false;
          document.body.appendChild(Process.cel);
          Process.cel.onclick = function(){
            Process.Options.cel = Process.cel.checked;
            Process.ASM.module.setCel(Process.cel.checked);
          }

          Process.postGray = document.createElement(('input'));
          Process.postGray.type = 'checkbox';
          document.body.appendChild(Process.postGray);
          Process.postGray.onclick = function(){
            Process.Options.postGray = Process.postGray.checked;
            Process.ASM.module.setPostGray(Process.postGray.checked);
          }

          Process.method = document.createElement(('select'));
          var asm = document.createElement('option');
          asm.text = 'ASMjs';
          asm.value = 'ASM';

          var js = document.createElement('option');
          js.text = "JS";
          js.value = "JS";

          Process.method.options.add(asm);
          Process.method.options.add(js);

          document.body.appendChild((Process.method));
          Process.method.addEventListener('change', function(){
            Process.Update.Method =  Process.Update[Process.method.value];
          });


          

          Process.output = document.createElement('div');
          document.body.appendChild(Process.output);
          
          


          var updateOutput = function(){
            Process.Options.scale = Number(Process.scale.value);
            Process.Options.offset = Number(Process.offset.value);
            Process.Options.threshold = Number(Process.threshold.value);

            Process.ASM.module.set_threshold(Number(Process.threshold.value));
            Process.ASM.module.set_scale(Number(Process.scale.value));
            Process.ASM.module.set_offset(Number(Process.offset.value));

            var html = "Gray, Blur, LoG, Step, Invert, Mult, Cel, Gray<br/>";
            html += "Scale: " + Process.scale.value + "<br/>";
            html +=  "Offset: " + Process.offset.value + "<br/>";
            html +=  "Threshold: " + Process.threshold.value
            Process.output.innerHTML = html;
          }

          Process.scale.onchange = updateOutput;
          Process.offset.onchange = updateOutput;
          Process.threshold.onchange = updateOutput;

          Process.time = document.createElement('div');
          document.body.appendChild(Process.time);
          
        }
    },
    Video: {
      stream: null,
      element: null,
      Start: function(){
          if(navigator.getUserMedia){
                navigator.getUserMedia({audio: false, video: true}, function(stream){
                    Process.Video.stream = stream;
                    Process.Video.element.src = window.URL.createObjectURL(Process.Video.stream);
                    Process.previousTime = Date.now();
                    Process.Update.Method();
                },
                Process.Events.onError);
            }
      },
      Stop: function(){
            Process.Video.stream.stop();
            Process.Video.element.pause();
      },
      Toggle: function(){
            if(Process.Video.element.paused){
                Process.Video.element.play();
            }
            else{
                Process.Video.element.pause();
            }
      }
    },
    Canvas: {
        el: null,
        ctx: null,
        dataOut: null,
        image: null,
        current: null
    },
    Filters: {
        BlurLinear3x3:  new Float32Array([0.111, 0.111, 0.111,
                                          0.111, 0.111, 0.111,
                                          0.111, 0.111, 0.111]),
        BlurGauss5x5:   new Float32Array([1.0, 4.0,  7.0,  4.0,  1.0,
                                          4.0, 16.0, 26.0, 16.0, 4.0,
                                          7.0, 26.0, 41.0, 26.0, 7.0,
                                          4.0, 16.0, 26.0, 16.0, 4.0,
                                          1.0, 4.0,  7.0,  4.0,  1.0]),
        BlurGauss7x7:  new Float32Array([0.00000067,	0.00002292,	0.00019117,	0.00038771,	0.00019117,	0.00002292,	0.00000067,
                                         0.00002292,	0.00078634,	0.00655965,	0.01330373,	0.00655965,	0.00078633,	0.00002292,
                                         0.00019117,	0.00655965,	0.05472157,	0.11098164,	0.05472157,	0.00655965,	0.00019117,
                                         0.00038771,	0.01330373,	0.11098164,	0.22508352,	0.11098164,	0.01330373,	0.00038771,
                                         0.00019117,	0.00655965,	0.05472157,	0.11098164,	0.05472157,	0.00655965,	0.00019117,
                                         0.00002292,	0.00078633,	0.00655965,	0.01330373,	0.00655965,	0.00078633,	0.00002292,
                                         0.00000067,	0.00002292,	0.00019117,	0.00038771,	0.00019117,	0.00002292,	0.00000067]),
        EdgeLaplacian3x3_4: new Float32Array([0,  1,  0,
                                              1, -4,  1,
                                              0,  1,  0]),
        // EdgeLaplacian3x3_4: new Float32Array([0/4,  1/4,  0/4,
        //                                       1/4, -4/4,  1/4,
        //                                       0/4,  1/4,  0/4]),
        EdgeLaplacian3x3_8: new Float32Array([1,  1,  1,
                                              1, -8,  1,
                                              1,  1,  1]),
        // EdgeLaplacian3x3_8: new Float32Array([1/8,  1/8,  1/8,
        //                                       1/8,  -8/8, 1/8,
        //                                       1/8,  1/8,  1/8]),
        LoG: new Int32Array([0,  1,  1,  2,  2,  2,  1,  1,  0,
                             1,  2,  4,  5,  5,  5,  4,  2,  1,
                             1,  4,  5,  3,  0,  3,  5,  4,  1,
                             2,  5,  3,-12,-24,-12,  3,  5,  2,
                             2,  5,  0,-24,-40,-24,  0,  5,  2,
                             2,  5,  3,-12,-24,-12,  3,  5,  2,
                             1,  4,  5,  3,  0,  3,  5,  4,  1,
                             1,  2,  4,  5,  5,  5,  4,  2,  1,
                             0,  1,  1,  2,  2,  2,  1,  1,  0]),
        Emobss3x3:          new Float32Array([-2.0, -1.0, 0.0,
                                              -1.0,  1.0, 1.0,
                                               0.0,  1.0, 2.0]),
        Sharpen:   new Float32Array([0.0, -1.0,  0.0,
                                    -1.0,  5.0, -1.0,
                                     0.0, -1.0,  0.0]),
        Step:     new Float32Array( [0.0,  0.0,    0.0,
                                     0.0,  255.0,  0.0,
                                     0.0,  0.0,    0.0])
    },
    Techinques: {
        Convolve: function(data, w, h, normalize, scale, filter, filterLength, offset){

          var pixels = w * h;
          var filterDim = Math.sqrt(filterLength);
          var filterOffset = (filterDim - 1) / 2;

          var width = w|0;
          var height = h|0;

          var row = 0;
          var col = 0;

          var rowStart = 0;
          var rowEnd   = width - 1;

          var mag = 1.0;
          
          if(normalize == true){
            mag = 0.0;
            for(var i = 0; i < filterLength; i++){
              mag += Math.abs(filter[i]);
            }
          }
          var dif = 0;
          if(offset){dif = offset}

          //Loop through Pixels
          for(var pix = 0; pix < pixels; pix++){
            
            //Update Row/Col
            if(pix % width == 0){
              row++;
              col = 0;
              rowStart = pix;
              rowEnd   =  rowStart + width - 1;
            }
            else{
              col++;
            }
            
            //Test if filter window is completely on image
            if( ((pix - filterOffset) >= rowStart  ) &&
                ((pix + filterOffset) <= (rowEnd)  ) &&
                ((pix - (filterOffset * width)) >= 0 ) &&
                ((pix + (filterOffset * width)) <= (pixels)) ){

                var r = 0;
                var g = 0;
                var b = 0;

                var index = 0;
                //Loop through each row of filter
                for(var i = filterOffset; i >= -filterOffset; i--){
                  
                  var centerPixel = pix + (i * width);
                  var filterStartPixel = centerPixel - filterOffset;
                  var filterEndPixel   = centerPixel + filterOffset;
                  
                  //Get Filter Values for row
                  for(var j = filterStartPixel; j <= filterEndPixel; j++){
                    
                    r += (filter[index] / mag) * (Process.Canvas.current[j * 4 + 0] );
                    g += (filter[index] / mag) * (Process.Canvas.current[j * 4 + 1]);
                    b += (filter[index] / mag) * (Process.Canvas.current[j * 4 + 2]);

                    index++;
                  }
                }
              

              //Save the convolution data to pixel
              //Clamp final color between [0,255]
              data[pix * 4 + 0] = Math.min(Math.max((scale * r + dif)|0, 0), 255);
              data[pix * 4 + 1] = Math.min(Math.max((scale * g + dif)|0, 0), 255);
              data[pix * 4 + 2] = Math.min(Math.max((scale * b + dif)|0, 0), 255);

              // data[pix * 4 + 0] = r > 255 ? (255)|0  :(r < 0 ? 0 : r|0);
              // data[pix * 4 + 1] = g > 255 ? (255)|0  :(g < 0 ? 0 : g|0);
              // data[pix * 4 + 2] = b > 255 ? (255)|0  :(b < 0 ? 0 : b|0);

            }
            else{ // Filter is not completely on image
              // data[pix * 4 + 0] = 255;
              // data[pix * 4 + 1] = 0;
              // data[pix * 4 + 2] = 0;
               data[pix * 4 + 3] = 0;
            }

          }
        },
        Step: function(image, threshold){
          for(var i = 0; i < image.data.length; i+=4){
            var val = image.data[i] + image.data[i + 1] + image.data[i + 2];
            val =  (val / 3)|0;
            if( val > threshold){
              image.data[i] =     255;
              image.data[i + 1] = 255;
              image.data[i + 2] = 255;
            }
            else{
              image.data[i] =     0;
              image.data[i + 1] = 0;
              image.data[i + 2] = 0;
            }
            
         }
        },
        GrayScale: function(image){
          for(var i = 0; i < image.data.length; i+=4){
            var val = image.data[i] + image.data[i + 1] + image.data[i + 2];
            val =  (val / 3)|0;
            image.data[i] =     val;
            image.data[i + 1] = val;
            image.data[i + 2] = val;
         }
        },
        Cel: function(image, dataIn){
            //6 Levels of color
            for(var i = 0; i < dataIn.length; i+=4){
               image.data[i] =     dataIn[i]     > 213 ? 255     : (dataIn[i]     > 171 ? 213 : (dataIn[i]         > 129 ? 171 : (dataIn[i]     > 87 ? 129 : (dataIn[i]     > 45 ? 87 : 45))));
               image.data[i + 1] = dataIn[i + 1] > 213 ? 255     : (dataIn[i + 1] > 171 ? 213 : (dataIn[i + 1]     > 129 ? 171 : (dataIn[i + 1] > 87 ? 129 : (dataIn[i + 1] > 45 ? 87 : 45))));
               image.data[i + 2] = dataIn[i + 2] > 213 ? 255     : (dataIn[i + 2] > 171 ? 213 : (dataIn[i + 2]     > 129 ? 171 : (dataIn[i + 2] > 87 ? 129 : (dataIn[i + 2] > 45 ? 87 : 45))));
            }
            
            //Toon 4 Levels
            //for(var i = 0; i < dataArray.data.length; i+=4){
            //    dataArray.data[i] =     dataArray.data[i] > 191 ? 255 : (dataArray.data[i] > 127 ? 191 : dataArray.data[i] > 63 ? 127 : 63);
            //    dataArray.data[i + 1] = dataArray.data[i + 1] > 191 ? 255 : (dataArray.data[i + 1] > 127 ? 191 : dataArray.data[i + 1] > 63 ? 127 : 63);
            //    dataArray.data[i + 2] = dataArray.data[i + 2] > 191 ? 255 : (dataArray.data[i + 2] > 127 ? 191 : dataArray.data[i + 2] > 63 ? 127 : 63);
            //    //dataArray.data[i + 3] = 255;
            //}
            //Toon 3 Levels
            // for(var i = 0; i < dataArray.data.length; i+=4){
            //    dataArray.data[i] =     dataArray.data[i] > 170 ? 255 : (dataArray.data[i] > 85 ? 170 : 85);
            //    dataArray.data[i + 1] = dataArray.data[i + 1] > 170 ? 255 : (dataArray.data[i + 1] > 85 ? 170 : 85);
            //    dataArray.data[i + 2] = dataArray.data[i + 2] > 170 ? 255 : (dataArray.data[i + 2] > 85 ? 170 : 63);
            //    //dataArray.data[i + 3] = 255;
            // }
        },
        Invert: function(image){
            //Inversion
             for(var i = 0; i < image.data.length; i+=4){
                image.data[i] =     (255 - image.data[i])|0;
                image.data[i + 1] = (255 - image.data[i + 1])|0;
                image.data[i + 2] = (255 - image.data[i + 2])|0;
             }
        },
        Multiply: function(image, dataIn){

          for(var i = 0; i < image.data.length; i+=4){

            image.data[i]     = (dataIn[i + 0] * (image.data[i + 0] > 0 ? 1 : 0));
            image.data[i + 1] = (dataIn[i + 1] * (image.data[i + 1] > 0 ? 1 : 0));
            image.data[i + 2] = (dataIn[i + 2] * (image.data[i + 2] > 0 ? 1 : 0));
            image.data[i + 3] = image.data[i + 3] > 0 ? 255 : 0;

         }
        }
    },
    Update: {
      Method: null,
      ASM: function(){
        Process.frames++;
        Process.totalTime += (Date.now() - Process.previousTime);
        
        if(Process.totalTime > Process.interval){
          Process.time.innerHTML = "ASMjs: " + (Process.frames/(Process.interval / 1000)).toFixed(2) + "FPS" + " (" + (Process.totalTime/Process.frames).toFixed(2) + "ms)";
          Process.frames = 0;
          Process.totalTime = 0;
        }
        Process.previousTime = Date.now()
        window.requestAnimationFrame(Process.Update.Method);

       //Draw Current Video Frame To Canvas
        Process.Canvas.ctx.drawImage(Process.Video.element,0,0,Process.width,Process.height);
       
        //Get Pixel Data for Current Frame
        Process.Canvas.image = Process.Canvas.ctx.getImageData(0,0,Process.Canvas.el.width, Process.Canvas.el.height);
        
        //Copy data to ASM buffers
        Module.HEAPU8.set(Process.Canvas.image.data, Process.ASM.image);

        Module.HEAPU8.set(Process.Canvas.image.data, Process.ASM.current);

        //Execute PostProcessing in ASM
        //var start = Date.now();
        Process.ASM.module.Update();
        //var duration = Date.now() - start;
        //console.log(duration + "ms");

        //Copy data to image data array
        Process.Canvas.image.data.set(Module.HEAPU8.subarray(Process.ASM.image, Process.ASM.image + Process.ASM.length));

        //Save results to canvas
        Process.Canvas.ctx.putImageData(Process.Canvas.image, 0,0);
      },
      JS: function(){
          Process.frames++;
          Process.totalTime += (Date.now() - Process.previousTime);
          
          if(Process.totalTime > Process.interval){
            Process.time.innerHTML = "JS: " + (Process.frames/(Process.interval / 1000)).toFixed(2) + "FPS" + " (" + (Process.totalTime/Process.frames).toFixed(2) + "ms)"
            Process.frames = 0;
            Process.totalTime = 0;
          }
          Process.previousTime = Date.now();
          window.requestAnimationFrame(Process.Update.Method);

         //Draw Current Video Frame To Canvas
          Process.Canvas.ctx.drawImage(Process.Video.element,0,0,Process.width,Process.height);
         
          //Get Pixel Data for Current Frame
          Process.Canvas.image = Process.Canvas.ctx.getImageData(0,0,Process.Canvas.el.width, Process.Canvas.el.height);
          Process.Canvas.current.set(Process.Canvas.image.data);

          //Perform Gray Scale
          if(Process.Options.gray)
            Process.Techinques.GrayScale(Process.Canvas.image);

          //Perform Convolution

          if(Process.Options.blur){
            Process.Techinques.Convolve(Process.Canvas.image.data,              //Data
                                        Process.Canvas.el.width,                //Canvas Width
                                        Process.Canvas.el.height,               //Canvas height
                                        true,                                  //Normalize?
                                        1,                                      //Scale Factor
                                        Process.Filters.BlurGauss5x5,           //Convolution Filter
                                        Process.Filters.BlurGauss5x5.length);   //Filter length
          }

          if(Process.Options.log){
            Process.Techinques.Convolve(Process.Canvas.image.data,            //Data
                                Process.Canvas.el.width,                      //Canvas Width
                                Process.Canvas.el.height,                     //Canvas height
                                false,                                        //Normalize?
                                Process.Options.scale,                        //Scale Factor
                                Process.Filters.EdgeLaplacian3x3_8,           //Convolution Filter
                                Process.Filters.EdgeLaplacian3x3_8.length,    //Filter length
                                Process.Options.offset);                //Offset
          }

          //Perform Step
          if(Process.Options.step)
            Process.Techinques.Step(Process.Canvas.image, Process.Options.threshold);

          //Perform Inversion
          if(Process.Options.invert)
            Process.Techinques.Invert(Process.Canvas.image);

          //Perform Multiply
          if(Process.Options.multiply)
            Process.Techinques.Multiply(Process.Canvas.image, Process.Canvas.current);

          //Perform Cel Shading
          if(Process.Options.cel){
            Process.Canvas.current.set(Process.Canvas.image.data);
            Process.Techinques.Cel(Process.Canvas.image, Process.Canvas.current);
          }
          
          
          //Perform Gray Scale
          if(Process.Options.postGray)
            Process.Techinques.GrayScale(Process.Canvas.image);

          
          
          //Save results to canvas
          Process.Canvas.ctx.putImageData(Process.Canvas.image, 0,0);
          
      }
  },
    Events: {
        onError: function(e){
            console.log("Its Jacked");
            console.log("Error: " + e);
        }
    }
    
};

Process.Init();
