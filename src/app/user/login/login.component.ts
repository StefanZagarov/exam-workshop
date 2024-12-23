import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit
{
  constructor(private userService: UserService, private router: Router, private toastService: ToastService) { }

  // Not ideal, but this is what I came up with for getting the user data before page has loaded, a roundabout way for route guarding
  ngOnInit(): void
  {
    const user = this.userService.getProfile().subscribe(user =>
    {
      if (user)
      {
        this.router.navigate([`/404`]);
      }
    });
  }

  form = new FormGroup({
    username: new FormControl(``, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(``, [Validators.required, Validators.minLength(6)])
  });

  login()
  {
    if (this.form.invalid)
    {
      this.toastService.show(`Please fill all fields correctly!`, `error`);
      return;
    }

    const { username, password } = this.form.value;

    this.userService.login(username!, password!).subscribe(() =>
    {
      this.router.navigate([`/`]);
    });
  }

  isFieldTextMissing(controlName: string)
  {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  isNotMinLength(field: string)
  {
    return (
      this.form.get(field)?.touched &&
      this.form.get(field)?.errors?.['minlength']
    );
  }
}
