import { Console } from "@woowacourse/mission-utils";

import BuyLotto from "../model/BuyLotto.js";
import LottoView from "../view/LottoView.js";

export default class LottoController {
    constructor() {
        this.view = new LottoView();

        this.numberOfLotto = 0;
        this.lottos = [];
    }

    async run() {
        const price = await Console.readLineAsync("구입금액을 입력해 주세요. \n");
        
        const lottoBuyer = new BuyLotto(price);
        this.numberOfLotto = lottoBuyer.getNumberOfLotto(price);
        this.lottos = lottoBuyer.getLotto(this.numberOfLotto);

        this.view.showLottoCount(this.numberOfLotto);
        this.view.showLottoList(this.lottos);

        // const lottoNumbers = Console.readLineAsync("당첨 번호를 입력해 주세요. \n");
        // new Lotto(lottoNumbers);

        // const bonusNumber = Console.readLineAsync("보너스 번호를 입력 해주세요. \n");
        // new Bonus(bonusNumber);

        

    }
}