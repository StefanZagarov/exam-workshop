import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageUrlDirective } from '../../directives/image-url.directive';

@Component({
  selector: 'app-create-song',
  standalone: true,
  imports: [FormsModule, ImageUrlDirective],
  templateUrl: './create-song.component.html',
  styleUrl: './create-song.component.css'
})
export class CreateSongComponent
{
  constructor(private apiService: ApiService, private router: Router) { };

  createSong(form: NgForm)
  {
    if (form.invalid)
    {
      console.log(`Invalid create band form!`);
      return;
    }

    const { albumImage, name, genres, band, length } = form.value;
    console.log(`asd`);
    // TODO: Get the user id from here (apiService.user._id)
    this.apiService.createSong(albumImage, name, genres, band, length).subscribe(() => this.router.navigate([`/songs-ranking`]));
  }
}
