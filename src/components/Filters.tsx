import Filter from "../views/Filter";
import { getFilters, filterCustomerData } from "../helper/formatCustomersData";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button, Skeleton, Stack } from "@mui/material";
import { AppliedFilterType, Customer, TransformedFiltersType } from "../types";

type FilterPropsType = {
  customers: Customer[];
  customersCopy: Customer[];
  showDeactivatedUser: boolean;
  setCustomersCopy: Dispatch<SetStateAction<Customer[] | any>>;
};

const Filters = ({
  customers,
  customersCopy,
  showDeactivatedUser,  
  setCustomersCopy,
}: FilterPropsType) => {
  const [transformedFilters, setTransformedFilters] =
    useState<TransformedFiltersType | null>(null);
  const appliedFilters = useRef([]);

  const [filterState, setFilterState] = useState<AppliedFilterType>({
    registrationStatus: {
      label: "Checkout Status",
      defaultValue: "all",
      tempValue: "",
      value: "",
    },
    salesRepName: {
      label: "Sales Rep",
      defaultValue: "all",
      tempValue: {},
      value: {},
    },
    enabledTags: {
      label: "Tags",
      defaultValue: "all",
      tempValue: {},
      value: {},
    },
    createDate: {
      label: "Create",
      defaultValue: "all",
      tempValue: "",
      value: "",
    },
    updateDate: {
      label: "Update",
      defaultValue: "all",
      tempValue: "",
      value: "",
    },
  });

  useEffect(() => {
    setTransformedFilters(getFilters(customers));
  }, [customersCopy]);

  useEffect(() => {
    setFilterState({
      registrationStatus: {
        label: "Checkout Status",
        defaultValue: "all",
        tempValue: "",
        value: "",
      },
      salesRepName: {
        label: "Sales Rep",
        defaultValue: "all",
        tempValue: {},
        value: {},
      },
      enabledTags: {
        label: "Tags",
        defaultValue: "all",
        tempValue: {},
        value: {},
      },
      createDate: {
        label: "Create",
        defaultValue: "all",
        tempValue: "",
        value: "",
      },
      updateDate: {
        label: "Update",
        defaultValue: "all",
        tempValue: "",
        value: "",
      },
    });
  }, [showDeactivatedUser]);

  useEffect(() => {
    setCustomersCopy(() => {
      filterCustomerData(appliedFilters, filterState, customers);
      if (appliedFilters.current.length) {
        return appliedFilters.current;
      } else return customers;
    });
  }, [
    filterState.registrationStatus.value,
    filterState.salesRepName.value,
    filterState.enabledTags.value,
  ]);

  const clearState = () => {
    setFilterState({
      registrationStatus: {
        label: "Checkout Status",
        defaultValue: "all",
        tempValue: "",
        value: "",
      },
      salesRepName: {
        label: "Sales Rep",
        defaultValue: "all",
        tempValue: {},
        value: {},
      },
      enabledTags: {
        label: "Tags",
        defaultValue: "all",
        tempValue: {},
        value: {},
      },
      createDate: {
        label: "Create",
        defaultValue: "all",
        tempValue: "",
        value: "",
      },
      updateDate: {
        label: "Update",
        defaultValue: "all",
        tempValue: "",
        value: "",
      },
    });
    appliedFilters.current = [];
    setCustomersCopy(customers);
  };

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      flexWrap="wrap"
      justifyContent="flex-start"
      gap={2}
    >
      {transformedFilters ? (
        Object.keys(transformedFilters).map((filter: string) => (
          <Filter
            key={filter}
            filterName={filter}
            filterState={filterState[filter]}
            filterData={transformedFilters[filter]}
            setFilterState={setFilterState}
            appliedFilters={appliedFilters}
          />
        ))
      ) : (
        <Skeleton variant="rounded" width="146px" />
      )}
      <Button variant="text" color="primary" onClick={clearState}>
        Clear
      </Button>
    </Stack>
  );
};
export default Filters;
