import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearhOrderComponent } from './searh-order.component';

describe('SearhOrderComponent', () => {
  let component: SearhOrderComponent;
  let fixture: ComponentFixture<SearhOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearhOrderComponent]
    });
    fixture = TestBed.createComponent(SearhOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
