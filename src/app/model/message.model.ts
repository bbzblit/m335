import { Chat } from "./chat.model";
import { UserModel } from "./user.model";

export interface Message{
    id: number;
    created_at: Date;
    text: string;
    author: UserModel;
    chat: Chat;
    isImage: boolean;
    location?: string;
}