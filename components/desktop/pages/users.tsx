import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Image from "next/image";
import NextArrowImage from "@icons/slideAfter.svg";
import BeforeArrowImage from "@icons/slideBefore.svg";
import { IUserDetailData } from "@hooks/useUser";
import { DesktopPostWithoutName } from "@components/desktop/PostWithoutName";

interface DesktopUserPageProps {
  userData: IUserDetailData | null;
}

export const NextArrow = () => {
  return (
    <div className="z-50 absolute top-32 right-10">
      <Image src={NextArrowImage} alt="nextArrow" width={7} height={12} />
    </div>
  );
};

export const BeforeArrow = () => {
  return (
    <div className="z-50  absolute top-32 left-10 ">
      <Image src={BeforeArrowImage} alt="beforeArrow" width={7} height={12} />
    </div>
  );
};

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 600,
  centerMode: false,
  nextArrow: <NextArrow />,
  prevArrow: <BeforeArrow />,
};

export default function DesktopUserPage({ userData }: DesktopUserPageProps) {
  const [sliderIndex, setSliderIndex] = useState(0);

  const NextArrow = (onClick: any) => (
    <button
      onClick={onClick}
      className="next-arrow absolute top-[38%] right-10 z-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="14"
        viewBox="0 0 9 14"
        fill="none"
      >
        <path
          d="M1 1L8 7L1 13"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  const handleSlideClick = () => {
    if (sliderIndex < userData.posts?.length - 1) {
      // Check if there's more slides to show
      setSliderIndex(sliderIndex + 1);
    }
  };

  if (!userData) return <div></div>;

  return (
    <div className="pt-20 overflow-x-hidden">
      <div className="flex items-center space-x-5">
        <div className="border-2 border-black w-16 h-16 text-[26px] font-bold font-['Pretendard'] items-center self-center justify-center flex">
          {userData.departmentCode}
        </div>
        <div className="text-4xl font-bold">
          <p className="font-['Pretendard'] font-bold text-[3.5rem]">
            {userData.username}
          </p>
        </div>
      </div>
      <div className="pt-16">
        <div className="flex mt-8">
          <h1 className="font-['Pretendard'] ml-3 text-[1.5rem] font-bold underline">
            최근 업로드한 작업물
          </h1>
          {userData.posts?.length >= 2 && (
            <Link
              href="/users/recent"
              className="ml-auto flex font-['Pretendard'] font-normal text-[14px] self-center text-white bg-black px-2.5 py-1.5 mr-[5%]"
            >
              더보기
            </Link>
          )}
        </div>
        {userData.posts?.length === 0 ? (
          <div className="h-32">
            <p className="text-center self-center items-center font-['SUIT'] text-[13px] mt-20">
              최근 업로드한 작업물이 없습니다.
            </p>
          </div>
        ) : (
          <div className="pt-10">
            <Slider {...settings} className="desktopslide">
              {userData.posts?.map((post, index) => {
                return <DesktopPostWithoutName key={index} post={post} />;
              })}
            </Slider>
          </div>
        )}
      </div>

      <div className="pt-16">
        <div className="flex mt-8">
          <h1 className="font-['Pretendard'] ml-3 text-[1.5rem] font-bold underline">
            저장한 작업물
          </h1>
          {userData.scrapPosts?.length >= 2 && (
            <Link
              href="/users/recent"
              className="ml-auto flex font-['Pretendard'] font-normal text-[14px] self-center text-white bg-black px-2.5 py-1.5 mr-[5%]"
            >
              더보기
            </Link>
          )}
        </div>
        {userData.scrapPosts?.length === 0 ? (
          <div className="h-32">
            <p className="text-center self-center items-center font-['SUIT'] text-[13px] mt-20">
              최근 업로드한 작업물이 없습니다.
            </p>
          </div>
        ) : (
          <div>
            <Slider
              infinite={false}
              slidesToShow={4}
              slidesToScroll={1}
              nextArrow={<NextArrow />}
              className="max-w-[95rem] min-w-[30rem] m-auto space-x-2 mt-10 flex overflow-x-scroll mypage"
            >
              {userData.scrapPosts?.map((post, index) => {
                return <DesktopPostWithoutName post={post} key={index} />;
              })}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}
