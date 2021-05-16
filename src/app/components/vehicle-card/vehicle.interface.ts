export interface IVehicle {
  name?: string;
  externalCode?: string;
  description?: string;
  status?: string;
  category?: string;
  dailyValue?: number;
  imageUrl?: string;
  year?: string;
  conservation?: string;
  fuel?: string;
  rentedBy?: string;
}

export interface IContent {
  title: string;
  text: string;
  icon: 'error' | 'success' | 'warning';
  background?: string;
  iconColor?: string;
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  confirmButtonText: string;
}
