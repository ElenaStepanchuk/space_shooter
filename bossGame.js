function gameBoss() {
  // let endGame = new PIXI.Text(` `, styleText2);

  // add text shooted bullet
  let shootedBullet = new PIXI.Text(
    `Shooted bullet: ${shootedValueBullet} / 7`,
    styleText1
  );
  shootedBullet.x = 15;
  shootedBullet.y = 15;

  app.stage.addChild(shootedBullet);

  let deadedBossText = new PIXI.Text(
    `Deading boss: ${deadedBoss} / 4`,
    styleText3
  );
  deadedBossText.x = 1050;
  deadedBossText.y = 15;

  app.stage.addChild(deadedBossText);

  let windowMaxValue = 30;
  let windowMinValue = 0;
  let windowCount = windowMinValue;
  let windowTimer;

  function addDeadedBoss() {
    app.stage.removeChild(deadedBossText);
    deadedBossText = new PIXI.Text(
      `Count deading boss: ${deadedBoss} / 4`,
      styleText3
    );
    deadedBossText.x = 1000;
    deadedBossText.y = 15;

    app.stage.addChild(deadedBossText);
  }

  // add boss
  const bossSprite = PIXI.Sprite.from("./images/spaceShipBoss.png");
  app.stage.addChild(bossSprite);

  bossSprite.width = 120;
  bossSprite.height = 180;
  bossSprite.x = 50;
  bossSprite.y = 130;
  bossSprite.interactive = true;
  let bossSpeed = 3;

  app.ticker.add((delta) => addBossSpeed(delta));

  function addBossSpeed(delta) {
    if (bossSprite.x < widthCanvas - 120) {
      bossSprite.x += bossSpeed;
      return;
    }
    bossSprite.x = 50;
  }

  addBossSpeed();

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
    if (deadedBoss === 4) {
      endGame.text = "YOU   WIN";
      endGame.x = widthCanvas / 2 - 60;
      endGame.y = heightCanvas / 2;
      app.stage.removeChild(shipSprite);
      app.stage.addChild(endGame);
      windowTimerStop();
      app.stage.removeChild(bossSprite);
      bossSprite.y = -150;
      return;
    }
  }
  function looseGame() {
    if (
      (shootedValueBullet === 7 && deadedBoss < 4) ||
      windowCount === windowMaxValue
    ) {
      endGame.text = "YOU   LOOSE";
      endGame.x = widthCanvas / 2 - 60;
      endGame.y = heightCanvas / 2;
      app.stage.removeChild(shipSprite);
      app.stage.removeChild(bossSprite);
      app.stage.addChild(endGame);
      windowTimerStop();
      return;
    }
  }

  // shoot
  function shoot() {
    if (deadedBoss === 4 || (shootedValueBullet === 7 && deadedAsteroid < 4)) {
      return;
    }
    let bullet = createBullet();
    bullets.push(bullet);
    shootedValueBullet = shootedValueBullet + 1;
    app.stage.removeChild(shootedBullet);
    shootedBullet = new PIXI.Text(
      `Shooted bullet: ${shootedValueBullet} / 7`,
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

    //contact test bullet with boss
    for (let i = 0; i < bullets.length; i++) {
      if (
        bullets[i].x < bossSprite.x + bossSprite.width - 35 &&
        bullets[i].x + bossSprite.width - 100 > bossSprite.x &&
        bullets[i].y < bossSprite.y + bossSprite.height &&
        bullets[i].y + bossSprite.height > bossSprite.y
      ) {
        app.stage.removeChild(bullets[i]);
        bullets.splice(i, 1);
        deadedBoss = deadedBoss + 1;
        addDeadedBoss();
      }
    }
  }

  function gameLoop(delta) {
    updateBullets(delta);
  }

  document.addEventListener("keydown", function (e) {
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
  });
}
