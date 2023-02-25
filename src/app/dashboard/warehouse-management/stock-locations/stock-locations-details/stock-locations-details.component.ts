import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { FormBaseComponent } from 'src/app/shared/components/form-base/form-base.component';
import { Constants } from 'src/app/shared/constants';
import { PrimengService } from 'src/app/shared/services/primeng.service';
import { ToastrTranslateService } from 'src/app/shared/services/toastr-translate.service';
import { StockLocations } from '../model/stock-locations';
import { StockLocationsDataService } from '../services/stock-locations-data.service';

@UntilDestroy()
@Component({
  selector: 'app-stock-locations-details',
  templateUrl: './stock-locations-details.component.html',
  styleUrls: ['./stock-locations-details.component.css'],
})
export class StockLocationsDetailsComponent
  extends FormBaseComponent
  implements OnInit
{
  Constants = Constants;
  selectedStockLocation: StockLocations;
  stockLocationsWarehouseIdsLoading$: Observable<boolean>;
  stockLocationsWarehouseIds$: Observable<StockLocations[]>;

  stockLocationForm: UntypedFormGroup;
  stockLocationDialog: boolean = false;

  initialFormValue = {
    id: [null],
    depoId: [null, Validators.required],
    kod: [null, Validators.required],
    en: [null],
    boy: [null],
    yukseklik: [null],
    aciklama: [null, Validators.required],
    rowVersion: [null],
  };

  constructor(
    private stockLocationsDataService: StockLocationsDataService,
    private formBuilder: UntypedFormBuilder,
    private toastrTranslateService: ToastrTranslateService,
    private route: ActivatedRoute,
    private router: Router,
    public primeService: PrimengService,

  ) {
    super();
  }

  ngOnInit(): void {
    this.stockLocationsWarehouseIds$ =
      this.stockLocationsDataService.stockLocationsWarehouseIds$;
    this.stockLocationsWarehouseIdsLoading$ =
      this.stockLocationsDataService.stockLocationsListLoading$;

    this.stockLocationsDataService.getStockLocationsWarehouseIds();

    this.createStockLocationForm();

    if (!!this.route.snapshot.paramMap.get('id')) {
      this.setStockLocationFromRoute();
    } else {
      this.stockLocationForm.patchValue(this.route.snapshot.queryParams);
    }
  }

  createStockLocationForm(formValue = this.initialFormValue) {
    this.stockLocationForm = this.formBuilder.group(formValue);
    this.formGroups.push(this.stockLocationForm);

  }

  showPopUp() {
    this.createStockLocationForm();
    this.stockLocationDialog = true;
  }

  onSave() {
    if (this.stockLocationForm.valid) {
      let stockLocationAddFormValue = this.stockLocationForm.value;
      if (stockLocationAddFormValue.id === 0 || !stockLocationAddFormValue.id) {
        this.addStockLocation();
      } else {
        this.updateStockLocation();
      }
    } else {
      this.toastrTranslateService.error();
    }
  }

  addStockLocation() {
    this.stockLocationsDataService
      .addStockLocation(this.stockLocationForm.value)
      .subscribe(() => {
        this.stockLocationForm.reset();
      });
  }

  updateStockLocation() {
    this.stockLocationsDataService
      .updateStockLocation(this.stockLocationForm.value)
      .subscribe((response) => {
        this.primeService.patchObject(this.selectedStockLocation, response.data);
        this.patchRowVersion(response.data);
        this.stockLocationForm.markAsPristine();
      });
  }

  setStockLocationFromRoute() {
    this.route.data.pipe(untilDestroyed(this)).subscribe((data) => {
      if (!data.selectedStockLocation)
        this.router.navigate([Constants.Paths.NotFound], { replaceUrl: true });
      else {
        this.selectedStockLocation = data.selectedStockLocation;
        this.stockLocationForm.patchValue(this.selectedStockLocation);
      }
    });
  }
}
