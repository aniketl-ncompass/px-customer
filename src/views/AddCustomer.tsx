import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import addIcon from "../assets/addIcon.svg";
import { ChangeEvent, Dispatch, SetStateAction, memo, useState } from "react";
import { Customer } from "../types";

const names: string[] = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
type AddCustomerType = {
  setCustomers: Dispatch<SetStateAction<any>>;
};

const AddCustomer = memo(function ({ setCustomers }: AddCustomerType) {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [salesRep, setSalesRep] = useState<string>("");

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setSalesRep("");
    setOpen(false);
  };

  const handleAddingCustomer = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) return;
    const formData = new FormData(event.target);
    const formObj = Object.fromEntries(formData.entries());

    Object.assign(formObj, {
      id: Math.floor(6000 + Math.random() * 9000),
      registrationStatus: "Incomplete",
      active: true,
      createDate: Date.now(),
      updateDate: "",
      lastActiveDate: "",
      enabledTags: null,
      totalActiveUsers: 0,
      notesCount: 0,
    });
    setCustomers((prevValue: Customer[]) => [...prevValue, formObj]);
    handleClose();
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography
        variant="h2"
        component="h2"
        fontWeight={400}
        fontSize={{ xs: "30px", md: "45", lg: "60px" }}
      >
        Customers
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="addCustButton"
        onClick={handleOpen}
        sx={{
          minWidth: { xs: "35px !important", md: "initial !important" },
          maxWidth: { xs: "35px !important", md: "initial !important" },
          minHeight: { xs: "35px !important", md: "initial !important" },
          maxHeight: { xs: "35px !important", md: "initial !important" },
        }}
      >
        <span className="icon">
          <img src={addIcon} />
        </span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        className="modalOuterWrapper"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="addCustomerModal"
          component={"form"}
          onSubmit={handleAddingCustomer}
        >
          <Stack
            padding={{ xs: "0px 0px 0px 20px", md: "0px 0px 0px 32px" }}
            gap={2}
          >
            <Typography variant="h6">Customer Information</Typography>
            <Stack className="customerFields">
              <TextField
                type="text"
                variant="outlined"
                name="buyerName"
                label="Customer Name"
                required
                sx={{ paddingRight: "20px" }}
              />

              <FormControl sx={{ paddingRight: "20px" }}>
                <InputLabel id="demo-multiple-name-label" required>
                  Sales Rep
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={salesRep}
                  input={
                    <OutlinedInput
                      required
                      name="salesRepName"
                      label="Sales Rep"
                    />
                  }
                  onChange={(event) => setSalesRep(event.target.value)}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "center",
                      horizontal: "center",
                    },
                    transformOrigin: {
                      vertical: "center",
                      horizontal: "center",
                    },
                  }}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                type="number"
                variant="outlined"
                name="phone"
                label="Phone"
                sx={{ paddingRight: "20px" }}
                onChange={(e) => {
                  const reg = new RegExp(
                    "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
                  );
                  if (!reg.test(e.target.value)) setError(true);
                  else {
                    setError(false);
                  }
                }}
                error={error}
                required={true}
              />

              <TextField
                type="text"
                variant="outlined"
                name="state"
                label="State"
                sx={{ paddingRight: "20px" }}
              />
              <TextField
                type="text"
                variant="outlined"
                name="country"
                label="Country"
                sx={{ paddingRight: "20px" }}
              />

              <TextField
                type="email"
                variant="outlined"
                name="email"
                label="Email"
                sx={{ paddingRight: "20px" }}
              />

              <TextField
                type="text"
                variant="outlined"
                name="whatsapp"
                label="Whatsapp"
                sx={{ paddingRight: "20px" }}
              />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            gap={1}
            padding={"0px 32px"}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={error}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
});

export default AddCustomer;
