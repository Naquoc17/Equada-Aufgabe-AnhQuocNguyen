//Stufe 1 - leicht
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const square = {
   x: 40,
   y: 40,
   size: 20,
   dx: 0,
   dy: 0,
};

function moveSquare() {
   square.x = (square.x + 20) % canvas.width;
}

function gameLoop() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   moveSquare();
   ctx.fillStyle = "red";
   ctx.fillRect(square.x, square.y, square.size, square.size);
}

setInterval(gameLoop, 500);
