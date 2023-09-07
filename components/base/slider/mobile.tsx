import Slider from "react-slick";
import { Post } from "@utils/types";
import Link from "next/link";
import React, { FC, useRef } from "react";
import Image from "next/image";

const slickSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  speed: 600,
  centerMode: false,
};

interface MobileSliderProps {
  sparkPosts: Post[];
}

const MobileSlider: FC<MobileSliderProps> = ({ sparkPosts }) => {
  const sliderRef = useRef<any>(null);

  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="m-auto">
      <Slider {...slickSettings} ref={sliderRef} className="overflow-hidden mobileslide">
        {sparkPosts.map((post: Post, index: number) => {
          return (
            <Link key={index} href={`/post/${post.id}`}>
              <div className="relative mt-3 mr-3 cursor-pointer" key={index}>
                <Image
                  className="w-[209px] h-36"
                  width={210}
                  height={144}
                  src={post.thumbnail ?? "https://via.placeholder.com/210x144"}
                  alt="작업물 이미지"
                />
                <span className="absolute bottom-0 p-2.5 text-white font-bold text-xs font-['Pretendard']">
                  {post.title}
                </span>
              </div>
            </Link>
          );
        })}
      </Slider>
      <div className="flex">
        <div
          className="absolute w-10 h-44 top-[8rem] right-0 bg-white blur-[9px] flex-shrink-0 cursor-pointer"
          onClick={handleNextSlide}
        ></div>
        <button
          className="absolute top-[13rem] right-[10px] items-center justify-center z-10"
          onClick={handleNextSlide}
        >
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M1 1L7 6.5L1 12"
              stroke="black"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MobileSlider;
