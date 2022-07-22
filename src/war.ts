import Deck from "./Deck";
import Card from "./Card";
const prompt = require("prompt-sync")();

function getUserInput() {
	while (1) {
		let userInput = prompt("Time to draw: ");
		if (userInput === "draw") {
			break;
		} else if (userInput === "exit") {
			throw "Exiting...";
		} else {
			console.log("Try again");
		}
	}
	return;
}

function deckSwitch() {
	if (
		Object.keys(p1.deck).length === 0 &&
		Object.keys(p1s.deck).length !== 0
	) {
		console.log("Switching decks...");
		p1.deck = p1s.deck;
		p1s.deck = [];
		Deck.shuffleDeck(p1.deck);
	}
	if (
		Object.keys(p2.deck).length === 0 &&
		Object.keys(p2s.deck).length !== 0
	) {
		console.log("Switching decks...");
		p2.deck = p2s.deck;
		p2s.deck = [];
		Deck.shuffleDeck(p2.deck);
	}
}

function compareCards(c1: Card, c2: Card) {
	if (c1.power === c2.power) {
		war();
	} else if (c1.power > c2.power) {
		deckSwitch();
		console.log("\nPlayer 1 wins the battle");
		p1s.deck.push(c1);
		p1s.deck.push(c2);
		p1hand = new Card("empty", "none", 0);
		p2hand = new Card("empty", "none", 0);
		deckSwitch();
	} else if (c1.power < c2.power) {
		deckSwitch();
		console.log("\nPlayer 2 wins the battle.");
		p2s.deck.push(c1);
		p2s.deck.push(c2);
		p1hand = new Card("empty", "none", 0);
		p2hand = new Card("empty", "none", 0);
		deckSwitch();
	}
}

function drawCycle(turn: boolean) {
	if (turn) {
		// logic for player 1's turn
		deckSwitch();
		console.log("Player 1's turn");
		getUserInput();
		p1hand = p1.deck.pop()!;
		if (p1hand === undefined) p1hand = new Card("empty", "none", 0);
		if (checkWin(p1, p2, p1s, p2s, p1hand, p2hand)) throw "Exiting...";
		console.log(`Player 1 draws the ${p1hand.name} of ${p1hand.suit}`);
		t = !t;
	} else {
		// logic for player 2's turn
		deckSwitch();
		console.log("\nPlayer 2's turn");
		getUserInput();
		p2hand = p2.deck.pop()!;
		if (p2hand === undefined) p2hand = new Card("empty", "none", 0);
		if (checkWin(p1, p2, p1s, p2s, p1hand, p2hand)) throw "Exiting...";
		console.log(`Player 2 draws the ${p2hand.name} of ${p2hand.suit}`);
		t = !t;
	}
}

