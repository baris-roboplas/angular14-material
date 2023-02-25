import { NgModule } from '@angular/core';
import { WareHousesRoutingModule } from './warehouses-routing.module';
import { WarehousesComponent } from './warehouses.component';
import { WarehousesListComponent } from './warehouses-list/warehouses-list.component';
import { WarehousesDetailsComponent } from './warehouses-details/warehouses-details.component';
import { WmSharedModule } from '../wm-shared/wm-shared.module';
import { StockLocationsModule } from '../stock-locations/stock-locations.module';

@NgModule({
  declarations: [
    WarehousesComponent,
    WarehousesListComponent,
    WarehousesDetailsComponent,
  ],
  imports: [WmSharedModule, WareHousesRoutingModule, StockLocationsModule],
})
export class WareHousesModule {}
