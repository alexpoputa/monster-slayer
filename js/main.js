// Variables
var introScreen = document.getElementsByClassName("intro-screen");
var resetScreen = document.getElementsByClassName("reset-screen");
var startGame = document.getElementById("startGame");
var winningMsg = document.getElementById("winningMsg");

// Player buttons
var btnAttack = document.getElementById("attackBtn");
var btnBlock = document.getElementById("blockBtn");
var anb = document.getElementById("anbBtn");

// Hp values/text from hp bar of player and enemy before and after each attack
var knightHpValue = document.getElementsByClassName("knight-bar-value");
var monsterHpValue = document.getElementsByClassName("monster-bar-value");
var knightHpAfter = 100;
var monsterHpAfter = 100;

// var monsterHpAfter = 100;
var knightText = document.getElementById("knightHpText");
var monsterText = document.getElementById("monsterHpText");

// Character image
var knightImg = document.getElementsByClassName("knight");
var monsterImg = document.getElementsByClassName("monster");

// Default values for blocking/coins/etc.
var blockValue = 0;
var defaultCoins = 3;

// Text values of certain elements + their icons
var shieldValue = document.getElementById("shieldValue");
var shieldItem = document.getElementById("shieldIcon");
var coinsValue = document.getElementById("coinsValue");
coinsValue.innerHTML = defaultCoins;
var playerTurn = document.getElementById("playerTurn");
var enemyTurn = document.getElementById("enemyTurn");

var round = 1;
var roundInfo = document.getElementById("roundInfo");

var attacks = [20, 23, 26, 30, 37, 42, 48, 50, 55];
var randomAttack = attacks[Math.floor(Math.random() * attacks.length)];
var monsterAttack = document.getElementById("monsterAttack").innerHTML = "<img src='./assets/sword.png' id='monsterSword'></img>" + randomAttack;
var rest;

// Menu buttons
var resetBtn = document.getElementById("resetBtn");
var resetBtnTwo = document.getElementById("resetBtnTwo");
var infoBtn = document.getElementById("infoBtn");

// Close the intro screen
startGame.addEventListener("click",function(){
  introScreen[0].classList.toggle('fade');
  setTimeout(()=>{
    introScreen[0].style.display = 'none';
  }, 500)
})

// Reset the game
resetBtn.addEventListener("click", resetGame);
resetBtnTwo.addEventListener("click", function(){
  resetScreen[0].style.display = 'none';
  resetGame();
});

// Player buttons functionality
btnAttack.addEventListener("click",attack);
btnBlock.addEventListener("click",function(){
  block();
  setTimeout(function(){
    shieldItem.classList.remove("shaking");
    shieldValue.classList.remove("shaking");
  },250)
});
anbBtn.addEventListener("click",attackAndBlock);

// Player Attack
function attack(){
  const shakeClass = function() {
    monsterImg[0].classList.add('shaking');
  }
  const attackClass = function() {
    knightImg[0].classList.remove('attacking');
  }
  const enableBtn = function() {
    btnAttack.disabled = false;
    btnBlock.disabled = false;
    anbBtn.disabled = false;
  }
  monsterHpAfter -= 15;  
  monsterHpValue[0].style.width = monsterHpAfter + "%";
  monsterText.innerHTML = monsterHpAfter;
  
  knightImg[0].classList.remove('shaking');
  knightImg[0].classList.add('attacking');
  btnAttack.disabled = true;
  btnBlock.disabled = true;
  anbBtn.disabled = true;
  setTimeout(shakeClass,400);
  monsterImg[0].classList.remove('shaking');
  setTimeout(attackClass,1700);
  setTimeout(enableBtn, 1500); 
  defaultCoins--;
  coinsValue.innerHTML = defaultCoins;
  checkTurn();
}

// Player Block
function block(){
  blockValue += 15;
  if(blockValue > 0) {
    shieldItem.classList.remove("hide");
    shieldValue.classList.remove("hide");
    shieldItem.classList.add("shaking");
    shieldValue.classList.add("shaking");
  }
  shieldValue.innerHTML = blockValue;
  defaultCoins--;
  coinsValue.innerHTML = defaultCoins;
  checkTurn();
}

