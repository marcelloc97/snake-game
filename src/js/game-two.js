var WIDTH, HEIGHT; // control canvas size

var score = (highscore = 0);
var score2 = (highscore2 = 0);

// player 1
const vel = 1; // constant velocity
var px = Math.floor(Math.random() * 35),
  py = Math.floor(Math.random() * 30); // player's head position
var vx = 1, // player body position
  vy = 0;
var trail = []; // his tail pixels
var tail = 2; // quantity of tails
var lost = false; // if touched his body / win not implemented... YET

// player 2
var px2 = Math.floor(Math.random() * 35),
  py2 = Math.floor(Math.random() * 30); // player's head position
var vx2 = 1, // player body position
  vy2 = 0;
var trail2 = []; // his tail pixels
var tail2 = 2; // quantity of tails
var lost2 = false; // if touched his body / win not implemented... YET

// Fruit position
var fx = Math.floor(Math.random() * 35),
  fy = Math.floor(Math.random() * 30);

// Sound Effects
const fruitSFX = new Audio("src/assets/audio/sfx/Fruit.wav");
const gameOverSFX = new Audio("src/assets/audio/sfx/Game_Over.ogg");
const hurtSFX = new Audio("src/assets/audio/sfx/Hurt.wav");

// Background Music
const stageBGM = new Audio("src/assets/audio/bgm/bgm01.mp3");
stageBGM.volume = 0.4;

var canPlay = true; // used for gameOverSFX

var scoreboard = document.getElementById("scoreboard"); // the DOM element below page's title
var scoreboard2 = document.getElementById("scoreboard2"); // the DOM element below page's title
var previousScore = 0; // ah.. the previous score?
var previousScore2 = 0; // ah.. the previous score?

var scoreString = "P1 Score : " + score;
var highscoreString =
  "P1 Highscore : " + localStorage.getItem("snake-game.highscore");

var scoreString2 = "<br />P2 Score : " + score2;
var highscoreString2 =
  "P2 Highscore : " + localStorage.getItem("snake-game.highscore-p2");

var time = 100; // time in milliseconds

//// Observation: Player wins when score gets to 100 (but not yet)

window.onload = function initialize() {
  window.gameStartedTwo = true;

  WIDTH = 35;
  HEIGHT = 30;

  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas.style.width = `${WIDTH * 16}px`;
  canvas.style.height = `${HEIGHT * 16}px`;

  document.addEventListener("keydown", keyPush);

  // gets highscore from localStorage
  if (localStorage.getItem("snake-game.highscore") != null) {
    highscore = Number.parseInt(localStorage.getItem("snake-game.highscore"));
  } else {
    localStorage.setItem("snake-game.highscore", highscore.toString());
  }

  // P2
  if (localStorage.getItem("snake-game.highscore-p2") != null) {
    highscore2 = Number.parseInt(
      localStorage.getItem("snake-game.highscore-p2")
    );
  } else {
    localStorage.setItem("snake-game.highscore-p2", highscore2.toString());
  }

  // Shows score and highscore on top of the game canvas
  var sr = document.createElement("h2");
  var hsr = document.createElement("h4");

  sr.innerHTML = `${scoreString}`;
  sr.style.textAlign = "center";
  sr.style.marginRight = "10px";
  sr.id = "score-info";

  hsr.innerHTML = `${highscoreString}`;
  hsr.style.textAlign = "center";
  hsr.style.marginRight = "10px";
  hsr.id = "score-info";

  scoreboard.appendChild(sr);
  scoreboard.appendChild(hsr);

  // P2
  var sr2 = document.createElement("h2");
  var hsr2 = document.createElement("h4");

  sr2.innerHTML = `${scoreString2}`;
  sr2.style.textAlign = "center";
  sr2.style.marginRight = "10px";
  sr2.id = "score-info";

  hsr2.innerHTML = `${highscoreString2}`;
  hsr2.style.textAlign = "center";
  hsr2.style.marginRight = "10px";
  hsr2.id = "score-info";

  scoreboard2.appendChild(sr2);
  scoreboard2.appendChild(hsr2);

  restartGame(); // fix audio bug

  setInterval(run, time);
};

