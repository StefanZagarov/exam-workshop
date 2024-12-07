import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Band } from '../../interfaces/band';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LikesPipe } from '../../shared/pipes/likes.pipe';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-band-details',
  standalone: true,
  imports: [FormsModule, LikesPipe],
  templateUrl: './band-details.component.html',
  styleUrl: './band-details.component.css'
})
export class BandDetailsComponent
{
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private userService: UserService) { }

  band = {} as Band;
  isOwner = false;
  bandId = ``;
  editMode = false;
  hasLiked = false;

  userId: string | undefined = ``;

  ngOnInit(): void
  {
    this.bandId = this.activatedRoute.snapshot.params[`bandId`];

    this.apiService.getBandDetails(this.bandId).subscribe(band =>
    {
      this.band = band;

      this.userId = this.userService.user?._id;

      this.isOwner = this.band.createdBy._id === this.userId;

      this.hasLiked = this.band.likes.some(userId => userId === this.userId);
    });

  }

  toggleEditMode()
  {
    this.editMode = !this.editMode;
  }

  updateBand(form: NgForm)
  {
    if (form.value.invalid) return;

    const { name, origin, genres, members, description } = form.value;

    this.apiService.updateBand(this.bandId, name, origin, genres, members, description).subscribe(() =>
    {
      this.toggleEditMode();
    });
  }

  likeBand()
  {
    this.apiService.likeBand(this.userId!, this.bandId).subscribe(() =>
    {
      this.hasLiked = true;

      this.updateBandInfo();
    });
  }

  unlikeBand()
  {
    this.apiService.unlikeBand(this.userId!, this.bandId).subscribe(() =>
    {
      this.hasLiked = false;

      this.updateBandInfo();
    });
  }

  updateBandInfo()
  {
    this.apiService.getBandDetails(this.bandId).subscribe(band =>
    {
      this.band = band;
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

    this.apiService.postBandComment(this.bandId, comment).subscribe(() =>
    {
      this.updateBandInfo();

      form.reset();
    });
  }

  deleteComment(commentId: string)
  {
    this.apiService.deleteBandComment(this.bandId, commentId).subscribe(() =>
    {
      this.updateBandInfo();
    });
  }
}
