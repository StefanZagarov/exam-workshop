import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Song } from '../../interfaces/song';
import { FormsModule, NgForm } from '@angular/forms';
import { LikesPipe } from '../../shared/pipes/likes.pipe';

@Component({
  selector: 'app-song-details',
  standalone: true,
  imports: [FormsModule, LikesPipe],
  templateUrl: './song-details.component.html',
  styleUrl: './song-details.component.css'
})
export class SongDetailsComponent implements OnInit
{
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private userService: UserService) { };

  song = {} as Song;
  isOwner = false;
  songId = ``;
  editMode = false;
  hasLiked = false;

  userId: string | undefined = ``;

  ngOnInit(): void
  {
    this.songId = this.activatedRoute.snapshot.params[`songId`];

    this.apiService.getSongDetails(this.songId).subscribe(song =>
    {
      this.song = song;

      this.isOwner = this.song.createdBy._id === this.userService.user?._id;

      this.userId = this.userService.user?._id;

      this.hasLiked = this.song.likes.some(userId => userId === this.userId);
    });

  }

  toggleEditMode()
  {
    this.editMode = !this.editMode;
  }

  updateSong(form: NgForm)
  {
    if (form.value.invalid) return;

    const { name, genres, band, length } = form.value;

    this.apiService.updateSong(this.songId, name, genres, band, length).subscribe(() => { this.toggleEditMode(); });
  }

  likeSong()
  {
    this.apiService.likeSong(this.userId!, this.songId).subscribe(() =>
    {
      this.hasLiked = true;

      this.updateSongInfo();
    });
  }

  unlikeSong()
  {
    this.apiService.unlikeSong(this.userId!, this.songId).subscribe(() =>
    {
      this.hasLiked = false;

      this.updateSongInfo();
    });
  }

  updateSongInfo()
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
      this.updateSongInfo();

      form.reset();
    });
  }

  deleteComment(commentId: string)
  {
    this.apiService.deleteSongComment(this.songId, commentId).subscribe(() =>
    {
      this.updateSongInfo();
    });
  }
}
