import {
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  TextField,
  Typography,
  IconButton,
  Modal,
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import {
  AvailableSalesRep,
  Customer,
  EnabledTags,
  RegistrationStatus,
} from "../types";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useState,
} from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getFilters } from "../helper/formatCustomersData";

type ApplynRemoveTagsPropsType = {
  selectedRows: Customer[];
  customers: Customer[];
  customersCopy: Customer[];
  handleChange: (event: any) => void;
  setCustomersCopy: Dispatch<SetStateAction<Customer[]>>;
};

const ApplynRemoveTags = memo(function ({
  selectedRows,
  handleChange,
  customers,
  customersCopy,
  setCustomersCopy,
}: ApplynRemoveTagsPropsType) {
  const [open, setOpen] = useState<{
    state: boolean;
    openedBy: string;
  }>({
    state: false,
    openedBy: "",
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<{
    enabledTags: EnabledTags[];
    salesRepName: AvailableSalesRep[];
    registrationStatus: RegistrationStatus[];
  }>();

  useEffect(() => {
    if (open.openedBy === "ApplyTags")
      setTags(getFilters(selectedRows, customers));
    else setTags(getFilters(selectedRows));
  }, [selectedRows, open.openedBy]);

  const toggleModalState = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    const name: string = event.currentTarget.name
      ? event.currentTarget.name
      : "";
    setOpen({ state: !open.state, openedBy: name });
  };

  const handleTagApplyRemoveChange = (event: ChangeEvent<any>) => {
    const { name, checked } = event.target as HTMLInputElement;
    if (checked) setSelectedTags((prevValue: any) => [...prevValue, name]);
    else {
      setSelectedTags((prevValue: any) =>
        prevValue.filter((elem: string) => elem !== name)
      );
    }
  };

  const handleApply = () => {
    const updatedCustomers = customers.map((customer) => {
      if (selectedRows.find((row) => row.id === customer.id)) {
        const newTags = [
          ...new Set([...(customer.enabledTags || []), ...selectedTags]),
        ];
        return { ...customer, enabledTags: newTags };
      }
      return customer;
    });

    setCustomersCopy(updatedCustomers);
    setSelectedTags([]);
    setOpen({ state: false, openedBy: "" });
  };

  const handleRemove = () => {
    const updatedCustomers = customers.map((customer) => {
      if (selectedRows.find((row) => row.id === customer.id)) {
        const newTags = (customer.enabledTags || []).filter(
          (tag) => !selectedTags.includes(tag)
        );
        return { ...customer, enabledTags: newTags.length ? newTags : null };
      }
      return customer;
    });

    setCustomersCopy(updatedCustomers);
    setSelectedTags([]);
    setOpen({ state: false, openedBy: "" });
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="start" gap={2}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              indeterminate={
                selectedRows.length >= 1 &&
                selectedRows.length !== customersCopy.length
              }
              checked={selectedRows.length === customersCopy?.length || false}
              onChange={handleChange}
              inputProps={{ "aria-label": "indeterminate checkbox" }}
            />
          }
          label={
            selectedRows.length
              ? `${selectedRows.length} customers selected`
              : ""
          }
          style={{ margin: 0 }}
        />
      </FormGroup>

      <Button
        variant="contained"
        color="primary"
        disableElevation
        name="ApplyTags"
        aria-label="Apply Tags"
        onClick={toggleModalState}
        startIcon={<ChecklistIcon />}
        disabled={selectedRows.length ? false : true}
      >
        APPLY TAGS
      </Button>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        name="RemoveTags"
        aria-label="Remove Tags"
        onClick={toggleModalState}
        startIcon={<ChecklistIcon />}
        disabled={selectedRows.length ? false : true}
      >
        REMOVE TAGS
      </Button>

      <Modal
        open={open.state}
        onClose={toggleModalState}
        className="modalOuterWrapper"
      >
        <Box className="modalWrapper applyRemoveTagsModal">
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            textAlign="left"
            gap={1}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={"100%"}
            >
              <Typography variant="h6">
                {open.openedBy === "ApplyTags"
                  ? "Bulk Apply Tags"
                  : "Bulk Remove Tags"}
              </Typography>
              <IconButton
                onClick={toggleModalState}
                color="primary"
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </Stack>

            <Typography variant="body2" marginBottom={1.5}>
              {open.openedBy === "ApplyTags" ? (
                <span>
                  To apply tags to the selected Customers, <b>check</b> the tags
                  you wish to apply and then click APPLY
                </span>
              ) : (
                <span>
                  To remove tags from the selected Customers, <b>uncheck</b>the
                  tags you wish to remove and then click REMOVE
                </span>
              )}
            </Typography>
            <Typography variant="body2" color="GrayText">
              Selected Customers:
              <Typography
                component={"span"}
                variant="body2"
                color="black"
                marginLeft="4px"
              >
                {selectedRows.length}
              </Typography>
            </Typography>
          </Stack>

          <TextField
            variant="outlined"
            placeholder="Search Tags"
            fullWidth
            margin="normal"
          />

          {tags &&
            tags.enabledTags.map((tag: any, index: number) => {
              if (tag.tag !== "(Blanks)")
                return (
                  <Box
                    key={tag.tag + index}
                    display="flex"
                    alignItems="center"
                    mt={1}
                  >
                    <Checkbox
                      edge="start"
                      name={tag.tag}
                      checked={selectedTags.includes(tag.tag)}
                      onClick={handleTagApplyRemoveChange}
                    />
                    <Typography
                      variant="body2"
                      borderRadius="2rem"
                      paddingY="5px"
                      paddingX="10px"
                      style={{ backgroundColor: "#f3e1ad" }}
                    >
                      {tag.tag} ({tag.count})
                    </Typography>
                  </Box>
                );
            })}

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="text" sx={{ mr: 1 }}>
              CANCEL
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                open.openedBy === "ApplyTags" ? handleApply() : handleRemove();
              }}
            >
              {open.openedBy === "ApplyTags" ? "APPLY" : "REMOVE"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Stack>
  );
});

export default ApplynRemoveTags;
