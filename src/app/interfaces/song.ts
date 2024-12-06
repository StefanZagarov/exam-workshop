import { User } from "./user";

export interface Song
{
    name: string;
    genres: string;
    band: string;
    length: string;
    createdBy: User;
    likes: string[];
    _id: string;
}