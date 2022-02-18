const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const scale = 20

const rows = canvas.height / scale
const columns = canvas.width / scale

const gamespeed = 5

let headX = 10
let headY = 10

let speedX = 0
let speedY = 0

let goalX = Math.floor(Math.random() * scale)
let goalY = Math.floor(Math.random() * scale)

let score = 0

let print = true

function game() { 
    clearScreen()

    drawScore()

    checkCorner()

    ai()

    goalAchived()

    car()

    drawGoal()

    updateCar()

    setTimeout(game, 100)
}

function clearScreen() {
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.setLineDash([])
    ctx.strokeStyle = 'rgb(255,255,255)'
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
}

function car() {

    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(headX * scale, headY * scale, rows, columns)
    ctx.setLineDash([])

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.strokeRect(headX * scale, headY * scale, rows, columns)
}

function updateCar() {
    headX += speedX
    headY += speedY
}

function drawGoal() {
    let redColor = 'rgba(255, 0, 0)'
    
    ctx.beginPath()
    ctx.arc(goalX * scale, goalY * scale, scale/2, 0, 2 * Math.PI)
    ctx.strokeStyle = redColor
    ctx.fillStyle = redColor
    ctx.fill()
    ctx.stroke()
}

function goalAchived() {

    let centerX = (headX + 0.77)
    let centerY = (headY + 0.77)

    let insideArea = (Math.abs(goalX - centerX) <= 0.8) && (Math.abs(goalY - centerY) <= 0.8)

    if(insideArea) {

        goalX = Math.floor(Math.random() * scale)
        goalY = Math.floor(Math.random() * scale)

        score++
    }
}

function checkCorner() {
    if(headX === 29 && speedX === 1) speedX = 0
    else if(headX === 0 && speedX === -1) speedX = 0
    else if(headY === 29 && speedY === 1) speedY = 0
    else if(headY === 0 && speedY === -1) speedY = 0
}

function drawScore() {
    ctx.fillStyle = 'white'
    ctx.font = '20px Verdana'
    ctx.fillText('Score: ' + score, canvas.width - 150, 40)
}

function ai() {
    let xdiff = headX - goalX
    let ydiff = headY - goalY

    if(xdiff < 0){
        speedX = 1
        speedY = 0
    } 
    else if(xdiff > 0){
        speedX = -1
        speedY = 0
    } 
    else if(ydiff < 0){
        speedY = 1
        speedX = 0
    } 
    else if(ydiff > 0){
        speedY = -1
        speedX = 0
    } 
}

game()