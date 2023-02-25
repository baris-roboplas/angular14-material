import { NgModule } from '@angular/core';
import { StockLocationsRoutingModule } from './stock-locations-routing.module';
import { StockLocationsComponent } from './stock-locations.component';
import { StockLocationsDetailsComponent } from './stock-locations-details/stock-locations-details.component';
import { StockLocationsListComponent } from './stock-locations-list/stock-locations-list.component';
import { WmSharedModule } from '../wm-shared/wm-shared.module';

@NgModule({
  declarations: [
    StockLocationsComponent,
    StockLocationsDetailsComponent,
    StockLocationsListComponent,
  ],
  imports: [WmSharedModule, StockLocationsRoutingModule],
  exports: [
    StockLocationsComponent,
    StockLocationsDetailsComponent,
    StockLocationsListComponent,
  ],
})
export class StockLocationsModule {}
