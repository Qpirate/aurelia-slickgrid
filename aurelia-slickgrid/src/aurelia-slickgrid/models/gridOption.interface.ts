import { AutoResizeOption } from './autoResizeOption.interface';
import { BackendEventChanged } from './backendEventChanged.interface';
import { BackendServiceApi } from './backendServiceApi.interface';
import { CheckboxSelector } from './checkboxSelector.interface';
import { ColumnPicker } from './columnPicker.interface';
import { GridMenu } from './gridMenu.interface';
import { HeaderButton } from './headerButton.interface';
import { HeaderMenu } from './headerMenu.interface';
import { Pagination } from './pagination.interface';
import { PaginationChangedArgs } from './paginationChangedArgs.interface';
import { SortChangedArgs } from './sortChangedArgs.interface';

export interface GridOption {
  asyncEditorLoading?: boolean;
  autoEdit?: boolean;
  autoFitColumnsOnFirstLoad?: boolean;
  autoResize?: AutoResizeOption;
  autoTooltipOptions?: {
    enableForCells: boolean;
    enableForHeaderCells: boolean;
    maxToolTipLength: number;
  };

  /** Backend Service API definition (GraphQL/OData Services), also goes with onBackendEventApi */
  backendServiceApi?: BackendServiceApi;

  cellHighlightCssClass?: string | null;
  checkboxSelector?: CheckboxSelector;
  columnPicker?: ColumnPicker;
  editable?: boolean;
  enableAsyncPostRender?: boolean;
  enableAutoResize?: boolean;
  enableAutoTooltip?: boolean;
  enableCellNavigation?: boolean;
  enableColumnPicker?: boolean;
  enableColumnReorder?: boolean;
  enableCheckboxSelector?: boolean;
  enableFiltering?: boolean;
  enableGridMenu?: boolean;
  enableHeaderButton?: boolean;
  enableHeaderMenu?: boolean;
  enableMouseHoverHighlightRow?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  enableTextSelectionOnCells?: boolean;
  enableTranslate?: boolean;
  explicitInitialization?: boolean;
  forceFitColumns?: boolean;
  gridContainerId?: string;
  gridMenu?: GridMenu;
  gridId?: string;
  headerRowHeight?: number;
  headerButton?: HeaderButton;
  headerMenu?: HeaderMenu;
  locale?: string;
  multiColumnSort?: boolean;

  /** DEPRECATED, Please use "backendServiceApi" instead */
  onBackendEventApi?: BackendEventChanged;

  /** Pagination options, these are used ONLY with a Backend Service API (GraphQL/OData Services) */
  pagination?: Pagination;

  /** ideal to pass custom paramaters to your Formatter/Editor or anything else */
  params?: any | any[];

  registerPlugins?: any | any[]; // e.g.: Slick.CheckboxSelectColumn
  rowHeight?: number;
  rowSelectionOptions?: {
    selectActiveRow: boolean;
  };
  showHeaderRow?: boolean;
  showTopPanel?: boolean;
  topPanelHeight?: number;
}
