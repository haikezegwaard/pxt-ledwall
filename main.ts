/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */



/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace LedWall {

    // ============================ Constants
    let EVENT_UPDATE_SCORE: number = 667
    let EVENT_WIN: number = 668
    let EVENT_LOOSE: number = 669

    // ============================ Blocks
    enum Direction {
        //% block="omhoog"
        Up,
        //% block="omlaag"
        Down
    }

    /**
     * Initialize the LedWall
     */
    //% block
    //% group=LedWall
    export function startLedWall(): void {
        radio.setGroup(0);
        radio.onReceivedString(function (receivedString: string) {
            control.raiseEvent(667, 404)
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

    // ======================== The rest

    /**
     * Steers your pong bat
     * @param: direction: direction of control
     */
    //% block
    //% group=LedWall
    export function controlBat(direction: Direction): void {
        let dirstr = 'A';
        if(direction==Direction.Down){
            dirstr = 'B';
        }
        radio.sendString(control.deviceSerialNumber()+":" + dirstr);
        basic.showString("direction:" + direction);
    }

    /**
     * Start the game
     */
    //% block
    //% group=LedWall
    export function startGame(): void {
        // Add code here
        radio.sendString(control.deviceSerialNumber()+":reset");
        basic.showString("Starting game")
    }
}

