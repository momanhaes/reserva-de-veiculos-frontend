import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { COLLAPSIBLE } from 'src/animations/collapsible.animation';
import { VehicleService } from 'src/app/services/vehicle.service';
import { IVehicle } from './../../components/vehicle-card/vehicle.interface';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [APPEARD, COLLAPSIBLE],
})
export class HomePage implements OnInit {
  public state = 'ready';
  public searchBarState = 'hidden';
  public isLoading: boolean;
  public error: boolean;
  public vehicles: IVehicle[];

  constructor(private router: Router, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles() {
    this.isLoading = true;
    setTimeout(() => {
      return this.vehicleService
        .vehicles()
        .pipe(
          catchError((err) => {
            this.error = true;
            return (this.error = err);
          })
        )
        .subscribe((vehicles: IVehicle[]) => {
          this.vehicles = vehicles;
          this.vehicleService.setVehicle(vehicles);
          this.isLoading = false;
        });
    }, 1000);
  }

  registerVehicle() {
    this.router.navigate(['/vehicle-register']);
  }

  toggleSearch() {
    this.searchBarState =
      this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
}
