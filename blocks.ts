
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */


//% weight=100 color=#0fbc11 icon=""
namespace LedWall {
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
        control.onEvent(ACTION_UPDATE_SCORE, 0, function () {
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
        control.onEvent(ACTION_WIN, 0, function () {
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
        control.onEvent(ACTION_WIN, 0, function () {
            if (ownId != control.eventValue()) {
                cb("" + control.eventValue())
            }
        })
    }
}
