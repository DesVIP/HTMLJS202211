var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var timer = requestAnimationFrame(main);
var gameOver = true;
var score = 0;
var highScore = 0;
var currentState = 0;
var gameState = [];

//asteroid variables
var numAsteroids = 20;
var asteroids = [];

//Playeer Ship variables
var ship = new PlayerShip();

//create keyboard event handlers
document.addEventListener("keydown", pressKeyDown);
document.addEventListener("keyup", pressKeyUp);

function pressKeyDown(e) {
    if (!gameOver) {
        if (e.keyCode == 87) {
            //code for up W
            ship.up = true;
        }
        if (e.keyCode == 65) {
            //code for left A
            ship.left = true;
        }
        if (e.keyCode == 68) {
            //code for right D
            ship.right = true;
        }
        if (e.keyCode == 83) {
            //code for down S
            ship.down = true;
        }
        if (e.keyCode == 38) {
            //code for up up
            ship.up = true;
        }
        if (e.keyCode == 37) {
            //code for left left
            ship.left = true;
        }
        if (e.keyCode == 39) {
            //code for right right
            ship.right = true;
        }
        if (e.keyCode == 40) {
            //code for down down
            ship.down = true;
        }
    }


    if (e.keyCode == 87) {
        //code for up W
        ship.up = true;
    }
    if (e.keyCode == 65) {
        //code for left A
        ship.left = true;
    }
    if (e.keyCode == 68) {
        //code for right D
        ship.right = true;
    }
    if (e.keyCode == 83) {
        //code for down S
        ship.down = true;
    }
    if (e.keyCode == 38) {
        //code for up up
        ship.up = true;
    }
    if (e.keyCode == 37) {
        //code for left left
        ship.left = true;
    }
    if (e.keyCode == 39) {
        //code for right right
        ship.right = true;
    }
    if (e.keyCode == 40) {
        //code for down down
        ship.down = true;
    }
    //Menu imputs use spacebar
    if(gameOver){
        if(e.keyCode == 32){
           if(currentState ==2){
            //game over imputs
            currentState = 0;
            numAsteroids = 20;
            asteroids = [];
            score = 0;
            //start game here
            main();
            //gameStart();
         

           }else{
            //main menu imputs
            gameStart();
            currentState = 1;
            gameOver = false;
            main();
            scoreTimer();
           }


            
        }
    }
}

function pressKeyUp(e) {
    if (!gameOver) {
        if (e.keyCode == 87) {
            //code for up W
            ship.up = false;
        }
        if (e.keyCode == 65) {
            //code for left A
            ship.left = false;
        }
        if (e.keyCode == 68) {
            //code for right D
            ship.right = false;
        }
        if (e.keyCode == 83) {
            //code for up down S
            ship.down = false;
        }
        if (e.keyCode == 38) {
            //code for up up
            ship.up = false;
        }
        if (e.keyCode == 37) {
            //code for left left
            ship.left = false;
        }
        if (e.keyCode == 39) {
            //code for right right
            ship.right = false;
        }
        if (e.keyCode == 40) {
            //code for down down
            ship.down = false;
        }
    }
    if (e.keyCode == 87) {
        //code for up W
        ship.up = false;
    }
    if (e.keyCode == 65) {
        //code for left A
        ship.left = false;
    }
    if (e.keyCode == 68) {
        //code for right D
        ship.right = false;
    }
    if (e.keyCode == 83) {
        //code for up down S
        ship.down = false;
    }
    if (e.keyCode == 38) {
        //code for up up
        ship.up = false;
    }
    if (e.keyCode == 37) {
        //code for left left
        ship.left = false;
    }
    if (e.keyCode == 39) {
        //code for right right
        ship.right = false;
    }
    if (e.keyCode == 40) {
        //code for down down
        ship.down = false;
    }
}

