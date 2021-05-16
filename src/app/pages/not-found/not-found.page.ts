import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { PARAMS, THEME } from 'src/animations/particles.animation';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  animations: [APPEARD],
})
export class NotFoundPage implements OnInit {
  public state = 'ready';
  public path: string;
  public theme = THEME;
  public params = PARAMS;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.path = this.router.routerState.snapshot.url;
  }
}
