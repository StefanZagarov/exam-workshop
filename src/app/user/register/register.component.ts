import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent
{
  // Template-driven form
  constructor(private userService: UserService, private router: Router) { }

  // Create submit handler

  register(form: NgForm)
  {
    console.log(form.value);
    const { username, email, password, rePassword } = form.value;

    console.log(username, email, password, rePassword);
    // Use user.service.ts to send the data 
    // User service will connect to the back-end API to store the data
    if (form.invalid)
    {
      console.log(`Invalid register form!`);
      return;
    }


    this.userService.register(username, email, password, rePassword).subscribe(() =>
      this.router.navigate([`/`])
    );
  }
}
