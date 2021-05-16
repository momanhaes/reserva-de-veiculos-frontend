import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { APPEARD } from 'src/animations/appeard.animation';
import { IVehicle } from './vehicle.interface';
import { UserService } from 'src/app/services/user.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { StatusType } from 'src/app/pages/vehicle-register/vehicle-register.page';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
  animations: [APPEARD],
})
export class VehicleCardComponent implements OnInit {
  public state = 'ready';
  public placeholder: string;
  public reservedVehicle: IVehicle;
  public isLoading: boolean;
  public label: string;

  @Output() updatedVehicle = new EventEmitter<any>();
  @Input() vehicle: IVehicle;

  constructor(
    private userService: UserService,
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  get statusColor(): string {
    return this.vehicle.status === StatusType.DISPONIVEL
      ? 'text-success'
      : 'text-danger';
  }

  get reservedByYou(): boolean {
    return (
      this.vehicle.status.toUpperCase() === StatusType.RESERVADO &&
      this.vehicle.rentedBy === this.userService.getUserID()
    );
  }

  get reserved(): boolean {
    return (
      this.vehicle.status.toUpperCase() === StatusType.RESERVADO &&
      this.vehicle.rentedBy !== this.userService.getUserID()
    );
  }

  get enabled(): boolean {
    return this.vehicle.status.toUpperCase() === StatusType.DISPONIVEL;
  }

  get alreadyReservedVehicle(): boolean {
    const reserved = this.vehicleService
      .getVehicles()
      .filter((item) => item.rentedBy === this.userService.getUserID());
    return reserved.length ? true : false;
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

  public showReserveSuccess(vehicle: IVehicle): void {
    Swal.fire({
      title: 'Parabéns!',
      text: `Você reservou o veículo ${vehicle.name}.`,
      icon: 'success',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Ok',
    });
  }

  public showCancelSuccess(vehicle: IVehicle): void {
    Swal.fire({
      title: 'Sucesso!',
      text: `Você cancelou a reserva do ${vehicle.name}.`,
      icon: 'success',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Ok',
    });
  }

  public youAlreadyReservedVehicle(): void {
    Swal.fire({
      title: 'Ops!',
      text: 'Você já reservou um veículo.',
      icon: 'error',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Ok',
    });
  }

  public showVehicleAlreadyReserved(): void {
    Swal.fire({
      title: 'Que pena!',
      text: 'Esse veículo já foi reservado por outra pessoa.',
      icon: 'error',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Ver outro veículo',
    });
  }

  public showAlreadyReservedByYou(vehicle: IVehicle): void {
    Swal.fire({
      title: 'Você reservou esse veículo anteriormente.',
      text: 'Deseja cancelar a reserva?',
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
        this.isLoading = true;
        this.label = 'CANCELANDO SUA RESERVA';
        this.vehicleService
          .updateVehicle(vehicle.externalCode, {
            status: StatusType.DISPONIVEL,
            rentedBy: '',
          })
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
              this.updatedVehicle.emit();
              this.showCancelSuccess(vehicle);
            }, 500);
          });
      }
    });
  }

  public rent(vehicle: IVehicle): void {
    if (vehicle.rentedBy === this.userService.getUserID()) {
      return this.showAlreadyReservedByYou(vehicle);
    }
    if (vehicle.rentedBy) {
      return this.showVehicleAlreadyReserved();
    }
    if (this.alreadyReservedVehicle) {
      return this.youAlreadyReservedVehicle();
    }

    Swal.fire({
      title: `Você tem certeza que deseja reservar o veículo ${vehicle.name}?`,
      text: 'Você não poderá resevar outro veículo, desde que cancele a reserva deste.',
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
        this.isLoading = true;
        this.label = 'EFETUANDO SUA RESERVA';
        this.vehicleService
          .updateVehicle(vehicle.externalCode, {
            status: StatusType.RESERVADO,
            rentedBy: this.userService.getUserID(),
          })
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
              this.updatedVehicle.emit();
              this.showReserveSuccess(vehicle);
            }, 500);
          });
      }
    });
  }

  ngOnInit(): void {
    this.placeholder = 'assets/img/placeholder.png';
  }
}
