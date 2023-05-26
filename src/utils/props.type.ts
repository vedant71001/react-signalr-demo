import { FormikState } from "formik"

export type ChatMessage = {
    user: string,
    message: string   
}

export type SubmitArgs = {
    resetForm: (nextState?: Partial<FormikState<ChatMessage>>) => void
}

export type ChatInputProp = {
    onMessageSent: (values: ChatMessage, {resetForm}: SubmitArgs)=>void
}

export type ChatWindowProp = {
    messages: ChatMessage[]
}