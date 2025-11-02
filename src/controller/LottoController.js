import { Console } from "@woowacourse/mission-utils";
import ValidateUserInput from "../validation/UserInputValidator.js";
import BuyLotto from "../model/BuyLotto.js";
import Lotto from "../Lotto.js";
import LottoView from "../view/LottoView.js";
import { parseNumbers } from "../utils/numberParser.js";

export default class LottoController {
    constructor() {
        this.validator = new ValidateUserInput();
        this.view = new LottoView();

        this.price = 0;
        this.buyerLottoNumbers = [];

        this.numberOfLotto = 0;
        this.lottos = [];

        this.matchCountList = [];
        this.matchLottoCount = {};
    }

    // 구매 금액 입력
    async #getPriceInput() {
        while(true) {
            try {
                const input = await Console.readLineAsync("구입금액을 입력해 주세요. \n");
                const numPrice = Number(input.trim());
                const price = this.validator.checkPriceInput(numPrice);
                return price;
            } catch(error) {
                Console.print(`${error.message}\n`);
            }
        }
    }

    // 구매 금액 처리
    #handlePrice(price) {
        const lottoBuyer = new BuyLotto();
        this.numberOfLotto = lottoBuyer.getNumberOfLotto(price);
        this.lottos = lottoBuyer.getLotto(this.numberOfLotto);

        this.view.showLottoCount(this.numberOfLotto);
        this.view.showLottoList(this.lottos);
    }

    // 당첨 번호 입력
    async #getNumbersInput() {
        while(true) {
            try {
                const input = await Console.readLineAsync("\n당첨 번호를 입력해 주세요. \n");
                const buyerLottoNumbers = parseNumbers(input);
                this.validator.checkNumberInput(buyerLottoNumbers);
                return buyerLottoNumbers;
            } catch(error) {
                Console.print(`${error.message}\n`);
            }
        }
    }

    // 보너스 번호 입력
    async #getBonusNumberInput() {
        while(true) {
            try {
                const input = await Console.readLineAsync("\n보너스 번호를 입력해 주세요. \n");
                const bonusNumber = Number(input.trim());
                this.validator.checkBonusNumberInput(bonusNumber, this.buyerLottoNumbers);
                return bonusNumber;
            } catch(error) {
                Console.print(`${error.message}\n`);
            }
        }
    }

    async run() {
        this.price = await this.#getPriceInput();
        this.#handlePrice(this.price);
        
        this.buyerLottoNumbers = await this.#getNumbersInput();
        const matchChecking = new Lotto(this.buyerLottoNumbers);
        
        const bonusNumber = await this.#getBonusNumberInput();
        
        this.matchCountList = matchChecking.getMatchCountList(this.lottos);
        this.matchLottoCount = matchChecking.getMatchLottoCount(this.matchCountList, this.lottos, bonusNumber);

        this.view.showWinningStatus(this.matchLottoCount);
        this.view.showTotalReturnRate(matchChecking.calculateTotalPrizeRate(this.matchLottoCount, this.price));
    }
}