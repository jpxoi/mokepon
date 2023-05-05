const sectionRestart = document.getElementById('restart')
const sectionSelectAttack = document.getElementById('select-attack')
const petSelectButton = document.getElementById('button-pet-select')
const restartButton = document.getElementById('button-restart')
const sectionSelectPet = document.getElementById('select-pet')
const playerPet = document.getElementById('player-pet')
const enemyPet = document.getElementById('enemy-pet')
const spanPlayerVictories = document.getElementById('player-victories')
const spanEnemyVictories = document.getElementById('enemy-victories')
const notification = document.getElementById('result')
const attacksPlayer = document.getElementById('attacks-player')
const attacksEnemy = document.getElementById('attacks-enemy')
const cardsContainer = document.getElementById('cardsContainer')
const attacksContainer = document.getElementById('attacksContainer')
const sectionViewMap = document.getElementById('view-map')
const map = document.getElementById('map')

let playerid = null
let enemyid = null
let mokepones = []
let enemyMokepones = []
let playerAttack = []
let enemyAttack = []
let mokeponesOption
let attacksOption
let inputHipodoge
let inputCapipepo
let inputRatigueya
let playerPetName
let playerPetObject
let attacksEnemyPet
let fireButton
let waterButton
let earthButton
let buttons = []
let indexPlayerAttack
let indexEnemyAttack
let playerVictories = 0
let enemyVictories = 0

let canvas = map.getContext('2d')
let interval
let mapBackground = new Image()
mapBackground.src = 'assets/img/webp/mokemap.webp'
let desiredHeight
let mapWidth = window.innerWidth - 20
const maxMapWidth = 350

if (mapWidth > maxMapWidth) {
    mapWidth = maxMapWidth
}

desiredHeight = mapWidth * 600 / 800

map.width = mapWidth
map.height = desiredHeight

class Mokepon {
    constructor(name, image, lives, mapImage) {
        this.name = name
        this.image = image
        this.lives = lives
        this.attacks = []
        this.width = 40
        this.height = 40
        this.x = random(0, map.width - this.width)
        this.y = random(0, map.height - this.height)
        this.mapImage = new Image()
        this.mapImage.src = mapImage
        this.speedX = 0
        this.speedY = 0
    }

    drawMokepon() {
        canvas.drawImage(this.mapImage, this.x, this.y, this.width, this.height)

    }
}

let hipodoge = new Mokepon('Hipodoge', 'assets/img/webp/mokepon_hipodoge.webp', 5, 'assets/img/webp/hipodoge.webp')
let capipepo = new Mokepon('Capipepo', 'assets/img/webp/mokepon_capipepo.webp', 5, 'assets/img/webp/capipepo.webp')
let ratigueya = new Mokepon('Ratigueya', 'assets/img/webp/mokepon_ratigueya.webp', 5, 'assets/img/webp/ratigueya.webp')

let hipodogeEnemy = new Mokepon('Hipodoge', 'assets/img/webp/mokepon_hipodoge.webp', 5, 'assets/img/webp/hipodoge.webp')
let capipepoEnemy = new Mokepon('Capipepo', 'assets/img/webp/mokepon_capipepo.webp', 5, 'assets/img/webp/capipepo.webp')
let ratigueyaEnemy = new Mokepon('Ratigueya', 'assets/img/webp/mokepon_ratigueya.webp', 5, 'assets/img/webp/ratigueya.webp')


const hipodogeAttacks = [
    {name: '💧', id: 'button-water'},
    {name: '💧', id: 'button-water'},
    {name: '💧', id: 'button-water'},
    {name: '🔥', id: 'button-fire'},
    {name: '🪨', id: 'button-earth'}
]

const capipepoAttacks = [
    {name: '🪨', id: 'button-earth'},
    {name: '🪨', id: 'button-earth'},
    {name: '🪨', id: 'button-earth'},
    {name: '💧', id: 'button-water'},
    {name: '🔥', id: 'button-fire'}
]

const ratigueyaAttacks = [
    {name: '🔥', id: 'button-fire'},
    {name: '🔥', id: 'button-fire'},
    {name: '🔥', id: 'button-fire'},
    {name: '💧', id: 'button-water'},
    {name: '🪨', id: 'button-earth'}
]

