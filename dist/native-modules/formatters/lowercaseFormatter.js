export var lowercaseFormatter = function (row, cell, value, columnDef, dataContext) {
    // make sure the value is a string
    if (value !== undefined && typeof value !== 'string') {
        value = value + '';
    }
    return value ? value.toLowerCase() : '';
};
//# sourceMappingURL=lowercaseFormatter.js.map