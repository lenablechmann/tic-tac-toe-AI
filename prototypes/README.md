## Problems that need some prototyping
- minimax algorithm is as far as I can see a form of graph traversal, thus:
  1. Implement a graph in Javascript and some form of traversal (how to keep track of states? inheritance?)
  2. Perhaps start with a not weighted graph and breadth first search?
  3. It might be nice to make a prototype with a weighted graph and Dijkstra algo, or straight to minimax
- once you know what kind of info the minimax algorithm needs, you can plan out other prototypes or even the remainder of the app 

## AI search (my notes)
AI can be used to find solutions to a problem, in the case of TicTacToe and minimax we are trying to find the optimal move/path to take. 

Meaning we are searching for the best path/sequence of actions from the initial state to the goal state. The optimal solution would be the "cheapest" path on a weighted graph.

Graphs consist of nodes, which keep track of the state, the parent node, the applied action and the path cost that was needed to get to this node.

### Search problems have:
- initial state
- actions we can take
- transition model (what happens if we take some action? what state are we getting into.)
- goal test to know wether or not we've reached the goal
- path cost function tells us how expensive the path is. 
[At least according to the Harvard AI lecture](https://cs50.harvard.edu/ai/2020/weeks/0/ "Harvard CS50 AI")