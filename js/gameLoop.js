import {canvas, context} from "./index.js";

export class GameLoop {

    currentTime

    init() {
        this.update()
    }

    update(t) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        requestAnimationFrame(time => {
            this.update(time)
            this.currentTime = time
        })

    }

    drawRect(x, y, w, h, color) {
        context.fillStyle = color
        context.fillRect(x, y, w, h)
    }
}