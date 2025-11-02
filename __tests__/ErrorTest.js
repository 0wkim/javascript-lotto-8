import ValidateUserInput from "../src/validation/UserInputValidator";

describe("예외 처리 테스트", () => {
    let validator;

    beforeEach(() => {
        validator = new ValidateUserInput();
    });

    test("당첨 번호가 1~45 범위를 벗어난 경우 예외가 발생한다.", () => {
        expect(() => validator.checkNumberInput([0, 2, 3, 4, 5, 6])).toThrow("[ERROR]");
        expect(() => validator.checkNumberInput([1, 2, 3, 4, 5, 46])).toThrow("[ERROR]");
    });
    
    test("구매 금액이 1,000원으로 나누어 떨어지지 않는 경우 예외가 발생한다.", () => {
        expect(() => validator.checkPriceInput(5500)).toThrow("[ERROR]");
    });
    
    test("구매 금액이 숫자가 아닌 경우 예외가 발생한다.", () => {
        expect(() => validator.checkPriceInput("천원")).toThrow("[ERROR]");
    });
    
    test("구매 금액이 입력되지 않은 경우 예외가 발생한다.", () => {
        expect(() => validator.checkPriceInput("")).toThrow("[ERROR]");
    });
    
    test("구매 금액이 1,000원보다 작은 경우 예외가 발생한다.", () => {
        expect(() => validator.checkPriceInput(500)).toThrow("[ERROR]");
    });
    
    test("당첨 번호가 6개 미만인 경우 예외가 발생한다.", () => {
        expect(() => validator.checkNumberInput([1, 2, 3, 4, 5])).toThrow("[ERROR]");
    });
    
    test("보너스 번호와 당첨 번호가 중복되는 경우 예외가 발생한다.", () => {
        expect(() => validator.checkBonusNumberInput(6, [1, 2, 3, 4, 5, 6])).toThrow("[ERROR]");
    });
    
    test("보너스 번호가 1~45 사이의 숫자가 아닌 경우 예외가 발생한다.", () => {
        expect(() => validator.checkBonusNumberInput(0, [1, 2, 3, 4, 5, 6])).toThrow("[ERROR]");
        expect(() => validator.checkBonusNumberInput(46, [1, 2, 3, 4, 5, 6])).toThrow("[ERROR]");
    });

});