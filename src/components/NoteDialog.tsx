import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreateNote: (text: string) => void;
}

const NoteDialog = (props: Props) => {
  const { isOpen, onClose, onCreateNote } = props;

  const [note, setNote] = useState("");

  const onSave = () => {
    if (note.length) {
      onCreateNote(note);
      setNote("");
      onClose();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
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
          <TextField
            id="outlined-multiline-static"
            label="Text"
            multiline
            rows={4}
            value={note}
            variant="outlined"
            onChange={onChange}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;
