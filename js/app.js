//paddle1 object
var paddle1 = {
    x: 20, y: 120,
    width: 15, height: 55,
    color: [214, 59, 39],
    velocity: 7
};

//paddle2 object
var paddle2 = {
    x: 365, y: 120, 
    width: 15, height: 55,
    color: [214, 59, 39],
    velocity: 7
};

//ball object with random positive and negative velocity values 
var ball = {
    x: 200, y: 150, 
    size: 15,
    color: [66, 135, 245],
    velocityX:  Math.floor((Math.random() * 10) - 5), velocityY: Math.floor((Math.random() * 10) - 5)
};

//initial player scores
var player1Score = 0;
var player2Score = 0;


//reset function
function reset() {
    ball.x = 200;
    ball.y = 150;
    ball.velocityX = Math.floor((Math.random() * 10) - 5);
    ball.velocityY = Math.floor((Math.random() * 10) - 5);
    paddle1.x = 20;
    paddle1.y = 120;
    paddle2.x = 365;
    paddle2.y = 120;
}

//setup function
function setup() {
    createCanvas(400, 300);
}

//draw function
function draw() {
    //clear background
    background(0);

    //draw paddle1
    noStroke();
    fill(paddle1.color);
    rect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    //draw paddle2
    noStroke();
    fill(paddle2.color);
    rect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    //draw ball
    noStroke();
    fill(ball.color);
    circle(ball.x, ball.y, ball.size)

    
    //changing velocity values so that only +3, +4, +5 or -3, -4, -5 are used
    if(ball.velocityX == 0 || ball.velocityX == 1 || ball.velocityX == 2) {
        ball.velocityX += 3;
    }

    if(ball.velocityX == -1 || ball.velocityX == -2) {
        ball.velocityX -= 3;
    }

    if(ball.velocityY == 0 || ball.velocityY == 1 || ball.velocityY == 2) {
        ball.velocityY += 3;
    }

    if(ball.velocityY == -1 || ball.velocityY == -2) {
        ball.velocityY -= 3;
    }

    
    //move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;



    //move paddle1 
    if(keyIsDown('83')) {
        paddle1.y += paddle1.velocity;
    }

    if(keyIsDown('87')) {
        paddle1.y -= paddle1.velocity;
    }



    //move paddle2 
    if(keyIsDown(DOWN_ARROW)) {
        paddle2.y += paddle2.velocity;
    }

    if(keyIsDown(UP_ARROW)) {
        paddle2.y -= paddle2.velocity;
    }


    //bounce ball off top and bottom
    if(ball.y < 0 || ball.y > 300) {
        ball.velocityY *= -1;
    }


    //reset original positions and give paddle2 points
    if(ball.x < 0) {
        reset();
        player2Score++;
    }

    //reset original positions and give paddle1 points
    if(ball.x > 400) {
        reset();
        player1Score++;
    }

    //bounce ball off paddle1 
    var isHittingPaddle1 = isPointOverlapping(ball.x, ball.y, paddle1.x, paddle1.y, paddle1.width, paddle1.height)
    if(isHittingPaddle1){
        ball.velocityX *= -1;
    }

    //bounce ball off paddle2 
    var isHittingPaddle2 = isPointOverlapping(ball.x, ball.y, paddle2.x, paddle2.y, paddle2.width, paddle2.height)
    if(isHittingPaddle2){
        ball.velocityX *= -1;
    }

    //display paddle1 score
    fill(255, 255, 255);
    textSize(16);
    text("Score: " + player1Score, 8, 25);

    //display paddle1 directions
    fill(255, 255, 255);
    textSize(10);
    text("W / S keys", 8, 35);


    //display paddle2 score
    fill(255, 255, 255);
    textSize(16);
    text("Score: " + player2Score, 315, 25);

    //display paddle2 directions
    fill(255, 255, 255);
    textSize(10);
    text("UP / DOWN keys", 315, 35);
}

//collision test function
function isPointOverlapping(pointX, pointY, boxX, boxY, boxWidth, boxHeight) {
    //assume no hit
    var hitDetected = false;

    //check for hit
    if( (pointX > boxX) && (pointY > boxY) ){
        if( (pointX < boxX + boxWidth) && (pointY < boxY + boxHeight) ){
            //change to "true" if hitting
            hitDetected = true;
        }
    }
    //return if hitting or not
    return hitDetected;
}