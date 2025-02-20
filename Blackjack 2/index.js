let player = {
    chips: 200
}

let dealer = 200
let cards = []
let dealerCards = []
let sum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let isTurn = true
let rightToPlay = true 
let dealerFirstCard = 0
let dealerSecondCard = 0
const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const playerEl = document.getElementById("player-el")
const dealerCardsEl = document.getElementById("dealer-cards-el")
const dealerSumEL = document.getElementById("dealer-sum-el")
const resultEl = document.getElementById("result-el")
const dealerChips = document.getElementById("dealer-chips")

playerEl.textContent = "Chips: $" + player.chips

dealerChips.textContent = "Chips: $" + dealer

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}
function newGame() {
    if (rightToPlay === true && isTurn === true) {
        resultEl.textContent = ""
        dealerSumEL.textContent = "Sum: "
        dealerCardsEl.textContent = "Cards: "
        isAlive = true
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        dealerFirstCard = getRandomCard()
        dealerSecondCard = getRandomCard()
        dealerCards = [dealerFirstCard, dealerSecondCard]
        dealerSum = dealerFirstCard + dealerSecondCard
        rightToPlay = false
        renderGame()
        dealerTurn()
        stopnewGame()
    }    
}

function stopnewGame() {
    rightToPlay = false
    
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        rightToPlay = true
        hasBlackJack = true
        isTurn = false
        if (dealerSum === 21) {
        draw()
        } else {
            win()
            rightToPlay = true
            throw new Error("Execution aborted");
        }
    } else {
        message = "You're out of the game!"
        isAlive = false
        lose()
        throw new Error("Execution aborted");
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false && isTurn === true) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function stopTurn() {
    if (isAlive === true) {
        isTurn = false
        dealerSecondTurn()
        messageEl.textContent = "Your turn is over"
    }
}

function win() {
    resultEl.textContent = "You win!"
    player.chips = player.chips * 2
    playerEl.textContent = "Chips: $" + player.chips
    dealer = dealer / 2
    dealerChips.textContent = "Chips: $" + dealer
    rightToPlay = true
    isTurn = true
    hasBlackJack = false
    isAlive = false
}

function lose() {
    resultEl.textContent = "You loose!"
    player.chips = player.chips / 2
    playerEl.textContent = "Chips: $" + player.chips
    dealer = dealer * 2
    dealerChips.textContent = "Chips: $" + dealer
    rightToPlay = true
    isTurn = true
    hasBlackJack = false
    isAlive = false
}

function draw() {
    resultEl.textContent = "It's a draw!"
    rightToPlay = true
    hasBlackJack = false
    isTurn = true
    isAlive = false
}

function dealerTurn() {
    rightToPlay = true
    dealerSumEL.textContent += dealerSum 
    for ( let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }  

}

function dealerSecondTurn() {
    if (dealerSum < 17) {
        let dealerThirdCard = getRandomCard()
        let dealerFourthCard = getRandomCard()
        let dealerFifthCard = getRandomCard()
        if (dealerSum >= 17) {
            console.log("17 mit zwei Karten")
        } else {
            dealerSum += dealerThirdCard
            dealerCards.push(dealerThirdCard)
            console.log("17 mit drei Karten")
            if (dealerSum < 17) {
                dealerSum += dealerFourthCard 
                dealerCards.push(dealerFourthCard)
                console.log("17 mit vier Karten")
                }
                if (dealerSum < 17) {
                    dealerSum += dealerFifthCard
                    dealerCards.push(dealerFifthCard)
                    console.log("17 mit fünf Karten")
                }
        }
        dealerSumEL.textContent ="Sum: " + dealerSum 
        console.log(dealerCards)
        dealerCardsEl.textContent = "Cards: "
        for ( let i = 0;i < dealerCards.length;i++) {
            dealerCardsEl.textContent += dealerCards[i] + " "  
        }
    } 
    winner()
}

function winner() {
    if (hasBlackJack === false && isAlive === true) {
        if (dealerSum > 21) {
            win()
        } else {
            if (sum < dealerSum) {
                lose()
            } else if (sum > dealerSum) {
                win()
            } else {
                draw()
            }
        }
    }
}