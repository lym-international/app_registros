import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistComponent } from './shortlist.component';

describe('ShortlistComponent', () => {
  let component: ShortlistComponent;
  let fixture: ComponentFixture<ShortlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
