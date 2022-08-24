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
  schema,
  items,
  item,
  handleConfirm,
  open,
  setOpen,
  title,
  confirmText,
}) {
  const [input, setInput] = useState("");
  const [validInput, setValidInput] = useState(false);

  useEffect(() => {
    const validate = async () => {
      const newItem = { name: input };
      let result = await schema.isValid(newItem);
      if (items.find((item) => item.name === newItem.name)) result = false;
      setValidInput(result);
    };
    validate();
  }, [input]);

  useEffect(() => {
    if (open && item) setInput(item.name);
    if (!open) setInput("");
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
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
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          disabled={!validInput}
          onClick={() => handleConfirm(input, item)}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
