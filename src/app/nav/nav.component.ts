import { Component, inject } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../shared/service/auth.service';
import { BadgeModule } from 'primeng/badge';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [Menubar, AvatarModule, BadgeModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  loginService = inject(AuthService);
}
