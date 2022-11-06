import {Game} from "./game.js";
import {canvas} from "./index.js";

export class Tile {
    constructor(row, number, size, game) {
        this.row = row
        this.number = number
        this.size = size
        this.game = game

        this.dimentions = {
            w: this.game.tileSize,
            h: this.game.tileSize * this.size,
        }

        this.position = {
            x: this.game.tileSize * this.row + this.row * Game.offset,
            y: this.number === 0 ? 0 : this.game.getTileWithNumber(this.number).position.y - Game.offset - this.dimentions.h,
        }
        this.state = 0
        this.speed = this.number === 0 ? 2 : this.game.getTileWithNumber(this.number).speed
        this.freeze = false
    }

    draw() {
        if (this.state === 0) {
            this.game.drawRect(
                this.position.x,
                this.position.y,
                this.dimentions.w,
                this.dimentions.h,
                "black"
            )
        } else if (this.state === -1) {
            this.game.drawRect(
                this.position.x,
                this.position.y,
                this.dimentions.w,
                this.dimentions.h,
                "red"
            )
        } else if (this.state === 1) {
            this.game.drawRect(
                this.position.x,
                this.position.y,
                this.dimentions.w,
                this.dimentions.h,
                "green"
            )
        }
    }

    update() {
        if (this.position.y > canvas.height - this.dimentions.h && this.state !== 1) {
            this.state = -1
        }
        if (!this.freeze)
            this.position.y += this.speed


        this.draw()
    }

    contain(pos) {
        return pos.x > this.position.x &&
            pos.x < this.position.x + this.dimentions.w &&
            pos.y > this.position.y &&
            pos.y < this.position.y + this.dimentions.h

    }
}