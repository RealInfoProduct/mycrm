import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PancardFormComponent } from './pancard-form.component';

describe('PancardFormComponent', () => {
  let component: PancardFormComponent;
  let fixture: ComponentFixture<PancardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PancardFormComponent]
    });
    fixture = TestBed.createComponent(PancardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
