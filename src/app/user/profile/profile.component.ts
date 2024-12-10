import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, UserDetails } from '../../interfaces/user';
import { ApiService } from '../../api.service';
import { Band } from '../../interfaces/band';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, AfterViewInit
{
  constructor(private userService: UserService, private apiService: ApiService) { }

  user: User | null = null;

  createdBands: Band[] | null = null;
  createdSongs: Song[] | null = null;

  likedBands: Band[] | null = null;
  likedSongs: Song[] | null = null;

  ngOnInit(): void
  {
    // In order to get the user after it is set in the service, we subscribe    
    this.userService.user$.subscribe(user => this.user = user);
  }

  // Get the data after the user variable gets data
  ngAfterViewInit(): void
  {
    this.populateStatistics();
  }

  populateStatistics()
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
