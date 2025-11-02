import { Console } from "@woowacourse/mission-utils";
import ValidateUserInput from "../validation/UserInputValidator.js";
import BuyLotto from "../model/BuyLotto.js";
import Lotto from "../model/Lotto.js";
import LottoView from "../view/LottoView.js";
import { parseNumbers } from "../utils/numberParser.js";

export default class LottoController {
    constructor() {
        this.validator = new ValidateUserInput();
        this.view = new LottoView();

        this.buyerLottoNumbers = [];

        this.numberOfLotto = 0;
        this.lottos = [];

        this.matchCountList = [];
        this.matchLottoCount = {};
    }

    async getPriceInput() {
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

    async getNumbersInput() {
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

    async getBonusNumberInput() {
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
        const price = await this.getPriceInput();
        
        const lottoBuyer = new BuyLotto();
        this.numberOfLotto = lottoBuyer.getNumberOfLotto(price);
        this.lottos = lottoBuyer.getLotto(this.numberOfLotto);

        this.view.showLottoCount(this.numberOfLotto);
        this.view.showLottoList(this.lottos);

        this.buyerLottoNumbers = await this.getNumbersInput();

        // const buyerLottoNumbersList = parseNumbers(this.buyerLottoNumbers);
        const matchChecking = new Lotto(this.buyerLottoNumbers);
        
        const bonusNumber = await this.getBonusNumberInput();
        
        this.matchCountList = matchChecking.getMatchCountList(this.lottos);
        this.matchLottoCount = matchChecking.getMatchLottoCount(this.matchCountList, this.lottos, bonusNumber);

        // 추후 view로 이동
        // Console.print(JSON.stringify(this.matchLottoCount));

        this.view.showWinningStatus(this.matchLottoCount);
        this.view.showTotalReturnRate(matchChecking.calculateTotalPrizeRate(this.matchLottoCount, price));
    }
}