const Application = PIXI.Application;
const widthCanvas = 1280;
const heightCanvas = 720;
const asteroiSize = 50;
let deadedAsteroid = 0;
let shootedValueBullet = 0;
let deadedBoss = 0;
let deadedSpiceShip = 0;
const shipSpriteWidth = 60;
const shipSpriteHeight = 140;
const bossSpeed = 1;
let bullets = [];
let bulletsBoss = [];
const bulletSpeed = 10;
let arrayAsteroids = [];
const audioSpiceShip = new Audio("./audio/spiceShipShoot.mp3");
const audioBoss = new Audio("./audio/bossShoot.mp3");
const audioFonMusic = new Audio("../audio/fonMusic.mp3");

const app = new Application({
  width: widthCanvas,
  height: heightCanvas,
  transparent: true,
  antialias: true,
});

// app.renderer.background.color = 0x23395d;
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
button.buttonMode = true;
startGame.interactive = true;
startGame.buttonMode = true;

button.on("click", function (e) {
  app.stage.removeChild(button);
  app.stage.removeChild(startGame);
  game();
});
startGame.on("click", function (e) {
  app.stage.removeChild(button);
  app.stage.removeChild(startGame);
  game();
});

let endGame = new PIXI.Text(` `, styleText2);

// add timer
let windowMaxValue = 60;
let windowMinValue = 0;
let windowCount = windowMinValue;
let windowTimer;

