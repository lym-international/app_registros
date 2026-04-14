import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AttendancesComponent } from "./attendance.component";

describe("AttendancesComponent", () => {
  let component: AttendancesComponent;
  let fixture: ComponentFixture<AttendancesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AttendancesComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
