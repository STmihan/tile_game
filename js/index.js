import {Game} from "./game.js";

export const canvas = document.querySelector('canvas')
export const context = canvas.getContext("2d")
const body = document.querySelector('body')
canvas.width = body.offsetWidth
canvas.height = body.offsetHeight
const game = new Game()
game.init()