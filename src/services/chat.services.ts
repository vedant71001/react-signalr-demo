import { AudioMessage, ChatMessage } from "../utils/props.type";
import { request } from "./request";

class ChatService {
  ENDPOINT = "api/Chat";

  public async SendMessage(param: ChatMessage) {
    const url = `${this.ENDPOINT}/SendMessage`;
    return request
      .post(url, param)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public async SendAudio(param: AudioMessage) {
    const url = `${this.ENDPOINT}/SendAudio`;
    return request
      .post(url, param)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

export const chatService = new ChatService();
