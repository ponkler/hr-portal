import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmenttableComponent } from './departmenttable.component';

describe('DepartmenttableComponent', () => {
  let component: DepartmenttableComponent;
  let fixture: ComponentFixture<DepartmenttableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmenttableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmenttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
