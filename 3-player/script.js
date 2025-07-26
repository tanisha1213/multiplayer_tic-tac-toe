document.addEventListener("DOMContentLoaded", () => {
  // Select all game boxes
  const boxes = document.querySelectorAll(".box");

  // Buttons
  const resetBtn = document.querySelector("#resetBtn");
  const newGameBtn = document.querySelector("#newGameBtn");
  const homeBtn = document.querySelector("#homeBtn");
  const backBtn = document.getElementById("backBtn");

  // Message container & text
  const msgContainer = document.querySelector(".msg-container");
  const msg = document.getElementById("msg");

  // Audio elements
  const click1 = document.getElementById("click1");
  const click2 = document.getElementById("click2");
  const click3 = document.getElementById("click3");
  const gameover = document.getElementById("gameover");
  const victory = document.getElementById("victory");

  // Turn info display
  const turnInfo = document.getElementById("turnInfo");

  // Game state
  let currentTurn = 0; // Index for players array

  // Players and Sounds
  const players = ["O", "X", "△"];
  const sounds = [click1, click2, click3];

  // Winning combinations (3 in a row)
  const winningPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],            // Diagonals
  ];

  // Reset game state
  const resetGame = () => {
    currentTurn = 0;
    enableBoxes();

    msgContainer.classList.add("hide");
    msg.classList.remove("show");
    newGameBtn.style.display = "none";

    turnInfo.innerText = `It's Player ${players[currentTurn]}'s turn`;
  };

  // Check for a winner
  const checkWinner = () => {
    for (let pattern of winningPattern) {
      const [i, j, k] = pattern;
      const a = boxes[i].innerText;
      const b = boxes[j].innerText;
      const c = boxes[k].innerText;

      if (a && b && c && a === b && b === c) {
        showWinner(a, pattern);
        return;
      }
    }
  };

  // Check for draw
  const checkDraw = () => {
    const allFilled = [...boxes].every((box) => box.innerText !== "");
    const winnerShown = !msgContainer.classList.contains("hide");

    if (allFilled && !winnerShown) {
      msg.innerText = "It's a Draw!";
      msg.classList.add("show");
      msgContainer.classList.remove("hide");
      newGameBtn.style.display = "inline-block";

      gameover.currentTime = 0;
      gameover.play();
    }
  };

  // Show winner and highlight pattern
  const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msg.classList.add("show");
    msgContainer.classList.remove("hide");
    newGameBtn.style.display = "inline-block";

    victory.currentTime = 0;
    victory.play();

    disableBoxes();

    pattern.forEach(index => {
      boxes[index].classList.add("winning-box");
    });
  };

  // Disable all boxes
  const disableBoxes = () => {
    boxes.forEach(box => {
      box.disabled = true;
    });
  };

  // Enable all boxes and clear content
  const enableBoxes = () => {
    boxes.forEach(box => {
      box.disabled = false;
      box.innerText = "";
      box.classList.remove("winning-box");
    });
  };

  // Box click handler
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      const symbol = players[currentTurn];

      box.innerText = symbol;
      box.disabled = true;

      // Play current player's sound
      const sound = sounds[currentTurn];
      sound.currentTime = 0;
      sound.play();

      // Switch to next player's turn
      currentTurn = (currentTurn + 1) % 3;
      turnInfo.innerText = `It's Player ${players[currentTurn]}'s turn`;

      // Check result
      checkWinner();
      checkDraw();
    });
  });

  // Reset or New Game button handler
  const handleGameReset = () => {
    click2.currentTime = 0;
    click2.play();
    resetGame();
  };

  resetBtn.addEventListener("click", handleGameReset);
  newGameBtn.addEventListener("click", handleGameReset);

  // Go to Home Page
  homeBtn.addEventListener("click", () => {
    click1.currentTime = 0;
    click1.play();
    setTimeout(() => {
      window.location.href = "../index.html"; // Update path if needed
    }, 300);
  });

  // Go back to Mode Selection
  backBtn.addEventListener("click", () => {
    window.location.href = "../modes_page/modes.html";
  });

  // Start game initially
  resetGame();
});
