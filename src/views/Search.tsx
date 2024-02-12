import { InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, Dispatch, SetStateAction, memo } from "react";
import { Customer } from "../types";

type SearchPropType = {
  searchValue: string;
  customers: Customer[];
  customersCopy: Customer[];
  setCustomersCopy: Dispatch<SetStateAction<Customer[]>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const Search = memo(function ({
  searchValue,
  customers,
  customersCopy,
  setCustomersCopy,
  setSearchValue,
}: SearchPropType) {
  
  useEffect(() => {
    const timeoutcb = setTimeout(() => {
      if (searchValue && customersCopy.length) {
        const filteredCustomers: Customer[] = customers.filter(
          (item: Customer) =>
            item["buyerName"]
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item["id"] === +searchValue ||
            item["state"].toLowerCase().includes(searchValue.toLowerCase()) ||
            item["country"].includes(searchValue)
        );
        setCustomersCopy(filteredCustomers);
      } else if (!searchValue && customers.length !== customersCopy.length) {
        setCustomersCopy(customers);
      }
    }, 500);

    return () => clearTimeout(timeoutcb);
  }, [searchValue]);

  return (
    <TextField
      variant="outlined"
      placeholder="Search Customer"
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value);
      }}
      sx={{
        "& .MuiInputBase-input": { padding: "8px 5px", width: "165px" },
        minWidth: "165px",
        width: "max-content",
      }}
      label="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: searchValue && (
          <InputAdornment
            position="end"
            style={{ cursor: "pointer" }}
            onClick={() => setSearchValue("")}
          >
            <ClearIcon />
          </InputAdornment>
        ),
      }}
    />
  );
});

export default Search;
