"use strict"

let flag = "rat-flag";

let counter = 9;

const squares = document.getElementsByClassName("square");

const squaresArray = Array.from(squares);

const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//NewGame button
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

const msgtxt1 = '<p class="image"><img src = "img/rat.jpg" width=61px height=61px></p><p class="text">Rat Attack!(your turn)</p>';
const msgtxt2 = '<p class="image"><img src = "img/snake.jpg" width=61px height=61px></p><p class="text">Snake Attack!(computer turn)</p>';
const msgtxt3 = '<p class="image"><img src = "img/rat.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Rat Win!!</p>';
const msgtxt4 = '<p class="image"><img src = "img/snake.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">Snake Win!!</p>';
const msgtxt5 = '<p class="image"><img src = "img/rat.jpg" width=61px height=61px><img src = "img/snake.jpg" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>';

//sound
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/rat_sound.mp3", "sound/snake_sound.mp3", "sound/draw_sound.mp3"];

window.addEventListener("DOMContentLoaded",
    function(){
        setMessage("rat-turn");

        squaresArray.forEach((square)=>{
            square.classList.add("js-clickable");
        })
    },false
);

function JudgLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}
// a_1.addEventListener("click",
//     function(){
//         isSelect(a_1);
//     },false
// );
// a_2.addEventListener("click", () =>{
//     isSelect(a_2);
// });
// a_3.addEventListener("click", () =>{
//     isSelect(a_3);
// });
// b_1.addEventListener("click", () =>{
//     isSelect(b_1);
// });
// b_2.addEventListener("click", () =>{
//     isSelect(b_2);
// });
// b_3.addEventListener("click", () =>{
//     isSelect(b_3);
// });
// c_1.addEventListener("click", () =>{
//     isSelect(c_1);
// });
// c_2.addEventListener("click", () =>{
//     isSelect(c_2);
// });
// c_3.addEventListener("click", () =>{
//     isSelect(c_3);
// });

squaresArray.forEach(function(square){
    square.addEventListener('click',() =>{
        let gameOverFlg = isSelect(square);
        if(gameOverFlg === "0"){
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function(){
                    snakeTurn();
                },
                "2000"
            );
        }
    });
});

function isSelect(selectSquare){
    let gameOverFlg = "0";
    if(flag === "rat-flag"){
        //click sound
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-rat-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
        //rats win
        if(isWinner("rats")){
            setMessage("rat-win");
            gameOver("rats");
            return gameOverFlg = "1";
        }
        setMessage("snake-turn");
        flag = "snake-flag";
    } else {
        //click sound
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-snake-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
        //snake win
        if(isWinner("snakes")){
            setMessage("snake-win");
            gameOver("snakes");
            return gameOverFlg = "1";
        }
        setMessage("rat-turn");
        flag = "rat-flag";
    }
    counter--;

    if(counter === 0){
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }
    return gameOverFlg = "0";
}

function isWinner(symbol){
    const result = lineArray.some(function(line){
        const subResult = line.every(function(square){
            if(symbol === "rats"){
                return square.classList.contains("js-rat-checked");
            }
            if(symbol === "snakes"){
                return square.classList.contains("js-snake-checked");
            }
        });
        if(subResult){winningLine = line}

        return subResult;
    });
    return result;
}

function setMessage(id){
    switch(id){
        case "rat-turn":
            document.getElementById("msgtext").innerHTML=msgtxt1;
            break;
        case "snake-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;
            break;
        case "rat-win":
            document.getElementById("msgtext").innerHTML=msgtxt3;
            break;
        case "snake-win":
            document.getElementById("msgtext").innerHTML=msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML=msgtxt5;
            break;
        default:
            document.getElementById("msgtext").innerHTML=msgtxt1;
    }
}

function gameOver(status){
    //gameover sound
    let w_sound
    switch (status){
        case "rats":
            w_sound = gameSound[2];
            break;
        case "snakes":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();

    //all square unclickable
    // squaresArray.forEach(function(square){
    //     square.classList.add("js-unclickable");
    // });
    squaresBox.classList.add("js-unclickable");

    //display new game button display
    newgamebtn_display.classList.remove("js-hidden");

    if(status==="rats"){
        //winner-line rats high-light
        if(winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-rat_highLight");
            });
        }
        //rat win! --> snow color is pink
        $(document).snowfall({
            flakeColor : "rgb(255,240,245)",
            maxSpeed : 3,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true
        });

    }else if(status==="snakes"){
        //winner-line snakes high-light
        if(winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-snake_highLight");
            });
        }
        //snake win! --> snow color is blue
        $(document).snowfall({
            flakeColor : "rgb(175,238,238)",
            maxSpeed : 3,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true
        });
    }
}

newgamebtn.addEventListener("click",function(){
    flag = "rat-flag";
    counter = 9;

    winningLine = null;
    squaresArray.forEach(function(square){
        square.classList.remove("js-rat-checked");
        square.classList.remove("js-snake-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-rat_highLight");
        square.classList.remove("js-snake_highLight");
        square.classList.add("js-clickable");
    });
    squaresBox.classList.remove("js-unclickable");

    setMessage("rat-turn");
    newgamebtn_display.classList.add("js-hidden");
    $(document).snowfall("clear");
});

function snakeTurn(){
    let snakeTurnEnd = "0";
    let  gameOverFlg = "0";

    while(snakeTurnEnd === "0"){
        snakeTurnEnd = isReach("snake");
        if(snakeTurnEnd === "1"){
            gameOverFlg = "1";
            break;
        }
        snakeTurnEnd = isReach("rats");
        if(snakeTurnEnd === "1"){
            break;
        }
    const snakeSquare =  squaresArray.filter(function(square){
       return square.classList.contains("js-clickable");
    });
    let n = Math.floor(Math.random() * snakeSquare.length);
    gameOverFlg =  isSelect(snakeSquare[n]);
    break;

    }

    if (gameOverFlg === "0"){
        squaresBox.classList.remove("js-unclickable");
    }
}

function isReach(status){
    let snakeTurnEnd = "0";

    lineArray.some(function(line){
        let snakeCheckCnt = 0;
        let ratCheckCnt = 0;

        line.forEach(function(square){
            square.classList.contains("js-snake-checked");
            counter = "bearCheckCnt";
            square.classList.contains("js-rat-checked");
            counter = "penCheckCnt";
        });

        if (status === "snake" && snakeCheckCnt === 2 && ratCheckCnt === 0){
            snakeTurnEnd = "1";
        }

        if(status === "rat" && snakeCheckCnt === 0 && ratCheckCnt === 2){
            snakeTurnEnd = "1";
        }
        if(snakeTurnEnd = "1"){
            line.some(function (square){
                square.classList.contains("js-clickable");
                isSelect(square);
                return;
            });
        }
    });
}