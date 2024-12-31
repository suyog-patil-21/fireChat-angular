import { Component, effect, inject } from '@angular/core';
import { RegisterService } from './data-access/register.service';
import { AuthService } from '../../shared/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { ProgressSpinner } from 'primeng/progressspinner';
import { RegisterUiComponent } from "./ui/register-ui.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ProgressSpinner, RegisterUiComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  static route: string = "register";
  register = inject(RegisterService);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigate(['/', HomeComponent.route]);
      }
    });
  }
}
