import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserDetails } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit
{
  constructor(private userService: UserService) { }

  profileDetails: UserDetails = {
    username: ``,
    email: ``
  };

  ngOnInit(): void
  {
    console.log(this.userService.user!);
    const { username, email } = this.userService.user!;

    this.profileDetails = { username, email };
  }
}
