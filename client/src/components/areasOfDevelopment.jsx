import React, { useEffect, useReducer, useState } from "react";
import update from "immutability-helper";
import { useTitle } from "../context/title";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DragDropListButton from "./dragDropListButton";

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

const ACTIONS = { DROP: "drop", EXPAND: "expand", DRAG: "disable" };
// return update(areas, {
//   $splice: [
//     [action.from, 1],
//     [action.to, 0, areas[action.from]],
//   ],
// });

// function getAreaFromPath(areas, [key, ...path]) {
//   key = areas.findIndex((a) => a.id === key);
//   if (path.length) return getAreaFromPath(areas[key].children, path);
//   return areas[key];
// }

// function getExpanded(areas) {
//   const list = [];
//   areas.map((area) => {
//     if (area.expanded) list.push(area);
//     if (area.children) list.push(...getExpanded(area.children));
//   });
//   return list;
// }

// function getVisible(areas) {
//   return areas.filter((area) => {
//     if (!area.parent) return area;
//     const parent = areas.find((parent) => parent.id == area.parent);
//     if (parent.expanded) return area;
//   });
// }

function setExpanded(areas, nodes) {
  return areas.map((area) => {
    const exists = nodes.indexOf(area.id.toString()) >= 0;
    if (exists) area.expanded = true;
    else area.expanded = false;
    return area;
  });
}

function merge(origin, target, areas) {
  if (origin === target) return areas;
  target = areas.find((area) => area.id === target);
  if (hasAncestor(target, origin, areas)) return areas;
  return areas.map((area) => {
    if (area.id == origin) area.parent = target.id;
    return area;
  });
}

function hasAncestor(child, ancestor, areas) {
  if (child.parent === ancestor) return true;
  const parent = areas.find((area) => area.id === child.parent);
  if (child.parent) return hasAncestor(parent, ancestor, areas);
  return false;
}

function findArea(id, areas) {
  return areas.find((area) => (area.id === id ? area : null));
}

function reducer(areas, { type, payload }) {
  switch (type) {
    case ACTIONS.DROP:
      const { origin, target, offset } = payload;
      let result = areas;
      if (offset === 0) result = merge(origin, target, areas);
      // console.log(origin, cursor, offset);
      // const visible = getVisible(areas);
      // const cursorIndex = visible.findIndex((id) => id === cursor);
      // const originIndex = visible.findIndex((id) => id === origin);
      result = areas.map((area) => {
        area.isDragging = false;
        return area;
      });
      return result;
    case ACTIONS.EXPAND:
      return setExpanded(areas, payload.nodes);
    case ACTIONS.DRAG:
      const { id } = payload;
      return areas.map((area) => {
        if (
          area.id === id ||
          hasAncestor(area, id, areas) ||
          findArea(id, areas).parent === area.id
        )
          area.isDragging = true;
        return area;
      });
    default:
      console.error("Undefined reducer called");
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
  const [areas, dispatch] = useReducer(reducer, initialState);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setTitle("Drag Drop");
  });

  function handleNodeToggle(event, nodes) {
    dispatch({ type: ACTIONS.EXPAND, payload: { nodes } });
  }

  function renderTree() {
    const roots = areas.filter((node) => !node.parent);
    return roots.map((root) => renderRoots(root, areas));
  }

  function renderRoots(root, tree) {
    const children = tree.filter((node) => node.parent === root.id);
    return (
      <TreeItem
        label={renderNode(root)}
        nodeId={root.id.toString()}
        key={root.id}
      >
        {children.map((child) => renderRoots(child, tree))}
      </TreeItem>
    );
  }

  function renderNode(node) {
    return (
      <DragDropListButton
        handleDrop={(origin, target, offset) => {
          dispatch({
            type: ACTIONS.DROP,
            payload: { origin, target, offset },
          });
        }}
        handleDrag={(id) => {
          dispatch({
            type: ACTIONS.DRAG,
            payload: { id },
          });
        }}
        node={node}
      ></DragDropListButton>
    );
  }

  function getExpanded() {
    return areas.map((area) => {
      if (area.expanded) return area.id.toString();
    });
  }

  return (
    <TreeView
      onNodeToggle={handleNodeToggle}
      // expanded={getExpanded()}
      disableSelection={true}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree()}
    </TreeView>
  );
}

export default AreasOfDevelopment;
