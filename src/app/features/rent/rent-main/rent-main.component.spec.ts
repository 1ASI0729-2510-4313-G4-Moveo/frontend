import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentMainComponent } from './rent-main.component';

describe('RentMainComponent', () => {
  let component: RentMainComponent;
  let fixture: ComponentFixture<RentMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
