import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCarEditComponent } from './your-car-edit.component';

describe('YourCarEditComponent', () => {
  let component: YourCarEditComponent;
  let fixture: ComponentFixture<YourCarEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourCarEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourCarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
