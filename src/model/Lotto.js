import { Console } from "@woowacourse/mission-utils";
// import { Bonus } from "./Bonus.js";
// import { BuyLotto } from "./BuyLotto.js";

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

  getMatchNumberCount(lotto, matchCountList) {
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
      this.getMatchNumberCount(lotto, matchCountList);
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

    this.countMatchResults(matchCountList, matchLottoCount);
    this.isBonusNumberMatch(matchCountList, matchLottoCount, lottos, number);

    return matchLottoCount;
  }

  countMatchResults(matchCountList, matchLottoCount) {
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

  isBonusNumberMatch(matchCountList, matchLottoCount, lottos, bonusNumber) {
    matchCountList.forEach((matchCount, index) => {
      if (matchCount === 5 && lottos[index].includes(Number(bonusNumber))) {
        matchLottoCount.fiveBonus++;
        matchLottoCount.five--;
      }
    })
  }

  

  // 당첨 번호랑 로또 번호 비교
  // isMatchLotto() {
  //   const matchCount = 0;
  //   const lotto = getLotto();

  //   for (number in this.#numbers) {
  //     if (lotto.includes(number)) {
  //       matchCount += 1;
  //     }
  //   }

  //   const matchLotto = [lotto, matchCount];

  //   return matchLotto;
  // }

  // 로또 개수만큼 반복 -> 이건 옮기기 왜냐면 로또 개수만큼 뽑는 것도 안함
  // [3, 0]
  // iterateByLottoCount(numberOfLotto) {
  //   const allMatchLotto = [];

  //   for (let i = 0; i < numberOfLotto; i++) {
  //     allMatchLotto.push(isMatchLotto());
  //   }
    
  //   return allMatchLotto;
  // }

  
  // 2. 개수별로 결과 리스트 만들어서, 가장 높은 결과 도출 (해당 번호 리스트, 일치개수) -> 객체로 관리
  // getBestMatch(allMatchLotto){
  //     let bestMatchLotto;

  //     let maxMatchCount = 0;
  //     for (lotto in allMatchLotto) {
  //     if (maxMatchCount < lotto[1]) {
  //         maxMatchCount = lotto[1];
  //         bestMatchLotto = lotto;
  //         return;
  //     }
  //     if (matchCount === lotto[1]) {
  //         bestMatchLotto = lotto;
  //     }
  //     }

  //     Console.print(bestMatchLotto);
  //     return bestMatchLotto;
  // }

  // 3. 5개 일치할 경우, 보너스 번호 비교
  // isMatchBonusNumber(bestMatchLotto, bonusNumber) {
  //     if (bestMatchLotto[1] === 5 && bestMatchLotto[0].includes(bonusNumber)) {
  //       bestMatchLotto[1][1].push(1);
  //       return;
  //     }
  //     bestMatchLotto[1][1].push(0);
  // }
  
}

export default Lotto;
