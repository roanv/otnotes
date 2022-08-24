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
import { getGoals, saveGoal, deleteGoal } from "../services/goals";
import * as yup from "yup";

let schema = yup.object().shape({
  name: yup.string().required().min(1).max(100),
});

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoalName, setNewGoalName] = useState("");
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
        const newGoal = await saveGoal({ name: newGoalName });
        console.log(newGoal);
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
    setNewGoalName("");
    setOpen(false);
  };

  const handleChange = (event) => {
    setNewGoalName(event.target.value);
  };

  const handleDelete = (item) => {
    deleteGoal(item);
    let index = null;
    goals.find((goal, i) => {
      if (goal.id === item.id) {
        index = i;
      }
    });

    setGoals([...goals.slice(0, index), ...goals.slice(index + 1)]);
  };

  useEffect(() => {
    const validate = async () => {
      let result = await schema.isValid({ name: newGoalName });
      //if (goals.includes(newGoal)) result = false;
      setValidInput(result);
    };
    validate();
  }, [newGoalName]);

  return (
    <>
      <List data={goals} deleteItem={handleDelete}></List>

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
            value={newGoalName}
            onChange={handleChange}
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
