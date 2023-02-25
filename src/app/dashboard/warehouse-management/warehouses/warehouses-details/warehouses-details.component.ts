import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { DepartmentEnum } from 'src/app/constants-page/department/models/departman';
import { FormBaseComponent } from 'src/app/shared/components/form-base/form-base.component';
import { Constants } from 'src/app/shared/constants';
import { PrimengService } from 'src/app/shared/services/primeng.service';
import { ToastrTranslateService } from 'src/app/shared/services/toastr-translate.service';
import { WarehouseGroups } from '../../warehouse-groups/model/warehouse-groups';
import { WarehouseGroupsDataService } from '../../warehouse-groups/services/warehouse-groups-data.service';
import { Warehouses } from '../model/warehouses';
import { WarehouseDataService } from '../services/warehouse-data.service';

@UntilDestroy()
@Component({
  selector: 'app-warehouses-details',
  templateUrl: './warehouses-details.component.html',
  styleUrls: ['./warehouses-details.component.css'],
})
export class WarehousesDetailsComponent
  extends FormBaseComponent
  implements OnInit
{
  Constants = Constants;
  selectedWarehouse: Warehouses;
  warehouseForm: UntypedFormGroup;
  warehouseDialog: boolean = false;

  // Warehouse Groups Dropdown
  warehouseGroupsLoading$: Observable<boolean>;
  warehouseGroups$: Observable<WarehouseGroups[]>;

  //Warehouse Responsibles
  DepartmentEnum = DepartmentEnum;

  initialFormValue = {
    id: [null],
    depoGrubuId: [null],
    kod: [null, Validators.required],
    tanim: [null, Validators.required],
    konum: [null, Validators.required],
    firmaId: [null, Validators.required],
    kapali: [false],
    depoSorumlusu1Id: [null, Validators.required],
    depoSorumlusu2Id: [null],
    tel1: [null],
    tel2: [null],
    sabitDepo: [false],
    bakiyede: [false],
    isDeleted: [false],
    rowVersion: [null],
  };

  constructor(
    private warehouseDataService: WarehouseDataService,
    private warehouseGroupsDataService: WarehouseGroupsDataService,
    private formBuilder: UntypedFormBuilder,
    private toastrTranslateService: ToastrTranslateService,
    private route: ActivatedRoute,
    private router: Router,
    public primeService: PrimengService
  ) {
    super();
  }

  ngOnInit(): void {
    this.warehouseGroups$ =
      this.warehouseGroupsDataService.warehouseGroupsList$;
    this.warehouseGroupsLoading$ =
      this.warehouseGroupsDataService.warehouseGroupsListLoading$;
    this.warehouseGroupsDataService.getWarehouseGroupsList();
    this.createWarehouseForm();

    if (!!this.route.snapshot.paramMap.get('id')) {
      this.setWarehouseFromRoute();
    } else {
      this.warehouseForm.patchValue(this.route.snapshot.queryParams);
    }
  }

  createWarehouseForm(formValue = this.initialFormValue) {
    this.warehouseForm = this.formBuilder.group(formValue);
    this.formGroups.push(this.warehouseForm);
  }

  showPopUp() {
    this.createWarehouseForm();
    this.warehouseDialog = true;
  }

  onSave() {
    if (this.warehouseForm.valid) {
      let warehouseAddFormValue = this.warehouseForm.value;
      if (warehouseAddFormValue.id === 0 || !warehouseAddFormValue.id) {
        this.addWarehouse();
      } else {
        this.updateWarehouse();
      }
    } else {
      this.toastrTranslateService.error();
    }
  }

  addWarehouse() {
    this.warehouseDataService
      .addWarehouse(this.warehouseForm.value)
      .subscribe(() => {
        this.warehouseForm.reset();
      });
  }

  updateWarehouse() {
    this.warehouseDataService
      .updateWarehouse(this.warehouseForm.value)
      .subscribe((response) => {
        this.primeService.patchObject(this.selectedWarehouse, response.data);
        this.patchRowVersion(response.data);
        this.warehouseForm.markAsPristine();
      });
  }

  setWarehouseFromRoute() {
    this.route.data.pipe(untilDestroyed(this)).subscribe((data) => {
      if (!data.selectedWarehouse)
        this.router.navigate([Constants.Paths.NotFound], { replaceUrl: true });
      else {
        this.selectedWarehouse = data.selectedWarehouse;
        this.warehouseForm.patchValue(this.selectedWarehouse);
      }
    });
  }
}
