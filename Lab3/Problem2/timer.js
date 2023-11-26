// timer.js
document.addEventListener("DOMContentLoaded", () => {
  const hoursInput = document.getElementById("hours");
  const minutesInput = document.getElementById("minutes");
  const secondsInput = document.getElementById("seconds");
  const startButton = document.getElementById("start-button");
  const stopButton = document.getElementById("stop-button");
  const restartButton = document.getElementById("restart-button");
  const countdownSection = document.getElementById("countdown-section");
  const zeroSection = document.getElementById("zero-section");

  const hoursDisplay = document.getElementById("hours-display");
  const minutesDisplay = document.getElementById("minutes-display");
  const secondsDisplay = document.getElementById("seconds-display");
  const zeroDisplay = document.getElementById("zero-display");

  let remainingSeconds;
  let countdownTimer;

  function calculateTotalSeconds() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    return hours * 3600 + minutes * 60 + seconds;
  }

  function updateDisplay() {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    hoursDisplay.textContent = hours.toString().padStart(2, '0');
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
  }

  function startCountdown() {
    stopButton.disabled = false;
    startButton.disabled = true;

    remainingSeconds = calculateTotalSeconds();
    updateDisplay();

    countdownTimer = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds -= 1;
        updateDisplay();
      } else {
        stopCountdown();
        finishCountdown();
      }
    }, 1000);
  }

  function stopCountdown() {
    clearInterval(countdownTimer);

    startButton.disabled = false;
    stopButton.disabled = true;
  }

  function finishCountdown() {
    countdownSection.style.display = 'none';
    zeroSection.style.display = 'flex';
    zeroDisplay.textContent = '00';
  }

  function restartCountdown() {
    countdownSection.style.display = 'flex';
    zeroSection.style.display = 'none';

    remainingSeconds = 0;
    updateDisplay();
  }

  startButton.addEventListener("click", startCountdown);
  stopButton.addEventListener("click", stopCountdown);
  restartButton.addEventListener("click", restartCountdown);
});
