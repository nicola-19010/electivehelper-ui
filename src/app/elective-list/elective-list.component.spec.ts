import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectiveListComponent } from './elective-list.component';

describe('ElectiveListComponent', () => {
  let component: ElectiveListComponent;
  let fixture: ComponentFixture<ElectiveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectiveListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
