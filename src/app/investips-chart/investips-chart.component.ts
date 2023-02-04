import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { IWeeklyFutureFiboSignal } from '../shared/models/weekly-future-fibo-signal.model';
import { IZigZagFiboSignal } from '../shared/models/zigzag-fibo-signal';
import { IBottomSupportSignal } from '../shared/models/bottom-support';

@Component({
  selector: 'app-investips-chart',
  templateUrl: './investips-chart.component.html',
  styleUrls: ['./investips-chart.component.scss'],
})
export class InvestipsChartComponent implements OnInit, OnChanges {
  private _selectedFutureUpSignal: IWeeklyFutureFiboSignal;
  private _selectedZigZagSignal: IZigZagFiboSignal;
  private _selectedBottomSupportSignal: IBottomSupportSignal;

  @Input() fiboSignals: IWeeklyFutureFiboSignal[];

  @Input()
  set selectedFutureUpSignal(selectedFutureUpSignal: IWeeklyFutureFiboSignal) {
    this._selectedFutureUpSignal =
      selectedFutureUpSignal || this._selectedFutureUpSignal;
  }

  get selectedFutureUpSignal(): IWeeklyFutureFiboSignal {
    return this._selectedFutureUpSignal;
  }

  @Input()
  set selectedZigZagSignal(selectedZigZagSignal: IZigZagFiboSignal) {
    this._selectedZigZagSignal =
      selectedZigZagSignal || this._selectedZigZagSignal;
  }

  get selectedZigZagSignal(): IZigZagFiboSignal {
    return this._selectedZigZagSignal;
  }

  @Input()
  set selectedBottomSupportSignal(selectedZigZagSignal: IBottomSupportSignal) {
    this._selectedBottomSupportSignal =
      selectedZigZagSignal || this._selectedBottomSupportSignal;
  }

  get selectedBottomSupportSignal(): IBottomSupportSignal {
    return this._selectedBottomSupportSignal;
  }

  @Input() marksType: string;

  ngOnChanges(changes: SimpleChanges) {}

  constructor() {}

  ngOnInit(): void {}
}
