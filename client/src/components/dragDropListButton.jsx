import { useDrag, useDrop } from "react-dnd";
import { useRef, useEffect, useState } from "react";
import { Divider, ListItemButton, ListItemText } from "@mui/material";
export const TYPE = {
  ITEM: "item",
};

const dropBox = {
  OPTIONS: { TOP: -1, MIDDLE: 0, BOTTOM: 1 },
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
  const [action, setAction] = useState(null);

  const [{ hovering }, drop] = useDrop({
    accept: TYPE.ITEM,
    drop: (item, monitor) => {
      const origin = item.id;
      const target = id;
      handleDrop(origin, target, action);
    },
    collect: (monitor) => ({
      hovering: monitor.canDrop() && monitor.isOver(),
    }),
    hover(item, monitor) {
      const element = ref.current?.getBoundingClientRect();

      if (!dropBox.section.set) dropBox.section = element.bottom - element.top;
      const { section, OPTIONS } = dropBox;

      const mouseGlobal = monitor.getClientOffset();
      const mouse = mouseGlobal.y - element.top;

      if (mouse > section.top.min && mouse < section.top.max)
        setAction(OPTIONS.TOP);

      if (mouse > section.top.max && mouse < section.bottom.min) {
        setAction(OPTIONS.MIDDLE);
      }
      if (mouse > section.bottom.min && mouse < section.bottom.max)
        setAction(OPTIONS.BOTTOM);
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
    <div ref={ref}>
      {hovering && action === dropBox.OPTIONS.TOP ? <Divider /> : null}
      <ListItemButton
        selected={
          !node.isDragging && hovering && action === dropBox.OPTIONS.MIDDLE
        }
        disabled={node.isDragging}
      >
        <ListItemText primary={`${node.name}`}></ListItemText>
      </ListItemButton>
      {hovering && action === dropBox.OPTIONS.BOTTOM ? <Divider /> : null}
    </div>
  );
}
export default DragDropListButton;
