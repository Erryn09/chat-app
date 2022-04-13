import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:9000");

function App() {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const [showChat, setshowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && roomID !== "") {
      socket.emit("join-room", username, roomID);
      setshowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Create A Room</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => setRoomID(event.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} roomID={roomID} />
      )}
    </div>
  );
}

export default App;
