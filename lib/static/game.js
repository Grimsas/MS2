// asset loading screen 

// dictionary parser, random word
let commonWord = d3.json("../../srv/js/common.json").then(function (data) {
  commonWord = data.commonWords
})

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
  
  dictionaryGen(difficulty.wordLengthMin, difficulty.wordLengthMax)
  
  DL(commonWord)
}
}

let difficulty 


//map dictionary to object arrays by length
let dictionaryAll = []
let dictionaryLevel = []


function dictionaryGen(min, max) {
  dictionaryLevel = commonWord.filter(word => word.length >= min && word.length <= max)
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
  dictionaryAll = wordLengths
  console.log('dictionaryAll: Done!')
} 




// var interval = setInterval(function () {
//   if (document.readyState === 'complete') {
//     clearInterval(interval)
//     dictionaryGen(difficulty.wordLengthMin, difficulty.wordLengthMax)
//     drawLayout()
//     DL(commonWord)

//   }
// }, 100)



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
  .attr('fill', randomColor)
  .attr('stroke', randomColor)
 
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

 // create words container

 let wordContainerG = svg.append('g')
 .attr('id', 'word')
  let wC = wordContainerG.append('rect')
  .attr('x', xwGap, console.log(`hGap: ${xwGap}`))
  .attr('y', yhGap * 2  + gameContainerHeight)
  .attr('width', wordContainerWidth)
  .attr('height', wordContainerHeight - yhGap)
  .attr('fill', randomColor)
  .attr('stroke', randomColor)



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


// redraw on screen size change (NOT))



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
let ballColArr = []
for(key in ballColors){
   let ballColorGenerate = {
        letter: key,
        name: letterNames[key],
        rgbval: RGBToArr(ballColors[key]),
        textcolor: ((contrast(RGBToArr(ballColors[key])).white > contrast(RGBToArr(ballColors[key])).black) ? "#FFF" : "#000")
    }
    ballColArr.push(ballColorGenerate)
    //console.log(contrast(RGBToArr(ballColors[key])))
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

// border detection


// score, words matched

// create a ball
let ballData = [
  { cx: 20, cy: 20, color : pickRandom(ballColors).value },
  { cx: 70, cy: 70, color : pickRandom(ballColors).value }]
 let GCH20 = gameContainerHeight / 20
let ballsGroup = gameContainerG.append('g')
.attr('id', 'balls')
.attr("transform", `translate(${xwGap + GCH20}, ${yhGap + GCH20})`)
.attr('opacity', 1)
let balls = ballsGroup.selectAll('circle')
.data(ballData)
.enter().append('circle')
  .attr("r", gameContainerHeight / 20)
  .attr("cx", d =>  d.cx )
  .attr("cy", d =>  d.cy )
  .attr("fill", d => d.color )

//random word


// max balls

// onclick check for sameness function

// random direction

// next level(word)

// game over

// level stats

console.log('Game.js Loaded')