// Application Runner
function run() {
  update();
  render();

  window.score = score;
  window.highscore = highscore;
  window.score2 = score2;
  window.highscore2 = highscore2;
}

// Game Updater Function
function update() {
  // Snake Logic P1
  px += vx;
  py += vy;

  // Arena Wrap
  if (px < 0) {
    px = WIDTH - 1;
  }
  if (px > WIDTH - 1) {
    px = 0;
  }
  if (py < 0) {
    py = HEIGHT - 1;
  }
  if (py > HEIGHT - 1) {
    py = 0;
  }

  // Snake Logic P2
  px2 += vx2;
  py2 += vy2;

  // Arena Wrap
  if (px2 < 0) {
    px2 = WIDTH - 1;
  }
  if (px2 > WIDTH - 1) {
    px2 = 0;
  }
  if (py2 < 0) {
    py2 = HEIGHT - 1;
  }
  if (py2 > HEIGHT - 1) {
    py2 = 0;
  }

  lost ? stop(stageBGM) : play(stageBGM);

  canvas.onclick = restartGame;
}

// Game Render Function
function render() {
  ctx.fillStyle = "#FFF"; //"#50b0FF";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = "#AA0000";
  ctx.fillRect(fx, fy, 1, 1);

  // P1
  ctx.fillStyle = "#0d5959"; //"#22CC00"; //"#444FFF";
  for (var i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x, trail[i].y, 1, 1);

    // Lose (Touched your own body)
    if (trail[i].x == px && trail[i].y == py) {
      // Reset Snake stats
      vx = vy = 0;
      lost = true;

      // Play Game Over Sound
      if (canPlay && lost) {
        play(hurtSFX);
        play(gameOverSFX);
        canPlay = false;
      } else if (canPlay && !lost) {
        stop(gameOverSFX);
        return;
      }

      if (score > highscore) {
        highscore = score;

        localStorage.setItem("snake-game.highscore", highscore.toString());
      }
    }
  }

  trail.push({ x: px, y: py });
  while (trail.length > tail) {
    trail.shift();
  }

  // Gets a Fruit
  if (fx == px && fy == py) {
    play(fruitSFX);
    tail++;
    fx = Math.floor(Math.random() * WIDTH);
    fy = Math.floor(Math.random() * HEIGHT);
    score++;
  }

  // P2
  ctx.fillStyle = "#ffcc00"; //"#228800"; //"#444FFF";
  for (var i = 0; i < trail2.length; i++) {
    ctx.fillRect(trail2[i].x, trail2[i].y, 1, 1);

    // Lose (Touched your own body)
    if (trail2[i].x == px2 && trail2[i].y == py2) {
      // Reset Snake stats
      vx2 = vy2 = 0;
      lost2 = true;

      // Play Game Over Sound
      if (canPlay && lost2) {
        play(hurtSFX);
        play(gameOverSFX);
        canPlay = false;
      } else if (canPlay && !lost2) {
        stop(gameOverSFX);
        return;
      }

      if (score2 > highscore2) {
        highscore2 = score2;

        localStorage.setItem("snake-game.highscore-p2", highscore2.toString());
      }
    }
  }

  trail2.push({ x: px2, y: py2 });
  while (trail2.length > tail2) {
    trail2.shift();
  }

  // Gets a Fruit
  if (fx == px2 && fy == py2) {
    play(fruitSFX);
    tail2++;
    fx = Math.floor(Math.random() * WIDTH);
    fy = Math.floor(Math.random() * HEIGHT);
    score2++;
  }

  // Update strings
  scoreString = "P1 Score : " + score;
  score > highscore
    ? (highscoreString = "P1 Highscore : " + score)
    : (highscoreString =
        "P1 Highscore : " + localStorage.getItem("snake-game.highscore"));

  // Update DOM elements
  if (previousScore < score || previousScore === score) {
    var sr = document.createElement("h3");
    var hsr = document.createElement("h4");
    sr.innerHTML = `${scoreString}`;
    sr.style.textAlign = "center";
    sr.style.marginRight = "10px";
    sr.id = "score-info";

    hsr.innerHTML = `${highscoreString}`;
    hsr.style.textAlign = "center";
    hsr.style.marginRight = "10px";
    hsr.id = "score-info";

    if (score > highscore) {
      hsr.style.color = "#0d5959";
    } else {
      hsr.style.color = "#FFF";
    }

    scoreboard.removeChild(scoreboard.firstChild); // Score: ...
    scoreboard.removeChild(scoreboard.firstChild); // Highscore: ...
    scoreboard.appendChild(sr);
    scoreboard.appendChild(hsr);

    previousScore = score;
  }

  // Update strings P2
  scoreString2 = "<br />P2 Score : " + score2;
  score2 > highscore2
    ? (highscoreString2 = "P2 Highscore : " + score2)
    : (highscoreString2 =
        "P2 Highscore : " + localStorage.getItem("snake-game.highscore-p2"));

  // Update DOM elements P2
  if (previousScore2 < score2 || previousScore2 === score2) {
    var sr2 = document.createElement("h3");
    var hsr2 = document.createElement("h4");
    sr2.innerHTML = `${scoreString2}`;
    sr2.style.textAlign = "center";
    sr2.style.marginRight = "10px";
    sr2.id = "score-info";

    hsr2.innerHTML = `${highscoreString2}`;
    hsr2.style.textAlign = "center";
    hsr2.style.marginRight = "10px";
    hsr2.id = "score-info";

    if (score2 > highscore2) {
      hsr2.style.color = "#ffcc00"; //"#C8F225";
    } else {
      hsr2.style.color = "#FFF";
    }

    scoreboard2.removeChild(scoreboard2.firstChild); // Score: ...
    scoreboard2.removeChild(scoreboard2.firstChild); // Highscore: ...
    scoreboard2.appendChild(sr2);
    scoreboard2.appendChild(hsr2);

    previousScore2 = score2;
  }

  // Change Screen when player has lost
  if (lost || lost2) {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#FFF";
    ctx.fontSize = "5px";
    ctx.fillText("K.O.", 9, 17);
  }
}

