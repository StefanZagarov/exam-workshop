import { User } from "./user";

export interface Comment
{
    _id: string;
    content: string;
    creator: User;
    createdAt: string;
    updatedAt: string;
}

