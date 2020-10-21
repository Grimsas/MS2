// asset loading screen 

// dictionary parser, random word
let commonWord = d3.json("../../srv/js/common.json").then(function (data) {
  commonWord = data.commonWords
})

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
  
  dictionaryGen(difficulty.wordLengthMin, difficulty.wordLengthMax)
  dictionaryA()
  
  
}}

let difficulty 

//map dictionary to object arrays by length
let dictionaryAll = []
let dictionaryLevel = []

let dictionaryA = function () {
  dictionaryAll = commonWord.map(word => word)
  console.log('dictionaryAll: Done!')
} 

function dictionaryGen(min, max) {
  dictionaryLevel = dictionaryAll.filter(word => word.length >= min && word.length <= max)
  console.log('dictionaryLevel: Done!')
}

function DL(arr) {
  let wordLengths = {}
  for (var i = 0; i < arr.length; ++i) {
    var length = arr[i].length
    var val = arr[i]
    //console.log(length, val)
    if (!wordLengths[length]) {
      wordLengths[length] = [val]
    } else {
      wordLengths[length].push(val)
    }
  }

  return wordLengths, console.log(wordLengths, 'DL: Done!')
} 

// letters object + relative ball colors
const ballColors = {
  a: "rgb(240 163 255)",          //Amethyst                 #f0a3ff
  b: "rgb(0 117 220)",            //Blue                     #0075dc
  c: "rgb(153 63 0)",             //Caramel                  #993f00
  d: "rgb(76 0 92)",              //Damson                   #4c005c
  e: "rgb(25 25 25)",             //Ebony                    #191919
  f: "rgb(0 92 49)",              //Forest                   #005c31
  g: "rgb(43 206 72)",            //Green                    #2bce48
  h: "rgb(255 204 153)",          //Honneydew                #ffcc99
  i: "rgb(128 128 128)",          //Iron                     #808080
  j: "rgb(148 255 181)",          //Jade                     #94ffb5
  k: "rgb(143 124 0)",            //Khaki                    #8f7c00
  l: "rgb(157 204 0)",            //Lime                     #9dcc00
  m: "rgb(194 0 136)",            //Mallow                   #c20088
  n: "rgb(0 51 128)",             //Navy                     #003380
  o: "rgb(255 164 5)",            //Orpiment                 #ffa405
  p: "rgb(255 168 187)",          //Pink                     #ffa8bb
  q: "rgb(66 102 0)",             //Quagmire                 #426600
  r: "rgb(255 0 16)",             //Red                      #ff0010
  s: "rgb(94 241 242)",           //Sky                      #5ef1f2
  t: "rgb(0 153 143)",            //Turquoise                #00998f
  u: "rgb(224 255 102)",          //Uranium                  #e0ff66
  v: "rgb(116 10 255)",           //Violet                   #740aff
  w: "rgb(153 0 0)",              //Wine                     #990000
  x: "rgb(255 255 128)",          //Xanthin                  #ffff80
  y: "rgb(255 255 0)",            //Yellow                   #ffff00
  z: "rgb(255 80 5)"              //Zinnia                   #ff5005
}

// letter names
const letterNames = {
  a: "Amethyst",
  b: "Blue",
  c: "Caramel",
  d: "Damson",
  e: "Ebony",
  f: "Forest",
  g: "Green",
  h: "Honneydew",
  i: "Iron",
  j: "Jade",
  k: "Khaki",
  l: "Lime",
  m: "Mallow",
  n: "Navy",
  o: "Orpiment",
  p: "Pink",
  q: "Quagmire",
  r: "Red",
  s: "Sky",
  t: "Turquoise",
  u: "Uranium",
  v: "Violet",
  w: "Wine",
  x: "Xanthin",
  y: "Yellow",
  z: "Zinnia"
}
let textclr = {
  a: "#FFF",
  b: "#000",
  c: "#000",
  d: "#000",
  e: "#000",
  f: "#000",
  g: "#FFF",
  h: "#FFF",
  i: "#FFF",
  j: "#FFF",
  k: "#FFF",
  l: "#FFF",
  m: "#000",
  n: "#000",
  o: "#FFF",
  p: "#FFF",
  q: "#000",
  r: "#FFF",
  s: "#FFF",
  t: "#FFF",
  u: "#FFF",
  v: "#000",
  w: "#000",
  x: "#FFF",
  y: "#FFF",
  z: "#FFF"
}

