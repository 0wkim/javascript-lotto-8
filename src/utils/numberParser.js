export function parseNumbers(input) {
    const inputList = input.split(",");
    const numbersList = inputList.map((num) => {
        return Number(num.trim());
    });
    return numbersList;
}