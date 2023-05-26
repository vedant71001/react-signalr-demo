import { ChatWindowProp } from "../../utils/props.type";
import { Message } from "../Messages/Message";
import "./ChatWindow.css";

export const ChatWindow = (props: ChatWindowProp) => {
  return (
    <div className="message-list">
      {props.messages.map((message) => (
        <Message
          key={props.messages.indexOf(message)}
          user={message.user}
          message={message.message}
        />
      ))}
    </div>
  );
};