//Asteroid Class
function Asteroid() {
    //properties to draw the asteroid
    this.radius = randomRange(15, 2);
    this.x = randomRange(canvas.width - this.radius, this.radius);
    this.y = randomRange(canvas.height - this.radius, this.radius) - canvas.height;
    this.vy = randomRange(10, 5);
    this.color = "red";

    //methods (fuctions) to draw asteroid
    this.drawAsteroid = function () {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.y, this.x, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

function PlayerShip() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.width = 20;
    this.height = 20;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.vx = 0;
    this.vy = 0;
    this.flameLength = 30;

    this.drawShip = function () {
        ctx.save();
        ctx.translate(this.x, this.y);

        //draw the thruster 
        if(this.up || this.left || this.right){
            ctx.save();
            if(this.flameLength == 30){
                this.flameLength = 20;
                ctx.fillStyle = "blue";
            }else{
                this.flameLength = 30;
                ctx.fillStyle = "purple";
            }
            //draw the flame
            ctx.beginPath();
            ctx.moveTo(0, this.flameLength);
            ctx.lineTo(5, 5);
            ctx.lineTo(-5, 5);
            ctx.lineTo(0, this.flameLength);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        //draw the ship
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(10, -10);
        ctx.lineTo(-10, 10);
        ctx.lineTo(0, -10);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    this.moveShip = function () {
        this.x += this.vx;
        this.y += this.vy;

        //adding boundaries for the screen
        //bottom boundary
        if (this.y > canvas.height - this.height / 2) {
            this.y = canvas.height - this.height / 2;
            this.vy = 0;
        }

        //top boundary
        if (this.y < this.width / 2) {
            this.y = this.width / 2;
            this.vy = 0;

        }
        //right boundary
        if (this.x > canvas.width - this.width / 2) {
            this.x = canvas.width - this.width / 2;
            this.vx = 0;
        }

        //left boundary
        if (this.x < this.height / 2) {
            this.x = this.height / 2;
            this.vx = 0;
        }
    }
}
function main() {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw score to screen  
gameState[currentState]();
    if (!gameOver){
        //refresh the screen
        timer = requestAnimationFrame(main);
    }
}
//Game State Machine

//Main Menu State
gameState[0] = function(){
    //code for main menu
    ctx.save();
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Asteroid Avoider", canvas.width/2, canvas.height/2 - 30);
    ctx.font = "15px Arial";
    ctx.fillText("Press Space to Start", canvas.width/2, canvas.height/2 + 20);
    ctx.restore();
}
//Play Game State
gameState[1] = function(){
    //code for the asteroid game
    ctx.save();
    ctx.font = "15px Arial";
    ctx.fillStyle = "White";
    ctx.fillText("Score: " + score.toString(), canvas.width - 150, 30)
    ctx.restore();
    //verticle movement
    if (ship.up) {
        ship.vy = -10;
    } else {
        ship.vy = 3;
    }
    //horizontal movement
    if (ship.left) {
        ship.vx = -5;
    } else if (ship.right) {
        ship.vx = 5;
    } else {
        ship.vx = 0;
    }
    for (var i = 0; i < asteroids.length; i++) {
        var dX = ship.x - asteroids[i].x;
        var dY = ship.y - asteroids[i].y;
        var distance = Math.sqrt((dX * dX) + (dY * dY));
        //collision detection heppens here
        if (detectCollision(distance, (ship.height / 2 + asteroids[i].radius))) {
            //console.log("Hit Asteroid");
            //alert("hit asteroid");
            gameOver = true;
            currentState = 2;
            main()
            return;
        }
        if (asteroids[i].y > canvas.height + asteroids[i].radius) {
            asteroids[i].y = randomRange(canvas.height - asteroids[i].radius, asteroids[i].radius) - canvas.height;
            asteroids[i].x = randomRange(canvas.width - asteroids[i].radius, asteroids[i].radius);
        }
        asteroids[i].y += asteroids[i].vy;
        asteroids[i].drawAsteroid();
    }

    //draw the ship
    ship.moveShip();
    ship.drawShip();

    while(asteroids.length < numAsteroids){
        asteroids.push(new Asteroid());
    }
}

//Game Over State
gameState[2] = function(){
    //code for game over menu
    if(score > highScore){
        highScore = score;

        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = "blue";
        ctx.textAlign = "center";
        ctx.fillText("Game Over, Your Score was: " + score.toString(), canvas.width/2, canvas.height/2 - 60);
        ctx.fillText("Your New High Score is: " + highScore.toString(), canvas.width/2, canvas.height/2 - 30);
        ctx.fillText("New Record!", canvas.width/2, canvas.height/2);
        ctx.font = "15px Arial";
        ctx.fillText("Press Space to Play Again", canvas.width/2, canvas.height/2 + 20);
        ctx.restore();

    }else{
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = "blue";
        ctx.textAlign = "center";
        ctx.fillText("Game Over, Your Score was: " + score.toString(), canvas.width/2, canvas.height/2 - 60);
        ctx.fillText("Your Score is: " + highScore.toString(), canvas.width/2, canvas.height/2 - 30);
        ctx.font = "15px Arial";
        ctx.fillText("Press Space to Play Again", canvas.width/2, canvas.height/2 + 20);
        ctx.restore();
    }

    
}


//Utility fuctions
function gameStart(){
    //for loop to instantiate asteroids for game
    for (var i = 0; i < numAsteroids; i++) {
        asteroids[i] = new Asteroid();
    }
    
    ship = new PlayerShip();
}
function randomRange(high, low) {
    return Math.random() * (high - low) + low;
}

function detectCollision(distance, calcDistance) {
    return distance < calcDistance;
}

function scoreTimer(){
    if(!gameOver){
        score++;

        if(score % 5 == 0){
            numAsteroids += 5;
            console.log(numAsteroids);
        }
        //calls scoreTimer every second
        setTimeout(scoreTimer, 1000);
    }
}