function checkWin(
	p1deck: Deck,
	p2deck: Deck,
	p1alt: Deck,
	p2alt: Deck,
	hand1: Card,
	hand2: Card
) {
	if (
		// draw
		(hand1 === undefined && hand2 === undefined) ||
		(Object.keys(p1deck.deck).length === 0 &&
			Object.keys(p1alt.deck).length === 0 &&
			hand1.suit === "none" &&
			Object.keys(p2deck.deck).length === 0 &&
			Object.keys(p2alt.deck).length === 0 &&
			hand2.suit === "none")
	) {
		console.log("The game is drawn!");
		return true;
	} else if (
		// p2 win
		hand1 === undefined ||
		(Object.keys(p1deck.deck).length === 0 &&
			Object.keys(p1alt.deck).length === 0 &&
			hand1.suit === "none")
	) {
		console.log("Player 2 wins!");
		return true;
	} else if (
		// p1 win
		hand2 === undefined ||
		(Object.keys(p2deck.deck).length === 0 &&
			Object.keys(p2alt.deck).length === 0 &&
			hand2.suit === "none")
	) {
		console.log("Player 1 wins!");
		return true;
	}
	return false;
}
function war() {
	console.log("War!");
	console.log("Player 1 deck: ");
	for (let x = 0; x < Object.keys(p1.deck).length; x++) {
		console.log(`${p1.deck[x].name} of ${p1.deck[x].suit}`);
	}
	console.log("Player 2 deck: ");
	for (let x = 0; x < Object.keys(p2.deck).length; x++) {
		console.log(`${p2.deck[x].name} of ${p2.deck[x].suit}`);
	}
	// place 3 cards from each player's deck into their respective war decks
	for (let x = 0; x < 3; x++) {
		deckSwitch();
		if (checkWin(p1, p2, p1s, p2s, p1hand, p2hand)) throw "Exiting...";
		p1WarDeck.deck.push(p1.deck.pop()!);
		p2WarDeck.deck.push(p2.deck.pop()!);
		deckSwitch();
		if (checkWin(p1, p2, p1s, p2s, p1hand, p2hand)) throw "Exiting...";
	}
	deckSwitch();
	if (checkWin(p1, p2, p1s, p2s, p1hand, p2hand)) throw "Exiting...";
	console.log("Three cards placed down");
	drawCycle(t);
	drawCycle(t);
	if (p1hand.power === p2hand.power) {
		// push players' hands into war decks as well, as in the case of nested wars the hands from the first war are effectively the same as the cards placed down at the start
		p1WarDeck.deck.push(p1hand);
		p2WarDeck.deck.push(p2hand);
		p1hand = new Card("empty", "none", 0);
		p2hand = new Card("empty", "none", 0);
		war(); // recursively call the war function in the case of nested wars
	} else if (p1hand.power > p2hand.power) {
		// p1 win
		console.log("Player 1 wins the war");
		console.log("Player 1 wins the following:");
		console.log(`${p2hand.name} of ${p2hand.suit}`);
		for (let x = 0; x < Object.keys(p2WarDeck.deck).length; x++) {
			console.log(
				`${p2WarDeck.deck[x].name} of ${p2WarDeck.deck[x].suit}`
			);
		}
		console.log("Player 2 could have won:");
		console.log(`${p1hand.name} of ${p1hand.suit}`);
		for (let x = 0; x < Object.keys(p1WarDeck.deck).length; x++) {
			console.log(
				`${p1WarDeck.deck[x].name} of ${p1WarDeck.deck[x].suit}`
			);
		}
		p1WarDeck.deck.push(p2hand); // push loser's hand to winner's war deck
		p1WarDeck.deck.push(p1hand); // put winner's hand into winner's war deck
		p1hand = new Card("empty", "none", 0);
		p2hand = new Card("empty", "none", 0);
		// push loser's war deck to winner's auxiliary deck
		for (let x = 0; x < Object.keys(p2WarDeck.deck).length; x++) {
			p1s.deck.push(p2WarDeck.deck.pop()!);
		}
		// push winner's war deck to winner's auxiliary deck
		for (let x = 0; x < Object.keys(p1WarDeck.deck).length; x++) {
			p1s.deck.push(p1WarDeck.deck.pop()!);
		}
	} else {
		// p2 win
		console.log("Player 2 wins the war");
		console.log("Player 2 wins the following:");
		console.log(`${p1hand.name} of ${p1hand.suit}`);
		for (let x = 0; x < Object.keys(p1WarDeck.deck).length; x++) {
			console.log(
				`${p1WarDeck.deck[x].name} of ${p1WarDeck.deck[x].suit}`
			);
		}
		console.log("Player 1 could have won:");
		console.log(`${p2hand.name} of ${p2hand.suit}`);
		for (let x = 0; x < Object.keys(p2WarDeck.deck).length; x++) {
			console.log(
				`${p2WarDeck.deck[x].name} of ${p2WarDeck.deck[x].suit}`
			);
		}
		p2WarDeck.deck.push(p2hand); // push winner's hand to winner's war deck
		p2WarDeck.deck.push(p1hand); // push loser's hand to winner's war deck
		p1hand = new Card("empty", "none", 0);
		p2hand = new Card("empty", "none", 0);
		// push loser's war deck to winner's auxiliary deck
		for (let x = 0; x < Object.keys(p1WarDeck.deck).length; x++) {
			p2s.deck.push(p1WarDeck.deck.pop()!);
		}
		// push winner's war deck to winner's auxiliary deck
		for (let x = 0; x < Object.keys(p2WarDeck.deck).length; x++) {
			p2s.deck.push(p2WarDeck.deck.pop()!);
		}
	}
	deckSwitch();
}

let p1 = new Deck(true); // main deck
let p1s = new Deck(true); // auxiliary deck, where cards that are won end up - eventually integrates into main deck
p1s.deck = [];
let p1hand = new Card("empty", "none", 0); // player's hand
let p1WarDeck = new Deck(true); // keeps track of placed cards during war

let p2 = new Deck(true);
let p2s = new Deck(true);
p2s.deck = [];
let p2hand = new Card("empty", "none", 0);
let p2WarDeck = new Deck(true);

const deckSize: number = 52;

let t: boolean = true; // turn toggle - player 1's turn when true

let exitFlag: boolean = false;

let starter = new Deck(false);
for (let x = 0; x < deckSize / 2; x++) {
	p1.deck.push(starter.deck.pop()!);
}
for (let x = 0; x < deckSize / 2; x++) {
	p2.deck.push(starter.deck.pop()!);
}

while (!exitFlag) {
	// checkWin(p1, p2, p1s, p2s, p1hand, p2hand);
	if (checkWin(p1, p2, p1s, p2s, p1hand, p2hand)) throw "Exiting...";
	drawCycle(t);
	if (exitFlag) break;
	drawCycle(t);
	if (exitFlag) break;
	deckSwitch();
	compareCards(p1hand, p2hand);
	console.log(
		`\nPlayer 1 has ${
			Object.keys(p1.deck).length +
			Object.keys(p1s.deck).length +
			Object.keys(p1WarDeck.deck).length
		} cards left`
	);
	console.log(
		`Player 2 has ${
			Object.keys(p2.deck).length +
			Object.keys(p2s.deck).length +
			Object.keys(p2WarDeck.deck).length
		} cards left\n`
	);
}
console.log("Exiting...");
