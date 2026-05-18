import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormExamplesComponent } from "./form-examples.component";
describe("FormExamplesComponent", () => {
  let component: FormExamplesComponent;
  let fixture: ComponentFixture<FormExamplesComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [FormExamplesComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(FormExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
