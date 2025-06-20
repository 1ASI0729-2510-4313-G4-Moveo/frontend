import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidePaymentComponent } from './provide-payment.component';

describe('ProvidePaymentComponent', () => {
  let component: ProvidePaymentComponent;
  let fixture: ComponentFixture<ProvidePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvidePaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
