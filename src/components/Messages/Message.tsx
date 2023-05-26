import { base64ToBlob } from "../../utils/AudioRecorder";
import { ChatMessage, CommonMesssageType } from "../../utils/props.type"
import "./Message.css"

export const Message = (props : CommonMesssageType) => {
  let src:string = "";
  if(props.isAudio){
    let audioBlob = base64ToBlob(props.message);
    src = URL.createObjectURL(audioBlob);
  }
  return (
    <div className="message-wrapper">
        <p><strong>{props.user}</strong>:</p>
        {props.isAudio && src!="" && <audio controls src={src}></audio>}
        {!props.isAudio && <p>{props.message}</p>}
    </div>
  )
}
