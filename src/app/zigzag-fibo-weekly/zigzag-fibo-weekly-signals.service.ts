import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IZigZagFiboSignal } from '../shared/models/zigzag-fibo-signal';

@Injectable({
  providedIn: 'root',
})
export class ZigzagFiboWeeklySignalsService {
  private _stockQuotesAndIndicatorssUrlBase = environment.udfApiBaseUrl;
  marksType = 'Carlos';

  constructor(private _http: HttpClient) {}

  getZigZagFibSignalByDateRange(
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

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json() || 'Server Error');
  }
}
