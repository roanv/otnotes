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
      try {
        setGoals(await GoalAPI.fetch());
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    update();
  }, []);

  const handleAdd = (input) => {
    setCreateDialogOpen(false);
    async function save() {
      setLoading(true);
      try {
        const [result] = await GoalAPI.create({ name: input });
        setGoals([result, ...goals]);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    }
    save();
  };

  const handleUpdate = (input, goal) => {
    setUpdateDialogOpen(false);
    async function update() {
      setLoading(true);
      try {
        const [result] = await GoalAPI.update({ id: goal.id, name: input });
        const index = goals.indexOf(goal);
        setGoals([...goals.slice(0, index), result, ...goals.slice(index + 1)]);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    }
    update();
  };

  const handleDelete = (goal) => {
    async function remove() {
      setLoading(true);
      try {
        const [result] = await GoalAPI.remove(goal);
        const index = goals.indexOf(goal);
        setGoals([...goals.slice(0, index), ...goals.slice(index + 1)]);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);

      setLoading(false);
    }
  };

  const handleOpenContextMenu = (event, goal) => {
    setSelectedAnchor(event.currentTarget);
    setSelectedItem(goal);
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
