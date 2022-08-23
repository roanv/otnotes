import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import List from "./common/crudList";
import AddIcon from "@mui/icons-material/Add";
import { useTitle } from "../context/title";
import { getGoals, saveGoal } from "../services/goals";
import * as yup from "yup";

let schema = yup.object().shape({
  name: yup.string().required().min(1).max(100),
});

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [title, setTitle] = useTitle();
  const [open, setOpen] = useState(false);
  const [validInput, setValidInput] = useState(false);

  useEffect(() => {
    setTitle("Goals");
  });

  useEffect(() => {
    const update = async () => {
      const data = await getGoals();
      setGoals(data);
    };
    update();
  }, []);

  const handleAdd = () => {
    if (validInput) {
      saveGoal(newGoal);
      setGoals([...goals, newGoal]);
      handleClose();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNewGoal("");
    setOpen(false);
  };

  const handleChange = (event) => {
    setNewGoal(event.target.value);
  };

  useEffect(() => {
    const validate = async () => {
      let result = await schema.isValid({ name: newGoal });
      if (goals.includes(newGoal)) result = false;
      setValidInput(result);
    };
    validate();
  }, [newGoal]);

  return (
    <>
      <List data={goals}></List>

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
            value={newGoal}
            onChange={handleChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!validInput} onClick={handleAdd}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Fab
        sx={{ right: 16, bottom: 16, position: "absolute" }}
        color="primary"
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