// get screen size and update on resize
let WIH = innerHeight
let WIW = innerWidth



/////////////////////////////////////////////////////////Game Window//////////////////////////////////////////////////////////////////////////

// Generate Window
//https://css-tricks.com/scale-svg/#how-to-scale-parts-of-an-svg-separately

// Or Use dimple.js for automatic redraw method: el.draw(0, true)

  let svg = d3.select('.game-background').append("svg")
  .attr('width', WIW)
  .attr('height', WIH)
  .attr("opacity","0.7")

// game field
let xwGap = parseInt(WIW * 0.01)
let yhGap = parseInt(WIH * 0.01)

let gameContainerWidth = parseInt(WIW * 0.79)
let gameContainerHeight = parseInt(WIH * 0.79)

let menuContainerWidth = WIW - (xwGap * 3 + gameContainerWidth)
let menuContainerHeight = WIH - (yhGap * 2)

let wordContainerWidth = gameContainerWidth
let wordContainerHeight = WIH - (yhGap * 3 + gameContainerHeight)

let randomColor = pickRandom(ballColors).value 

 
    
    
let gameContainerG = svg.append('g')
.attr('id', 'game')
let gC = gameContainerG.append('rect')
  .attr('x', xwGap)
  .attr('y',  yhGap)
  .attr('width', gameContainerWidth)
  .attr('height', gameContainerHeight - yhGap)
  .attr('fill', '#bebebe')
  .attr('stroke', 'black')
  .attr('stroke-width', 2)
 
// create menu layout
let submenuX = xwGap * 2 + gameContainerWidth
let submenuY = yhGap 

let menuContainerG = svg.append('g')
.attr('id', 'menu')
.attr("transform", `translate(${submenuX}, ${submenuY})`)
let mC = menuContainerG.append('rect')
    .attr('width', menuContainerWidth)
    .attr('height', menuContainerHeight - yhGap)
    .attr('fill', randomColor)
    .attr('stroke', randomColor)

let scoreFieldOutG = menuContainerG.append('g')
.attr('id', 'score')
.attr("transform", `translate(${xwGap}, ${yhGap})`)
let scoreFieldOut = scoreFieldOutG.append('rect')
  .attr('width', menuContainerWidth - (xwGap * 2))
  .attr('height', menuContainerHeight / 5)
  .attr('fill', 'white')
  .on('click', startGame)

 // create words container

 let wordContainerG = svg.append('g')
 .attr('id', 'word')
 .attr("transform", `translate(${xwGap}, ${yhGap * 2  + gameContainerHeight})`)
  let wC = wordContainerG.append('rect')
  .attr('width', wordContainerWidth)
  .attr('height', wordContainerHeight - yhGap)
  .attr('fill', randomColor)
  .attr('stroke', randomColor)


  let wordFieldOutG = wordContainerG.append('g')
  .attr('id', 'wordToSolve')
  .attr("transform", `translate(${wordContainerWidth/3}, ${yhGap})`)
  let wordFieldOut = wordFieldOutG.append('rect')
    .attr('width', wordContainerWidth * 0.33)
    .attr('height', wordContainerHeight * 0.8)
    .attr('fill', 'white')
    .on('click', startGame)



function refreshWindowSize(){
  WIW = innerWidth
  WIH = innerHeight
  console.log(`Window Size: ${WIH}x${WIW}`)
}


