import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from '../shared/constants';
import { WarehouseManagementComponent } from './warehouse-management.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { breadcrumb: 'Warehouse Management' },
    component: WarehouseManagementComponent,
  },
  {
    path: Constants.Paths.Warehouses.Index,
    loadChildren: () =>
      import('./warehouses/warehouses.module').then((m) => m.WareHousesModule),
  },
  {
    path: Constants.Paths.StockLocations.Index,
    loadChildren: () =>
      import('./stock-locations/stock-locations.module').then(
        (m) => m.StockLocationsModule
      ),
  },
  {
    path: Constants.Paths.WarehouseGroups.Index,
    loadChildren: () =>
      import('./warehouse-groups/warehouse-groups.module').then(
        (m) => m.WarehouseGroupsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseManagementRoutingModule {}
