export interface IVehicleOption {
  name: string;
  value: string;
}

export interface IVehicleFuel {
  name: string;
  value: string;
}

export enum StatusType {
  RESERVADO = 'RESERVADO',
  DISPONIVEL = 'DISPONÍVEL',
}
