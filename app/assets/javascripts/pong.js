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
    this.score = 0;
  }

  Paddle.prototype.render = function() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  Paddle.prototype.update = function() {
    if ((this.y_speed == -2 && this.y == 0) || (this.y_speed == 2 && this.y == 350)) {
      this.y_speed = 0;
    }

    this.y += this.y_speed; 
  };

  function Ball(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
  }
  Ball.prototype.reset = function(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 0;
  }
  Ball.prototype.render = function() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  Ball.prototype.update = function() {
    if(this.x < 2) {
      this.reset(300,200);
      paddle2.score++;
    } else if(this.x > 598) {
      this.reset(300,200);
      paddle1.score++;
    }
    // Check for not full collision
    else if(this.x + this.x_speed < paddle1.x && this.x_speed < 0 && this.y >= paddle1.y && this.y <= paddle1.y+paddle1.height) {
      // debugger;
      this.x = paddle1.x+15;
    } else if(this.x + this.x_speed > paddle2.x && this.x_speed > 0 && this.y >= paddle2.y && this.y <= paddle2.y+paddle2.height) {
      // debugger;
      this.x = paddle2.x-5;
    } else {
      this.x += this.x_speed;
      this.y += this.y_speed;
    }
    

    // Check paddle collision
    if(this.x-10 == paddle1.x && this.y >= paddle1.y && this.y <= paddle1.y+paddle1.height) {
      this.x_speed = this.x_speed * -1;
    } else if (this.x+5 == paddle2.x && this.y >= paddle2.y && this.y <= paddle2.y+paddle2.height) {
      this.x_speed = this.x_speed * -1;
    }

    // Check Wall collision
    if(this.y == 0 || this.y == 395){
      this.y_speed = this.y_speed * -1;
    }
  };

  $('#message_content').on('keydown', function(e) {
    e.stopPropagation();
  });

  // $(document).on('keydown', function(e){
  //   var code = e.which;
  //   if(code == 87) {
  //     paddle1.y_speed = -2;
  //   } else if(code == 83) {
  //     paddle1.y_speed = 2;
  //   }
  // });

  // $(document).on('keydown', function(e){
  //   e.preventDefault();
  //   var code = e.which;
  //   if(code == 38) {
  //     paddle2.y_speed = -2;
  //   } else if(code == 40) {
  //     paddle2.y_speed = 2;
  //   }
  // });

  $(document).on('keydown', function(e){
    var code = e.which;
    if(code == 87) {
      $.post("/p1up", function(){});
    } else if(code == 83) {
      $.post("/p1down", function(){});
    }
  });

  PrivatePub.subscribe("/p1up", function() {
    if(paddle1.y > 0) {
      paddle1.y_speed = -2;
    }
  });

  PrivatePub.subscribe("/p1down", function() {
    if(paddle1.y < 350) {
      paddle1.y_speed = 2;
    }
  });

  $(document).on('keydown', function(e){
    e.preventDefault();
    var code = e.which;
    if(code == 38) {
      $.post("/p2up", function(){});
    } else if(code == 40) {
      $.post("/p2down", function(){});
    }
  });

  PrivatePub.subscribe("/p2up", function() {
    if(paddle2.y > 0) {
      paddle2.y_speed = -2;
    }
  });

  PrivatePub.subscribe("/p2down", function() {
    if(paddle2.y < 350) {
      paddle2.y_speed = 2;
    }
  });

  $(document).on('keydown', function(e){
    e.preventDefault();
    var code = e.which;
    if(code == 32) {
      $.post("/space", function(){});
    }
  });

  PrivatePub.subscribe("/space", function() {
    if(ball.x_speed == 0){
      ball.x_speed = 3;
      ball.y_speed = 1;
    }
  });

  document.body.appendChild(canvas);
  animate(step);


})