let timerText = new PIXI.Text(
  `Timer: ${windowMaxValue - windowCount} / ${windowMaxValue}`,
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
    return;
  } else {
    windowCount++;
    timerText.text = `Timer: ${
      windowMaxValue - windowCount
    } / ${windowMaxValue}`;
    app.stage.addChild(timerText);
  }
}
function windowStartTimer() {
  windowTimer = setInterval(onwindowTimerComplete, 1000);
}
function addingSpiceShip() {
  const shipSprite = PIXI.Sprite.from("./images/spaceShip.png");
  app.stage.addChild(shipSprite);
  shipSprite.width = shipSpriteWidth;
  shipSprite.height = shipSpriteHeight;
  shipSprite.x = app.screen.width / 2 - 15;
  shipSprite.y = 570;
  shipSprite.interactive = true;
}
// start first level/////////////////////////////////////////////
const game = () => {
  audioFonMusic.play();
  // add text shooted bullet
  let shootedBullet = new PIXI.Text(
    `Shooted bullet: ${shootedValueBullet} / 10`,
    styleText1
  );
  shootedBullet.x = 15;
  shootedBullet.y = 15;
  app.stage.addChild(shootedBullet);

  // add text deaded asteroid
  let deadedAsteroidText = new PIXI.Text(
    `Dead asteroid: ${deadedAsteroid} / 7`,
    styleText3
  );
  deadedAsteroidText.x = 1050;
  deadedAsteroidText.y = 15;
  app.stage.addChild(deadedAsteroidText);

  //change add text deaded asteroid
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

  // create array width asteroids
  // let arrayAsteroids = [];
  for (let i = 0; i < 7; i++) {
    const asteroid = PIXI.Sprite.from("./images/asteroid.png");
    arrayAsteroids.push(asteroid);
    app.stage.addChild(arrayAsteroids[i]);
    arrayAsteroids[i].width = asteroiSize;
    arrayAsteroids[i].height = asteroiSize;
    arrayAsteroids[i].interactive = true;
  }

  // add asteroids coordinates
  arrayAsteroids[0].x = 50;
  arrayAsteroids[0].y = 130;
  arrayAsteroids[1].x = 250;
  arrayAsteroids[1].y = 80;
  arrayAsteroids[2].x = 500;
  arrayAsteroids[2].y = 180;
  arrayAsteroids[3].x = 680;
  arrayAsteroids[3].y = 280;
  arrayAsteroids[4].x = 880;
  arrayAsteroids[4].y = 100;
  arrayAsteroids[5].x = 940;
  arrayAsteroids[5].y = 70;
  arrayAsteroids[6].x = 1140;
  arrayAsteroids[6].y = 220;

  // add spiceShip
  const shipSprite = PIXI.Sprite.from("./images/spaceShip.png");
  app.stage.addChild(shipSprite);
  shipSprite.width = shipSpriteWidth;
  shipSprite.height = shipSpriteHeight;
  shipSprite.x = app.screen.width / 2 - 15;
  shipSprite.y = 570;
  shipSprite.interactive = true;

  // start timer
  windowStartTimer();

  app.ticker.add(gameLoop);

  function winGame() {
    if (deadedAsteroid === 7) {
      app.stage.removeChild(deadedAsteroidText);
      windowCount = 0;
      app.stage.removeChild(shootedBullet);
      document.removeEventListener("keydown", controlButton);
      app.ticker.remove(gameLoop);
      gameBoss();
      app.stage.removeChild(shipSprite);
      app.stage.removeChild(arrayAsteroids);
      timerText.x = widthCanvas / 2 - 165;
      timerText.y = 15;
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
      arrayAsteroids.forEach((asteroid) => {
        app.stage.removeChild(asteroid);
      });
      app.stage.removeChild(shipSprite);
      app.stage.addChild(endGame);
      windowTimerStop();
      return;
    }
  }

  // shoot on asteroid
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
    looseGame();
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

    //contact test bullet with asteroids
    arrayAsteroids.forEach((asteroid) => {
      for (let i = 0; i < bullets.length; i++) {
        if (
          bullets[i].x < asteroid.x + asteroid.width - 20 &&
          bullets[i].x + asteroid.width - 15 > asteroid.x &&
          bullets[i].y < asteroid.y + asteroid.height &&
          bullets[i].y + asteroid.height > asteroid.y
        ) {
          app.stage.removeChild(bullets[i]);
          bullets.splice(i, 1);
          app.stage.removeChild(asteroid);
          asteroid.y = -150;
          deadedAsteroid = deadedAsteroid + 1;
          addDeadedAsteroid();
        }
      }
    });
  }

  // moving asteroids
  function moveAsteroid(delta) {
    for (let i = 0; i < arrayAsteroids.length; i = i + 2) {
      arrayAsteroids[i].y += 1;
      arrayAsteroids[i].x += 1;

      if (arrayAsteroids[i].y > heightCanvas - shipSpriteHeight - 100) {
        return (arrayAsteroids[i].y = 50);
      } else if (arrayAsteroids[i].x > widthCanvas - 50) {
        return (arrayAsteroids[i].x = 50);
      }
    }
    for (let i = 1; i < arrayAsteroids.length; i = i + 2) {
      arrayAsteroids[i].y += 1;
      arrayAsteroids[i].x -= 1;
      if (arrayAsteroids[i].y > heightCanvas - shipSpriteHeight - 100) {
        return (arrayAsteroids[i].y = 60);
      }
      if (arrayAsteroids[i].x < 0) {
        return (arrayAsteroids[i].x = widthCanvas - 50);
      }
    }
  }

  function gameLoop(delta) {
    updateBullets(delta);
    moveAsteroid(delta);
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
      audioSpiceShip.play();
      shoot();
    }
  }

  document.addEventListener("keydown", controlButton);
};

