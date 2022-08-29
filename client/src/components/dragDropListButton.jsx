import { useDrag, useDrop } from "react-dnd";
import { useRef, useEffect, useState } from "react";
import { Chip, Divider, ListItemButton, ListItemText } from "@mui/material";
export const TYPE = {
  ITEM: "item",
};

const move = {
  ACTIONS: { UP: -1, DOWN: 1, MERGE: 0 },
  divisions: 4,
  up: {},
  down: {},
  /**@param {Number} height */
  set height(height) {
    this.up.min = 0;
    this.up.max = height / this.divisions;
    this.down.min = height - height / this.divisions;
    this.down.max = height;
  },
};

function DragDropListButton({ node, handleDragDrop }) {
  const { id, name, path } = node;
  const ref = useRef(null);
  const [action, setAction] = useState(null);

  const [{ hovering }, drop] = useDrop({
    accept: TYPE.ITEM,
    drop: (item, monitor) => {
      // console.log("from ", item.path, " to ", path);
      const origin = item.id;
      const destination = id;
      handleDragDrop(origin, destination, action);
    },
    collect: (monitor) => ({
      hovering: monitor.canDrop() && monitor.isOver(),
    }),
    hover(item, monitor) {
      const boundingBox = ref.current?.getBoundingClientRect();
      if (!move.height) {
        move.height = boundingBox.bottom - boundingBox.top;
      }
      const mouseGlobal = monitor.getClientOffset();
      const mouse = mouseGlobal.y - boundingBox.top;

      if (mouse > move.up.min && mouse < move.up.max)
        setAction(move.ACTIONS.UP);

      if (mouse > move.down.min && mouse < move.down.max)
        setAction(move.ACTIONS.DOWN);

      if (mouse > move.up.max && mouse < move.down.min)
        setAction(move.ACTIONS.MERGE);
    },
  });

  const [{ dragging }, drag] = useDrag({
    type: TYPE.ITEM,
    item: () => {
      return { id };
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <div ref={ref}>
      {hovering && action === move.ACTIONS.UP ? <Divider /> : null}
      <ListItemButton
        selected={!dragging && hovering && action === move.ACTIONS.MERGE}
        disabled={dragging && hovering && action === move.ACTIONS.MERGE}
      >
        <ListItemText primary={`${id} :::: ${name}`}></ListItemText>
      </ListItemButton>
      {hovering && action === move.ACTIONS.DOWN ? <Divider /> : null}
    </div>
  );
}
export default DragDropListButton;
