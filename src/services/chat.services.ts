import { ChatMessage } from "../utils/props.type";
import { request } from "./request";

class ChatService{
    ENDPOINT = "api/Chat";

    public async SendMessage(param: ChatMessage){
        const url = `${this.ENDPOINT}/SendMessage`;
        return request.post(url,param).then((res)=>{
            return res.data;
        })
    }
}

export const chatService = new ChatService()
