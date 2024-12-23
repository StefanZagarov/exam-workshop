import { User } from "./user";
import { Comment } from "./comment";

export interface Song
{
    albumImage: string;
    name: string;
    genres: string;
    band: string;
    length: string;
    createdBy: User;
    likes: string[];
    comments: Comment[];
    _id: string;
}