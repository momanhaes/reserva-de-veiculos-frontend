import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { SLIDE } from 'src/animations/slide.animation';
import { VehicleService } from 'src/app/services/vehicle.service';
import { IVehicle } from './../../components/vehicle-card/vehicle.interface';
import { FormControl, FormGroup } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [APPEARD, SLIDE],
})
export class HomePage implements OnInit {
  public vehicles: IVehicle[];
  public showSearchBar: boolean;
  public isLoading: boolean;
  public error: boolean;
  public state: string;
  public searchForm: FormGroup;

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private userService: UserService
  ) {}

  get validationHeader(): boolean {
    return !this.isLoading;
  }

  get validationEmpty(): boolean {
    return !this.vehicles?.length && !this.isLoading && !this.error;
  }

  get validationError(): boolean {
    return !this.vehicles?.length && !this.isLoading && this.error;
  }

  get validationVehicleCard(): boolean {
    return this.vehicles?.length && !this.isLoading && !this.error;
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({ searchControl: new FormControl('') });
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchTerm) =>
          this.vehicleService.vehicleByKeyword(searchTerm.searchControl)
        )
      )
      .subscribe((vehicles) => (this.vehicles = vehicles));

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
          this.vehicleService.setVehicles(vehicles);
          this.vehicles = vehicles;
          this.isLoading = false;
        });
    }, 500);
  }

  getStates() {
    this.state = 'ready';
  }

  toggleSearch() {
    this.showSearchBar = !this.showSearchBar;
  }
}
