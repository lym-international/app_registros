import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddHolidayComponent } from "./add-holiday.component";
describe("AddHolidayComponent", () => {
  let component: AddHolidayComponent;
  let fixture: ComponentFixture<AddHolidayComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddHolidayComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
