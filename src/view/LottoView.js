import { Console } from "@woowacourse/mission-utils";
import { MATCH_MESSAGES } from "../constants/Messages.js";

export default class LottoView {
    showLottoCount(numberOfLotto) {
        Console.print(`\n${numberOfLotto}개를 구매했습니다.`);
    }

    showLottoList(lottos) {
        lottos.forEach((lotto) => {
            Console.print(`[${lotto.join(", ")}]`);
        });
    }

    showWinningStatus(matchLottoCount) {
        Console.print("\n당첨 통계 \n---");
        Console.print(`${MATCH_MESSAGES.THREE_MATCH} - ${matchLottoCount.three}개`);
        Console.print(`${MATCH_MESSAGES.FOUR_MATCH} - ${matchLottoCount.four}개`);
        Console.print(`${MATCH_MESSAGES.FIVE_MATCH} - ${matchLottoCount.five}개`);
        Console.print(`${MATCH_MESSAGES.FIVE_BONUS_MATCH} - ${matchLottoCount.fiveBonus}개`);
        Console.print(`${MATCH_MESSAGES.SIX_MATCH} - ${matchLottoCount.six}개`);
    }

    showTotalReturnRate(totalReturnRate) {
        Console.print(`총 수익률은 ${totalReturnRate}%입니다.`);
    }
}