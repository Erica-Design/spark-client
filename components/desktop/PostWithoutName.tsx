import { Post } from "@utils/types";
import Image from "next/image";

export function DesktopPostWithoutName({ post }: { post: Post }) {
  return (
    <div className={`flex`}>
      <div className="nth-child-5">
        <div className="w-[23rem] h-64 border-[1px] border-black ">
          <Image
            src={
              post.thumbnail ??
              "https://via.placeholder.com/370x254.png?text=No+Image"
            }
            alt="작업물 이미지"
            width={472}
            height={324}
          />
        </div>
        <div>
          <div className="flex items-center space-x-2 py-1 text-[14px] font-bold w-auto">
            <span className="flex justify-center border-black space-x-2 items-center px-[1px] py-[1px]">
              {post.title}
            </span>
          </div>
          <div className="max-w-md mx-auto space-x-1">
            {post.categories.map((category, index) => {
              return (
                <span
                  key={index}
                  className="text-[14px] bg-[#F0F0F0] w-fit px-1 text-center truncate text-[#656565]"
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
