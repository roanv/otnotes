import { TreeItem, TreeView } from "@mui/lab";
import { useReducer, useEffect } from "react";
import { useTitle } from "../context/title";
import api from "../services/areas";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DragDropListButton from "./dragDropListButton";
import TreeList from "../classes/treeList";

const ACTIONS = {
  SET: "set",
  EXPAND: "expand",
};

function reducer(areas, { type, payload }) {
  switch (type) {
    case ACTIONS.SET:
      return new TreeList({ fromList: payload });
    case ACTIONS.EXPAND:
      return new TreeList({ clone: areas, expand: payload });
    default:
      console.log("unexpected dispatch");
  }
}

function Areas() {
  const [title, setTitle] = useTitle();
  const [areas, dispatch] = useReducer(reducer, new TreeList({ list: [] }));

  useEffect(() => {
    setTitle("Areas of Development");
  });

  useEffect(() => {
    async function fetchAreas() {
      try {
        const payload = await api.fetch();
        dispatch({ type: ACTIONS.SET, payload });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAreas();
  }, []);

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
    return (
      <DragDropListButton
        handleDrag={handleDrag}
        handleDrop={handleDrop}
        node={node}
      ></DragDropListButton>
    );
  }

  function handleDrag() {}
  function handleDrop() {}

  return (
    <TreeView
      onNodeToggle={(e, payload) => dispatch({ type: ACTIONS.EXPAND, payload })}
      expanded={areas.getExpandedNodes()}
      disableSelection={true}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderRoots(areas.tree)}
    </TreeView>
  );
}

export default Areas;
