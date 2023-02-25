import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, shareReplay } from 'rxjs';
import { ResponseTypes } from 'src/app/shared/models/responseTypes';
import { SingleResponseDto } from 'src/app/shared/models/singleResponseDto';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { WarehouseGroups } from '../model/warehouse-groups';

@Injectable({
  providedIn: 'root',
})
export class WarehouseGroupsDataService {
  apiDepoGruplari = 'DepoGruplari';

  // 1.0 Warehouse Groups List
  warehouseGroupsListLoading$ = new BehaviorSubject<boolean>(false);

  private _warehouseGroupsListSubject = new BehaviorSubject<any[] | null>(null);
  warehouseGroupsList$: Observable<WarehouseGroups[]> =
    this._warehouseGroupsListSubject;
  get warehouseGroupsList() {
    return this._warehouseGroupsListSubject.value;
  }

  constructor(private repositoryService: RepositoryService) {}

  getWarehouseGroupsList() {
    if (this._warehouseGroupsListSubject.value === null) {
      this.warehouseGroupsListLoading$.next(true);
    }
    return this.repositoryService
      .getList<WarehouseGroups>(this.apiDepoGruplari + '/getall')
      .pipe(finalize(() => this.warehouseGroupsListLoading$.next(false)))
      .subscribe((response) => {
        if (
          JSON.stringify(this._warehouseGroupsListSubject.value) !==
          JSON.stringify(response)
        )
          this._warehouseGroupsListSubject.next(response);
      });
  }
  addWarehouseGroup(warehouseGroupToAdd: WarehouseGroups) {
    let obs$: Observable<any> = this.repositoryService
      .create<SingleResponseDto<WarehouseGroups>>(
        this.apiDepoGruplari,
        warehouseGroupToAdd
      )
      .pipe(shareReplay(1));
    obs$.subscribe((response) => {
      this._warehouseGroupsListSubject.next([
        ...this.warehouseGroupsList,
        response.data,
      ]);
    });
    return obs$;
  }
  updateWarehouseGroup(warehouseGroupToUpdate: WarehouseGroups) {
    let obs$: Observable<any> = this.repositoryService
      .update<SingleResponseDto<WarehouseGroups>>(
        this.apiDepoGruplari,
        warehouseGroupToUpdate,
        ResponseTypes.Text
      )
      .pipe(shareReplay(1));
    obs$.subscribe(() => {
      this._warehouseGroupsListSubject.next(
        this.warehouseGroupsList.map((warehouse) =>
          warehouse.id === warehouseGroupToUpdate.id
            ? warehouseGroupToUpdate
            : warehouse
        )
      );
    });
    return obs$;
  }
  deleteWarehouseGroup(id: number) {
    let obs$: Observable<any> = this.repositoryService
      .delete(this.apiDepoGruplari, { id: id })
      .pipe(shareReplay(1));
    obs$.subscribe(() => {
      this._warehouseGroupsListSubject.next(
        this.warehouseGroupsList.filter((warehouse) => warehouse.id !== id)
      );
    });
    return obs$;
  }
}
