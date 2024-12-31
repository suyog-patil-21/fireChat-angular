import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './shared/guard/auth-guard/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    {
        path: HomeComponent.route,
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: LoginComponent.route,
        component: LoginComponent
    },
    {
        path: RegisterComponent.route,
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
