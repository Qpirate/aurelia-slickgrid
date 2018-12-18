System.register(["aurelia-framework", "aurelia-i18n", "./compoundInputFilter"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_i18n_1, compoundInputFilter_1, CompoundInputPasswordFilter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_i18n_1_1) {
                aurelia_i18n_1 = aurelia_i18n_1_1;
            },
            function (compoundInputFilter_1_1) {
                compoundInputFilter_1 = compoundInputFilter_1_1;
            }
        ],
        execute: function () {
            CompoundInputPasswordFilter = /** @class */ (function (_super) {
                __extends(CompoundInputPasswordFilter, _super);
                /** Initialize the Filter */
                function CompoundInputPasswordFilter(i18n) {
                    var _this = _super.call(this, i18n) || this;
                    _this.i18n = i18n;
                    _this.inputType = 'password';
                    return _this;
                }
                CompoundInputPasswordFilter = __decorate([
                    aurelia_framework_1.inject(aurelia_i18n_1.I18N)
                ], CompoundInputPasswordFilter);
                return CompoundInputPasswordFilter;
            }(compoundInputFilter_1.CompoundInputFilter));
            exports_1("CompoundInputPasswordFilter", CompoundInputPasswordFilter);
        }
    };
});
//# sourceMappingURL=compoundInputPasswordFilter.js.map