import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumesComponent } from './resumes.component';

describe('ResumesComponent', () => {
  let component: ResumesComponent;
  let fixture: ComponentFixture<ResumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
