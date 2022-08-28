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
  inputValues,
  handleInputChange,
  handleConfirm,
  open,
  closeDialog,
  title,
  validInput,
}) {
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
            value={inputValues.name}
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
