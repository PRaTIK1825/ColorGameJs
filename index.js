const colorNames = [
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Purple",
  "Cyan",
  "Magenta",
  "Orange",
  "Pink",
  "Brown",
  "Lime",
  "Olive",
  "Teal",
  "Navy",
  "Maroon",
  "Silver",
];

let winingScore = 3;
let targetcolor = "";
let score = 0;
let timer = 120;
let gameinterval, Timerinterval;

let setRandomColor = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    const randomindex = Math.floor(Math.random() * colorNames.length);
    const randomcolor = colorNames[randomindex];
    cell.style.backgroundColor = randomcolor;
    cell.setAttribute("data-color", randomcolor);
  });
};

let settargetcolor = () => {
  const randomindex = Math.floor(Math.random() * colorNames.length);
  targetcolor = colorNames[randomindex];
  document.getElementById("Targetcolor").textContent = targetcolor;
};

let formattime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

let updatetimer = () => {
  timer--;
  document.getElementById("timer").textContent = formattime(timer);

  if (timer < 0) {
    endgame(false);
  }
};

let initializeGame = () => {
  score = 0;
  timer = 120;
  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = formattime(timer);
  document.getElementById("congratsOverlay").style.display = "none";
  document.getElementById("loseOverlay").style.display = "none";
  setRandomColor();
  settargetcolor();

  const bgm = document.getElementById("backgroundMusic");
  bgm.play();

  gameinterval = setInterval(setRandomColor, 1000);
  Timerinterval = setInterval(updatetimer, 1000);
};

let endgame = (iswin) => {
  clearInterval(gameinterval);
  clearInterval(Timerinterval);
  document.getElementById("backgroundMusic").pause();

  const overlay = iswin
    ? document.getElementById("congratsOverlay")
    : document.getElementById("loseOverlay");

  overlay.style.display = "block";

  if (iswin) {
    document.getElementById("WinMusic").play();
  } else {
    document.getElementById("LoseMusic").play();
  }
};

let handleClick = (e) => {
  const clickedColor = e.target.getAttribute("data-color");
  if (clickedColor === targetcolor) {
    score++;
    document.getElementById("score").textContent = score;
    if (score === winingScore) {
      endgame(true);
    }
    setRandomColor();
    settargetcolor();
    document.getElementById("correctMusic").play();
  } else {
    document.getElementById("incorrectMusic").play();
  }
};

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

document
  .getElementById("RestartGameOverlay")
  .addEventListener("click", initializeGame);
document
  .getElementById("RestartGameOverlayLose")
  .addEventListener("click", initializeGame);

initializeGame();
