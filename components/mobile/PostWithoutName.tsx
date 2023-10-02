import { Post } from "@utils/types";
import Image from "next/image";

export function MobilePostWithoutName(props: { post: Post }) {
  return (
    <div className={`flex`}>
      <div className="nth-child-5">
        <div className="w-[13rem] h-36 border-black mypageimg">
          <Image
            src={
              props.post.thumbnail ??
              "https://via.placeholder.com/208x144.png?text=No+Image"
            }
            alt="작업물 이미지"
            width={208}
            height={144}
          />
        </div>
        <div className="py-1">
          <div className="flex items-center space-x-2 text-[14px] font-bold w-auto">
            <span className="flex justify-center border-black space-x-2 items-center px-[1px]">
              {props.post.title}
            </span>
          </div>
          <div className="max-w-md mx-auto space-x-1">
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
