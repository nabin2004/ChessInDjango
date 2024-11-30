"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Chess } from "chess.js";

export default function RoomFinder() {
  const [lobbyId, setLobbyId] = useState("");
  const [game, setGame] = useState(null);
  const ws = useRef(null);

  function handleLobbyChange(newLobbyId) {
    if (newLobbyId.length === 6) {
      if (ws.current) {
        ws.current.close();
      }
      setLobbyId(newLobbyId);
      const newGame = new Chess();
      setGame(newGame);
      console.log("New Lobby ID set:", newLobbyId);
      console.log("Game initialized with FEN:", newGame.fen());
    } else {
      console.error("Lobby ID must be exactly 6 characters.");
    }
  }

  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen gap-8 p-6 text-gray-100">
      {/* Title Section */}
      <header className="text-center">
        <h1 className="text-4xl font-bold">Join a Game</h1>
        <p className="text-lg text-gray-400 mt-2">
          Enter the 6-character lobby ID to find or create a game room.
        </p>
      </header>

      {/* Lobby Controls */}
      <div className="flex flex-col items-center gap-4">
        <InputOTP maxLength={6} onChange={(value) => handleLobbyChange(value)}>
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

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            variant="default"
            size="lg"
            onClick={() => console.log("Joining game...")}
            disabled={lobbyId.length !== 6}
          >
            Join Game
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => console.log("Creating a new game...")}
          >
            Create Game
          </Button>
        </div>
      </div>
    </div>
  );
}
