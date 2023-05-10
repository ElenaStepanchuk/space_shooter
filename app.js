const Application = PIXI.Application;
const widthCanvas = 1280;
const heightCanvas = 720;
const asteroiSize = 50;
let deadedAsteroid = 0;
let shootedValueBullet = 0;
let deadedBoss = 0;

const app = new Application({
  width: widthCanvas,
  height: heightCanvas,
  transparent: true,
  antialias: true,
});

app.renderer.backgroundColor = 0x23395d;

app.renderer.view.style.position = "absolute";

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

const styleText1 = new PIXI.TextStyle({
  fontFamily: "Monserrat",
  FontSize: 32,
  fill: "#000000",
  stroke: "#ffffff",
  strokeThickness: 4,
});

const styleText2 = new PIXI.TextStyle({
  fontFamily: "Monserrat",
  FontSize: 48,
  fill: "deepskyblue",
  stroke: "#ffffff",
  strokeThickness: 4,
  dropShadow: true,
  dropShadowDistance: 10,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 4,
  dropShadowColor: "#000000",
});

const styleText3 = new PIXI.TextStyle({
  fontFamily: "Monserrat",
  FontSize: 32,
  fill: "#000000",
  stroke: "#ffffff",
  strokeThickness: 4,
});

// add button start game
const button = new Graphics();
button
  .beginFill(0xffea00)
  .lineStyle(2, 0xffffff, 1)
  .drawRect(widthCanvas / 2 - 200, heightCanvas / 2 - 50, 400, 100)
  .endFill();

app.stage.addChild(button);

let startGame = new PIXI.Text("START GAME", styleText2);

startGame.x = widthCanvas / 2 - 80;
startGame.y = heightCanvas / 2 - 20;
app.stage.addChild(startGame);

button.interactive = true;
startGame.interactive = true;

button.addEventListener("click", function (e) {
  app.stage.removeChild(button);
  app.stage.removeChild(startGame);
  game();
});
startGame.addEventListener("click", function (e) {
  app.stage.removeChild(button);
  app.stage.removeChild(startGame);
  game();
});

let endGame = new PIXI.Text(` `, styleText2);

