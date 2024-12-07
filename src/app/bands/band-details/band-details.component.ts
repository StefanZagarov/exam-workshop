import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Band } from '../../interfaces/band';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-band-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './band-details.component.html',
  styleUrl: './band-details.component.css'
})
export class BandDetailsComponent
{
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private userService: UserService) { };

  band = {} as Band;
  isOwner = false;
  bandId = ``;
  editMode = false;

  ngOnInit(): void
  {
    this.bandId = this.activatedRoute.snapshot.params[`bandId`];

    this.apiService.getBandDetails(this.bandId).subscribe(band =>
    {
      this.band = band;

      this.isOwner = this.band.createdBy._id === this.userService.user?._id;
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

    this.apiService.updateBand(this.bandId, name, origin, genres, members, description).subscribe(() => { this.toggleEditMode(); });
  }
}
