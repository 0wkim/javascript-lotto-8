export default class ValidateUserInput {
    checkPriceInput(price) {
        if (isNaN(price) || price < 0) {
            throw new Error("[ERROR] 올바른 금액이 아닙니다. 다시 입력해주세요.");
        }
        
        if (price % 1000 !== 0) {
            throw new Error("[ERROR] 올바른 금액이 아닙니다. 천원 단위의 금액으로 다시 입력해주세요.");
        }

        if (price === 0) {
            throw new Error("[ERROR] 로또를 구입할 수 없습니다. 다시 입력해주세요.");
        }

        return price;
    }

    checkNumberInput(numbers) {
        if (numbers.some(num => isNaN(num) || num < 1 || num > 45 || !Number.isInteger(num)) || numbers.length !== 6) {
            throw new Error("[ERROR] 당첨 번호는 1에서 45 사이의 숫자 6개여야 합니다. 다시 입력해주세요.");
        }

        if (numbers.length !== 6) {
            throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
        }

        const isDuplicated = new Set(numbers);
        if (isDuplicated.size !== numbers.length) {
            throw new Error("[ERROR] 중복된 숫자는 입력할 수 없습니다. 다시 입력해주세요.")
        }

        return numbers;
    }

    checkBonusNumberInput(number, numbers) {
        if (isNaN(number) || number < 1 || number > 45) {
            throw new Error("[ERROR] 보너스 번호는 1에서 45 사이의 숫자여야 합니다. 다시 입력해주세요.");
        }

        if (numbers.includes(number)) {
            throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다. 다시 입력해주세요.");
        }

        return number;
    }
}