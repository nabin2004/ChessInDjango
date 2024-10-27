// import './App.css';
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useState, useMemo } from "react";


function App() {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];
  const customPieces = useMemo(() => {
    const pieceComponents = {};
    pieces.forEach(piece => {
      pieceComponents[piece] = ({
        squareWidth
      }) => <div style={{
        width: squareWidth,
        height: squareWidth,
        backgroundImage: `url(${process.env.PUBLIC_URL}/pieces/${piece}.png)`,
        backgroundSize: "100%"
      }} />;
    });
    return pieceComponents;
  }, []);
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
      <Chessboard id="StyledBoard" boardOrientation="black" position={game.fen()} onPieceDrop={onDrop} customBoardStyle={{
      borderRadius: "4px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
    }} customDarkSquareStyle={{
      backgroundColor: "#779952"
    }} customLightSquareStyle={{
      backgroundColor: "#edeed1"
    }} customPieces={customPieces} />
      </div>
    </div>
  );
}

export default App;
