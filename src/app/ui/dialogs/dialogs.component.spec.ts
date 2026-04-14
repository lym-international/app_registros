import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DialogsComponent } from "./dialogs.component";
describe("DialogsComponent", () => {
  let component: DialogsComponent;
  let fixture: ComponentFixture<DialogsComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [DialogsComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(DialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
