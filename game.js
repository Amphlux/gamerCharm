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

let jetpack = {
  x: 200,
  y: 300,
  width: 20,
  height: 20,
  color: 'blue'
};

let anchor = {
  x: 400,
  y: 300,
  width: 20,
  height: 20,
  color: 'gray'
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

  // Check for collision with jetpack
  if (checkCollision(player, jetpack)) {
    player.grounded = true;
  }

  // Check for collision with anchor
  if (checkCollision(player, anchor)) {
    player.grounded = false;
  }
}

function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = jetpack.color;
  ctx.fillRect(jetpack.x, jetpack.y, jetpack.width, jetpack.height);

  ctx.fillStyle = anchor.color;
  ctx.fillRect(anchor.x, anchor.y, anchor.width, anchor.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
