import { Random } from "@woowacourse/mission-utils";

export default class BuyLotto {
    #price;
    #numberOfLotto;

    constructor(price) {
        this.#price = price;
    }

    getNumberOfLotto(price) {
        this.#numberOfLotto = Number(price) / 1000;
        return this.#numberOfLotto;
    }

    getLotto() {
        const numbersList = [];

        for (let i = 0; i < 6; i++) {
            const randomNumber = Random.pickUniqueNumbersInRange(1, 45, 6);
            numbersList.push(randomNumber);
        }

        return numbersList;
    }

    // iterateByLottoCount(numberOfLotto) {
    //     const lottos = [];

    //     for (let i = 0; i < numberOfLotto; i++) {
    //         lottos.push(getRandomNumbers());
    //     }

    //     return lottos;
    // }
}