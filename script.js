let deck = [];
let dealerHand = [];
let playerHand = [];

const suits = ['Hearts ', 'Diamonds ', 'Clubs ', 'Spades '];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({suit, value});
        }
    }
    shuffleDeck();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function getCardValue(card) {
    if (card.value === 'A') {
        return 11;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
        return 10;
    } else {
        return parseInt(card.value);
    }
}

function calculateHandValue(hand) {
    let value = hand.reduce((sum, card) => sum + getCardValue(card), 0);
    let aces = hand.filter(card => card.value === 'A').length;

    while (value > 21 && aces > 0) {
        value -= 10;
        aces -= 1;
    }

    return value;
}

function dealInitialCards() {
    dealerHand = [deck.pop(), deck.pop()];
    playerHand = [deck.pop(), deck.pop()];

    displayCards();
}

function displayCards() {
    document.getElementById('dealer-cards').innerHTML = dealerHand.map(card => `<div>${card.value} of ${card.suit}</div>`).join('');
    document.getElementById('player-cards').innerHTML = playerHand.map(card => `<div>${card.value} of ${card.suit}</div>`).join('');

    document.getElementById('dealer-score').textContent = `Score: ${calculateHandValue(dealerHand)}`;
    document.getElementById('player-score').textContent = `Score: ${calculateHandValue(playerHand)}`;
}

function hit() {
    playerHand.push(deck.pop());
    displayCards();

    if (calculateHandValue(playerHand) > 21) {
        endGame('Bust! You lose.');
    }
}

function stand() {
    while (calculateHandValue(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }

    displayCards();

    const playerScore = calculateHandValue(playerHand);
    const dealerScore = calculateHandValue(dealerHand);

    if (dealerScore > 21 || playerScore > dealerScore) {
        endGame('You win!');
    } else if (dealerScore > playerScore) {
        endGame('Dealer wins.');
    } else {
        endGame('It\'s a tie!');
    }
}

function endGame(message) {
    document.getElementById('result-message').textContent = message;
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
    document.getElementById('restart-button').style.display = 'inline-block';
}

function restartGame() {
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('result-message').textContent = '';

    createDeck();
    dealInitialCards();
}

document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);
document.getElementById('restart-button').addEventListener('click', restartGame);

createDeck();
dealInitialCards();
