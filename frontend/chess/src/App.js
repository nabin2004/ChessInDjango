// import './App.css';
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useState } from "react";

function App() {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());

  // Function to handle moves
  function onDrop(sourceSquare, targetSquare) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q" // auto-promote to queen for simplicity
      });

      // Check if the move is legal
      if (move === null) {
        alert("Invalid move! Please try again.");
        return false; // Prevent move from being made on the board
      }

      // Update position state if the move is valid
      setPosition(game.fen());
      return true;
    } catch (error) {
      console.error("Invalid move:", error);
      // alert("Invalid move! Please try again.");
      return false;
    }
  }

  return (
    <div className="App h-screen flex justify-center items-center">
      <div className="w-full max-w-md flex justify-center">
        <Chessboard
          id="BasicBoard"
          position={position}
          onPieceDrop={onDrop} // This handles move validation
        />
      </div>
    </div>
  );
}

export default App;
