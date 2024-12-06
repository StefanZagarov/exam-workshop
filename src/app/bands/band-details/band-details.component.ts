import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Band } from '../../interfaces/band';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-band-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './band-details.component.html',
  styleUrl: './band-details.component.css'
})
export class BandDetailsComponent
{
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private userService: UserService) { };

  band = {} as Band;

  get loadedBand()
  {
    return this.band.createdBy ? this.band : {};
  }

  ngOnInit(): void
  {
    const bandId = this.activatedRoute.snapshot.params[`bandId`];

    this.apiService.getBandDetails(bandId).subscribe(band =>
    {
      this.band = band;
    });
  }
}
