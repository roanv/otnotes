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

  const [title, setTitle] = useTitle();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuItem, setMenuItem] = useState(null);
  const menuOpen = Boolean(menuAnchor);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  useEffect(() => {
    setTitle("Goals");
  });

  useEffect(() => {
    const update = async () => {
      setGoals(await getGoals());
    };
    update();
  }, []);

  const handleAdd = (input) => {
    async function save() {
      const newGoal = await saveGoal({ name: input });
      setGoals([newGoal, ...goals]);
    }
    save();
    setAddDialogOpen(false);
  };

  const handleDelete = (item) => {
    handleMenuClose();
    deleteGoal(item);
    const index = goals.indexOf(item);
    setGoals([...goals.slice(0, index), ...goals.slice(index + 1)]);
  };

  const handleUpdate = (input, item) => {
    async function update() {
      handleMenuClose();
      const updatedGoal = await updateGoal({ id: item.id, name: input });
      const index = goals.indexOf(item);
      setGoals([
        ...goals.slice(0, index),
        updatedGoal,
        ...goals.slice(index + 1),
      ]);
    }
    update();
    setUpdateDialogOpen(false);
  };

  const handleMenuOpen = (event, item) => {
    setMenuAnchor(event.currentTarget);
    setMenuItem(item);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const openUpdateDialog = (item) => {
    handleMenuClose();
    setMenuItem(item);
    setUpdateDialogOpen(true);
  };

  return (
    <>
      <List data={goals} openMenu={handleMenuOpen}></List>

      <ContextMenu
        open={menuOpen}
        anchor={menuAnchor}
        item={menuItem}
        onDelete={handleDelete}
        onUpdate={openUpdateDialog}
        onClose={handleMenuClose}
      />

      <TextDialog
        schema={schema}
        open={addDialogOpen}
        items={goals}
        setOpen={setAddDialogOpen}
        handleConfirm={handleAdd}
        title="Create New Goal"
        confirmText="Create"
      />
      <TextDialog
        schema={schema}
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        item={menuItem}
        items={goals}
        handleConfirm={handleUpdate}
        title={"Editing Goal"}
        confirmText="Update"
      />

      <Fab
        sx={{ right: 16, bottom: 16, position: "absolute" }}
        color="primary"
        aria-label="add"
        onClick={() => setAddDialogOpen(true)}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
