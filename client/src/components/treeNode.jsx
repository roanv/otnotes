import DragDropListButton from "./dragDropListButton";
import { TreeItem } from "@mui/lab";

function TreeNode({ rootNode, rootIndex, handleDragDrop }) {
  let path = [];
  function renderNodeContents(node) {
    return (
      <DragDropListButton
        handleDragDrop={handleDragDrop}
        node={node}
      ></DragDropListButton>
    );
  }

  function renderChildren(node) {
    if (Array.isArray(node.children)) {
      const result = node.children.map((node, index) =>
        renderNode(node, index)
      );
      path.pop();
      return result;
    }
    path.pop();
    return null;
  }

  function renderNode(node, index) {
    path.push(node.id);
    node.path = [...path];
    return (
      <TreeItem
        nodeId={node.id}
        label={renderNodeContents(node)}
        key={node.id}
        node={node}
      >
        {renderChildren(node)}
      </TreeItem>
    );
  }
  return renderNode(rootNode, rootIndex, []);
}

export default TreeNode;
