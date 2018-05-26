var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework", "./../models/index", "aurelia-event-aggregator"], function (require, exports, aurelia_framework_1, index_1, aurelia_event_aggregator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GridStateService = /** @class */ (function () {
        function GridStateService(ea) {
            this.ea = ea;
        }
        Object.defineProperty(GridStateService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Service
         * @param grid
         * @param filterService
         * @param sortService
         */
        GridStateService.prototype.init = function (grid, filterService, sortService) {
            var _this = this;
            this._grid = grid;
            this.filterService = filterService;
            this.sortService = sortService;
            // Subscribe to Event Emitter of Filter & Sort changed, go back to page 1 when that happen
            this._filterSubcription = this.ea.subscribe('filterService:filterChanged', function (currentFilters) {
                _this.ea.publish('gridStateService:changed', { change: { newValues: currentFilters, type: index_1.GridStateType.filter }, gridState: _this.getCurrentGridState() });
            });
            this._sorterSubcription = this.ea.subscribe('sortService:sortChanged', function (currentSorters) {
                _this.ea.publish('gridStateService:changed', { change: { newValues: currentSorters, type: index_1.GridStateType.sorter }, gridState: _this.getCurrentGridState() });
            });
        };
        GridStateService.prototype.dispose = function () {
            this._filterSubcription.dispose();
            this._sorterSubcription.dispose();
        };
        /**
         * Get the current grid state (filters/sorters/pagination)
         * @return grid state
         */
        GridStateService.prototype.getCurrentGridState = function () {
            var gridState = {
                filters: this.getCurrentFilters(),
                sorters: this.getCurrentSorters()
            };
            var currentPagination = this.getCurrentPagination();
            if (currentPagination) {
                gridState.pagination = currentPagination;
            }
            return gridState;
        };
        /**
         * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
         * @return current filters
         */
        GridStateService.prototype.getCurrentFilters = function () {
            if (this._gridOptions && this._gridOptions.backendServiceApi) {
                var backendService = this._gridOptions.backendServiceApi.service;
                if (backendService && backendService.getCurrentFilters) {
                    return backendService.getCurrentFilters();
                }
            }
            else if (this.filterService && this.filterService.getCurrentLocalFilters) {
                return this.filterService.getCurrentLocalFilters();
            }
            return null;
        };
        /**
         * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
         * @return current pagination state
         */
        GridStateService.prototype.getCurrentPagination = function () {
            if (this._gridOptions && this._gridOptions.backendServiceApi) {
                var backendService = this._gridOptions.backendServiceApi.service;
                if (backendService && backendService.getCurrentPagination) {
                    return backendService.getCurrentPagination();
                }
            }
            else {
                // TODO implement this whenever local pagination gets implemented
            }
            return null;
        };
        /**
         * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
         * @return current sorters
         */
        GridStateService.prototype.getCurrentSorters = function () {
            if (this._gridOptions && this._gridOptions.backendServiceApi) {
                var backendService = this._gridOptions.backendServiceApi.service;
                if (backendService && backendService.getCurrentSorters) {
                    return backendService.getCurrentSorters();
                }
            }
            else if (this.sortService && this.sortService.getCurrentLocalSorters) {
                return this.sortService.getCurrentLocalSorters();
            }
            return null;
        };
        GridStateService = __decorate([
            aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator)
        ], GridStateService);
        return GridStateService;
    }());
    exports.GridStateService = GridStateService;
});
//# sourceMappingURL=gridState.service.js.map