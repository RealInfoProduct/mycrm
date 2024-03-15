import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrComponent } from './itr.component';

describe('ItrComponent', () => {
  let component: ItrComponent;
  let fixture: ComponentFixture<ItrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItrComponent]
    });
    fixture = TestBed.createComponent(ItrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
