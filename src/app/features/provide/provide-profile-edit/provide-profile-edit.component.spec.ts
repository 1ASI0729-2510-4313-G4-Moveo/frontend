import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideProfileEditComponent } from './provide-profile-edit.component';

describe('ProvideProfileEditComponent', () => {
  let component: ProvideProfileEditComponent;
  let fixture: ComponentFixture<ProvideProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvideProfileEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvideProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
