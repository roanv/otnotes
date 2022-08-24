import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Button,
} from "@mui/material";
export default function TextDialog({
  open,
  handleClose,
  newGoalInput,
  handleAdd,
  handleInput,
  validInput,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Goal</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Goal Name"
          type="text"
          fullWidth
          variant="standard"
          value={newGoalInput}
          onChange={(event) => handleInput(event)}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={!validInput} onClick={handleAdd}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
