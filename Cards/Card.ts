import { suit } from "./types";
class Card {
	name: string;
	suit: string;
	power: number = 0;

	constructor(name: string, suit: suit, power: number) {
		this.name = name;
		this.suit = suit;
		this.power = power;
	}
}
export default Card;
