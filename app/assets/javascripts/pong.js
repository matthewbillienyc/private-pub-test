$(function(){

  var p1select = false;
  var p2select = false;
  // var animate = window.requestAnimationFrame ||
  //   window.webkitRequestAnimationFrame ||
  //   window.mozRequestAnimationFrame ||
  var animate =  function(callback) { window.setTimeout(callback, 1000/30) };
  var canvas =  document.createElement('canvas');
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
    // $.post("/step", function(){});
    // PrivatePub.subscribe("/step", function() {
      animate(step);
    // });
      
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

  Paddle.prototype.reset = function() {
    this.y = 180;
    this.y_speed = 0;
  }

  Paddle.prototype.render = function() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if(this.x == 10){
      ctx.font="30px Arial";
      ctx.fillText(this.score, 150, 30);
    } else{
      ctx.font="30px Arial";
      ctx.fillText(this.score, 430, 30);
    }
    
  };

  Paddle.prototype.update = function() {
    if ((this.y_speed < 0 && this.y == 0) || (this.y_speed > 0 && this.y == 350)) {
      this.y_speed = 0;
    }

    this.y += this.y_speed;
    this.y_speed = 0;
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
      $.post("/reset", function(){});
      PrivatePub.subscribe("/reset", function() {
        paddle2.score++;
        paddle1.reset();
        paddle2.reset();
      });
    } else if(this.x > 598) {
      this.reset(300,200);
      $.post("/reset", function(){});
      PrivatePub.subscribe("/reset", function() {
        paddle1.score++;
        paddle1.reset();
        paddle2.reset();
      });
    }
    // Check for not full collision
    else if(this.x + this.x_speed < paddle1.x && this.x > paddle1.x && this.x_speed < 0 && this.y >= paddle1.y && this.y <= paddle1.y+paddle1.height) {
      // this.x = paddle1.x+10;
      this.collision(paddle1.x+10, this.y, this.x_speed, this.y_speed);
    } else if(this.x + this.x_speed > paddle2.x && this.x < paddle2.x && this.x_speed > 0 && this.y >= paddle2.y && this.y <= paddle2.y+paddle2.height) {
      // this.x = paddle2.x-5;
      this.collision(paddle2.x-5, this.y, this.x_speed, this.y_speed);
    } else {
      this.x += this.x_speed;
      this.y += this.y_speed;
    }

    // Check paddle collision
    if(this.x-10 == paddle1.x && this.y >= paddle1.y && this.y <= paddle1.y+(paddle1.height/4)) {
      // this.x_speed = this.x_speed * -1;
      this.collision(this.x, this.y, this.x_speed * -1, this.y_speed);
      if(this.y_speed > -10){
        // this.y_speed -= 2;
        this.collision(this.x, this.y, this.x_speed, this.y_speed-2);
      }
    } else if(this.x-10 == paddle1.x && this.y >= paddle1.y+(paddle1.height/4) && this.y <= paddle1.y+paddle1.height/2) {
      // this.x_speed = this.x_speed * -1;
      this.collision(this.x, this.y, this.x_speed * -1, this.y_speed);
      if(this.y_speed > -10){
        // this.y_speed -= 1;
        this.collision(this.x, this.y, this.x_speed, this.y_speed-1);
      }
    } else if(this.x-10 == paddle1.x && this.y >= paddle1.y+(paddle1.height/2) && this.y <= paddle1.y+paddle1.height*3/4) {
      // this.x_speed = this.x_speed * -1;
      this.collision(this.x, this.y, this.x_speed * -1, this.y_speed);
      if(this.y_speed < 10){
        // this.y_speed += 1;
        this.collision(this.x, this.y, this.x_speed, this.y_speed+1);
      }
    } else if(this.x-10 == paddle1.x && this.y >= paddle1.y+(paddle1.height*3/4) && this.y <= paddle1.y+paddle1.height) {
      // this.x_speed = this.x_speed * -1;
      this.collision(this.x, this.y, this.x_speed * -1, this.y_speed);
      if(this.y_speed < 10){
        // this.y_speed += 2;
        this.collision(this.x, this.y, this.x_speed, this.y_speed+2);
      }
    } else if (this.x+5 == paddle2.x && this.y >= paddle2.y && this.y <= paddle2.y+(paddle2.height/4)) {
      // this.x_speed = this.x_speed * -1;
      this.collision(this.x, this.y, this.x_speed * -1, this.y_speed);
      if(this.y_speed > -10){
        // this.y_speed -= 2;
        this.collision(this.x, this.y, this.x_speed, this.y_speed-2);
      }
    } else if (this.x+5 == paddle2.x && this.y >= paddle2.y+(paddle2.height/4) && this.y <= paddle2.y+paddle2.height/2) {
      // this.x_speed = this.x_speed * -1;
      this.collision(this.x, this.y, this.x_speed * -1, this.y_speed);
      if(this.y_speed > -10){
        // this.y_speed -= 1;
        this.collision(this.x, this.y, this.x_speed, this.y_speed-1);
      }
    } else if (this.x+5 == paddle2.x && this.y >= paddle2.y+(paddle2.height/2) && this.y <= paddle2.y+paddle2.height*3/4) {
      // this.x_speed = this.x_speed * -1;
      this.collision(this.x, this.y, this.x_speed * -1, this.y_speed);
      if(this.y_speed < 10){
        // this.y_speed += 1;
        this.collision(this.x, this.y, this.x_speed, this.y_speed+1);
      }
    } else if (this.x+5 == paddle2.x && this.y >= paddle2.y+(paddle2.height*3/4) && this.y <= paddle2.y+paddle2.height) {
      // this.x_speed = this.x_speed * -1;
      this.collision(this.x, this.y, this.x_speed * -1, this.y_speed);
      if(this.y_speed < 10){
        // this.y_speed += 2;
        this.collision(this.x, this.y, this.x_speed, this.y_speed+2);
      }
    }

    // Check Wall collision
    if(this.y <=0){
      // this.y = 0;
      // this.y_speed = this.y_speed * -1;
      this.collision(this.x, 0, this.x_speed, this.y_speed * -1);
    } else if(this.y >= 395){
      // this.y = 395;
      // this.y_speed = this.y_speed * -1;
      this.collision(this.x, 395, this.x_speed, this.y_speed * -1);
    }
    // console.log(this.y_speed);
  };

  Ball.prototype.collision = function(ballX, ballY, ballXSpeed, ballYSpeed) {
    $.post("/collision", function({ballX: ballX, ballY: ballY, ballXSpeed: ballXSpeed, ballYSpeed: ballYSpeed}){});
    PrivatePub.subscribe("/collision", function(data) {
      ball.x = data.ballX;
      ball.y = data.ballY;
      ball.x_speed = data.ballXSpeed;
      ball.y_speed = data.ballYSpeed;
    });
  } 

  $('#message_content, #player-name').on('keydown', function(e) {
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

  $('#p1select').on('click', function(){
    $('#p2select').prop("disabled",true);
    $(document).on('keyup', function(e){
      var code = e.which;
      if(code == 38) {
        $.post("/p1up", function(){});
      } else if(code == 40) {
        $.post("/p1down", function(){});
      }
    });
  });
  
  PrivatePub.subscribe("/p1up", function() {
    if(paddle1.y > 0) {
      paddle1.y_speed = -20;
    }
  });

  PrivatePub.subscribe("/p1down", function() {
    if(paddle1.y < 350) {
      paddle1.y_speed = 20;
    }
  });

  $('#p2select').on('click', function(){
    $('#p1select').prop("disabled",true);
    $(document).on('keyup', function(e){
      e.preventDefault();
      var code = e.which;
      if(code == 38) {
        $.post("/p2up", function(){});
      } else if(code == 40) {
        $.post("/p2down", function(){});
      }
    });
  });

  PrivatePub.subscribe("/p2up", function() {
    if(paddle2.y > 0) {
      paddle2.y_speed = -20;
    }
  });

  PrivatePub.subscribe("/p2down", function() {
    if(paddle2.y < 350) {
      paddle2.y_speed = 20;
    }
  });

  PrivatePub.subscribe("/space", function(data) {
    ball.x_speed = data.x;
    ball.y_speed = data.y;
  });

  $('#pong').append(canvas);
  ctx.font="35px Arial";
  ctx.fillText("Welcome to Trash Talking Pong!", 65, 200);

  PrivatePub.subscribe("/start", function() {
    if (p1select && p2select) { 
      $(document).on('keydown', function(e){
        e.preventDefault();
        var code = e.which;
        if(code == 32) {
          $.post("/space", function(){});
        }
      });
      animate(step);
    }
  });

  PrivatePub.subscribe("/p1select", function(){
    $('#p1select').hide();
    p1select = true;
  });

  PrivatePub.subscribe("/p2select", function(){
    $('#p2select').hide();
    p2select = true;
  });

})


