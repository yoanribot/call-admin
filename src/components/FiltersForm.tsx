import React, { useState } from "react";
import { ICallFilter } from "types";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  field: {
    minWidth: 300,
  },
}));

const filterTypeOptions = [
  {
    value: "",
    label: "ALL",
  },
  {
    value: "missed",
    label: "Missed",
  },
  {
    value: "answered",
    label: "Answered",
  },
  {
    value: "voicemail",
    label: "Voicemail",
  },
];

interface Props {
  isOpen: boolean;
  filters: ICallFilter;
  onClose: () => void;
  onSubmit: (filtersData: ICallFilter) => void;
}

const FiltersForm = (props: Props) => {
  const classes = useStyles();
  const { isOpen, filters, onClose, onSubmit } = props;

  const [filterType, setFilterType] = useState(filters.callType);

  const onSave = () => {
    onClose();
    onSubmit({
      callType: filterType,
    });
  };

  const onChange =
    (cbSetter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const { value } = event.target;
      cbSetter(value as string);
    };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Add a new Note"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <form>
            <FormControl>
              <InputLabel id="filter-by-call-type">
                Call type (missed, answered, ...)
              </InputLabel>
              <Select
                labelId="filter-by-call-type"
                value={filterType}
                onChange={onChange(setFilterType)}
                className={classes.field}
              >
                {filterTypeOptions.map((fTYpe) => (
                  <MenuItem value={fTYpe.value}>{fTYpe.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave} color="primary" autoFocus>
          Filter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FiltersForm;
