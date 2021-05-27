import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { APPEARD } from 'src/animations/appeard.animation';
import { IContent, IVehicle } from './vehicle.interface';
import { VehicleService } from 'src/app/services/vehicle.service';
import { KeyType, SessionStorageService } from 'src/app/services/session-storage.service';
import { StatusType } from 'src/app/pages/vehicle-register/vehicle.interface';
import { catchError } from 'rxjs/operators';
import { ALERT_THEME } from 'src/utils/theme';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
  animations: [APPEARD],
})
export class VehicleCardComponent implements OnInit {
  public state = 'ready';
  public reservedVehicle: IVehicle;
  public user: { userID: string };
  public isLoading: boolean;
  public placeholder: string;
  public label: string;
  public content: IContent;
  public alertTheme = ALERT_THEME;

  @Output() updatedVehicle = new EventEmitter<any>();
  @Input() vehicle: IVehicle;

  constructor(
    private sessionStorageService: SessionStorageService,
    private vehicleService: VehicleService
  ) { }

  get statusColor(): string {
    return this.vehicle.status === StatusType.DISPONIVEL
      ? 'text-success'
      : 'text-danger';
  }

  get reservedByYou(): boolean {
    return (
      this.vehicle.status.toUpperCase() === StatusType.RESERVADO &&
      this.vehicle.rentedBy === this.user.userID
    );
  }

  get reserved(): boolean {
    return (
      this.vehicle.status.toUpperCase() === StatusType.RESERVADO &&
      this.vehicle.rentedBy !== this.user.userID
    );
  }

  get enabled(): boolean {
    return this.vehicle.status.toUpperCase() === StatusType.DISPONIVEL;
  }

  get alreadyReservedVehicle(): boolean {
    const reserved = this.sessionStorageService
      .get(KeyType.VEHICLES)
      .filter((item) => item.rentedBy === this.user.userID);
    return reserved.length ? true : false;
  }

  public showAlert(content: IContent): void {
    Swal.fire({
      title: content.title,
      text: content.text,
      icon: content.icon,
      background: this.alertTheme.background,
      iconColor: this.alertTheme.iconColor,
      showCancelButton: false,
      confirmButtonColor: this.alertTheme.confirmButtonColor,
      confirmButtonText: content.confirmButtonText,
    });
  }

  public buildAlert(origin: string, error?: string, vehicle?: IVehicle): any {
    switch (origin) {
      case 'showReserveSuccess':
        this.content = {
          title: 'Parabéns!',
          text: `Você reservou o veículo ${vehicle.name}.`,
          icon: 'success',
          confirmButtonText: 'Ok',
        };
        break;

      case 'showCancelSuccess':
        this.content = {
          title: 'Sucesso!',
          text: `Você cancelou a reserva do ${vehicle.name}.`,
          icon: 'success',
          confirmButtonText: 'Ok',
        };
        break;

      case 'youAlreadyReservedVehicle':
        this.content = {
          title: 'Ops!',
          text: 'Você já reservou um veículo.',
          icon: 'error',
          confirmButtonText: 'Ok',
        };
        break;

      case 'showVehicleAlreadyReserved':
        this.content = {
          title: 'Que pena!',
          text: 'Esse veículo já foi reservado por outra pessoa.',
          icon: 'error',
          confirmButtonText: 'Ver outro veículo',
        };
        break;

      case 'default':
        this.content = {
          title: 'Ops!',
          text: error ? error : 'Ocorreu um erro.',
          icon: 'error',
          confirmButtonText: 'Ok',
        };
    }

    return this.showAlert(this.content);
  }

  public showAlreadyReservedByYou(vehicle: IVehicle): void {
    Swal.fire({
      title: 'Você reservou esse veículo anteriormente.',
      text: 'Deseja cancelar a reserva?',
      icon: 'warning',
      background: this.alertTheme.background,
      showCancelButton: true,
      confirmButtonColor: this.alertTheme.confirmButtonColor,
      iconColor: this.alertTheme.iconColor,
      cancelButtonColor: this.alertTheme.cancelButtonColor,
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
              this.buildAlert('default', err.error.error);
              return err;
            })
          )
          .subscribe((vehicle: IVehicle) => {
            setTimeout(() => {
              this.isLoading = false;
              this.updatedVehicle.emit();
              this.buildAlert('showCancelSuccess', '', vehicle);
            }, 500);
          });
      }
    });
  }

  public rent(vehicle: IVehicle): void {
    if (vehicle.rentedBy === this.user.userID) {
      return this.showAlreadyReservedByYou(vehicle);
    }
    if (vehicle.rentedBy) {
      return this.buildAlert('showVehicleAlreadyReserved');
    }
    if (this.alreadyReservedVehicle) {
      return this.buildAlert('youAlreadyReservedVehicle');
    }

    Swal.fire({
      title: `Você tem certeza que deseja reservar o veículo ${vehicle.name}?`,
      text: 'Você não poderá resevar outro veículo, desde que cancele a reserva deste.',
      icon: 'warning',
      background: this.alertTheme.background,
      showCancelButton: true,
      confirmButtonColor: this.alertTheme.confirmButtonColor,
      iconColor: this.alertTheme.iconColor,
      cancelButtonColor: this.alertTheme.cancelButtonColor,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.label = 'EFETUANDO SUA RESERVA';
        this.vehicleService
          .updateVehicle(vehicle.externalCode, {
            status: StatusType.RESERVADO,
            rentedBy: this.user.userID,
          })
          .pipe(
            catchError((err) => {
              this.isLoading = false;
              this.buildAlert('default', err.error.error);
              return err;
            })
          )
          .subscribe((vehicle: IVehicle) => {
            setTimeout(() => {
              this.isLoading = false;
              this.updatedVehicle.emit();
              this.buildAlert('showReserveSuccess', '', vehicle);
            }, 500);
          });
      }
    });
  }

  ngOnInit(): void {
    this.user = this.sessionStorageService.get(KeyType.USER_ID);
    this.placeholder = 'assets/img/placeholder.png';
  }
}
