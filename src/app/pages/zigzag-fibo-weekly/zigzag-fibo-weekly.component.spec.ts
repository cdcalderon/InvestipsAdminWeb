import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZigzagFiboWeeklyComponent } from './zigzag-fibo-weekly.component';

describe('ZigzagFiboWeeklyComponent', () => {
  let component: ZigzagFiboWeeklyComponent;
  let fixture: ComponentFixture<ZigzagFiboWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZigzagFiboWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZigzagFiboWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
