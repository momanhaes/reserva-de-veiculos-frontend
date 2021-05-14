import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { RegisterPage } from './pages/register/register.page';
import { VehicleRegisterPage } from './pages/vehicle-register/vehicle-register.page';
import { VehicleService } from './services/vehicle.service';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ROUTES } from './app.routes';

import { registerLocaleData } from '@angular/common';
import { ParticlesModule } from 'angular-particle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import localePt from '@angular/common/locales/pt';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    HomePage,
    NotFoundPage,
    FooterComponent,
    HeaderComponent,
    VehicleCardComponent,
    RegisterPage,
    VehicleRegisterPage,
    LoadingComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ParticlesModule,
    SweetAlert2Module.forRoot(),
    NgbModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    VehicleService,
    UserService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