// Level 2 width boss/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function gameBoss() {
  // add text shooted bullet
  shootedValueBullet = 0;
  let shootedBullet = new PIXI.Text(
    `Shooted bullet: ${shootedValueBullet} / 10`,
    styleText1
  );
  shootedBullet.x = 15;
  shootedBullet.y = 15;
  app.stage.addChild(shootedBullet);

  // add boss HP scale
  deadedBossTextHp = new PIXI.Text(`HP BOSS:  `, styleText3);
  deadedBossTextHp.x = 850;
  deadedBossTextHp.y = 15;
  app.stage.addChild(deadedBossTextHp);
  let deadedBossHp = new Graphics();
  deadedBossHp.lineStyle(10, 0xff0000, 1).moveTo(1000, 35).lineTo(1200, 35);
  app.stage.addChild(deadedBossHp);

  function addDeadedBoss() {
    if (deadedBoss === 1) {
      let deadedBossHpWin = new Graphics();
      deadedBossHpWin
        .lineStyle(10, 0x00ff00, 1)
        .moveTo(1000, 35)
        .lineTo(1050, 35);
      app.stage.addChild(deadedBossHpWin);
    } else if (deadedBoss === 2) {
      let deadedBossHpWin1 = new Graphics();
      deadedBossHpWin1
        .lineStyle(10, 0x00ff00, 1)
        .moveTo(1000, 35)
        .lineTo(1100, 35);
      app.stage.addChild(deadedBossHpWin1);
    } else if (deadedBoss === 3) {
      let deadedBossHpWin2 = new Graphics();
      deadedBossHpWin2
        .lineStyle(10, 0x00ff00, 1)
        .moveTo(1000, 35)
        .lineTo(1150, 35);
      app.stage.addChild(deadedBossHpWin2);
    }
    if (deadedBoss === 4) {
      let deadedBossHpWin3 = new Graphics();
      deadedBossHpWin3
        .lineStyle(10, 0x00ff00, 1)
        .moveTo(1000, 35)
        .lineTo(1200, 35);
      app.stage.addChild(deadedBossHpWin3);
    }
  }

  // add boss
  const bossSprite = PIXI.Sprite.from("./images/spaceShipBoss.png");
  app.stage.addChild(bossSprite);
  bossSprite.width = 120;
  bossSprite.height = 180;
  bossSprite.x = 0;
  bossSprite.y = 80;
  bossSprite.interactive = true;

  // add timer for boss
  app.ticker.add((delta) => addBossSpeed(delta));

  function addBossSpeed() {
    addDeadedBoss();
    looseBossGame();
    if (windowCount < 9) {
      bossSprite.x += bossSpeed;
      return;
    }
    addBossSpeed2();
    return;
  }
  function addBossSpeed2() {
    if (windowCount > 10 && windowCount < 15) {
      bossSprite.x -= bossSpeed * 2;
      return;
    }
    addBossSpeed3();
    return;
  }
  function addBossSpeed3() {
    if (windowCount > 16 && windowCount < 19) {
      bossSprite.x += bossSpeed * 3;
      return;
    }
    addBossSpeed4();
    return;
  }
  function addBossSpeed4() {
    if (windowCount > 20 && windowCount < 24) {
      bossSprite.x -= bossSpeed * 2;
      return;
    }
    addBossSpeed5();
    return;
  }
  function addBossSpeed5() {
    if (windowCount > 25 && windowCount < 34) {
      bossSprite.x += bossSpeed;
      return;
    }
    addBossSpeed6();
    return;
  }
  function addBossSpeed6() {
    if (windowCount > 35 && windowCount < 40) {
      bossSprite.x -= bossSpeed * 2;
      return;
    }
    addBossSpeed7();
    return;
  }
  function addBossSpeed7() {
    if (windowCount > 41 && windowCount < 48) {
      bossSprite.x += bossSpeed;
      return;
    }
    addBossSpeed8();
    return;
  }
  function addBossSpeed8() {
    if (windowCount > 49 && windowCount < 56) {
      bossSprite.x -= bossSpeed;
      return;
    }
    addBossSpeed9();
    return;
  }
  function addBossSpeed9() {
    if (windowCount > 57 && windowCount < 60) {
      bossSprite.x += bossSpeed;
      timerShoot();
      return;
    }
    return;
  }
  addBossSpeed();

  // add spiceShip
  const shipSprite = PIXI.Sprite.from("./images/spaceShip.png");
  app.stage.addChild(shipSprite);
  shipSprite.width = shipSpriteWidth;
  shipSprite.height = shipSpriteHeight;
  shipSprite.x = app.screen.width / 2 - 15;
  shipSprite.y = 570;
  shipSprite.interactive = true;

  // add bullet
  function winGame() {
    if (deadedBoss === 4) {
      endGame.text = "YOU   WIN";
      endGame.x = widthCanvas / 2 - 60;
      endGame.y = heightCanvas / 2;
      app.stage.removeChild(shipSprite);
      app.stage.addChild(endGame);
      windowTimerStop();
      app.stage.removeChild(bossSprite);
      bossSprite.y = -150;
      app.stage.removeChild(bulletsBoss);
      document.removeEventListener("keydown", controlButton);
      return;
    }
  }
  function looseBossGame() {
    if (
      (shootedValueBullet === 10 && deadedBoss < 4) ||
      windowCount === windowMaxValue ||
      deadedSpiceShip === 1
    ) {
      endGame.text = "YOU   LOOSE";
      endGame.x = widthCanvas / 2 - 60;
      endGame.y = heightCanvas / 2;
      app.stage.removeChild(shipSprite);
      app.stage.removeChild(bossSprite);
      app.stage.removeChild(bulletsBoss);
      app.stage.removeChild(bullets);
      app.stage.addChild(endGame);
      windowTimerStop();
      return;
    }
  }

  // shoot
  function shoot() {
    // ?
    if (
      deadedBoss === 4 ||
      (shootedValueBullet === 10 && deadedBoss < 4) ||
      deadedSpiceShip === 1
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
    looseBossGame();
    // bullets spiceShip
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

    // bullets boss
    for (let i = 0; i < bulletsBoss.length; i++) {
      bulletsBoss[i].position.y += bulletsBoss[i].speed;
      if (bulletsBoss[i].position.y > 720) {
        bulletsBoss[i].dead = true;
      }
    }
    for (let i = 0; i < bulletsBoss.length; i++) {
      if (bulletsBoss[i].dead) {
        app.stage.removeChild(bulletsBoss[i]);
        bulletsBoss.splice(i, 1);
      }
    }
    // contact test bullet spiceShip with boss
    for (let i = 0; i < bullets.length; i++) {
      if (
        bullets[i].x < bossSprite.x + bossSprite.width - 45 &&
        bullets[i].x + bossSprite.width - 100 > bossSprite.x &&
        bullets[i].y < bossSprite.y + bossSprite.height &&
        bullets[i].y + bossSprite.height > bossSprite.y
      ) {
        app.stage.removeChild(bullets[i]);
        bullets.splice(i, 1);
        deadedBoss = deadedBoss + 1;
      }
    }

    // contact test bulletBoss with spiceSheep
    for (let i = 0; i < bulletsBoss.length; i++) {
      if (
        bulletsBoss[i].x < shipSprite.x + shipSprite.width - 20 &&
        bulletsBoss[i].x + shipSprite.width - 30 > shipSprite.x &&
        bulletsBoss[i].y < shipSprite.y + shipSprite.height &&
        bulletsBoss[i].y + shipSprite.height > shipSprite.y
      ) {
        app.stage.removeChild(bulletsBoss[i]);
        bulletsBoss.splice(i, 1);
        deadedSpiceShip = deadedSpiceShip + 1;
      }
    }

    // contact ballet boss width bullet spiceShip
    for (let i = 0; i < bullets.length; i++) {
      bulletsBoss.forEach((bulletBoss) => {
        if (
          bulletBoss.x < bullets[i].x + 5 &&
          bulletBoss.x + bullets[i].x > 5 &&
          bulletBoss.y == bullets[i].y - 120
        ) {
          app.stage.removeChild(bullets[i]);
          app.stage.removeChild(bulletBoss);
        }
      });
    }
  }

  // shoot boss
  let shootedValueBulletBoss = 0;
  function shootBoss() {
    if (
      deadedBoss === 4 ||
      (shootedValueBullet === 10 && deadedBoss < 4) ||
      deadedSpiceShip === 1
    ) {
      return;
    }
    let bulletBoss = createBulletBoss();
    bulletsBoss.push(bulletBoss);
    shootedValueBulletBoss = shootedValueBulletBoss + 1;
    audioBoss.play();
  }

  function createBulletBoss() {
    let bulletBoss = new Graphics();
    bulletBoss.lineStyle(5, 0xffea00, 1).moveTo(60, 140).lineTo(60, 170);
    bulletBoss.x = bossSprite.x;
    bulletBoss.y = bossSprite.y;
    bulletBoss.speed = bulletSpeed;
    app.stage.addChild(bulletBoss);
    return bulletBoss;
  }

  function timerShoot() {
    if (windowCount % 2 === 0 && windowCount < windowMaxValue) {
      shootBoss();
    }
    return;
  }

  function gameLoop(delta) {
    updateBullets(delta);
    addBossSpeed(delta);
  }

  app.ticker.add(gameLoop);

  let maxValue = 60;
  let count = 0;
  let timer;
  function timerStop() {
    clearInterval(timer);
  }

  function timerComplete() {
    if (count === maxValue) {
      timerStop();
      looseBossGame();
      return;
    } else {
      count++;
      timerShoot();
    }
  }
  function startTimer() {
    timer = setInterval(timerComplete, 2000);
  }
  startTimer();

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
      shoot();
      audioSpiceShip.play();
    }
  }

  document.addEventListener("keydown", controlButton);
}
