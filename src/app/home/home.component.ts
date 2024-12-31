import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';

import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { MessageInputComponent } from "./ui/message-input/message-input.component";
import { MessageListComponent } from "./ui/message-list/message-list.component";
import { MessageService } from '../shared/service/message.service';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MessageInputComponent, MessageListComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  static route: string = "home";
  loginService = inject(AuthService);
  messageService = inject(MessageService);

  router = inject(Router);

  constructor() {
    effect(() => {
      if (this.loginService.user() === null) {
        this.router.navigate(['/', LoginComponent.route])
      }
    })
  }


}
