import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IZigZagFiboSignal } from 'src/app/shared/models/zigzag-fibo-signal';
import { ZigzagFiboWeeklySignalsService } from '../zigzag-fibo-weekly-signals.service';

@Component({
  selector: 'app-zigzag-fibo-weekly-details',
  templateUrl: './zigzag-fibo-weekly-details.component.html',
  styleUrls: ['./zigzag-fibo-weekly-details.component.scss'],
})
export class ZigzagFiboWeeklyDetailsComponent implements OnInit, AfterViewInit {
  //zigZagFibSignals$: Observable<IZigZagFiboSignal>;
  zigzagFibSignal: IZigZagFiboSignal;
  constructor(
    private route: ActivatedRoute,
    private zigzagSignalService: ZigzagFiboWeeklySignalsService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const signalId = this.route.snapshot.paramMap.get('signal-id');

    if (signalId) {
      // this.zigZagFibSignals$ = this.zigzagSignalService
      //   .getWeeklyZigZagFibPremiumSignalById(signalId)
      //   .pipe(delay(500)); //allow tvchart to load // TODO: hook to tv-chart loaded event or create similar

      this.zigzagSignalService
        .getWeeklyZigZagFibPremiumSignalById(signalId)
        .pipe(delay(500))
        .subscribe((signal) => (this.zigzagFibSignal = signal)); //allow tvchart to load // TODO: hook to tv-chart loaded event or create similar
    }
  }
}
