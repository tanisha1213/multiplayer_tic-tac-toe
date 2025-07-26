document.addEventListener("DOMContentLoaded", () => {
  // Select all game boxes
  const boxes = document.querySelectorAll(".box");

  // Select control buttons
  const resetBtn = document.querySelector("#resetBtn");
  const newGameBtn = document.querySelector("#newGameBtn");
  const homeBtn = document.querySelector("#homeBtn");
  const backBtn = document.getElementById("backBtn");

  // Message display area
  const msgContainer = document.querySelector(".msg-container");
  const msg = document.querySelector("#msg");
  const turnInfo = document.querySelector("#turnInfo");

  // Audio elements
  const click1 = document.getElementById("click1");
  const click2 = document.getElementById("click2");
  const gameover = document.getElementById("gameover");
  const victory = document.getElementById("victory");

  // Initial turn: Player O
  let turnO = true;

  // Define all winning combinations
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Reset the game to the initial state
  const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.classList.remove("show");
    newGameBtn.style.display = "none";
    turnInfo.innerText = "It's Player O's turn";
  };

  // Handle box click: mark O or X, play sound, check result
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        box.innerText = "O";
        click1.currentTime = 0;
        click1.play();
        turnInfo.innerText = "It's Player X's turn";
      } else {
        box.innerText = "X";
        click2.currentTime = 0;
        click2.play();
        turnInfo.innerText = "It's Player O's turn";
      }

      box.disabled = true;
      turnO = !turnO;

      checkWinner();
      checkDraw();
    });
  });

  // Disable all boxes (after win or draw)
  const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
  };

  // Enable and clear all boxes (for new game)
  const enableBoxes = () => {
    boxes.forEach(box => {
      box.disabled = false;
      box.innerText = "";
      box.classList.remove("winning-box");
    });
  };

  // Highlight winner and show message
  const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg.classList.add("show");
    msgContainer.classList.remove("hide");
    newGameBtn.style.display = "inline-block";
    victory.currentTime = 0;
    victory.play();
    disableBoxes();
    pattern.forEach(index => boxes[index].classList.add("winning-box"));
  };

  // Check for winner
  const checkWinner = () => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      const val1 = boxes[a].innerText;
      const val2 = boxes[b].innerText;
      const val3 = boxes[c].innerText;

      if (val1 && val1 === val2 && val2 === val3) {
        showWinner(val1, pattern);
        return;
      }
    }
  };

  // Check if game is a draw
  const checkDraw = () => {
    const allFilled = [...boxes].every(box => box.innerText !== "");
    const gameOver = !msg.classList.contains("show");

    if (allFilled && gameOver) {
      msg.innerText = "It's a Draw!";
      msg.classList.add("show");
      msgContainer.classList.remove("hide");
      newGameBtn.style.display = "inline-block";
      gameover.currentTime = 0;
      gameover.play();
    }
  };

  // Reset Button Click
  resetBtn.addEventListener("click", () => {
    click2.currentTime = 0;
    click2.play();
    resetGame();
  });

  // New Game Button Click
  newGameBtn.addEventListener("click", () => {
    click2.currentTime = 0;
    click2.play();
    resetGame();
  });

  // Home Button: Return to landing page
  homeBtn.addEventListener("click", () => {
    click1.currentTime = 0;
    click1.play();
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 300); // Slight delay to play sound
  });

  // Back Button: Go to mode selection
  backBtn.addEventListener("click", () => {
    window.location.href = "../modes_page/modes.html";
  });
});