// Input Controller
function keyPush(event) {
  switch (event.keyCode) {
    case 37: // Arrow Left P2
      if (!lost2) {
        vx2 = -vel;
        vy2 = 0;
      }
      break;
    case 65: // A key P1
      if (!lost) {
        vx = -vel;
        vy = 0;
      }
      break;
    case 38: // up P2
      if (!lost2) {
        vx2 = 0;
        vy2 = -vel;
      }
      break;
    case 87: // W key P1
      if (!lost) {
        vx = 0;
        vy = -vel;
      }
      break;
    case 39: // right P2
      if (!lost2) {
        vx2 = vel;
        vy2 = 0;
      }
      break;
    case 68: // D key P1
      if (!lost) {
        vx = vel;
        vy = 0;
      }
      break;
    case 40: // down P2
      if (!lost2) {
        vx2 = 0;
        vy2 = vel;
      }
      break;
    case 83: // S key P1
      if (!lost) {
        vx = 0;
        vy = vel;
      }
      break;

    case 13: // enter
    case 27: // escape
    case 32: // space
      restartGame();
      break;
  }
}

function restartGame() {
  if (lost || lost2) {
    tail = 2;
    px = py = Math.floor(Math.random() * WIDTH);
    score = 0;
    vx = 1;
    vy = 0;
    lost = false;
    previousScore = 0;

    // P2
    tail2 = 2;
    px2 = py2 = Math.floor(Math.random() * WIDTH);
    score2 = 0;
    vx2 = 1;
    vy2 = 0;
    lost2 = false;
    previousScore2 = 0;

    fx = fy = Math.floor(Math.random() * HEIGHT);
    canPlay = true;
  }
}

// Reusable Functions
function play(audio) {
  audio.play();
}

function stop(audio) {
  audio.pause();
  audio.currentTime = 0;
}

function isPlaying(audio) {
  if (audio.played) {
    return true;
  } else return false;
}

// External Functions
function restart() {
  restartGame();
}
