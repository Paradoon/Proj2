//Canvas
var canvas = document.getElementById("canvasArea");
//Canvas 2D
var ctx = canvas.getContext("2d");
//ball
var ballRadius = 10;
//paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = (canvas.height - paddleHeight) / 2;
//key controls
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
//position
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
//brick amounts
var brickRowCount = 1;
var brickColumnCount = 10;
//brick measures
var brickWidth = 75;
var brickHeight = 10;
var brickPadding = 5;
//brick position
var brickOffsetTop = 5;
var brickOffsetLeft = 1;
//Test
var wbrickRowCount = 1;
var wbrickColumnCount = 10;
var wbrickWidth = 10;
var wbrickHeight = 75;
var wbrickPadding = 5;
var wbrickOffsetTop = 15;
var wbrickOffsetLeft = 1;

//score and lives
let score = 0;
let lives = 3;
// startup


//Bricks loop
var bricks = [];
for (var c = 0; c < brickColumnCount && wbrickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount && wbrickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBricks() {
    //brick layer loop
    for (var c = 0; c < brickColumnCount && wbrickColumnCount; c++) {
        for (var r = 0; r < brickRowCount && wbrickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#616161";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//Game controls
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
    }
}


function collissionDetection() {
    //brick layer loop
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            //Checks status 1
            const b = bricks[c][r];
            if (b.status === 1) {
                //Checks status 0
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

//Drawing ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#780000";
    ctx.fill();
    ctx.closePath();
}

//Drawing paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

//Drawing score - font() size, fillStyle() color, fillText() visible text
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score}`, 8, 300);
}

//Drawing lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 300);
}

//Making the draws visibly
function draw() {
    //Makes the colors disappear
    ctx.clearRect (0, 0, canvas.width, canvas.height);
    //adds functions
    drawBall();
    drawPaddle();
    drawBricks();
    collissionDetection();
    drawScore();
    drawLives();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } 
        // If lives out, game over
        else {
            lives--;
            if(!lives) {
            alert("GAME OVER");
            document.location.reload();
        }
        else {
            x = canvas.width/2;
            y = canvas.height-30;
            // ballspeed
            dx = 2;
            dy = 2;
            paddleX = (canvas.width - paddleWidth) / 2;
        }
    }
}
    //Control movement
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 4;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 4;
    }
    if (upPressed && paddleY < canvas.height - paddleHeight) {
        paddleY += 4;
    }

    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);
