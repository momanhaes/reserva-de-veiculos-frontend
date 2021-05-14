import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';

@Injectable()
export class PermitionGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  // TODO: Implementar regra com JWT para gerenciar permissões de usuário.
  canActivate(): boolean {
    return true;
  }
}
