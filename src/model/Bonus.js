import { Lotto } from "./Lotto.js";

export default class Bonus {
    #bonusNumber;

    constructor(bonusNumber) {
        this.#bonusNumber = bonusNumber;
    }

    getBonusNumber() {
        return this.#bonusNumber;
    }
}