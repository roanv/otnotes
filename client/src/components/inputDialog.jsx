import React, { useState, useEffect } from "react";
import { reach } from "yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
export default function TextDialog({
  input,
  handleInputChange,
  handleConfirm,
  open,
  closeDialog,
  title,
  dialogMode,
  schema,
  goals,
}) {
  const [validInput, setValidInput] = useState(false);
  useEffect(() => {
    const validate = async () => {
      let nameSchema = reach(schema, "name");
      let valid = await nameSchema.isValid(input.name);
      const goalInList = goals.find(
        (goal) => goal.name.toLowerCase() === input.name.toLowerCase()
      );
      if (goalInList) valid = false;
      setValidInput(valid);
    };
    validate();
  }, [input]);

  return (
    <Dialog open={open} onClose={closeDialog}>
      <form onSubmit={(e) => e.preventDefault()}>
        <DialogTitle>{`${dialogMode} ${title}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoComplete="off"
            autoFocus
            margin="dense"
            id="name"
            label="Goal Name"
            type="text"
            fullWidth
            variant="standard"
            value={input.name}
            onChange={handleInputChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit" disabled={!validInput} onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
