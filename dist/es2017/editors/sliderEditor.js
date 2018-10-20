import { Constants } from '../constants';
import * as $ from 'jquery';
const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class SliderEditor {
    constructor(args) {
        this.args = args;
        this._elementRangeInputId = '';
        this._elementRangeOutputId = '';
        this.init();
    }
    /** Get Column Definition object */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /** Get Column Editor object */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor || {};
    }
    /** Getter for the Editor Generic Params */
    get editorParams() {
        return this.columnEditor.params || {};
    }
    /** Get the Validator function, can be passed in Editor property or Column Definition */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    init() {
        const container = this.args.container;
        // define the input & slider number IDs
        const itemId = this.args && this.args.item && this.args.item.id;
        this._elementRangeInputId = `rangeInput_${this.columnDef.field}_${itemId}`;
        this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}_${itemId}`;
        // create HTML string template
        const editorTemplate = this.buildTemplateHtmlString();
        this.$editorElm = $(editorTemplate);
        this.$input = this.$editorElm.children('input');
        this.$sliderNumber = this.$editorElm.children('div.input-group-addon.input-group-append').children();
        // watch on change event
        this.$editorElm
            .appendTo(this.args.container)
            .on('mouseup', (event) => this.save());
        // if user chose to display the slider number on the right side, then update it every time it changes
        // we need to use both "input" and "change" event to be all cross-browser
        if (!this.editorParams.hideSliderNumber) {
            this.$editorElm.on('input change', (e) => {
                const value = e && e.target && e.target.value || '';
                if (value && document) {
                    const elm = document.getElementById(this._elementRangeOutputId || '');
                    if (elm && elm.innerHTML) {
                        elm.innerHTML = e.target.value;
                    }
                }
            });
        }
    }
    destroy() {
        this.$editorElm.remove();
    }
    focus() {
        this.$editorElm.focus();
    }
    save() {
        const validation = this.validate();
        if (validation && validation.valid) {
            if (this.args.grid.getOptions().autoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    }
    cancel() {
        this.$input.val(this.defaultValue);
        this.args.cancelChanges();
    }
    loadValue(item) {
        // this.$input.val(this.defaultValue = item[this.columnDef.field]);
        this.defaultValue = item[this.columnDef.field];
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$sliderNumber.html(this.defaultValue);
    }
    serializeValue() {
        return parseInt(this.$input.val(), 10) || 0;
    }
    applyValue(item, state) {
        item[this.columnDef.field] = state;
    }
    isValueChanged() {
        const elmValue = this.$input.val();
        return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
    }
    validate() {
        const elmValue = this.$input.val();
        const minValue = this.columnEditor.minValue;
        const maxValue = this.columnEditor.maxValue;
        const errorMsg = this.columnEditor.errorMessage;
        const mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue
        };
        if (this.validator) {
            const validationResults = this.validator(elmValue, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        else if (minValue !== undefined && (elmValue < minValue || elmValue > maxValue)) {
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, (matched) => {
                    return mapValidation[matched];
                })
            };
        }
        return {
            valid: true,
            msg: null
        };
    }
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     */
    buildTemplateHtmlString() {
        const minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE;
        const maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE;
        const defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
        const step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP;
        const itemId = this.args && this.args.item && this.args.item.id;
        if (this.editorParams.hideSliderNumber) {
            return `
      <div class="slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input range" />
      </div>`;
        }
        return `
      <div class="input-group slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input range" />
        <div class="input-group-addon input-group-append slider-value"><span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span></div>
      </div>`;
    }
}
//# sourceMappingURL=sliderEditor.js.map