import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent
{
  constructor(private userService: UserService) { }

  get isLoggedIn(): boolean
  {
    return this.userService.isLoggedIn;
  }
}
