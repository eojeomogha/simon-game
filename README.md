# Simon Game

The Simon Game is a memory-based game where players need to follow a sequence of colors and repeat them correctly. This repository contains the HTML, CSS, and JavaScript code for a web-based implementation of the Simon Game.

## Gameplay

- The game consists of a circular area with four colored sections: red, orange, blue, and green.
- The CPU will generate a random sequence of colors, which will be displayed through flashing animations and corresponding sounds.
- The player's goal is to remember and reproduce the sequence correctly.
- After each successful sequence, the CPU will extend the sequence by adding an additional color.
- The game ends if the player makes a mistake or if the player successfully reproduces the sequence length of 20.

## Instructions

1. Clone or download the repository to your local machine.
2. Open the `index.html` file in a web browser.
3. The game will start automatically. Click on the colored sections to reproduce the sequence displayed by the CPU.
4. Pay attention to the order and timing of the colors as you progress.
5. If you successfully reproduce the entire sequence length of 20, you will be declared the winner.
6. Use the "Reset Game" button to restart the game at any time.
7. Use the "Mute/Unmute" button to toggle the sound effects.
8. The "Score" section displays your current score and the highest score achieved.

## Customization

The game offers different levels of difficulty. By default, the game is set to the "easy" difficulty level. To customize the difficulty level, modify the `difficulty` variable in the JavaScript code.

```javascript
let difficulty = 'easy';

![image](https://github.com/eojeomogha/simon-game/assets/134320691/fe448839-9891-4ee6-b05f-556c654de319)

Next Steps/Icebox Items
Modify the CSS code to center the circular game board on the screen for better visual presentation.
Enhance the CSS styles to make the flashing animations of the colored sections more visually appealing and engaging.
Modify the HTML and CSS code to position the current score tally inside the circular game board while keeping the highest score tally on the side.
Implement a navigation bar or menu where players can select the difficulty level directly instead of modifying the code. This can provide a more user-friendly and intuitive way to choose the desired difficulty level.

Technologies Used
HTML
CSS
JavaScript
Credits

The Simon Game implementation is inspired by the Simon electronic game, created by Ralph H. Baer and Howard J. Morrison.

The audio files used in the game are sourced from FreeCodeCamp.
