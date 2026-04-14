import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DragDropModule } from "@angular/cdk/drag-drop";

import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { TruncatePipe, PluralPipe } from "../core/pipes";
import { BoardComponent } from "./board.component";

describe("BoardComponent", () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatSelectModule,
        MatSnackBarModule,
      ],
      declarations: [BoardComponent, TruncatePipe, PluralPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should simple adding project work correctly in all lists", () => {
    // given
    const lists: DebugElement[] = fixture.debugElement.queryAll(
      By.css(".projects")
    );
    const projectCount: number = fixture.debugElement.queryAll(
      By.css(".project")
    ).length;

    // when
    lists.forEach((item: DebugElement) => {
      const input: DebugElement = item.query(By.css(".project-list-add input"));
      input.nativeElement.value = "Nowe testowe zadanie";
      input.nativeElement.dispatchEvent(
        new KeyboardEvent("keyup", { key: "Enter" })
      );
    });

    fixture.detectChanges();

    // then
    expect(fixture.debugElement.queryAll(By.css(".project")).length).toBe(
      projectCount + lists.length
    );
  });

  it("should simple add project create project with proper name", () => {
    // given
    const input: DebugElement = fixture.debugElement.query(
      By.css(".project-list-add input")
    );

    // when
    input.nativeElement.value = "Nowe testowe zadanie";
    input.nativeElement.dispatchEvent(
      new KeyboardEvent("keyup", { key: "Enter" })
    );

    fixture.detectChanges();

    // then
    expect(
      fixture.debugElement.nativeElement.innerHTML.indexOf(
        input.nativeElement.value
      )
    ).toBeGreaterThan(-1);
  });

  it("should not add project with empty or whitespace name", () => {
    // given
    const input: DebugElement = fixture.debugElement.query(
      By.css(".project-list-add input")
    );
    const projectCount: number = fixture.debugElement.queryAll(
      By.css(".project")
    ).length;

    // when
    input.nativeElement.value = "";
    input.nativeElement.dispatchEvent(
      new KeyboardEvent("keyup", { key: "Enter" })
    );

    input.nativeElement.value = " ";
    input.nativeElement.dispatchEvent(
      new KeyboardEvent("keyup", { key: "Enter" })
    );

    fixture.detectChanges();

    // then
    expect(fixture.debugElement.queryAll(By.css(".project")).length).toBe(
      projectCount
    );
  });

  it("should open modal dialog after double click on project", () => {
    // given
    spyOn(component, "editProjectDialog");
    const input: DebugElement = fixture.debugElement.query(By.css(".project"));

    // when
    input.nativeElement.dispatchEvent(new MouseEvent("dblclick"));

    // then
    expect(component.editProjectDialog).toHaveBeenCalled();
  });
});
