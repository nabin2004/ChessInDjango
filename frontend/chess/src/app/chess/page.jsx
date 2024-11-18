"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import axios from 'axios';
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Home() {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [lobbyId, setLobbyId] = useState();
  const [lastMove, setLastMove] = useState(null);
  const [selectedSquare, setSelectedSquare] = useState(null);

  const ws = useRef(null);

  const moveSound = useRef(new Audio('/sounds/move-self.mp3'));
  const captureSound = useRef(new Audio('/sounds/capture.mp3'));
  const castlingSound = useRef(new Audio('/sounds/castle.mp3'));
  const gameEndSound = useRef(new Audio('/sounds/game-end.mp3'));
  const illegalSound = useRef(new Audio('/sounds/illegal.mp3'));
  const checkSound = useRef(new Audio('/sounds/move-check.mp3'));

  // Fetch the FEN position from the backend
  useEffect(() => {
    const fetchFenPosition = async () => {
      if (!lobbyId) {
        console.error("Lobby ID is not set.");
        return;
      }
      try {
        const response = await axios.get("http://127.0.0.1:8000/get-fen");
        if (response.data.fen_position) {
          setPosition(response.data.fen_position);
          console.log(position)
        } else {
          console.error(response.data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching FEN position:", error);
      }
    };

    fetchFenPosition();
  }, [lobbyId]);


  // Initialize WebSocket connection and join a lobby
  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/ws/lobby/${lobbyId}`);

    ws.current.onmessage = (event) => {
      const { sourceSquare, targetSquare } = JSON.parse(event.data);
      const newMove = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (newMove) {
        setPosition(game.fen());
        setLastMove({ from: sourceSquare, to: targetSquare });

        if (newMove.captured) {
          captureSound.current.play();
        } else if (newMove.flags.includes('k') || newMove.flags.includes('q')) {
          castlingSound.current.play();
        } else {
          moveSound.current.play();
        }
      }
    };

    return () => {
      ws.current.close();
    };
  }, [game, lobbyId]);

  function onDrop(sourceSquare, targetSquare) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) {
      illegalSound.current.play();
      return false;
    }

    setPosition(game.fen());
    setLastMove({ from: sourceSquare, to: targetSquare });

    if (move.captured) {
      captureSound.current.play();
    } else if (move.flags.includes('k') || move.flags.includes('q')) {
      castlingSound.current.play();
    } else {
      moveSound.current.play();
    }

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({ sourceSquare, targetSquare, position })
      );
    }

    if (game.in_checkmate()) {
      gameEndSound.current.play();
    } else if (game.in_check()) {
      checkSound.current.play();
    }

    return true;
  }

  function handleLobbyChange(newLobbyId) {
    if (newLobbyId.length === 6) {
      if (ws.current) {
        ws.current.close();
      }
      setLobbyId(newLobbyId);
      setGame(new Chess());
      setPosition(game.fen());
      
    }else {
      console.log("Lobby ID must be exactly 6 characters.");
    }
  }

  const customPieces = useMemo(() => {
    const pieceComponents = {};
    const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];
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
        <div className="lobby-controls">
          <InputOTP
            maxLength={6}
            onChange={(value) => handleLobbyChange(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Chessboard
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
