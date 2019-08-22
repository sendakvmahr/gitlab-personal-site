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
            if (success) {
                return shader;
            }
            console.log(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
        }

        function createProgram(gl, vertexShader, fragmentShader) {
            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            var success = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (success) {
                return program;
            }
            console.log(gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
        }

        function shadersToProgram(gl, vSource, fSource) {
            let vShader = createShader(gl, gl.VERTEX_SHADER, vSource);
            let fShader = createShader(gl, gl.FRAGMENT_SHADER, fSource);
            return createProgram(gl, vShader, fShader);
        }

        function loadAttributesAndBuffers(attAndBuff) {
            let keys = Object.keys(attAndBuff);
            for (let k in keys) {
                let obj = attAndBuff[keys[k]];
                obj.location = gl.getAttribLocation(program, keys[k]);
                obj.buffer = gl.createBuffer();
            }
        }

        function setBuffer(gl, att) {
            gl.bindBuffer(gl.ARRAY_BUFFER, att.buffer);
        }

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


        function setCanvasTexture(gl, ctx, tex) {
            setBuffer(gl, tex);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                0.0, 1.0,
                1.0, 0.0,
                1.0, 1.0
            ]), gl.STATIC_DRAW);
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ctx.canvas);
        }

        function setColor(gl, ctx, color, tex) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            setCanvasTexture(gl, ctx, tex);
        }

        function setImage(gl, img, ctx, tex) {
            ctx.canvas.width = img.width;
            ctx.canvas.height = img.height;
            ctx.width = img.width;
            ctx.height = img.height;
            ctx.drawImage(img, 0, 0);
            setCanvasTexture(gl, ctx, tex);
        }

        function drawRect(gl, x, y, width, height, att, canvas, color, tex) {
            setColor(gl, canvas, color, tex);
            setBuffer(gl, att);
            setRect(gl, x, y, width, height);
            gl.vertexAttribPointer(att.location, att.numComponents, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }

        function drawImage(gl, img, xSrc, ySrc, wSrc, lSrc, xDest, yDest, wDest, hDest, canvas, tex, pos) {
            setImage(gl, img, canvas, tex);
            setBuffer(gl, pos);
            setRect(gl, xDest, yDest, wDest, hDest);
            gl.vertexAttribPointer(pos.location, pos.numComponents, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }


        var canvas = document.getElementById("body");
        var gl = canvas.getContext("webgl");
        var program = shadersToProgram(gl, document.getElementById("vertex").text, document.getElementById("fragment").text);
        var canvases = {
            color: document.createElement('canvas').getContext("2d"),
            texture1: document.createElement('canvas').getContext("2d")
        }
        canvases.color.canvas.height = 1;
        canvases.color.canvas.width = 1;

        var attAndBuff = {
            a_position: {
                buffer: "",
                location: "",
                numComponents: 2
            },
            a_texCoord: {
                buffer: "",
                location: "",
                numComponents: 2
            }
        }

        var globalUniforms = {};
        var objs = [{}];

        var offset = -1;
        var step = .001;

        function resizeCanvasToDisplaySize(canvas, multiplier) {
            multiplier = multiplier || 1;
            const width = canvas.clientWidth * multiplier | 0;
            const height = canvas.clientHeight * multiplier | 0;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                return true;
            }
            return false;
        }
        loadAttributesAndBuffers(attAndBuff);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);

        // find better place to put these, or call "activate all or smthing
        gl.enableVertexAttribArray(attAndBuff.a_position.location);
        gl.enableVertexAttribArray(attAndBuff.a_texCoord.location);
        gl.vertexAttribPointer(attAndBuff.a_texCoord.location, attAndBuff.a_texCoord.numComponents, gl.FLOAT, false, 0, 0);


        var r = Math.floor(Math.random() * 255).toString() + ",";
        var b = Math.floor(Math.random() * 255).toString() + ",";
        var g = Math.floor(Math.random() * 255).toString() + ",";
        var rgb = "rgba(" + r + g + b + "1)"

        draw();


        function draw() {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            drawRect(gl, 0 + offset, 0 + offset, .5, .5, attAndBuff.a_position, canvases.color, rgb, attAndBuff.a_texCoord);
            let img = assets.images[0];
            // drawImage(gl, img, 0, 0, img.width, img.height, .5 + offset, .5 + offset, .5, .5, canvases.texture1, attAndBuff.a_texCoord, attAndBuff.a_position);
            // window.requestAnimationFrame(draw);
            offset += step;
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