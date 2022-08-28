import { useDrag, useDrop } from "react-dnd";
import { useRef, useEffect, useState } from "react";
import { Chip, Divider, ListItemButton, ListItemText } from "@mui/material";
export const TYPE = {
  ITEM: "item",
};

const move = {
  ACTION: { UP: "up", DOWN: "down", MERGE: "merge" },
  divisions: 4,
  up: {},
  down: {},
  set height(height) {
    this.up.min = 0;
    this.up.max = height / this.divisions;
    this.down.min = height - height / this.divisions;
    this.down.max = height;
  },
};

function DragDropListItem({ node }) {
  const { id, name, path } = node;
  const ref = useRef(null);
  const [action, setAction] = useState(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: TYPE.ITEM,
    drop: (item, monitor) => {
      console.log(item.action);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover(item, monitor) {
      // const originPath = item.path;
      // const hoverPath = path;
      // if (origin === destination) return;
      const boundingBox = ref.current?.getBoundingClientRect();
      if (!move.height) {
        move.height = boundingBox.bottom - boundingBox.top;
      }
      const mouseGlobal = monitor.getClientOffset();
      const mouse = mouseGlobal.y - boundingBox.top;

      if (mouse > move.up.min && mouse < move.up.max) {
        setAction(move.ACTION.UP);
        item.action = move.ACTION.UP;
      }
      if (mouse > move.down.min && mouse < move.down.max) {
        setAction(move.ACTION.DOWN);
        item.action = move.ACTION.DOWN;
      }
      if (mouse > move.up.max && mouse < move.down.min) {
        setAction(move.ACTION.MERGE);
        item.action = move.ACTION.MERGE;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TYPE.ITEM,
    item: () => {
      return { id, path };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <div ref={ref}>
      {isOver && canDrop && action === move.ACTION.UP ? <Divider /> : null}
      <ListItemButton>
        <ListItemText primary={`Item ${name} --- Path: ${path}`}></ListItemText>
      </ListItemButton>
      {isOver && canDrop && action === move.ACTION.DOWN ? <Divider /> : null}
    </div>
  );
}
export default DragDropListItem;
