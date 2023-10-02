"use client";

import Link from "next/link";
import React from "react";
import { Post } from "@utils/types";
import Slider from "react-slick";
import MobileSlider from "@components/base/slider/mobile";

interface MainPageProps {
  categories?: string[];
  posts?: Post[];
  sparkPosts?: Post[];
  choices: string[];
  handleChoices: any;
}

const MobileMainPage: React.FC<MainPageProps> = ({
  posts,
  categories,
  sparkPosts,
  choices,
  handleChoices,
}) => {
  return (
    <div className="p-[18px] pt-10">
      <div>
        <h1 className="font-Pretendard text-[1.25rem] font-bold underline">
          SPARK 픽 디자인
        </h1>
      </div>
      <div className="m-auto">
        <MobileSlider sparkPosts={sparkPosts} />
      </div>
      <div className="">
        <h1 className="font-Pretendard text-[1.25rem] font-bold underline mt-6 mb-3.5">
          카테고리
        </h1>
      </div>
      <div
        className={`max-w-4xl m-auto text-[0.75rem] font-['SUIT'] font-medium whitespace-nowrap overflow-x-scroll`}
      >
        <div className="flex flex-wrap w-[42rem]">
          {categories?.map((category: string, index: number) => {
            return (
              <div key={index} onClick={() => handleChoices(category)} className="my-1">
                <div className="mr-2 mb-3">
                  <span
                    className={`${choices.includes(category)
                      ? "bg-black text-white"
                      : "bg-[#f0f0f0]"
                      } px-1 py-1`}
                  >
                    {category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="">
        <h1 className="text-[1.25rem] font-bold underline mt-3.5">
          업로드된 아카이빙 작업물
        </h1>
      </div>
      {posts?.length === 0 ? (
        <div className="text-center mt-10 font-medium">
          <p>아직 업로드된 게시글이 없어요!</p>
          <p className="underline">작업물 업로드 하러가기</p>
        </div>
      ) : (
        <div className="max-w-5xl m-auto space-y-7 mt-4">
          {posts?.map((post: Post, index: number) => {
            return (
              <Link key={index} href={`/posts/${post.id}`}>
                <div key={index} className={`flex w-full`}>
                  <div className="w-full">
                    <div className="w-full h-[227px] border-[1px] border-black ">
                      <img
                        className="w-full h-[225px]"
                        src={post.thumbnail}
                        alt="작업물 이미지"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 pt-1.5 text-[16px] font-bold w-auto">
                        <p>{post.title}</p>
                      </div>
                      <div className="space-x-1 flex mt-1 tracking-[0.4px]">
                        {post.categories.map(
                          (category: string, index: number) => {
                            return (
                              <div key={index} className="max-w-md mb-5">
                                <p className="text-[10px] font-['SUIT'] font-medium bg-[#F0F0F0] w-fit px-1.5 py-0.5 text-center truncate text-[#656565]">
                                  {category}
                                </p>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MobileMainPage;
