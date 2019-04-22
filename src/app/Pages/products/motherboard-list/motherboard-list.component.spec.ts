import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherboardListComponent } from './motherboard-list.component';

describe('MotherboardListComponent', () => {
  let component: MotherboardListComponent;
  let fixture: ComponentFixture<MotherboardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotherboardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
