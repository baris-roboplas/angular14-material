import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { ClaimGuard } from 'src/app/auth/guards/claim.guard';
import { Constants } from 'src/app/shared/constants';
import { PendingChangesGuard } from 'src/app/shared/guards/pending-changes.guard';
import { CustomRouteResolverService } from 'src/app/shared/services/custom-route-resolver.service';
import { StockLocationsDetailsComponent } from './stock-locations-details/stock-locations-details.component';
import { StockLocationsListComponent } from './stock-locations-list/stock-locations-list.component';
import { StockLocationsComponent } from './stock-locations.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, ClaimGuard],
    data: { breadcrumb: 'Stock Locations' },
    component: StockLocationsComponent,
  },
  {
    path: Constants.Paths.StockLocations.List,
    data: {
      breadcrumb: 'Stock Locations List',
      claim: Constants.Claims.StokYerleri.Goruntuleme,
    },
    component: StockLocationsListComponent,
  },
  {
    path: Constants.Paths.New,
    data: {
      breadcrumb: 'New Stock Location',
      claim: Constants.Claims.StokYerleri.Kayit,
    },
    component: StockLocationsDetailsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: Constants.Paths.StockLocations.List + '/' + ':id',
    data: {
      apiPath: 'DepoStokYerleri/getbyid',
      breadcrumb: (data: any) => `${data.selectedStockLocation?.kod}`,
    },
    resolve: { selectedStockLocation: CustomRouteResolverService },
    canDeactivate: [PendingChangesGuard],
    component: StockLocationsDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockLocationsRoutingModule {}
