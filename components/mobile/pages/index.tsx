"use client";

import Link from "next/link";
import React, { useState } from "react";
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
  const itemsPerPage = 18; // 페이지당 표시할 아이템 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  // 현재 페이지에 해당하는 아이템 목록 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts?.slice(indexOfFirstItem, indexOfLastItem) || [];

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
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
        <h1 className="font-Pretendard text-[1.25rem] font-bold underline mt-6">
          카테고리
        </h1>
      </div>
      <div
        className={`max-w-4xl m-auto text-[0.75rem] font-['SUIT'] font-medium whitespace-nowrap overflow-x-scroll`}
      >
        <div className="flex flex-wrap w-[42rem] mb-3">
          {categories?.map((category: string, index: number) => {
            return (
              <div key={index} onClick={() => handleChoices(category)}>
                <div className="mr-2 my-1.5">
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
          {currentItems?.map((post: Post, index: number) => {
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
                      <div className="flex flex-wrap tracking-[0.4px] mb-5">
                        {post.categories.map(
                          (category: string, index: number) => {
                            return (
                              <div key={index} className="max-w-md">
                                <p className="text-[10px] font-['SUIT'] font-medium bg-[#F0F0F0] w-fit px-1.5 py-0.5 text-center truncate text-[#656565] mr-1 mb-1">
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
      {/* 페이지네이션 컴포넌트 */}
      <div className="flex justify-end mt-14">
        {Array.from({ length: Math.ceil((posts?.length || 0) / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`text-2xl text-['SUIT'] mr-4 w-fit ${currentPage === index + 1 ? 'active text-black font-bold' : 'text-[#D4D4D4] font-normal'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileMainPage;
