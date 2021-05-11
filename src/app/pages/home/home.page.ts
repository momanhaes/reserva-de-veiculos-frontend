import { Component, OnInit } from '@angular/core';
import { APPEARD } from 'src/animations/appeard.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [APPEARD]
})
export class HomePage implements OnInit {
  public state = 'ready';

  constructor() { }

  ngOnInit(): void {
  }

}
