import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DragDropListButton from "./dragDropListButton";
import React, { useEffect, useReducer, useState } from "react";

function reducer(items, { type, payload }) {
  switch (type) {
    default:
      console.error("Undefined reducer called");
      return items;
  }
}

function DragDrop2() {
  const [items, dispatch] = useReducer(reducer, initialState);

  function renderRoots(roots, parent) {
    return roots.map((root) => {
      const trueParent = root.path[root.path.length - 2];
      console.log(parent);
      if (trueParent !== parent) return false;
      return (
        <TreeItem
          label={root.name}
          key={root.id}
          nodeId={root.id.toString()}
        ></TreeItem>
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

const initialState = [
  {
    id: 1,
    name: "Centrocercus urophasianus",
    path: [1],
  },
  {
    id: 2,
    name: "Manouria emys",
    path: [1, 2],
  },
  {
    id: 3,
    name: "Myiarchus tuberculifer",
    path: [1, 2, 3],
  },
  {
    id: 4,
    name: "Dacelo novaeguineae",
    path: [1, 2, 3, 4],
  },
  {
    id: 5,
    name: "Cyrtodactylus louisiadensis",
    path: [1, 2, 3, 5],
  },
  {
    id: 6,
    name: "Kobus vardonii vardoni",
    path: [1, 2, 3, 6],
  },
  {
    id: 7,
    name: "Pteropus rufus",
    path: [1, 2, 7],
  },
  {
    id: 8,
    name: "Macropus parryi",
    path: [1, 2, 7, 8],
  },
  {
    id: 9,
    name: "Bettongia penicillata",
    path: [1, 2, 7, 9],
  },
  {
    id: 10,
    name: "Sarkidornis melanotos",
    path: [10],
  },
  {
    id: 11,
    name: "Phascogale calura",
    path: [10, 11],
  },
  {
    id: 12,
    name: "Rangifer tarandus",
    path: [10, 12],
  },
  {
    id: 13,
    name: "Potamochoerus porcus",
    path: [10, 13],
  },
  {
    id: 14,
    name: "Macropus fuliginosus",
    path: [10, 14],
  },
  {
    id: 15,
    name: "Buteo regalis",
    path: [15],
  },
  {
    id: 16,
    name: "Canis aureus",
    path: [16],
  },
  {
    id: 17,
    name: "Uraeginthus bengalus",
    path: [17],
  },
  {
    id: 18,
    name: "Buteo jamaicensis",
    path: [50, 18],
  },
  {
    id: 19,
    name: "Mazama gouazoubira",
    path: [50, 19],
  },
  {
    id: 20,
    name: "Bassariscus astutus",
    path: [50, 20],
  },
  {
    id: 21,
    name: "Dacelo novaeguineae",
    path: [50, 21],
  },
  {
    id: 22,
    name: "Meleagris gallopavo",
    path: [50, 22],
  },
  {
    id: 23,
    name: "Dicrostonyx groenlandicus",
    path: [50, 23],
  },
  {
    id: 24,
    name: "Speotyte cuniculata",
    path: [50, 24],
  },
  {
    id: 25,
    name: "Bucephala clangula",
    path: [50, 25],
  },
  {
    id: 26,
    name: "Bison bison",
    path: [50, 26],
  },
  {
    id: 27,
    name: "Equus burchelli",
    path: [50, 27],
  },
  {
    id: 28,
    name: "Plocepasser mahali",
    path: [50, 28],
  },
  {
    id: 29,
    name: "Cercopithecus aethiops",
    path: [50, 29],
  },
  {
    id: 30,
    name: "Zenaida asiatica",
    path: [50, 30],
  },
  {
    id: 31,
    name: "Laniarius ferrugineus",
    path: [50, 31],
  },
  {
    id: 32,
    name: "Streptopelia decipiens",
    path: [50, 32],
  },
  {
    id: 33,
    name: "Tachyglossus aculeatus",
    path: [50, 33],
  },
  {
    id: 34,
    name: "Cebus albifrons",
    path: [50, 34],
  },
  {
    id: 35,
    name: "Connochaetus taurinus",
    path: [50, 35],
  },
  {
    id: 36,
    name: "Phascogale tapoatafa",
    path: [50, 36],
  },
  {
    id: 37,
    name: "Acrobates pygmaeus",
    path: [50, 37],
  },
  {
    id: 38,
    name: "Egretta thula",
    path: [50, 38],
  },
  {
    id: 39,
    name: "Axis axis",
    path: [50, 39],
  },
  {
    id: 40,
    name: "Kobus leche robertsi",
    path: [50, 40],
  },
  {
    id: 41,
    name: "Erinaceus frontalis",
    path: [50, 41],
  },
  {
    id: 42,
    name: "Ursus americanus",
    path: [50, 42],
  },
  {
    id: 43,
    name: "Naja nivea",
    path: [50, 43],
  },
  {
    id: 44,
    name: "Genetta genetta",
    path: [50, 44],
  },
  {
    id: 45,
    name: "Castor fiber",
    path: [50, 45],
  },
  {
    id: 46,
    name: "Erinaceus frontalis",
    path: [50, 46],
  },
  {
    id: 47,
    name: "Leptoptilos crumeniferus",
    path: [50, 47],
  },
  {
    id: 48,
    name: "Otocyon megalotis",
    path: [50, 48],
  },
  {
    id: 49,
    name: "Cereopsis novaehollandiae",
    path: [50, 49],
  },
  {
    id: 50,
    name: "Ara chloroptera",
    path: [50],
  },
];
