import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PancardComponent } from './pancard.component';

describe('PancardComponent', () => {
  let component: PancardComponent;
  let fixture: ComponentFixture<PancardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PancardComponent]
    });
    fixture = TestBed.createComponent(PancardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
