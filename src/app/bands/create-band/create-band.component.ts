import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { ImageUrlDirective } from '../../directives/image-url.directive';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-create-band',
  standalone: true,
  imports: [FormsModule, ImageUrlDirective],
  templateUrl: './create-band.component.html',
  styleUrl: './create-band.component.css'
})
export class CreateBandComponent
{
  constructor(private apiService: ApiService, private router: Router, private toastService: ToastService) { };

  createBand(form: NgForm)
  {
    if (form.invalid)
    {
      this.toastService.show('Please fill all fields correctly!', `error`);
      return;
    }
    const { bandImage, name, origin, genres, members, description } = form.value;

    this.apiService.createBand(bandImage, name, origin, genres, members, description).subscribe(() =>
    {
      this.router.navigate([`/bands-ranking`]);
      this.toastService.show(`Band added`, `success`);
    });
  }
}
