import { Tree } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { useState } from "react";
import { List, ListItemButton } from "@mui/material";
import { useTheme } from "@mui/material";

const initialState = [
  { id: 1, parent: 0, droppable: true, text: "item A" },
  { id: 2, parent: 0, droppable: true, text: "item B" },
  { id: 3, parent: 0, droppable: true, text: "item C" },
  { id: 4, parent: 1, text: "item A.1" },
  { id: 5, parent: 1, text: "item A.2" },
  { id: 6, parent: 1, text: "item A.3" },
  { id: 7, parent: 2, text: "item B.1" },
  { id: 8, parent: 2, text: "item B.2" },
  { id: 9, parent: 2, text: "item B.3" },
  { id: 10, parent: 3, text: "item C.1" },
  { id: 11, parent: 3, text: "item C.2" },
  { id: 12, parent: 3, text: "item C.3" },
];

function TreeList() {
  const [treeData, setTreeData] = useState(initialState);
  const handleDrop = (newTreeData) => setTreeData(newTreeData);
  const theme = useTheme();

  return (
    <>
      <Tree
        classes={{ root: "List" }}
        tree={treeData}
        rootId={0}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <>
            <div style={{ marginLeft: depth * 10 }}>
              {node.droppable && (
                <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
              )}
              {node.text}
            </div>
          </>
        )}
      />
    </>
  );
}

export default TreeList;
