import { Console } from "@woowacourse/mission-utils";

export default class LottoView {
    showLottoCount(numberOfLotto) {
        Console.print(`\n${numberOfLotto}개를 구매했습니다.`);
    }

    showLottoList(lottos) {
        lottos.forEach((lotto) => {
            Console.print(`[${lotto.join(", ")}]`);
        });
    }
}