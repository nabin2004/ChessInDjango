from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict 
import json
import redis

redis_client = redis.StrictRedis(host="localhost", port=6379, decode_responses=True)

app = FastAPI()
active_connections: List[WebSocket] = []

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],   # Allows all HTTP methods
    allow_headers=["*"],   # Allows all headers
)

@app.get("/get-fen")
def get_fen():
    """Retrieve the FEN position from Redis"""
    fen_position = redis_client.get("fenPos")
    if fen_position is None:
        return {"error": "FEN position not set"}
    return {"fen_position": fen_position}

class LobbyManager:
    def __init__(self):
        self.lobbies: Dict[str, List[WebSocket]] = {}

    async def connect_to_lobby(self, lobby_id: str, websocket: WebSocket):
        """Add a WebSocket connection to the specified lobby."""
        if lobby_id not in self.lobbies:
            self.lobbies[lobby_id] = []
        self.lobbies[lobby_id].append(websocket)
        await self.broadcast_lobby_status(lobby_id)

    def disconnect_from_lobby(self, lobby_id: str, websocket: WebSocket):
        """Remove a WebSocket connection from the specified lobby."""
        if lobby_id in self.lobbies:
            self.lobbies[lobby_id].remove(websocket)
            if not self.lobbies[lobby_id]:
                del self.lobbies[lobby_id] 

    async def broadcast_message(self, lobby_id: str, message: str):
        """Send a message to all WebSocket connections in the specified lobby."""
        if lobby_id in self.lobbies:
            for connection in self.lobbies[lobby_id]:
                await connection.send_text(message)

    async def broadcast_lobby_status(self, lobby_id: str):
        """Broadcast the current lobby status (e.g., number of players) to all connections."""
        if lobby_id in self.lobbies:
            message = f"Lobby {lobby_id} has {len(self.lobbies[lobby_id])} players connected."
            for connection in self.lobbies[lobby_id]:
                await connection.send_text(message)

lobby_manager = LobbyManager()

@app.websocket("/ws/lobby/{lobby_id}")
async def lobby_endpoint(websocket: WebSocket, lobby_id: str):
    """WebSocket endpoint for handling lobby connections."""
    await websocket.accept()

    # Connect the user to the lobby
    await lobby_manager.connect_to_lobby(lobby_id, websocket)

    # Send the current FEN position to the newly connected player
    fen_position = redis_client.get("fenPos")
    if fen_position:
        await websocket.send_text(json.dumps({"fen_position": fen_position}))

    try:
        while True:
            # Receive a message and broadcast it to the lobby
            message = await websocket.receive_text()
            payload = json.loads(message)
            fen_position = payload.get("position")  # Get the position from the received message
            
            # Update the FEN position in Redis
            if fen_position:
                redis_client.set("fenPos", fen_position)
            
            # Broadcast the received message to all players in the lobby
            await lobby_manager.broadcast_message(lobby_id, message)

    except WebSocketDisconnect:
        # Handle disconnection
        lobby_manager.disconnect_from_lobby(lobby_id, websocket)
        await lobby_manager.broadcast_lobby_status(lobby_id)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for handling generic connections."""
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for connection in active_connections:
                await connection.send_text(data)
    except:
        active_connections.remove(websocket)
