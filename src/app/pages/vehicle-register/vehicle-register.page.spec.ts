import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRegisterPage } from './vehicle-register.page';

describe('VehicleRegisterPage', () => {
  let component: VehicleRegisterPage;
  let fixture: ComponentFixture<VehicleRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleRegisterPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
