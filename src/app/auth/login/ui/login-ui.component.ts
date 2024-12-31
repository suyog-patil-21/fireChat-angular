import { Component, inject, input, output, signal } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Status } from '../data-access/login.service';
import { TCredientials } from '../../../shared/data/types/crediential.type';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-login-ui',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule,ButtonModule, PasswordModule],
  templateUrl: './login-ui.component.html',
  styleUrl: './login-ui.component.css'
})
export class LoginUiComponent {
  readonly errorStatusEnum = Status.error;
  readonly authentictingStatusEnum = Status.authenticating;
  loginStatus = input.required<Status>()
  login = output<TCredientials>();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('',)
  });
}
