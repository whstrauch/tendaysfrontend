class Player {
    constructor(playerId) {
        this.playerId = playerId;
        this.days = this.makeHand();
    }

    getId() {
        return this.playerId;
    }

    getDays() {
        return this.days;
    }

    makeHand() {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push(null)
        }
        return arr
    }

    


}

export default Player