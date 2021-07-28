import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  widget,
  IChartingLibraryWidget,
  ChartingLibraryWidgetOptions,
  LanguageCode,
} from '../../assets/charting_library/charting_library.min';
import { environment } from '../../environments/environment';

import { UDFCompatibleDatafeed } from '../../assets/datafeeds/udf/src/udf-compatible-datafeed';
import { IWeeklyFutureFiboSignal } from '../shared/models/weekly-future-fibo-signal.model';
import { IZigZagFiboSignal } from '../shared/models/zigzag-fibo-signal';
import { IBottomSupportSignal } from '../shared/models/bottom-support';

@Component({
  selector: 'app-tv-chart-container',
  templateUrl: './tv-chart-container.component.html',
  styleUrls: ['./tv-chart-container.component.scss'],
})
export class TvChartContainerComponent implements OnInit, OnDestroy, OnChanges {
  private _symbol: ChartingLibraryWidgetOptions['symbol'] = 'AAPL';
  private _interval: ChartingLibraryWidgetOptions['interval'] = 'D';
  // BEWARE: no trailing slash is expected in feed URL
  //private _datafeedUrl = 'https://demo_feed.tradingview.com';
  // private _datafeedUrl = environment.stockMarketQuotesWithIndicatorsApiBaseUrl + '/api/udf';
  private _datafeedUrl = environment.udfApiBaseUrl + '/api/udf';
  private _libraryPath: ChartingLibraryWidgetOptions['library_path'] =
    '/assets/charting_library/';
  private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] =
    'https://saveload.tradingview.com';
  private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] =
    '1.1';
  private _clientId: ChartingLibraryWidgetOptions['client_id'] =
    'tradingview.com';
  private _userId: ChartingLibraryWidgetOptions['user_id'] = 'public_user_id';
  private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
  private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
  private _containerId: ChartingLibraryWidgetOptions['container_id'] =
    'tv_chart_container';
  private _tvWidget: IChartingLibraryWidget | null = null;

  studyIds: any[] = [];

  @Input() selectedFutureUpSignal: IWeeklyFutureFiboSignal;

  @Input() selectedZigZagSignal: IZigZagFiboSignal;

  @Input() selectedBottomSupportSignal: IBottomSupportSignal;

  @Input() fiboSignals: IWeeklyFutureFiboSignal[];

  @Input() marksType: string;

  @Input()
  set symbol(symbol: ChartingLibraryWidgetOptions['symbol']) {
    this._symbol = symbol || this._symbol;
  }

  @Input()
  set interval(interval: ChartingLibraryWidgetOptions['interval']) {
    this._interval = interval || this._interval;
  }

  @Input()
  set datafeedUrl(datafeedUrl: string) {
    this._datafeedUrl = datafeedUrl || this._datafeedUrl;
  }

  @Input()
  set libraryPath(libraryPath: ChartingLibraryWidgetOptions['library_path']) {
    this._libraryPath = libraryPath || this._libraryPath;
  }

  @Input()
  set chartsStorageUrl(
    chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']
  ) {
    this._chartsStorageUrl = chartsStorageUrl || this._chartsStorageUrl;
  }

  @Input()
  set chartsStorageApiVersion(
    chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']
  ) {
    this._chartsStorageApiVersion =
      chartsStorageApiVersion || this._chartsStorageApiVersion;
  }

  @Input()
  set clientId(clientId: ChartingLibraryWidgetOptions['client_id']) {
    this._clientId = clientId || this._clientId;
  }

  @Input()
  set userId(userId: ChartingLibraryWidgetOptions['user_id']) {
    this._userId = userId || this._userId;
  }

  @Input()
  set fullscreen(fullscreen: ChartingLibraryWidgetOptions['fullscreen']) {
    this._fullscreen = fullscreen || this._fullscreen;
  }

  @Input()
  set autosize(autosize: ChartingLibraryWidgetOptions['autosize']) {
    this._autosize = autosize || this._autosize;
  }

  @Input()
  set containerId(containerId: ChartingLibraryWidgetOptions['container_id']) {
    this._containerId = containerId || this._containerId;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.selectedFutureUpSignal && this._tvWidget) {
      console.log(
        'Changes from tv chart container ' +
          changes.selectedFutureUpSignal.currentValue
      );
      const base = this.getUTCUnixDate(
        this.selectedFutureUpSignal.dateOfFirstDayOfWeek
      );
      const from = this.twoMonthsBeforeUTC(base);
      const to = this.oneMonthAfterUTC(base);

      const currentSymbol = this._tvWidget
        .activeChart()
        .symbol()
        .split(':')
        .pop();
      if (
        changes.selectedFutureUpSignal.currentValue.symbol === currentSymbol
      ) {
        this.clearChart();
        this._tvWidget
          .activeChart()
          .setVisibleRange({ from, to }, { percentRightMargin: 20 })
          .then(() => {
            console.log('New visible range is applied');
            //this.addFiboSignal(this.selectedFutureUpSignal);
            this.addABBLowHighFibSignalStudy(this.selectedFutureUpSignal);
          });
      } else {
        this.clearChart();
        this._tvWidget
          .activeChart()
          .setSymbol(this.selectedFutureUpSignal.symbol, () => {
            this._tvWidget
              .activeChart()
              .setVisibleRange({ from, to }, { percentRightMargin: 20 })
              .then(() => {
                console.log('New visible range is applied');
                // this.addFiboSignal(this.selectedFutureUpSignal);
                this.addABBLowHighFibSignalStudy(this.selectedFutureUpSignal);
              });
          });
      }
    }

    if (changes && changes.selectedZigZagSignal && this._tvWidget) {
      this.clearChart();
      console.log(
        'Changes from tv chart container ' +
          changes.selectedZigZagSignal.currentValue
      );
      const base = this.getUTCUnixDate(
        this.selectedZigZagSignal.activationDate
      );
      const from = this.twoMonthsBeforeUTC(base);
      const to = this.oneMonthAfterUTC(base);

      const currentSymbol = this._tvWidget
        .activeChart()
        .symbol()
        .split(':')
        .pop();
      this.onCreateStudy(this._tvWidget, 'stoch307bull');
      if (changes.selectedZigZagSignal.currentValue.symbol === currentSymbol) {
        this._tvWidget
          .activeChart()
          .setVisibleRange({ from, to }, { percentRightMargin: 20 })
          .then(() => {
            console.log('New visible range is applied');
            this.addZigZagFiboSignal(this.selectedZigZagSignal);
          });
      } else {
        this._tvWidget
          .activeChart()
          .setSymbol(this.selectedZigZagSignal.symbol, () => {
            this._tvWidget
              .activeChart()
              .setVisibleRange({ from, to }, { percentRightMargin: 20 })
              .then(() => {
                console.log('New visible range is applied');
                this.addZigZagFiboSignal(this.selectedZigZagSignal);
              });
          });
      }
    }

    if (changes && changes.selectedBottomSupportSignal && this._tvWidget) {
      this.clearChart();
      console.log(
        'Changes from tv chart container ' +
          changes.selectedBottomSupportSignal.currentValue
      );
      const base = this.getUTCUnixDate(
        this.selectedBottomSupportSignal.cTimeStampDateTime
      );
      const from = this.sixMonthsBeforeUTC(base);
      const to = this.sixMonthAfterUTC(base);

      const currentSymbol = this._tvWidget
        .activeChart()
        .symbol()
        .split(':')
        .pop();
      this.onCreateStudy(this._tvWidget, 'stoch307bull');
      if (
        changes.selectedBottomSupportSignal.currentValue.symbol ===
        currentSymbol
      ) {
        this._tvWidget
          .activeChart()
          .setVisibleRange({ from, to }, { percentRightMargin: 20 })
          .then(() => {
            console.log('New visible range is applied');
            this.addBottomSupportSignal(this.selectedBottomSupportSignal);
          });
      } else {
        this._tvWidget
          .activeChart()
          .setSymbol(this.selectedBottomSupportSignal.symbol, () => {
            this._tvWidget
              .activeChart()
              .setVisibleRange({ from, to }, { percentRightMargin: 20 })
              .then(() => {
                console.log('New visible range is applied');
                this.addBottomSupportSignal(this.selectedBottomSupportSignal);
              });
          });
      }
    }

    //  console.log(changes.selectedFutureUpSignal.currentValue);
    // this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values
  }

  ngOnInit() {
    const fourMonthAgo = Math.floor(
      new Date().valueOf() / 1000 - 4 * 30 * 24 * 60 * 60
    );

    const today = Math.floor(new Date().valueOf() / 1000);

    function getLanguageFromURL(): LanguageCode | null {
      const regex = new RegExp('[\\?&]lang=([^&#]*)');
      const results = regex.exec(location.search);

      return results === null
        ? null
        : (decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode);
    }

    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: this._symbol,
      datafeed: new UDFCompatibleDatafeed(
        this._datafeedUrl,
        10 * 1000,
        this.marksType
      ),
      interval: this._interval,
      container_id: this._containerId,
      library_path: this._libraryPath,
      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings'],
      //enabled_features: ['study_templates'],
      enabled_features: ['move_logo_to_main_pane', 'study_templates'],
      charts_storage_url: this._chartsStorageUrl,
      charts_storage_api_version: this._chartsStorageApiVersion,
      client_id: this._clientId,
      user_id: this._userId,
      fullscreen: this._fullscreen,
      autosize: this._autosize,
      //studies_overrides: null
      studies_overrides: {
        'MA Cross.short:plot.color': '#6B3798',
        'MA Cross.long:plot.color': '#708957',
      },
    };

    const tvWidget = new widget(widgetOptions);
    this._tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      //this.addFiboSignals();
      // this.createWidgetShape(tvWidget.chart());

      // this.createBallon('test message', this.getNumberDateTime('Dec/01/2019'), 240, '#2ef03a');

      // this.createNote('test message', this.getNumberDateTime('Dec/01/2019'), 240, '#2ef03a');
      // this.fibTrendExt();

      // this.createTrendLine(fourMonthAgo, today, '#00FFFF');

      // this.createFlag(1576022400, 240);

      tvWidget.chart().createStudy('Moving Average', false, true, [30], {
        'plot.color.0': '#042f66',
      });

      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () =>
          tvWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              console.log('Noticed!');
            },
          })
        );
        button.innerHTML = 'Check API';
      });
    });

    // tvWidget.onChartReady(() => {
    //     const button = tvWidget
    //         .createButton()
    //         .attr("title", "Click to show a notification popup")
    //         .addClass("apply-common-tooltip")
    //         .on(
    //             "click",
    //             () => tvWidget.setSymbol("AAPL", "1000", null)
    //             // tvWidget.showNoticeDialog({
    //             //     title: "Notification",
    //             //     body:
    //             //         "TradingView Charting Library API works correctly",
    //             //     callback: () => {
    //             //         console.log("Noticed!");
    //             //     }
    //             // })
    //         );

    //     button[0].innerHTML = "Check API";
    // });
  }

  // createWidgetShape(widgetShape: any) {
  //     widgetShape.createShape(
  //         {
  //             time: 1576022400,
  //             price: 240
  //         },
  //         {
  //             shape: 'text',
  //             zOrder: 'top',
  //             lock: true,
  //             disableSelection: true,
  //             disableSave: true,
  //             disableUndo: true,
  //             text: 'Hello Carlos',
  //             overrides: {
  //                 color: widgetShape.color,
  //                 fontsize: 12
  //             }
  //         }
  //     );
  // }

  private addFiboSignals() {
    if (this.fiboSignals) {
      for (const s of this.fiboSignals) {
        this.addFiboSignal(s);
      }
    }
  }

  clearChart() {
    if (this._tvWidget && this._tvWidget.chart()) {
      this._tvWidget.chart().removeAllShapes();
      this.studyIds.forEach((id) => {
        this._tvWidget.activeChart().removeEntity(id);
      });
      //this._tvWidget.activeChart().getAllStudies().forEach(({ name, id }) => this._tvWidget.activeChart().removeEntity(id));
      //this._tvWidget.activeChart().removeAllStudies();
    }
  }

  private addFiboSignal(signal: IWeeklyFutureFiboSignal) {
    // if (this._tvWidget) {
    //   this._tvWidget.chart().removeAllShapes();
    //   this.studyIds.forEach(id =>{
    //     this._tvWidget.activeChart().removeEntity(id);
    //   } );
    //   //this._tvWidget.activeChart().getAllStudies().forEach(({ name, id }) => this._tvWidget.activeChart().removeEntity(id));
    //   //this._tvWidget.activeChart().removeAllStudies();
    // }

    const baseDate = new Date(signal.dateOfFirstDayOfWeek);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const day = baseDate.getDate();
    const signalDate = Date.UTC(year, month, day) / 1000;
    const pointA = signalDate;

    const pointB = this.oneWeekAfterUTC(pointA);

    if (signal.isFutureNextWeekFibActivatedUp) {
      this.createTrendLine(
        pointA,
        pointB,
        signal.currentWeekFibSupportRelaxed,
        signal.currentWeekFibSupportRelaxed,
        '#F15152'
      );
      this.createTrendLine(
        pointA,
        pointB,
        signal.currentWeekFibSupport,
        signal.currentWeekFibSupport,
        '#00FFFF'
      );

      this.createTrendLine(
        pointA,
        pointB,
        signal.ironCondorUpLeg,
        signal.ironCondorUpLeg,
        '#00FFFF'
      );

      this.createCalloutSignalUp(
        `Buy Credit Put Spread at ${signal.currentWeekFibSupport} ${
          month + 1
        }-${day}-${year}`,
        pointA,
        signal.currentWeekFibSupport,
        '#2ef03a'
      );

      this.createCalloutSignalDown(
        `Buy Credit Call Spread at ${signal.ironCondorUpLeg} ${
          month + 1
        }-${day}-${year}`,
        pointA,
        signal.ironCondorUpLeg,
        '#2ef03a'
      );
    } else if (signal.isFutureNextWeekFibActivatedDown) {
      this.createTrendLine(
        pointA,
        pointB,
        signal.currentWeekFibResistenceRelaxed,
        signal.currentWeekFibResistenceRelaxed,
        '#F15152'
      );
      this.createTrendLine(
        pointA,
        pointB,
        signal.currentWeekFibResistence,
        signal.currentWeekFibResistence,
        '#00FFFF'
      );

      this.createTrendLine(
        pointA,
        pointB,
        signal.ironCondorDownLeg,
        signal.ironCondorDownLeg,
        '#00FFFF'
      );

      this.createCalloutSignalDown(
        `Buy Credit Call Spread at ${signal.currentWeekFibResistence} ${
          month + 1
        }-${day}-${year}`,
        pointA,
        signal.currentWeekFibResistence,
        '#2ef03a'
      );

      this.createCalloutSignalUp(
        `Buy Credit Put Spread at ${signal.ironCondorDownLeg} ${
          month + 1
        }-${day}-${year}`,
        pointA,
        signal.ironCondorDownLeg,
        '#2ef03a'
      );
    }
  }

  private addZigZagFiboSignal(signal: IZigZagFiboSignal) {
    if (this._tvWidget) {
      this._tvWidget.chart().removeAllShapes();
    }

    const baseDate = new Date(signal.activationDate);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const day = baseDate.getDate();
    const signalDate = Date.UTC(year, month, day) / 1000;
    const pointA = signalDate;

    const pointB = this.twoWeekAfterUTC(pointA);

    if (signal.activationDirection === 'UP') {
      //const support = Math.min(signal.cLow, signal.cLowestOpenOrClose);
      const support = signal.support;
      this.createTrendLine(pointA, pointB, support, support, '#1c100b');
      // this.createTrendLine(pointA, pointB, signal.currentWeekFibSupport, signal.currentWeekFibSupport, '#00FFFF');

      // this.createTrendLine(pointA, pointB, signal.ironCondorUpLeg, signal.ironCondorUpLeg, '#00FFFF');

      // this.createCalloutSignalUp
      //     (`Buy Credit Put Spread at ${support} ${month + 1}-${day}-${year}`,
      //         pointA, support, '#2ef03a');

      //this.fibTrendExtABC(signal.aLow, signal.bHigh, signal.cLowestOpenOrClose, signal.aDate, signal.bDate, signal.cDate);
      this.fibTrendExtABC(
        signal.aLow,
        signal.bHigh,
        signal.cLow,
        signal.aDate,
        signal.bDate,
        signal.cDate
      );

      // this.createCalloutSignalDown
      //     (`Buy Credit Call Spread at ${signal.ironCondorUpLeg} ${month + 1}-${day}-${year}`,
      //         pointA, signal.ironCondorUpLeg, '#2ef03a');
    } else if (signal.activationDirection === 'DOWN') {
      //const resistence = Math.max(signal.cHigh, signal.cHighestOpenOrClose);
      const resistence = signal.resistence;
      this.createTrendLine(pointA, pointB, resistence, resistence, '#1c100b');
      //this.createTrendLine(pointA, pointB, signal.currentWeekFibResistence, signal.currentWeekFibResistence, '#00FFFF');

      //this.createTrendLine(pointA, pointB, signal.ironCondorDownLeg, signal.ironCondorDownLeg, '#00FFFF');

      // this.createCalloutSignalDown
      //     (`Buy Credit Call Spread at ${resistence} ${month + 1}-${day}-${year}`,
      //         pointA, resistence, '#2ef03a');

      //this.fibTrendExtABC(signal.aHigh, signal.bLow, signal.cHighestOpenOrClose, signal.aDate, signal.bDate, signal.cDate);
      this.fibTrendExtABC(
        signal.aHigh,
        signal.bLow,
        signal.cHigh,
        signal.aDate,
        signal.bDate,
        signal.cDate
      );
      // this.createCalloutSignalUp
      //     (`Buy Credit Put Spread at ${signal.ironCondorDownLeg} ${month + 1}-${day}-${year}`,
      //         pointA, signal.ironCondorDownLeg, '#2ef03a');
    }
  }

  private addABBLowHighFibSignalStudy(signal: IWeeklyFutureFiboSignal) {
    if (this._tvWidget) {
      this._tvWidget.chart().removeAllShapes();
    }

    const baseDate = new Date(signal.activationDate);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const day = baseDate.getDate();
    const signalDate = Date.UTC(year, month, day) / 1000;
    const pointA = signalDate;

    const pointB = this.twoWeekAfterUTC(pointA);

    if (signal.activationDirection === 'UP') {
      //const support = Math.min(signal.cLow, signal.cLowestOpenOrClose);
      const support = signal.support;
      this.createTrendLine(pointA, pointB, support, support, '#1c100b');
      this.createNote(support.toString(), pointB, support);
      // this.createTrendLine(pointA, pointB, signal.currentWeekFibSupport, signal.currentWeekFibSupport, '#00FFFF');

      // this.createTrendLine(pointA, pointB, signal.ironCondorUpLeg, signal.ironCondorUpLeg, '#00FFFF');

      // this.createCalloutSignalUp
      //     (`Buy Credit Put Spread at ${support} ${month + 1}-${day}-${year}`,
      //         pointA, support, '#2ef03a');

      //this.fibTrendExtABC(signal.aLow, signal.bHigh, signal.cLowestOpenOrClose, signal.aDate, signal.bDate, signal.cDate);
      this.fibTrendExtABC(
        signal.aFib,
        signal.bFib,
        signal.cFib,
        signal.aDate,
        signal.bDate,
        signal.cDate
      );

      // this.createCalloutSignalDown
      //     (`Buy Credit Call Spread at ${signal.ironCondorUpLeg} ${month + 1}-${day}-${year}`,
      //         pointA, signal.ironCondorUpLeg, '#2ef03a');
    } else if (signal.activationDirection === 'DOWN') {
      //const resistence = Math.max(signal.cHigh, signal.cHighestOpenOrClose);
      const resistence = signal.resistence;
      this.createTrendLine(pointA, pointB, resistence, resistence, '#1c100b');
      this.createNote(resistence.toString(), pointB, resistence);
      //this.createTrendLine(pointA, pointB, signal.currentWeekFibResistence, signal.currentWeekFibResistence, '#00FFFF');

      //this.createTrendLine(pointA, pointB, signal.ironCondorDownLeg, signal.ironCondorDownLeg, '#00FFFF');

      // this.createCalloutSignalDown
      //     (`Buy Credit Call Spread at ${resistence} ${month + 1}-${day}-${year}`,
      //         pointA, resistence, '#2ef03a');

      //this.fibTrendExtABC(signal.aHigh, signal.bLow, signal.cHighestOpenOrClose, signal.aDate, signal.bDate, signal.cDate);
      this.fibTrendExtABC(
        signal.aFib,
        signal.bFib,
        signal.cFib,
        signal.aDate,
        signal.bDate,
        signal.cDate
      );
      // this.createCalloutSignalUp
      //     (`Buy Credit Put Spread at ${signal.ironCondorDownLeg} ${month + 1}-${day}-${year}`,
      //         pointA, signal.ironCondorDownLeg, '#2ef03a');
    }
  }

  private addBottomSupportSignal(signal: IBottomSupportSignal) {
    if (this._tvWidget) {
      this._tvWidget.chart().removeAllShapes();
    }

    const baseDate = new Date(signal.cTimeStampDateTime);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const day = baseDate.getDate();
    const signalDate = Date.UTC(year, month, day) / 1000;
    const pointA = signalDate;

    const pointB = this.twoWeekAfterUTC(pointA);

    this.createTrendLine(
      pointA,
      pointB,
      signal.supportPrice1618,
      signal.supportPrice1618,
      '#1c100b'
    );

    this.createTrendLine(
      pointA,
      pointB,
      signal.supportPrice2618,
      signal.supportPrice2618,
      '#2ef03a'
    );

    this.createTrendLine(
      pointA,
      pointB,
      signal.supportPrice4236,
      signal.supportPrice4236,
      '#fffece'
    );

    this.createTrendLine(
      pointA,
      pointB,
      signal.supportPrice6854,
      signal.supportPrice6854,
      '#3F7D41'
    );

    this.fibTrendExtABC(
      Math.max(signal.aClose, signal.aOpen),
      Math.min(signal.bClose, signal.bOpen),
      Math.max(signal.cClose, signal.cOpen),
      signal.aTimeStampDateTime,
      signal.bTimeStampDateTime,
      signal.cTimeStampDateTime
    );
  }

  private createBallon(
    message: string,
    time: number,
    price: number,
    backgroundColor: string = '#fffece'
  ) {
    if (this._tvWidget) {
      this._tvWidget.chart().createMultipointShape([{ time, price }], {
        shape: 'balloon',
        lock: true,
        disableSelection: true,
        disableSave: true,
        disableUndo: true,
        overrides: {
          // backgroundColor: backgroundColor,
          showLabel: true,
          fontSize: 30,
          linewidth: 2,
          linecolor: '#00FFFF',
        },
      });
    }
  }

  private createNote(
    message: string,
    time: number,
    price: number,
    backgroundColor: string = '#fffece'
  ) {
    if (this._tvWidget) {
      this._tvWidget.chart().createMultipointShape([{ time, price }], {
        shape: 'note',
        disableSave: true,
        text: message,
        overrides: {
          // backgroundColor: backgroundColor,
          showLabel: true,
          fontSize: 16,
          linewidth: 2,
          linecolor: '#00000',
          markerColor: '#3F7D41',
        },
      });
    }
  }

  private createCalloutSignalUp(
    message: string,
    time: number,
    price: number,
    backgroundColor: string = '#fffece'
  ) {
    if (this._tvWidget) {
      const signalDate = new Date(time);
      const weekToAdd = 1;
      // const pointB = Math.floor(signalDate.valueOf() / 1000);
      let pointB = signalDate.setDate(signalDate.getDate() + weekToAdd * 7);
      const priceB = price - price * 0.05;
      pointB = Math.floor(pointB.valueOf() / 1000);

      this._tvWidget.chart().createMultipointShape(
        [
          { time, price },
          { time, price: priceB },
        ],
        {
          shape: 'callout',
          disableSave: true,
          text: message,
          overrides: {
            // backgroundColor: backgroundColor,
            showLabel: true,
            fontSize: 16,
            linewidth: 2,
            linecolor: '#00000',
            markerColor: '#3F7D41',
          },
        }
      );
    }
  }

  private createCalloutSignalDown(
    message: string,
    time: number,
    price: number,
    backgroundColor: string = '#fffece'
  ) {
    if (this._tvWidget) {
      const signalDate = new Date(time);
      const weekToAdd = 1;
      // const pointB = Math.floor(signalDate.valueOf() / 1000);
      let pointB = signalDate.setDate(signalDate.getDate() + weekToAdd * 7);
      const priceB = price + price * 0.05;
      pointB = Math.floor(pointB.valueOf() / 1000);

      this._tvWidget.chart().createMultipointShape(
        [
          { time, price },
          { time, price: priceB },
        ],
        {
          shape: 'callout',
          disableSave: true,
          text: message,
          overrides: {
            // backgroundColor: backgroundColor,
            showLabel: true,
            fontSize: 16,
            linewidth: 2,
            linecolor: '#00000',
            markerColor: '#3F7D41',
          },
        }
      );
    }
  }

  private createTrendLine(
    pointA: number,
    pointB: number,
    pointAPrice: number,
    pointBPrice: number,
    lineColor: string
  ) {
    if (this._tvWidget) {
      this._tvWidget.chart().createMultipointShape(
        [
          { time: pointA, price: pointAPrice },
          { time: pointB, price: pointBPrice },
        ],
        {
          shape: 'trend_line',
          lock: true,
          disableSelection: true,
          disableSave: true,
          disableUndo: true,
          overrides: {
            showLabel: true,
            fontSize: 30,
            linewidth: 4,
            linecolor: lineColor,
          },
        }
      );
    }
  }

  private createFlag(time: number, price: number) {
    this._tvWidget.chart().createShape(
      {
        time: 1576022400,
        price: 240,
      },
      {
        shape: 'flag',
        zOrder: 'top',
        lock: true,
        disableSelection: true,
        disableSave: true,
        disableUndo: true,
        text: 'Hello Carlos',
        overrides: {
          color: 'red',
          fontsize: 12,
        },
      }
    );
  }

  private fibTrendExt(time?: number, price?: number) {
    if (this._tvWidget) {
      this._tvWidget.chart().createMultipointShape(
        [
          { time: this.getNumberDateTime('10/23/2019'), price: 250 },
          { time: this.getNumberDateTime('10/24/2019'), price: 305 },
          { time: this.getNumberDateTime('10/25/2019'), price: 289 },
        ],
        {
          shape: 'fib_trend_ext',
          lock: true,
          disableSelection: true,
          disableSave: true,
          disableUndo: true,
          overrides: {
            'trendline.visible': false,
            'level10.visible': false,
            'level9.visible': false,
            'level11.visible': false,
            'level1.visible': false,
            'level2.visible': false,
            transparency: 95,
            extendLines: 'true',
            showCoeffs: true,
          },
        }
      );
    }
  }

  private fibTrendExtABC(
    aPrice: number,
    bPrice: number,
    cPrice: number,
    aDate: Date,
    bDate: Date,
    cDate: Date
  ) {
    if (this._tvWidget) {
      this._tvWidget.chart().createMultipointShape(
        [
          { time: this.getNumberDateTime(aDate.toString()), price: aPrice },
          { time: this.getNumberDateTime(bDate.toString()), price: bPrice },
          { time: this.getNumberDateTime(cDate.toString()), price: cPrice },
        ],
        {
          shape: 'fib_trend_ext',
          lock: false,
          disableSelection: false,
          disableSave: true,
          disableUndo: true,
          overrides: {
            'trendline.visible': false,
            'level10.visible': false,
            'level9.visible': false,
            'level11.visible': false,
            'level1.visible': false,
            'level2.visible': false,
            transparency: 95,
            extendLines: 'true',
            showCoeffs: true,
          },
        }
      );
    }
  }

  private getNumberDateTimeWithMonthsAgo(
    date: string,
    monthsAgo: number
  ): number {
    return new Date(date).valueOf() / 1000 - monthsAgo * 30 * 24 * 60 * 60;
  }

  private getNumberDateTime(date: string): number {
    return new Date(date).valueOf() / 1000;
  }

  private getUTCUnixDate(date: Date) {
    const baseDate = new Date(date);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const day = baseDate.getDate();
    return Date.UTC(year, month, day) / 1000;
  }

  oneMonthAfter(date: Date) {
    const oneMonthAfter = Math.floor(
      date.valueOf() / 1000 + 1 * 30 * 24 * 60 * 60
    );

    return oneMonthAfter;
  }

  sixMonthAfterUTC(date: number) {
    const oneMonthAfter = Math.floor(date + 6 * 30 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  oneMonthAfterUTC(date: number) {
    const oneMonthAfter = Math.floor(date + 1 * 30 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  oneWeekAfterUTC(date: number) {
    const oneMonthAfter = Math.floor(date + 1 * 4 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  twoWeekAfterUTC(date: number) {
    const oneMonthAfter = Math.floor(date + 2 * 7 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  sixMonthsBeforeUTC(date: number) {
    const oneMonthAfter = Math.floor(date - 6 * 30 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  twelveMonthsBeforeUTC(date: number) {
    const oneMonthAfter = Math.floor(date - 12 * 30 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  twoMonthsBeforeUTC(date: number) {
    const oneMonthAfter = Math.floor(date - 2 * 30 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  threeMonthsBeforeUTC(date: number) {
    const oneMonthAfter = Math.floor(date - 3 * 30 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  oneDayAfterUTC(date: number) {
    const oneMonthAfter = Math.floor(date + 1 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  ngOnDestroy() {
    if (this._tvWidget !== null) {
      this._tvWidget.remove();
      this._tvWidget = null;
    }
  }

  onCreateStudy(widget, marksType) {
    if (marksType === 'stoch307bull') {
      widget
        .chart()
        .createStudy('Stochastic', false, false, [14, 5, 5], null, {
          '%d.color': '#E3FFCA',
          '%k.color': '#00FF00',
        })
        .then((id) => {
          this.studyIds.push(id);
        });

      widget
        .chart()
        .createStudy('Moving Average', false, true, [7], {
          'plot.color.0': '#44bcd8',
        })
        .then((id) => {
          this.studyIds.push(id);
        });

      widget
        .chart()
        .createStudy('Moving Average', false, true, [13], {
          'plot.color.0': '#e07b39',
        })
        .then((id) => {
          this.studyIds.push(id);
        });

      widget
        .chart()
        .createStudy('Choppiness Index', false, true, [14], {
          'plot.color.0': '#44bcd8',
        })
        .then((id) => {
          this.studyIds.push(id);
        });

      widget
        .chart()
        .createStudy('Bollinger Bands', false, true, [20], {
          'plot.color.0': '#44bcd8',
        })
        .then((id) => {
          this.studyIds.push(id);
        });
    } else {
      widget.chart().createStudy('Stochastic', false, false, [14, 5, 5], null, {
        '%d.color': '#E3FFCA',
        '%k.color': '#00FF00',
      });

      widget
        .chart()
        .createStudy('MACD', false, false, [8, 17, 'close', 9], null, {
          'macd.color': '#00FF00',
          'signal.color': '#fffa00',
          'histogram.color': '#00F9FF',
        });

      widget.chart().createStudy(
        'Moving Average',
        false,
        true,
        [10],
        function (guid) {
          console.log(guid);
        },
        { 'plot.color.0': '#fffa00' }
      );
    }
  }

  // onWidgetReady(tradingviewComponent, widget, stockChartSignalService) {
  //     widget.onChartReady(function() {

  //         if(tradingviewComponent.marksType === 'stoch307bull') {
  //             widget.chart().createStudy(
  //                 'Stochastic',
  //                 false,
  //                 false,
  //                 [10, 1, 1],
  //                 null,
  //                 {'%d.color' : '#E3FFCA', '%k.color' : '#00FF00'}
  //             );

  //             widget.chart().createStudy(
  //                 'Moving Average',
  //                 false,
  //                 true, [
  //                     7
  //                 ], function (guid) {
  //                     console.log(guid);
  //                 },
  //                 {'plot.color.0' : '#fffa00'}
  //             );
  //         } else {
  //             widget.chart().createStudy(
  //                 'Stochastic',
  //                 false,
  //                 false,
  //                 [14, 5, 5],
  //                 null,
  //                 {'%d.color' : '#E3FFCA', '%k.color' : '#00FF00'}
  //             );

  //             widget.chart().createStudy(
  //                 'MACD',
  //                 false,
  //                 false,
  //                 [8, 17, 'close', 9],
  //                 null,
  //                 {'macd.color' : '#00FF00', 'signal.color' : '#fffa00', 'histogram.color' : '#00F9FF'}
  //             );

  //             widget.chart().createStudy(
  //                 'Moving Average',
  //                 false,
  //                 true, [
  //                     10
  //                 ], function (guid) {
  //                     console.log(guid);
  //                 },
  //                 {'plot.color.0' : '#fffa00'}
  //             );

  //         }

  //         //this.onCreateStudy(widget, tradingviewComponent.marksType);

  //         tradingviewComponent.setChartObject.bind(tradingviewComponent)(widget.chart());

  //         const from = tradingviewComponent.monthAdd(new Date(), -60).toString();
  //         const to = new Date();

  //         if(tradingviewComponent.marksType === 'gap') {
  //             stockChartSignalService.getGapSignalsWithFibProjections(from, to.toString(), tradingviewComponent.symbol)
  //                 .subscribe(
  //                     stockSignals => {
  //                         tradingviewComponent.signals = stockSignals.map((g) => {
  //                             return {label: moment(new Date(g.signalDate * 1000)).format('ll'), value: g}
  //                         });

  //                         this.gapSignals = stockSignals;
  //                         for (const signal of this.gapSignals){
  //                             let confirmationEntryPrice = 0;

  //                             if (signal.direction === 'up') {
  //                                 confirmationEntryPrice = signal.high;
  //                             } else if (signal.direction === 'down') {
  //                                 confirmationEntryPrice = signal.projection618;
  //                             }
  //                         }

  //                     },
  //                     error => this.errorMessage = <any>error
  //                 );
  //         } else {
  //             stockChartSignalService.getThreeArrowSignalsWithFibProjections(from, to.toString(), tradingviewComponent.symbol)
  //                 .subscribe(
  //                     stockSignals => {
  //                         tradingviewComponent.signals = stockSignals.map((g) => {
  //                             return {label: moment(new Date(g.signalDate * 1000)).format('ll'), value: g}
  //                         });
  //                     },
  //                     error => this.errorMessage = <any>error
  //                 );
  //         }
  //         //tradingviewComponent.getPaidMemberStudies();

  //     }); // end of widget.onChartReady
  // }
}
