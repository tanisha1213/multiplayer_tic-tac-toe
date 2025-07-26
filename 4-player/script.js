// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select all 25 boxes
  const boxes = document.querySelectorAll(".box");

  // Buttons for reset, new game, and home navigation
  const rstbtn = document.querySelector("#resetBtn");
  const newbtn = document.querySelector("#newGameBtn");
  const homeBtn = document.querySelector("#homeBtn");
  const backBtn = document.getElementById("backBtn");

  // Message elements for showing result
  const msgcontainer = document.querySelector(".msg-container");
  const msg = document.querySelector("#msg");

  // Turn info (e.g., "Player O's turn")
  const turnInfo = document.querySelector("#turnInfo");

  // Audio elements
  const click1 = document.getElementById("click1");
  const click2 = document.getElementById("click2");
  const gameover = document.getElementById("gameover");
  const victory = document.getElementById("victory");

  // Players and corresponding sounds
  const players = ["O", "X", "△", "☐"];
  const sounds = [click1, click2, click1, click2];

  // Game state
  let currentTurn = 0;

  // All possible winning patterns for 4-in-a-row (horizontal, vertical, diagonal)
  const winningPattern = [
    [0, 1, 2, 3], [1, 2, 3, 4],
    [5, 6, 7, 8], [6, 7, 8, 9],
    [10,11,12,13], [11,12,13,14],
    [15,16,17,18], [16,17,18,19],
    [20,21,22,23], [21,22,23,24],

    [0,5,10,15], [5,10,15,20],
    [1,6,11,16], [6,11,16,21],
    [2,7,12,17], [7,12,17,22],
    [3,8,13,18], [8,13,18,23],
    [4,9,14,19], [9,14,19,24],

    [0,6,12,18], [1,7,13,19],
    [5,11,17,23], [6,12,18,24],

    [3,7,11,15], [4,8,12,16],
    [8,12,16,20], [9,13,17,21]
  ];

  // Function to reset the game state
  const resetGame = () => {
    currentTurn = 0;
    enableBoxes();
    msgcontainer.classList.add("hide"); // Hide message box
    msg.classList.remove("show");       // Hide animation
    newbtn.style.display = "none";      // Hide new game button
    turnInfo.innerText = `It's Player ${players[currentTurn]}'s turn`;
  };

  // Handle box clicks
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      const symbol = players[currentTurn];
      box.innerText = symbol;

      // Play the corresponding click sound
      sounds[currentTurn].currentTime = 0;
      sounds[currentTurn].play();

      // Disable clicked box
      box.disabled = true;

      // Change turn
      currentTurn = (currentTurn + 1) % players.length;
      turnInfo.innerText = `It's Player ${players[currentTurn]}'s turn`;

      // Check game status
      checkWinner();
      checkDraw();
    });
  });

  // Disable all boxes (after win or draw)
  const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
  };

  // Enable all boxes and clear marks
  const enableBoxes = () => {
    boxes.forEach((box) => {
      box.disabled = false;
      box.innerText = "";
      box.classList.remove("winning-box");
    });
  };

  // Show winner, highlight boxes, play victory sound
  const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg.classList.add("show");
    msgcontainer.classList.remove("hide");
    newbtn.style.display = "inline-block";
    victory.currentTime = 0;
    victory.play();
    disableBoxes();

    // Highlight the winning pattern
    pattern.forEach(index => {
      boxes[index].classList.add("winning-box");
    });
  };

  // Check all patterns for a win
  const checkWinner = () => {
    for (let pattern of winningPattern) {
      const [i1, i2, i3, i4] = pattern;
      const v1 = boxes[i1].innerText;
      const v2 = boxes[i2].innerText;
      const v3 = boxes[i3].innerText;
      const v4 = boxes[i4].innerText;

      if (v1 && v1 === v2 && v2 === v3 && v3 === v4) {
        showWinner(v1, pattern);
        return;
      }
    }
  };

  // Check if all boxes are filled but no winner
  const checkDraw = () => {
    const allFilled = [...boxes].every(box => box.innerText !== "");
    if (allFilled && msgcontainer.classList.contains("hide")) {
      msg.innerText = "It's a Draw!";
      msg.classList.add("show");
      msgcontainer.classList.remove("hide");
      newbtn.style.display = "inline-block";
      gameover.currentTime = 0;
      gameover.play();
    }
  };

  // Reset button handler
  rstbtn.addEventListener("click", () => {
    click2.currentTime = 0;
    click2.play();
    resetGame();
  });

  // New game button handler
  newbtn.addEventListener("click", () => {
    click2.currentTime = 0;
    click2.play();
    resetGame();
  });

  // Home button handler
  homeBtn.addEventListener("click", () => {
    click1.currentTime = 0;
    click1.play();
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 300);
  });

  // Back to mode selection page
  backBtn.addEventListener("click", () => {
    window.location.href = "../modes_page/modes.html"; 
  });
});
