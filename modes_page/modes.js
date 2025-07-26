// Wait until the full HTML page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select all buttons with the class 'playNowBtn'
  const playNowButtons = document.querySelectorAll(".playNowBtn");

  // Get the click sound audio element
  const clickSound = document.getElementById("clickSound");

  // Loop through each button and add click functionality
  playNowButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default anchor behavior (like jumping to href)

      // Get the target page from the button's 'href' attribute
      const destination = this.getAttribute("href");

      // Try to play the click sound
      const playPromise = clickSound.play();

      // If browser supports .play() returning a Promise
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // If sound plays successfully, wait a short time then redirect
            setTimeout(() => {
              window.location.href = destination;
            }, 250); // 250ms delay for sound effect
          })
          .catch((err) => {
            // If sound fails or is blocked, just redirect immediately
            console.warn("Sound blocked or failed to play:", err);
            window.location.href = destination;
          });
      } else {
        // Fallback for older browsers: just redirect
        window.location.href = destination;
      }
    });
  });
});
