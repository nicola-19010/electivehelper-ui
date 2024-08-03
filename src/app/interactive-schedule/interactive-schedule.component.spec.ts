import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveScheduleComponent } from './interactive-schedule.component';

describe('InteractiveScheduleComponent', () => {
  let component: InteractiveScheduleComponent;
  let fixture: ComponentFixture<InteractiveScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InteractiveScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
