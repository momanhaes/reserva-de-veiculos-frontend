import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APPEARD } from 'src/animations/appeard.animation';
import { VEHICLES_FUEL, VEHICLES_OPTIONS, VEHICLES_STATES } from './vehicles.options';
import Swal from 'sweetalert2';

interface IVehicleOption {
  name: string;
  value: string;
}

interface IVehicleFuel {
  name: string;
  value: number;
}

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.page.html',
  styleUrls: ['./vehicle-register.page.scss'],
  animations: [APPEARD]
})
export class VehicleRegisterPage implements OnInit {
  public state = 'ready';
  public isEdit = false;
  public vehiclesOption: IVehicleOption;

  constructor(private router: Router, private route: ActivatedRoute) { }

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
  }

  action(): void {
    this.isEdit ? this.updateVehicle() : this.addVehicle();
  }

  addVehicle(): void {
  }

  updateVehicle(): void {
  }

  cancel(): void {
    Swal.fire({
      title: `Você tem certeza que deseja cancelar?`,
      text: "Você perderá todos os dados preenchidos.",
      icon: 'warning',
      background: '#f1f1f1',
      showCancelButton: true,
      confirmButtonColor: '#fd5d93',
      iconColor: '#fd5d93',
      cancelButtonColor: '#313a46',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => { if (result.isConfirmed) this.router.navigate(["/home"]) })
  }
}
