import {
  Stack,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import uploadIcon from "../assets/uploadIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import { Dispatch, SetStateAction, memo } from "react";

type ShowDeactivatedCustomersPropsType = {
  showDeactivatedUser: boolean;
  setShowDeactivatedUser: Dispatch<SetStateAction<boolean>>;
};

const ShowDeactivatedCustomers = memo(function ({
  showDeactivatedUser,
  setShowDeactivatedUser,
}: ShowDeactivatedCustomersPropsType) {

  const handleDeactivateUserChange = () => {
    setShowDeactivatedUser(!showDeactivatedUser);
  };
  
  return (
    <Stack
      direction="row"
      flexWrap={"wrap"}
      alignItems="center"
      justifyContent="flex-end"
      textAlign="end"
      spacing={1}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button>
          <span className="icon small">
            <img src={uploadIcon} />
          </span>
          <Typography variant="body2" fontSize="small">
            Import
          </Typography>
        </Button>
        <Button>
          <span className="icon small">
            <img src={downloadIcon} />
          </span>
          <Typography variant="body2" fontSize="small">
            Export
          </Typography>
        </Button>
      </Stack>
      <FormGroup dir="row" onChange={handleDeactivateUserChange}>
        <FormControlLabel
          control={
            <Switch
              checked={showDeactivatedUser}
              inputProps={{ "aria-label": "controlled" }}
              size="medium"
            />
          }
          label="Show only Deactivated"
          style={{ marginRight: "8px" }}
        />
      </FormGroup>
    </Stack>
  );
});
export default ShowDeactivatedCustomers;
