import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatchPasswordsDirective } from '../../directives/match-passwords.directive';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, MatchPasswordsDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit
{
  // Template-driven form
  constructor(private userService: UserService, private router: Router, private toastService: ToastService, private activRoute: ActivatedRoute) { }

  // Not ideal, but this is what I came up with for getting the user data before page has loaded
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
