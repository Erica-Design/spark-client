import {useDrag, useDrop} from "react-dnd";
import React from "react";

const VideoLink: React.FC<any> = ({id, videoLink, index, moveItem}) => {
    const [{isDragging}, dragRef] = useDrag({
        type: "videoLink",
        item: {id, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: "videoLink",
        hover(item: any, monitor) {
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    return (
        <div
            ref={(node) => dragRef(dropRef(node))}
            style={{opacity: isDragging ? 0.3 : 1}}
            className="w-full my-2 p-2 border-2 border-black cursor-move"
        >
            {videoLink}
        </div>
    );
};
export default VideoLink;
