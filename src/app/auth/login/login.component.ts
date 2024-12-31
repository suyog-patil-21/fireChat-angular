import { CommonModule, } from '@angular/common';
import { Component, effect,  inject } from '@angular/core';

import { ReactiveFormsModule,} from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { LoginUiComponent } from "./ui/login-ui.component";
import { LoginService } from './data-access/login.service';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ProgressSpinner, ReactiveFormsModule, CommonModule, LoginUiComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  static route: string = 'login';
  loginService = inject(LoginService);
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
