import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkToCustomerComponent } from './talk-to-customer.component';

describe('TalkToCustomerComponent', () => {
  let component: TalkToCustomerComponent;
  let fixture: ComponentFixture<TalkToCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalkToCustomerComponent]
    });
    fixture = TestBed.createComponent(TalkToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
