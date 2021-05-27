import { Component, OnInit } from '@angular/core';
import { APPEARD } from 'src/animations/appeard.animation';
import { SLIDE } from 'src/animations/slide.animation';
import { VehicleService } from 'src/app/services/vehicle.service';
import { KeyType, SessionStorageService } from 'src/app/services/session-storage.service';
import { IVehicle } from './../../components/vehicle-card/vehicle.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [APPEARD, SLIDE],
})
export class HomePage implements OnInit {
  public searchForm: FormGroup;
  public vehicles: IVehicle[] = [];
  public searchTerm: string;
  public showSearchBar: boolean;
  public isLoading: boolean;
  public error: boolean;
  public state: string;
  public user: string;

  constructor(
    private sessionStorageService: SessionStorageService,
    private vehicleService: VehicleService
  ) { }

  get validationHeader(): boolean {
    return !this.isLoading && !this.error;
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

  get validationVehicleSearch(): boolean {
    return this.vehicles && !this.isLoading && !this.error;
  }

  public reload() {
    location.reload();
  }

  public getVehicles(): void {
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
          this.sessionStorageService.set(KeyType.VEHICLES, vehicles);
          this.vehicles = vehicles;
          this.isLoading = false;
        });
    }, 500);
  }

  public getStates(): void {
    this.state = 'ready';
  }

  public toggleSearch(): void {
    this.showSearchBar = !this.showSearchBar;
  }

  ngOnInit(): void {
    this.user = this.sessionStorageService.get(KeyType.USERNAME);
    this.searchForm = new FormGroup({ searchControl: new FormControl('') });
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchTerm) => {
          this.searchTerm = searchTerm.searchControl;
          return this.vehicleService.vehicleByKeyword(searchTerm.searchControl);
        })
      )
      .subscribe((vehicles) => (this.vehicles = vehicles));

    this.getVehicles();
    this.getStates();
  }
}
