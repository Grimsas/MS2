/*jshint esversion: 6 */
// dictionary parser, random word
d3.json('./srv/js/common.json').then(function (data) {
  start(data.commonWords);
});

/**
 * 
 * @param {*} commonWord 
 */
function start(commonWord) {
  /**
   * 
   * @param {*} obj 
   */
  function selectedDifficulty() {
    difficulty = difficultySelection.hardest;
  }

  /**
   * 
   */
  function fldWidth() {
    return parseInt((menuContainerWidth - xwGap * 2) / 6);
  }

  function title(titleGroup) {
    titleGroup.append('g')
      .attr('id', 'title')
      .append('text')
      .attr('id', 'title')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight / 4)
      .text('Type in Blizzard')
      .style('font-size', '5rem')
      .style('fill', 'white')
      .style('font-family', 'Snowinter')
      .attr('text-anchor', 'middle');
  }

  class ball {
    constructor(letter) {
      this.cx = rndPos(xwGap + ballSize, gameContainerWidth - ballSize * 2);
      this.cy = rndPos(yhGap + ballSize, gameContainerHeight - ballSize * 2 - yhGap * 2);
      this.letter = letter;
      this.color = ballColors[letter];
      this.textcolor = ballColArr[this.letter].textcolor;

      // random movement direction based on speed
      this.dx = rndDxDy(-ballSpeed, ballSpeed);
      this.dy = rndDxDy(-ballSpeed, ballSpeed);
    }

    move() {
      if (this.cx + ballSize + this.dx > parseInt(gameContainerWidth - ballSize) || this.cx + ballSize + this.dx < ballSize) {
        this.dx = -this.dx;
      }
      if (this.cy + ballSize + this.dy > parseInt(gameContainerHeight - yhGap) - ballSize || this.cy + ballSize + this.dy < ballSize) {
        this.dy = -this.dy;
      }
      //movement
      this.cx += this.dx;
      this.cy += this.dy;
      this.draw();
    }

    draw() {
      let ballG = ballsGroup.selectAll('#' + this.letter)
        .data([null]);
      const ballGenter = ballG.enter().append('g');
      const radialGradient = ballGenter.append('defs')
        .append('radialGradient')
        .attr('id', `radial-gradient-${this.letter}`)
        .merge(ballGenter);

      radialGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', this.color)
        .attr('opacity', 1);
      radialGradient.append('stop')
        .attr('offset', '50%')
        .attr('stop-color', this.color)
        .attr('opacity', 0.6);
      radialGradient.append('stop')
        .attr('offset', '70%')
        .attr('stop-color', this.color)
        .attr('opacity', 0.3);
      radialGradient.append('stop')
        .attr('offset', '85%')
        .attr('stop-color', 'rgba(255, 255, 255, 0.30)')
        .attr('opacity', 0.6);
      radialGradient.append('stop')
        .attr('offset', '90%')
        .attr('stop-color', 'rgba(255, 255, 255, 0.4)')
        .attr('opacity', 0.6);
      radialGradient.append('stop')
        .attr('offset', '95%')
        .attr('stop-color', 'rgba(255, 255, 255, 0.6)')
        .attr('opacity', 0.2);
      radialGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'rgba(255, 255, 255, 0.90)');

      ballGenter
        .attr('id', this.letter)
        .merge(ballG)
        .attr('transform', `translate(${Math.round(this.cx)}, ${Math.round(this.cy)})`);
      ballG.exit().remove();

      ballGenter.append('circle')
        .attr('id', this.letter + '-ball')
        .attr('fill', `url(#radial-gradient-${this.letter}`)
        .attr('class', 'ball')
        .transition().attr('r', ballSize + ballSize / 4)
        .transition().ease(d3.easeExpInOut).duration(500).attr('r', ballSize)
        .attr('opacity', 0.9);

      ballGenter.append('text')
        .attr('id', this.letter + '-letter')
        .attr('class', 'balltext')
        .style('fill', this.textcolor)
        .style('fill-opacity', 1)
        .text(this.letter)
        .attr('y', ballSize / 2.5)
        .style('font-size', `${ballSize * 1.5}px`);
    }
  }

  /**
   * 
   */
  function initializeDimensions() {
    if (innerWidthhratio === 1) {
      xwGap = parseInt(innerWidth * 0.01);
      yhGap = parseInt(innerHeight * 0.01);
      gameContainerWidth = parseInt(innerWidth * 0.75);
      gameContainerHeight = parseInt(innerHeight * 0.75);
      menuContainerWidth = innerWidth - (xwGap * 3 + gameContainerWidth);
      menuContainerHeight = innerHeight - (yhGap * 2);
      wordContainerWidth = gameContainerWidth;
      wordContainerHeight = innerHeight - (yhGap * 3 + gameContainerHeight);
      submenuX = xwGap * 2 + gameContainerWidth;
      submenuY = yhGap;
      fieldWidth = fldWidth();
      labelOffset = -innerWidth / 75;
      yLabelAndValueOffset = menuContainerHeight / 12;
      mem2 = `2em`;
      mem4 = `4em`;
    } else {
      xwGap = parseInt(innerWidth * 0.01);
      yhGap = parseInt(innerHeight * 0.01);
      menuContainerWidth = innerWidth;
      menuContainerHeight = innerHeight * 0.30;
      gameContainerWidth = parseInt(innerWidth - xwGap * 2);
      gameContainerHeight = parseInt(innerHeight * 0.70);
      wordContainerWidth = innerWidth;
      wordContainerHeight = gameContainerHeight - gameContainerHeight * 0.75;
      submenuX = 0;
      submenuY = 0;
      fieldWidth = (fldWidth()) / 1.2;
      yLabelAndValueOffset = menuContainerHeight / 8;
      labelOffset = innerWidth / 4;
      mem2 = '2em';
      mem4 = '4em';
    }
  }

  function buttonGen() {
    const holeRadius = buttonRadius / 8;
    const skyliutysOffset = buttonRadius / 5;

    startButton.append('circle')
      .attr('class', 'sagute')
      .attr('r', buttonRadius)
      .attr('fill', 'white')
      .attr('stroke', 'grey')
      .attr('stroke-width', yhGap / 2);
    startButton.append('circle')
      .attr('r', buttonRadius - buttonRadius / 40)
      .attr('fill', 'white')
      .attr('stroke', 'silver')
      .attr('stroke-width', yhGap / 2);
    startButton.append('circle') //inner
      .attr('r', buttonRadius - buttonRadius / 2.6)
      .attr('fill', 'white')
      .attr('stroke', 'silver')
      .attr('stroke-width', yhGap / 2);
    startButton.append('circle')
      .attr('r', buttonRadius - buttonRadius / 2.5)
      .attr('fill', 'white')
      .attr('stroke', 'grey')
      .attr('stroke-width', yhGap / 2);
    startButton.append('circle')
      .attr('r', buttonRadius - buttonRadius / 2.45)
      .attr('fill', 'white')
      .attr('stroke', 'silver')
      .attr('stroke-width', yhGap / 2);

    startButton.append('g').append('circle')
      .attr('class', 'holesup')
      .attr('cx', skyliutysOffset)
      .attr('cy', skyliutysOffset)
      .attr('r', holeRadius)
      .attr('fill', '#444');
    startButton.append('g').append('circle')
      .attr('class', 'holesup')
      .attr('cx', +skyliutysOffset)
      .attr('cy', -skyliutysOffset)
      .attr('r', holeRadius)
      .attr('fill', '#444');
    startButton.append('g').append('circle')
      .attr('class', 'holes')
      .attr('cx', -skyliutysOffset)
      .attr('cy', +skyliutysOffset)
      .attr('r', holeRadius)
      .attr('fill', '#444');
    startButton.append('g').append('circle')
      .attr('class', 'holes')
      .attr('cx', -skyliutysOffset)
      .attr('cy', -skyliutysOffset)
      .attr('r', holeRadius)
      .attr('fill', '#444');

    startButton.append('path')
      .attr('id', 'arcUp')
      .attr('d', `M ${- skyliutysOffset * 3.14 - holeRadius / 2},0 A50,50 0 0,1 ${skyliutysOffset * 3.14 + holeRadius / 2},0`)
      .style('fill', 'none')
      .style('stroke', 'none');

    startButton.append('path')
      .attr('id', 'arcDown')
      .attr('d', `M ${- skyliutysOffset * 3.14 - holeRadius * 2},0 A50,50 0 1,0 ${skyliutysOffset * 3.14 + holeRadius * 2},0`)
      .style('fill', 'none')
      .style('stroke', 'none');

    startButton.append('text')
      .append('textPath')
      .attr('href', '#arcUp')
      .attr('class', 'start-button-text')
      .attr('x', -buttonRadius / 12)
      .attr('y', -buttonRadius / 2)
      .attr('startOffset', '50%')
      .text('THE START BUTTON')
      .style('font-size', `${buttonRadius / 4.5}px`);

    startButton.append('text')
      .append('textPath')
      .attr('href', '#arcDown')
      .attr('class', 'start-button-text')
      .attr('x', -buttonRadius / 22)
      .attr('y', buttonRadius / 2)
      .attr('startOffset', '50%')
      .text('THE START BUTTON')
      .style('font-size', `${buttonRadius / 4.5}px`);
  }

  /**
   * 
   */
  function MenuContainer() {
    const menuContainerG = svg.append('g')
      .attr('id', 'menu')
      .attr('transform', `translate(${submenuX}, ${submenuY})`);

    menuContainerG.append('rect')
      .attr('width', menuContainerWidth)
      .attr('height', menuContainerHeight - yhGap)
      .attr('fill', 'none');

    menuContainerG.append('g')
      .attr('id', 'scoreOut')
      .attr('transform', `translate(${xwGap}, ${yhGap})`);
    return menuContainerG;
  }

  /**
   * create words container
   * @param {*} randomWord 
   */
  function word(randomWord) {
    const wordContainerG = svg.append('g')
      .attr('id', 'word')
      .attr('transform', `translate(${xwGap}, ${yhGap * 2 + gameContainerHeight})`);

    wordContainerG.append('rect')
      .attr('width', wordContainerWidth)
      .attr('height', wordContainerHeight - yhGap)
      .attr('fill', 'white')
      .attr('stroke', 'silver')
      .attr('opacity', 0.4);
    wordContainerG.append('g')
      .attr('id', 'wordToSolve')
      .attr('transform', `translate(0, ${yhGap})`);

    this.progress = wordContainerG.append('rect')
      .attr('fill', 'red')
      .attr('y', -yhGap / 3)
      .attr('height', wordContainerHeight);

    this.runningOut = function () {
      let second = wordContainerWidth / startingTime;
      let progressStrip = second * timeElapsed;
      progress.attr('fill', 'red').attr('opacity', 0.001 * progressStrip / 2).attr('width', wordContainerWidth / startingTime)
        .attr('x', progressStrip);
    };

    const selectWordContainer = wordContainerG.selectAll('g');

    this.yOffset = parseInt((wordContainerHeight - yhGap * 3));

    const letterWidth = parseInt(((wordContainerWidth - xwGap * 2) / randomWord.length));

    const g = selectWordContainer.selectAll('g')
      .data(randomWord);

    const gEnter = g.enter().append('g');
    gEnter
      .merge(g)
      .attr('transform', (d, i) => `translate(${(((i * letterWidth) + letterWidth / 2 + xwGap))},${parseInt(yOffset / 2)})`);
    g.exit().remove();

    gEnter.append('rect')
      .merge(g.select('rect'))
      .attr('id', (d, i) => randomWord[i] + '-square')
      .attr('x', +(-letterWidth / 2))
      .attr('y', parseInt(-yOffset / 2))
      .attr('width', letterWidth)
      .attr('height', yOffset)
      .attr('fill', (d, i) => ballColors[randomWord[i]]);

    gEnter.append('text')
      .merge(g.select('text'))
      .attr('class', 'wordToGuess')
      .attr('id', (d, i) => randomWord[i] + '-toGuess')
      .text((d, i) => randomWord[i])
      .attr('y', yOffset / 3.75)
      .style('fill', (d, i) => i = ballColArr[randomWord[i]].textcolor)
      .attr('y', wordContainerHeight / 10);
  }

  /**
   * 
   */
  function nextWord() {
    d3.selectAll('#wordToSolve').selectAll('g').remove();
    word(randomWord);
    d3.selectAll('#game').select('rect').attr('opacity', 0.3).transition().duration(200).attr('fill', 'white').transition().duration(200).attr('fill', 'none')
      .transition().duration(400).attr('opacity', 1);
  }

  /**
   * pick random value/key from an object
   * @param {*} a 
   */
  function pickRandom(a) {
    let keysArray = Object.keys(a);
    let rnd = Math.trunc(keysArray.length * Math.random()); // 5 = from  26 * 0.1923076923076923 to 26 * 0.2307692307692307 (letter chance ~3.84%)
    return {
      value: a[keysArray[rnd]],
      key: keysArray[rnd]
    };
  }

  /**
   * 
   * @param {*} arr 
   */
  function pickRandomArr(arr) {
    let rnd = Math.trunc(arr.length * Math.random());
    return arr[rnd];
  }


  /**
   * RGBToHex function itself is not in use anymore
   * RGBToHex solution used from css tricks website https://css-tricks.com/converting-color-spaces-in-javascript/
   * Addapted RGBtoHex function to perform array creation for contrast.js
   * @param {*} rgb 
   */
  function RGBToArr(rgb) {
    let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
    rgbArr = rgb.substr(4).split(')')[0].split(sep);
    return rgbArr;
  }

  /**
   * Create a ball
   * @param {*} min 
   * @param {*} max 
   */
  function rndDxDy(min, max) {
    let number = (Math.random() * (max - min) + min);
    if ((number <= -1 && number >= min) || (number >= 1 && number <= max)) {
      return number;
    } else if ((number >= -1 && number <= 0)) {
      return number -= 2;
    } else {
      return number += 2;
    }
  }

  /**
   * 
   * @param {*} min 
   * @param {*} max 
   */
  function rndPos(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
  }
  //Font Size values
  let mem2,
    mem4;
    
  /**
   * 
   */
  function ScoreCalc() {
    const textXoffset = fieldWidth * 2.5 - xwGap * 2;
    const g = selectScoreContainer.selectAll('g').data([null]);
    const gEnter = g.enter().append('g');

    gEnter
      .merge(g)
      .attr('transform', `translate(${menuContainerWidth / 2},${parseInt(yhGap)})`)
      .attr('class', 'scores');
    g.exit().remove();

    gEnter.append('text')
      .attr('text-anchor', 'end')
      .merge(g.select('#timetext'))
      .attr('id', 'timetext')
      .attr('x', labelOffset)
      .attr('y', yLabelAndValueOffset)
      .text('Time Left: ')
      .style('fill', 'white')
      .style('font-weight', 'bold')
      .style('font-size', mem2);

    gEnter.append('text')
      .attr('text-anchor', 'end')
      .merge(g.select('#timenum'))
      .attr('id', 'timenum')
      .attr('x', textXoffset + fieldWidth)
      .attr('y', yLabelAndValueOffset)
      .text(timeLeft)
      .style('fill', 'white')
      .style('font-weight', 'bold')
      .style('font-size', mem4);

    gEnter.append('text')
      .attr('text-anchor', 'end')
      .merge(g.select('#scoretet'))
      .attr('id', 'scoretet')
      .attr('x', labelOffset)
      .attr('y', yLabelAndValueOffset * 2.5)
      .text('Score: ')
      .style('fill', 'white')
      .style('font-weight', 'bold')
      .style('font-size', mem2);

    gEnter.append('text')
      .attr('text-anchor', 'end')
      .merge(g.select('#scorenum'))
      .attr('id', 'scorenum')
      .attr('x', textXoffset + fieldWidth)
      .attr('y', yLabelAndValueOffset * 2.5)
      .text(score)
      .style('fill', 'yellow')
      .style('font-weight', 'bold')
      .style('font-size', mem4);
  }

  /**
   * 
   * @param {*} gameContainerG 
   */
  function game() {
    gameContainerG.append('rect')
      .attr('x', xwGap)
      .attr('y', yhGap)
      .attr('width', gameContainerWidth)
      .attr('height', gameContainerHeight - yhGap)
      .attr('fill', 'none')
      .attr('stroke', 'silver')
      .attr('stroke-width', 2);
  }

  /**
   * mouse click evaluation and determining what ball has been clicked
   * @param {*} el 
   */
  function ballClick(el) {
    let value = '';
    el = el.target;
    if (el.innerHTML.length == 1) {
      value = el.innerHTML;
    } else if (el.id.length == 1) {
      value = el.id;
    } else {
      value = el.id.charAt(0);
    }
    deletter(value);
  }

  /**
   * 
   * @param {*} ltr 
   */
  function deletter(ltr) {
    let letter = ltr;
    for (var element in balls) {
      if (balls[element].letter === letter && randomWord.some(value => value == ltr)) {
        balls.splice(element, 1);
        d3.selectAll(`#${ltr}`).select(`#${ltr}-ball`)
          .attr('id', null)
          .transition().attr('r', ballSize + ballSize / 10)
          .transition().ease(d3.easeExpInOut).duration(250).attr('r', 0);
        d3.selectAll(`#${ltr}`).select(`#${ltr}-letter`)
          .attr('id', null)
          .transition().style('font-size', '7rem').attr('y', ballSize / 2)
          .transition().ease(d3.easeExpInOut).duration(250).attr('y', 0).style('font-size', '0px');
        d3.selectAll(`#${ltr}`).transition().duration(520).remove();

        d3.selectAll('#wordToSolve').select(`#${ltr}-square`)
          .attr('id', null)
          .transition().ease(d3.easeExpInOut).duration(250).attr('height', 0)
          .transition().ease(d3.easeExpInOut).duration(250).attr('height', yOffset).attr('fill', 'black');
        d3.selectAll('#wordToSolve').select(`#${ltr}-toGuess`)
          .attr('id', null)
          .transition().style('font-size', '1.0rem').style('font-family', 'Snowinter')
          .transition().ease(d3.easeExpInOut).duration(150).style('font-size', '0px').style('fill', 'yellow').attr('y', wordContainerHeight / 10)
          .style('font-size', '5rem');

        letterCount += 1;
        score += letterPointsValue * difficulty.scoreMultiplier;
        ScoreCalc();
        rightLetters.push(ltr);
        clearTimeout(nextWordTimeout);
        nextWordTimeout = setTimeout(function () {
          checkIfDone();
        }, 550);
        if (balls[element].letter === letter && randomWord.some(value => value == ltr)) {
          balls.push(new ball(ltr));
        }
        break;
      } else if (difficulty.lives === 3) {
        //to follow correct letter sequence on medium level
        d3.selectAll('#game').select('rect').attr('opacity', 0.4).transition().duration(200).attr('fill', 'red').transition().duration(200).attr('fill', 'none')
          .transition().duration(400).attr('opacity', 1);
        d3.selectAll(`#${ltr}`).select(`#${ltr}-ball`)
          .transition().ease(d3.easeExpInOut).attr('r', ballSize + ballSize / 10)
          .transition().ease(d3.easeExpInOut).duration(500).attr('r', ballSize);
        d3.selectAll(`#${ltr}`).select(`#${ltr}-letter`)
          .transition().ease(d3.easeExpIn).duration(150).attr('y', 20).style('font-size', '5rem')
          .transition().ease(d3.easeExpInOut).style('font-size', '5rem');
        d3.selectAll(`#${ltr}`).transition().duration(900).remove();
        if (balls[element].letter === letter && randomWord.some(value => value == ltr)) {
          balls.push(new ball(ltr));
        }
        score -= mistakeVal;
        mistakes += 1;
        ScoreCalc();
        break;
      } else if (difficulty.lives < 3) {
        //medium and above levels
        d3.selectAll('#game').select('rect').attr('opacity', 0.4).transition().duration(200).attr('fill', 'red').transition().duration(200).attr('fill', 'none')
          .transition().duration(400).attr('opacity', 1);
        d3.selectAll(`#${ltr}`).select(`#${ltr}-ball`)
          .transition().ease(d3.easeExpInOut).attr('r', ballSize + ballSize / 10)
          .transition().ease(d3.easeExpInOut).duration(500).attr('r', ballSize);
        d3.selectAll(`#${ltr}`).select(`#${ltr}-letter`)
          .transition().ease(d3.easeExpIn).duration(150).attr('y', 20).style('font-size', '5rem')
          .transition().ease(d3.easeExpInOut).style('font-size', '5rem');
        d3.selectAll(`#${ltr}`).transition().duration(900).remove();
        extraRandomBalls();
        score -= mistakeVal;
        mistakes += 1;
        ScoreCalc();
        break;
      } else if (balls[element].letter == letter && !randomWord.some(value => value == ltr)) {
        balls.splice(element, 1);
        d3.selectAll('#game').select('rect').attr('opacity', 0.3).transition().duration(200).attr('fill', 'red').transition().duration(200).attr('fill', 'none')
          .transition().duration(400).attr('opacity', 1);
        d3.selectAll(`#${ltr}`).select(`#${ltr}-ball`)
          .transition().attr('r', ballSize + ballSize / 10)
          .transition().ease(d3.easeExpInOut).duration(500).attr('r', 0);
        d3.selectAll(`#${ltr}`).select(`#${ltr}-letter`)
          .transition().style('font-size', '72px').attr('y', -ballSize / 2)
          .transition().ease(d3.easeExpInOut).duration(500).attr('y', 0).style('font-size', '0px');
        d3.selectAll(`#${ltr}`).transition().duration(1200).remove();
        score -= mistakeVal / 4; // make it easier for kids
        mistakes += 1;
        ScoreCalc();

        break;
      }
    }
  }

  /**
   * next level(word)
   */
  function checkIfDone() {
    if (rightLetters.length === randomWord.length) {
      rightLetters = [];
      rndWord();
      balls = []; //empty the balls array
      ballsGroup.selectAll('g').remove();

      const pusher = randomWord.forEach(function (letter) {
        setTimeout(() => {
          balls.push(new ball(letter.toString()));
        }, 50); //Timeout for popping visuals on the new word
      });
      Promise.resolve(pusher).then(function () {
        randomBalls();
      }); // wait till required word popping finishes before randomising other balls

      wordCount += 1;
      score += wordPointsValue * difficulty.scoreMultiplier;
    }
    return checkIfDone;
  }

  /**
   * 
   */
  function extraRandomBalls() {
    randomWord.forEach(function (letter) {
      if (alphabetArray.some(value => value == letter)) {
        alphabetArray.splice(alphabetArray.lastIndexOf(letter.toString()), 1);
      }
    });
    if (alphabetArray.length > 0) {
      setTimeout(() => {
        balls.push(new ball(removeOneFromArray()));
      }, 50);
    }
  }

  /**
   * 
   * @param {*} rm 
   */
  function removeOneFromArray(rm) {
    rm = pickRandomArr(alphabetArray);
    alphabetArray.splice(alphabetArray.lastIndexOf(rm.toString()), 1);
    return rm;
  }

  /**
   * random word 
   */
  function rndWord() {
    if (dictionaryLevel.length == 0) {
      dictionaryA();
      randomWordTmp = [];
      randomWord = [];
      dictionaryGen(wordLengthMin, wordLengthMax);
      randomWordTmp.push(pickRandom(dictionaryLevel).value);
      randomWordTmp.toString().split('');
      for (let i of randomWordTmp.toString().split('')) {
        randomWord.push([(i)]);
      }
      nextWord();
    } else {
      randomWordTmp = [];
      randomWord = [];
      randomWordTmp.push(pickRandom(dictionaryLevel).value);
      randomWordTmp.toString().split('');
      for (let i of randomWordTmp.toString().split('')) {
        randomWord.push([(i)]);
      }
      nextWord();
    }
  }

  /**
   * Start Game // Pause Game
   */
  function startTimer() {
    game();
    if (!playPauseFlag) {
      playButtonRemove();
      checkIfDone();
      timer();
      playPauseFlag = 1;
      playPauseInterval = setInterval(function () {
        for (let element in balls) {
          balls[element].move();
        }
      }, 1000 / 60);
    } else {
      stopTimer();
    }
    return startTimer;
  }

  /**
   * 
   */
  function timer() {
    timeElapsed += 1;
    timeElapsedID = setTimeout(function () {
      timer();
      timeCalc();
      ScoreCalc();
      runningOut();
      // game over
      if (timeLeft < 1) {
        stopTimer();
        if (confirm(
            `Time's Up!
        Your Score was: ${score}
        You have completed ${wordCount} words,
        You have successfully clicked on ${letterCount} letters,
        and you made just ${mistakes} mistake(s)!
        Well Done!

        Want to play again? Press OK to Start!`)) {
          location.reload();
        }
      }
    }, 1000);
  }

  /**
   * 
   */
  function stopTimer() {
    clearTimeout(timeElapsedID);
    clearInterval(playPauseInterval);
    playPauseFlag = 0;
  }

  /**
   * 
   */
  function playButtonRemove() {
    startButton.selectAll('circle').transition().duration(1000).ease(d3.easeBackIn).attr('r', 0);
    startButton.selectAll('.holes').transition().duration(1000).ease(d3.easeBackIn).attr('cx', 0).attr('cy', 0).attr('r', 0);
    startButton.selectAll('.holesup').transition().duration(1000).ease(d3.easeBackIn).attr('cx', 0).attr('cy', 0).attr('r', 0);
    startButton.selectAll('.start-button-text').transition().duration(900).ease(d3.easeBackIn).style('font-size', '10px').remove();
    svg.select('#saga').transition().duration(1000).remove();
    titleToBackGround();
  }

  /**
   * 
   */
  function titleToBackGround() {
    titleG.selectAll('text').transition().duration(1500).ease(d3.easeBackIn).attr('y', gameContainerHeight - buttonRadius / 3).attr('x', gameContainerWidth / 2).attr('opacity', 0.1);
  }

  /**
   * 
   */
  function timeCalc() {
    let time = startingTime - timeElapsed;
    timeLeft = time;
  }

  /**
   * 
   */
  function dictionaryA() {
    dictionaryAll = commonWord.map(word => word);
  }

  /**
   * 
   * @param {*} min 
   * @param {*} max 
   */
  function dictionaryGen(min, max) {
    dictionaryLevel = dictionaryAll.filter(word => word.length >= min && word.length <= max);
  }

  /**
   * 
   */
  function randomBalls() {
    alphabetArray = [];
    alphabetArray = alphabet.map(word => word);
    randomWord.forEach(function (letter) {
      if (alphabetArray.some(value => value == letter)) {
        alphabetArray.splice(alphabetArray.lastIndexOf(letter.toString()), 1);
      }
    });
    for (let i = 0; i < extraBalls; i++) {
      //removed dublicate push into balls array
      setTimeout(() => {
        balls.push(new ball(removeOneFromArray()));
      }, 100 + i * 50);
    }
  }

  //keyboard events for typing words
  function keyboardKey(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
      deletter(event.key.toLocaleLowerCase());
    }
  }

  // get screen size and update on resize
  // let innerHeight = innerHeight
  // let innerWidth = innerWidth

  let innerWidthhratio = innerHeight - innerWidth < 0 ? 1 : innerWidth - innerHeight > 0 ? 1 : 0;
  let difficulty;

  let nextWordTimeout; // gives a timeout before giving new word when typing too fast

  // max out balls by dificulty 
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let alphabetArray;

  // difficulty selector + (Temporary logic)
  const difficultySelection = {
    easiest: {
      lives: 5,
      additionalBalls: 4,
      time: 120,
      scoreMultiplier: 1,
      wordLengthMin: 1,
      wordLengthMax: 4
    },
    easy: {
      lives: 4,
      additionalBalls: 6,
      time: 120,
      scoreMultiplier: 1.25,
      wordLengthMin: 3,
      wordLengthMax: 5
    },
    medium: {
      lives: 3,
      additionalBalls: 8,
      time: 120,
      scoreMultiplier: 1.5,
      wordLengthMin: 4,
      wordLengthMax: 7
    },
    hard: {
      lives: 2,
      additionalBalls: 10,
      time: 120,
      scoreMultiplier: 1.75,
      wordLengthMin: 6,
      wordLengthMax: 9
    },
    hardest: {
      lives: 1,
      additionalBalls: 12,
      time: 120,
      scoreMultiplier: 2,
      wordLengthMin: 7,
      wordLengthMax: 11
    }
  };

  // Select game dificulty level
  selectedDifficulty(difficultySelection);

  let randomWordTmp = [];
  let randomWord = [];

  //map dictionary to object arrays by length
  let dictionaryAll = [];
  let dictionaryLevel = [];

  // Game Variables
  let startingLives = difficulty.lives;
  const extraBalls = difficulty.additionalBalls;
  let startingTime = difficulty.time + 2; //+2 for correct time on load 
  const scoreMultiplier = difficulty.scoreMultiplier;
  const wordLengthMin = difficulty.wordLengthMin;
  const wordLengthMax = difficulty.wordLengthMax;
  const letterPointsValue = 10;
  const wordPointsValue = 50;
  const mistakeVal = letterPointsValue * scoreMultiplier * 2;
  const buttonRadius = (innerHeight + innerWidth) / 20;

  let balls = [];
  let rightLetters = [];
  let timeElapsed = 0;
  let playPauseFlag = 0;
  let timeElapsedID;
  let wordCount = -1;
  let letterCount = 0;
  let mistakes = 0;
  let score = -wordPointsValue * scoreMultiplier; //score start from ZERO.
  let ballsizecalc = 40;
  let ballSize = (innerHeight / ballsizecalc) + (innerWidth / ballsizecalc);
  let ballSpeed = scoreMultiplier + (ballSize / 15);
  let timeLeft;
  let bgColor = 'rgba(5, 5, 30, 1)';

  let playPauseInterval;

  // letters object 
  const ballColors = {
    a: 'rgb(240 163 255)', //Amethyst                 #f0a3ff
    b: 'rgb(0 117 220)', //Blue                     #0075dc
    c: 'rgb(153 63 0)', //Caramel                  #993f00
    d: 'rgb(76 0 92)', //Damson                   #4c005c
    e: 'rgb(25 25 25)', //Ebony                    #191919
    f: 'rgb(0 92 49)', //Forest                   #005c31
    g: 'rgb(43 206 72)', //Green                    #2bce48
    h: 'rgb(255 204 153)', //Honneydew                #ffcc99
    i: 'rgb(128 128 128)', //Iron                     #808080
    j: 'rgb(148 255 181)', //Jade                     #94ffb5
    k: 'rgb(143 124 0)', //Khaki                    #8f7c00
    l: 'rgb(157 204 0)', //Lime                     #9dcc00
    m: 'rgb(194 0 136)', //Mallow                   #c20088
    n: 'rgb(0 51 128)', //Navy                     #003380
    o: 'rgb(255 164 5)', //Orpiment                 #ffa405
    p: 'rgb(255 168 187)', //Pink                     #ffa8bb
    q: 'rgb(66 102 0)', //Quagmire                 #426600
    r: 'rgb(255 0 16)', //Red                      #ff0010
    s: 'rgb(94 241 242)', //Sky                      #5ef1f2
    t: 'rgb(0 153 143)', //Turquoise                #00998f
    u: 'rgb(224 255 102)', //Uranium                  #e0ff66
    v: 'rgb(116 10 255)', //Violet                   #740aff
    w: 'rgb(153 0 0)', //Wine                     #990000
    x: 'rgb(255 255 128)', //Xanthin                  #ffff80
    y: 'rgb(255 255 0)', //Yellow                   #ffff00
    z: 'rgb(255 80 5)', //Zinnia                   #ff5005
  };

  // letter names
  const letterNames = {
    a: 'Amethyst',
    b: 'Blue',
    c: 'Caramel',
    d: 'Damson',
    e: 'Ebony',
    f: 'Forest',
    g: 'Green',
    h: 'Honneydew',
    i: 'Iron',
    j: 'Jade',
    k: 'Khaki',
    l: 'Lime',
    m: 'Mallow',
    n: 'Navy',
    o: 'Orpiment',
    p: 'Pink',
    q: 'Quagmire',
    r: 'Red',
    s: 'Sky',
    t: 'Turquoise',
    u: 'Uranium',
    v: 'Violet',
    w: 'Wine',
    x: 'Xanthin',
    y: 'Yellow',
    z: 'Zinnia'
  };

  /////////////////////////////////////////////////////////Game Window//////////////////////////////////////////////////////////////////////////


  // game field
  let xwGap,
    yhGap,
    gameContainerWidth,
    gameContainerHeight,
    menuContainerWidth,
    menuContainerHeight,
    wordContainerWidth,
    wordContainerHeight,
    submenuX,
    submenuY,
    fieldWidth,
    labelOffset,
    yLabelAndValueOffset;

  initializeDimensions();

  // Generate Game Window
  const svg = d3.select('.game-background').append('svg')
    .attr('width', innerWidth)
    .attr('height', innerHeight);


  const titleG = svg.append('g');
  title(titleG);

  const startButtonG = svg.append('g')
    .attr('id', 'saga');
  const startButton = startButtonG.append('g')
    .attr('id', 'saga-button')
    .attr('transform', `translate(${innerWidth / 2},${innerHeight / 2})`);
  startButtonG.on('click', startTimer);
  buttonGen();

  // create menu/stats layout
  const menuContainerG = MenuContainer();
  const selectScoreContainer = menuContainerG.selectAll('g');

  //Game Container
  const gameContainerG = svg.append('g')
    .attr('id', 'game');

  // Ball text color contrast comparison
  let ballColArr = {};
  for (var key in ballColors) {
    ballColArr[key] = {
      letter: key,
      name: letterNames[key],
      rgbval: RGBToArr(ballColors[key]),
      textcolor: (contrast(RGBToArr(ballColors[key])).white < contrast(RGBToArr(ballColors[key])).black) ? '#fff' : bgColor
    };
  }

  const ballsGroup = gameContainerG.append('g')
    .attr('id', 'balls')
    .attr('transform', `translate(${xwGap + ballSize}, ${yhGap + ballSize})`);

  // onclick check for sameness function 
  svg.selectAll('#balls').on('click', ballClick);
  // debuging time... sadly there is no path in mozzilla browser. to be changed to: 

  document.addEventListener("keydown", keyboardKey);
  return svg.node();
}