const cardNums =["A","2","3","4","5","6","7","8","9","10","J","Q","K"];  
const suits = ["Heart", "Diamond", "Ace", "Clover"]

const valuesForCards = [11,2,3,4,5,6,7,8,9,10,11,12,13];

let sum = 0;
let dealerDeck = [];

let inHandCards = [];
let acesInHand = 0;
let Earned = 0;



//let age = 30;
//--change

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




/*
function admitToClub(){
  let admit = false;

  if(age <=22) {    
    console.log("You cannot enter the club");    
  }else{
    console.log("Welcome!")
    admit=true; 
  }
  return admit;
} */

function showCards(cardsToShow){
  let cardString = "";
  for (let i in cardsToShow){
    cardString = i.suit+i.number.toString();
  }
  
  return cardString;
}

function fillDealerDeck(){
  for (let i in suits){
    for (let j in cardNums){
      for (let k in valuesForCards){
        let cardX = new Card(i,j,k);
        dealerDeck.push(cardX);
      };
    }
  }
}


function drawACard(){
  let selectedCardIndex = Math.floor(Math.random() * dealerDeck.length);
  let selectedCard = dealerDeck[selectedCardIndex];
  dealerDeck.splice(selectedCardIndex, 1);
  inHandCards.push(selectedCard);
}

function addCardValue(card){
  if (acesInHand >= 1){
    var thisCardValue = card.value;
  } else if (card.number==="A"){
    thisCardValue = 1;
    acesInHand += 1;
  }
  else{thisCardValue = card.value;}
  
  sum += thisCardValue;
}

function sumCards(cards){
  cards.forEach(addCardValue);
  return sum;
}


function hit(){    //ask for another card
    
    clearLines()
    drawACard();
    messageElem1.textContent = "Here's your new card...";
    sum = sumCards(inHandCards);
  
    messageElem1textContent = "Cards in hand: " + showCards(inHandCards);
    messageElem1.textContent = "Sum: " + sum.toString;

    check();

}

function stand(){

  drawACard();
  sum = sumCards(inHandCards);

  cardsElem.textContent = "Cards in hand: " + showCards(inHandCards);
  sumElem.textContent = "Sum: " + sum.toString;
}


function endGame(){
  messageElem1.textContent = "Game finished.";
  messageElem2.textContent = message;"You won $" + Earned.toString;
}

function wonRound(messagePart){
  messageElem1.textContent = messagePart + "You won this round. + $1000!";
  Earned += 1000;
}

function check(){
  let message = "";
  if(sum<=21){
    message = "Press 'hit' to draw a new card, or press 'stand' to play with these cards"; 
  }else if(sum===21){wonRound("BLACKJACK! ");
  }else if (sum>=18){wonRound("");
  }else{
    message = "Sorry, you lose your bet.";
    Earned = 0;
    endGame();
  } 
  messageElem1.textContent = message;
}

function clearLines(){
  messageElem1.textContent = "";
  messageElem2.textContent = "";
  messageElem3.textContent = "";
  messageElem4.textContent = "";
  messageElem5.textContent = "";

}



function start(){
  
  messageElem1.textContent = "You'll begin with 2 random cards, then you have to decide if you\
  draw 1 more each time."
  messageElem2.textContent = "You win only if your cards sum up between 18 and 21, \
  otherwise you lose."
  messageElem3.textContent =  "First time an Ace card appears it is going to get value 11"
  messageElem4.textContent = "In the next appeareances it will be 1.";
  messageElem5.textContent = "Let's play, Good luck!";
}
  
function startGame(){

  clearLines();
  fillDealerDeck();  
  drawACard();
  drawACard(); 
  messageElem1.textContent = "Here are your 2 initial cards...";   
  cardsElem.textContent = "Cards: " + showCards(inHandCards);
  sumElem.textContent = "Sum: " + sum;;
  check();  
}


//let data = getPlayerData();
//createPlayer("Carl", 56);
//startGame();
//check();