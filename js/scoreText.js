import {context} from "./index.js";

export class ScoreText {
    text = ""

    draw() {
        context.font = "42px Comic Sans MS"
        context.textAlign = "center"
        context.fillStyle = "black"
        context.strokeText(this.text, 28, 56, 100)
        context.font = "38px Comic Sans MS"
        context.fillStyle = "white"
        context.fillText(this.text, 28, 56, 100)
    }
}