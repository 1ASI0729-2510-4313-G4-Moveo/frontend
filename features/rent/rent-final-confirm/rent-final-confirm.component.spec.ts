import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentFinalConfirmComponent } from './rent-final-confirm.component';

describe('RentFinalConfirmComponent', () => {
  let component: RentFinalConfirmComponent;
  let fixture: ComponentFixture<RentFinalConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentFinalConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentFinalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
