import { createAction, props } from "@ngrx/store";
import { Message } from "src/app/model/message.model";

export const fetchAllMessages = createAction(
    '[Message] Fetch All Messages',
    props<{chatId: number}>()
);

export const fetchAllMessagesSuccess = createAction(
    '[Message] Fetch All Messages Success',
    props<{messages: Array<Message>}>()
);

