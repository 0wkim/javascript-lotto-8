import { Console } from "@woowacourse/mission-utils";

import BuyLotto from "../model/BuyLotto.js";
import Lotto from "../model/Lotto.js";
import LottoView from "../view/LottoView.js";
import { parseNumbers } from "../utils/numberParser.js";

export default class LottoController {
    constructor() {
        this.view = new LottoView();

        this.numberOfLotto = 0;
        this.lottos = [];

        this.matchCountList = [];
        this.matchLottoCount = {};
    }

    async run() {
        const price = await Console.readLineAsync("구입금액을 입력해 주세요. \n");
        
        const lottoBuyer = new BuyLotto(price);
        this.numberOfLotto = lottoBuyer.getNumberOfLotto(price);
        this.lottos = lottoBuyer.getLotto(this.numberOfLotto);

        this.view.showLottoCount(this.numberOfLotto);
        this.view.showLottoList(this.lottos);

        const buyerLottoNumbers = await Console.readLineAsync("당첨 번호를 입력해 주세요. \n");
        const bonusNumber = await Console.readLineAsync("보너스 번호를 입력해 주세요. \n");

        const buyerLottoNumbersList = parseNumbers(buyerLottoNumbers);
        const matchChecking = new Lotto(buyerLottoNumbersList);
        this.matchCountList = matchChecking.getMatchCountList(this.lottos);
        this.matchLottoCount = matchChecking.getMatchLottoCount(this.matchCountList, this.lottos, bonusNumber);

        Console.print(JSON.stringify(this.matchLottoCount));
        // const 

        // const lottoNumbers = Console.readLineAsync("당첨 번호를 입력해 주세요. \n");
        // new Lotto(lottoNumbers);

        // const bonusNumber = Console.readLineAsync("보너스 번호를 입력 해주세요. \n");
        // new Bonus(bonusNumber);

        

    }
}