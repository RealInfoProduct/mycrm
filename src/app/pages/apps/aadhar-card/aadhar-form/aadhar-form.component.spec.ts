import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharFormComponent } from './aadhar-form.component';

describe('AadharFormComponent', () => {
  let component: AadharFormComponent;
  let fixture: ComponentFixture<AadharFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AadharFormComponent]
    });
    fixture = TestBed.createComponent(AadharFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
