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

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedAnchor, setSelectedAnchor] = useState(null);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle("Goals");
  });

  useEffect(() => {
    const update = async () => {
      setLoading(true);
      const result = await getGoals();
      if (result.error) console.error(result.error.message);
      else setGoals(result);
      setLoading(false);
    };
    update();
  }, []);

  const handleAdd = (input) => {
    async function save() {
      setLoading(true);
      const result = await saveGoal({ name: input });
      if (result.error) console.error(result.error.message);
      else setGoals([result, ...goals]);
      setLoading(false);
    }
    save();
    setCreateDialogOpen(false);
  };

  const handleUpdate = (input, item) => {
    setUpdateDialogOpen(false);
    async function update() {
      setLoading(true);
      const result = await updateGoal({ id: item.id, name: input });
      if (result.error) console.error(result.error.message);
      else {
        const index = goals.indexOf(item);
        setGoals([...goals.slice(0, index), result, ...goals.slice(index + 1)]);
      }
      setLoading(false);
    }
    update();
  };

  const handleDelete = (item) => {
    deleteGoal(item);
    const index = goals.indexOf(item);
    setGoals([...goals.slice(0, index), ...goals.slice(index + 1)]);
  };

  const handleOpenContextMenu = (event, item) => {
    setSelectedAnchor(event.currentTarget);
    setSelectedItem(item);
    setContextMenuOpen(true);
  };

  return (
    <>
      <List data={goals} openMenu={handleOpenContextMenu}></List>

      <ContextMenu
        open={contextMenuOpen}
        setOpen={setContextMenuOpen}
        anchor={selectedAnchor}
        item={selectedItem}
        onUpdate={() => setUpdateDialogOpen(true)}
        onDelete={(item) => handleDelete(item)}
        onClose={setContextMenuOpen}
      />
      <TextDialog
        schema={schema}
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        item={selectedItem}
        items={goals}
        handleConfirm={handleUpdate}
        title={"Editing Goal"}
        confirmText="Update"
      />
      <TextDialog
        schema={schema}
        open={createDialogOpen}
        items={goals}
        setOpen={setCreateDialogOpen}
        handleConfirm={handleAdd}
        title="Create New Goal"
        confirmText="Create"
      />

      <Fab
        sx={{ right: 16, bottom: 16, position: "fixed" }}
        color="primary"
        aria-label="add"
        onClick={() => setCreateDialogOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Backdrop sx={{ position: "absolute" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
