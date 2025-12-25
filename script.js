const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsEl = document.getElementById("laps");

let startTime = 0;
let elapsed = 0;
let intervalId = null;
let running = false;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);

  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  const cs = String(centiseconds).padStart(2, "0");
  return `${mm}:${ss}.${cs}`;
}

function updateTimer() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  timerEl.textContent = formatTime(diff);
}

startBtn.addEventListener("click", () => {
  if (!running) {
    // start or resume
    running = true;
    startTime = Date.now();
    intervalId = setInterval(updateTimer, 10);
    startBtn.textContent = "Pause";
    startBtn.classList.add("running");
    lapBtn.disabled = false;
    resetBtn.disabled = false;
  } else {
    // pause
    running = false;
    clearInterval(intervalId);
    elapsed += Date.now() - startTime;
    startBtn.textContent = "Start";
    startBtn.classList.remove("running");
  }
});

lapBtn.addEventListener("click", () => {
  if (!running) return;
  const now = Date.now();
  const diff = now - startTime + elapsed;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapsEl.children.length + 1} – ${formatTime(diff)}`;
  lapsEl.prepend(li);
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  running = false;
  startTime = 0;
  elapsed = 0;
  timerEl.textContent = "00:00:00.00";
  lapsEl.innerHTML = "";
  startBtn.textContent = "Start";
  startBtn.classList.remove("running");
  lapBtn.disabled = true;
  resetBtn.disabled = true;
});
