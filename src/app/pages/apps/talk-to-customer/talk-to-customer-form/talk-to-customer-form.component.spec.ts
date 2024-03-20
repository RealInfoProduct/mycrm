import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkToCustomerFormComponent } from './talk-to-customer-form.component';

describe('TalkToCustomerFormComponent', () => {
  let component: TalkToCustomerFormComponent;
  let fixture: ComponentFixture<TalkToCustomerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalkToCustomerFormComponent]
    });
    fixture = TestBed.createComponent(TalkToCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
