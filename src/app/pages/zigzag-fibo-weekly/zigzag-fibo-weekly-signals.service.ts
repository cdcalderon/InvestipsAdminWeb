import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IZigZagFiboSignal } from 'src/app/shared/models/zigzag-fibo-signal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ZigzagFiboWeeklySignalsService {
  private _stockQuotesAndIndicatorssUrlBase = environment.udfApiBaseUrl;
  marksType = 'Carlos';

  constructor(private _http: HttpClient) {}

  getWeeklyZigZagFibPremiumSignalByDateRange(
    from: string,
    to: string
  ): Observable<IZigZagFiboSignal[]> {
    let params = new HttpParams();
    params = params.append('symbol', 'AAPL');

    const apiRequestUrl = `${this._stockQuotesAndIndicatorssUrlBase}/api/signals/zigzagfibosignalsbydaterange`;
    return this._http.get(apiRequestUrl, { params }).pipe(
      map((response) => {
        return response as IZigZagFiboSignal[];
      }),
      tap((data) => console.log('All Signals: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getWeeklyZigZagFibPremiumSignalById(
    signalId: number | string
  ): Observable<IZigZagFiboSignal> {
    // let params = new HttpParams();
    // params = params.append('signalid', id);

    const apiRequestUrl = `${this._stockQuotesAndIndicatorssUrlBase}/api/weeklyzigzagfibpremiumsignal/${signalId}`;
    return this._http.get<IZigZagFiboSignal>(apiRequestUrl).pipe(
      tap((data) => console.log('All Signals: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json() || 'Server Error');
  }
}
