import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetComponent } from './timesheet.component';

describe('TimesheetComponent', () => {
  let component: TimesheetComponent;
  let fixture: ComponentFixture<TimesheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimesheetComponent]
    });
    fixture = TestBed.createComponent(TimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
