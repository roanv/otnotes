import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import List from "./common/crudList";
import AddIcon from "@mui/icons-material/Add";
import { useTitle } from "../context/title";
import GoalAPI from "../services/goals";
import ContextMenu from "./contextMenu";

import * as yup from "yup";
import TextDialog from "./TextDialog";

let schema = yup.object().shape({
  name: yup.string().required().min(1).max(100),
});

export default function Goals() {
  const [title, setTitle] = useTitle();
  const [loading, setLoading] = useState(false);

  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const [input, setInput] = useState("");
  const [validInput, setValidInput] = useState(false);

  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState(null);

  useEffect(() => {
    setTitle("Goals");
  });

  useEffect(() => {
    const update = async () => {
      setLoading(true);
      try {
        setGoals(await GoalAPI.fetch());
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    update();
  }, []);

  const handleCreate = () => {
    closeDialog();
    async function save() {
      setLoading(true);
      try {
        const newGoal = { name: input };
        const [result] = await GoalAPI.create(newGoal);
        setGoals([result, ...goals]);
      } catch (error) {
        console.log(error.message);
      }
      setSelectedGoal(null);
      setLoading(false);
    }
    save();
  };

  const handleUpdate = () => {
    closeDialog();
    async function update() {
      setLoading(true);
      try {
        const updateGoal = { id: selectedGoal.id, name: input };
        const [result] = await GoalAPI.update(updateGoal);
        const index = goals.indexOf(selectedGoal);
        setGoals([...goals.slice(0, index), result, ...goals.slice(index + 1)]);
      } catch (error) {
        console.log(error.message);
      }
      setSelectedGoal(null);
      setLoading(false);
    }
    update();
  };

  const handleRemove = () => {
    async function remove() {
      setLoading(true);
      try {
        const [result] = await GoalAPI.remove(selectedGoal);
        const index = goals.indexOf(selectedGoal);
        setGoals([...goals.slice(0, index), ...goals.slice(index + 1)]);
      } catch (error) {
        console.log(error);
      }
      setSelectedGoal(null);
      setLoading(false);
    }
    remove();
  };

  const handleOpenContextMenu = (event, goal) => {
    setMenuAnchor(event.currentTarget);
    setSelectedGoal(goal);
    setContextMenuOpen(true);
  };

  function openDialog(mode) {
    setDialogMode(mode);
    setDialogOpen(true);
    if (mode == "Edit") setInput(selectedGoal.name);
    else setInput("");
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  const dialogHandlers = {
    Create: handleCreate,
    Edit: handleUpdate,
    Delete: handleRemove,
  };

  useEffect(() => {
    const validate = async () => {
      const newGoal = { name: input };
      let valid = await schema.isValid(newGoal);
      const goalInList = goals.find(
        (goal) => goal.name.toLowerCase() === newGoal.name.toLowerCase()
      );
      if (goalInList) valid = false;
      setValidInput(valid);
    };
    validate();
  }, [input]);

  return (
    <>
      <List data={goals} openMenu={handleOpenContextMenu}></List>

      <ContextMenu
        open={contextMenuOpen}
        setOpen={setContextMenuOpen}
        anchor={menuAnchor}
        item={selectedGoal}
        onUpdate={() => openDialog("Edit")}
        onDelete={handleRemove}
        onClose={setContextMenuOpen}
      />
      <TextDialog
        input={input}
        setInput={setInput}
        validInput={validInput}
        open={dialogOpen}
        close={closeDialog}
        handleConfirm={dialogHandlers[dialogMode]}
        title={`${dialogMode} Goal`}
        confirmText={dialogMode}
      />

      <Fab
        sx={{ right: 16, bottom: 16, position: "fixed" }}
        color="primary"
        aria-label="add"
        onClick={() => openDialog("Create")}
      >
        <AddIcon />
      </Fab>

      <Backdrop sx={{ position: "absolute" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
