export class Utils {
    static randomExcludedOne(min, max, excluded) {
        let n = Math.floor(Math.random() * (max - min) + min)
        let r = false
        while (r === true)
            if (n === excluded) {
                n++
                if (n > max) {
                    n = min
                } else {
                    return true
                }
            }
        return n
    }

    /// Min and max included
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static getCursorPosition = (canvas, event) => {
        const rect = canvas.getBoundingClientRect()
        return {x: event.clientX - rect.left, y: event.clientY - rect.top}
    }
}