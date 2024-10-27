import { useState, useMemo } from "react";
import { ThemeProvider } from "./components/ui/theme-provider"
import { Chessboard } from 'react-chessboard'
import { Chess } from "chess.js";
import './App.css';
import './index.css';
import { ModeToggle } from "./components/ui/mode-toggle";
import { Button } from "./components/ui/button"

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
        backgroundImage: `url(/pieces/${piece}.png)`,
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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="App h-full flex justify-center items-center">
    <Button>Button</Button>
    <ModeToggle />
      <div className="w-full max-w-md flex justify-center">
      <Chessboard id="StyledBoard" boardOrientation="white" position={game.fen()} onPieceDrop={onDrop} customBoardStyle={{
      borderRadius: "4px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
    }} customDarkSquareStyle={{
      backgroundColor: "#008B8B"
    }} customLightSquareStyle={{
      backgroundColor: "#FCEAC7"
    }} customPieces={customPieces} />
      </div>
    </div>
    </ThemeProvider>
  );
}


export default App;

