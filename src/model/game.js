import Player from "./player";
import { BaseDeck } from "../context/Constants";

class Game {
    constructor(playerId) {  // Takes array of player ids to generate hands for each
        this.deck = this.makeInitialDeck()
        this.player = this.createHand(playerId)
        this.draw = null;
        this.toReplace = null;
        this.faceUp = [
            [],
            [],
            []
        ]  //Three stacks
    }

    getPlayer() {
        return this.player;
    }

    getDeck() {
        return this.deck;
    }

    getStacks() {
        return this.faceUp;
    }

    updateDeck(newDeck) {
        this.deck = [...newDeck]
    }

    updateStacks(newFaceUp) {
        this.faceUp = newFaceUp.map(stack => [...stack])
    }

    findCard(cardId) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < this.faceUp[i].length; j++) {
                if (this.faceUp[i][j].id === cardId) {
                    return i;
                }
            }
        }
        for (let i = 0; i < 10; i++) {
            if (this.player.days[i]?.id === cardId) {
                return i + 3;
            }
        }
        return -1
    }

    drawCard() {
        // Draw card from top of deck
        if (this.deck.length === 0) {
            // Shuffle lower cards of three face up stacks
            this.deck = this.shuffle(false, [])
        }
        let card = this.deck.pop();
        this.draw = card;
        

        return true;
    }

    test(active) {
        console.log("Successful test.", active)
    }

    canMove(originalPos, newPos, playerId) {
        // Check if valid move
        // Get player hand


    }

    moveCard(cardId, newPos) {
        // Check can move
        console.log("TO MOVE", cardId, "TO", newPos)
        const originalPos = this.findCard(cardId)
        console.log("Original Pos", originalPos)
        if (originalPos === newPos) {
            return "same"
        }
        
        if (originalPos === -1) {
            let card;
            if (this.draw == null && this.toReplace != null) {
                console.log("Replace")
                card = this.toReplace;
                this.toReplace = null;
            } else if (this.toReplace == null && this.draw != null) {
                console.log("Draw")
                card = this.draw;
                this.draw = null;
            } else {
                console.log("ERROR")
            }
            if (newPos < 3) {
                this.faceUp[newPos].push(card);
            } else {
                this.toReplace = this.player.days[newPos - 3];
                this.player.days[newPos - 3] = card;
            }
        } else if (originalPos < 3) {
            console.log(originalPos, newPos, cardId)
            let card = this.faceUp[originalPos].pop();
            this.toReplace = this.player.days[newPos - 3];
            this.player.days[newPos - 3] = card;
        } else {
            console.log("FACEUP", this.faceUp)
            let card = this.player.days[originalPos - 3];
            this.player.days[originalPos - 3] = null;
            this.faceUp[newPos].push(card);
        }
        if (this.toReplace !== null) {
            return "replace"
        } else {
            return "done"
        }
    }

    addToStack(card, stack) {
        // Check player
        this.faceUp[stack].push(card)
    }

    // Not needed 
    findPlayer(id) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].getId() === id) {
                return this.players[i]
            } 
        }
        return null
    }

    makeInitialDeck() {
        // let firstDeck = [
        //     "algeria",
        //     "angola-",
        //     "boc-",
        //     "benin",
        //     "botswana",
        //     "burkinafaso",
        //     "cameroon-",
        //     "carep",
        //     "chad",
        //     "chad",
        //     "congo",
        //     "d.r.c.-",
        //     "d.r.c.-",
        //     "egypt-",
        //     "eritrea",
        //     "ethiopia",
        //     "gabon",
        //     "ghana-",
        //     "guinea",
        //     "ivory coast",
        //     "kenya-",
        //     "liberia",
        //     "libya-",
        //     "madagascar",
        //     "mali",
        //     "mali",
        //     "mauritania",
        //     "morocco-",
        //     "mozambique-",
        //     "namibia-",
        //     "niger-",
        //     "niger-",
        //     "nigeria-",
        //     "planeY",
        //     "planeY",
        //     "planeB",
        //     "planeB",
        //     "planeG",
        //     "planeG",
        //     "planeO",
        //     "planeO",
        //     "planeP",
        //     "planeP",
        //     "rwanda-",
        //     "senegal-",
        //     "sierraleone-",
        //     "somalia-",
        //     "south africa-",
        //     "sudan-",
        //     "sudan-",
        //     "tanzania-",
        //     "togo-",
        //     "tunisia-",
        //     "uganda-",
        //     "zambia-",
        //     "zimbabwe-",
        //     "car",
        //     "car",
        //     "car",
        //     "car",
        //     "car"
        // ]
        let firstDeck = JSON.parse(JSON.stringify(BaseDeck))

        return this.shuffle(true, firstDeck)
    }

    createHand(playerId) {
        return new Player(playerId)
    }

    shuffle(first, arr) {
        if (!first) {
            // Pop off top 3 face ups and store in new arrays
            // Add remaining 3 stacks to deck
            // Call original shuffle
        } 
        // Fisher-Yates shuffle https://bost.ocks.org/mike/shuffle/
        let m = arr.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = arr[m];
            arr[m] = arr[i];
            arr[i] = t;
        }

        return arr;     
    }

}

export default Game