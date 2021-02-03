## Problems that need some prototyping
- minimax algorithm is as far as I can see a form of graph traversal, thus:
  1. Implement a graph in Javascript and some form of traversal (how to keep track of states? inheritance?)
  2. Perhaps start with a not weighted graph and breadth first search?
  3. It might be nice to make a prototype with a weighted graph and Dijkstra algo, or straight to minimax
- once you know what kind of info the minimax algorithm needs, you can plan out other prototypes or even the remainder of the app 

## AI search (my notes)
AI can be used to find solutions to a problem, in the case of TicTacToe and minimax we are trying to find the optimal move/path to take. 

Meaning we are searching for the best path/sequence of actions from the initial state to the goal state. 

### Search problems have:
- initial state
- actions we can take
- transition model (what happens if we take some action? what state are we getting into.)
- goal test to know wether or not we've reached the goal
- path cost function tells us how expensive the path is. 
[At least according to the Harvard AI lecture](https://cs50.harvard.edu/ai/2020/weeks/0/ "Harvard CS50 AI")

### Case tic-tac-toe
Tic-Tac-Toe is a zero-sum game. Meaning there is two players: if one loses, the other wins. If no one wins, it's a draw.
So there is three possible states: x wins, o wins and a tie.
Let's assign values to those: 
- x winning is a 1
- o winning is a -1
- a tie is 0

when playing, x will try to get the value 1 or at *least* a 0, so will try to maximize the value.
o on the other hand will try to get at most a 0, but ideally a -1. O will try to minimize the value.
If we assume that both players play optimally and try to plan their next move, they
can assume that the other player will try to get the best value for them.

So an algorithm that takes the currents state and plans moves from the opposite perspective, will come up with a more realistic game tree, and will be able to find an optimal route.

### How to play tic tac toe
- define initial state (empty board) perhaps with an array
- create a playerFunction. Input: current state, output: whose turn it is. (for example empty board: x's turn, otherwise if there is more x than o, then o's turn, and the other way around)
- function that returns possible actions from the current state (all empty cells are valid move possibilities)
- result func returns state after that action was taken
- terminal function checks wether game is over (3 in a row or board full)
- utility function gives the state a value (1 for x winning, -1 o is winning or draw)

### Adding minimax
- max:
  - check if game is over
  - set initial value as low as possible (-infinity)
  - for every action in actions compare to the value you have: V = max(v, min-Value(Result(state,action)))

- min:
  - check if game is over
  - set initial value as high as possible (+infinity)
  - for every action in actions compare to the value you have: V = min(v, max-Value(Result(state,action)))