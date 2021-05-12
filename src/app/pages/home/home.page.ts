import { Component, OnInit } from '@angular/core';
import { APPEARD } from 'src/animations/appeard.animation';
import { COLLAPSIBLE } from 'src/animations/collapsible.animation';
import { IVehicle } from "./../../components/vehicle-card/vehicle.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [APPEARD, COLLAPSIBLE],
})
export class HomePage implements OnInit {
  public state = 'ready';
  public searchBarState = "hidden";
  public vehicles: IVehicle[];

  constructor() { }

  ngOnInit(): void {
    this.vehicles = [
      {
        name: 'Volkswagen Gol',
        ID: '123',
        description: 'Preto Brilhoso',
        status: 'Disponível',
        categoria: 'Carro',
        dailyValue: 2500,
        image: 'assets/img/gol.jpg',
        year: '2010',
        conservation: 'Bom',
        fuel: 'Cheio',
        rented: false,
        rentedBy: 'Matheus',
      },
      {
        name: 'Volkswagen Gol',
        ID: '123',
        description: 'Preto Brilhoso',
        status: 'Disponível',
        categoria: 'Carro',
        dailyValue: 2500,
        image: 'assets/img/gol.jpg',
        year: '2010',
        conservation: 'Bom',
        fuel: 'Cheio',
        rented: false,
        rentedBy: 'Matheus',
      },
      {
        name: 'Volkswagen Gol',
        ID: '123',
        description: 'Preto Brilhoso',
        status: 'Disponível',
        categoria: 'Carro',
        dailyValue: 2500,
        image: 'assets/img/gol.jpg',
        year: '2010',
        conservation: 'Bom',
        fuel: 'Cheio',
        rented: false,
        rentedBy: 'Matheus',
      },
      {
        name: 'Volkswagen Gol',
        ID: '123',
        description: 'Preto Brilhoso',
        status: 'Disponível',
        categoria: 'Carro',
        dailyValue: 2500,
        image: 'assets/img/gol.jpg',
        year: '2010',
        conservation: 'Bom',
        fuel: 'Cheio',
        rented: false,
        rentedBy: 'Matheus',
      },
      {
        name: 'Renault Logan',
        ID: '123',
        description: 'Branco Perolado',
        status: 'Disponível',
        categoria: 'Carro',
        dailyValue: 2500,
        image: '',
        year: '2010',
        conservation: 'Bom',
        fuel: 'Cheio',
        rented: false,
        rentedBy: 'Matheus',
      },
      {
        name: 'Renault Logan',
        ID: '123',
        description: 'Branco Perolado',
        status: 'Disponível',
        categoria: 'Carro',
        dailyValue: 2500,
        image: '',
        year: '2010',
        conservation: 'Bom',
        fuel: 'Cheio',
        rented: false,
        rentedBy: 'Matheus',
      },
      {
        name: 'Renault Logan',
        ID: '123',
        description: 'Branco Perolado',
        status: 'Disponível',
        categoria: 'Carro',
        dailyValue: 2500,
        image: '',
        year: '2010',
        conservation: 'Bom',
        fuel: 'Cheio',
        rented: false,
        rentedBy: 'Matheus',
      },
      {
        name: 'Renault Logan',
        ID: '123',
        description: 'Branco Perolado',
        status: 'Disponível',
        categoria: 'Carro',
        dailyValue: 2500,
        image: '',
        year: '2010',
        conservation: 'Bom',
        fuel: 'Cheio',
        rented: false,
        rentedBy: 'Matheus',
      },
    ]
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === "hidden" ? "visible" : "hidden";
  }

}
