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
  DRAG: "drag",
  DROP: "drop",
};

function reducer(areas, { type, payload }) {
  switch (type) {
    case ACTIONS.SET:
      return new TreeList({ fromList: payload });
    case ACTIONS.EXPAND:
      return new TreeList({ clone: areas, expand: payload });
    case ACTIONS.DRAG:
      return new TreeList({ clone: areas, drag: payload });
    case ACTIONS.DROP:
      return new TreeList({ clone: areas, drop: payload });
    default:
      throw new Error("Unexpected Dispatch");
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

  function handleDrag(id) {
    if (!areas.keys[id].isDragging)
      dispatch({ type: ACTIONS.DRAG, payload: id });
  }
  function handleDrop(origin, target, action) {
    dispatch({ type: ACTIONS.DROP, payload: { origin, target, action } });
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
