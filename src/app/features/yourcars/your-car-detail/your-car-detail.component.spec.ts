import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCarDetailComponent } from './your-car-detail.component';

describe('YourCarDetailComponent', () => {
  let component: YourCarDetailComponent;
  let fixture: ComponentFixture<YourCarDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourCarDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourCarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
