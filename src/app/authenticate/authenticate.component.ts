import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoaderComponent } from "../shared/loader/loader.component";

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit
{
  // Check for logged in user on website refresh
  constructor(private userService: UserService) { }

  isAuthenticated = false;

  ngOnInit(): void
  {
    this.userService.getProfile().subscribe({
      next: () => this.isAuthenticated = true,
      error: () => this.isAuthenticated = true,
      complete: () => this.isAuthenticated = true
    });
  }
}
