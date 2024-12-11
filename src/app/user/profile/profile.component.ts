import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, UserDetails } from '../../interfaces/user';
import { ApiService } from '../../api.service';
import { Band } from '../../interfaces/band';
import { Song } from '../../interfaces/song';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit
{
  constructor(private userService: UserService, private apiService: ApiService) { }

  user: User | null = null;

  createdBands: Band[] | null = null;
  createdSongs: Song[] | null = null;

  likedBands: Band[] | null = null;
  likedSongs: Song[] | null = null;

  ngOnInit(): void
  {
    this.userService.getProfile().subscribe({
      next: (user) => this.user = user,
      complete: () => this.populateProfileData()
    });
  }

  populateProfileData()
  {
    this.getAllBandsCreatedByUser();
    this.getAllBandsLikedByUser();
    this.getALlSongsCreatedByUser();
    this.getAllSongsLikedByUser();
  }

  getAllBandsCreatedByUser()
  {
    this.apiService.getAllBandsCreatedByUser(this.user?._id!).subscribe(bands =>
    {
      this.createdBands = bands;
    });
  }

  getAllBandsLikedByUser()
  {
    this.apiService.getAllBandsLikedByUser(this.user?._id!).subscribe(bands =>
    {
      this.likedBands = bands;
    });
  }

  getALlSongsCreatedByUser()
  {
    this.apiService.getAllSongsCreatedByUser(this.user?._id!).subscribe(songs =>
    {
      this.createdSongs = songs;
    });
  }

  getAllSongsLikedByUser()
  {
    this.apiService.getAllSongsLikedByUser(this.user?._id!).subscribe(songs =>
    {
      this.likedSongs = songs;
    });
  }
}