// Player Attack and block
function attackAndBlock(){
  const shakeClass = function(){
    monsterImg[0].classList.add('shaking');
  }
  const attackClass = function() {
    knightImg[0].classList.remove('attacking');
  }
  const enableBtn = function() {
    anbBtn.disabled = false;
    btnBlock.disabled = false;
    btnAttack.disabled = false;
  }
  monsterHpAfter -= 10;  
  monsterHpValue[0].style.width = monsterHpAfter + "%";
  monsterText.innerHTML = monsterHpAfter;

  knightImg[0].classList.remove('shaking');
  knightImg[0].classList.add('attacking');
  anbBtn.disabled = true;
  btnBlock.disabled = true;
  btnAttack.disabled = true;
  setTimeout(shakeClass,400);
  monsterImg[0].classList.remove('shaking');
  setTimeout(attackClass,1700);
  setTimeout(enableBtn, 1500); 
 
  blockValue += 5;
  if(blockValue > 0) {
    shieldItem.classList.remove("hide");
    shieldValue.classList.remove("hide");
  }
  shieldValue.innerHTML = blockValue;
  defaultCoins--;
  coinsValue.innerHTML = defaultCoins;
  checkTurn();
}

// Enemy Attack
function enemyAttack(){
  const shakeClass = function(){
    knightImg[0].classList.add('shaking');
  }
  const attackClass = function() {
    monsterImg[0].classList.remove('monster-attacking');
  }
  
  if(defaultCoins == 0) {
    btnAttack.disabled = true;
    btnBlock.disabled = true;
    anbBtn.disabled = true;
  }
  
  if(randomAttack < blockValue) {
    shieldItem.classList.add("hide");
    shieldValue.classList.add("hide");
  }else if(randomAttack == blockValue) {
    shieldItem.classList.add("hide");
    shieldValue.classList.add("hide");
  }else if(randomAttack > blockValue) {
    rest = randomAttack - blockValue;
    shieldItem.classList.add("hide");
    shieldValue.classList.add("hide");
    knightHpAfter -= Math.abs(rest);
    if(knightHpAfter <= 0){
      knightHpAfter = 0;
      setTimeout(function(){
        resetScreen[0].style.display = 'block';
        winningMsg.innerHTML = 'Monster won!';
      }, 1500)
    }
  }
  knightHpValue[0].style.width = knightHpAfter + "%";
  knightText.innerHTML = knightHpAfter;
  
  monsterImg[0].classList.remove('shaking');
  monsterImg[0].classList.add('monster-attacking');
  setTimeout(shakeClass,400);
  knightImg[0].classList.remove('shaking');
  setTimeout(attackClass,1700);
  setTimeout(() => {
    defaultCoins = 3;
    coinsValue.innerHTML = defaultCoins;
    playerRound();
  }, 1800);
  randomNum();
}

// Check turn
function checkTurn(){
  if(monsterHpAfter <= 0){
    monsterHpAfter = 0;
    monsterHpValue[0].style.width = '0%';
    monsterText.innerHTML = monsterHpAfter;
    setTimeout(function(){
      resetScreen[0].style.display = 'block';
      winningMsg.innerHTML = 'Player won!';
    }, 1500)
  }
  if(defaultCoins == 0) {
    enemyRound();
  }
}

// Player Turn
function playerRound(){
  round++;
  roundInfo.innerHTML = "Round: " + round;
  playerTurn.classList.remove("hide");
  enemyTurn.classList.add("hide");
  btnAttack.disabled = false;
  btnBlock.disabled = false;
  anbBtn.disabled = false;
  blockValue = 0;
  shieldValue.innerHTML = blockValue;
}

// Enemy Turn
function enemyRound(){
  if(defaultCoins == 0) {
    btnAttack.disabled = true;
    btnBlock.disabled = true;
    anbBtn.disabled = true;
  }
  playerTurn.classList.add("hide");
  enemyTurn.classList.remove("hide");
  
  setTimeout(() => {
    enemyAttack();
  }, 1500);
}

// Function to get random generated attack number
function randomNum(){
  randomAttack = attacks[Math.floor(Math.random() * attacks.length)];
  monsterAttack = document.getElementById("monsterAttack").innerHTML = "<img src='./assets/sword.png' id='monsterSword'></img>" + randomAttack;
}

// Function to reset the game
function resetGame(){
  defaultCoins = 3;
  coinsValue.innerHTML = defaultCoins;
  blockValue = 0;
  round = 1;
  roundInfo.innerHTML = 'Round: 1';
  monsterHpAfter = 100;
  monsterHpValue[0].style.width = '100%';
  monsterText.innerHTML = monsterHpAfter;
  knightHpAfter = 100;
  knightHpValue[0].style.width = "100%";
  knightText.innerHTML = knightHpAfter;
  randomNum();
}
