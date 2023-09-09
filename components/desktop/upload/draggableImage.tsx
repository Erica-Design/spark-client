import { useDrag, useDrop } from "react-dnd";
import React from "react";

const DraggableImage = ({ imageLink, index, moveItem }) => {
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="image-container justify-center flex-row m-7 active:outline-8 active:outline "
    >
      <img src={imageLink} width={1500} height={500} alt={`Image ${index}`} />
    </div>
  );
};

export default DraggableImage;
