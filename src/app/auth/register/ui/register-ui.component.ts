import { Component, Input, input, output } from '@angular/core';
import { Status } from '../../login/data-access/login.service';
import { TCredientials } from '../../../shared/data/types/crediential.type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register-ui',
  standalone: true,
  imports: [ReactiveFormsModule,ButtonModule, InputTextModule, PasswordModule],
  templateUrl: './register-ui.component.html',
  styleUrl: './register-ui.component.css'
})
export class RegisterUiComponent {
  readonly errorStatusEnum = Status.error;
  readonly authentictingStatusEnum = Status.authenticating;
  registerStatus = input.required<Status>();
  registerDetails = output<TCredientials>();

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('',)
  });
}
