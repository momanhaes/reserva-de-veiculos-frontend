import { Component, OnInit } from '@angular/core';
import { APPEARD } from 'src/animations/appeard.animation';
import { IVehicle } from 'src/app/components/vehicle-card/vehicle.interface';
import { WindowService } from 'src/app/services/window.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StatusType } from '../vehicle-register/vehicle.interface';
import { VehicleService } from 'src/app/services/vehicle.service';
import { NotificationService } from 'src/app/services/notification.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
  animations: [APPEARD],
})
export class VehicleListPage implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private windowService: WindowService,
    private vehicleService: VehicleService,
    private router: Router
  ) {
    this.isMobile = window.innerWidth <= windowService.widthMobile;
  }
  public state = 'ready';
  public subscribeMobile: Subscription;
  public vehicles: IVehicle[] = [];
  public isMobile: boolean;
  public isLoading: boolean;
  public error: any;

  get mobileValidantionVehicles(): boolean {
    return this.vehicles?.length && this.isMobile && !this.isLoading;
  }

  get desktopValidantionVehicles(): boolean {
    return this.vehicles?.length && !this.isMobile && !this.isLoading;
  }

  get validationEmpty(): boolean {
    return !this.vehicles.length && !this.isLoading;
  }

  get validationError(): boolean {
    return !this.vehicles?.length && !this.isLoading && this.error;
  }

  get tableHeaders(): string[] {
    return [
      'ID',
      'Nome',
      'Descrição',
      'Status',
      'Categoria',
      'Diária',
      'Fabricação',
      'Conservação',
      'Combustível',
      'Ações',
    ];
  }

  public getStatus(status: string): string {
    return status
      .toLowerCase()
      .replace(/(?:^|\s)(?!da|de|do)\S/g, (l) => l.toUpperCase());
  }

  public edit(vehicle: IVehicle): void {
    if (vehicle.status === StatusType.RESERVADO) {
      Swal.fire({
        title: `Ops!`,
        text: 'Você não pode editar esse veículo, pois ele já está reservado.',
        icon: 'error',
        background: '#f1f1f1',
        iconColor: '#fd5d93',
        showCancelButton: false,
        confirmButtonColor: '#fd5d93',
        confirmButtonText: 'Ok',
      });
    } else {
      this.router.navigate(['vehicle-register', vehicle.externalCode]);
    }
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
          this.vehicleService.setVehicles(vehicles);
          this.vehicles = vehicles;
          this.isLoading = false;
        });
    }, 500);
  }

  ngOnInit(): void {
    this.getVehicles();

    this.notificationService.notifier.subscribe((message) => {
      if (message === StatusType.ATUALIZADO) {
        this.getVehicles();
      }
    });

    this.subscribeMobile = this.windowService.hasMobile.subscribe(
      (hasMobile: boolean) => (this.isMobile = hasMobile)
    );
  }
}
