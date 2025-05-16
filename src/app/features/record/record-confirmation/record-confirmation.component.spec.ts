import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordConfirmationComponent } from './record-confirmation.component';

describe('RecordConfirmationComponent', () => {
  let component: RecordConfirmationComponent;
  let fixture: ComponentFixture<RecordConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
