import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustormDataFormComponent } from './custorm-data-form.component';

describe('CustormDataFormComponent', () => {
  let component: CustormDataFormComponent;
  let fixture: ComponentFixture<CustormDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustormDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustormDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
