import { Component, Input, OnInit } from '@angular/core';
import { APPEARD } from 'src/animations/appeard.animation';
import { IVehicle } from './vehicle.interface';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
  animations: [APPEARD],
})
export class VehicleCardComponent implements OnInit {
  public placeholder: string;
  public state = "ready";

  @Input() vehicle: IVehicle;

  constructor() { }

  ngOnInit(): void {
    this.placeholder = "assets/img/placeholder.png";
  }

}
