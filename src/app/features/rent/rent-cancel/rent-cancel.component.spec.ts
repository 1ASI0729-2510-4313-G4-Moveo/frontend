import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCancelComponent } from './rent-cancel.component';

describe('RentCancelComponent', () => {
  let component: RentCancelComponent;
  let fixture: ComponentFixture<RentCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentCancelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
