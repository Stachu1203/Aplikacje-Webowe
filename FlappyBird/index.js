//board

let board;
let boardWidth = 288;
let boardHeight = 512;
let context;

let gameOverImg = new Image();
gameOverImg.src = "./assets/UI/gameover.png";

let startImg = new Image(); 
startImg.src = "./assets/UI/message.png";


//bird

let birdWidth = 25.5;
let birdHeight = 18;
let birdX = boardWidth/8
let birdY = boardHeight/2;
let birdImages = [];
let birdFrame = 0;
let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

//pipe

let pipeArray = [];
let pipeWidth = 60;
let pipeHeight = 430;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//phisics

let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;

//points
let gameStarted = false;
let gameOver = false;
let score = 0;
let last5scores = [];
let bestScore = 0;

//sound

let jumpSound = new Audio("./assets/Sound_Efects/wing.wav");
let scoreSound = new Audio("./assets/Sound_Efects/point.wav");
let hitSound = new Audio("./assets/Sound_Efects/hit.wav");

let pipeIntervalId = null;

window.onload =  function() {
    board =  this.document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context= board.getContext("2d");

    // birdImg = new Image();
    // birdImg.src = "./assets/Flappy_Bird/yellowbird-midflap.png"
    // birdImg.onload = function(){
    //     context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height)
    // }

    const birdImgPaths = ["./assets/Flappy_Bird/yellowbird-downflap.png","./assets/Flappy_Bird/yellowbird-midflap.png","./assets/Flappy_Bird/yellowbird-upflap.png"];

    for (let i = 0; i < 3; i++) {
        let img = new Image();
        img.src = birdImgPaths[i];
        birdImages.push(img);
    }

    topPipeImg =  new Image();
    topPipeImg.src = "./assets/Flappy_Bird/pipe-green-bottom.png"; 

    bottomPipeImg =  new Image();
    bottomPipeImg.src = "./assets/Flappy_Bird/pipe-green.png" ;



    requestAnimationFrame(update);
    startPipeCycle();
    this.document.addEventListener("keydown", moveBird);
}

  function update() {



        requestAnimationFrame(update);
        if (!gameStarted) {
        
   
        let startWidth = 184; 
        let startHeight = 267;
        let startX = (boardWidth - startWidth) / 2;
        let startY = (boardHeight - startHeight) / 2;
        
        context.drawImage(startImg, startX, startY, startWidth, startHeight);
        return; 
    }

         if(gameOver){
            let imgX = (boardWidth - gameOverImg.width) / 2;
            context.drawImage(gameOverImg, imgX, 90);
        
        context.fillStyle = "white";
        context.font = "45px sanserif";
        context.textAlign= "center";
        
        context.fillText("Score: " + score, boardWidth/2, 230);
        
    
        context.fillText("Best: " + bestScore, boardWidth/2, 190); 
         context.fillStyle = "red";
         context.font = "20px sanserif";
        context.fillText("To play new Game",boardWidth/2, 290);
        context.fillText("Tap 'space'",boardWidth/2, 320);
        
        return; 
         
        }       
        context.clearRect(0,0, board.width, board.height);

        

        velocityY += gravity;
        bird.y = Math.max(bird.y+velocityY,0);


        birdFrame++;
        let birdIndex = Math.floor(birdFrame / 5) % 3;

        if (birdImages.length === 3) {
            let currentBirdImg = birdImages[birdIndex]; 
            

            context.save();

            let centerX = bird.x + bird.width / 2;
            let centerY = bird.y + bird.height / 2;
            context.translate(centerX, centerY);

            
            let angle = 0;
            if (velocityY < 0) {
                angle = -25 * Math.PI / 180; 
            } else if (velocityY > 0) {
                angle = 25 * Math.PI / 180;  
            }
            context.rotate(angle);

            
            if (currentBirdImg && currentBirdImg.complete) {
                context.drawImage(currentBirdImg, -bird.width / 2, -bird.height / 2, bird.width, bird.height);
            }

           
            context.restore();
            
        }

        if(bird.y > board.height){
            hitSound.currentTime = 0; 
            hitSound.play();
            handleGameOver();
        }


        for( let i=0; i < pipeArray.length; i++){
            let pipe= pipeArray[i];
            pipe.x += velocityX;
            context.drawImage(pipe.img, pipe.x,pipe.y,pipe.width,pipe.height);

            if(!pipe.passed && bird.x > pipe.x + pipe.width){
                score+=0.5;
                scoreSound.currentTime = 0; 
                scoreSound.play();
                pipe.passed= true;
            }

            if(detectCollision(bird, pipe)){
                hitSound.currentTime = 0; 
                hitSound.play();
                handleGameOver();
                
            }
        }

        while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
            pipeArray.shift();
        }



        context.fillStyle = "white";
        context.font = "45px sanserif";
        context.fillText(score,250,45);

        // if(gameOver){
        //     last5scores.push(score);
        //     if(bestScore<score){
        //         bestScore = score;
        //     }
        //     context.drawImage(gameOverImg,45, 90);
        //     context.fillStyle = "white";
        //     context.font = "45px sanserif";
        //     context.filltext(bestScore,45, 190);
        // }

    }

    function placePipes(){
        if(gameOver || !gameStarted){
            return;
        }
        let randomPipeY= pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
        let openingSpace = board.height/4;

        let topPipe = {
            img: topPipeImg,
            x: pipeX,
            y: randomPipeY,
            width: pipeWidth,
            height: pipeHeight,
            passed: false
        }
        
        pipeArray.push(topPipe);

        let bottomPipe = {
            img: bottomPipeImg,
            x: pipeX,
            y: randomPipeY + pipeHeight + openingSpace,
            width: pipeWidth,
            height: pipeHeight,
            passed: false
        }

        pipeArray.push(bottomPipe);
    }

    function moveBird(e) {
        if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX"){
            velocityY = -6;
            if (!gameStarted) {
            gameStarted = true;
            velocityY = -6; 
            jumpSound.play();
            return;
        }
        }

        jumpSound.currentTime = 0;
        jumpSound.play();

        if(gameOver){
            bird.y= birdY;
            pipeArray = [];
            score = 0;
            startPipeCycle();
            gameOver = false;
        }
    }

    function detectCollision(a,b){
        return a.x<b.x +b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    }

    function handleGameOver() {
    if (gameOver) return; 
    gameOver = true;


    if (pipeIntervalId !== null) {
        clearInterval(pipeIntervalId);
        pipeIntervalId = null;
    }

    
    if (score > bestScore) {
        bestScore = score;
    }
    
    last5scores.push(score);
    localStorage.setItem("lastScore",String(score));

    if (last5scores.length > 5) {
        last5scores.shift();
    }
    
    if (last5scores.length > 5) {
        last5scores.shift();
    }
    
    console.log("Historia wyników:", last5scores);
}

function startPipeCycle() {
  
    const CHECK_INTERVAL = 100; 
    
    let timeSinceLastPipe = 0;
    let nextPipeGap = Math.floor(Math.random() * (3500 - 1000 + 1)) + 1000;
    
    if (pipeIntervalId !== null) {
        clearInterval(pipeIntervalId);
    }
    
    pipeIntervalId = setInterval(() => {
        if (gameOver || !gameStarted) {
            return;
        }

        timeSinceLastPipe += CHECK_INTERVAL;

        if (timeSinceLastPipe >= nextPipeGap) {
            placePipes();
            
            timeSinceLastPipe = 0;
            nextPipeGap = Math.floor(Math.random() * (1500 - 1000 + 1)) + 1000;
        }
    }, CHECK_INTERVAL);
}