System.register(["./../services/utilities"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utilities_1, dollarColoredBoldFormatter;
    return {
        setters: [
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            }
        ],
        execute: function () {
            exports_1("dollarColoredBoldFormatter", dollarColoredBoldFormatter = function (row, cell, value, columnDef, dataContext) {
                var isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
                var params = columnDef && columnDef.params || {};
                var minDecimal = params.minDecimal || 2;
                var maxDecimal = params.minDecimal || 4;
                var outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? utilities_1.decimalFormatted(value, minDecimal, maxDecimal) : value;
                if (!isNumber) {
                    return '';
                }
                else if (value >= 0) {
                    return "<span style=\"color:green; font-weight: bold;\">$" + outputValue + "</span>";
                }
                else {
                    return "<span style=\"color:red; font-weight: bold;\">$" + outputValue + "</span>";
                }
            });
        }
    };
});
//# sourceMappingURL=dollarColoredBoldFormatter.js.map