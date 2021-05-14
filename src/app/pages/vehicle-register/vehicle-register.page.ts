import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import {
  VEHICLES_FUEL,
  VEHICLES_OPTIONS,
  VEHICLES_STATES,
} from './vehicles.options';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IVehicle } from 'src/app/components/vehicle-card/vehicle.interface';
import { VehicleService } from 'src/app/services/vehicle.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

interface IVehicleOption {
  name: string;
  value: string;
}

interface IVehicleFuel {
  name: string;
  value: string;
}

export enum StatusType {
  RESERVADO = 'RESERVADO',
  DISPONIVEL = 'DISPONÍVEL',
}

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private vehicleService: VehicleService
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
  }

  showError(error) {
    Swal.fire({
      title: `Ops!`,
      text: error,
      icon: 'error',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Ok',
    });
  }

  showSuccess(vehicle: IVehicle) {
    Swal.fire({
      title: 'Sucesso!',
      text: `Você cadastrou o veículo ${vehicle.name}.`,
      icon: 'success',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Ok',
    });
  }

  addVehicle(): void {
    const vehicle: IVehicle = {
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

    this.vehicleService
      .createVehicle(vehicle)
      .pipe(
        catchError((err) => {
          this.showError(err.error.error);
          return err;
        })
      )
      .subscribe((vehicle: IVehicle) => {
        this.showSuccess(vehicle);
        this.router.navigate(['/home']);
      });
  }

  cancel(): void {
    Swal.fire({
      title: `Você tem certeza que deseja cancelar?`,
      text: 'Você perderá todos os dados preenchidos.',
      icon: 'warning',
      background: '#f1f1f1',
      showCancelButton: true,
      confirmButtonColor: '#fd5d93',
      iconColor: '#fd5d93',
      cancelButtonColor: '#313a46',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) this.router.navigate(['/home']);
    });
  }
}
