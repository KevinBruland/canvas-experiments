// Goal: Take in an image element and use canvas to draw the image with various effects
var drawImage = new function () {
    this.configurations = {
        circleSize: .2,
        minCircleSize: .005,
    }

    this.circleDraw = function (imageEl) {        
        this.imageEl = imageEl;
        this.checkIfImageLoaded();
    }

    this.checkIfImageLoaded = function () {
        var that = this;
        if (this.imageEl.complete && this.imageEl.naturalHeight !== 0) {
            this.initCanvas();
        } else {
            this.imageEl.onload = function () {
                that.initCanvas();
            }
        }
    }

    this.initCanvas = function () {
        // Canvas that pastes the image to read data
        this.createImageCanvas();
        this.createCanvas();
        this.appendCanvas();        
        this.animationLoop();
    }

    this.animationLoop = function () {

        var imageSize = this.imageEl.width * this.configurations.circleSize;
        var circleAlpha = (this.configurations.minCircleSize / this.configurations.circleSize) *.5;
        if (this.configurations.circleSize >= this.configurations.minCircleSize){
            this.configurations.circleSize *= .99;
        }
        this.ctx.globalAlpha = circleAlpha;
        
        for (var i = 0; i < 500; i++) {
            var randomX = Math.floor(Math.random() * this.imageEl.width);
            var randomY = Math.floor(Math.random() * this.imageEl.height);
            var pixelColor = this.imageCanvasCtx.getImageData(randomX, randomY, 1, 1).data;
            this.ctx.fillStyle = "rgb(" + pixelColor[0] + "," + pixelColor[1] + ", " + pixelColor[2] + ")";
            this.ctx.beginPath();
            this.ctx.arc(randomX, randomY, imageSize, 0, 2 * Math.PI);
            this.ctx.fill();           
        }

        
        window.requestAnimationFrame(this.animationLoop.bind(this));
    }

    this.createImageCanvas = function () {
        console.log(this.imageEl.width);
        var imageCanvas = document.createElement('canvas');
        imageCanvas.width = this.imageEl.width;
        imageCanvas.height = this.imageEl.height;
        imageCanvas.style.border = "1px solid black";
        this.imageCanvasCtx = imageCanvas.getContext('2d');
        this.imageCanvasCtx.drawImage(this.imageEl, 0, 0, imageCanvas.width, imageCanvas.height);
        this.imageCanvas = imageCanvas;        
    }

    this.createCanvas = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.imageEl.width;
        canvas.height = this.imageEl.height;
        canvas.style.border = "1px solid black";

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
    }

    this.appendCanvas = function () {
        // Todo: create a wrapper div around image, set image visibility to hidden, and position canvas absolute;
        document.body.appendChild(this.canvas);
        document.body.appendChild(this.imageCanvas);
    }
};