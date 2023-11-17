import { UserModel } from "./user.model";

export interface Chat{
    id: number;
    created_at: Date;
    user_a: UserModel | number;
    user_b: UserModel | number;
}