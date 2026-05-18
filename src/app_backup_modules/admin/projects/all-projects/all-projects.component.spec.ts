import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ViewprojectsComponent } from "./viewprojects.component";
describe("ViewprojectsComponent", () => {
  let component: ViewprojectsComponent;
  let fixture: ComponentFixture<ViewprojectsComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [ViewprojectsComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ViewprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
