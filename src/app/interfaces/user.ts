import { Band } from "./band";
import { Song } from "./song";

export interface User
{
    username: string;
    email: string;
    password: string;
    _id: string;
    createdBands: Band[];
    createdSongs: Song[];
};

export interface UserDetails
{
    username: string;
    email: string;
}