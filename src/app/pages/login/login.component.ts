import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { THEME, PARAMS } from 'src/animations/particles.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [APPEARD],
})
export class LoginComponent implements OnInit {
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
