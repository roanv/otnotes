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
    name: "item A",
    children: [
      {
        id: "4",
        name: "item A.1",
        children: [
          {
            id: "13",
            name: "item A.1.1",
            children: [
              { id: "20", name: "item A.1..1" },
              { id: "21", name: "item A.1.2" },
              { id: "22", name: "item A.1.3" },
            ],
          },
          {
            id: "23",
            name: "item A.1.2",
            children: [
              { id: "26", name: "item A.1..1" },
              { id: "27", name: "item A.1.2" },
              { id: "28", name: "item A.1.3" },
            ],
          },
          { id: "24", name: "item A.1.3" },
          { id: "25", name: "item A.1.3" },
        ],
      },
      {
        id: "5",
        name: "item A.2",
        children: [
          { id: "17", name: "item A.2.1" },
          { id: "18", name: "item A.2.2" },
          { id: "19", name: "item A.2.3" },
        ],
      },
      { id: "6", name: "item A.3" },
    ],
  },
  {
    id: "2",
    name: "item B",
    children: [
      { id: "7", name: "item B.1" },
      { id: "8", name: "item B.2" },
      { id: "9", name: "item B.3" },
    ],
  },
  {
    id: "3",
    name: "item C",
    children: [
      { id: "10", name: "item C.1" },
      { id: "11", name: "item C.2" },
      { id: "12", name: "item C.3" },
    ],
  },
];
// const initialState = [
//   { id: 1, name: "item A", path: [1] },
//   { id: 4, name: "item A.1", path: [1, 4] },
//   { id: 5, name: "item A.2", path: [1, 5] },
//   { id: 6, name: "item A.3", path: [1, 6] },
//   { id: 2, name: "item B", path: [2] },
//   { id: 7, name: "item B.1", path: [2, 7] },
//   { id: 8, name: "item B.2", path: [2, 8] },
//   { id: 9, name: "item B.3", path: [2, 9] },
//   { id: 3, name: "item C", path: [3] },
//   { id: 10, name: "item C.1", path: [3, 10] },
//   { id: 11, name: "item C.2", path: [3, 11] },
//   { id: 12, name: "item C.3", path: [3, 12] },
// ];

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
