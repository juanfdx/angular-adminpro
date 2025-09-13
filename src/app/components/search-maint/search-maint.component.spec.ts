import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMaintComponent } from './search-maint.component';

describe('SearchMaintComponent', () => {
  let component: SearchMaintComponent;
  let fixture: ComponentFixture<SearchMaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
