import { User } from "./user.model";

export interface Chat{
    id: number;
    created_at: Date;
    user_a: User;
    user_b: User;
}