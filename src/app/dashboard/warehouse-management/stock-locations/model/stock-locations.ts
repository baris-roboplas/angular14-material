import { KayitBilgileri } from 'src/app/shared/components/kayit-bilgileri/models/kayitBilgileri';
import { Constants } from 'src/app/shared/constants';
import {
  TableColumnStyle,
  TableColumnType,
} from 'src/app/shared/models/table-column-style';

export interface StockLocations extends KayitBilgileri {
  id?: number;
  depoId?: number;
  kod: string;
  en: number;
  boy: number;
  yukseklik: number;
  aciklama: string;
}

export class StockLocationsColumns {
  static cols: TableColumnStyle[] = [
    {
      field: 'kod',
      header: 'Stock Location Code',
      type: TableColumnType.text,
      link: Constants.Paths.StockLocations.updatePath(),
      urlId: 'id',
      fixedColumn: true,
    },

    {
      field: 'aciklama',
      header: 'Description',
      type: TableColumnType.text,
    },
    {
      field: 'en',
      header: 'Width (m)',
      type: TableColumnType.number,
    },
    {
      field: 'boy',
      header: 'Length (m)',
      type: TableColumnType.number,
    },
    {
      field: 'yukseklik',
      header: 'Height (m)',
      type: TableColumnType.number,
    },
    {
      field: 'depoKodu',
      header: 'Stock Location In Warehouse',
      type: TableColumnType.select,
      link:
        Constants.Paths.WareHouseManagement +
        '/' +
        Constants.Paths.Warehouses.Index +
        '/' +
        Constants.Paths.Warehouses.List,
      // urlId: 'depoId',
    },
  ];
}
