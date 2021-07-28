import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZigzagFiboWeeklyDetailsComponent } from './zigzag-fibo-weekly-details.component';

describe('ZigzagFiboWeeklyDetailsComponent', () => {
  let component: ZigzagFiboWeeklyDetailsComponent;
  let fixture: ComponentFixture<ZigzagFiboWeeklyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZigzagFiboWeeklyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZigzagFiboWeeklyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
