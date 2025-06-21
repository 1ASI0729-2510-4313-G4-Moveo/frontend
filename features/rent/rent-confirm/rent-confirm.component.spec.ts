import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentConfirmComponent } from './rent-confirm.component';

describe('RentConfirmComponent', () => {
  let component: RentConfirmComponent;
  let fixture: ComponentFixture<RentConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
