import React, { useEffect, useReducer } from "react";
import update from "immutability-helper";
import { useTitle } from "../context/title";
import { TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import TreeNode from "./treeNode";

const initialState = [
  {
    id: "1",
    name: "0",
    children: [
      {
        id: "4",
        name: "0-0",
        children: [
          {
            id: "13",
            name: "0-0-0",
            children: [
              { id: "20", name: "0-0-0-0" },
              { id: "21", name: "0-0-0-1" },
              { id: "22", name: "0-0-0-2" },
            ],
          },
          {
            id: "23",
            name: "0-0-1",
            children: [
              { id: "26", name: "0-0-1-0" },
              { id: "27", name: "0-0-1-1" },
              { id: "28", name: "0-0-1-2" },
            ],
          },
          { id: "24", name: "0-0-2" },
          { id: "25", name: "0-0-3" },
        ],
      },
      {
        id: "5",
        name: "0-1",
        children: [
          { id: "17", name: "0-1-0" },
          { id: "18", name: "0-1-1" },
          { id: "19", name: "0-1-2" },
        ],
      },
      { id: "6", name: "0-2" },
    ],
  },
  {
    id: "2",
    name: "1",
    children: [
      { id: "7", name: "1-0" },
      { id: "8", name: "1-1" },
      { id: "9", name: "1-2" },
    ],
  },
  {
    id: "3",
    name: "2",
    children: [
      { id: "10", name: "2-0" },
      { id: "11", name: "2-1" },
      { id: "12", name: "2-2" },
    ],
  },
];

const ACTIONS = { SET: "set", MOVE: "move" };

function reducer(areas, action) {
  switch (action.type) {
    case ACTIONS.SET:
      return areas;
    case ACTIONS.MOVE:
      // return update(areas, {
      //   $splice: [
      //     [action.from, 1],
      //     [action.to, 0, areas[action.from]],
      //   ],
      // });

      return areas;
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
  const [title, setTitle] = useTitle();
  const renderTree = (node, index) => {
    return (
      <TreeNode
        key={node.id}
        rootNode={node}
        rootIndex={index}
        moveItem={(from, to) =>
          dispatch({ type: ACTIONS.MOVE, from: from, to: to })
        }
      ></TreeNode>
    );
  };
  useEffect(() => {
    setTitle("Drag Drop");
  });
  const [areas, dispatch] = useReducer(reducer, initialState);

  return (
    <TreeView
      disableSelection={true}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {areas.map(renderTree)}
    </TreeView>
  );
}

export default AreasOfDevelopment;
