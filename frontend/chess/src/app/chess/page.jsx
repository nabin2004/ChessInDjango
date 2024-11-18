"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [lastMove, setLastMove] = useState(null); // Track the last move
  const [selectedSquare, setSelectedSquare] = useState(null); // Track the selected square

  const ws = useRef(null); // Ref for WebSocket

  const moveSound = useRef(new Audio('/sounds/move-self.mp3'));
  const captureSound = useRef(new Audio('/sounds/capture.mp3'));
  const castlingSound = useRef(new Audio('/sounds/castle.mp3'));
  const gameEndSound = useRef(new Audio('/sounds/game-end.mp3'));
  const illegalSound = useRef(new Audio('/sounds/illegal.mp3'));
  const checkSound = useRef(new Audio('/sounds/move-check.mp3'));
  const premoveSound = useRef(new Audio('/sounds/premove.mp3'));

  // Initialize WebSocket connection when the component mounts
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws");

    // Handle incoming messages
    ws.current.onmessage = (event) => {
      const { sourceSquare, targetSquare } = JSON.parse(event.data);
      const newMove = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (newMove) {
        setPosition(game.fen());
        setLastMove({ from: sourceSquare, to: targetSquare }); // Track the last move
        // Play sound for move
        if (newMove.captured) {
          captureSound.current.play();
        } else if (newMove.flags.includes('k') || newMove.flags.includes('q')) {
          castlingSound.current.play(); // Castling sound
        } else {
          moveSound.current.play();
        }
      }
    };

    // Clean up WebSocket on component unmount
    return () => {
      ws.current.close();
    };
  }, [game]);

  // Handle moves on the board
  function onDrop(sourceSquare, targetSquare) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) {
      illegalSound.current.play(); // Play illegal move sound
      return false;
    }

    // Update board state and send the move to the WebSocket server
    setPosition(game.fen());
    setLastMove({ from: sourceSquare, to: targetSquare }); // Track the last move

    // Play sound based on whether a piece was captured or if it's a special move
    if (move.captured) {
      captureSound.current.play();
    } else if (move.flags.includes('k') || move.flags.includes('q')) {
      castlingSound.current.play();
    } else {
      moveSound.current.play();
    }

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({ sourceSquare, targetSquare })
      );
    }

    // Check for game end conditions (checkmate or stalemate)
    if (game.in_checkmate()) {
      gameEndSound.current.play(); // Play game end sound
    } else if (game.in_check()) {
      checkSound.current.play(); // Play check sound
    }

    return true;
  }

  // Handle click-to-move logic
  function handleSquareClick(square) {
    if (selectedSquare) {
      const move = game.move({
        from: selectedSquare,
        to: square,
        promotion: "q",
      });

      if (move) {
        onDrop(selectedSquare, square); // Call the drop handler
        setSelectedSquare(null); // Deselect
      } else {
        illegalSound.current.play(); // Play illegal move sound
        setSelectedSquare(null); // Deselect on illegal move
      }
    } else {
      // Select the square
      setSelectedSquare(square);
    }
  }

  const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];

  const customPieces = useMemo(() => {
    const pieceComponents = {};
    pieces.forEach((piece) => {
      pieceComponents[piece] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/pieces/${piece}.png)`,
            backgroundSize: "100%",
          }}
        />
      );
    });
    return pieceComponents;
  }, []);

  function onSquareRightClick(square) {
    // Additional logic can be added here if required
  }

  return (
    <ThemeProvider>
      <ModeToggle />
      <div className="m-10 w-screen max-w-xl flex justify-center items-center">
        <Chessboard
          onSquareRightClick={onSquareRightClick}
          onSquareClick={handleSquareClick}
          position={position}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
          customDarkSquareStyle={{
            backgroundColor: "#008B8B",
          }}
          customLightSquareStyle={{
            backgroundColor: "#FCEAC7",
          }}
          customPieces={customPieces}
          areArrowsAllowed={true}
          highlightSquare={lastMove ? [lastMove.from, lastMove.to] : []} // Highlight last move squares
          selectedSquare={selectedSquare} // Highlight the selected square
        />
      </div>
    </ThemeProvider>
  );
}
