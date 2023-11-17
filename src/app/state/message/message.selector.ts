import { createFeatureSelector } from "@ngrx/store";
import { Message } from "src/app/model/message.model";

export const selectMessages = createFeatureSelector<Array<Message>>("messages");