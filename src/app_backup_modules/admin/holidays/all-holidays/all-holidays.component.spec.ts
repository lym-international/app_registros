import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllholidayComponent } from "./all-holidays.component";
describe("AllholidayComponent", () => {
  let component: AllholidayComponent;
  let fixture: ComponentFixture<AllholidayComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllholidayComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllholidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
