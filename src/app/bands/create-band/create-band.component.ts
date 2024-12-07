import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-band',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-band.component.html',
  styleUrl: './create-band.component.css'
})
export class CreateBandComponent
{
  constructor(private apiService: ApiService, private router: Router) { };

  createBand(form: NgForm)
  {
    if (form.invalid)
    {
      console.log(`Invalid create band form!`);
      return;
    }

    const { name, origin, genres, members, description } = form.value;

    // TODO: Take the user id from here (apiService.user._id)
    this.apiService.createBand(name, origin, genres, members, description).subscribe(() => this.router.navigate([`/bands-ranking`]));
  }
}
