import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobtableComponent } from './jobtable.component';

describe('JobtableComponent', () => {
  let component: JobtableComponent;
  let fixture: ComponentFixture<JobtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobtableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
