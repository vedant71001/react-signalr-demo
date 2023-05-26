import "./Chat.css";
import { ChatInput } from "../ChatInput/ChatInput";
import { chatService } from "../../services/chat.services";
import { ChatMessage, SubmitArgs } from "../../utils/props.type";
import { useEffect, useRef, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ChatWindow } from "../ChatWindow/ChatWindow";

export const Chat = () => {
  const [connection, setConnection] = useState<HubConnection>();
  const [chat, setChat] = useState<ChatMessage[]>([]);

  const latestChat = useRef(chat);

  latestChat.current = chat;

  const sumbitChatHandler = (
    values: ChatMessage,
    { resetForm }: SubmitArgs
  ) => {
    console.log(values);
    chatService.SendMessage(values).then((res) => {
      console.log(res);
    });
    resetForm();
  };

  useEffect(() => {
    const connection = new HubConnectionBuilder().withUrl("https://localhost:7042/hubs/chat").build();
    setConnection(connection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ChatToAll", (message: ChatMessage) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);
            setChat(updatedChat);
          });
        })
        .catch((e) => {
          console.log("Connection failed: " + e);
        });
    }
  }, [connection]);

  return (
    <div className="chat-wrapper">
      <h2>Chat</h2>
      <ChatInput onMessageSent={sumbitChatHandler} />
      <ChatWindow messages={chat}/>
    </div>
  );
};
