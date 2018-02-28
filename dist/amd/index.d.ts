import { AureliaSlickgridCustomElement } from './aurelia-slickgrid';
import { SlickPaginationCustomElement } from './slick-pagination';
import { SlickgridConfig } from './slickgrid-config';
import { BackendService, BackendServiceApi, CaseType, Column, DelimiterType, ExportOption, FileType, Filter, FilterArguments, FilterCallback, FilterCondition, FilterType, Formatter, FormElementType, FieldType, GraphqlResult, GraphqlServiceOption, GridOption, OnEventArgs } from './models/index';
import { Editors } from './editors/index';
import { FilterConditions } from './filter-conditions/index';
import { Filters, PLUGIN_NAME as FILTER_PLUGIN_NAME } from './filters/index';
import { Formatters } from './formatters/index';
import { Sorters } from './sorters/index';
import { ControlAndPluginService, ExportService, FilterService, GraphqlService, GridExtraUtils, GridExtraService, GridEventService, GridOdataService, ResizerService, SortService } from './services/index';
export declare function configure(aurelia: any, callback: any): void;
export { AureliaSlickgridCustomElement, SlickPaginationCustomElement, BackendService, BackendServiceApi, CaseType, Column, DelimiterType, ExportOption, FileType, Formatter, GraphqlResult, GraphqlServiceOption, GridOption, Filter, FilterArguments, FilterCallback, FilterCondition, FilterType, FILTER_PLUGIN_NAME, FormElementType, FieldType, OnEventArgs, Editors, Filters, FilterConditions, Formatters, Sorters, ControlAndPluginService, ExportService, FilterService, GraphqlService, GridEventService, GridExtraUtils, GridExtraService, GridOdataService, ResizerService, SortService, SlickgridConfig };