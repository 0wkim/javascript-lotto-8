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

    getLotto(numberOfLotto) {
        const lottos = [];

        for (let i = 0; i < numberOfLotto; i++) {
            const lotto = Random.pickUniqueNumbersInRange(1, 45, 6);
            lottos.push(lotto);
        }

        return lottos;
    }

    // iterateByLottoCount(numberOfLotto) {
    //     const lottos = [];

    //     for (let i = 0; i < numberOfLotto; i++) {
    //         lottos.push(this.getLotto());
    //     }

    //     return lottos;
    // }
}