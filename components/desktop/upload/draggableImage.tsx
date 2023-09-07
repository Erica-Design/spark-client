import {useDrag, useDrop} from "react-dnd";
import React from "react";

const DraggableImage: React.FC<any> = ({file, index, moveItem}) => {
    console.log(file);
    const formatBytes = (bytes: any, decimals: number = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    const [, dragRef] = useDrag({
        type: "image",
        item: {index},
    });

    const [_, dropRef] = useDrop({
        accept: "image",
        hover(item: any) {
            if (item.index === index) {
                return;
            }
            moveItem(item.index, index);
            item.index = index;
        },
    });

    return (
        <div
            ref={(node) => dragRef(dropRef(node))}
            className="flex justify-between border-[1px] border-b-black border-x-black px-5 py-2 text-[12px] font-['Pretendard'] font-medium"
        >
            <p>{file.name || file}</p>
            <p>{file.size === undefined ? "VIDEO LINK" : formatBytes(file.size)}</p>
        </div>
    );
};

export default DraggableImage;
