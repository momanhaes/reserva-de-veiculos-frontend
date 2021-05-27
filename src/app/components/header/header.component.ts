import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { UserService } from 'src/app/services/user.service';
import { IHeader } from './header.interface';
import { ALERT_THEME } from 'src/utils/theme';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [APPEARD],
})
export class HeaderComponent implements OnInit {
  public headerRoutes: IHeader[];
  public state = 'ready';
  public user: string;
  public logo: string;
  public alertTheme = ALERT_THEME;

  constructor(private userService: UserService, private router: Router) { }

  public logout(): void {
    Swal.fire({
      title: 'Você escolheu sair.',
      text: 'Tem certeza?',
      icon: 'warning',
      background: this.alertTheme.background,
      iconColor: this.alertTheme.iconColor,
      showCancelButton: true,
      confirmButtonColor: this.alertTheme.confirmButtonColor,
      cancelButtonColor: this.alertTheme.cancelButtonColor,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getUsername();
    this.logo = 'assets/img/logo.png';
  }
}
