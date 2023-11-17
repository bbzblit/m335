import { createReducer, on } from "@ngrx/store";
import { Message } from "src/app/model/message.model";
import { fetchAllMessagesSuccess } from "./message.action";

const INITIAL_STATE: Array<Message> = [];


export const messageReducer = createReducer(
    INITIAL_STATE,
    on(fetchAllMessagesSuccess, (state, {messages}) => messages),
)