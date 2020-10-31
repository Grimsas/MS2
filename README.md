# Type in Blizzard

Type in Blizzard is a spelling and typing game aimed at kids. The goal is to type given words either with a keyboard or with the letters floating on the touch screen. The more words you type incorrectly in two minutes, the bigger the score, but the player gets negative points for errors. In the end, the player can see how many words he was able to type, how many letters he pressed on correctly and how many mistakes were made. This game helps to learn the correct spelling of different difficulty words, helps with keyboard letter placement recognition and creates an environment where a player competes with himself putting effort to improve his spelling skills and score simultaneously.

## [https://grimsas.github.io/ms2/](Link)

## UX

As a father of seven-year-old, I can see first hand how helpful are learning games to overcome learning boredoms and have some real results through learning and play environment.
I was intrigued to create a game, that would erase the concept of learning and create a feeling of urgency to recall words fast and correct while keeping busy trying to catch floating bubbles. Also, I saw the opportunity to use the same concept for keyboard letter placement learning, as it is an inevitable and necessary skill, that might be improved by a game of this kind. Kids are incredibly tech-savvy; therefore, I saw it fitting to create a "non-teaching" but actually, in fact, teaching platform to create skills through play, enjoy the same game through different interface's.

## User goals

This game is aimed at primary school age children. It is simple enough to navigate through but also attractive to keep engagement long enough to learn while having fun. Even though it is intended for kids, when playing touchscreen mode it is challenging and engaging enough even for adults. Therefore this gives opportunity for the parents to challenge the kids to compete with them, without boring either of them out.

As a user I want/expect to:
Understand how to play the game
Understand how to start the game
See my score
See how much time I have left
Be able to play game that is visually pleasing
Be able to have fun
Be able to have a smooth playtime experience
Be able to see my statistics to know if I am improving through the sessions.

## Features

### Existing Features

- Mouse and Touchcreen support - allow users to use touchscreen or mouse to pop the balls to complete words

- Keyboard support - allow users to use keyboard to complete words

- Statistics - User can see their statistics at the end of the game

- Install the game - Users can 'install' the game on the Android or iOS device by adding the Web page to the home screen and enjoying it playing fullscreen (Locked to Portrait orientation)

### Features Left to Implement

- Sound - To be included in the very near future

- Difficulty selection -  allow users to select one of the five difficulties at the begining

- Play again - Play again feature to load game start screen without refreshing the page

- Screen resize - at the moment screen does not resize on demand, and the user have to restrart/refresh the page/app to get the game rerendered.

## Technologies Used

- HTML
- CSS
- JavaScript
  - The project uses JavaScript and D3 as main DOM generator, and manipulates the data.
- [D3.js](https://d3js.org/)
  - The project uses **D3.js** to manipulate DOM, draw SVG shapes.
- [particles.js](https://vincentgarreau.com/particles.js/)
  - The project uses **particles.js**  to generate snow in the background.

## Testing

The game was developed on localy running Visual Studio Code and tested on the local web server(Live Server).  
All of the testing done manually by checking game responsiveness and functionality, and checking the web browser console output and debugger logs, checking for syntax issues the VSCode Problems terminal.

Also tested by remotely debugging Android device, as one function got called before other function finishes and not loading game screen at all [https://developers.google.com/web/tools/chrome-devtools/remote-debugging](Remote-debuging)

The project had been tested on Android and Windows machines with various screen sizes (Samsung A70, Samsung A40, OnePlus 5, Huawei P20, and on FullHD and 4K PC screens) and Chrome, Firefox, Edge Browsers to ensure that the project looks consistent accross all platforms. Also visual testing been emulated on Developer tools emulated devices.

## Deployment

[https://grimsas.github.io/ms2/](Deployment)
Page has been developed localy and published to [https://pages.github.com/](GitHub.io)

### Media

All the visual conten is developed by me, except the fonts used in the game.
[http://www.sickcapital.com/fonts/snowinter/](Snowinter)
[https://www.atipofoundry.com/fonts/silka](SilkaRegular)

### Acknowledgements

- I received inspiration for this project from My Wife and kids.
