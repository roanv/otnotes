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
  Toolbar,
  Zoom,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import List from "./common/crudList";
import AddIcon from "@mui/icons-material/Add";
import { useTitle } from "../context/title";
import GoalAPI from "../services/goals";
import ContextMenu from "./contextMenu";
import { DRAWER_WIDTH } from "../global";

import * as yup from "yup";
import TextDialog from "./TextDialog";

import { useTheme } from "@mui/material/styles";

function sort(list) {
  list.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );
  return list;
}

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

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  useEffect(() => {
    setTitle("Goals");
  });

  useEffect(() => {
    const update = async () => {
      setLoading(true);
      try {
        const newGoals = await GoalAPI.fetch();
        setGoals(sort(newGoals));
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    update();
  }, []);

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

  const handleCreate = () => {
    closeDialog();
    async function save() {
      setLoading(true);
      try {
        const newGoal = { name: input };
        const [result] = await GoalAPI.create(newGoal);
        const newGoals = [result, ...goals];
        setGoals(sort(newGoals));
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
        const newGoals = [
          ...goals.slice(0, index),
          result,
          ...goals.slice(index + 1),
        ];
        setGoals(sort(newGoals));
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
        const newGoals = [...goals.slice(0, index), ...goals.slice(index + 1)];
        setGoals(sort(newGoals));
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
        title={`Goal`}
        dialogMode={dialogMode}
      />
      <Backdrop
        sx={{ position: "absolute", minHeight: "100vh" }}
        open={loading}
      >
        <CircularProgress
          sx={{
            left: `calc(${DRAWER_WIDTH}-50%)`,
            top: "50vh",
            position: "fixed",
          }}
          color="inherit"
        />
      </Backdrop>
      <Zoom
        in={!loading}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${loading ? transitionDuration.exit : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab
          disabled={loading}
          sx={{ right: 16, bottom: 16, position: "fixed" }}
          color="primary"
          aria-label="add"
          onClick={() => openDialog("Create")}
        >
          <AddIcon />
        </Fab>
      </Zoom>
    </>
  );
}
