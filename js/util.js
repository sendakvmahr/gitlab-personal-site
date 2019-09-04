var wgl = (function () {
  function CORSImageLoad(img, url) {
    if ((new URL(url)).origin !== window.location.origin) {
      img.crossOrigin = "";
    }
    img.src = url;
  }
  /*************** WEBGL STUFF ***************/
  function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) { return shader; }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
  function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) { return program; }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }
  function shadersToProgram(gl, vSource, fSource){
    let vShader = createShader(gl, gl.VERTEX_SHADER, vSource);
    let fShader = createShader(gl, gl.FRAGMENT_SHADER, fSource);
    return createProgram(gl, vShader, fShader);
  }
  function resizeCanvasToDisplaySize(canvas) {
    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }
  function loadAttributesAndBuffers(gl, anb, program){    
    let keys = Object.keys(anb);
    for (let k in keys) {
      let obj = anb[keys[k]];
      obj.location = gl.getAttribLocation(program, keys[k]);
      obj.buffer = gl.createBuffer();
      gl.enableVertexAttribArray(obj.location);
      setBuffer(gl, obj);
      configVAttribPointer(gl, obj)
    }
  }
  function loadCanvasImages(gl, canvasImages) {
    let keys = Object.keys(canvasImages);
    for (let k in keys) {
      let kkey = keys[k];
      let img = canvasImages[kkey].img;
      let ctx = document.createElement('canvas').getContext("2d");
      setCanvasImage(ctx, img);
      canvasImages[kkey].ctx = ctx;
      canvasImages[kkey].canvas = ctx.canvas;
      canvasImages[kkey].texture = blankTexture(gl);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ctx.canvas);
    }
  }
  function loadUnis(gl, program, unis) {
    var keys  = Object.keys(unis);
    for (let k in keys) {
      unis[keys[k]] = gl.getUniformLocation(program, unis[keys[k]]);
    }
  }

  function setBuffer(gl, att){ gl.bindBuffer(gl.ARRAY_BUFFER, att.buffer); }

  function setTextureCoord(gl, texAtt) {
    setBuffer(gl, texAtt);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0
    ]), gl.STATIC_DRAW);
  }

  function blankTexture(gl) {
    // creates a texture. Called by loadCanvasImages only
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    return texture;
  }
  function setCanvasImage(ctx, img) {
    // sets canvas image for a 2d canvas. called by loadCanvasImages only
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.width = img.width;
    ctx.height = img.height;
    ctx.drawImage(img, 0, 0); 
  }

  function configVAttribPointer(gl, att) {
    // setup helper function loadAttributesAndBuffers
    gl.vertexAttribPointer(att.location, att.numComponents, att.type, att.normalize, att.stride, att.offset)
  }
  function loader(images, renderStartFunction){
    let keys = Object.keys(images);
    let leftLoading = keys.length
    for (let i in keys) {
      let k = keys[i];
      var img = new Image();
      img.onload = function() {
        images[k] = img;
        leftLoading--;
        if (leftLoading === 0) {
          renderStartFunction(images);
        }
      }
      CORSImageLoad(img, images[k]);
    }
  }  
  /*************** MATRIX STUFF ***************/
  // rewrite using https://github.com/hiddentao/linear-algebra later
  // 2d
  var twoD = (function () {
    function setRectangle(gl, posAtt, x1, y1, width, height) {
      setBuffer(gl, posAtt);
      var x2 = x1 + width;
      var y2 = y1 + height;
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2
      ]), gl.STATIC_DRAW);
    }

    function projection(width, height) {
      return [2/width, 0, 0, 0, -2/height, 0, -1, 1, 1];
    }
    function translation(dx, dy) {
      return [1, 0, 0, 0, 1, 0, dx, dy, 1];
    }
    function rotation(angleR) { 
      var c = Math.cos(angleR), s = Math.sin(angleR);
      return [c,-s, 0, s, c, 0, 0, 0, 1];
    }
    function scale(dx, dy){
      return [dx, 0, 0, 0, dy, 0, 0, 0, 1];
    }
    function multiply(n, r){
      var t=n[0],u=n[1],i=n[2],l=n[3],a=n[4],c=n[5],e=n[6],f=n[7],m=n[8],o=r[0],p=r[1],v=r[2],y=r[3],b=r[4],d=r[5],g=r[6],h=r[7],j=r[8];
    } 
    return {
      setRectangle: setRectangle,
      projection: projection,
      translation: translation,
      rotation: rotation,
      scale: scale,
      multiply: multiply
      }
  })();
  // 3d
  var threeD = (function () {
    function ortho(left, right, bottom, top, near, far) {
      var l=left,r=right,b=bottom,t=top,n=near,f=far;
      return [
        2/(r-l), 0, 0, 0,
        0, 2/(t-b), 0, 0,
        0, 0, 2/(n-f), 0,        
        (l+r)/(l-r), (b+t)/(b-t), (n+f)/(n-f), 1
      ];
    }
    function normalize(v, dst) {
      dst = dst || new Float32Array(3);
      var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      if (length > 0.00001) {
        dst[0] = v[0] / length;
        dst[1] = v[1] / length;
        dst[2] = v[2] / length;
      }
      return dst;
    }
    function projection(width, height, depth) {
      return [2/width, 0, 0, 0, 0, -2/height, 0, 0, 0, 0, 2/depth, 0, -1, 1, 0, 1];
    }
    function translation(dx, dy, dz) {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, dx, dy, dz, 1];
    }
    function rotationX(angleR) { 
      var c = Math.cos(angleR), s = Math.sin(angleR);
      return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
    }
    function rotationY(angleR) { 
      var c = Math.cos(angleR), s = Math.sin(angleR);
      return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
    }
    function rotationZ(angleR) { 
      var c = Math.cos(angleR), s = Math.sin(angleR);
      return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
    function scale(dx, dy, dz){
      return [dx, 0, 0, 0, 0, dy, 0, 0, 0, 0, dz, 0, 0, 0, 0, 1];
    }
    function multiply(n,r){
      var t=n[0],u=n[1],i=n[2],l=n[3],a=n[4],c=n[5],e=n[6],f=n[7],m=n[8],o=n[9],p=n[10],v=n[11],y=n[12],b=n[13],d=n[14],g=n[15],h=r[0],j=r[1],k=r[2],q=r[3],s=r[4],w=r[5],x=r[6],z=r[7],A=r[8],B=r[9],C=r[10],D=r[11],E=r[12],F=r[13],G=r[14],H=r[15];
      return[h*t+j*a+k*m+q*y,h*u+j*c+k*o+q*b,h*i+j*e+k*p+q*d,h*l+j*f+k*v+q*g,s*t+w*a+x*m+z*y,s*u+w*c+x*o+z*b,s*i+w*e+x*p+z*d,s*l+w*f+x*v+z*g,A*t+B*a+C*m+D*y,A*u+B*c+C*o+D*b,A*i+B*e+C*p+D*d,A*l+B*f+C*v+D*g,E*t+F*a+G*m+H*y,E*u+F*c+G*o+H*b,E*i+F*e+G*p+H*d,E*l+F*f+G*v+H*g]
    }
    function orthop(l, r, b, t, n, f, p) {
      return [2/(r-l), 0, 0, 0,
              0, 2/(t-b), 0, 0,
              0, 0, 2/(n-f), p*2/(n-f),
              (l+r)/(l-r), (b+t)/(b-t), (n+f)/(n-f), ((n+f)/(n-f)*p)+1
      ]
      
    }
    function inverse(r,n){n=n||new Float32Array(16);var e=r[0],a=r[1],t=r[2],i=r[3],o=r[4],u=r[5],v=r[6],c=r[7],f=r[8],l=r[9],s=r[10],w=r[11],y=r[12],A=r[13],F=r[14],b=r[15],d=s*b,g=F*w,h=v*b,j=F*c,k=v*w,m=s*c,p=t*b,q=F*i,x=t*w,z=s*i,B=t*c,C=v*i,D=f*A,E=y*l,G=o*A,H=y*u,I=o*l,J=f*u,K=e*A,L=y*a,M=e*l,N=f*a,O=e*u,P=o*a,Q=d*u+j*l+k*A-(g*u+h*l+m*A),R=g*a+p*l+z*A-(d*a+q*l+x*A),S=h*a+q*u+B*A-(j*a+p*u+C*A),T=m*a+x*u+C*l-(k*a+z*u+B*l),U=1/(e*Q+o*R+f*S+y*T);return n[0]=U*Q,n[1]=U*R,n[2]=U*S,n[3]=U*T,n[4]=U*(g*o+h*f+m*y-(d*o+j*f+k*y)),n[5]=U*(d*e+q*f+x*y-(g*e+p*f+z*y)),n[6]=U*(j*e+p*o+C*y-(h*e+q*o+B*y)),n[7]=U*(k*e+z*o+B*f-(m*e+x*o+C*f)),n[8]=U*(D*c+H*w+I*b-(E*c+G*w+J*b)),n[9]=U*(E*i+K*w+N*b-(D*i+L*w+M*b)),n[10]=U*(G*i+L*c+O*b-(H*i+K*c+P*b)),n[11]=U*(J*i+M*c+P*w-(I*i+N*c+O*w)),n[12]=U*(G*s+J*F+E*v-(I*F+D*v+H*s)),n[13]=U*(M*F+D*t+L*s-(K*s+N*F+E*t)),n[14]=U*(K*v+P*F+H*t-(O*F+G*t+L*v)),n[15]=U*(O*s+I*t+N*v-(M*v+P*s+J*t)),n}
    function fieldOfView(fieldOfViewInRadians, aspect, near, far){
      var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
      var rangeInv = 1.0 / (near - far);
      return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
      ];
    }
    function perspective(p){
      return [1,0,0,0,
              0,1,0,0,
              0,0,1,p,
              0,0,0,1];
    }
    return {
      ortho:ortho,
      projection: projection,
      translation: translation,
      rotationX: rotationX,
      rotationY: rotationY,
      rotationZ: rotationZ,
      scale: scale,
      multiply: multiply,
      fieldOfView: fieldOfView,
      perspective: perspective, 
      orthop: orthop,
      normalize: normalize,
      inverse: inverse
      }
  })();
 
  
  return {
    shadersToProgram: shadersToProgram,
        // gl, vertexSource, fragmentSource
        // returns program
    resizeCanvasToDisplaySize: resizeCanvasToDisplaySize,   
        // canvas
    loadAttributesAndBuffers: loadAttributesAndBuffers,  
        // gl, attsandBuffers, program
           // attributes and buffer format:
        // anb = { 
        //     a_position: { 
        //         buffer: "",         // pointer to buffer 
        //         location: "",         // pointer to location
        //         numComponents: 2,     // number of things per object. example: 2 components = x, y coordinate
        //         type: gl.FLOAT,     // type of things
        //         normalize: false,     // normalize data?
        //         stride: 0,             // how big is the stride/step?
        //         offset: 0             // offset from beginning
        //   }, etc...
          // }
    loadCanvasImages: loadCanvasImages, 
        // gl, canvasImages
        // canvasImageFormat = {
        //   fire: {
        //     img: passInImages.fire,
        //     ctx: "", 
        //     canvas: "",
        //     texture: ""
        //   }
          // } 
      loadUnis: loadUnis,
        // gl, program, universals
        // universalsFormat = {
        //   u_textureSize: "u_textureSize",
          // }
     setBuffer: setBuffer,
        // helper function for cleaner code: use like setBuffer(gl, attsAndBuffers.bufferName);
         // function setBuffer(gl, att){ gl.bindBuffer(gl.ARRAY_BUFFER, att.buffer); }
     setTextureCoord: setTextureCoord, 
        // gl, texturePositionAttributePointer
        // FOR NOW USES WHOLE TEXTURE, THAT SHOULD CHANGE
    twoD: twoD,
    threeD: threeD,
    loader: loader
  };
})();



