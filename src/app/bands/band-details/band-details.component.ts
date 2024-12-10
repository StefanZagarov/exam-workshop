import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Band } from '../../interfaces/band';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LikesPipe } from '../../shared/pipes/likes.pipe';
import { LoaderComponent } from "../../shared/loader/loader.component";
import { ImageUrlDirective } from '../../directives/image-url.directive';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-band-details',
  standalone: true,
  imports: [FormsModule, LikesPipe, LoaderComponent, ImageUrlDirective],
  templateUrl: './band-details.component.html',
  styleUrl: './band-details.component.css'
})
export class BandDetailsComponent implements OnInit
{
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private userService: UserService, private router: Router, private toastService: ToastService) { }

  band = {} as Band;
  isOwner = false;
  bandId = ``;
  editMode = false;
  hasLiked = false;

  userId: string | undefined = ``;

  hasLoaded = false;

  ngOnInit(): void
  {
    this.bandId = this.activatedRoute.snapshot.params[`bandId`];

    this.apiService.getBandDetails(this.bandId).subscribe(band =>
    {
      this.band = band;

      this.userId = this.userService.user?._id;

      this.isOwner = this.band.createdBy._id === this.userId;

      this.hasLiked = this.band.likes.some(userId => userId === this.userId);

      this.hasLoaded = true;
    });
  }

  toggleEditMode()
  {
    this.updateBandPageInfo();
    this.editMode = !this.editMode;
  }

  updateBand(form: NgForm)
  {
    if (form.invalid)
    {
      this.toastService.show(`Please fill all fields correctly!`, `error`);
      return;
    };

    const { name, origin, genres, members, description } = form.value;

    this.apiService.updateBand(this.bandId, name, origin, genres, members, description).subscribe(() =>
    {
      this.updateBandPageInfo();
      this.toggleEditMode();
    });
  }

  likeBand()
  {
    this.apiService.likeBand(this.userId!, this.bandId).subscribe(() =>
    {
      this.hasLiked = true;

      this.updateBandPageInfo();
    });
  }

  unlikeBand()
  {
    this.apiService.unlikeBand(this.userId!, this.bandId).subscribe(() =>
    {
      this.hasLiked = false;

      this.updateBandPageInfo();
    });
  }

  updateBandPageInfo()
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
      this.updateBandPageInfo();

      form.reset();
    });
  }

  deleteComment(commentId: string)
  {
    this.apiService.deleteBandComment(this.bandId, commentId).subscribe(() =>
    {
      this.updateBandPageInfo();
    });
  }

  deleteBand()
  {
    this.apiService.deleteBand(this.bandId).subscribe(() =>
    {
      this.router.navigate([`/bands-ranking`]);
    });
  }
}
