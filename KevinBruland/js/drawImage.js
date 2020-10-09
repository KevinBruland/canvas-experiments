// Goal: Take in an image element and use canvas to draw the image with various effects
var drawImage = new function () {
    this.circleDraw = function (imageEl) {
        var that = this;
        this.imageEl = imageEl;
        this.checkIfImageLoaded();
    }

    this.checkIfImageLoaded = function(){
        var that = this;
        if (this.imageEl.complete && this.imageEl.naturalHeight !== 0) {
            this.initCanvas();
        } else {
            this.imageEl.onload = function(){
                that.initCanvas();
            }
        }
    }

    this.initCanvas = function(){
        this.createCanvas();
        this.appendCanvas();
        this.drawCanvas();
    }

    this.createCanvas = function () {
        console.log(this.imageEl.width);
        var canvas = document.createElement('canvas');
        canvas.width = this.imageEl.width;
        canvas.height = this.imageEl.height;
        canvas.style.border = "1px solid black";

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');       
    }

    this.drawCanvas = function(){
        this.ctx.fillRect(0,0,150,100);
    }

    this.appendCanvas = function () {
        // Todo: create a wrapper div around image, set image visibility to hidden, and position canvas absolute;
        document.body.appendChild(this.canvas);        
    }

    this.hideImage = function () {

    }
};