import { PRIZE } from "../constants/Prize.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
    this.#validate(numbers);
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  // TODO: 추가 기능 구현

  #getMatchNumberCount(lotto, matchCountList) {
    let matchNumberCount = 0;

    this.#numbers.forEach((num) => {
      if (lotto.includes(num)) {
        matchNumberCount++;
      }
    });

    matchCountList.push(matchNumberCount);
  }

  getMatchCountList(lottos) {
    const matchCountList = [];

    lottos.forEach((lotto) => {
      this.#getMatchNumberCount(lotto, matchCountList);
    });

    return matchCountList;
  }

  getMatchLottoCount(matchCountList, lottos, number) {
    const matchLottoCount = {
      three: 0,
      four: 0,
      five: 0,
      fiveBonus: 0,
      six: 0
    }

    this.#countMatchResults(matchCountList, matchLottoCount);
    this.#isBonusNumberMatch(matchCountList, matchLottoCount, lottos, number);

    return matchLottoCount;
  }

  #countMatchResults(matchCountList, matchLottoCount) {
    matchCountList.forEach((matchCount) => {
      if (matchCount === 3) {
        matchLottoCount.three++;
      }
      if (matchCount === 4) {
        matchLottoCount.four++;
      }
      if (matchCount === 5) {
        matchLottoCount.five++;
      }
      if (matchCount === 6) {
        matchLottoCount.six++;
      }
    });
  }

  #isBonusNumberMatch(matchCountList, matchLottoCount, lottos, bonusNumber) {
    matchCountList.forEach((matchCount, index) => {
      if (matchCount === 5 && lottos[index].includes(Number(bonusNumber))) {
        matchLottoCount.fiveBonus++;
        matchLottoCount.five--;
      }
    })
  }

  #calculateTotalPrize(matchLottoCount) {
    const prizeMapping = {
      three: PRIZE.FIFTH_PLACE,
      four: PRIZE.FOURTH_PLACE,
      five: PRIZE.THIRD_PLACE,
      fiveBonus: PRIZE.SECOND_PLACE,
      six: PRIZE.FIRST_PLACE
    };

    const totalIncome = Object.entries(prizeMapping).reduce((total, [key, value]) => {
      total += matchLottoCount[key] * value;
      return total;
    }, 0);

    return totalIncome;
  }
  
  calculateTotalPrizeRate(matchLottoCount, price) {
    const totalPrizeRate = Math.round(((this.#calculateTotalPrize(matchLottoCount) / price) * 100) * 100) / 100;
    return totalPrizeRate;
  }
}

export default Lotto;
