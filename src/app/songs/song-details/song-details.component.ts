import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Song } from '../../interfaces/song';
import { FormsModule, NgForm } from '@angular/forms';
import { LikesPipe } from '../../shared/pipes/likes.pipe';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ImageUrlDirective } from '../../directives/image-url.directive';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-song-details',
  standalone: true,
  imports: [FormsModule, LikesPipe, LoaderComponent, ImageUrlDirective],
  templateUrl: './song-details.component.html',
  styleUrl: './song-details.component.css'
})
export class SongDetailsComponent implements OnInit
{
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private userService: UserService, private router: Router, private toastService: ToastService) { };

  song = {} as Song;
  isOwner = false;
  songId = ``;
  editMode = false;
  hasLiked = false;

  userId: string | undefined = ``;

  hasLoaded = false;

  ngOnInit(): void
  {
    this.songId = this.activatedRoute.snapshot.params[`songId`];

    this.apiService.getSongDetails(this.songId).subscribe(song =>
    {
      this.song = song;

      this.userId = this.userService.user?._id;

      this.isOwner = this.song.createdBy._id === this.userId;

      this.hasLiked = this.song.likes.some(userId => userId === this.userId);

      this.hasLoaded = true;
    });

  }

  toggleEditMode()
  {
    this.updateSongPageInfo();
    this.editMode = !this.editMode;
  }

  updateSong(form: NgForm)
  {
    if (form.invalid)
    {
      this.toastService.show(`Please fill all fields correctly!`, `error`);
      return;
    };

    const { albumImage, name, genres, band, length } = form.value;

    this.apiService.updateSong(this.songId, albumImage, name, genres, band, length).subscribe(() =>
    {
      this.updateSongPageInfo();
      this.toggleEditMode();
    });
  }

  likeSong()
  {
    this.apiService.likeSong(this.userId!, this.songId).subscribe(() =>
    {
      this.hasLiked = true;

      this.updateSongPageInfo();
    });
  }

  unlikeSong()
  {
    this.apiService.unlikeSong(this.userId!, this.songId).subscribe(() =>
    {
      this.hasLiked = false;

      this.updateSongPageInfo();
    });
  }

  updateSongPageInfo()
  {
    this.apiService.getSongDetails(this.songId).subscribe(song =>
    {
      this.song = song;
    });
  }

  postComment(form: NgForm)
  {
    if (form.invalid) return;

    const inputField = form.value;

    const comment = {
      content: inputField.comment,
      creator: this.userId!,
      createdAt: new Date().toISOString(),
      updatedAt: ``
    };

    this.apiService.postSongComment(this.songId, comment).subscribe(() =>
    {
      this.updateSongPageInfo();

      form.reset();
    });
  }

  deleteComment(commentId: string)
  {
    this.apiService.deleteSongComment(this.songId, commentId).subscribe(() =>
    {
      this.updateSongPageInfo();
    });
  }

  deleteSong()
  {
    this.apiService.deleteSong(this.songId).subscribe(() =>
    {
      this.router.navigate([`/songs-ranking`]);
    });
  }
}
