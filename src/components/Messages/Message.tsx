import { ChatMessage } from "../../utils/props.type"
import "./Message.css"

export const Message = (props : ChatMessage) => {
  return (
    <div className="message-wrapper">
        <p><strong>{props.user}</strong>:</p>
        <p>{props.message}</p>
    </div>
  )
}
