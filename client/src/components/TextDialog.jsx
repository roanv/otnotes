import React, { useState, useEffect } from "react";
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
  setInput,
  validInput,
  handleConfirm,
  open,
  close,
  title,
  dialogMode,
}) {
  return (
    <Dialog open={open} onClose={() => close(false)}>
      <form onSubmit={(e) => e.preventDefault()}>
        <DialogTitle>{`${dialogMode} ${title}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Goal Name"
            type="text"
            fullWidth
            variant="standard"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close(false)}>Cancel</Button>
          <Button type="submit" disabled={!validInput} onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
