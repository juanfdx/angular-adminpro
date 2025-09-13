import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHospitalsComponent } from './table-hospitals.component';

describe('TableHospitalsComponent', () => {
  let component: TableHospitalsComponent;
  let fixture: ComponentFixture<TableHospitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHospitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
