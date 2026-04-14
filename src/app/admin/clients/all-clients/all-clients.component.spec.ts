import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllclientComponent } from "./all-clients.component";
describe("AllclientComponent", () => {
  let component: AllclientComponent;
  let fixture: ComponentFixture<AllclientComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllclientComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
