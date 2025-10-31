import { Console } from "@woowacourse/mission-utils";
import { Lotto } from "../model/Lotto.js";
import { BuyLotto } from "../model/BuyLotto.js";
import { Bonus } from "../model/Bonus.js";

export default class LottoController {
    async run() {
        const price = Console.readLineAsync("구입금액을 입력해 주세요. \n");
        new BuyLotto(price);

        const lottoNumbers = Console.readLineAsync("당첨 번호를 입력해 주세요. \n");
        new Lotto(lottoNumbers);

        const bonusNumber = Console.readLineAsync("보너스 번호를 입력 해주세요. \n");
        new Bonus(bonusNumber);
    }
}