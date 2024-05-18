/**
* Converts a given value to a string representing a number in fixed-point notation.
*
* @param {string | number} value - The value to convert.
* @param {number} [decimal=1] - The number of digits to appear after the decimal point.
* @returns {string} A string representing the given number using fixed-point notation.
*/
export const convertIntoDecimals = (value: string | number, decimal: number = 1): string => {
    if (value) {
        return Number(value.toString()).toFixed(decimal);
    }
    return '';
}