hipodoge.attacks.push(...hipodogeAttacks)
capipepo.attacks.push(...capipepoAttacks)
ratigueya.attacks.push(...ratigueyaAttacks)

hipodogeEnemy.attacks.push(...hipodogeAttacks)
capipepoEnemy.attacks.push(...capipepoAttacks)
ratigueyaEnemy.attacks.push(...ratigueyaAttacks)

mokepones.push(hipodoge, capipepo, ratigueya)

function startGame() {
    sectionSelectAttack.style.display = 'none'
    sectionRestart.style.display = 'none'
    sectionViewMap.style.display = 'none'

    mokepones.forEach((mokepon) => {
        mokeponesOption = `
        <input type="radio" name="pet" id=${mokepon.name}>
        <label class="card-mokepon" for=${mokepon.name}>
            <p>${mokepon.name}</p>
            <img src=${mokepon.image} alt=${mokepon.name}>
        </label>
        `

        cardsContainer.innerHTML += mokeponesOption

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    petSelectButton.addEventListener('click', selectPlayerPet)
    restartButton.addEventListener('click', restartGame)
}

function selectPlayerPet() {
    if (inputHipodoge.checked) {
        playerPet.innerHTML = inputHipodoge.id
        playerPetName = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        playerPet.innerHTML = inputCapipepo.id
        playerPetName = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        playerPet.innerHTML = inputRatigueya.id
        playerPetName = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
        return
    }

    extractAttacks(playerPetName)

    sectionSelectPet.style.display = 'none'
    sectionViewMap.style.display = 'flex'

    initializeMap()
}

function extractAttacks(playerPetName) {
    let attacks
    for (let i = 0; i < mokepones.length; i++) {
        if (playerPetName == mokepones[i].name) {
            attacks = mokepones[i].attacks
        }
    }

    showAttacks(attacks)
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        attacksOption = `
        <button id=${attack.id} class="attack-button bAttack">${attack.name}</button>
        `

        attacksContainer.innerHTML += attacksOption
    })

    fireButton = document.getElementById('button-fire')
    waterButton = document.getElementById('button-water')
    earthButton = document.getElementById('button-earth')
    buttons = document.querySelectorAll('.bAttack')
}

function attackSequence() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent == "🔥") {
                playerAttack.push("FUEGO")
                console.log(playerAttack)
                button.style.background = "#0c356e"
                button.disabled = true
            } else if (e.target.textContent == "💧") {
                playerAttack.push("AGUA")
                console.log(playerAttack)
                button.style.background = "#0c356e"
                button.disabled = true
            } else {
                playerAttack.push("TIERRA")
                console.log(playerAttack)
                button.style.background = "#0c356e"
                button.disabled = true
            }

           randomEnemyAttack()
        })
    })
}

function selectEnemyPet(enemy) {
    enemyPet.innerHTML = enemy.name
    attacksEnemyPet = enemy.attacks

    attackSequence()
}

function randomEnemyAttack() {
    console.log('Ataques enemigo', attacksEnemyPet)
    let randomAttack = random(0, attacksEnemyPet.length - 1)
    
    if (randomAttack == 0 || randomAttack == 1) {
        enemyAttack.push('FUEGO')
    } else if (randomAttack == 3 || randomAttack == 4) {
        enemyAttack.push('AGUA')
    } else {
        enemyAttack.push('TIERRA')
    }

    console.log(enemyAttack)

    startFight()
}

function startFight() {
    if (playerAttack.length === 5) {
        combat()
    }
}

function indexBothOponents(player, enemy) {
    indexPlayerAttack = playerAttack[player]
    indexEnemyAttack = enemyAttack[enemy]
}

