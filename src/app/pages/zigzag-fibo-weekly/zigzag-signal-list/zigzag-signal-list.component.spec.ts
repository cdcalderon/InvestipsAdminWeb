import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZigzagSignalListComponent } from './zigzag-signal-list.component';

describe('ZigzagSignalListComponent', () => {
  let component: ZigzagSignalListComponent;
  let fixture: ComponentFixture<ZigzagSignalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZigzagSignalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZigzagSignalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
