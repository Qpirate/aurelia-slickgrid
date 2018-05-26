export class GridEventService {
    constructor() {
        this._eventHandler = new Slick.EventHandler();
    }
    /* OnCellChange Event */
    attachOnCellChange(grid, dataView) {
        // subscribe to this Slickgrid event of onCellChange
        this._eventHandler.subscribe(grid.onCellChange, (e, args) => {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            const column = grid.getColumns()[args.cell];
            // if the column definition has a onCellChange property (a callback function), then run it
            if (typeof column.onCellChange === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onCellChange
                const returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView,
                    gridDefinition: grid.getOptions(),
                    grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellChanges.... function
                column.onCellChange(returnedArgs);
                // e.stopImmediatePropagation();
            }
        });
    }
    /* OnClick Event */
    attachOnClick(grid, dataView) {
        this._eventHandler.subscribe(grid.onClick, (e, args) => {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            const column = grid.getColumns()[args.cell];
            // if the column definition has a onCellClick property (a callback function), then run it
            if (typeof column.onCellClick === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onClick
                const returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView,
                    gridDefinition: grid.getOptions(),
                    grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellClick.... function
                column.onCellClick(returnedArgs);
                e.stopImmediatePropagation();
            }
            // stop the click event bubbling
            // NOTE: We don't want to stop bubbling when doing an input edit, if we do the autoEdit which has intent of doing singleClick edit will become doubleClick edit
            if (grid.getOptions && !grid.getOptions().autoEdit) {
                // e.stopImmediatePropagation();
            }
        });
    }
    dispose() {
        this._eventHandler.unsubscribeAll();
    }
}
//# sourceMappingURL=gridEvent.service.js.map