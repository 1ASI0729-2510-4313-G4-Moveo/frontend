import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidePaymentEditComponent } from './provide-payment-edit.component';

describe('ProvidePaymentEditComponent', () => {
  let component: ProvidePaymentEditComponent;
  let fixture: ComponentFixture<ProvidePaymentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvidePaymentEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidePaymentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
