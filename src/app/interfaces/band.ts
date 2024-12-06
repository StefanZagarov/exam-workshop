import { User } from "./user";

export interface Band
{
    name: string;
    origin: string;
    genres: string;
    members: string;
    description: string;
    createdBy: User;
    likes: string[];
    _id: string;
}