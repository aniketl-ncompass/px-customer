import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // table style 1
import 'ag-grid-community/styles/ag-theme-alpine.css'; // table style 2
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Customer } from '../types';
import { commonFormatter, buyerNameAsLInkRenderer, checkoutStatusRenderer, tagsFormatter, dateFormatter, activeRenderer } from '../utils/gridDataUtils';

type GridDataPropsType = {
    customers: Customer[],
    setGridApi: Dispatch<SetStateAction<any>>,
    setSelectedRows: Dispatch<SetStateAction<any>>
}

const GridData = ({ customers, setGridApi, setSelectedRows }: GridDataPropsType) => {
    const [gridRows, setGridRows] = useState<Customer[]>([]);
    const [gridCols] = useState<object[]>([
        { field: "buyerName", headerName: "Customer Name", width: 220, checkboxSelection: true, resizable: false, menuTabs: [], valueFormatter: commonFormatter, cellRenderer: buyerNameAsLInkRenderer },
        { field: "id", headerName: "PhoneX Customer #", width: 150, resizable: false, menuTabs: [], valueFormatter: commonFormatter },
        { field: "registrationStatus", headerName: "Checkout Status", width: 150, resizable: false, menuTabs: [], valueFormatter: commonFormatter, cellRenderer: checkoutStatusRenderer },
        { field: "salesRepName", headerName: "Sales Rep", width: 150, resizable: false, menuTabs: [], valueFormatter: commonFormatter },
        { field: "state", headerName: "State/Prov", width: 150, resizable: false, menuTabs: [], valueFormatter: commonFormatter },
        { field: "country", headerName: "Country", width: 150, resizable: false, menuTabs: [], valueFormatter: commonFormatter },
        { field: "totalActiveUsers", headerName: "Users", width: 150, resizable: false, menuTabs: [], valueFormatter: commonFormatter },
        { field: "notesCount", headerName: "Notes", width: 150, resizable: false, menuTabs: [], valueFormatter: commonFormatter },
        { field: "enabledTags", headerName: "Tags", width: 150, resizable: false, menuTabs: [], tooltipValueGetter: (params: any) => params.value, valueFormatter: tagsFormatter },
        { field: "lastActiveDate", headerName: "Last Active", width: 150, resizable: false, menuTabs: [], valueFormatter: dateFormatter },
        { field: "createDate", headerName: "Create Date", width: 150, resizable: false, menuTabs: [], valueFormatter: dateFormatter },
        { field: "updateDate", headerName: "Update Date", width: 150, resizable: false, menuTabs: [], valueFormatter: dateFormatter },
        { field: "active", headerName: "Active", width: 150, resizable: false, menuTabs: [], cellRenderer: activeRenderer },
    ]);

    useEffect(() => {
        setGridRows(customers);
    }, [customers])

    const defaultColDef = useMemo(() => ({
        filter: true,
        editable: false,

    }), []);


    return (
        <div
            className="ag-theme-alpine large"
            style={{ width: '100%', height: '100vh', minHeight: "300px" }}
        >
            <AgGridReact
                rowData={gridRows}
                onGridReady={(params) => setGridApi(params.api)}
                //@ts-ignore
                columnDefs={gridCols}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                enableCellTextSelection={false}
                suppressMovableColumns={true}
                suppressRowClickSelection={true}
                suppressCellFocus={true}
                enableBrowserTooltips={true}
                onSelectionChanged={(params) => setSelectedRows(params.api.getSelectedRows())}
            />
        </div>
    )
}

export default GridData