document.addEventListener("DOMContentLoaded", function () {
  const playNowBtn = document.getElementById("playNowBtn");
  const clickSound = document.getElementById("clickSound");

  if (playNowBtn && clickSound) {
    playNowBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Stop normal navigation

      const playPromise = clickSound.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setTimeout(() => {
              window.location.href = "modes_page/modes.html"; // Correct relative path
            }, 250); // Delay for sound
          })
          .catch((error) => {
            console.warn("Audio failed to play:", error);
            window.location.href = "modes_page/modes.html";
          });
      } else {
        window.location.href = "modes_page/modes.html";
      }
    });
  }
});
