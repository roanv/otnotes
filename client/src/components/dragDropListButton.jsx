import { useDrag, useDrop } from "react-dnd";
import { useRef, useEffect, useState } from "react";
import { Divider, ListItemButton, ListItemText } from "@mui/material";
export const TYPE = {
  ITEM: "item",
};

const dropBox = {
  DIRECTIONS: { UP: -1, CENTER: 0, DOWN: 1 },
  divisions: 3,

  _section: { top: {}, bottom: {}, set: false },

  /**@param {Number} boundsMax */
  set section(boundsMax) {
    this._section.top.min = 0;
    this._section.top.max = boundsMax / this.divisions;
    this._section.bottom.min = boundsMax - boundsMax / this.divisions;
    this._section.bottom.max = boundsMax;
    this._section.set = true;
  },
  get section() {
    return this._section;
  },
};

function DragDropListButton({ node, handleDrop, handleDrag }) {
  const { id, name } = node;
  const ref = useRef(null);
  const [direction, setDirection] = useState(null);

  const [{ hovering }, drop] = useDrop({
    accept: TYPE.ITEM,
    drop: (item, monitor) => {
      const origin = item.id;
      const target = id;
      handleDrop({ origin, target, direction });
    },
    collect: (monitor) => ({
      hovering: monitor.canDrop() && monitor.isOver(),
    }),
    hover(item, monitor) {
      const element = ref.current?.getBoundingClientRect();

      if (!dropBox.section.set) dropBox.section = element.bottom - element.top;
      const { section, DIRECTIONS: OPTIONS } = dropBox;

      const mouseGlobal = monitor.getClientOffset();
      const mouse = mouseGlobal.y - element.top;

      if (mouse > section.top.min && mouse < section.top.max)
        setDirection(OPTIONS.UP);

      if (mouse > section.top.max && mouse < section.bottom.min) {
        setDirection(OPTIONS.CENTER);
      }
      if (mouse > section.bottom.min && mouse < section.bottom.max)
        setDirection(OPTIONS.DOWN);
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
    isDragging: (monitor) => {
      const item = monitor.getItem();
      if (!node.isDragging && item.id === node.id) handleDrag(node.id);
    },
    end: (dropResult, monitor) => {
      handleDrop();
    },
  });
  drag(drop(ref));

  return (
    <div ref={ref} onContextMenu={(e) => e.preventDefault()}>
      {hovering && direction === dropBox.DIRECTIONS.UP ? <Divider /> : null}
      <ListItemButton
        selected={
          !node.isDragging &&
          hovering &&
          direction === dropBox.DIRECTIONS.CENTER
        }
        disabled={node.isDragging}
      >
        <ListItemText primary={`${node.id} # ${node.name}`}></ListItemText>
      </ListItemButton>
      {hovering && direction === dropBox.DIRECTIONS.DOWN ? <Divider /> : null}
    </div>
  );
}
export default DragDropListButton;
