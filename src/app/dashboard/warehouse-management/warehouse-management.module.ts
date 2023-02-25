import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseManagementRoutingModule } from './warehouse-management-routing.module';
import { WarehouseManagementComponent } from './warehouse-management.component';
import { WmSharedModule } from './wm-shared/wm-shared.module';

@NgModule({
  declarations: [WarehouseManagementComponent],
  imports: [CommonModule, WmSharedModule, WarehouseManagementRoutingModule],
})
export class WarehouseManagementModule {}
