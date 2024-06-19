let credits = 50;
let bet = 0;
let gameStarted = false;
let dealerPlayTurn = false;

let difference = 0;

let cards = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10,
  10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 10, 10, 10, 11
];

let playerScore = 0;
let playerHand = [];
let dealerScore = 0;
let dealerHand = [];
let draw = [];

let highScore = 0;

let handEl = document.getElementById('handEL');
let scoreEl = document.getElementById('scoreEL');
let dealerHandEl = document.getElementById('dealerHandEL');
let dealerScoreEl = document.getElementById('dealerScoreEL');
let tipsEl = document.getElementById('tipsEL');
let creditsEL = document.getElementById('creditsEL');
let highScoreEL = document.getElementById('highScoreEL');

let dealerArray = ["url('/images/biscuit.png')", "url('/images/blackjack.png')",
  "url('/images/bust-dealer.png')", "url('/images/bust.png')",
  "url('/images/capital-g.png')", "url('/images/draw.png')", "url('/images/got-you.png')",
  "url('/images/have-it.png')", "url('/images/neutral.png')", "url('/images/no-credits.png')",
  "url('/images/not-going.png')", "url('/images/ok.png')", "url('/images/ooo.png')",
  "url('/images/player-draw.png')", "url('/images/spicy.png')", "url('/images/start.png')",
  "url('/images/win.png')", "url('/images/winning-now.png')"]

let dealerImage = document.getElementById("image")

function shuffleCards(array) {
  for (let i = 0; i < cards.length; i++) {
    var rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]]
  }
}

function updatePlayerHand() {
  dealerImage.style.backgroundImage = dealerArray[13]
  if (dealerPlayTurn === false) {
    if (gameStarted === true && dealerPlayTurn === false) {
      draw = cards.splice(0, 1);
      if (playerScore <= 21) {
        if (draw[0] === 11 && playerScore > 10) {
          playerHand += 1 + ' ';
          playerScore += 1;
        } else {
          playerHand += draw[0] + ' ';
          playerScore += draw[0];
        }
        handEl.textContent = 'Player: ' + playerHand;
        scoreEl.textContent = playerScore;
        draw = [];
        tipsEl.textContent = '-';
      } else {
        dealerImage.style.backgroundImage = dealerArray[3];
        tipsEL.textContent = 'Oops, you are bust!';
        if (credits > 0) {
          setTimeout(endRound, 2000);
        } else {
          setTimeout(endRound, 2000);
        }
      }
    } else {
      tipsEL.textContent = 'You need to start a round.';
    }
  }
}

function updateDealerHand() {
  draw = cards.splice(0, 1);
  if (draw[0] === 11 && dealerScore > 10) {
    dealerHand += 1 + ' ';
    dealerScore += 1;
  } else {
    dealerHand += draw[0] + ' ';
    dealerScore += draw[0];
  }
  dealerHandEl.textContent = 'Dealer: ' + dealerHand;
  dealerScoreEl.textContent = dealerScore;
  draw = [];
  tipsEl.textContent = '-';
}

function startGame() {
  if (dealerPlayTurn === false) {
    if (gameStarted === false) {
      gameStarted = true;
      shuffleCards(cards);
      shuffleCards(cards);
      updatePlayerHand();
      updatePlayerHand();
      bet += Math.ceil((credits / 5) / 10) * 10;
      credits -= Math.ceil((credits / 5) / 10) * 10;
      creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;
      dealerImage.style.backgroundImage = dealerArray[15];
    } else {
      dealerImage.style.backgroundImage = dealerArray[8];
      tipsEL.textContent = 'You have already started...';
    }
  } else {
  }
}

function betCreditsAll() {
  if (playerScore <= 21) {
    if (dealerPlayTurn === false) {
      if (gameStarted === true) {
        if (credits > 0) {
          bet += credits;
          credits -= credits;
          creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;
        } else {
          dealerImage.style.backgroundImage = dealerArray[9];
          tipsEl.textContent = 'You have no more credits!';
        }
      } else {
        dealerImage.style.backgroundImage = dealerArray[11];
        tipsEL.textContent = 'You need to start a round.';
      }
    }
  } else {
    dealerImage.style.backgroundImage = dealerArray[3];
    tipsEL.textContent = 'Dang, you are bust!';
    setTimeout(endRound, 2000);
  }
}

function betCredits10() {
  if (playerScore <= 21) {
    if (dealerPlayTurn === false) {
      if (gameStarted === true) {
        if (credits > 5) {
          credits -= 10;
          bet += 10;
          creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;
        } else {
          dealerImage.style.backgroundImage = dealerArray[9];
          tipsEl.textContent = "You don't have 10 credits!";
        }
      } else {
        dealerImage.style.backgroundImage = dealerArray[11];
        tipsEL.textContent = 'You need to start a round.';
      }
    }
  } else {
    dealerImage.style.backgroundImage = dealerArray[3];
    tipsEL.textContent = 'Oh oh, you are bust!';
    setTimeout(endRound, 2000);
  }
}

function betCredits50() {
  if (playerScore <= 21) {
    if (dealerPlayTurn === false) {
      if (gameStarted === true) {
        if (credits >= 50) {
          credits -= 50;
          bet += 50;
          creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;
        } else {
          dealerImage.style.backgroundImage = dealerArray[9];
          tipsEl.textContent = "You don't have 50 credits!";
        }
      } else {
        dealerImage.style.backgroundImage = dealerArray[11];
        tipsEL.textContent = 'You need to start a round.';
      }
    }
  } else {
    dealerImage.style.backgroundImage = dealerArray[3];
    tipsEL.textContent = 'Ahh, you are bust!';
    setTimeout(endRound, 2000);
  }
}

