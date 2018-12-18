System.register([], function (exports_1, context_1) {
    "use strict";
    var CaseType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (CaseType) {
                CaseType[CaseType["camelCase"] = 0] = "camelCase";
                CaseType[CaseType["pascalCase"] = 1] = "pascalCase";
                CaseType[CaseType["snakeCase"] = 2] = "snakeCase";
            })(CaseType || (CaseType = {}));
            exports_1("CaseType", CaseType);
        }
    };
});
//# sourceMappingURL=caseType.js.map