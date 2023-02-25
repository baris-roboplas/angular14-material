import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { ClaimGuard } from 'src/app/auth/guards/claim.guard';
import { Constants } from 'src/app/shared/constants';
import { PendingChangesGuard } from 'src/app/shared/guards/pending-changes.guard';
import { CustomRouteResolverService } from 'src/app/shared/services/custom-route-resolver.service';
import { WarehousesDetailsComponent } from './warehouses-details/warehouses-details.component';
import { WarehousesListComponent } from './warehouses-list/warehouses-list.component';
import { WarehousesComponent } from './warehouses.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, ClaimGuard],
    data: { breadcrumb: 'Warehouses' },
    component: WarehousesComponent,
  },
  {
    path: Constants.Paths.Warehouses.List,
    data: {
      breadcrumb: 'Warehouse List',
      claim: Constants.Claims.Depolar.Goruntuleme,
    },
    component: WarehousesListComponent,
  },
  {
    path: Constants.Paths.New,
    data: {
      breadcrumb: 'New Warehouse',
      claim: Constants.Claims.Depolar.Kayit,
    },
    component: WarehousesDetailsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: Constants.Paths.Warehouses.List + '/' + ':id',
    data: {
      apiPath: 'Depolar/getbyid',
      breadcrumb: (data: any) => `${data.selectedWarehouse?.kod}`,
    },
    resolve: { selectedWarehouse: CustomRouteResolverService },
    canDeactivate: [PendingChangesGuard],
    component: WarehousesDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WareHousesRoutingModule {}
