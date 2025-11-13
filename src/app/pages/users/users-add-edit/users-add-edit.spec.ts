import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAddEdit } from './users-add-edit';

describe('UsersAddEdit', () => {
  let component: UsersAddEdit;
  let fixture: ComponentFixture<UsersAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
