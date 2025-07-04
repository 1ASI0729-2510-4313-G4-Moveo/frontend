import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRemoveConfirmationComponent } from './car-remove-confirmation.component';

describe('CarRemoveConfirmationComponent', () => {
  let component: CarRemoveConfirmationComponent;
  let fixture: ComponentFixture<CarRemoveConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarRemoveConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarRemoveConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