// http://bencentra.com/code/2015/02/27/optimizing-window-resize.html debounce function from ben centra
let timeout = false
window.onresize = function() {
  // clear the timeout
clearTimeout(timeout)
// start timing for event "completion"
timeout = setTimeout(refreshWindowSize, 2000)
}
refreshWindowSize()


//pick random value/key from an object
function pickRandom(a) {
  let keysArray = Object.keys(a)
  let rnd = Math.trunc(keysArray.length * Math.random())    // 5 = from  26 * 0.1923076923076923 to 26 * 0.2307692307692307 (letter chance ~3.84%)
  return {
    value: a[keysArray[rnd]], 
    key: keysArray[rnd]
  }
}

function pickRandomArr(arr) {
    let rnd = Math.trunc(arr.length * Math.random())
  return console.log(rnd, arr[rnd], arr[rnd].rgbval)
}

// Ball text color contrast comparison
let ballColArr = {}
for(var key in ballColors){
  ballColArr[key] = {
      letter: key,
      name: letterNames[key],
      rgbval: RGBToArr(ballColors[key]),
      textcolor: (contrast(RGBToArr(ballColors[key])).white < contrast(RGBToArr(ballColors[key])).black) ? "#FFF" : "#000"
  }
}


// RGBToHex solution used from css tricks website https://css-tricks.com/converting-color-spaces-in-javascript/
function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
  }
// Print RGBToHex
// Object.keys(ballColors).forEach(function(key) {
//     console.log(`${key}: "${ballColors[key]}" //  ${RGBToHex(ballColors[key])} `)
// })

//Addapted RGBtoHex function to perform array creation for contrast.js 
  function RGBToArr(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " "
    rgbArr = rgb.substr(4).split(")")[0].split(sep)
     return  rgbArr
  }


// fullscreen toggle

// sound toggle



/////////////////////////Game Logic ////////////////////////////////////////////////////////////////////////////////////////////////


// difficulty selector + (Temporary logic)
const difficultySelection = {
  easiest: {lives: 5, additionalBalls: 5, time: 120, scoreMultiplier: 1, wordLengthMin: 1, wordLengthMax: 4},
  easy: {lives: 4, additionalBalls: 6, time: 120, scoreMultiplier: 1.25, wordLengthMin: 3, wordLengthMax: 5},
  medium: {lives: 3, additionalBalls: 7, time: 120, scoreMultiplier: 1.5, wordLengthMin: 4, wordLengthMax: 7},
  hard: {lives: 2, additionalBalls: 8, time: 120, scoreMultiplier: 1.75, wordLengthMin: 6, wordLengthMax: 9},
  hardest: {lives: 1, additionalBalls: 9, time: 120, scoreMultiplier: 2, wordLengthMin: 7, wordLengthMax: 11}
}



function selectedDifficulty(obj){
  for(element in obj){
  if(element != undefined){   //Testing functions logic to select first option to define difficulty
    difficulty = difficultySelection.easiest
  }
  else if(someRanromMenuFunctionWhitchIllCreateLaterSelected[1]){
    difficulty = difficultySelection.easy
  }
  else if(someRanromMenuFunctionWhitchIllCreateLaterSelected[2]){
    difficulty = difficultySelection.medium
  }
  else if(someRanromMenuFunctionWhitchIllCreateLaterSelected[3]){
    difficulty = difficultySelection.hard
  }
  else {
    difficulty = difficultySelection.hardest
  }
} 
} selectedDifficulty(difficultySelection)


// Game Variables
let wordCount = null
let startingLives = difficulty.lives
let startingBalls = difficulty.additionalBalls
let startingTime = difficulty.time
let scoreMultiplier = difficulty.scoreMultiplier
let startingWordLength = difficulty.wordLengthMin
let ballSpeed = 3
let ballSize = 34





// create a ball
function rndDxDy(min, max) {
  let number = Math.trunc(Math.random() * (max - min) + min)
  if ((number <= -1 && number >= min) || (number >= 1 && number <= max)) {
    return number;
  } else if ((number >= -2 && number <= 0)) {
    return number -= 1;
  } else {
    return number += 1;
  }
}

