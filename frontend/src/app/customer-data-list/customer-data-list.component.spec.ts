import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDataListComponent } from './customer-data-list.component';

describe('CustomerDataListComponent', () => {
  let component: CustomerDataListComponent;
  let fixture: ComponentFixture<CustomerDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDataListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
