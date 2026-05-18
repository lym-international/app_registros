import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseEventComponent } from './close-event.component';

describe('CloseEventComponent', () => {
  let component: CloseEventComponent;
  let fixture: ComponentFixture<CloseEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseEventComponent]
    });
    fixture = TestBed.createComponent(CloseEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
