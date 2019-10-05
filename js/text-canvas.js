var fshader = `
precision mediump float;
uniform sampler2D u_image;
uniform vec2 u_textureSize;
varying vec2 v_texCoord;

void main() {
    vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;
    gl_FragColor =  texture2D(u_image, v_texCoord);
    float lumens = 0.2126 * gl_FragColor.r + 0.7152 * gl_FragColor.g + 0.0722 * gl_FragColor.b;
    float distance0 = distance(lumens, 0.0);
    float distance1 = distance(lumens, 1.0);
    if (gl_FragColor.a > 0.56) {
        gl_FragColor = vec4(0, 0, 0, 1);
    } else if (gl_FragColor.a > 0.25) {
        gl_FragColor = vec4(0, .1, .2, 0.7);
 	} else {
        gl_FragColor = vec4(0, 0, 0, 0);
    }
}
`
var vshader = `
uniform mat3 u_matrix;
attribute vec2 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;    
void main() {
    gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
    v_texCoord = a_texCoord;
}
`

function initTextCanvas() {
if (CAN_SHADOW && typeof ResizeObserver === "function") {
    class TextCanvas extends HTMLElement {
        constructor(){
            super();
            const scaleFactor = parseInt(this.getAttribute("data-scale"))
            const shadow = this.attachShadow({mode: "open"});
            const linkWrapper = document.createElement("a");
            const canv = document.createElement("canvas");
            const canvgl = document.createElement("canvas");
            const font = this.getAttribute("data-font");
            
            const ctx = canv.getContext("2d");
            const gl = canvgl.getContext("webgl", {antialias: false, premultipliedAlpha: true });
            
            const program = wgl.shadersToProgram(gl, vshader, fshader);
            const setters = wgl.createSetters(gl, program);
            
            const text = this.innerHTML.trim().split(" ");
            const style = document.createElement('style');
            canvgl.setAttribute("aria-label", this.innerHTML.trim());
            
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            gl.enable(gl.BLEND)
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.useProgram(program);
            ctx.imageSmoothingEnabled = false;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            
            function resizeCanvas(){
                ctx.canvas.width = canvgl.clientWidth / scaleFactor;
                ctx.canvas.height = canvgl.clientHeight / scaleFactor;
                gl.canvas.width = ctx.canvas.width;
                gl.canvas.height = ctx.canvas.height;
                gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); 
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                ctx.font = font;
                let line = "",
                    lines = [],
                    lineWidths = [],
                    lineHeight = 13 * 1.54; // line-height standard calc; 
                for (var n=0; n < text.length; n++) {
                    let testAdd = text[n] + " ",
                        testLine = line + testAdd;
                    if (ctx.measureText(testLine).width > ctx.canvas.width && n > 0) {
                        lines.push(line);
                        lineWidths.push(ctx.measureText(line).width);
                        line = testAdd;
                    }
                    else { line = testLine; }
                }
                lineWidths.push(ctx.measureText(line).width)
                lines.push(line);
                for (let l = 0; l < lines.length; l++) {
                    let x = (ctx.canvas.width - lineWidths[l])/2,
                        y = lineHeight*(parseInt(l)+1);
                    ctx.fillText(lines[l], x, y);
                    ctx.fillText(lines[l], x, y);
                }
                canvgl.style.height = (lineHeight * (lines.length + .5)) * scaleFactor + "px";
                let texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ctx.canvas)
            
                
                // gl rendering
                let unis = {}, atts = {};
                unis.u_textureSize = [ctx.canvas.width, ctx.canvas.height];
                unis.u_matrix = wgl.m3.projection( gl.canvas.clientWidth, gl.canvas.clientHeight);
                
                atts.a_position = {numComponents: 2, data: new Float32Array(wgl.m3.setRectangle(0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight))};
                // Sets texture coord - NOTE THIS SHOULD BE CHANGED FOR ARGUMENTS LATER FOR SPRITESHEETS
                atts.a_texCoord = {numComponents: 2, data: new Float32Array(wgl.setTextureCoord()) };
                for (let u in unis){
                    if (setters.uni[u] === undefined){ continue; } 
                    setters.uni[u](unis[u]);
                }
                for (let a in atts){
                    if (setters.att[a] === undefined){ continue; } 
                    setters.att[a](atts[a]);
                }
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
            
            new ResizeObserver(function(){ resizeCanvas(); }).observe(canvgl);
            
            style.textContent = `
            canvas { 
                width: 100%; 
                image-rendering: optimizeSpeed;             /* Older versions of FF          */
                image-rendering: -moz-crisp-edges;          /* FF 6.0+                       */
                image-rendering: -webkit-optimize-contrast; /* Safari                        */
                image-rendering: -o-crisp-edges;            /* OS X & Windows Opera (12.02+) */
                image-rendering: pixelated;                 /* Awesome future-browsers       */
                -ms-interpolation-mode: nearest-neighbor;   /* IE                            */
            }
            canvas:hover {
                background: grey;
            }
            `;

            let link = this.getAttribute("href");
            shadow.appendChild(style);
            if (link !== null) {
                linkWrapper.setAttribute("href", this.getAttribute("href"));
                linkWrapper.append(canvgl);
                shadow.appendChild(linkWrapper);
            } else { shadow.appendChild(canvgl) };
        }
    }
    customElements.define('text-canvas', TextCanvas);
} else {
    //fallback css
    let head = document.getElementsByTagName('HEAD')[0];  
    let link = document.createElement('link');         
    let canvases = document.querySelectorAll("text-canvas");
    for (let c=0; c<canvases.length; c++) {
        let canvas = canvases[c];
        const scaleFactor = parseInt(canvas.getAttribute("data-scale"));
        const divWrapper = document.createElement("div");
        const linkWrapper = document.createElement("a");
        let font = canvas.getAttribute("data-font");
        let fontIndex = font.indexOf("px");
        let fontSize = parseInt(font.substring(0, fontIndex)); 
        const useFontGif = fontSize <= 12
        // IF IT'S LESS THAN 12 START USING THE ADDED FONT
        font = (parseInt(font.substring(0, fontIndex)) * 2) + font.substring(fontIndex, font.length);
        const text = canvas.innerHTML.trim();
        divWrapper.setAttribute("style", "font: " + font);
        let link = canvas.getAttribute("href");
        if (link !== null) {
            linkWrapper.setAttribute("href", link);
            linkWrapper.innerHTML = text;
            canvas.innerHTML = "";
            divWrapper.appendChild(linkWrapper);
            canvas.appendChild(divWrapper);
        } else {
            divWrapper.innerHTML = text;
            canvas.innerHTML = "";
            canvas.appendChild(divWrapper);
        };

    }
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './css/text-canvas-fallback.css';
    head.appendChild(link);
}
}
document.fonts.ready.then(initTextCanvas)