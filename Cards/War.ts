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
		// console.log("P1 deck now looks like: ");
		// for (let x = 0; x < Object.keys(p1.deck).length; x++) {
		// 	console.log(`${p1.deck[x].name} of ${p1.deck[x].suit}`);
		// }
		// console.log("P2 deck currently looks like (not swapped): ");
		// for (let x = 0; x < Object.keys(p2.deck).length; x++) {
		// 	console.log(`${p2.deck[x].name} of ${p2.deck[x].suit}`);
		// }
	}
	if (
		Object.keys(p2.deck).length === 0 &&
		Object.keys(p2s.deck).length !== 0
	) {
		console.log("Switching decks...");
		p2.deck = p2s.deck;
		p2s.deck = [];
		// console.log("P2 deck now looks like: ");
		// for (let x = 0; x < Object.keys(p2.deck).length; x++) {
		// 	console.log(`${p2.deck[x].name} of ${p2.deck[x].suit}`);
		// }
		// console.log("P1 deck currently looks like (not swapped): ");
		// for (let x = 0; x < Object.keys(p1.deck).length; x++) {
		// 	console.log(`${p1.deck[x].name} of ${p1.deck[x].suit}`);
		// }
	}
}

function compareCards(c1: Card, c2: Card) {
	if (c1.power === c2.power) {
		//deckSwitch();
		war();
		//deckSwitch();
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
		deckSwitch();
		console.log("Player 1's turn");
		getUserInput();
		p1hand = p1.deck.pop()!;
		//deckSwitch();
		if (p1hand === undefined) p1hand = new Card("empty", "none", 0);
		if (checkWin(p1, p2, p1s, p2s, p1hand, p2hand)) throw "Exiting...";
		console.log(`Player 1 draws the ${p1hand.name} of ${p1hand.suit}`);
		t = !t;
	} else {
		deckSwitch();
		console.log("\nPlayer 2's turn");
		getUserInput();
		p2hand = p2.deck.pop()!;
		//deckSwitch();
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
		hand1 === undefined ||
		(Object.keys(p1deck.deck).length === 0 &&
			Object.keys(p1alt.deck).length === 0 &&
			hand1.suit === "none")
	) {
		console.log("Player 2 wins!");
		return true;
	} else if (
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
		p1WarDeck.deck.push(p1hand);
		p2WarDeck.deck.push(p2hand);
		p1hand = new Card("empty", "none", 0);
		p2hand = new Card("empty", "none", 0);
		war();
	} else if (p1hand.power > p2hand.power) {
		console.log("Player 1 wins the war");
		console.log("Player 1 wins the following:");
		for (let x = 0; x < Object.keys(p2WarDeck.deck).length; x++) {
			console.log(
				`${p2WarDeck.deck[x].name} of ${p2WarDeck.deck[x].suit}`
			);
		}
		for (let x = 0; x < Object.keys(p2WarDeck.deck).length; x++) {
			p1s.deck.push(p2WarDeck.deck.pop()!);
		}
		console.log("Player 2 could have won:");
		for (let x = 0; x < Object.keys(p1WarDeck.deck).length; x++) {
			console.log(
				`${p1WarDeck.deck[x].name} of ${p1WarDeck.deck[x].suit}`
			);
		}
		for (let x = 0; x < Object.keys(p1WarDeck.deck).length; x++) {
			p1s.deck.push(p1WarDeck.deck.pop()!);
		}
	} else {
		console.log("Player 2 wins the war");
		console.log("Player 2 wins the following:");
		for (let x = 0; x < Object.keys(p1WarDeck.deck).length; x++) {
			console.log(
				`${p1WarDeck.deck[x].name} of ${p1WarDeck.deck[x].suit}`
			);
		}
		for (let x = 0; x < Object.keys(p1WarDeck.deck).length; x++) {
			p2s.deck.push(p1WarDeck.deck.pop()!);
		}
		console.log("Player 1 could have won:");
		for (let x = 0; x < Object.keys(p2WarDeck.deck).length; x++) {
			console.log(
				`${p2WarDeck.deck[x].name} of ${p2WarDeck.deck[x].suit}`
			);
		}
		for (let x = 0; x < Object.keys(p2WarDeck.deck).length; x++) {
			p2s.deck.push(p2WarDeck.deck.pop()!);
		}
	}
	deckSwitch();
}

let p1 = new Deck(true);
let p1s = new Deck(true);
p1s.deck = [];
let p1hand = new Card("empty", "none", 0);
let p1WarDeck = new Deck(true);

let p2 = new Deck(true);
let p2s = new Deck(true);
p2s.deck = [];
let p2hand = new Card("empty", "none", 0);
let p2WarDeck = new Deck(true);

const deckSize: number = 52;

let t: boolean = true; // player 1 when true

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
	// console.log("Player 1 deck: ");
	// for (let x = 0; x < Object.keys(p1.deck).length; x++) {
	// 	console.log(`${p1.deck[x].name} of ${p1.deck[x].suit}`);
	// }
	// console.log("\nP1 auxiliary deck: ");
	// for (let x = 0; x < Object.keys(p1s.deck).length; x++) {
	// 	console.log(`${p1s.deck[x].name} of ${p1s.deck[x].suit}`);
	// }
	// console.log("\nPlayer 2 deck: ");
	// for (let x = 0; x < Object.keys(p2.deck).length; x++) {
	// 	console.log(`${p2.deck[x].name} of ${p2.deck[x].suit}`);
	// }
	// console.log("\nP2 auxiliary deck: ");
	// for (let x = 0; x < Object.keys(p2s.deck).length; x++) {
	// 	console.log(`${p2s.deck[x].name} of ${p2s.deck[x].suit}`);
	// }
}
console.log("Exiting...");
