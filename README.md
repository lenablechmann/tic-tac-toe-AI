# Tic Tac Toe Web-App
A tic tac toe game written in HTML5/CSS3/Javascript using the minimax AI and javascript module pattern.

## Specification
- create a tic tac toe game in javascript, html, css
- user should be player 1
- AI (minimax algorithm) will be player 2
- Mobile first minimalistic design with figma
- use CSS grid and flexbox for layout
- avoid global namespace polution by using the revealing module pattern
- if you need multiples of the same prototype, use factory functions

## Project Road Map
- [x] create a basic README layout, add folders and css reset file
- [x] create a wireframe for the interface
- [x] create a figma layout for mobile (desktop will be a variation of it): ![Figma mobile layout](images/figmaLayout.png)
- [x] plan out the web app with a flowchart and determine which classes/ids, objects, functions and modules (what they will reveal) you'll approximately need
- [x] create the html+css static layout
- [x] write a javascript base game where player 1 is the user, and player 2 chooses random cells for its moves (player 2 will be a bot)
- [x] write out the winning logic condition
- [x] display winner and ideally show what the winning row/diagonal is
- [x] program how the new round will be started after the win
- [ ] add the AI (if you dare)
- [ ] add an architectural overview in form of a chart

## Learning goals
- practice planning and organizing projects from start to finish (top down or bottom up, which suits the situation better?)
- how to use the module pattern in javascript to organize your code
- how to use factory functions + prototypal inheritance
- practice debugging in developer tools
- make the user experience as fluid and as simple as possible
- understand and implement the minimax algorithm in a project (which is the foundation of game theory and AI)
- use emmet shortcuts to speed up your HTML composing
- add unit tests with the jest framework to make the code more maintainable and avoid constant guesswork whenever bugs creep up
- apply basic TDD (test driven development) concepts

## Unexpected Difficulties/Learning Experiences
- minimax is pretty hard to understand if you don't understand graphs, so that led me down the graphs rabbit hole and AI articles + courses
- implementing game states in code was also not trivial
- jest testing builds upon exporting of JS modules, which clashes with the revealing module pattern. Atm I will prioritize using the module pattern, and manually export the functions into test files, since my goal with this project is to learn the revearing module pattern.


