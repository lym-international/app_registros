import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DialogformComponent } from "./dialogform.component";
describe("DialogformComponent", () => {
  let component: DialogformComponent;
  let fixture: ComponentFixture<DialogformComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [DialogformComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(DialogformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
