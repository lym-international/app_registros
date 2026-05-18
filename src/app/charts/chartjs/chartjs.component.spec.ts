import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ChartjsComponent } from "./chartjs.component";
describe("ChartjsComponent", () => {
  let component: ChartjsComponent;
  let fixture: ComponentFixture<ChartjsComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [ChartjsComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ChartjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
