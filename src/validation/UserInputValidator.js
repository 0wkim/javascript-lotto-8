import { ERROR_MESSAGES } from "../constants/ErrorMessages.js";

export default class ValidateUserInput {
    checkPriceInput(price) {
        if (price === "" || price === undefined || price === null || price === 0) {
            throw new Error(ERROR_MESSAGES.ERROR_EMPTY_PRICE);
        }

        if (isNaN(price) || price < 0) {
            throw new Error(ERROR_MESSAGES.ERROR_INCORRECT_PRICE);
        }
        
        if (price % 1000 !== 0) {
            throw new Error(ERROR_MESSAGES.ERROR_INCORRECT_UNIT);
        }

        return price;
    }

    checkNumberInput(numbers) {
        if (numbers.some(num => isNaN(num) || num < 1 || num > 45 || !Number.isInteger(num)) || numbers.length !== 6) {
            throw new Error(ERROR_MESSAGES.ERROR_INCORRECT_NUMBER);
        }

        if (numbers.length !== 6) {
            throw new Error(ERROR_MESSAGES.ERROR_NUMBER_LENGTH);
        }

        const isDuplicated = new Set(numbers);
        if (isDuplicated.size !== numbers.length) {
            throw new Error(ERROR_MESSAGES.ERROR_NUMBER_DUPLICATED);
        }

        return numbers;
    }

    checkBonusNumberInput(number, numbers) {
        if (isNaN(number) || number < 1 || number > 45) {
            throw new Error(ERROR_MESSAGES.ERROR_BONUS_INCORRECT);
        }

        if (numbers.includes(number)) {
            throw new Error(ERROR_MESSAGES.ERROR_BONUS_DUPLICATED);
        }

        return number;
    }
}