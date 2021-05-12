import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IVehicle } from "../components/vehicle-card/vehicle.interface";
import { VEHICLES_API } from "../app.api";

@Injectable({
    providedIn: "root",
})
export class VehicleService {
    constructor(private httpClient: HttpClient) { }

    public vehicles(): Observable<IVehicle[]> {
        return this.httpClient.get<IVehicle[]>(`${VEHICLES_API}/vehicles`);
    }

    public vehicleById(id: string): Observable<IVehicle> {
        return this.httpClient.get<IVehicle>(`${VEHICLES_API}/vehicle/${id}`);
    }

    public vehicleByKeyword(keyword: string): Observable<IVehicle[]> {
        return this.httpClient.get<IVehicle[]>(
            `${VEHICLES_API}/vehicle?keyword=${keyword}`
        );
    }

    public setVehicle(vehicle: IVehicle[]) {
        sessionStorage.removeItem("vehicle");
        sessionStorage.setItem("vehicle", JSON.stringify(vehicle));
    }

    public getVehicle(): IVehicle[] {
        return JSON.parse(sessionStorage.getItem("vehicle"));
    }
}
