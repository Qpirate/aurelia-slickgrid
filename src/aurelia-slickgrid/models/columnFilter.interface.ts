import {
  CollectionCustomStructure,
  CollectionFilterBy,
  CollectionOption,
  CollectionSortBy,
  Column,
  MultipleSelectOption,
  OperatorString,
  OperatorType,
  SearchTerm
} from './../models/index';

export interface ColumnFilter {
  /** Do we want to bypass the Backend Query? Commonly used with an OData Backend Service, if we want to filter without calling the regular OData query. */
  bypassBackendQuery?: boolean;

  /** Column ID */
  columnId?: string;

  /** Column Definition */
  columnDef?: Column;

  /** Search terms to preload (collection), please note it is better to use the "presets" grid option which is more powerful. */
  searchTerms?: SearchTerm[] | undefined;

  /** Operator to use when filtering (>, >=, EQ, IN, ...) */
  operator?: OperatorType | OperatorString;

  /** Maximum value of the filter, works only with Filters supporting it (text, number, float, slider) */
  maxValue?: number | string;

  /** Minimum value of the filter, works only with Filters supporting it (text, number, float, slider) */
  minValue?: number | string;

  /** Filter to use (input, multipleSelect, singleSelect, select, custom) */
  model?: any;

  /**
   * A collection of items/options (commonly used with a Select/Multi-Select Filter)
   * It can be a collection of string or label/value pair (the pair can be customized via the "customStructure" option)
   */
  collection?: any[];

  /** A collection of items/options that will be loaded asynchronously (commonly used with a Select/Multi-Select Editor) */
  collectionAsync?: Promise<any>;

  /** We could filter 1 or more items from the collection */
  collectionFilterBy?: CollectionFilterBy | CollectionFilterBy[];

  /** Options to change the behavior of the "collection" */
  collectionOptions?: CollectionOption;

  /** We could sort the collection by 1 or more properties, or by translated value(s) when enableTranslateLabel is True */
  collectionSortBy?: CollectionSortBy | CollectionSortBy[];

  /** A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Filter */
  customStructure?: CollectionCustomStructure;

  /**
   * Defaults to false, when enable it will add collection observers and re-render the Filter DOM element
   * with the new collection when changes are detected. Also note that using "collectionAsync" automatically watch for changes,
   * in consequence, there's no need to enable this flag in that particular case.
   */
  enableCollectionWatch?: boolean;

  /**
   * Defaults to false, when set it will render any HTML code instead of removing it (sanitized)
   * Only used so far in the MultipleSelect & SingleSelect Filters will support it
   */
  enableRenderHtml?: boolean;

  /** Do we want the Filter to handle translation (localization)? */
  enableTranslateLabel?: boolean;

  /** Defaults to false, do we want to trim white spaces from the filter value typed by the user? */
  enableTrimWhiteSpace?: boolean;

  /**
   * Options that could be provided to the Filter, example: { container: 'body', maxHeight: 250}
   *
   * Please note that if you use options that have existed model interfaces, you should cast with "as X",
   * for example { filterOptions: {maxHeight: 250} as MultipleSelectOption }
   */
  filterOptions?: MultipleSelectOption | any;

  /**
   * Placeholder text that can be used by some Filters.
   * Note that this will override the default placeholder configured in the global config
   */
  placeholder?: string;

  /**
   * Use "params" to pass any type of arguments to your Custom Filter
   * for example, to pass a second collection to a select Filter we can type this:
   * params: { options: [{ value: true, label: 'True' }, { value: true, label: 'True'} ]}
   */
  params?: any;

  /** Step value of the filter, works only with Filters supporting it (input text, number, float, range, slider) */
  valueStep?: number | string;
}
