import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideSuccessComponent } from './provide-success.component';

describe('ProvideSuccessComponent', () => {
  let component: ProvideSuccessComponent;
  let fixture: ComponentFixture<ProvideSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvideSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvideSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
