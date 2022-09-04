import { TreeItem, TreeView } from "@mui/lab";
import { useReducer, useEffect } from "react";
import { useTitle } from "../context/title";
import api from "../services/areas";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DragDropListButton from "./dragDropListButton";

const ACTIONS = {
  FETCHED: "fetched",
  EXPAND: "expand",
};

function convertPaths(list) {
  return list.map((item) => {
    if (!Array.isArray(item.path)) {
      item.path = item.path.split(".");
      item.path = item.path.map((path) => parseInt(path));
      return item;
    }
  });
}

function treeFromList(list) {
  const tree = list.map((area) => {
    const parentID = area.path[area.path.length - 2];
    if (parentID) {
      const parent = list.find((item) => item.id === parentID);
      if (!parent.children) parent.children = [];
      parent.children.push(area);
      return;
    }
    return area;
  });
  return tree.filter((item) => item);
}

function reducer(areas, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCHED:
      const list = convertPaths(payload);
      const tree = treeFromList(list);
      return { list, tree };
    default:
      console.log("unexpected dispatch");
  }
}

function Areas() {
  const [title, setTitle] = useTitle();
  const [areas, dispatch] = useReducer(reducer, { tree: [], list: [] });

  useEffect(() => {
    setTitle("Areas of Development");
  });

  useEffect(() => {
    async function fetchAreas() {
      try {
        const payload = await api.fetch();
        dispatch({ type: ACTIONS.FETCHED, payload });
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
      disableSelection={true}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderRoots(areas.tree)}
    </TreeView>
  );
}

export default Areas;
