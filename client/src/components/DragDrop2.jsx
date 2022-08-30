import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DragDropListButton from "./dragDropListButton";
import React, { useEffect, useReducer, useState } from "react";

const initialState = [
  {
    id: 1,
    name: "Balance",
    children: [
      {
        id: 29,
        name: "Self Care",
        children: [
          {
            id: 16,
            name: "Bilateral Integration",
            children: [
              {
                id: 23,
                name: "Position in Space",
                children: [
                  { id: 24, name: "Perceptual Consistency" },
                  { id: 25, name: "Shapes" },
                  { id: 26, name: "Colour" },
                  { id: 27, name: "Dressing" },
                ],
              },
              { id: 17, name: "Symmetrical" },
              { id: 18, name: "Alternate" },
            ],
          },

          {
            id: 19,
            name: "Laterality",
            children: [
              {
                id: 20,
                name: "Fine Motor Coordination",
                children: [
                  { id: 5, name: "Static" },
                  { id: 6, name: "Dynamic" },
                  { id: 7, name: "General Motor Coordination" },
                  { id: 8, name: "Motor Planning" },
                ],
              },
              { id: 21, name: "Directionality" },
              { id: 22, name: "Spatial Rotations" },
            ],
          },
        ],
      },
      { id: 30, name: "Eating" },
      { id: 31, name: "Sleeping" },
      { id: 32, name: "Toileting" },
    ],
  },

  {
    id: 12,
    name: "Hand-Eye Coordination",
    children: [
      {
        id: 4,
        name: "Eye Movements",
        children: [
          { id: 2, name: "Motor Skills" },
          { id: 3, name: "Muscle Tone" },
        ],
      },
      {
        id: 9,
        name: "Posture",
        children: [
          { id: 10, name: "Central Core Stability" },
          { id: 11, name: "Shoulder Stability" },
        ],
      },
    ],
  },
  { id: 13, name: "Ideation", children: [{ id: 14, name: "Planning" }] },

  { id: 15, name: "Execution" },
];

function reducer(items, { type, payload }) {
  switch (type) {
    default:
      console.error("Undefined reducer called");
      return items;
  }
}

function DragDrop2() {
  const [items, dispatch] = useReducer(reducer, initialState);

  function renderRoots(roots) {
    return roots.map((root) => {
      return (
        <TreeItem
          label={renderNode(root)}
          key={root.id}
          nodeId={root.id.toString()}
        >
          {root.children ? renderRoots(root.children) : null}
        </TreeItem>
      );
    });
  }

  function renderNode(node) {
    return <DragDropListButton node={node}></DragDropListButton>;
  }

  return (
    <TreeView
      //   onNodeToggle={handleNodeToggle}
      //   expanded={getExpanded()}
      disableSelection={true}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderRoots(items)}
    </TreeView>
  );
}

export default DragDrop2;
