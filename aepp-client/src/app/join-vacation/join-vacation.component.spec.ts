import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinVacationComponent } from './join-vacation.component';

describe('JoinVacationComponent', () => {
  let component: JoinVacationComponent;
  let fixture: ComponentFixture<JoinVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
