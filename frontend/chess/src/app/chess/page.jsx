"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const ws = useRef(null); // Ref for WebSocket

  // Initialize WebSocket connection when the component mounts
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws"); // Replace with your WebSocket server address

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
      return false;
    }

    // Update board state and send the move to the WebSocket server
    setPosition(game.fen());

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({ sourceSquare, targetSquare })
      );
    }

    return true;
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

  return (
    <ThemeProvider>
      <ModeToggle />
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
