import "./Chat.css";
import { ChatInput } from "../ChatInput/ChatInput";
import { chatService } from "../../services/chat.services";
import { AudioMessage, ChatMessage, CommonMesssageType, SubmitArgs } from "../../utils/props.type";
import { useEffect, useRef, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ChatWindow } from "../ChatWindow/ChatWindow";
import { AuthPage } from "../AuthPage/AuthPage";
import { UserModel } from "../../models/UserModel";

export const Chat = () => {
  const [connection, setConnection] = useState<HubConnection>();
  const [chat, setChat] = useState<CommonMesssageType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserModel>();

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

  const loginHandler = (loggedUser: UserModel) => {
    if (loggedUser) {
      setUser(loggedUser);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7042/hubs/chat")
      .build();
    setConnection(connection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ChatToAll", (message: ChatMessage) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push({...message,isAudio: false});
            setChat(updatedChat);
          });

          connection.on("SendAudio",(audio: AudioMessage)=>{
            const updatedChat = [...latestChat.current];
            updatedChat.push({user:audio.user,message:audio.audio,isAudio: true});
            setChat(updatedChat);
          })
        })
        .catch((e) => {
          console.log("Connection failed: " + e);
        });
    }
  }, [connection]);

  return (
    <div className="chat-wrapper">
      {isLoggedIn && user ? (
        <div>
          <h2>Chat</h2>
          <ChatWindow messages={chat} />
          <ChatInput user={user} onMessageSent={sumbitChatHandler} />
        </div>
      ) : (
        <AuthPage onLogin={loginHandler} />
      )}
    </div>
  );
};
