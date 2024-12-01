import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent
{
  // Template-driven form
  constructor(private userService: UserService) { }

  // Create submit handler

  register(form: NgForm)
  {
    // Use user.service.ts to send the data 
    // User service will connect to the back-end API to store the data
    if (form.invalid)
    {
      console.log(`Invalid register form!`);
      return;
    }


    const { username, email, password } = form.value;

    this.userService.register(username, email, password);
  }

}
