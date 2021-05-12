import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { PARAMS, THEME } from 'src/animations/particles.animation';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  animations: [APPEARD],
})
export class RegisterPage implements OnInit {
  public state = "ready";
  public theme = THEME;
  public params = PARAMS;
  public isMobile: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(["/login"]);
  }

}
