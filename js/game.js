import {GameLoop} from "./gameLoop.js";
import {Utils} from "./utils.js";
import {Tile} from "./tile.js";
import {canvas} from "./index.js";
import {ScoreText} from "./scoreText.js";

export class Game extends GameLoop {
    /// start | play | lose
    #isPlaying = "start";
    #currentNumber = 0;
    #tiles = [];
    #text = new ScoreText()
    #currentCheckpoint = 0

    tileSize = (canvas.width - Game.offset * 2) / 3
    #tilesPerGenerate = 40

    static offset = 5
    static timeMultiplicationPerSecond = 1.2

    init() {
        this.#generateTiles()
        if (Utils.isMobile())
            canvas.ontouchstart = (e) => this.#touchCallback(e)
        else
            canvas.onmousedown = (e) => this.#clickCallback(e)

        super.init()
    }

    update(t) {
        super.update()
        if (this.#isPlaying === "play" && this.#tiles.some(t => t.state === -1)) {
            this.#lose()
        }

        this.#updateTiles();
        this.#updateText()

        this.#increaseSpeed(t);
        this.#regenerateTiles();
    }

    getTileWithNumber(number) {
        return this.#tiles.find(t => t.number === number - 1)
    }

    #updateText() {
        this.#text.text = this.#currentNumber.toString()
        this.#text.draw()
    }

    #updateTiles() {
        this.#tiles.forEach(t => t.freeze = !(this.#isPlaying === "play"))

        this.#tiles.forEach(tile => tile.update())
    }

    #regenerateTiles() {
        if (this.#tiles [Math.floor(this.#tiles.length / 2)].position.y > canvas.height) {
            this.#tiles.splice(0, Math.floor(this.#tiles.length / 2))
            this.#generateTiles()
        }
    }

    #increaseSpeed(t) {
        if (t > this.#currentCheckpoint) {
            this.#tiles.forEach(t => t.speed *= Game.timeMultiplicationPerSecond)
            this.#currentCheckpoint += 10000
        }
    }

    #generateTiles() {
        let max = this.#tiles.length + this.#tilesPerGenerate

        let num = this.#tiles[this.#tiles.length - 1] != null ? this.#tiles[this.#tiles.length - 1].number + 1 : 0
        let countThisNum = 0

        for (let i = this.#tiles.length; i < max; i++) {
            let row = this.#getRow(num)
            let size = 1
            if (countThisNum < 1 && Utils.random(0, 1) === 0 || countThisNum === 0) {
                countThisNum++
            } else {
                num++
                countThisNum = 0
            }
            this.#tiles.push(new Tile(row, num, size, this))
        }
    }

    #getRow(num) {
        let row = Utils.random(0, 2)
        if (this.#tiles.some(t => t.number === num && t.row === row)) {
            row = Utils.randomExcludedOne(0, 2, row)
        }
        return row
    }

    #touchCallback(e) {
        if (this.#isPlaying === "start")
            this.#isPlaying = "play"
        else if (this.#isPlaying === "play") {
            this.#processClick(Utils.getTouchPosition(canvas, e))
        }
    };

    #clickCallback(e) {
        if (this.#isPlaying === "start")
            this.#isPlaying = "play"
        else if (this.#isPlaying === "play") {
            this.#processClick(Utils.getCursorPosition(canvas, e))
        }
    }

    #processClick(pos) {
        let result = false
        for (let i = 0; i < this.#tiles.length; i++) {
            let tile = this.#tiles[i]
            if (tile.number === this.#currentNumber) {
                if (tile.contain(pos)) {
                    result = true
                }
            }
        }
        if (result)
            this.#tiles.forEach(t => {
                if (t.number === this.#currentNumber && t.contain(pos))
                    t.state = 1
            })
        else {
            this.#tiles.forEach(t => {
                if (t.number === this.#currentNumber)
                    t.state = -1
            })
        }
        if (!this.#tiles.some(tile => tile.number === this.#currentNumber && tile.state === 0)) ++this.#currentNumber
    }

    #lose() {
        this.#isPlaying = "lose"
    }
}