import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBarProviderComponent } from './header-bar-provider.component';

describe('HeaderBarProviderComponent', () => {
  let component: HeaderBarProviderComponent;
  let fixture: ComponentFixture<HeaderBarProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBarProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBarProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
