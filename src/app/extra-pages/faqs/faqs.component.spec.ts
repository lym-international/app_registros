import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FaqsComponent } from "./faqs.component";
describe("FaqsComponent", () => {
  let component: FaqsComponent;
  let fixture: ComponentFixture<FaqsComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [FaqsComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