function dealerTurn() {
  if (gameStarted === true) {
    if (dealerPlayTurn === false) {
      if (playerScore <= 21 && gameStarted === true) {
        updateDealerHand();
        updateDealerHand();
        dealerDraw();
      } else if (gameStarted === true) {
        dealerImage.style.backgroundImage = dealerArray[3];
        tipsEL.textContent = 'Oh no you are bust!';
        setTimeout(endRound, 2000);
      } else {
        tipsEL.textContent = 'You need to start a round.';
      }
    }
    dealerPlayTurn = true;
  } else {
    dealerImage.style.backgroundImage = dealerArray[7];
    tipsEL.textContent = "Don't you want a go?"
  }
}

function dealerDraw() {
  let chance = Math.floor(Math.random() * 49 + 1);
  difference = 21 - dealerScore;
  if (dealerScore <= 21) {
    if (dealerScore > playerScore) {
      dealerImage.style.backgroundImage = dealerArray[12];
      tipsEL.textContent = "Ooo, that's a nice hand!";
      setTimeout(endRound, 3000);
    } else if (difference > 7) {
      dealerImage.style.backgroundImage = dealerArray[17];
      tipsEL.textContent = 'Winning for now...';
      setTimeout(updateDealerHand, 2000);
      setTimeout(scoreCheck, 3000);
    } else if (difference >= 3) {
      if (difference ** 2 >= chance) {
        dealerImage.style.backgroundImage = dealerArray[0];
        tipsEL.textContent = 'For the biscuit???';
        setTimeout(updateDealerHand, 2000);
        setTimeout(scoreCheck, 3000);
      } else {
        dealerImage.style.backgroundImage = dealerArray[14];
        tipsEL.textContent = 'Too spicy for me!';
        setTimeout(scoreCheck, 3000);
      }
    } else {
      dealerImage.style.backgroundImage = dealerArray[10];
      tipsEL.textContent = 'Not going to risk it!';
      setTimeout(scoreCheck, 3000);
    }
  }
}

function scoreCheck() {
  if (playerScore === 21 && dealerScore === 21) {
    dealerImage.style.backgroundImage = dealerArray[4];
    tipsEl.textContent = 'Capital G gaming here!';
    credits += bet + 10;
    bet = 0;
    creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;
  } else if (playerScore === 21 && dealerScore < 21) {
    dealerImage.style.backgroundImage = dealerArray[1];
    tipsEl.textContent = 'Blackjack, well done!';
    credits += bet * 2 + 20;
    bet = 0;
    creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;
  } else if (playerScore === dealerScore) {
    dealerImage.style.backgroundImage = dealerArray[5];
    tipsEl.textContent = 'What are the odds!';
    credits += bet + 10;
    bet = 0;
    creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;
  } else if (playerScore > dealerScore) {
    if (dealerScore > 15) {
      dealerImage.style.backgroundImage = dealerArray[16];
      tipsEl.textContent = 'Well played, you win!';
      credits += bet * 2;
      bet = 0;
      creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;
    } else {
      dealerImage.style.backgroundImage = dealerArray[7];
      tipsEl.textContent = "I'll let you have this one...";
      credits += bet * 2;
      bet = 0;
      creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;
    }
  } else if (dealerScore <= 21) {
    dealerImage.style.backgroundImage = dealerArray[6];
    tipsEl.textContent = 'Got you this time!';
    bet = 0;
    creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;
  } else {
    dealerImage.style.backgroundImage = dealerArray[2];
    tipsEl.textContent = "Oh no! I'm Bust!";
    credits += bet * 2;
    bet = 0;
    creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;
  }

  if (credits > highScore) {
    highScore = credits;
    highScoreEL.textContent = 'HighScore: ' + highScore;
  }

  setTimeout(endRound, 2000);
}

function endRound() {

  if (credits > 0) {
    dealerImage.style.backgroundImage = dealerArray[11];
    tipsEl.textContent = 'Ok...';
    setTimeout(resetGame, 1500);
  } else {
    dealerImage.style.backgroundImage = dealerArray[7];
    tipsEl.innerHTML = "<button id='new-game' onclick='hardResetGame()' >New Game</button>";
  }
}

function resetGame() {
  bet = 0;
  gameStarted = false;
  dealerPlayTurn = false;
  cards = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10,
    10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 10, 10, 10, 11
  ];
  playerScore = 0;
  playerHand = [];
  dealerScore = 0;
  dealerHand = [];
  draw = [];

  handEL.textContent = '-';
  scoreEL.textContent = '-';
  dealerHandEL.textContent = '-';
  dealerScoreEL.textContent = '-';
  tipsEl.textContent = 'Time for another round.';
  creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;

  dealerImage.style.backgroundImage = dealerArray[8];
}

function hardResetGame() {
  bet = 0;
  credits = 50;
  gameStarted = false;
  dealerPlayTurn = false;
  cards = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10,
    10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 10, 10, 10, 11
  ];
  playerScore = 0;
  playerHand = [];
  dealerScore = 0;
  dealerHand = [];
  draw = [];

  handEL.textContent = '-';
  scoreEL.textContent = '-';
  dealerHandEL.textContent = '-';
  dealerScoreEL.textContent = '-';
  tipsEl.textContent = 'Best of luck.';
  creditsEL.textContent = `You have ${credits} credits, you have bet ${bet} credits.`;

  dealerImage.style.backgroundImage = dealerArray[8];
}
