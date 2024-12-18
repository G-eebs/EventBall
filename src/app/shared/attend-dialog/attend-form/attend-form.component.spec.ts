import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendFormComponent } from './attend-form.component';

describe('AttendFormComponent', () => {
  let component: AttendFormComponent;
  let fixture: ComponentFixture<AttendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
