let cards = []
let sum = 0
let hasBlackjack = false;
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.querySelector("#sum-el")
let cardsEl = document.querySelector("#cards-el")

let player = {
    name: "Jason",
    chips: 145
}

let playerEl = document.querySelector("#player-el")
playerEl.textContent = player.name + ": $" + player.chips

function startGame() {
    isAlive = true
    hasBlackjack = false
    firstCard = getRandomCard()
    secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.innerHTML = "Cards: " + cards
    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21){
        message = "You've got BlackJack!"
        hasBlackjack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    
    messageEl.textContent = message
}

function newCard() {
    if (isAlive && !hasBlackjack) {

        let card = getRandomCard();
        cards.push(card)
        sum += card;
        renderGame()
    }
}

function getRandomCard() {

    randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber === 1) {
        randomNumber = 11
    } else if (randomNumber > 10) {
        randomNumber = 10
    }
    return randomNumber
}