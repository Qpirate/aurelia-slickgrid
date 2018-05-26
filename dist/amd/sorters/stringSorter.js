define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stringSorter = function (value1, value2, sortDirection) {
        var position = 0;
        if (value1 === null) {
            position = -1;
        }
        else if (value2 === null) {
            position = 1;
        }
        else if (value1 === value2) {
            position = 0;
        }
        else if (sortDirection) {
            position = value1 < value2 ? -1 : 1;
        }
        else if (!sortDirection) {
            position = value1 < value2 ? 1 : -1;
        }
        return sortDirection * position;
    };
});
//# sourceMappingURL=stringSorter.js.map