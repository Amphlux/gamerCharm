const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

let player = {
  x: 50,
  y: 300,
  width: 50,
  height: 50,
  color: 'red',
  dy: 0,
  gravity: 0.5,
  jumpPower: -10,
  grounded: false
};

let keys = {};

window.addEventListener('keydown', function(e) {
  keys[e.code] = true;
});

window.addEventListener('keyup', function(e) {
  keys[e.code] = false;
});

function update() {
  if (keys['ArrowLeft']) {
    player.x -= 5;
  }
  if (keys['ArrowRight']) {
    player.x += 5;
  }
  if (keys['Space'] && player.grounded) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }

  player.y += player.dy;
  if (player.y + player.height < canvas.height) {
    player.dy += player.gravity;
  } else {
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.grounded = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
