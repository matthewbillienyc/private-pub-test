$(function(){

  var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

  var canvas = document.createElement('canvas');
  var width = 600;
  var height = 400;
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  var paddle1 = new Paddle(10, 180, 10, 50);
  var paddle2 = new Paddle(580, 180, 10, 50);
  var ball = new Ball(300, 200, 5, 5)

  var render = function () {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    paddle1.render();
    paddle2.render();
    ball.render();
  };

  var update = function() {
    paddle1.update();
    paddle2.update();
    ball.update();
  };

  var step = function () {
    update();
    render();
    animate(step);
  };

  function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
  }

  Paddle.prototype.render = function() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  Paddle.prototype.update = function() {
    this.y += this.y_speed; 

    // if (this.y == 0 || this.y == 350) {
    //   this.y_speed = 0;
    // }
  };

  function Ball(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 5;
    this.y_speed = 0;
  }

  Ball.prototype.render = function() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  Ball.prototype.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;

    if(this.x-10 == paddle1.x && this.y >= paddle1.y && this.y <= paddle1.y+paddle1.height) {
      this.x_speed = this.x_speed * -1;
    } else if (this.x+5 == paddle2.x && this.y >= paddle2.y && this.y <= paddle2.y+paddle2.height) {
      this.x_speed = this.x_speed * -1;
    }
  };

  $('#message_content').on('keydown', function(e) {
    e.stopPropagation();
  });

  $(document).on('keydown', function(e){
    var code = e.which;
    if(code == 87) {
      paddle1.y_speed = -2;
    } else if(code == 83) {
      paddle1.y_speed = 2;
    }
  });

  $(document).on('keydown', function(e){
    var code = e.which;
    if(code == 38) {
      paddle2.y_speed = -2;
    } else if(code == 40) {
      paddle2.y_speed = 2;
    }
  });

  document.body.appendChild(canvas);
  animate(step);


})


