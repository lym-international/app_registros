import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeavesComponent } from './my-leaves.component';

describe('MyLeavesComponent', () => {
  let component: MyLeavesComponent;
  let fixture: ComponentFixture<MyLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
