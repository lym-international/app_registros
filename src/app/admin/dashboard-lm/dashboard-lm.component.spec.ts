import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLmComponent } from './dashboard-lm.component';

describe('DashboardLmComponent', () => {
  let component: DashboardLmComponent;
  let fixture: ComponentFixture<DashboardLmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLmComponent]
    });
    fixture = TestBed.createComponent(DashboardLmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
