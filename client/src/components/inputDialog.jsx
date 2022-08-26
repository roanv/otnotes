import React, { useState, useEffect } from "react";
import GoalAPI from "../services/goals";

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
  goals,
}) {
  const [validInput, setValidInput] = useState(false);
  useEffect(() => {
    const valid = GoalAPI.isValid(input, "name");
    const duplicate = GoalAPI.listContains(goals, input);
    setValidInput(valid && !duplicate);
  }, [input]);

  return (
    <Dialog open={open} onClose={closeDialog}>
      <form onSubmit={(e) => e.preventDefault()}>
        <DialogTitle>{title}</DialogTitle>
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
