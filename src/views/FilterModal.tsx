import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { AppliedFilterType } from "../types";

type FilterModalPropsTypes = {
  open: boolean;
  filterName: string;
  filterState: any;
  filterData: any;
  setFilterState: Dispatch<SetStateAction<AppliedFilterType>>;
  handleChange: (event: ChangeEvent) => void;
  handleApply: () => void;
  handleClear: () => void;
  handleClose: () => void;
};

const FilterModal = ({
  open,
  filterName,
  filterState,
  filterData,
  setFilterState,
  handleChange,
  handleApply,
  handleClear,
  handleClose,
}: FilterModalPropsTypes) => {
  
  return (
    <Modal open={open} className="modalOuterWrapper" onClose={handleClose}>
      <Box className="modalWrapper">
        <Stack alignItems="left" gap={2} alignSelf={"stretch"} width="100%">
          <Typography variant="h4">{filterState.label}</Typography>
          <FormControl
            fullWidth
            height="100%"
            component={Stack}
            justifyContent="space-between"
          >
            {filterName === "registrationStatus" ? (
              <RadioGroup
                aria-label={filterName}
                name={filterName}
                value={filterState.tempValue || filterState.value}
                onChange={handleChange}
              >
                {filterData.map((item: any, idx: number) => (
                  <Stack key={Date.now() + idx}>
                    <FormControlLabel
                      value={item.label}
                      control={
                        <Radio
                          value={item.registrationStatus}
                          name={filterName}
                        />
                      }
                      label={`${item.label} (${item.count})`}
                      style={{ marginRight: 4 }}
                    />
                  </Stack>
                ))}
              </RadioGroup>
            ) : (
              <FormGroup aria-label={filterName}>
                {
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          Object.keys(filterState.tempValue).length ===
                            filterData.length &&
                          Object.values(filterState.tempValue).every(
                            (value) => value
                          )
                        }
                        indeterminate={
                          Object.values(filterState.tempValue).some(
                            (value) => value
                          ) &&
                          Object.values(filterState.tempValue).reduce(
                            (count: any, value: any) => count + (value ? 1 : 0),
                            0
                          ) !== filterData.length
                        }
                        onChange={(event) => {
                          const newChecked: any = {};
                          if (event.target.checked) {
                            filterData.forEach((item: any) => {
                              newChecked[item.salesRepName || item.tag] =
                                event.target.checked;
                            });
                          }

                          setFilterState((prevValue: any) => {
                            return {
                              ...prevValue,
                              [filterName]: {
                                ...filterState,
                                tempValue: newChecked,
                              },
                            };
                          });
                        }}
                      />
                    }
                    label="(Select All)"
                    value="all"
                  />
                }
                {filterData.map((item: any, idx: number) => (
                  <Stack key={Date.now() + idx}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={item.salesRepName || item.tag}
                          checked={
                            filterState.tempValue[
                              item.salesRepName || item.tag
                            ] || false
                          }
                          onChange={handleChange}
                          name={item.salesRepName || item.tag}
                        />
                      }
                      label={`${item.salesRepName || item.tag} (${item.count})`}
                      style={{ marginRight: 4 }}
                    />
                  </Stack>
                ))}
              </FormGroup>
            )}
            <Stack
              direction="row"
              alignItems="center"
              gap={1.5}
              justifyContent="flex-end"
            >
              <Button onClick={handleClear}>Clear</Button>
              <Button variant="contained" color="primary" onClick={handleApply}>
                Apply
              </Button>
            </Stack>
          </FormControl>
        </Stack>
      </Box>
    </Modal>
  );
};

export default FilterModal;
