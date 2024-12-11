import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageUrlDirective } from '../../directives/image-url.directive';
import { ToastService } from '../../toast/toast.service';
import { UserService } from '../../user/user.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-create-song',
  standalone: true,
  imports: [FormsModule, ImageUrlDirective, LoaderComponent],
  templateUrl: './create-song.component.html',
  styleUrl: './create-song.component.css'
})
export class CreateSongComponent
{
  constructor(private apiService: ApiService, private userService: UserService, private router: Router, private toastService: ToastService) { };

  userId: string | undefined = ``;

  get isLoggedIn()
  {
    return this.userService.isLoggedIn;
  }

  createSong(form: NgForm)
  {
    if (form.invalid)
    {
      this.toastService.show('Please fill all fields correctly!', `error`);
      return;
    }

    const { albumImage, name, genres, band, length } = form.value;

    // TODO: Get the user id from here (apiService.user._id)
    this.apiService.createSong(albumImage, name, genres, band, length).subscribe(() =>
    {
      this.router.navigate([`/songs-ranking`]);
      this.toastService.show(`Song added`, `success`);
    });
  }
}
