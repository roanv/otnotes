import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import List from "./common/crudList";
import AddIcon from "@mui/icons-material/Add";
import { useTitle } from "../context/title";
import { getGoals, saveGoal, deleteGoal } from "../services/goals";
import ContextMenu from "./contextMenu";

import * as yup from "yup";

let schema = yup.object().shape({
  name: yup.string().required().min(1).max(100),
});

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoalInput, setNewGoalInput] = useState("");
  const [title, setTitle] = useTitle();
  const [open, setOpen] = useState(false);
  const [validInput, setValidInput] = useState(false);

  useEffect(() => {
    setTitle("Goals");
  });

  useEffect(() => {
    const update = async () => {
      setGoals(await getGoals());
    };
    update();
  }, []);

  const handleAdd = () => {
    async function save() {
      if (validInput) {
        const newGoal = await saveGoal({ name: newGoalInput });
        setGoals([newGoal, ...goals]);
      }
    }
    save();
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNewGoalInput("");
    setOpen(false);
  };

  const handleDelete = (item) => {
    setMenuAnchor(null);
    deleteGoal(item);
    const index = goals.indexOf(item);
    setGoals([...goals.slice(0, index), ...goals.slice(index + 1)]);
  };

  useEffect(() => {
    const validate = async () => {
      const newGoal = { name: newGoalInput };
      let result = await schema.isValid(newGoal);
      if (goals.find((goal) => goal.name === newGoal.name)) result = false;
      setValidInput(result);
    };
    validate();
  }, [newGoalInput]);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuItem, setMenuItem] = useState(null);
  const menuOpen = Boolean(menuAnchor);

  const handleMenuOpen = (event, item) => {
    setMenuAnchor(event.currentTarget);
    setMenuItem(item);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <List data={goals} openMenu={handleMenuOpen}></List>

      <ContextMenu
        open={menuOpen}
        anchor={menuAnchor}
        item={menuItem}
        handleDelete={handleDelete}
        handleClose={handleMenuClose}
      />

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
            onChange={(event) => setNewGoalInput(event.target.value)}
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
