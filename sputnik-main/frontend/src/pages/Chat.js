import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const [room, setRoom] = useState("");
    const [sender, setSender] = useState("");
    const navigate = useNavigate();
    const handleSubmit = () => {
      navigate("/chatroom", { replace: true, state: { room, sender } });
    };
  
    return (
      <div className="chat">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="room">Room:</label>
            <input
              placeholder="Room"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              placeholder="Your name"
              onChange={(event) => {
                setSender(event.target.value);
              }}
            />
          </div>
          <button type="submit">Enter</button>
        </form>
      </div>
    );
}

export default Chat