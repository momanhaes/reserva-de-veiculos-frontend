import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { PARAMS, THEME } from 'src/animations/particles.animation';
import { IUser, IUserInfo, UserService } from 'src/app/services/user.service';
import { EMAIL_PATTERN } from 'src/utils/patterns';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  animations: [APPEARD],
})
export class RegisterPage implements OnInit {
  public state = 'ready';
  public theme = THEME;
  public params = PARAMS;
  public form: FormGroup;
  public user: IUser;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      password: new FormControl('', Validators.required),
      passwordConfirmation: new FormControl('', Validators.required),
    });
  }

  showPassowordDontMatchError() {
    Swal.fire({
      title: 'Ops!',
      text: 'Suas senhas não coincidem.',
      icon: 'error',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Tentar novamente',
    });
  }

  showError(error) {
    Swal.fire({
      title: `Ops!`,
      text: error ? error : 'Ocorreu um erro.',
      icon: 'error',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Ok',
    });
  }

  showSuccess(user) {
    Swal.fire({
      title: `Parabéns, ${user.name}!`,
      text: `Você efetuou seu cadastro com sucesso.`,
      icon: 'success',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Ok',
    });
  }

  register() {
    if (this.form.invalid) {
      return;
    }

    const password = this.form.get('password').value;
    const passwordConfirmation = this.form.get('passwordConfirmation').value;

    if (password !== passwordConfirmation) {
      return this.showPassowordDontMatchError();
    }

    this.user = this.form.value;

    this.userService
      .create(this.user)
      .pipe(
        catchError((err) => {
          this.showError(err.error.error);
          return err;
        })
      )
      .subscribe((user: IUserInfo) => {
        this.showSuccess(user);
        this.router.navigate(['/login']);
      });
  }
}
