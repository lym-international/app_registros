import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { BasicTableComponent } from "./basic-table.component";
describe("BasicTableComponent", () => {
  let component: BasicTableComponent;
  let fixture: ComponentFixture<BasicTableComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [BasicTableComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
