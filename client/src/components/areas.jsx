import { TreeItem, TreeView } from "@mui/lab";
import { useReducer, useEffect } from "react";
import { useTitle } from "../context/title";
import api from "../services/areas";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DragDropListButton from "./dragDropListButton";

const ACTIONS = {
  SET: "set",
};

function reducer(areas, { type, payload }) {
  switch (type) {
    case ACTIONS.SET:
      const result = payload.map((area) => {
        area.path = area.path.split(".");
        area.path = area.path.map((path) => parseInt(path));
        const parentID = area.path[area.path.length - 2];
        if (parentID) {
          const parent = payload.find((item) => item.id === parentID);
          if (!parent.children) parent.children = [];
          parent.children.push(area);
          return null;
        }
        return area;
      });
      return result.filter((item) => item);
    default:
      console.log("unexpected dispatch");
  }
}

function Areas() {
  const [title, setTitle] = useTitle();
  const [areas, dispatch] = useReducer(reducer, []);

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
    return <DragDropListButton node={node}></DragDropListButton>;
  }

  return (
    <TreeView
      disableSelection={true}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderRoots(areas)}
    </TreeView>
  );
}

export default Areas;
