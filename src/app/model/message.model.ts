import { User } from "./user.model";

export interface Message{
    id: number;
    created_at: Date;
    text: string;
    author: User;
}