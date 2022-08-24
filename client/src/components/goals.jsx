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
import { getGoals, saveGoal, deleteGoal, updateGoal } from "../services/goals";
import ContextMenu from "./contextMenu";

import * as yup from "yup";
import TextDialog from "./TextDialog";

let schema = yup.object().shape({
  name: yup.string().required().min(1).max(100),
});

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoalInput, setNewGoalInput] = useState("");
  const [title, setTitle] = useTitle();
  const [open, setOpen] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuItem, setMenuItem] = useState(null);
  const menuOpen = Boolean(menuAnchor);

  useEffect(() => {
    setTitle("Goals");
  });

  useEffect(() => {
    const update = async () => {
      setGoals(await getGoals());
    };
    update();
  }, []);

  useEffect(() => {
    const validate = async () => {
      const newGoal = { name: newGoalInput };
      let result = await schema.isValid(newGoal);
      if (goals.find((goal) => goal.name === newGoal.name)) result = false;
      setValidInput(result);
    };
    validate();
  }, [newGoalInput]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setNewGoalInput("");
    setOpen(false);
  };

  const handleAdd = () => {
    async function save() {
      if (validInput) {
        const newGoal = await saveGoal({ name: newGoalInput });
        setGoals([newGoal, ...goals]);
      }
    }
    save();
    handleCloseDialog();
  };

  const handleDelete = (item) => {
    handleMenuClose();
    deleteGoal(item);
    const index = goals.indexOf(item);
    setGoals([...goals.slice(0, index), ...goals.slice(index + 1)]);
  };

  const handleUpdate = (item) => {
    async function update() {
      handleMenuClose();
      const updatedGoal = await updateGoal(item);
      const index = goals.indexOf(item);
      setGoals([
        ...goals.slice(0, index),
        updatedGoal,
        ...goals.slice(index + 1),
      ]);
    }
    update();
  };

  const handleMenuOpen = (event, item) => {
    setMenuAnchor(event.currentTarget);
    setMenuItem(item);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setNewGoalInput(event.target.value);
  };

  return (
    <>
      <List data={goals} openMenu={handleMenuOpen}></List>

      <ContextMenu
        open={menuOpen}
        anchor={menuAnchor}
        item={menuItem}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        handleClose={handleMenuClose}
      />

      <TextDialog
        open={open}
        handleClose={handleCloseDialog}
        newGoalInput={newGoalInput}
        handleAdd={handleAdd}
        handleInput={handleInputChange}
        validInput={validInput}
      />

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
