import React, { useEffect, useReducer } from "react";
import update from "immutability-helper";
import { useTitle } from "../context/title";
import { TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import TreeNode from "./treeNode";

// const initialState = [
//   {
//     id: "schmemes",
//     name: "0",
//     children: [
//       {
//         id: "4",
//         name: "0-0",
//         children: [
//           {
//             id: "13",
//             name: "0-0-0",
//             children: [
//               { id: "20", name: "0-0-0-0" },
//               { id: "21", name: "0-0-0-1" },
//               { id: "22", name: "0-0-0-2" },
//             ],
//           },
//           {
//             id: "23",
//             name: "0-0-1",
//             children: [
//               { id: "26", name: "0-0-1-0" },
//               { id: "27", name: "0-0-1-1" },
//               { id: "28", name: "0-0-1-2" },
//             ],
//           },
//           { id: "24", name: "0-0-2" },
//           { id: "25", name: "0-0-3" },
//         ],
//       },
//       {
//         id: "5",
//         name: "0-1",
//         children: [
//           { id: "17", name: "0-1-0" },
//           { id: "18", name: "0-1-1" },
//           { id: "19", name: "0-1-2" },
//         ],
//       },
//       { id: "6", name: "0-2" },
//     ],
//   },
//   {
//     id: "2",
//     name: "1",
//     children: [
//       { id: "7", name: "1-0" },
//       { id: "8", name: "1-1" },
//       { id: "9", name: "1-2" },
//     ],
//   },
//   {
//     id: "3",
//     name: "2",
//     children: [
//       { id: "10", name: "2-0" },
//       { id: "11", name: "2-1" },
//       { id: "12", name: "2-2" },
//     ],
//   },
// ];

const initialState = [
  { id: 1, name: "A" },
  { id: 2, name: "AA", parent: 1 },
  { id: 3, name: "AAA", parent: 2 },
  { id: 4, name: "AAB", parent: 2 },
  { id: 5, name: "AABA", parent: 4 },
  { id: 6, name: "AABB", parent: 4 },
  { id: 7, name: "AABC", parent: 4 },
  { id: 8, name: "AAC", parent: 2 },
  { id: 9, name: "AB", parent: 1 },
  { id: 10, name: "ABA", parent: 9 },
  { id: 11, name: "ABB", parent: 9 },
  { id: 12, name: "ABC", parent: 9 },
  { id: 13, name: "AC", parent: 1 },
  { id: 14, name: "ACA", parent: 13 },
  { id: 15, name: "ACB", parent: 13 },
  { id: 16, name: "ACC", parent: 13 },
  { id: 17, name: "B" },
  { id: 18, name: "BA", parent: 17 },
  { id: 19, name: "BB", parent: 17 },
  { id: 20, name: "BC", parent: 17 },
  { id: 22, name: "C" },
  { id: 23, name: "CA", parent: 22 },
  { id: 24, name: "CB", parent: 22 },
  { id: 25, name: "CC", parent: 22 },
];

const ACTIONS = { DRAGDROP: "dragdrop", TOGGLENODE: "expand" };
// return update(areas, {
//   $splice: [
//     [action.from, 1],
//     [action.to, 0, areas[action.from]],
//   ],
// });

function getAreaFromPath(areas, [key, ...path]) {
  key = areas.findIndex((a) => a.id === key);
  if (path.length) return getAreaFromPath(areas[key].children, path);
  return areas[key];
}

function getExpanded(areas) {
  const list = [];
  areas.map((area) => {
    if (area.expanded) list.push(area);
    if (area.children) list.push(...getExpanded(area.children));
  });
  return list;
}

function getTreeView(areas) {
  const list = [];
  areas.map((area) => {
    list.push(area.id);
    if (area.expanded && area.children)
      list.push(...getTreeView(area.children));
  });
  return list;
}

function updateExpanded(areas, nodes) {
  return areas.map((area) => {
    if (nodes.indexOf(area.id) >= 0) area.expanded = true;
    else area.expanded = false;
    if (area.children) area.children = updateExpanded(area.children, nodes);
    return area;
  });
}

function merge(origin, target, areas) {}

function reducer(areas, { type, payload }) {
  switch (type) {
    case ACTIONS.DRAGDROP:
      // const { origin, cursor, offset } = payload;
      // const treeView = getTreeView(areas);
      // const cursorIndex = treeView.findIndex((id) => id === cursor);
      // const originIndex = treeView.findIndex((id) => id === origin);
      // const result = merge(origin, cursor, areas);

      // console.log(result);
      return areas;
    case ACTIONS.TOGGLENODE:
      return areas;
    // return updateExpanded(areas, payload.cursorIndex);
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
        handleDragDrop={handleDragDrop}
      ></TreeNode>
    );
  };
  useEffect(() => {
    setTitle("Drag Drop");
  });
  const [areas, dispatch] = useReducer(reducer, initialState);

  return (
    <TreeView
      onNodeToggle={handleNodeToggle}
      disableSelection={true}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {areas.map(renderTree)}
    </TreeView>
  );

  function handleNodeToggle(event, nodes) {
    dispatch({ type: ACTIONS.TOGGLENODE, payload: { nodes } });
  }

  function handleDragDrop(origin, cursor, offset) {
    dispatch({
      type: ACTIONS.DRAGDROP,
      payload: { origin, cursor, offset },
    });
  }
}

export default AreasOfDevelopment;
