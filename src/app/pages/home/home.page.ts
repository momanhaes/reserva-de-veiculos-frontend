import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { COLLAPSIBLE } from 'src/animations/collapsible.animation';
import { IVehicle } from "./../../components/vehicle-card/vehicle.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [APPEARD, COLLAPSIBLE],
})
export class HomePage implements OnInit {
  public state = 'ready';
  public searchBarState = "hidden";
  public vehicles: IVehicle[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  registerVehicle() {
    this.router.navigate(["/vehicle-register"]);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === "hidden" ? "visible" : "hidden";
  }

}
