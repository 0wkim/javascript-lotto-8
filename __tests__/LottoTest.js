import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "../src/Lotto";
import BuyLotto from "../src/model/BuyLotto";
import { parseNumbers } from "../src/utils/numberParser";

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  // TODO: 추가 기능 구현에 따른 테스트 코드 작성
  test("입력한 당첨 번호가 쉼표로 잘 구분 되는지 확인", () => {
    const input = "1,2,   3, 4,    5   ,6";
    const numbers = parseNumbers(input);
    expect(numbers).toEqual([1,2,3,4,5,6]);
  });

  test("입력한 금액에 따른 로또 개수가 잘 도출되는지 확인", () => {
    const buyer = new BuyLotto();
    expect(buyer.getNumberOfLotto(8000)).toBe(8);
  });

  test("로또 개수만큼 로또가 생성되는지 확인", () => {
    const buyer = new BuyLotto();
    const lottos = buyer.getLotto(8);
    expect(lottos.length).toBe(8);
  });

  test("발행된 로또가 오름차순인지 확인", () => {
    mockRandoms([
      [45, 30, 1, 12, 9, 33],
      [1, 43, 27, 6, 3, 9]
    ]);

    const buyer = new BuyLotto();
    const lottos = buyer.getLotto(2);

    expect(lottos[0]).toEqual([1, 9, 12, 30, 33, 45]);
    expect(lottos[1]).toEqual([1, 3, 6, 9, 27, 43]);
  });


  test("당첨 번호와 로또 번호가 일치하면, 일치 개수가 증가하는지 확인", () => {
    const lottos = [
      [1, 2, 3, 10, 11, 12],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7]
    ];
    const matchChecking = new Lotto([1, 2, 3, 4, 5, 6]);
    const matchCountList = matchChecking.getMatchCountList(lottos);
    expect(matchCountList).toEqual([3, 6, 5]);
  });

  test("번호 일치 개수에 따른 당첨 통계가 잘 도출되는지 확인", () => {
    const matchChecking = new Lotto([1, 2, 3, 4, 5, 6]);
    const lottos = [
      [1, 2, 3, 10, 11, 12], // 3개
      [1, 2, 3, 4, 5, 6], // 6개
      [1, 2, 3, 4, 5, 7] // 5개 + 보너스 볼
    ];

    const matchCountList = matchChecking.getMatchCountList(lottos);
    const matchLottoCount = matchChecking.getMatchLottoCount(matchCountList, lottos, 7); // 보너스 번호 7

    expect(matchLottoCount).toEqual({
      three: 1,
      four: 0,
      five: 0,
      fiveBonus: 1,
      six: 1
    });
  });

  test("수익률 계산이 정확한지 확인", () => {
    const matchChecking = new Lotto([1, 2, 3, 4, 5, 6]);
    const matchLottoCount = {
      three: 1,
      four: 0,
      five: 0,
      fiveBonus: 0,
      six: 0
    };
    const totalPrizeRate = matchChecking.calculateTotalPrizeRate(matchLottoCount, 8000);
    expect(totalPrizeRate).toBeCloseTo(62.5, 2);
  });
});
