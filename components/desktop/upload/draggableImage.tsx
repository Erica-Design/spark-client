import { useDrag, useDrop } from "react-dnd";
import React from "react";
import YouTube from "react-youtube";

interface ImageForm {
  imageLink?: string;
  index?: any;
  moveItem: any;
}

const DraggableImage = ({ imageLink, index, moveItem }: ImageForm) => {
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const options = {
    width: "1100",
    height: "500",
  };

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="image-container justify-center flex-row m-7 active:outline-8 active:outline "
    >
      {imageLink?.includes("youtube") ? (
        <div className="flex justify-center">
          <YouTube
            videoId={imageLink?.split("v=")[1]}
            opts={options}
            onEnd={(e) => {
              e.target.stopVideo(0);
            }}
          />
        </div>
      ) : (
        <img src={imageLink} width={1500} height={500} alt={`Image ${index}`} />
      )}
    </div>
  );
};

export default DraggableImage;
