export interface IVehicle {
    name: string;
    ID: string;
    description: string;
    status: string;
    categoria: string;
    dailyValue: number;
    image: string;
    year: string;
    conservation: string;
    fuel: string;
    rented?: boolean;
    rentedBy: string;
}
