import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IVehicle } from '../components/vehicle-card/vehicle.interface';
import { VEHICLES_API } from '../app.api';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  public setVehicles(vehicles: IVehicle[]): void {
    sessionStorage.removeItem('vehicles');
    sessionStorage.setItem('vehicles', JSON.stringify(vehicles));
  }

  public getVehicles(): IVehicle[] {
    return JSON.parse(sessionStorage.getItem('vehicles'));
  }

  public vehicles(): Observable<IVehicle[]> {
    return this.httpClient.get<IVehicle[]>(`${VEHICLES_API}/vehicles`);
  }

  public createVehicle(vehicle: IVehicle): Observable<IVehicle> {
    return this.httpClient
      .post<IVehicle>(`${VEHICLES_API}/vehicles`, vehicle)
      .pipe(map((vehicle) => vehicle));
  }

  public updateVehicle(vehicle: IVehicle): Observable<IVehicle> {
    return this.httpClient
      .patch<IVehicle>(
        `${VEHICLES_API}/vehicles/${vehicle.externalCode}`,
        vehicle
      )
      .pipe(map((vehicle) => vehicle));
  }

  public vehicleById(id: string): Observable<IVehicle> {
    return this.httpClient.get<IVehicle>(`${VEHICLES_API}/vehicles/${id}`);
  }

  public vehicleByKeyword(keyword: string): Observable<IVehicle[]> {
    return this.httpClient.get<IVehicle[]>(
      `${VEHICLES_API}/vehicles?keyword=${keyword}`
    );
  }
}
