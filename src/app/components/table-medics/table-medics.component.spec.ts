import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMedicsComponent } from './table-medics.component';

describe('TableMedicsComponent', () => {
  let component: TableMedicsComponent;
  let fixture: ComponentFixture<TableMedicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMedicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
