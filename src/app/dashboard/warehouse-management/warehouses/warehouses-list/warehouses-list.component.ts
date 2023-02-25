import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { WarehouseDataService } from '../services/warehouse-data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Constants } from 'src/app/shared/constants';
import { Warehouses, WarehousesColumns } from '../model/warehouses';
import { TranslateService as TranslateServiceCore } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-warehouses-list',
  templateUrl: './warehouses-list.component.html',
  styleUrls: ['./warehouses-list.component.css'],
})
export class WarehousesListComponent implements OnInit {
  Constants = Constants;
  cols = WarehousesColumns.cols;
  contextMenuItems: MenuItem[];

  warehouseListloading$: Observable<boolean>;
  warehouseList$: Observable<Warehouses[]>;
  selectedWarehouse: Warehouses;

  constructor(
    private warehouseDataService: WarehouseDataService,
    private authService: AuthService,
    private translateServiceCore: TranslateServiceCore,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.warehouseListloading$ =
      this.warehouseDataService.warehouseListloading$;
    this.warehouseDataService.getWarehouseList();
    this.warehouseList$ = this.warehouseDataService.warehouseList$;
    this.setContextMenu();
  }

  onContextMenuSelection(selectedWarehouse:Warehouses) {
    this.selectedWarehouse = selectedWarehouse;
  }

  setContextMenu() {
    this.authService.loggedUser$
      .pipe(untilDestroyed(this))
      .subscribe((loggedUser) => {
        this.contextMenuItems = [
          {
            label: this.translateServiceCore.instant('Delete'),
            id: 'Delete',
            icon: 'pi pi-fw pi-times',
            visible: !this.selectedWarehouse?.isDeleted,
            command: () =>
              this.deleteSelectedWarehouseConfirm(this.selectedWarehouse),
            disabled: !loggedUser.hasClaim(Constants.Claims.Depolar.Silme),
          },
        ];
      });
  }

  deleteSelectedWarehouseConfirm(selectedWarehouse: Warehouses) {
    this.confirmationService.confirm({
      message:
        selectedWarehouse.kod +
        ' kodlu depo silinecektir. Devam etmek istiyor musunuz?',
      header: this.translateServiceCore.instant('Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.warehouseDataService.deleteWarehouse(selectedWarehouse.id);
      },
    });
  }
}