const game = () => {
  // add text shooted bullet
  let shootedBullet = new PIXI.Text(
    `Shooted bullet: ${shootedValueBullet} / 10`,
    styleText1
  );
  shootedBullet.x = 15;
  shootedBullet.y = 15;

  app.stage.addChild(shootedBullet);

  let deadedAsteroidText = new PIXI.Text(
    `Dead asteroid: ${deadedAsteroid} / 7`,
    styleText3
  );
  deadedAsteroidText.x = 1050;
  deadedAsteroidText.y = 15;

  app.stage.addChild(deadedAsteroidText);

  let windowMaxValue = 60;
  let windowMinValue = 0;
  let windowCount = windowMinValue;
  let windowTimer;

  function addDeadedAsteroid() {
    app.stage.removeChild(deadedAsteroidText);
    deadedAsteroidText = new PIXI.Text(
      `Dead asteroid: ${deadedAsteroid} / 7`,
      styleText3
    );
    deadedAsteroidText.x = 1050;
    deadedAsteroidText.y = 15;

    app.stage.addChild(deadedAsteroidText);
  }

  // add asteroid1
  const asteroid1Sprite = PIXI.Sprite.from("./images/asteroid.png");
  app.stage.addChild(asteroid1Sprite);

  asteroid1Sprite.width = asteroiSize;
  asteroid1Sprite.height = asteroiSize;
  asteroid1Sprite.x = 50;
  asteroid1Sprite.y = 130;
  asteroid1Sprite.interactive = true;

  // add asteroid2
  const asteroid2Sprite = PIXI.Sprite.from("./images/asteroid.png");
  app.stage.addChild(asteroid2Sprite);

  asteroid2Sprite.width = asteroiSize;
  asteroid2Sprite.height = asteroiSize;
  asteroid2Sprite.x = 250;
  asteroid2Sprite.y = 80;

  // add asteroid3
  const asteroid3Sprite = PIXI.Sprite.from("./images/asteroid.png");
  app.stage.addChild(asteroid3Sprite);

  asteroid3Sprite.width = asteroiSize;
  asteroid3Sprite.height = asteroiSize;
  asteroid3Sprite.x = 500;
  asteroid3Sprite.y = 180;

  // add asteroid4
  const asteroid4Sprite = PIXI.Sprite.from("./images/asteroid.png");
  app.stage.addChild(asteroid4Sprite);

  asteroid4Sprite.width = asteroiSize;
  asteroid4Sprite.height = asteroiSize;
  asteroid4Sprite.x = 680;
  asteroid4Sprite.y = 280;

  // add asteroid5
  const asteroid5Sprite = PIXI.Sprite.from("./images/asteroid.png");
  app.stage.addChild(asteroid5Sprite);

  asteroid5Sprite.width = asteroiSize;
  asteroid5Sprite.height = asteroiSize;
  asteroid5Sprite.x = 880;
  asteroid5Sprite.y = 100;

  // add asteroid6
  const asteroid6Sprite = PIXI.Sprite.from("./images/asteroid.png");
  app.stage.addChild(asteroid6Sprite);

  asteroid6Sprite.width = asteroiSize;
  asteroid6Sprite.height = asteroiSize;
  asteroid6Sprite.x = 940;
  asteroid6Sprite.y = 70;

  // add asteroid7
  const asteroid7Sprite = PIXI.Sprite.from("./images/asteroid.png");
  app.stage.addChild(asteroid7Sprite);

  asteroid7Sprite.width = asteroiSize;
  asteroid7Sprite.height = asteroiSize;
  asteroid7Sprite.x = 1140;
  asteroid7Sprite.y = 220;

  // add spiceShip
  const shipSprite = PIXI.Sprite.from("./images/spaceShip.png");
  app.stage.addChild(shipSprite);

  shipSprite.width = 60;
  shipSprite.height = 140;
  shipSprite.x = app.screen.width / 2 - 15;
  shipSprite.y = 570;

  shipSprite.interactive = true;

  // add timer

  let timerText = new PIXI.Text(
    `Timer: ${windowCount} / ${windowMaxValue}`,
    styleText3
  );
  timerText.x = widthCanvas / 2 - 65;
  timerText.y = 15;
  app.stage.addChild(timerText);

  function windowTimerStop() {
    clearInterval(windowTimer);
  }

  function onwindowTimerComplete() {
    if (windowCount === windowMaxValue) {
      windowTimerStop();
      looseGame();
      return;
    } else {
      windowCount++;
      timerText.text = `Timer: ${windowCount} / ${windowMaxValue}`;
      app.stage.addChild(timerText);
    }
  }
  function windowStartTimer() {
    windowTimer = setInterval(onwindowTimerComplete, 1000);
  }

  windowStartTimer();

  // add bullet
  let bullets = [];
  const bulletSpeed = 10;
  app.ticker.add(gameLoop);

  function winGame() {
    if (deadedAsteroid === 7) {
      endGame.text = "YOU   WIN";
      endGame.x = widthCanvas / 2 - 60;
      endGame.y = heightCanvas / 2;
      app.stage.removeChild(shipSprite);
      app.stage.removeChild(shootedBullet);
      app.stage.removeChild(deadedAsteroidText);
      app.stage.removeChild(timerText);
      app.stage.addChild(endGame);
      windowTimerStop();
    }
  }
  function looseGame() {
    if (
      (shootedValueBullet === 10 && deadedAsteroid < 7) ||
      windowCount === windowMaxValue
    ) {
      endGame.text = "YOU   LOOSE";
      endGame.x = widthCanvas / 2 - 60;
      endGame.y = heightCanvas / 2;
      app.stage.removeChild(shipSprite);
      app.stage.removeChild(asteroid1Sprite);
      app.stage.removeChild(asteroid2Sprite);
      app.stage.removeChild(asteroid3Sprite);
      app.stage.removeChild(asteroid4Sprite);
      app.stage.removeChild(asteroid5Sprite);
      app.stage.removeChild(asteroid6Sprite);
      app.stage.removeChild(asteroid7Sprite);
      app.stage.addChild(endGame);
      windowTimerStop();
      return;
    }
  }

  // shoot
  function shoot() {
    if (
      deadedAsteroid === 7 ||
      (shootedValueBullet === 10 && deadedAsteroid < 7)
    ) {
      return;
    }
    let bullet = createBullet();
    bullets.push(bullet);
    shootedValueBullet = shootedValueBullet + 1;
    app.stage.removeChild(shootedBullet);
    shootedBullet = new PIXI.Text(
      `Shooted bullet: ${shootedValueBullet} / 10`,
      styleText1
    );
    app.stage.addChild(shootedBullet);
    shootedBullet.x = 15;
    shootedBullet.y = 15;
  }

  function createBullet() {
    let bullet = new Graphics();
    bullet.lineStyle(5, 0xffea00, 1).moveTo(30, -20).lineTo(30, 0);
    bullet.x = shipSprite.x;
    bullet.y = shipSprite.y;
    bullet.speed = bulletSpeed;
    app.stage.addChild(bullet);
    return bullet;
  }

  function updateBullets(delta) {
    winGame();
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].position.y -= bullets[i].speed;
      if (bullets[i].position.y < 20) {
        bullets[i].dead = true;
      }
    }
    for (let i = 0; i < bullets.length; i++) {
      if (bullets[i].dead) {
        app.stage.removeChild(bullets[i]);
        bullets.splice(i, 1);
      }
    }

    //contact test bullet with asteroid1
    for (let i = 0; i < bullets.length; i++) {
      if (
        bullets[i].x < asteroid1Sprite.x + asteroid1Sprite.width - 20 &&
        bullets[i].x + asteroid1Sprite.width - 15 > asteroid1Sprite.x &&
        bullets[i].y < asteroid1Sprite.y + asteroid1Sprite.height &&
        bullets[i].y + asteroid1Sprite.height > asteroid1Sprite.y
      ) {
        app.stage.removeChild(bullets[i]);
        bullets.splice(i, 1);
        app.stage.removeChild(asteroid1Sprite);
        asteroid1Sprite.y = -150;
        deadedAsteroid = deadedAsteroid + 1;
        addDeadedAsteroid();
      }
    }

    //contact test bullet with asteroid2
    for (let i = 0; i < bullets.length; i++) {
      if (
        bullets[i].x < asteroid2Sprite.x + asteroid2Sprite.width - 20 &&
        bullets[i].x + asteroid2Sprite.width - 15 > asteroid2Sprite.x &&
        bullets[i].y < asteroid2Sprite.y + asteroid2Sprite.height &&
        bullets[i].y + asteroid2Sprite.height > asteroid2Sprite.y
      ) {
        app.stage.removeChild(bullets[i]);
        bullets.splice(i, 1);
        app.stage.removeChild(asteroid2Sprite);
        asteroid2Sprite.y = -150;
        deadedAsteroid = deadedAsteroid + 1;
        addDeadedAsteroid();
      }
    }

    //contact test bullet with asteroid3
    for (let i = 0; i < bullets.length; i++) {
      if (
        bullets[i].x < asteroid3Sprite.x + asteroid3Sprite.width - 20 &&
        bullets[i].x + asteroid3Sprite.width - 15 > asteroid3Sprite.x &&
        bullets[i].y < asteroid3Sprite.y + asteroid3Sprite.height &&
        bullets[i].y + asteroid3Sprite.height > asteroid3Sprite.y
      ) {
        app.stage.removeChild(bullets[i]);
        bullets.splice(i, 1);
        app.stage.removeChild(asteroid3Sprite);
        asteroid3Sprite.y = -150;
        deadedAsteroid = deadedAsteroid + 1;
        addDeadedAsteroid();
      }
    }

    //contact test bullet with asteroid4
    for (let i = 0; i < bullets.length; i++) {
      if (
        bullets[i].x < asteroid4Sprite.x + asteroid4Sprite.width - 20 &&
        bullets[i].x + asteroid4Sprite.width - 15 > asteroid4Sprite.x &&
        bullets[i].y < asteroid4Sprite.y + asteroid4Sprite.height &&
        bullets[i].y + asteroid4Sprite.height > asteroid4Sprite.y
      ) {
        app.stage.removeChild(bullets[i]);
        bullets.splice(i, 1);
        app.stage.removeChild(asteroid4Sprite);
        asteroid4Sprite.y = -150;
        deadedAsteroid = deadedAsteroid + 1;
        addDeadedAsteroid();
      }
    }

    //contact test bullet with asteroid5
    for (let i = 0; i < bullets.length; i++) {
      if (
        bullets[i].x < asteroid5Sprite.x + asteroid5Sprite.width - 20 &&
        bullets[i].x + asteroid5Sprite.width - 15 > asteroid5Sprite.x &&
        bullets[i].y < asteroid5Sprite.y + asteroid5Sprite.height &&
        bullets[i].y + asteroid5Sprite.height > asteroid5Sprite.y
      ) {
        app.stage.removeChild(bullets[i]);
        bullets.splice(i, 1);
        app.stage.removeChild(asteroid5Sprite);
        asteroid5Sprite.y = -150;
        deadedAsteroid = deadedAsteroid + 1;
        addDeadedAsteroid();
      }
    }

    //contact test bullet with asteroid6
    for (let i = 0; i < bullets.length; i++) {
      if (
        bullets[i].x < asteroid6Sprite.x + asteroid6Sprite.width - 20 &&
        bullets[i].x + asteroid6Sprite.width - 15 > asteroid6Sprite.x &&
        bullets[i].y < asteroid6Sprite.y + asteroid6Sprite.height &&
        bullets[i].y + asteroid6Sprite.height > asteroid6Sprite.y
      ) {
        app.stage.removeChild(bullets[i]);
        bullets.splice(i, 1);
        app.stage.removeChild(asteroid6Sprite);
        asteroid6Sprite.y = -150;
        deadedAsteroid = deadedAsteroid + 1;
        addDeadedAsteroid();
      }
    }

    //contact test bullet with asteroid7
    for (let i = 0; i < bullets.length; i++) {
      if (
        bullets[i].x < asteroid7Sprite.x + asteroid7Sprite.width - 20 &&
        bullets[i].x + asteroid7Sprite.width - 15 > asteroid7Sprite.x &&
        bullets[i].y < asteroid7Sprite.y + asteroid7Sprite.height &&
        bullets[i].y + asteroid7Sprite.height > asteroid7Sprite.y
      ) {
        app.stage.removeChild(bullets[i]);
        bullets.splice(i, 1);
        app.stage.removeChild(asteroid7Sprite);
        asteroid7Sprite.y = -150;
        deadedAsteroid = deadedAsteroid + 1;
        addDeadedAsteroid();
        return;
      }
    }
  }

  function gameLoop(delta) {
    updateBullets(delta);
  }
  function controlButton(e) {
    if (
      e.key === "ArrowRight" &&
      shipSprite.x < widthCanvas - shipSprite.width
    ) {
      shipSprite.x += 15;
    }
    if (e.key === "ArrowLeft" && shipSprite.x > 0) {
      shipSprite.x -= 15;
    }
    if (e.key === " ") {
      looseGame();
      shoot();
    }
  }

  document.addEventListener("keydown", controlButton);
};
