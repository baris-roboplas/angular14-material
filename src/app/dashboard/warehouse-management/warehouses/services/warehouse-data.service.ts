import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { SingleResponseDto } from 'src/app/shared/models/singleResponseDto';
import { Warehouses } from '../model/warehouses';
import { ResponseTypes } from 'src/app/shared/models/responseTypes';
@Injectable({
  providedIn: 'root',
})
export class WarehouseDataService {
  // api
  apiDepolar = 'Depolar';
  apiDepoGruplari = 'DepoGruplari';
  apiPersoneller = 'personeller';

  // 1.0 Warehouse List
  warehouseListloading$ = new BehaviorSubject<boolean>(false);

  private _warehouseListSubject = new BehaviorSubject<Warehouses[] | null>(
    null
  );
  warehouseList$: Observable<Warehouses[]> = this._warehouseListSubject;
  get warehouseList() {
    return this._warehouseListSubject.value;
  }

  constructor(private repositoryService: RepositoryService) {}

  // 1.0 Warehouse List
  getWarehouseList() {
    if (this._warehouseListSubject.value === null) {
      this.warehouseListloading$.next(true);
    }
    return this.repositoryService
      .getList<Warehouses>(this.apiDepolar + '/getall')
      .pipe(finalize(() => this.warehouseListloading$.next(false)))
      .subscribe((response) => {
        if (
          JSON.stringify(this._warehouseListSubject.value) !==
          JSON.stringify(response)
        )
          this._warehouseListSubject.next(response);
      });
  }

  addWarehouse(warehouseToAdd: Warehouses): Observable<any> {
    let obs$: Observable<any> = this.repositoryService
      .create<SingleResponseDto<Warehouses>>(this.apiDepolar, warehouseToAdd)
      .pipe(shareReplay(1));
    obs$.subscribe((response) => {
      this._warehouseListSubject.next([...this.warehouseList, response.data]);
    });
    return obs$;
  }

  updateWarehouse(warehouseToUpdate: Warehouses): Observable<any> {
    let obs$: Observable<any> = this.repositoryService
      .update<SingleResponseDto<Warehouses>>(this.apiDepolar, warehouseToUpdate, ResponseTypes.Json)
      .pipe(shareReplay(1));
    obs$.subscribe(() => {
      this._warehouseListSubject.next(
        this.warehouseList.map((warehouse) =>
          warehouse.id === warehouseToUpdate.id ? warehouseToUpdate : warehouse
        )
      );
    });
    return obs$;
  }

  deleteWarehouse(id: number) {
    let obs$: Observable<any> = this.repositoryService
      .delete(this.apiDepolar, { id: id })
      .pipe(shareReplay(1));
    obs$.subscribe((response) => {
      this._warehouseListSubject.next(
        this.warehouseList.filter((warehouse) => warehouse.id !== id)
      );
    });
    return obs$;
  }
}
