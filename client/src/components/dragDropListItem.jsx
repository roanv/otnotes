import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { ListItemButton, ListItemText } from "@mui/material";
export const ItemTypes = {
  ITEM: "item",
};

function DragDropListItem({ node }) {
  const { id, name, path } = node;
  // console.log(node);
  const ref = useRef(null);
  const [{ canDrop, isOver, handlerId }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: () => {
      return { id, path };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  let backgroundColor = "WhiteSmoke";
  if (canDrop && isOver) {
    backgroundColor = "Blue";
  } else if (canDrop) {
    backgroundColor = "Lime";
  }
  return (
    <ListItemButton
      sx={{ bgcolor: backgroundColor }}
      ref={ref}
      data-handler-id={handlerId}
      disabled={isDragging}
    >
      <ListItemText primary={`${path}`}></ListItemText>
    </ListItemButton>
  );
}
export default DragDropListItem;

// <TreeItem
//   nodeId={node.id}
//   // ref={ref}
//   // data-handler-id={handlerId}
//   label={node.name}
//   // sx={{ height: "50px", bgcolor: backgroundColor }}
// >
//   {/* <ListItemText
//       style={{ wordWrap: "break-word" }}
//       primary={isDragging ? "––––––––" : name}
//     ></ListItemText> */}
// </TreeItem>

// const isActive = canDrop && isOver;
// let backgroundColor = "WhiteSmoke";
// if (isActive) {
//   backgroundColor = "Blue";
// } else if (canDrop) {
//   backgroundColor = "Lime";
// }

// hover(item, monitor) {
// if (!ref.current) return;
//   const dragIndex = item.index;
//   const hoverIndex = index;
//   // Don't replace items with themselves
//   if (dragIndex === hoverIndex) return;
//   // Determine rectangle on screen
//   const hoverBoundingRect = ref.current?.getBoundingClientRect();
//   // Get vertical middle
//   const hoverMiddleY =
//     (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//   // Determine mouse position
//   const clientOffset = monitor.getClientOffset();
//   // Get pixels to the top
//   const hoverClientY = clientOffset.y - hoverBoundingRect.top;
//   // Only perform the move when the mouse has crossed half of the items height
//   // When dragging downwards, only move when the cursor is below 50%
//   // When dragging upwards, only move when the cursor is above 50%
//   // Dragging downwards
//   if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//     return;
//   }
//   // Dragging upwards
//   if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//     return;
//   }
//   // Time to actually perform the action
//   moveItem(dragIndex, hoverIndex);
//   // Note: we're mutating the monitor item here!
//   // Generally it's better to avoid mutations,
//   // but it's good here for the sake of performance
//   // to avoid expensive index searches.
//   item.index = hoverIndex;
// },
// hover(item, monitor) {},
