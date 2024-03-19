import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharCardComponent } from './aadhar-card.component';

describe('AadharCardComponent', () => {
  let component: AadharCardComponent;
  let fixture: ComponentFixture<AadharCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AadharCardComponent]
    });
    fixture = TestBed.createComponent(AadharCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
