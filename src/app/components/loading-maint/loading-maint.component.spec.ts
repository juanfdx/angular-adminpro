import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingMaintComponent } from './loading-maint.component';

describe('LoadingMaintComponent', () => {
  let component: LoadingMaintComponent;
  let fixture: ComponentFixture<LoadingMaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingMaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
