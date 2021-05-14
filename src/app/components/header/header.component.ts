import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { UserService } from 'src/app/services/user.service';
import { IHeader } from './header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [APPEARD],
})
export class HeaderComponent implements OnInit {
  public headerRoutes: IHeader[];
  public state = 'ready';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
