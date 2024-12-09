import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { ImageUrlDirective } from '../../directives/image-url.directive';

@Component({
  selector: 'app-create-band',
  standalone: true,
  imports: [FormsModule, ImageUrlDirective],
  templateUrl: './create-band.component.html',
  styleUrl: './create-band.component.css'
})
export class CreateBandComponent
{
  constructor(private apiService: ApiService, private router: Router) { };
  // bandImage = ``;
  createBand(form: NgForm)
  {
    // this.bandImage = form.value.bandImage;

    if (form.invalid)
    {
      console.log(`Invalid create band form!`);
      return;
    }
    const { bandImage, name, origin, genres, members, description } = form.value;

    // TODO: Take the user id from here (apiService.user._id)
    this.apiService.createBand(bandImage, name, origin, genres, members, description).subscribe(() => this.router.navigate([`/bands-ranking`]));
  }
}
