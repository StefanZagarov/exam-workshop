import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { MatchPasswordsDirective } from '../../directives/match-passwords.directive';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, MatchPasswordsDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent
{
  // Template-driven form
  constructor(private userService: UserService, private router: Router, private toastService: ToastService) { }

  register(form: NgForm)
  {
    if (form.invalid)
    {
      this.toastService.show(`Please fill all fields correctly!`, `error`);
      return;
    }

    const { username, email, password, rePassword } = form.value;

    this.userService.register(username, email, password, rePassword).subscribe(() =>
      this.router.navigate([`/`])
    );
  }

  addInvalidField(input: HTMLElement)
  {
    input.classList.add('is-invalid');
  }
}
