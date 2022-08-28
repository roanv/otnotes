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
    name: "A",
    children: [
      {
        id: "4",
        name: "A-A",
        children: [
          {
            id: "13",
            name: "A-A-A",
            children: [
              { id: "20", name: "A-A-A-A" },
              { id: "21", name: "A-A-A-B" },
              { id: "22", name: "A-A-A-C" },
            ],
          },
          {
            id: "23",
            name: "A-A-B",
            children: [
              { id: "26", name: "A-A-B-A" },
              { id: "27", name: "A-A-B-B" },
              { id: "28", name: "A-A-B-C" },
            ],
          },
          { id: "24", name: "A-A-C" },
          { id: "25", name: "A-A-D" },
        ],
      },
      {
        id: "5",
        name: "A-B",
        children: [
          { id: "17", name: "A-B-A" },
          { id: "18", name: "A-B-B" },
          { id: "19", name: "A-B-C" },
        ],
      },
      { id: "6", name: "A-C" },
    ],
  },
  {
    id: "2",
    name: "B",
    children: [
      { id: "7", name: "B-A" },
      { id: "8", name: "B-B" },
      { id: "9", name: "B-C" },
    ],
  },
  {
    id: "3",
    name: "C",
    children: [
      { id: "10", name: "C-A" },
      { id: "11", name: "C-B" },
      { id: "12", name: "C-C" },
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
