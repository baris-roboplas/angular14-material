import { KayitBilgileri } from 'src/app/shared/components/kayit-bilgileri/models/kayitBilgileri';
import { Constants } from 'src/app/shared/constants';
import {
  TableColumnStyle,
  TableColumnType,
} from 'src/app/shared/models/table-column-style';

export interface Warehouses extends KayitBilgileri {
  id: number;
  kod: string;
  tanim: string;
  depoGrubuId: number;
  depoGrubu: string;
  konum: string;
  depoSorumlusu1Id: number;
  depoSorumlusu1: string;
  tel1: string;
  depoSorumlusu2Id: number;
  depoSorumlusu2: string;
  tel2: string;
  kapali: boolean;
  sabitDepo: boolean;
  bakiyede: boolean;
  isDeleted: boolean;
  girisStokYeri: string;
  girisStokYeriId: number;
  firma: string;
  firmaId: number;
  stokYerleri: [
    {
      id: number;
      depoKodu: string;
      depoId: number;
      kod: string;
      en: number;
      boy: number;
      yukseklik: number;
      aciklama: string;
    }
  ];
}

export class WarehousesColumns {
  static cols: TableColumnStyle[] = [
    {
      field: 'kod',
      header: 'Warehouse Code',
      type: TableColumnType.text,
      link: Constants.Paths.Warehouses.updatePath(),
      urlId: 'id',
      fixedColumn: true,
    },
    {
      field: 'depoGrubu',
      header: 'Warehouse Group',
      type: TableColumnType.select,
      urlId: 'depoGrubuId',
    },
    {
      field: 'tanim',
      header: 'Description',
      type: TableColumnType.text,
    },
    {
      field: 'konum',
      header: 'Location',
      type: TableColumnType.text,
    },
    {
      field: 'firma',
      header: 'Company',
      type: TableColumnType.select,
      link: Constants.Paths.Companies.List,
      urlId: 'firmaId',
    },
    {
      field: 'kapali',
      header: 'Closed',
      type: TableColumnType.boolean,
    },
    {
      field: 'depoSorumlusu1',
      header: 'Warehouse Manager 1',
      type: TableColumnType.select,
      link: Constants.Paths.Staff.List,
      urlId: 'depoSorumlusu1Id',
    },
    {
      field: 'depoSorumlusu2',
      header: 'Warehouse Manager 2',
      type: TableColumnType.select,
      link: Constants.Paths.Staff.List,
      urlId: 'depoSorumlusu2Id',
    },
    {
      field: 'tel1',
      header: 'Phone 1',
      type: TableColumnType.text,
    },
    {
      field: 'tel2',
      header: 'Phone 2',
      type: TableColumnType.text,
    },
    {
      field: 'sabitDepo',
      header: 'Fixed Warehouse',
      type: TableColumnType.boolean,
    },
    {
      field: 'bakiyede',
      header: 'In Balance',
      type: TableColumnType.boolean,
    },
    {
      field: 'isDeleted',
      header: 'Deleted',
      type: TableColumnType.boolean,
    },
  ];
}
