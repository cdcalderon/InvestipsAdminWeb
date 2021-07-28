import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IZigZagFiboSignal } from '../shared/models/zigzag-fibo-signal';
import { ZigzagFiboWeeklySignalsService } from './zigzag-fibo-weekly-signals.service';

@Component({
  selector: 'app-zigzag-fibo-weekly',
  templateUrl: './zigzag-fibo-weekly.component.html',
  styleUrls: ['./zigzag-fibo-weekly.component.scss'],
})
export class ZigzagFiboWeeklyComponent implements OnInit {
  zigZagFibSignalsUp$: Observable<IZigZagFiboSignal[]>;
  defaultSelected = 0;
  selectedSignal: IZigZagFiboSignal;

  constructor(private zigzagSignalService: ZigzagFiboWeeklySignalsService) {}

  ngOnInit(): void {
    this.zigZagFibSignalsUp$ = this.zigzagSignalService
      .getZigZagFibSignalByDateRange(null, null)
      .pipe(
        filter((signals) => signals != null),
        map((signals) =>
          signals
            .filter((s) => s.activationDirection === 'UP')
            .map((s, i) => {
              s.id = i + 1;
              return s;
            })
        )
      );
  }
}
