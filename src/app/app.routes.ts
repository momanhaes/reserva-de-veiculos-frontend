import { Routes } from '@angular/router';
import { LoggedInGuard } from './guards/loggedin.guard';
import { LoginGuard } from './guards/login.guard';

import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { RegisterPage } from './pages/register/register.page';
import { VehicleRegisterPage } from './pages/vehicle-register/vehicle-register.page';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterPage, canActivate: [LoginGuard] },
  { path: 'home', component: HomePage, canActivate: [LoggedInGuard] },
  {
    path: 'vehicle-register',
    component: VehicleRegisterPage,
    canActivate: [LoggedInGuard],
  },
  { path: '**', component: NotFoundPage },
];
