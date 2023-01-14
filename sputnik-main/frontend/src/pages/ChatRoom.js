import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBaseUrl } from "../utils";

const socket = io.connect(getBaseUrl());
const ChatRoom = () => {
  const [room, setRoom] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setRoom(location.state.room);
      setSender(location.state.sender);
      if (room !== "") {
        socket.emit("join_room", room);
      }
    } else {
      navigate("/chat");
    }
  }, [location.state, navigate, room, sender]);

  const sendMessage = () => {
    if (message !== "") {
      let time = new Date().toLocaleTimeString();
      socket.emit("send_message", { message, room, sender, time });
      setMessageReceived([{ sender, message, time }, ...messageReceived]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived([data, ...messageReceived]);
    });
  }, [messageReceived]);

  return (
    <div>
      <div className="head">
        <h1>Room:{room}</h1>
        <h1>Name:{sender}</h1>
        <h2> Messages:</h2>
      </div>
      <div className="chats">
        {messageReceived.map((msg) => {
          if (sender === msg.sender)
            return (
              <div className="message-right">
                <div className="message">{msg.message}</div>
                {msg.time}
              </div>
            );
          else
            return (
              <div className="message-left">
                <div className="sender">{msg.sender}</div>
                <div className="message">{msg.message}</div>
                <div className="time">{msg.time}</div>
              </div>
            );
        })}
      </div>
      <div className="send-message">
        <input
          placeholder="Message..."
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
