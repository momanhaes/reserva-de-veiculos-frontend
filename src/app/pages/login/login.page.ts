import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { THEME, PARAMS } from 'src/animations/particles.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [APPEARD],
})
export class LoginPage implements OnInit {
  public state = "ready";
  public theme = THEME;
  public params = PARAMS;
  public isMobile: boolean;

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(["/home"]);
  }

}
