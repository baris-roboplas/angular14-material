import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { ClaimGuard } from 'src/app/auth/guards/claim.guard';
import { Constants } from 'src/app/shared/constants';
import { WarehouseGroupsListComponent } from './warehouse-groups-list/warehouse-groups-list/warehouse-groups-list.component';
import { WarehouseGroupsComponent } from './warehouse-groups.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, ClaimGuard],
    data: { breadcrumb: 'Warehouse Groups' },
    component: WarehouseGroupsComponent,
  },
  {
    path: Constants.Paths.WarehouseGroups.List,
    data: {
      breadcrumb: 'Warehouse Groups List',
      claim: Constants.Claims.DepoGruplari.Goruntuleme,
    },
    component: WarehouseGroupsListComponent,
    canActivate: [AuthGuard, ClaimGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseGroupsRoutingModule {}
