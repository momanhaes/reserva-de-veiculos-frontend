import { Component, Input, OnInit } from '@angular/core';
import { APPEARD } from 'src/animations/appeard.animation';
import { IVehicle } from './vehicle.interface';
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

  @Input() vehicle: IVehicle;

  constructor() {}

  ngOnInit(): void {
    this.placeholder = 'assets/img/placeholder.png';
  }

  rent(vehicle: string): void {
    Swal.fire({
      title: `Você tem certeza que deseja reservar o veículo ${vehicle}?`,
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
        Swal.fire({
          title: 'Parabéns!',
          text: `Você resevou o veículo ${vehicle}.`,
          icon: 'success',
          background: '#f1f1f1',
          iconColor: '#fd5d93',
          showCancelButton: false,
          confirmButtonColor: '#fd5d93',
          confirmButtonText: 'Sim',
        });
      }
    });
  }
}
