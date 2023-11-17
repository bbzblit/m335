import { UserModel } from "./user.model";

export interface Chat{
    id: number;
    created_at: Date;
    user_a: UserModel;
    user_b: UserModel;
}