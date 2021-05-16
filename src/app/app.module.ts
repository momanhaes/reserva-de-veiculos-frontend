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
import { VehicleListPage } from './pages/vehicle-list/vehicle-list.page';
import { VehicleService } from './services/vehicle.service';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { WindowService } from './services/window.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoggedInGuard } from './guards/loggedin.guard';
import { PermitionGuard } from './guards/permition.guard';
import { LoginGuard } from './guards/login.guard';
import { LeaveRegisterGuard } from './guards/leave-register.guard';
import { ROUTES } from './app.routes';

import { registerLocaleData } from '@angular/common';
import { ParticlesModule } from 'angular-particle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ItemComponent } from './components/item/item.component';
import { ResizeDirective } from './directives/resize.directive';
import localePt from '@angular/common/locales/pt';

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
    SpinnerComponent,
    VehicleListPage,
    ItemComponent,
    ResizeDirective,
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ParticlesModule,
    BrowserModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    VehicleService,
    UserService,
    NotificationService,
    WindowService,
    LoggedInGuard,
    LoginGuard,
    PermitionGuard,
    LeaveRegisterGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
