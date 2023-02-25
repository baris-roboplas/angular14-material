import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseGroupsRoutingModule } from './warehouse-groups-routing.module';
import { WarehouseGroupsListComponent } from './warehouse-groups-list/warehouse-groups-list/warehouse-groups-list.component';
import { WarehouseGroupsComponent } from './warehouse-groups.component';
import { WmSharedModule } from '../wm-shared/wm-shared.module';

@NgModule({
  declarations: [WarehouseGroupsListComponent, WarehouseGroupsComponent],
  imports: [CommonModule, WarehouseGroupsRoutingModule, WmSharedModule],
})
export class WarehouseGroupsModule {}
