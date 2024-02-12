import { Grid, Stack } from "@mui/material";
import Search from "../views/Search";
import Filters from "./Filters";
import AddCustomer from "../views/AddCustomer";
import { useEffect, useState } from "react";
import { filteredCustomers } from "../helper/formatCustomersData";
import { Customer } from "../types";
import CustomerTable from "./CustomerTable";
import ShowDeactivatedCustomers from "../views/ShowDeactivatedCustomers";

const Customers = () => {
  const [showDeactivatedUser, setShowDeactivatedUser] =
    useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersCopy, setCustomersCopy] = useState<Customer[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setSearchValue("");
    setCustomers(filteredCustomers(showDeactivatedUser));
  }, [showDeactivatedUser]);

  useEffect(() => {
    setCustomersCopy(customers);
  }, [customers]);

  return (
    <Grid
      container
      textAlign="left"
      gap={3}
      alignSelf="stretch"
      padding={{ xs: "14px 14px 0", md: "24px 24px 0px" }}
    >
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <AddCustomer setCustomers={setCustomers} />
          <ShowDeactivatedCustomers
            showDeactivatedUser={showDeactivatedUser}
            setShowDeactivatedUser={setShowDeactivatedUser}
          />
        </Stack>
      </Grid>
      <Grid item container xs={12} gap={2}>
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          customers={customers}
          customersCopy={customersCopy}
          setCustomersCopy={setCustomersCopy}
        />
        <Grid item xs={12} flexWrap={"wrap"}>
          <Filters
            customers={customers}
            customersCopy={customersCopy}
            setCustomersCopy={setCustomersCopy}
            showDeactivatedUser={showDeactivatedUser}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomerTable
            customers={customers}
            customersCopy={customersCopy}
            setCustomersCopy={setCustomersCopy}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Customers;
