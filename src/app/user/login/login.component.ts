import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent
{
  constructor(private userService: UserService, private router: Router) { }

  form = new FormGroup({
    username: new FormControl(``, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(``, [Validators.required, Validators.minLength(6)])
  });

  login()
  {
    if (this.form.invalid)
    {
      console.log(`Invalid login form!`);
      return;
    }

    const { username, password } = this.form.value;

    this.userService.login(username!, password!).subscribe(() =>
    {
      this.router.navigate([`/`]);
    });
  }
}
