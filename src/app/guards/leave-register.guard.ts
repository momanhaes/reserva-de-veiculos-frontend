import { CanDeactivate } from '@angular/router';
import { VehicleRegisterPage } from '../pages/vehicle-register/vehicle-register.page';

export class LeaveRegisterGuard implements CanDeactivate<VehicleRegisterPage> {
  canDeactivate(vehicleRegisterPage: VehicleRegisterPage): boolean {
    if (
      !vehicleRegisterPage.isFormValid &&
      !vehicleRegisterPage.isCancelConfirmed
    ) {
      vehicleRegisterPage.cancel();
      return false;
    } else {
      return true;
    }
  }
}
