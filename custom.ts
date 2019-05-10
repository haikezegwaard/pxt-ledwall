/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum Direction {
    //% block="omhoog"
    Up,
    //% block="omlaag"
    Down
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace LedWall {

    // ============================ Constants
    let ACTION_UPDATE_SCORE: string = "update_score"
    let ACTION_WIN: string = "win"
    let ACTION_LOOSE: string = "loose"

    let EVENT_UPDATE_SCORE: number = 667
    let EVENT_WIN: number = 668
    let EVENT_LOOSE: number = 669

    // ============================ Blocks
    /**
     * Init on score update listener.
     */
    //% block
    //% group=LedWall
    export function initOnScoreUpdateListener(): void {
        radio.onReceivedString(function (receivedString: string) {
            if (receivedString.indexOf(ACTION_UPDATE_SCORE) === 0) {
                let params = splitString(receivedString, ":")
                control.raiseEvent(EVENT_UPDATE_SCORE, parseInt(params[1]))
            }
        })
    }

    /**
     * Init on win listener.
     */
    //% block
    //% group=LedWall
    export function initOnWinListener(): void {
        radio.onReceivedString(function (receivedString: string) {
            if (receivedString.indexOf(ACTION_WIN) === 0) {
                let params = splitString(receivedString, ":")
                control.raiseEvent(EVENT_WIN, parseInt(params[1]))
            }
        })
    }


    /**
     * Init on loose listener.
     *
     * TODO: Do we need one. If we stick to win:{user_id} then if it's not
     * your own id, it means you have lost.
     */
    //% block
    //% group=LedWall
    export function initOnLooseListener(): void {
        radio.onReceivedString(function (receivedString: string) {
            if (receivedString.indexOf(ACTION_LOOSE) === 0) {
                let params = splitString(receivedString, ":")
                control.raiseEvent(EVENT_LOOSE, parseInt(params[1]))
            }
        })
    }

    /**
     * On score update block.
     */
    //% block="on score $receivedString update event"
    //% draggableParameters
    //% group=LedWall
    export function onScoreUpdate(cb: (receivedString: string) => void) {
        control.onEvent(EVENT_UPDATE_SCORE, 0, function () {
            cb("" + control.eventValue())
        })
    }

    /**
     * On win block.
     */
    //% block="on win event"
    //% draggableParameters
    //% group=LedWall
    export function onWin(cb: (receivedString: string) => void) {
        let ownId = control.deviceSerialNumber()
        control.onEvent(EVENT_WIN, 0, function () {
            if (ownId == control.eventValue()) {
                cb("" + control.eventValue())
            }
        })
    }

    /**
     * On loose block.
     */
    //% block="on loose event"
    //% draggableParameters
    //% group=LedWall
    export function onLoose(cb: (receivedString: string) => void) {
        let ownId = control.deviceSerialNumber()
        control.onEvent(EVENT_LOOSE, 0, function () {
            if (ownId != control.eventValue()) {
                cb("" + control.eventValue())
            }
        })
    }

    // ================== Functions

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

    // ======================== The rest

    /**
     * Steers your pong bat
     * @param: direction: direction of control
     */
    //% block
    //% group=LedWall
    export function controlBat(direction: Direction): void {
        radio.sendString("device_id:" + direction);
        basic.showString("direction:" + direction);
    }

    /**
     * Join a game
     */
    //% block
    //% group=LedWall
    export function joinGame(): void {
        // Add code here
        radio.sendString("join:" + control.deviceSerialNumber());
        basic.showString("Joining game")
    }

    /**
     * Start the game
     */
    //% block
    //% group=LedWall
    export function startGame(): void {
        // Add code here
        radio.sendString("start:" + control.deviceSerialNumber());
        basic.showString("Starting game")
    }

    // /**
    //  * An update of your score was sent
    //  */
    // //% block="on $score update event"
    // //% draggableParameters
    // //% group=LedWall
    // export function onScoreUpdate(handler: (score: string) => void) {
    //
    // }
    //
    // /**
    //  * Game over event
    //  */
    // //% block="on game over event"
    // //% group=LedWall
    // export function onGameOver(handler: () => void) {
    //
    // }

    /**
     * Event raised when a player joins
     */
    //% block="on $player_id join event"
    //% draggableParameters
    //% group=LedWall
    export function onPlayerJoin(handler: (player_id: string) => void) {

    }
}
