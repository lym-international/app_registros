import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ContactGridComponent } from "./contact-grid.component";
describe("ContactGridComponent", () => {
  let component: ContactGridComponent;
  let fixture: ComponentFixture<ContactGridComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [ContactGridComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ContactGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
