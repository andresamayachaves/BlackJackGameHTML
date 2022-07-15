const cardNums =["A","2","3","4","5","6","7","8","9","10","J","Q","K"];  
const suits = ["Heart", "Diamond", "Spades", "Clover"]

const valuesForCards = [11,2,3,4,5,6,7,8,9,10,10,10,10];

let sum = 0;
let dealerDeck = [];

let inHandCards = [];
let acesInHand = 0;
let earned = 0;
let instructionsBT = true;
let startGameBT = true;
let hitBT = false;
let standBT = false;
let outGame = true;

let messageElem1 = document.getElementById("message1");
let messageElem2 = document.getElementById("message2");
let messageElem3 = document.getElementById("message3");
let messageElem4 = document.getElementById("message4");
let messageElem5 = document.getElementById("message5");
let cardsElem    = document.getElementById("cards-elem");
let sumElem      = document.getElementById("sum-elem");
let button1      = document.getElementById("button1");


class Card{

  constructor(suit, number, value){
    this.suit = suit;
    this.number = number;
    this.value = value;
  }

}

class Player{

  constructor(name, age){
    this.name = name;
    this.age = age;
  }

}

function render(){
  cardsElem.textContent = "Cards in hand: "+ showCards(inHandCards);
  sumElem.textContent = "Sum: " + sum;
}

function showCards(cardsToShow){
  let cardString = cardsToShow[0][0]+"-"+cardsToShow[0][1].toString();
  for (let i = 1; i<cardsToShow.length; i++){
    cardString = cardString + ", " + cardsToShow[i][0]+"-"+cardsToShow[i][1].toString();
  }
  
  return cardString;
}

let z=0;

function fillDealerDeck(){
  for (let i in suits){
    z=0;
    for (let j in cardNums){      
      let cardX = new Card(suits[i],cardNums[j],valuesForCards[z]);      
      dealerDeck.push([cardX.suit, cardX.number, cardX.value]);
      z++;
    };
  }
}



function drawACard(){
  let selectedCardIndex = Math.floor(Math.random() * dealerDeck.length);
  let selectedCard = dealerDeck[selectedCardIndex];
  dealerDeck.splice(selectedCardIndex, 1);
  inHandCards.push(selectedCard);
  addCardValue(selectedCard);
}

function addCardValue(card){
  if (acesInHand >= 1){
    var thisCardValue = card[2];
  } else if (card[1]==="A"){
    thisCardValue = 1;
    acesInHand += 1;
  }
  else{thisCardValue = card[2];}
  
  sum += thisCardValue;
  render();
}

function hit(){    //ask for another card
  
  if(outGame == false){
    clearLines()
    drawACard();
    messageElem1.textContent = "Here's your new card...";
    render();
    check('hit');
  }

}

function stand(){
  messageElem1.textContent = "Let's check your cards...";
  render();
  check('stand');
}


function endGame(){
  messageElem1.textContent = "Game finished.";
  messageElem2.textContent = "You won $" + earned.toString();
  outGame() = true;
  earned = 0;
}

function wonRound(messagePart){
  earned += 1000;
  messageElem1.textContent = messagePart + "You won this round. + $1000!";
  endGame();
}

function check(action){

  if(sum<=21 && action==="hit"){
    messageElem1.textContent = "Press 'hit' again to draw a new card, or press 'stand' to play with these cards"; 
  }else if(sum>=18 && sum<=21 && action==="stand"){  
    wonRound(""); 
  } else{
    earned = 0;    
    endGame();
    messageElem1.textContent = "Sorry, you lose your bet.";
  } 
}

function clearLines(){
  messageElem1.textContent = "";
  messageElem2.textContent = "";
  messageElem3.textContent = "";
  messageElem4.textContent = "";
  messageElem5.textContent = "";

}



function instructions(){
  if(outGame){
    messageElem1.textContent = "You'll begin with 2 random cards, then you have to decide if you\
    draw 1 more each time."
    messageElem2.textContent = "You win only if your cards sum up between 18 and 21, \
    otherwise you lose."
    messageElem3.textContent =  "First time an Ace card appears it is going to get value 11"
    messageElem4.textContent = "In the next appeareances it will be 1.";
    messageElem5.textContent = "Let's play, Good luck!";
  }
}
  
function startGame(){

  if(outGame==true){
    outGame = false;
    clearLines();  
    fillDealerDeck();
    drawACard();
    drawACard();
    
    messageElem1.textContent = "Here are your 2 initial cards...";   
    render();
  }

}

function reset(){
  //clearLines();
  messageElem1.textContent = "Hello! Feeling lucky? Give it a Try!";
  cardsElem.textContent = "Cards in hand: -";
  sumElem.textContent = "Sum: -";

  sum = 0;
  dealerDeck = [];

  inHandCards = [];
  acesInHand = 0;
  earned = 0;
  instructionsBT = true;
  startGameBT = true;
  hitBT = false;
  standBT = false;
  outGame = true;
}