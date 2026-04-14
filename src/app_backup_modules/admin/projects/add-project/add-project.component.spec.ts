import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddprojectsComponent } from "./add-project.component";
describe("BookprojectsComponent", () => {
  let component: AddprojectsComponent;
  let fixture: ComponentFixture<AddprojectsComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddprojectsComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
