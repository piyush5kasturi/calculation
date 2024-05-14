import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
export interface Props {
  columns: ColumnDef<any>[];
  data: any[];
  page?: number;
  total?: number;
  useCheckBox?: boolean;
  checkAllFlag?: boolean;
  checkHeader?: boolean;
  checkedRowList?: number[];
  onhandleSelectRows?: (v: any) => void;
  handleCheckAll?: () => void;
  isLoading?: boolean;
  onChangePage?: (page: number) => void;
  limit?: number;
  onChangeSort?: (v: any) => void;
  sort?: [{ id: string; desc: boolean }];
  selectedRows?: any[];
  filters?: ColumnFiltersState;
  emptyMessage?: string;
  className?: any;
  headerClassName?: string;
  headerChildClassName?: string;
  tableClassName?: any;
  tdClassName?: any;
  showPagination?: boolean;
  highlightAlternateRows?: boolean;
  tableWidgetClassName?: string;
  allowTooltip?: boolean;
  validateCheckbox?: (v: any) => boolean;
  showBorders?: boolean;
  paginationClassName?: string;
}