import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { APPEARD } from 'src/animations/appeard.animation';
import { THEME, PARAMS } from 'src/animations/particles.animation';
import { EMAIL_PATTERN } from 'src/utils/patterns';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [APPEARD],
})
export class LoginPage implements OnInit {
  public state = 'ready';
  public theme = THEME;
  public params = PARAMS;
  public form: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.form.invalid) { return; }
    const user = this.form.value;

    this.userService.login(user.email, user.password).subscribe(
      (user) => this.notificationService.notify(`Bem-vindo, ${user.name}!`),
      (response) => this.notificationService.notify(response.error.error),
      () => { this.router.navigate(['/home']); }
    );
  }
}
