import { Component, OnInit } from '@angular/core';
import { APPEARD } from 'src/animations/appeard.animation';
import { IVehicle } from 'src/app/components/vehicle-card/vehicle.interface';
import { WindowService } from 'src/app/services/window.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StatusType } from '../vehicle-register/vehicle.interface';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
  animations: [APPEARD],
})
export class VehicleListPage implements OnInit {
  constructor(private windowService: WindowService, private router: Router) {
    this.isMobile = window.innerWidth <= windowService.widthMobile;
  }
  public subscribeMobile: Subscription;
  public vehicles: IVehicle[];
  public isMobile: boolean;
  public state = 'ready';

  public getStatus(status: string): string {
    return status
      .toLowerCase()
      .replace(/(?:^|\s)(?!da|de|do)\S/g, (l) => l.toUpperCase());
  }

  edit(vehicle: IVehicle) {
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

  ngOnInit(): void {
    this.subscribeMobile = this.windowService.hasMobile.subscribe(
      (hasMobile: boolean) => (this.isMobile = hasMobile)
    );

    this.vehicles = [
      {
        name: 'Fiat Palio',
        externalCode: '1620987847448',
        description: 'Ar, Direção e Travas Elétricas',
        status: 'DISPONÍVEL',
        category: 'Carro',
        dailyValue: 100,
        imageUrl:
          'https://s2.glbimg.com/bbiMWKjZSGIfJyAz2j3XTRx9w9E=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/q/v/SbnADKQwmR4834QijSzg/2014-09-16-palio-fire-rua.jpg',
        year: '2015',
        conservation: 'Seminovo',
        fuel: '70%',
        rentedBy: '',
      },
      {
        name: 'Volkswagen Gol',
        externalCode: '1621032181482',
        description: 'Preto, Brilhoso, Insulfilmado',
        status: 'RESERVADO',
        category: 'Carro',
        dailyValue: 100,
        imageUrl:
          'https://s2.glbimg.com/RibPtFAVVkRjx4ofpCBd8BUrI5k=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/J/4/BuGct9ROm4afJxG5Qnjw/2014-02-04-compara1.jpg',
        year: '2015',
        conservation: 'Novo',
        fuel: '70%',
        rentedBy: '1ca7000c-366d-49c8-9936-59cf8e4651c9',
      },
      {
        name: 'Renault Logan',
        externalCode: '1621032557040',
        description: 'Vermelho com Rodas de Liga Leve',
        status: 'DISPONÍVEL',
        category: 'Carro',
        dailyValue: 100,
        imageUrl:
          'https://fotos.jornaldocarro.estadao.com.br/uploads/2019/02/22081837/renault-logan-stepway-1160x653.jpg',
        year: '2012',
        conservation: 'Novo',
        fuel: '70%',
        rentedBy: '',
      },
      {
        name: 'Kawasaki Ninja',
        externalCode: '1621033020298',
        description: 'Verde Fosco com Preto',
        status: 'DISPONÍVEL',
        category: 'Motocicleta',
        dailyValue: 1200,
        imageUrl:
          'https://s2.glbimg.com/Mw6KEnsuj88cJ2fiOruiz6ze5hA=/0x0:1900x1267/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/B/c/OVyaJxTEGt8f9tYXCAtw/kawasaki-ninja-400-q98a2272-credito-marcelo-brandt-g1.jpg',
        year: '2018',
        conservation: 'Novo',
        fuel: '30%',
        rentedBy: '',
      },
      {
        name: 'BMW X1',
        externalCode: '1621118954015',
        description: 'Branco com Banco de Couro',
        status: 'RESERVADO',
        category: 'Carro',
        dailyValue: 250,
        imageUrl: '',
        year: '2015',
        conservation: 'Novo',
        fuel: '50%',
        rentedBy: '44c5c783-d456-447a-8192-6a2e8e79abcf',
      },
      {
        name: 'Gios Frx Freeride',
        externalCode: '1621119287767',
        description: 'Freio a Disco',
        status: 'DISPONÍVEL',
        category: 'Bicicleta',
        dailyValue: 50,
        imageUrl: '',
        year: '2010',
        conservation: 'Novo',
        fuel: 'Desnecessário',
        rentedBy: '',
      },
      {
        name: 'Honda TRX 420',
        externalCode: '1621119733984',
        description: 'FourTrax Vermelho',
        status: 'DISPONÍVEL',
        category: 'Quadriciclo',
        dailyValue: 75,
        imageUrl:
          'https://motos2021.com/wp-content/uploads/2020/06/cor2-768x491.png',
        year: '2019',
        conservation: 'Novo',
        fuel: '30%',
        rentedBy: '',
      },
      {
        name: 'SCANIA P310',
        externalCode: '1621120554146',
        description: 'Branco, Banco de Couro',
        status: 'DISPONÍVEL',
        category: 'Caminhão',
        dailyValue: 250,
        imageUrl:
          'https://www.dicasdeconsorcio.com.br/wp-content/uploads/2019/01/SCANIA-R440-2.png',
        year: '2010',
        conservation: 'Novo',
        fuel: '50%',
        rentedBy: '',
      },
    ];
  }
}
