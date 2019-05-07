/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */


/**
 * Split string, since MicroBit does not have one.
 *
 * @param sampleInput
 * @param delimiter
 *
 * @example:
 *
 *   let myString = "Lorem ipsum dolor sit amet"
 *   let myArray = splitString(myString, " ")
 *   myArray[0]  // "Lorem"
 *   myArray[1]  // "ipsum"
 */
export function splitString(sampleInput: string, delimiter: string): string[] {
    let stringArray = ['']
    let j = 0

    for (let i = 0; i < sampleInput.length; i++) {
        if (sampleInput.charAt(i) == delimiter) {
            j++;
            stringArray.push('')
        } else {
            stringArray[j] += sampleInput.charAt(i)
        }
    }
    return stringArray
}
