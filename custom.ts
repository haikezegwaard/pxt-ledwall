
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum Direction {
    //% block="omhoog"
    Up = 1,
    //% block="omlaag"
    Down = 2
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace LedWall {


    /**
     * Steers your pong bat
     * @param: direction: direction of control
     */
    //% block
    export function controlBat(direction: Direction): void {
        radio.sendString("device_id:" + direction);
        basic.showString("direction:" + direction);
    }

    /**
     * Join a game
     */
    //% block
    export function joinGame(): void {
        // Add code here
        radio.sendString("join:" + "device_id");
        basic.showString("Joining game")
    }

    /**
     * Start the game
     */
    //% block
    export function startGame(): void {
        // Add code here
        radio.sendString("start:" + "device_id");
        basic.showString("Starting game")
    }

    /**
     * An update of your score was sent
     */
    //% block="on $score update event"
    //% draggableParameters
    export function onScoreUpdate(handler: (score: string) => void) {

    }

    /**
     * Game over event
     */
    //% block="on game over event"
    export function onGameOver(handler: () => void) {

    }

    /**
     * Event raised when a player joins
     */
    //% block="on $player_id join event"
    //% draggableParameters
    export function onPlayerJoin(handler: (player_id: string) => void) {

    }
}
