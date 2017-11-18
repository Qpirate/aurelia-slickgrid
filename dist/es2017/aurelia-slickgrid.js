var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// import 3rd party vendor libs
import 'slickgrid/lib/jquery-ui-1.11.3';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.dataview';
import 'slickgrid/slick.grid';
import 'slickgrid/controls/slick.columnpicker';
import 'slickgrid/controls/slick.gridmenu';
import 'slickgrid/controls/slick.pager';
import 'slickgrid/plugins/slick.autotooltips';
import 'slickgrid/plugins/slick.cellcopymanager';
import 'slickgrid/plugins/slick.cellexternalcopymanager';
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import 'slickgrid/plugins/slick.checkboxselectcolumn';
import 'slickgrid/plugins/slick.headerbuttons';
import 'slickgrid/plugins/slick.headermenu';
import 'slickgrid/plugins/slick.rowmovemanager';
import 'slickgrid/plugins/slick.rowselectionmodel';
import { bindable, bindingMode, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { GlobalGridOptions } from './global-grid-options';
import { ControlAndPluginService, FilterService, GridEventService, GridExtraService, SortService, ResizerService } from './services/index';
import * as $ from 'jquery';
let AureliaSlickgridCustomElement = class AureliaSlickgridCustomElement {
    constructor(elm, ea, controlPluginService, resizer, gridEventService, gridExtraService, filterService, sortService) {
        this.elm = elm;
        this.ea = ea;
        this.controlPluginService = controlPluginService;
        this.resizer = resizer;
        this.gridEventService = gridEventService;
        this.gridExtraService = gridExtraService;
        this.filterService = filterService;
        this.sortService = sortService;
        this.showPagination = false;
        this.gridHeight = 100;
        this.gridWidth = 600;
        this.elm = elm;
        this.resizer = resizer;
        this.controlPluginService = controlPluginService;
        this.gridEventService = gridEventService;
        this.gridExtraService = gridExtraService;
        this.filterService = filterService;
        this.sortService = sortService;
    }
    attached() {
        // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
        this._dataset = this._dataset || [];
        this._gridOptions = this.mergeGridOptions();
        this.dataview = new Slick.Data.DataView();
        this.controlPluginService.createPluginBeforeGridCreation(this.columnDefinitions, this._gridOptions);
        this.grid = new Slick.Grid(`#${this.gridId}`, this.dataview, this.columnDefinitions, this._gridOptions);
        this.controlPluginService.attachDifferentControlOrPlugins(this.grid, this.columnDefinitions, this._gridOptions, this.dataview);
        this.attachDifferentHooks(this.grid, this._gridOptions, this.dataview);
        this.grid.init();
        this.dataview.beginUpdate();
        this.dataview.setItems(this._dataset);
        this.dataview.endUpdate();
        // attach resize ONLY after the dataView is ready
        this.attachResizeHook(this.grid, this._gridOptions);
        // attach grid extra service
        const gridExtraService = this.gridExtraService.init(this.grid, this.dataview);
    }
    detached() {
        this.dataview = [];
        this.controlPluginService.destroy();
        this.filterService.clearFilters();
        this.resizer.destroy();
        this.grid.destroy();
    }
    /**
     * Keep original value(s) that could be passed by the user ViewModel.
     * If nothing was passed, it will default to first option of select
     */
    bind(binding, contexts) {
        // get the grid options (priority is Global Options first, then user option which could overwrite the Global options)
        this.gridOptions = Object.assign({}, GlobalGridOptions, binding.gridOptions);
        this.style = {
            height: `${binding.gridHeight}px`,
            width: `${binding.gridWidth}px`
        };
    }
    unbind(binding, scope) {
        this.resizer.destroy();
    }
    datasetChanged(newValue, oldValue) {
        this._dataset = newValue;
        this.refreshGridData(newValue);
        // expand/autofit columns on first page load
        // we can assume that if the oldValue was empty then we are on first load
        if (!oldValue || oldValue.length < 1) {
            if (this._gridOptions.autoFitColumnsOnFirstLoad) {
                this.grid.autosizeColumns();
            }
        }
    }
    attachDifferentHooks(grid, options, dataView) {
        // attach external sorting (backend) when available or default onSort (dataView)
        if (options.enableSorting) {
            (options.onBackendEventApi) ? this.sortService.attachBackendOnSort(grid, options) : this.sortService.attachLocalOnSort(grid, options, this.dataview);
        }
        // attach external filter (backend) when available or default onFilter (dataView)
        if (options.enableFiltering) {
            this.filterService.init(grid, options, this.columnDefinitions);
            (options.onBackendEventApi) ? this.filterService.attachBackendOnFilter(grid, options) : this.filterService.attachLocalOnFilter(grid, options, this.dataview);
        }
        if (options.onBackendEventApi && options.onBackendEventApi.onInit) {
            const backendApi = options.onBackendEventApi;
            const query = backendApi.service.buildQuery();
            // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
            setTimeout(async () => {
                // await for the Promise to resolve the data
                if (options && options.onBackendEventApi && options.onBackendEventApi.onInit) {
                    const responseProcess = await options.onBackendEventApi.onInit(query);
                    // send the response process to the postProcess callback
                    if (backendApi.postProcess) {
                        backendApi.postProcess(responseProcess);
                    }
                }
            });
        }
        // on cell click, mainly used with the columnDef.action callback
        this.gridEventService.attachOnCellChange(grid, this._gridOptions, dataView);
        this.gridEventService.attachOnClick(grid, this._gridOptions, dataView);
        dataView.onRowCountChanged.subscribe((e, args) => {
            grid.updateRowCount();
            grid.render();
        });
        dataView.onRowsChanged.subscribe((e, args) => {
            grid.invalidateRows(args.rows);
            grid.render();
        });
    }
    attachResizeHook(grid, options) {
        // expand/autofit columns on first page load
        if (this._gridOptions.autoFitColumnsOnFirstLoad) {
            this.grid.autosizeColumns();
        }
        // auto-resize grid on browser resize
        if (options.enableAutoResize) {
            this.resizer.attachAutoResizeDataGrid(grid, options);
            if (options.autoFitColumnsOnFirstLoad) {
                grid.autosizeColumns();
            }
        }
        else {
            this.resizer.resizeGrid(grid, options, 0, { height: this.gridHeight, width: this.gridWidth });
        }
    }
    mergeGridOptions() {
        this.gridOptions.gridId = this.gridId;
        this.gridOptions.gridContainerId = `slickGridContainer-${this.gridId}`;
        if (this.gridOptions.enableFiltering) {
            this.gridOptions.showHeaderRow = true;
        }
        // use jquery extend to deep merge and avoid immutable properties changed in GlobalGridOptions after route change
        return $.extend(true, {}, GlobalGridOptions, this.gridOptions);
    }
    /** Toggle the filter row displayed on first row */
    showHeaderRow(isShowing) {
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    }
    /** Toggle the filter row displayed on first row */
    toggleHeaderRow() {
        const isShowing = !this.grid.getOptions().showHeaderRow;
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    }
    refreshGridData(dataset) {
        if (dataset && this.grid) {
            this.dataview.setItems(dataset);
            // this.grid.setData(dataset);
            this.grid.invalidate();
            this.grid.render();
            if (this._gridOptions.enablePagination) {
                this.showPagination = true;
                this.gridPaginationOptions = this.mergeGridOptions();
            }
            if (this._gridOptions.enableAutoResize) {
                // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
                this.resizer.resizeGrid(this.grid, this._gridOptions, 10);
                // this.grid.autosizeColumns();
            }
        }
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], AureliaSlickgridCustomElement.prototype, "element", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], AureliaSlickgridCustomElement.prototype, "dataset", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], AureliaSlickgridCustomElement.prototype, "paginationOptions", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], AureliaSlickgridCustomElement.prototype, "gridPaginationOptions", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], AureliaSlickgridCustomElement.prototype, "dataview", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], AureliaSlickgridCustomElement.prototype, "grid", void 0);
__decorate([
    bindable()
], AureliaSlickgridCustomElement.prototype, "gridId", void 0);
__decorate([
    bindable()
], AureliaSlickgridCustomElement.prototype, "columnDefinitions", void 0);
__decorate([
    bindable()
], AureliaSlickgridCustomElement.prototype, "gridOptions", void 0);
__decorate([
    bindable()
], AureliaSlickgridCustomElement.prototype, "gridHeight", void 0);
__decorate([
    bindable()
], AureliaSlickgridCustomElement.prototype, "gridWidth", void 0);
__decorate([
    bindable()
], AureliaSlickgridCustomElement.prototype, "pickerOptions", void 0);
AureliaSlickgridCustomElement = __decorate([
    inject(Element, EventAggregator, ControlAndPluginService, ResizerService, GridEventService, GridExtraService, FilterService, SortService)
], AureliaSlickgridCustomElement);
export { AureliaSlickgridCustomElement };
//# sourceMappingURL=aurelia-slickgrid.js.map