function combat() {
    clearInterval(interval)

    for (let index = 0; index < playerAttack.length; index++) {
        if (playerAttack[index] === enemyAttack[index]) {
            indexBothOponents(index, index)
            createMessage("EMPATE")
        } else if((playerAttack[index] == 'FUEGO' && enemyAttack[index] == 'TIERRA') || (playerAttack[index] == 'AGUA' && enemyAttack[index] == 'FUEGO') || (playerAttack[index] == 'TIERRA' && enemyAttack[index] == 'AGUA')) {
            indexBothOponents(index, index)
            createMessage("GANASTE")
            playerVictories++
            spanPlayerVictories.innerHTML = playerVictories
        } else {
            indexBothOponents(index, index)
            createMessage("PERDISTE")
            enemyVictories++
            spanEnemyVictories.innerHTML = enemyVictories
        }
    }

    validateVictories()
}

function validateVictories() {
    if (playerVictories === enemyVictories) {
        createFinalMessage("Esto fue un empate!!!")
    } else if (playerVictories > enemyVictories) {
        createFinalMessage("FELICITACIONES! Ganaste :)")
    } else {    
        createFinalMessage('Lo siento, perdiste :(')
    }
}

function createMessage(result) {
    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')

    notification.innerHTML = result
    newPlayerAttack.innerHTML = indexPlayerAttack
    newEnemyAttack.innerHTML = indexEnemyAttack

    attacksPlayer.appendChild(newPlayerAttack)
    attacksEnemy.appendChild(newEnemyAttack)
}

function createFinalMessage(finalResult) {
    notification.innerHTML = finalResult

    sectionRestart.style.display = 'block'
}

function restartGame() {
    location.reload()
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function drawCanvas() {
    playerPetObject.x = playerPetObject.x + playerPetObject.speedX
    playerPetObject.y = playerPetObject.y + playerPetObject.speedY

    canvas.clearRect(0, 0, map.width, map.height)
    canvas.drawImage(mapBackground, 0, 0, map.width, map.height)

    playerPetObject.drawMokepon()
    hipodogeEnemy.drawMokepon()
    capipepoEnemy.drawMokepon()
    ratigueyaEnemy.drawMokepon()

    if (playerPetObject.speedX !== 0 || playerPetObject.speedY !== 0) {
        collisionCheck(hipodogeEnemy)
        collisionCheck(capipepoEnemy)
        collisionCheck(ratigueyaEnemy)
    }
}

function moveUp() {
    playerPetObject.speedY = -5
}

function moveDown() {
    playerPetObject.speedY = 5
}

function moveLeft() {
    playerPetObject.speedX = -5
}

function moveRight() {
    playerPetObject.speedX = 5
}

function stopMovement() {
    playerPetObject.speedX = 0
    playerPetObject.speedY = 0
}

function keyPressed(e) {
    switch (e.key) {
        case 'ArrowUp':
            moveUp()
            break
        
        case 'ArrowDown':
            moveDown()
            break

        case 'ArrowLeft':
            moveLeft()
            break

        case 'ArrowRight':
            moveRight()
            break
            
        default:
            break
    }
}

function initializeMap() {
    playerPetObject = getPetObject(playerPetName)
    console.log(playerPetObject, playerPetName)

    interval =  setInterval(drawCanvas, 50)

    window.addEventListener('keydown', keyPressed)
    window.addEventListener('keyup', stopMovement)  
}

function getPetObject() {
    for (let i = 0; i < mokepones.length; i++) {
        if (playerPetName == mokepones[i].name) {
            return mokepones[i]
        }
    }
}

function collisionCheck(enemy) {
    const upEnemy = enemy.y
    const downEnemy = enemy.y + enemy.height
    const leftEnemy = enemy.x
    const rightEnemy = enemy.x + enemy.width

    let upPet = playerPetObject.y
    let downPet = playerPetObject.y + playerPetObject.height
    let leftPet = playerPetObject.x
    let rightPet = playerPetObject.x + playerPetObject.width

    if (downPet < upEnemy || upPet > downEnemy || rightPet < leftEnemy || leftPet > rightEnemy) {
        return
    } else if (enemy.x === undefined || enemy.y === undefined) {   
        return 
    } else {
        stopMovement()
        clearInterval(interval)
        console.log("Colisión detectada")

        sectionSelectAttack.style.display = 'flex'
        sectionViewMap.style.display = 'none'
        selectEnemyPet(enemy)
    }
}

window.addEventListener('load', startGame)