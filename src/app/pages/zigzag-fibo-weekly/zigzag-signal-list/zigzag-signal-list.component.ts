import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { IZigZagFiboSignal } from 'src/app/shared/models/zigzag-fibo-signal';
import { ZigzagFiboWeeklySignalsService } from '../zigzag-fibo-weekly-signals.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-zigzag-signal-list',
  templateUrl: './zigzag-signal-list.component.html',
  styleUrls: ['./zigzag-signal-list.component.scss'],
})
export class ZigzagSignalListComponent implements OnInit {
  zigZagFibSignalsUp$: Observable<IZigZagFiboSignal[]>;
  defaultSelected = 0;
  selectedSignal: IZigZagFiboSignal;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'selected',
    'symbol',
    'zigzagType',
    'isPublished',
  ];
  selection = new SelectionModel<IZigZagFiboSignal>(true, []);
  loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private zigzagSignalService: ZigzagFiboWeeklySignalsService) {}

  ngOnInit(): void {
    this.getSignals();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  selectSingleSignal(element: IZigZagFiboSignal) {
    this.dataSource.data.forEach(
      (row: IZigZagFiboSignal) => (row.highlighted = false)
    );
    element.highlighted = !element.highlighted;
    this.selectedSignal = element;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) =>
          this.selection.select(row as IZigZagFiboSignal)
        );
  }

  saveSelection() {
    this.zigzagSignalService
      .publishWeeklyZigZagFibPremiumSignals(this.selection.selected)
      .subscribe((x) => this.getSignals());
    //this.selection.selected.forEach((r) => console.log(r.symbol));
  }

  getSignals() {
    this.loading = true;
    this.zigZagFibSignalsUp$ = this.zigzagSignalService
      .getWeeklyZigZagFibPremiumSignalByDateRange(null, null)
      .pipe(
        filter((signals) => signals != null),
        map(
          (response) =>
            response.body.signals.filter((s) => s.activationDirection === 'UP')
          // .map((s, i) => {
          //   s.id = i + 1;
          //   s.highlighted = false;
          //   return s;
          // })
        )
      );

    this.zigZagFibSignalsUp$.subscribe((data) => {
      this.loading = false;
      this.dataSource.data = data;
    });
  }

  updatePublished() {}
}
