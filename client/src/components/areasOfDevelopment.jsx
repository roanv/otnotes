import React, { useReducer, useCallback } from "react";
import { List } from "@mui/material";
import update from "immutability-helper";

import DragItem from "./DragItem";

const initialState = [
  { name: "test item 1", id: 1 },
  { name: "test item 2", id: 2 },
  { name: "test item 3", id: 3 },
  { name: "test item 4", id: 4 },
  { name: "test item 5", id: 5 },
  { name: "test item 6", id: 6 },
  { name: "test item 7", id: 7 },
  { name: "test item 8", id: 8 },
  { name: "test item 9", id: 9 },
];

const ACTIONS = { SET: "set", MOVE: "move" };

function reducer(areas, action) {
  switch (action.type) {
    case ACTIONS.SET:
      return areas;
    case ACTIONS.MOVE:
      return update(areas, {
        $splice: [
          [action.from, 1],
          [action.to, 0, areas[action.from]],
        ],
      });
    default:
      return areas;
  }
}

const listStyle = {
  width: "100%",
  maxWidth: { xs: "100vw", sm: "500px" },
  bgcolor: "background.paper",
};

function AreasOfDevelopment() {
  const [areas, dispatch] = useReducer(reducer, initialState);
  return (
    <List>
      {areas.map((area, index) => {
        return (
          <DragItem
            key={area.id}
            listItem={area}
            index={index}
            moveItem={(dragIndex, hoverIndex) =>
              dispatch({ type: ACTIONS.MOVE, from: dragIndex, to: hoverIndex })
            }
          ></DragItem>
        );
      })}
    </List>
  );
}

export default AreasOfDevelopment;
