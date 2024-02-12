import { Dispatch, Fragment, SetStateAction, useState } from "react";
import GridData from "./GridData";
import { Customer } from "../types";
import ApplynRemoveTags from "../views/ApplynRemoveTags";

type CustomerTablePropsType = {
  customers: Customer[];
  customersCopy: Customer[];
  setCustomersCopy: Dispatch<SetStateAction<Customer[]>>;
};
const CustomerTable = ({
  customers,
  customersCopy,
  setCustomersCopy
}: CustomerTablePropsType) => {
  const [gridApi, setGridApi] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<Customer[]>([]);

  const handleChange = (event: any) => {
    if (event.target.checked) {
      gridApi.selectAll();
    } else {
      gridApi.deselectAll();
    }
  };

  return (
    <Fragment>
      <ApplynRemoveTags
        selectedRows={selectedRows}
        customers={customers}
        customersCopy={customersCopy}
        handleChange={handleChange}
        setCustomersCopy={setCustomersCopy}
      />
      <GridData
        customers={customersCopy}
        setGridApi={setGridApi}
        setSelectedRows={setSelectedRows}
      />
    </Fragment>
  );
};

export default CustomerTable;
