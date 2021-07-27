export interface IWeeklyFutureFiboSignal {
  id: number;
  symbol: string;
  weekNumber: number;
  isFutureNextWeekFibActivatedUp: boolean;
  isFutureNextWeekFibActivatedDown: boolean;
  currentWeekFibSupport: number;
  currentWeekFibResistence: number;
  currentWeekFibSupportRelaxed: number;
  currentWeekFibResistenceRelaxed: number;
  ironCondorUpLeg: number;
  ironCondorDownLeg: number;
  close: number;
  timeStampDateTime: Date;
  dateOfFirstDayOfWeek: Date;
  support?: number;
  resistence?: number;

  activationDirection: string;
  activationPrice: number;
  activationDate: Date;
  aLow: number;
  aFib: number;
  bFib: number;
  cFib: number;
  aDate: Date;
  bDate: Date;
  cDate: Date;
  zigzagType: string;
}
