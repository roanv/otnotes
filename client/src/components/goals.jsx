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
import InputDialog from "./inputDialog";

import { useTheme } from "@mui/material/styles";

function sort(list) {
  list.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );
  return list;
}

export default function Goals() {
  const [title, setTitle] = useTitle();
  const [loading, setLoading] = useState(false);

  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const [input, setInput] = useState({ name: "" });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInput((prevState) => ({ ...prevState, [id]: value }));
  };

  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const [inputDialogOpen, setInputDialogOpen] = useState(false);
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

  const handleCreate = () => {
    closeInputDialog();
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
    closeInputDialog();
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
    setInputDialogOpen(true);
    if (mode == "Edit") setInput({ name: selectedGoal.name });
    else setInput({ name: "" });
  }

  function closeInputDialog() {
    setInputDialogOpen(false);
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
      <InputDialog
        input={input}
        handleInputChange={handleInputChange}
        open={inputDialogOpen}
        closeDialog={closeInputDialog}
        handleConfirm={dialogHandlers[dialogMode]}
        title={`${dialogMode} Goal`}
        goals={goals}
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
