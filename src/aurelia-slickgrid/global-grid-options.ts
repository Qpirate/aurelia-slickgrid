import { Filters } from './filters/index';
import { DelimiterType, FileType, GridOption, OperatorType } from './models/index';

/**
 * Default Options that can be passed to the Aurelia-Slickgrid
 */
export const GlobalGridOptions: GridOption = {
  alwaysShowVerticalScroll: true,
  autoEdit: false,
  asyncEditorLoading: false,
  autoFitColumnsOnFirstLoad: true,
  autoResize: {
    calculateAvailableSizeBy: 'window',
    bottomPadding: 20,
    minHeight: 180,
    minWidth: 300,
    sidePadding: 0
  },
  cellHighlightCssClass: 'slick-cell-modified',
  checkboxSelector: {
    cssClass: 'slick-cell-checkboxsel'
  },
  cellMenu: {
    autoAdjustDrop: true,
    autoAlignSide: true,
    hideCloseButton: true,
    hideCommandSection: false,
    hideOptionSection: false,
  },
  fadeSpeed: 0, // this should go inside columnPicker but there's a bug in that plugin and it's pulling it from grid options instead
  columnPicker: {
    fadeSpeed: 0,
    hideForceFitButton: false,
    hideSyncResizeButton: true
  },
  contextMenu: {
    autoAdjustDrop: true,
    autoAlignSide: true,
    hideCloseButton: true,
    hideClearAllGrouping: false,
    hideCollapseAllGroups: false,
    hideCommandSection: false,
    hideCopyCellValueCommand: false,
    hideExpandAllGroups: false,
    hideExportCsvCommand: false,
    hideExportExcelCommand: false,
    hideExportTextDelimitedCommand: true,
    hideMenuOnScroll: true,
    hideOptionSection: false,
    iconCopyCellValueCommand: 'fa fa-clone',
    iconExportCsvCommand: 'fa fa-download',
    iconExportExcelCommand: 'fa fa-file-excel-o text-success',
    iconExportTextDelimitedCommand: 'fa fa-download',
    width: 200,
  },
  datasetIdPropertyName: 'id',
  defaultAureliaEventPrefix: 'asg',
  defaultSlickgridEventPrefix: 'sg',
  defaultFilter: Filters.input,
  defaultFilterPlaceholder: '&#128269;', // magnifying glass icon
  defaultFilterRangeOperator: OperatorType.rangeExclusive,
  enableAutoResize: true,
  enableAutoSizeColumns: true,
  enableHeaderMenu: true,
  editable: false,
  enableCellNavigation: false,
  enableCheckboxSelector: false,
  enableColumnPicker: true,
  enableColumnReorder: true,
  enableContextMenu: true,
  enableExcelExport: true, // Excel Export is the new default,
  enableExport: false, // CSV/Text with Tab Delimited
  enableFilterTrimWhiteSpace: false, // do we want to trim white spaces on all Filters?
  enableGridMenu: true,
  enableSorting: true,
  enableTextSelectionOnCells: true,
  explicitInitialization: true,
  excelExportOptions: {
    addGroupIndentation: true,
    exportWithFormatter: false,
    filename: 'export',
    format: FileType.xlsx,
    groupingColumnHeaderTitle: 'Group By',
    groupCollapsedSymbol: '\u25B9',
    groupExpandedSymbol: '\u25BF',
    groupingAggregatorRowText: '',
    sanitizeDataExport: false,
  },
  exportOptions: {
    delimiter: DelimiterType.comma,
    exportWithFormatter: false,
    filename: 'export',
    format: FileType.csv,
    groupingColumnHeaderTitle: 'Group By',
    groupingAggregatorRowText: '',
    sanitizeDataExport: false,
    useUtf8WithBom: true
  },
  forceFitColumns: false,
  gridMenu: {
    hideClearAllFiltersCommand: false,
    hideClearAllSortingCommand: false,
    hideExportCsvCommand: false,
    hideExportExcelCommand: false,
    hideExportTextDelimitedCommand: true,
    hideForceFitButton: false,
    hideRefreshDatasetCommand: false,
    hideToggleFilterCommand: false,
    hideTogglePreHeaderCommand: false,
    hideSyncResizeButton: true,
    iconCssClass: 'fa fa-bars',
    iconClearAllFiltersCommand: 'fa fa-filter text-danger',
    iconClearAllSortingCommand: 'fa fa-unsorted text-danger',
    iconExportCsvCommand: 'fa fa-download',
    iconExportExcelCommand: 'fa fa-file-excel-o text-success',
    iconExportTextDelimitedCommand: 'fa fa-download',
    iconRefreshDatasetCommand: 'fa fa-refresh',
    iconToggleFilterCommand: 'fa fa-random',
    iconTogglePreHeaderCommand: 'fa fa-random',
    menuWidth: 16,
    resizeOnShowHeaderRow: true,
  },
  headerMenu: {
    autoAlign: true,
    autoAlignOffset: 12,
    minWidth: 140,
    iconClearFilterCommand: 'fa fa-filter text-danger',
    iconClearSortCommand: 'fa fa-unsorted',
    iconSortAscCommand: 'fa fa-sort-amount-asc',
    iconSortDescCommand: 'fa fa-sort-amount-desc',
    iconColumnHideCommand: 'fa fa-times',
    hideColumnHideCommand: false,
    hideClearFilterCommand: false,
    hideClearSortCommand: false,
    hideSortCommands: false,
    hideSortCommandsDivider: false
  },
  headerRowHeight: 35,
  multiColumnSort: true,
  numberedMultiColumnSort: true,
  tristateMultiColumnSort: false,
  pagination: {
    pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
    pageSize: 25,
    totalItems: 0
  },
  // @ts-ignore
  rowDetailView: {
    cssClass: 'detail-view-toggle',
    panelRows: 1,
    keyPrefix: '__',
    useRowClick: true,
    useSimpleViewportCalc: true,
    saveDetailViewOnScroll: false,
    viewModel: '',
  },
  rowHeight: 35,
  sortColNumberInSeparateSpan: true,
  suppressActiveCellChangeOnEdit: true,
  topPanelHeight: 35
};
