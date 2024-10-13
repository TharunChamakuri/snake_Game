let direction = {x:0,y:0};
const box = document.querySelector(".box");
const gameOver = new Audio("gameOver.wav");
const hitfood = new Audio("hit.mp3");
let scoreBox = document.querySelector(".score");
let snakeImg = document.querySelector(".snakeimg img");
let lasttime = 0;
let speed = 3;
let score = 0;
let snakeArr = [
    {x:11,y:10}
];
food = {x:6,y:13};

function main(currtime) {
    window.requestAnimationFrame(main);
    if((currtime - lasttime)/1000 < 1/speed) {
        return;
    } 
    lasttime = currtime;
    gameWorking();
}
function gameWorking() {
    //reset
    function resetGame() {
        gameOver.play();
        snakeImg.src = "angrySnake.png";
        snakeArr[0].x = 11;
        snakeArr[0].y = 10;
        food.x = 6;
        food.y = 13;
        score = 0;
        direction = {x:0,y:0};
        scoreBox.innerHTML = `score: ${score}`;
        return;
    }
    //colloide
    if(snakeArr[0].x > 20 || snakeArr[0].y > 20 ||snakeArr[0].x < 0 || snakeArr[0].y < 0) {
        resetGame();
    }
    for(let i = 1 ; i < snakeArr.length ; i++) {
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            console.log(snakeArr[i].x , snakeArr[0].x);
            console.log(snakeArr[i].y , snakeArr[0].y);
            resetGame();
        }
    }
    //eating food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        scoreBox.innerHTML = `score: ${++score}`;
        hitfood.play();
        snakeArr.unshift({x:snakeArr[0].x + direction.x,y:snakeArr[0].y + direction.y});
        let a = 6;
        let b = 15;
        food = {x:Math.round(a + (b - a)* Math.random()),y:Math.round(a + (b - a)* Math.random())};
        if(score % 5 == 0) {
            speed += 0.5;
        }
    }
    else {
        //moving snake
        for(let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = {...snakeArr[i]};
        }
        snakeArr[0].x += direction.x;
        snakeArr[0].y += direction.y;
    }
    
    //showing snake and food
    box.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0) {
            snakeElement.classList.add('head');

        }
        else {
            snakeElement.classList.add('body');
            console.log(e);
        }
        box.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);

}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    direction = {x:0,y:1};
    switch(e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            break;
    }
});