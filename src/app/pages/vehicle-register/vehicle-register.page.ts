import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IVehicle } from 'src/app/components/vehicle-card/vehicle.interface';
import { VehicleService } from 'src/app/services/vehicle.service';
import { NotificationService } from 'src/app/services/notification.service';
import { catchError } from 'rxjs/operators';
import {
  IVehicleFuel,
  IVehicleOption,
  StatusType,
} from 'src/app/pages/vehicle-register/vehicle.interface';
import {
  VEHICLES_FUEL,
  VEHICLES_OPTIONS,
  VEHICLES_STATES,
} from './vehicles.options';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.page.html',
  styleUrls: ['./vehicle-register.page.scss'],
  animations: [APPEARD],
})
export class VehicleRegisterPage implements OnInit {
  public state = 'ready';
  public form: FormGroup;
  public vehiclesOption: IVehicleOption;
  public isLoading: boolean;
  public isCancelConfirmed = false;
  public isEdit = false;
  public vehicle: IVehicle;
  public error: any;
  public vehicleID: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private vehicleService: VehicleService,
    private notificationsService: NotificationService
  ) {}

  get vehicleOptions(): IVehicleOption[] {
    return VEHICLES_OPTIONS;
  }

  get vehicleStates(): IVehicleOption[] {
    return VEHICLES_STATES;
  }

  get vehicleFuel(): IVehicleFuel[] {
    return VEHICLES_FUEL;
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }

  public isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  public showError(error): void {
    Swal.fire({
      title: `Ops!`,
      text: error ? error : 'Ocorreu um erro.',
      icon: 'error',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Ok',
    });
  }

  public showSuccess(vehicle: IVehicle): void {
    Swal.fire({
      title: 'Sucesso!',
      text: this.isEdit
        ? `Você editou o veículo ${vehicle.name}.`
        : `Você cadastrou o veículo ${vehicle.name}.`,
      icon: 'success',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Ok',
    });
  }

  public exitVehicleRegister(): void {
    if (!this.userService.isLoggedIn()) {
      return;
    }

    Swal.fire({
      title: `Você tem certeza que deseja sair?`,
      text: 'Você perderá todos os dados, caso os tenha preenchido.',
      icon: 'warning',
      background: '#f1f1f1',
      showCancelButton: true,
      confirmButtonColor: '#fd5d93',
      iconColor: '#fd5d93',
      cancelButtonColor: '#313a46',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isCancelConfirmed = true;
        this.router.navigate(['/vehicle-list']);
      }
    });
  }

  public action(): void {
    if (this.form.invalid) {
      return;
    }

    this.vehicle = {
      name: this.form.value.name,
      externalCode: new Date().getTime().toString(),
      description: this.form.value.description,
      status: StatusType.DISPONIVEL,
      category: this.form.value.category,
      dailyValue: this.form.value.dailyValue,
      imageUrl: this.form.value.imageUrl,
      year: this.form.value.year.toString(),
      conservation: this.form.value.conservation,
      fuel: this.form.value.fuel,
      rentedBy: '',
    };

    this.isLoading = true;
    this.isEdit ? this.updateVehicle() : this.addVehicle();
  }

  public updateVehicle() {
    this.vehicleService
      .updateVehicle(this.vehicleID, this.vehicle)
      .pipe(
        catchError((err) => {
          this.isLoading = false;
          this.showError(err.error.error);
          return err;
        })
      )
      .subscribe((vehicle: IVehicle) => {
        setTimeout(() => {
          this.isLoading = false;
          this.showSuccess(vehicle);
          this.router.navigate(['/vehicle-list']);
        }, 500);
      });
  }

  public addVehicle() {
    this.vehicleService
      .createVehicle(this.vehicle)
      .pipe(
        catchError((err) => {
          this.isLoading = false;
          this.showError(err.error.error);
          return err;
        })
      )
      .subscribe((vehicle: IVehicle) => {
        this.isLoading = false;
        this.showSuccess(vehicle);
        this.router.navigate(['/vehicle-list']);
      });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      fuel: new FormControl('', Validators.required),
      imageUrl: new FormControl(''),
      dailyValue: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      conservation: new FormControl('', Validators.required),
    });

    this.vehicleID = this.route.snapshot.params['id'];

    if (this.vehicleID) {
      this.isEdit = true;
      this.vehicleService
        .vehicleById(this.vehicleID)
        .pipe(
          catchError((err) => {
            this.isLoading = false;
            this.showError(err.error.error);
            return err;
          })
        )
        .subscribe((vehicle: IVehicle) => {
          this.vehicle = vehicle;
          this.form.patchValue({
            name: this.vehicle.name,
            description: this.vehicle.description,
            fuel: this.vehicle.fuel,
            imageUrl: this.vehicle.imageUrl,
            dailyValue: this.vehicle.dailyValue,
            category: this.vehicle.category,
            year: this.vehicle.year,
            conservation: this.vehicle.conservation,
          });

          this.isLoading = false;
        });
    }
  }
}
