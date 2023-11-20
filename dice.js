let player1Score = 0;
let player2Score = 0;
let player1Turn = Math.random() > 0.5;

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1ScoreBoard = document.getElementById("player1ScoreBoard")
const player2ScoreBoard = document.getElementById("player2ScoreBoard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")

const drawDieFace = (rollnum) => {
  const diceElement = document.createElement('div');
  
  switch (rollnum) {
    //two column divs, the four-face has 2 pips in each column, the sixth-face has 3.
    case 4:
    case 6: 
      if(rollnum === 4){
        for (let i=0; i < 2; i++) {      
          const colElement = document.createElement('div');
          colElement.classList.add('column');
          for (let j=0; j < 2; j++) { 
            const pipElement = document.createElement('span');
            pipElement.classList.add('pip');
            colElement.appendChild(pipElement);
          }
          diceElement.classList.add('fourth-face');
          diceElement.appendChild(colElement); 
        }
      }
      else{
        for (let i=0; i < 2; i++) {
          const colElement = document.createElement('div');
          colElement.classList.add('column');
          for (let j=0; j < 3; j++) { 
            const pipElement = document.createElement('span');
            pipElement.classList.add('pip');
            colElement.appendChild(pipElement);
          }
          diceElement.classList.add('sixth-face');
          diceElement.appendChild(colElement);  
        }
      }    
      break;

    //three column divs, first and last have two pips each, the middle has one pip span
      case 5:
      diceElement.classList.add('fifth-face');
      for (let i=0; i < 3; i++) { 
        const colElement = document.createElement('div');
        colElement.classList.add('column');
        if(i === 1){
          const pipElement = document.createElement('span');
          pipElement.classList.add('pip');
          colElement.appendChild(pipElement);
          diceElement.appendChild(colElement);
        }
        else{
            for (let j=0; j < 2; j++) { 
              const pipElement = document.createElement('span');
              pipElement.classList.add('pip');
              colElement.appendChild(pipElement);
            }
            diceElement.appendChild(colElement);
        }
      }
      break;

    case 1:
    case 2:
    case 3:
     
      if(rollnum === 1){
        diceElement.classList.add('first-face');
      }
      else if(rollnum === 2){
        diceElement.classList.add('second-face');
      }
      else{
        diceElement.classList.add('third-face');
      }

       //No column divs, up to three pip spans
      for (let i=0; i < rollnum; i++) {
        const pipElement = document.createElement('span');
        pipElement.classList.add('pip');
        diceElement.appendChild(pipElement); 
      }
      break; 
  }
  return diceElement;
}



function showDisplayButton() {
  rollBtn.style.display = "none"
  resetBtn.style.display = "block"
}

function reset(){
  resetBtn.style.display = "none"
  rollBtn.style.display = "block"
  player1Score = 0
  player2Score = 0
  player1Turn = Math.random() > 0.5;
  if(player1Turn){
    message.textContent = "Player 1 Turn"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
  }
  else{
    message.textContent = "Player 2 Turn"
    player1Dice.classList.remove("active")
    player2Dice.classList.add("active")
  }
  player1Dice.textContent = '-'
  player2Dice.textContent = '-'
  player1ScoreBoard.textContent = '0'
  player2ScoreBoard.textContent = '0'
}

/* Hook up a click event listener to the Roll Dice Button. */
rollBtn.addEventListener("click", function() {
  const randomNumber = Math.floor(Math.random() * 6) + 1
  const dieFace = drawDieFace(randomNumber);

  if(player1Turn){
    //player1Dice.textContent = randomNumber;
    if (player1Dice.hasChildNodes()) {
      player1Dice.removeChild(player1Dice.children[0]);
    }
    player1Dice.appendChild(dieFace);
    player1Score += randomNumber;
    player2ScoreBoard.classList.remove("newestScore");
    player1ScoreBoard.classList.add("newestScore");
    player1ScoreBoard.textContent = player1Score;
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
    message.textContent = "Player 2 Turn";

  }else{
    //player2Dice.textContent = randomNumber;
    if (player2Dice.hasChildNodes()) {
      player2Dice.removeChild(player2Dice.children[0]);
    }
    player2Dice.appendChild(dieFace);
    player2Score += randomNumber;
    player1ScoreBoard.classList.remove("newestScore");
    player2ScoreBoard.classList.add("newestScore")
    player2ScoreBoard.textContent = player2Score;
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
    message.textContent = "Player 1 Turn";
  }

  if (player1Score >= 20) {
    message.textContent = "Player 1 has won! 🥳";
    showDisplayButton();
    reset();

  } else if (player2Score >= 20) {
    message.textContent = "Player 2 has won! 🎉";
    showDisplayButton();
    reset();
}

  player1Turn = !player1Turn

});

resetBtn.addEventListener("click", reset);

//improvements

//1.random starts -- sometimes player 2 will start
//'Player 2 will begin' 

//2. Changing the colours

//3. Use dots on dice (flexgrid)