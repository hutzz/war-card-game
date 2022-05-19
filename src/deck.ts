import { suit } from "./types";
import Card from "./Card";
class Deck {
	deck: Array<Card> = [];
	constructor(empty: boolean) {
		this.populateDeck();
		if (empty === true) this.deck = [];
	}
	public static shuffleDeck(deck: Array<Card>) {
		for (let i = deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[deck[i], deck[j]] = [deck[j], deck[i]];
		}
	}
	populateDeck() {
		for (const suit of [
			"Spades",
			"Clubs",
			"Hearts",
			"Diamonds",
		] as Array<suit>) {
			this.deck.push(new Card("Two", suit, 2));
			this.deck.push(new Card("Three", suit, 3));
			this.deck.push(new Card("Four", suit, 4));
			this.deck.push(new Card("Five", suit, 5));
			this.deck.push(new Card("Six", suit, 6));
			this.deck.push(new Card("Seven", suit, 7));
			this.deck.push(new Card("Eight", suit, 8));
			this.deck.push(new Card("Nine", suit, 9));
			this.deck.push(new Card("Ten", suit, 10));
			this.deck.push(new Card("Jack", suit, 11));
			this.deck.push(new Card("Queen", suit, 12));
			this.deck.push(new Card("King", suit, 13));
			this.deck.push(new Card("Ace", suit, 14));
		}
		Deck.shuffleDeck(this.deck);
	}
	// testDeck() {
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Ace", "Spades", 14));
	// 	this.deck.push(new Card("Ace", "Spades", 14));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Ace", "Spades", 14));
	// 	this.deck.push(new Card("Ace", "Spades", 14));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	this.deck.push(new Card("Three", "Spades", 3));
	// 	this.deck.push(new Card("Four", "Spades", 4));
	// 	Deck.shuffleDeck(this.deck);
	// }
}
export default Deck;
