//Stufe 2 - mittel
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const square = {
   x: 40,
   y: 40,
   size: 20,
   dx: 0,
   dy: 0,
};

const img = new Image();
img.src = "resource/images/snake-body.png";

let isMoving = true;

function drawImage() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.drawImage(img, square.x, square.y, square.size, square.size);
}

function movingSnake() {
   if (isMoving) {
      square.x = (square.dx + square.x) % canvas.width;
      square.y = (square.dy + square.y) % canvas.height;

      if (square.x < 0) {
         square.x = canvas.width - square.size;
      }
      if (square.y < 0) {
         square.y = canvas.height - square.size;
      }
   }
}

addEventListener("keydown", function (event) {
   if (event.key === "ArrowRight") {
      square.dx = 20;
      square.dy = 0;
   } else if (event.key === "ArrowLeft") {
      square.dx = -20;
      square.dy = 0;
   } else if (event.key === "ArrowUp") {
      square.dy = -20;
      square.dx = 0;
   } else if (event.key === "ArrowDown") {
      square.dy = 20;
      square.dx = 0;
   }
});

function gameLoop() {
   movingSnake();
   drawImage();
}

img.onload = function () {
   setInterval(gameLoop, 500);
};
