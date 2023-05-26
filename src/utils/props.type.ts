import { FormikState } from "formik"
import { UserModel } from "../models/UserModel"

export type ChatMessage = {
    user: string,
    message: string   
}

export type AudioMessage = {
    user: string,
    audio: string
}

export type CommonMesssageType = {
    user: string,
    message: string,
    isAudio: boolean
}

export type SubmitArgs = {
    resetForm: (nextState?: Partial<FormikState<ChatMessage>>) => void
}

export type ChatInputProp = {
    onMessageSent: (values: ChatMessage, {resetForm}: SubmitArgs)=>void,
    user: UserModel
}

export type ChatWindowProp = {
    messages: CommonMesssageType[]
    // messages: ChatMessage[]
}

export type AuthPageProp = {
    onLogin: (user: UserModel) => void
}
