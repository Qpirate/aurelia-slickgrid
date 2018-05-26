export const avgTotalsFormatter = (totals, columnDef, grid) => {
    const field = columnDef.field || '';
    const val = totals.avg && totals.avg[field];
    const prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + Math.round(val) + suffix;
    }
    return '';
};
//# sourceMappingURL=avgTotalsFormatter.js.map