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
import { fetchGoals, saveGoal } from "../services/goals";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState([]);
  const [title, setTitle] = useTitle();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setTitle("Goals");
  });

  useEffect(() => {
    const update = async () => {
      const data = await fetchGoals();
      setGoals(data);
    };
    update();
  }, []);

  const handleAdd = () => {
    if (validInput()) {
      saveGoal(goal);
      setGoals([...goals, goal]);
      handleClose();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setGoal("");
    setOpen(false);
  };

  const handleChange = (event) => {
    setGoal(event.target.value);
  };

  const validInput = () => {
    return goal.length > 0;
  };

  return (
    <>
      <List data={goals}></List>
      <Fab
        sx={{ right: 16, bottom: 16, position: "absolute" }}
        color="primary"
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
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
            value={goal}
            onChange={handleChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!validInput()} onClick={handleAdd}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
