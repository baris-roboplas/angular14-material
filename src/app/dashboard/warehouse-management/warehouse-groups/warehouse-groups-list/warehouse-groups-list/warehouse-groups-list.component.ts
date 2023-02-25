import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Constants } from 'src/app/shared/constants';
import {
  WarehouseGroups,
  WarehouseGroupsSutun,
} from '../../model/warehouse-groups';
import { TranslateService as TranslateServiceCore } from '@ngx-translate/core';
import { WarehouseGroupsDataService } from '../../services/warehouse-groups-data.service';
import { ToastrTranslateService } from 'src/app/shared/services/toastr-translate.service';
import { FormBaseComponent } from 'src/app/shared/components/form-base/form-base.component';

@UntilDestroy()
@Component({
  selector: 'app-warehouse-groups-list',
  templateUrl: './warehouse-groups-list.component.html',
  styleUrls: ['./warehouse-groups-list.component.css'],
})
export class WarehouseGroupsListComponent
  extends FormBaseComponent
  implements OnInit
{
  cols = WarehouseGroupsSutun.cols;
  contextMenuItems: MenuItem[];
  Constants = Constants;

  warehouseGroupsForm: UntypedFormGroup;
  warehouseGroupsFormDialog = false;

  warehouseGroupsListloading$: Observable<boolean>;
  warehouseGroupsList$: Observable<WarehouseGroups[]>;
  selectedWarehouseGroup: WarehouseGroups;

  initialFormValue = {
    id: [null],
    grupAdi: [null, Validators.required],
    kodModeli: [null, Validators.required],
    isActive: [false, Validators.required],
  };

  constructor(
    private warehouseGroupsDataService: WarehouseGroupsDataService,
    private authService: AuthService,
    private translateServiceCore: TranslateServiceCore,
    private confirmationService: ConfirmationService,
    private formBuilder: UntypedFormBuilder,
    private toastrTranslateService: ToastrTranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createWarehouseForm();
    this.warehouseGroupsListloading$ =
      this.warehouseGroupsDataService.warehouseGroupsListLoading$;
    this.warehouseGroupsDataService.getWarehouseGroupsList();
    this.warehouseGroupsList$ =
      this.warehouseGroupsDataService.warehouseGroupsList$;
    this.setContextMenu();
  }

  createWarehouseForm(formValue = this.initialFormValue) {
    this.warehouseGroupsForm = this.formBuilder.group(formValue);
  }

  showPopUp() {
    this.createWarehouseForm();
    this.warehouseGroupsFormDialog = true;
  }

  setContextMenu() {
    this.authService.loggedUser$
      .pipe(untilDestroyed(this))
      .subscribe((loggedUser) => {
        this.contextMenuItems = [
          {
            label: this.translateServiceCore.instant('Edit'),
            id: 'Edit',
            icon: 'pi pi-pencil',
            command: () => (this.warehouseGroupsFormDialog = true),
            disabled: !loggedUser.hasClaim(Constants.Claims.DepoGruplari.Kayit),
          },
          {
            label: this.translateServiceCore.instant('Delete'),
            id: 'Delete',
            icon: 'pi pi-fw pi-times',
            visible: this.warehouseGroupsForm.value.isActive,
            command: () =>
              this.deleteWarehouseGroupConfirm(this.warehouseGroupsForm.value),
            disabled: !loggedUser.hasClaim(Constants.Claims.DepoGruplari.Silme),
          },
        ];
      });
  }

  addNewWarehouseGroup() {
    this.warehouseGroupsDataService
      .addWarehouseGroup(this.warehouseGroupsForm.value)
      .subscribe(() => {
        this.warehouseGroupsForm.reset();
      });
  }

  updateWarehouseGroup() {
    this.warehouseGroupsDataService
      .updateWarehouseGroup(this.warehouseGroupsForm.value)
      .subscribe(() => {
        this.warehouseGroupsFormDialog = false;
      });
  }

  deleteWarehouseGroupConfirm(warehouseGroupsFormValue: WarehouseGroups) {
    this.confirmationService.confirm({
      message:
        warehouseGroupsFormValue.kodModeli +
        ' kodlu depo grubu silinecektir. Devam etmek istiyor musunuz?',
      header: this.translateServiceCore.instant('Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.warehouseGroupsDataService.deleteWarehouseGroup(
          warehouseGroupsFormValue.id
        );
      },
    });
  }
  onSave() {
    if (this.warehouseGroupsForm.valid) {
      let warehouseAddFormValue = this.warehouseGroupsForm.value;
      if (warehouseAddFormValue.id === 0 || !warehouseAddFormValue.id) {
        this.addNewWarehouseGroup();
      } else {
        this.updateWarehouseGroup();
      }
    } else {
      this.toastrTranslateService.error();
    }
  }
}
