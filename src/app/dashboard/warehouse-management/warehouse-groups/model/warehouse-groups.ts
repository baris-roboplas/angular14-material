import { TableColumnType } from 'src/app/shared/models/table-column-style';

export interface WarehouseGroups{
  id: number;
  grupAdi: string;
  kodModeli: string;
  isActive: boolean;
}
export class WarehouseGroupsSutun {
  static cols = [
    {
      field: 'kodModeli',
      header: 'Code Model',
      type: TableColumnType.text,
      fixedColumn: true,
    },
    {
      field: 'grupAdi',
      header: 'Name',
      type: TableColumnType.text,
      fixedColumn: true,
    },
  ];
}
