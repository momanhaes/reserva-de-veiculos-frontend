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
  public searchBarState: string;
  public state: string;
  public vehicles: IVehicle[];
  public isLoading: boolean;
  public error: boolean;

  constructor(private router: Router, private vehicleService: VehicleService) {
  }

  get validationHeader(): boolean {
    return !this.isLoading;
  }

  get validationEmpty(): boolean {
    return !this.vehicles?.length && !this.isLoading && !this.error;
  }

  get validationError(): boolean {
    return !this.vehicles?.length && !this.isLoading && this.error;
  }

  get validationNewVehicleButton(): boolean {
    return !this.isLoading && !this.error;
  }

  get validationVehicleCard(): boolean {
    return this.vehicles?.length && !this.isLoading && !this.error;
  }

  get validationClassBottom(): boolean {
    return this.error || !this.vehicles?.length || this.isLoading;
  }

  ngOnInit(): void {
    this.getVehicles();
    this.getStates();
  }

  getVehicles() {
    this.isLoading = true;

    setTimeout(() => {
      return this.vehicleService
        .vehicles()
        .pipe(
          catchError((err) => {
            this.error = true;
            this.isLoading = false;
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

  getStates() {
    this.searchBarState = 'hidden';
    this.state = 'ready';
  }

  registerVehicle() {
    this.router.navigate(['/vehicle-register']);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
}
