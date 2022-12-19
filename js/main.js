const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class parteCorpo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

var pickFood = document.getElementById("pickFood"); 

let velocidade = 7;
let quadrados = 20;

let tamanhoQuadrados = canvas.clientWidth / quadrados - 2;
let cabecaX = 10;
let cabecaY = 10;

const partesCorpo = [];
let tamanhoCalda = 2;

let velocidadeX = 0;
let velocidadeY = 0;

let macaX = 5;
let macaY = 5;

let pontos = 0;
let aceleraJogo = 10;
let quantAcelera = 10;

function resetGame() {
    window.location = window.location.href;
}

function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }
    limparTela();
    drawSnake();
    drawApple();

    checkCollision()
    drawpontos();
    setTimeout(drawGame, 1000 / velocidade);
}


function isGameOver() {
    let gameOver = false;
    if (velocidadeY === 0 && velocidadeX === 0) {
        return false;
    }
    if (cabecaX < 0) {
        gameOver = true;
    }
    else if (cabecaX === quadrados) {
        gameOver = true;
    }
    else if (cabecaY < 0) {
        gameOver = true;
    }
    else if (cabecaY === quadrados) {
        gameOver = true;
    }

    for (let i = 0; i < partesCorpo.length; i++) {
        let part = partesCorpo[i];
        if (part.x === cabecaX && part.y === cabecaY) {
            gameOver = true;
            break;
        }
    }



    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px verdana";
        ctx.fillText("Fim de Jogo! ", canvas.clientWidth / 6.5, canvas.clientHeight / 2);
    }

    return gameOver;
}

function drawpontos() {
    ctx.fillStyle = "white"
    ctx.font = "10px verdena"
    ctx.fillText("pontos: " + pontos, canvas.clientWidth - 50, 10);

}


function limparTela() {

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)

}
function drawSnake() {

    ctx.fillStyle = "white";
    for (let i = 0; i < partesCorpo.length; i++) {
        let part = partesCorpo[i]
        ctx.fillRect(part.x * quadrados, part.y * quadrados, tamanhoQuadrados, tamanhoQuadrados)
    }
    partesCorpo.push(new parteCorpo(cabecaX, cabecaY));
    if (partesCorpo.length > tamanhoCalda) {
        partesCorpo.shift();
    }
    ctx.fillStyle = "grey";
    ctx.fillRect(cabecaX * quadrados, cabecaY * quadrados, tamanhoQuadrados, tamanhoQuadrados)


}
function changeSnakePosition() {
    cabecaX = cabecaX + velocidadeX;
    cabecaY = cabecaY + velocidadeY;

}
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(macaX * quadrados, macaY * quadrados, tamanhoQuadrados, tamanhoQuadrados)
}
function checkCollision() {
    if (macaX == cabecaX && macaY == cabecaY) {
        macaX = Math.floor(Math.random() * quadrados);
        macaY = Math.floor(Math.random() * quadrados);
        tamanhoCalda++;
        pickFood.play();
        pontos++;
        if (aceleraJogo == pontos) {
            aceleraJogo += quantAcelera;
            velocidade += 1;
        }
    }
}


document.body.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp" || event.key == "w") {
        if (velocidadeY == 1)
            return;
        velocidadeY = -1;
        velocidadeX = 0;

    }
    if (event.key == "ArrowDown" || event.key == "s") {
        if (velocidadeY == -1)
            return;
        velocidadeY = 1;
        velocidadeX = 0;
    }
    if (event.key == "ArrowLeft" || event.key == "a") {
        if (velocidadeX == 1)
            return;
        velocidadeY = 0;
        velocidadeX = -1;
    }
    if (event.key == "ArrowRight" || event.key == "d") {
        if (velocidadeX == -1)
            return;
        velocidadeY = 0;
        velocidadeX = 1;
    }
}, true);

drawGame();

function easy() {
    aceleraJogo = 20;
    quantAcelera = 20;
}

function hard() {
    aceleraJogo = 10;
    quantAcelera = 15;
}

function impossible() {
    aceleraJogo = 5;
    quantAcelera = 1;
}