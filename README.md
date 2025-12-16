# Daily Puzzle

## Overview
This project is a daily calendar puzzle game where players place pieces to complete the calendar grid, with special blocked cells for today's date.

## Project Structure
```
daily-puzzle
├── public
│   ├── index.html        # HTML structure of the game
│   ├── styles.css       # Styles for the game
│   └── script.js        # Main JavaScript logic
├── src
│   ├── game.js          # Game management logic
│   ├── grid.js          # Grid representation and management
│   ├── pieces.js        # Tetris pieces definition and rotation
│   └── input.js         # User input handling
├── package.json         # npm configuration file
├── .gitignore           # Git ignore file
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd tetris-grid-game
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Game
1. Open `public/index.html` in your web browser to start playing the game.

### Controls
- Use the arrow keys to move the pieces left, right, and down.
- Press the up arrow key to rotate the pieces.

## Contributing
Feel free to submit issues or pull requests if you have suggestions or improvements for the game.

## License
This project is open-source and available under the MIT License.