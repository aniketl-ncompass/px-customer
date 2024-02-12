import { Box, Button, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import FilterModal from "./FilterModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { AppliedFilterType } from "../types";

type FilterPropsType = {
  filterName: string;
  filterState: any;
  filterData: any;
  setFilterState: Dispatch<SetStateAction<AppliedFilterType>>;
  appliedFilters: any;
};

const Filter = ({
  filterName,
  filterState,
  filterData,
  setFilterState,
  appliedFilters,
}: FilterPropsType) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent) => {
    const { name, value, checked } = event.target as HTMLInputElement;
    if (filterName === "registrationStatus")
      setFilterState((prevValue: any) => {
        return {
          ...prevValue,
          [filterName]: {
            ...filterState,
            tempValue: value,
          },
        };
      });
    else
      setFilterState((prevValue: any) => {
        return {
          ...prevValue,
          [filterName]: {
            ...filterState,
            tempValue: {
              ...filterState.tempValue,
              [name]: checked,
            },
          },
        };
      });
  };

  const handleApply = () => {
    setFilterState((prevValue) => {
      return {
        ...prevValue,
        [filterName]: {
          ...filterState,
          value:
            filterName === "registrationStatus"
              ? filterState.tempValue
              : Object.keys(filterState.tempValue)
                  .filter((key) => filterState.tempValue[key] === true)
                  .reduce((obj: any, key: any) => {
                    obj[key] = filterState.tempValue[key];
                    return obj;
                  }, {}),
        },
      };
    });
    setOpen(false);
  };

  const handleClear = () => {
    setFilterState((prevValue) => {
      return {
        ...prevValue,
        [filterName]: {
          ...filterState,
          value: filterName === "registrationStatus" ? "" : {},
          tempValue: filterName === "registrationStatus" ? "" : {},
        },
      };
    });
    setOpen(false);
    appliedFilters.current = [];
  };

  const handleClose = () => {
    setFilterState((prevValue) => {
      return {
        ...prevValue,
        [filterName]: {
          ...filterState,
          tempValue:
            filterName === "registrationStatus"
              ? ""
              : Object.keys(filterState.tempValue)
                  .filter((key) => key in filterState.value)
                  .reduce((obj: any, key: any) => {
                    obj[key] = filterState.tempValue[key];
                    return obj;
                  }, {}),
        },
      };
    });
    setOpen(false);
  };

  return (
    <Box width="max-content">
      <Button
        variant={
          Object.keys(filterState.value).length ? "contained" : "outlined"
        }
        disableElevation
        color="primary"
        onClick={() => setOpen(true)}
        style={{ maxWidth: "250px", borderRadius: "2rem" }}
        endIcon={<ModeEditIcon />}
      >
        <Typography
          textOverflow={"ellipsis"}
          textAlign="left"
          maxWidth="100%"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {filterState.label}:{" "}
          {filterName === "registrationStatus"
            ? filterState.value
              ? filterState.value
              : filterState.defaultValue
            : Object.keys(filterState.value).length
            ? Object.keys(filterState.value).join(", ")
            : filterState.defaultValue}
        </Typography>
      </Button>
      <FilterModal
        open={open}
        filterName={filterName}
        filterState={filterState}
        setFilterState={setFilterState}
        filterData={filterData}
        handleChange={handleChange}
        handleApply={handleApply}
        handleClear={handleClear}
        handleClose={handleClose}
      />
    </Box>
  );
};
export default Filter;
