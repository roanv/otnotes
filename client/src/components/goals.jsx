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
import React, { useState, useEffect, useReducer } from "react";
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

const ACTIONS = {
  SET: "set",
  ADD: "add",
  REMOVE: "remove",
  UPDATE: "update",
};

function reducer(goals, action) {
  let index;
  let newGoals;
  switch (action.type) {
    case ACTIONS.SET:
      return sort(action.goals);
    case ACTIONS.ADD:
      return sort([...goals, action.newGoal]);
    case ACTIONS.UPDATE:
      index = goals.indexOf(action.oldGoal);
      newGoals = [...goals.slice(0, index), ...goals.slice(index + 1)];
      return sort([...newGoals, action.newGoal]);
    case ACTIONS.REMOVE:
      index = goals.indexOf(action.goal);
      newGoals = [...goals.slice(0, index), ...goals.slice(index + 1)];
      return sort(newGoals);
    default:
      throw new Error(`Invalid call on goals reducer: ${action.type}`);
  }
}

export default function Goals() {
  const [title, setTitle] = useTitle();
  const [loading, setLoading] = useState(false);

  const [goals, dispatch] = useReducer(reducer, []);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const [inputValues, setInputValues] = useState({ name: "" });
  const [validInput, setValidInput] = useState({ name: false });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInputValues((prevState) => ({ ...prevState, [id]: value }));
    const valid = GoalAPI.isValid({ [id]: value }, id);
    const isDuplicate = GoalAPI.listContains(goals, { [id]: value });
    setValidInput(valid && !isDuplicate);
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
        dispatch({ type: ACTIONS.SET, goals: newGoals });
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
        const [result] = await GoalAPI.create(inputValues);
        dispatch({ type: ACTIONS.ADD, newGoal: result });
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
        const inputGoal = { id: selectedGoal.id, name: inputValues.name };
        const [result] = await GoalAPI.update(inputGoal);
        dispatch({
          type: ACTIONS.UPDATE,
          oldGoal: selectedGoal,
          newGoal: result,
        });
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
        dispatch({ type: ACTIONS.REMOVE, goal: selectedGoal });
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
    if (mode == "Edit") setInputValues({ name: selectedGoal.name });
    else setInputValues({ name: "" });
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
        inputValues={inputValues}
        handleInputChange={handleInputChange}
        open={inputDialogOpen}
        closeDialog={closeInputDialog}
        handleConfirm={dialogHandlers[dialogMode]}
        title={`${dialogMode} Goal`}
        validInput={validInput}
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
