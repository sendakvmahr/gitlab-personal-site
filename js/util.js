window.addEventListener ?
    window.addEventListener("load", startLoading, false) :
    window.attachEvent && window.attachEvent("onload", startLoading);

function startLoading() {

    function main(assets) {

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
        // loaders
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

        function setBuffer(gl, att) { gl.bindBuffer(gl.ARRAY_BUFFER, att.buffer); }

        function setRect(gl, x1, y1, width, height) {
            let x2 = x1 + width,
                y2 = y1 + height;
            let points = [
                x1, y1,
                x1, y2,
                y2, y2,
                x2, y2,
                x1, y1,
                x2, y1
            ]
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
        }


        function setRectangle(gl, posAtt, x1, y1, width, height) {
            setBuffer(gl, posAtt)
            var x2 = x1 + width;
            var y2 = y1 + height;
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                x1, y1,
                x2, y1,
                x1, y2,
                x1, y2,
                x2, y1,
                x2, y2,
            ]), gl.STATIC_DRAW);
        }

        function setTextureCoord(gl, texCoord) {
            setBuffer(gl, texCoord);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                0.0,  0.0,
                1.0,  0.0,
                0.0,  1.0,
                0.0,  1.0,
                1.0,  0.0,
                1.0,  1.0,
            ]), gl.STATIC_DRAW);
        }

        function blankTexture(gl) {
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            return texture;
        }
        function setCanvasImage(ctx, img) {
            ctx.canvas.width = img.width;
            ctx.canvas.height = img.height;
            ctx.width = img.width;
            ctx.height = img.height;
            ctx.drawImage(img, 0, 0); 
        }

        function configVAttribPointer(gl, att) {
            gl.vertexAttribPointer(att.location, att.numComponents, att.type, att.normalize, att.stride, att.offset)
        }

        render(assets)
        function render(assets) {
        	console.log(assets);
        	var image = assets.images[0];
        	console.log(image);
            var canvas = document.getElementById("body");
            //var gl = canvas.getContext("webgl", {antialias: false});
            var gl = canvas.getContext("webgl");
            if (!gl) { return; }
            var program = shadersToProgram(gl, document.getElementById("vertex").text, document.getElementById("fragment").text);
            var anb = { 
                a_position: { buffer: "", location: "", numComponents: 2, type: gl.FLOAT, normalize: false, stride: 0, offset: 0 },
                a_texCoord: { buffer: "", location: "", numComponents: 2, type: gl.FLOAT, normalize: false, stride: 0, offset: 0 }
            } 
            var unis = {
                u_textureSize: "u_textureSize",
                u_matrix: "u_matrix",
            }
            var canvasImages = {
                fire: {
                    img: image,
                    ctx: "", 
                    canvas: "",
                    texture: ""
                }
            } 
            // need to assign textures before objects reference them
            loadAttributesAndBuffers(gl, anb, program);
            loadCanvasImages(gl, canvasImages);
            loadUnis(gl, program, unis);
            var objects = [{
                scale:[.5, .5],
                translation: [0, 100],
                rotation: 45*Math.PI / 180,
                program: program,
                texture: canvasImages.fire,
                x: 0, 
                y: 30,
                height: 120,
                width: 120,
                primitive: gl.TRIANGLES,
                offset: 0,
                count: 6
            }];
            
            draw();
                
            function draw(name) {
                // predraw config
                resizeCanvasToDisplaySize(gl.canvas);
                gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                var matrix = m3.projection( gl.canvas.clientWidth, gl.canvas.clientHeight);
                
                for (let o in objects) {
                    let obj = objects[o];
                    // set up shaders
                    gl.useProgram(obj.program);
                    // set up texture
                    gl.uniform2f(unis.u_textureSize, obj.texture.canvas.width, obj.texture.canvas.height);
                    // matrix math for transformations
                    let matrix2 = matrix;
                    matrix2 = m3.multiply(matrix2, m3.translation(obj.translation[0], obj.translation[1]));
                    matrix2 = m3.multiply(matrix2, m3.rotation(obj.rotation));
                    matrix2 = m3.multiply(matrix2, m3.scaling(obj.scale[0], obj.scale[1]));
                    matrix2 = m3.multiply(matrix2, m3.translation(obj.width/2, obj.height/2));
                    gl.uniformMatrix3fv(unis.u_matrix, false, matrix2);
                    // Set rect for object to be rendered in
                    setRectangle(gl, anb.a_position, obj.x, obj.y, obj.width, obj.height);
                    // Sets texture coord - NOTE THIS SHOULD BE CHANGED FOR ARGUMENTS LATER FOR SPRITESHEETS
                    setTextureCoord(gl, anb.a_texCoord);
                    // Sets object texture to be the current one
                    gl.bindTexture(gl.TEXTURE_2D, obj.texture.texture);
                    // draws the object
                    gl.drawArrays(obj.primitive, obj.offset, obj.count);
                }
            // window.requestAnimationFrame(draw)
            }
        }
    }

    function CORSImageLoad(img, url) {
        if ((new URL(url)).origin !== window.location.origin) {
            img.crossOrigin = "";
        }
        img.src = url;
    }

    function loadImages(images) {
        for (let i in images) {
            let img = new Image();
            img.onload = onImageLoad;
            CORSImageLoad(img, images[i]);
        }
    }

    function onImageLoad() {
        assets.images.push(this);
        imageCount--;
        if (imageCount === 0) {
            main(assets);
        }
    }


    var images = [
        "https://github.githubassets.com/images/modules/site/home-illo-team.svg"
    ];
    var assets = {
        images: []
    }
    var imageCount = images.length;
    loadImages(images);
}
