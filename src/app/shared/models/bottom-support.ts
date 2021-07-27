export interface IBottomSupportSignal {
  id: number;
  symbol: string;
  supportPrice1618: number;
  supportPrice2618: number;
  supportPrice4236: number;
  supportPrice6854: number;
  aClose: number;
  aOpen: number;
  bClose: number;
  bOpen: number;
  cClose: number;
  cOpen: number;
  timeStampDateTime: Date;
  aTimeStampDateTime: Date;
  bTimeStampDateTime: Date;
  cTimeStampDateTime: Date;
  //zigzagType: string;
}
