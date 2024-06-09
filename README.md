#  Ping Pong Championship

Welcome to the ** Ping Pong Championship**! This virtual championship features 8 players and 1 referee. Each player instance represents an individual in the championship, each with unique attributes defined in an external file.

## Championship Overview

- The referee program starts and waits for all 8 players to join the championship.
- Once all players have joined, the referee draws the 4 initial games and notifies the players about their game ID, opponent, and their order of play (first or second).
- All games are knock-out style and supervised by the referee. After the 4 initial games have ended, the defeated players are informed to shut down. The referee then draws the second round (semi-finals) and informs the players about their new game ID and opponents.
- This process continues until the final game where the championship winner is determined.

## Game Rules

- Each game starts with the first (offensive) player picking one random number from 1 to 10 and informing the referee about it.
- The defending player creates a defense array of random numbers from 1 to 10. The length of the defense array is preset for each player and defined in their individual configuration files.
- If the number picked by the offensive player does not exist in the defense array, the player gets one point and plays again. If it exists, the defender gets the point and they switch roles (defender attacks).
- The first player to reach 5 points wins the game.

## Technical Specifications

- All transactions between the referee and the players are implemented as a REST API or via function calls.
- Each player and the referee run as autonomous applications, able to communicate with each other via REST API calls.
- Attention is paid to the proper definition of the REST API routes, implementation, status codes, etc.
- Proper player identification/authentication is implemented during both joining and game processes.
- At the end of the championship, the referee exports a report listing all the games, final scores, and the champion.
- Any framework and library can be used for implementation.

## Players Information

| Player # | Name    | Defense Set Length |
|----------|---------|--------------------|
| 1        | Eliud   | 8                  |
| 2        | Mo      | 8                  |
| 3        | Mary    | 7                  |
| 4        | Usain   | 7                  |
| 5        | Paula   | 6                  |
| 6        | Galen   | 6                  |
| 7        | Shalane | 5                  |
| 8        | Haile   | 5                  |

## Deliverables

- Full code to implement the championship along with setup instructions.
- List of REST API routes supported by both the referee and the player sub-application.

Now, let's get ready for an exciting Ping Pong Championship! 🏓💥
