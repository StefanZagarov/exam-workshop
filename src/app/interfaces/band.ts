import { User } from "./user";
import { Comment } from "./comment";

export interface Band
{
    image: string;
    name: string;
    origin: string;
    genres: string;
    members: string;
    description: string;
    createdBy: User;
    likes: string[];
    comments: Comment[];
    _id: string;
}