function rndPos(min, max) {
       return Math.trunc(Math.random() * (max - min) + min)
  }

let balls = []


let ballsGroup = gameContainerG.append('g')
  .attr('id', 'balls')
  .attr("transform", `translate(${xwGap + ballSize}, ${yhGap + ballSize})`)
  .attr('opacity', 0.7)

function ball (letter) {
    this.cx = rndPos(xwGap + ballSize, gameContainerWidth - ballSize*2)
    this.cy = rndPos(yhGap + ballSize, gameContainerHeight - ballSize*2 - 10)
    this.letter = letter
    this.color = ballColors[letter]
    this.textcolor = ballColArr[this.letter].textcolor  
    // random movement direction based on speed
    this.dx = rndDxDy(-ballSpeed, ballSpeed) 
    this.dy = rndDxDy(-ballSpeed, ballSpeed)

    this.draw = function () {

      let ballG = ballsGroup.selectAll('#' + this.letter)
      .data([null])
      
    const ballGenter = ballG.enter().append('g')
    ballGenter
      .attr('id', this.letter)
    .merge(ballG)
    .attr("transform", `translate(${this.cx}, ${this.cy})`)
      ballG.exit().remove()

      let ball = ballsGroup.selectAll('#' + this.letter+'-ball')

      ballGenter.append('circle')
        .attr('id', this.letter+'-ball')
        .attr('class', 'ball')
        .attr('r', ballSize)
        .attr('fill', this.color)
        .attr('stroke', 'black')
      .merge(ball)

    let text = ballsGroup.selectAll('#' + this.letter+'-letter')
        ballGenter.append('text')
        .attr('id', this.letter+'-letter')
        .attr('class', 'balltext')
        .style('fill', this.textcolor)
        .text(this.letter)
      .merge(text)
        .attr('y', 12)
    }

      // border detection
      this.move = function () {
      if (this.cx + ballSize + this.dx> parseInt(gameContainerWidth- ballSize ) || this.cx + ballSize + this.dx < ballSize) {
        this.dx = -this.dx
      }
      if (this.cy + ballSize + this.dy > parseInt(gameContainerHeight - yhGap ) - ballSize || this.cy + ballSize + this.dy < ballSize) {
        this.dy = -this.dy
      }
      //movement
      this.cx += this.dx
      this.cy += this.dy
      this.draw()
    }
}

for(let key in letterNames) {
  balls.push(new ball(key))
}

  function startGame(){
    setInterval(function () {
    for (let element in balls) {
      balls[element].move()
    }
  }, 1000/60)
  }


  
// onclick check for sameness function

ballsGroup.on("click", ballClick)

function ballClick(el) {
  let value = ''
  if (el.path[0].innerHTML.length == 1) {
    value = el.path[0].innerHTML
  } else if (el.path[0].id.length == 1) {
    value = el.path[0].id
  } else {
    value = el.path[1].id
  }
  return value, deletter(value)
}


  
  function deletter(ltr) {
    let letter = ltr;
    for (element in balls) {
      if (balls[element].letter == letter) {
        balls.splice(element, 1);
        d3.selectAll(`#${ltr}`).select(`#${ltr}-ball`).transition().ease(d3.easeExpInOut).duration(1000).attr('r', 0).remove()
        d3.selectAll(`#${ltr}`).select(`#${ltr}-letter`).transition().ease(d3.easeExpInOut).duration(1000).attr('y', 0).style('font-size', '0px').remove()
        d3.selectAll(`#${ltr}`).transition().duration(1200).remove()
        break;
      }
    }
}
// max balls

//random word

let randomWord = []
function rndWord(){
  
  randomWord.push(pickRandom(dictionaryLevel).value)
  
}
// score, words matched




// next level(word)

// game over

// level stats

console.log('Game.js Loaded')
