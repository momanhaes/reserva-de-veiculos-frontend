import { Component, Input, OnInit } from '@angular/core';
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
  public placeholder: string;
  public state = 'ready';
  public reservedVehicle: IVehicle;

  @Input() vehicle: IVehicle;

  constructor(
    private userService: UserService,
    private vehicleService: VehicleService,
    private router: Router
  ) {}

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

  ngOnInit(): void {
    this.placeholder = 'assets/img/placeholder.png';
  }

  showError(error) {
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

  showReserveSuccess(vehicle: IVehicle) {
    setTimeout(() => {
      location.reload();
    }, 1000);

    Swal.fire({
      title: 'Parabéns!',
      text: `Você reservou o veículo ${vehicle.name}.`,
      icon: 'success',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      showConfirmButton: false,
    });
  }

  showCancelSuccess(vehicle: IVehicle) {
    setTimeout(() => {
      location.reload();
    }, 1000);

    Swal.fire({
      title: 'Sucesso!',
      text: `Você cancelou a reserva do ${vehicle.name}.`,
      icon: 'success',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      showConfirmButton: false,
    });
  }

  youAlreadyReservedVehicle() {
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

  showVehicleAlreadyReserved() {
    Swal.fire({
      title: 'Que pena!',
      text: 'Esse veículo já foi reservado.',
      icon: 'error',
      background: '#f1f1f1',
      iconColor: '#fd5d93',
      showCancelButton: false,
      confirmButtonColor: '#fd5d93',
      confirmButtonText: 'Ver outro veículo',
    });
  }

  showAlreadyReservedByYou(vehicle: IVehicle) {
    Swal.fire({
      title: 'Ops! Você já reservou esse veículo.',
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
        this.vehicleService
          .updateVehicle({
            name: vehicle.name,
            externalCode: vehicle.externalCode,
            description: vehicle.description,
            status: StatusType.DISPONIVEL,
            category: vehicle.category,
            dailyValue: vehicle.dailyValue,
            imageUrl: vehicle.imageUrl,
            year: vehicle.year,
            conservation: vehicle.conservation,
            fuel: vehicle.fuel,
            rentedBy: '',
          })
          .pipe(
            catchError((err) => {
              this.showError(err.error.error);
              return err;
            })
          )
          .subscribe((vehicle: IVehicle) => {
            this.showCancelSuccess(vehicle);
            this.router.navigate(['/home']);
          });
      }
    });
  }

  rent(vehicle: IVehicle): void {
    if (vehicle.rentedBy === this.userService.getUserID())
      return this.showAlreadyReservedByYou(vehicle);
    if (vehicle.rentedBy) return this.showVehicleAlreadyReserved();
    if (this.alreadyReservedVehicle) return this.youAlreadyReservedVehicle();

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
        this.vehicleService
          .updateVehicle({
            name: vehicle.name,
            externalCode: vehicle.externalCode,
            description: vehicle.description,
            status: StatusType.RESERVADO,
            category: vehicle.category,
            dailyValue: vehicle.dailyValue,
            imageUrl: vehicle.imageUrl,
            year: vehicle.year,
            conservation: vehicle.conservation,
            fuel: vehicle.fuel,
            rentedBy: this.userService.getUserID(),
          })
          .pipe(
            catchError((err) => {
              this.showError(err.error.error);
              return err;
            })
          )
          .subscribe((vehicle: IVehicle) => {
            this.showReserveSuccess(vehicle);
            this.router.navigate(['/home']);
          });
      }
    });
  }
}
