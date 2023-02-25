import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, shareReplay } from 'rxjs';
import { ResponseTypes } from 'src/app/shared/models/responseTypes';
import { SingleResponseDto } from 'src/app/shared/models/singleResponseDto';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Warehouses } from '../../warehouses/model/warehouses';
import { StockLocations } from '../model/stock-locations';

@Injectable({
  providedIn: 'root',
})
export class StockLocationsDataService {
  apiDepolar = 'Depolar';
  apiDepoStokYerleri = 'DepoStokYerleri';

  // 1.0 Stock Locations List
  stockLocationsListLoading$ = new BehaviorSubject<boolean>(false);
  private _stockLocationsListSubject = new BehaviorSubject<any[] | null>(null);
  stockLocationsList$: Observable<StockLocations[]> =
    this._stockLocationsListSubject;
  get stockLocationsList() {
    return this._stockLocationsListSubject.value;
  }

  // 2.0 Stock Locations Details
  // 2.1 Stock Locations - Warehouse Ids Dropdown
  stockLocationsWarehouseIdsLoading$ = new BehaviorSubject<boolean>(false);
  private _stockLocationsWarehouseIdsSubject = new BehaviorSubject<
    any[] | null
  >(null);
  stockLocationsWarehouseIds$: Observable<StockLocations[]> =
    this._stockLocationsWarehouseIdsSubject;
  get stockLocationsWarehouseId() {
    return this._stockLocationsWarehouseIdsSubject.value;
  }

  constructor(private repositoryService: RepositoryService) {}

  getStockLocationsList() {
    if (this._stockLocationsListSubject.value === null) {
      this.stockLocationsListLoading$.next(true);
    }
    return this.repositoryService
      .getList<StockLocations>(this.apiDepoStokYerleri + '/getall')
      .pipe(finalize(() => this.stockLocationsListLoading$.next(false)))
      .subscribe((response) => {
        if (
          JSON.stringify(this._stockLocationsListSubject.value) !==
          JSON.stringify(response)
        )
          this._stockLocationsListSubject.next(response);
      });
  }

  addStockLocation(stockLocationToAdd: StockLocations): Observable<any> {
    let obs$: Observable<any> = this.repositoryService
      .create<SingleResponseDto<StockLocations>>(
        this.apiDepoStokYerleri,
        stockLocationToAdd
      )
      .pipe(shareReplay(1));
    obs$.subscribe((response) => {
      this._stockLocationsListSubject.next([
        ...this.stockLocationsList,
        response.data,
      ]);
    });
    return obs$;
  }

  updateStockLocation(stockLocationToUpdate: StockLocations): Observable<any> {
    let obs$: Observable<any> = this.repositoryService
      .update<SingleResponseDto<StockLocations>>(
        this.apiDepoStokYerleri,
        stockLocationToUpdate,
        ResponseTypes.Json
      )
      .pipe(shareReplay(1));
    obs$.subscribe(() => {
      this._stockLocationsListSubject.next(
        this.stockLocationsList.map((stockLocation) =>
          stockLocation.id === stockLocationToUpdate.id
            ? stockLocationToUpdate
            : stockLocation
        )
      );
    });
    return obs$;
  }

  deleteStockLocation(id: number) {
    let obs$: Observable<any> = this.repositoryService
      .delete(this.apiDepoStokYerleri, { id: id })
      .pipe(shareReplay(1));
    obs$.subscribe((response) => {
      this._stockLocationsListSubject.next(
        this.stockLocationsList.filter(
          (stockLocation) => stockLocation.id !== id
        )
      );
    });
    return obs$;
  }

  // 2.0 Warehouse Details
  // 2.1 Warehouse Groups
  getStockLocationsWarehouseIds() {
    if (this._stockLocationsWarehouseIdsSubject.value === null) {
      this.stockLocationsWarehouseIdsLoading$.next(true);
    }
    return this.repositoryService
      .getList<Warehouses>(this.apiDepolar + '/getall')
      .pipe(finalize(() => this.stockLocationsWarehouseIdsLoading$.next(false)))
      .subscribe((response) => {
        if (
          JSON.stringify(this._stockLocationsWarehouseIdsSubject.value) !==
          JSON.stringify(response)
        )
          this._stockLocationsWarehouseIdsSubject.next(response);
      });
  }
}
