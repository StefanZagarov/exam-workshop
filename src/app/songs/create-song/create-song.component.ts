import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageUrlDirective } from '../../directives/image-url.directive';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-create-song',
  standalone: true,
  imports: [FormsModule, ImageUrlDirective],
  templateUrl: './create-song.component.html',
  styleUrl: './create-song.component.css'
})
export class CreateSongComponent
{
  constructor(private apiService: ApiService, private router: Router, private toastServie: ToastService) { };

  createSong(form: NgForm)
  {
    if (form.invalid)
    {
      this.toastServie.show('Please fill all fields correctly!', `error`);
      return;
    }

    const { albumImage, name, genres, band, length } = form.value;

    // TODO: Get the user id from here (apiService.user._id)
    this.apiService.createSong(albumImage, name, genres, band, length).subscribe(() => this.router.navigate([`/songs-ranking`]));
  }
}
