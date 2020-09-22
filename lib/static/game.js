// asset loading screen --splash

// get screen size

const wheight = innerHeight;
const wwidth = innerWidth;

// fullscreen toggle

// sound toggle

// create menu layout

// game field


const gameContainer = d3.select('#gameFields').append("svg")
.attr("width", wwidth - 20)
.attr("height", wheight - 20)
.attr("font-family", "sans-serif")
.attr("font-size", "10")
.attr("text-anchor", "end");


// border detection

// next level

// level stats

// create a ball

// max balls

// onclick function

// random direction

// letters object + relative ball colors
const ballColours = {
    a: "rgb(240 163 255)", //Amethyst #f0a3ff
    b: "rgb(0 117 220)", //Blue #0075dc
    c: "rgb(153 63 0)", //Caramel #993f00
    d: "rgb(76 0 92)", //Damson #4c005c
    e: "rgb(25 25 25)", //Ebony #191919
    f: "rgb(0 92 49)", //Forest #005c31
    g: "rgb(43 206 72)", //Green #2bce48
    h: "rgb(255 204 153)", //Honneydew #ffcc99
    i: "rgb(128 128 128)", //Iron #808080
    j: "rgb(148 255 181)", //Jade #94ffb5
    k: "rgb(143 124 0)", //Khaki #8f7c00
    l: "rgb(157 204 0)", //Lime #9dcc00
    m: "rgb(194 0 136)", //Mallow #c20088
    n: "rgb(0 51 128)", //Navy #003380
    o: "rgb(255 164 5)", //Orpiment #ffa405
    p: "rgb(255 168 187)", //Pink #ffa8bb
    q: "rgb(66 102 0)", //Quagmire #426600
    r: "rgb(255 0 16)", //Red #ff0010
    s: "rgb(94 241 242)", //Sky #5ef1f2
    t: "rgb(0 153 143)", //Turquoise #00998f
    u: "rgb(224 255 102)", //Uranium #e0ff66
    v: "rgb(116 10 255)", //Violet #740aff
    w: "rgb(153 0 0)", //Wine #990000
    x: "rgb(255 255 128)", //Xanthin #ffff80
    y: "rgb(255 255 0)", //Yellow #ffff00
    z: "rgb(255 80 5)" //Zinnia #ff5005
}
// Print RGBToHex
// Object.keys(lettersMap).forEach(function(key) {

//     console.log(`${key}: "${ballColours[key]}" //  ${RGBToHex(ballColours[key])} `);
  
//   });

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


  function RGBToArr(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgbArr = rgb.substr(4).split(")")[0].split(sep);
     return  rgbArr;
  }
   var ballColArr = []
for(key in ballColours){
   var ballColArr2 = {
        letter: key,
        rgbval: RGBToArr(ballColours[key]),
        textclr: ((contrast(RGBToArr(ballColours[key])).white > contrast(RGBToArr(ballColours[key])).black) ? "#FFF" : "#000")
    }
    
    ballColArr.push(ballColArr2)


    // console.log(contrast(RGBToArr(ballColours[key])));
    // console.log((contrast(RGBToArr(ballColours[key])).white > contrast(RGBToArr(ballColours[key])).black) ? "#FFF" : "#000", key) ;
        
    }


   
    
  



// score

// lives

// words matched

// game over

// dictionary

// random word
