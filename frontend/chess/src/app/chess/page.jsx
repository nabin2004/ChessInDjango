'use client'
import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js
import { Button } from "@/components/ui/button";
import { Chess } from "chess.js"; 
import { Chessboard } from 'react-chessboard'
import { ModeToggle } from "@/components/ui/mode-toggle"; 
import { ThemeProvider } from '@/components/theme-provider';


export default function Home() {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());

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

  // Function to handle moves
  function onDrop(sourceSquare, targetSquare) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // auto-promote to queen for simplicity
    });

    if (move === null) {
      alert("Invalid move! Please try again.");
      return false;
    }

    // Update position state if the move is valid
    setPosition(game.fen());
    return true;
  }

  return (
        <ThemeProvider>

        <ModeToggle/>
        <div className="m-10 w-screen max-w-xl flex justify-center items-center">
          <Chessboard
            id="StyledBoard"
            boardOrientation="white"
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
          />
        </div>
        </ThemeProvider>
  );
}
