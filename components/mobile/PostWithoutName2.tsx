import { Post } from "@utils/types";
import Image from "next/image";

export function MobilePostWithoutName2(props: { post: Post }) {
    return (
        <div className={`flex flex-col`}>
            <div className="">
                <img
                    className="w-full h-56"
                    src={
                        props.post.thumbnail ??
                        "https://via.placeholder.com/208x144.png?text=No+Image"
                    }
                    alt="작업물 이미지"
                />
                <div className="pt-1.5 mb-[18px]">
                    <div className="flex items-center space-x-2 text-[15px] font-bold w-auto">
                        <span className="flex justify-center border-black space-x-2 items-center px-[1px]">
                            {props.post.title}
                        </span>
                    </div>
                    <div className="max-w-md mx-auto space-x-1 pt-1">
                        {props.post.categories.map((category, index) => {
                            return (
                                <span
                                    key={index}
                                    className="text-[10px] font-['SUIT'] bg-[#F0F0F0] w-fit px-2 py-1 font-medium text-center truncate text-[#656565]"
                                >
                                    {category}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
