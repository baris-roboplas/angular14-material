import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Constants } from 'src/app/shared/constants';
import {
  StockLocations,
  StockLocationsColumns,
} from '../model/stock-locations';
import { TranslateService as TranslateServiceCore } from '@ngx-translate/core';
import { StockLocationsDataService } from '../services/stock-locations-data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Warehouses } from '../../warehouses/model/warehouses';

@UntilDestroy()
@Component({
  selector: 'app-stock-locations-list',
  templateUrl: './stock-locations-list.component.html',
  styleUrls: ['./stock-locations-list.component.css'],
})
export class StockLocationsListComponent implements OnInit {
  Constants = Constants;
  cols = StockLocationsColumns.cols;
  contextMenuItems: MenuItem[];

  stockLocationsListloading$: Observable<boolean>;
  stockLocationsList$: Observable<any>;
  selectedStockLocation: StockLocations;

  constructor(
    private stockLocationsDataService: StockLocationsDataService,
    private authService: AuthService,
    private translateServiceCore: TranslateServiceCore,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.stockLocationsListloading$ =
      this.stockLocationsDataService.stockLocationsListLoading$;
    this.stockLocationsDataService.getStockLocationsList();
    this.stockLocationsList$ =
      this.stockLocationsDataService.stockLocationsList$;
    this.setContextMenu();
  }

  onContextMenuSelection(selectedStockLocation: StockLocations) {
    this.selectedStockLocation = selectedStockLocation;
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
            command: () =>
              this.deleteSelectedStockLocationConfirm(
                this.selectedStockLocation
              ),
            disabled: !loggedUser.hasClaim(Constants.Claims.StokYerleri.Silme),
          },
        ];
      });
  }

  deleteSelectedStockLocationConfirm(selectedStockLocation: StockLocations) {
    this.confirmationService.confirm({
      message:
        selectedStockLocation.kod +
        ' kodlu depo silinecektir. Devam etmek istiyor musunuz?',
      header: this.translateServiceCore.instant('Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.stockLocationsDataService.deleteStockLocation(
          selectedStockLocation.id
        );
      },
    });
  }
}
