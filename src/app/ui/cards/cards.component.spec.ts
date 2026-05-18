import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CardsComponent } from "./cards.component";
describe("CardsComponent", () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [CardsComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
