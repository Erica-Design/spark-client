import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import Image from "next/image";
import NextArrowImage from "@icons/slideAfter.svg";
import BeforeArrowImage from "@icons/slideBefore.svg";
import { IUserDetailData } from "@hooks/useUser";
import { DesktopPostWithoutName } from "@components/desktop/PostWithoutName";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import WorkDetails from "@components/desktop/workDetails";
import { Post } from "@utils/types";

interface DesktopUserPageProps {
  userData: IUserDetailData | null;
  id: number | null;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "95vh",
  p: 4,
  outline: "none",
};

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
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 600,
  centerMode: true,
  nextArrow: <NextArrow />,
  prevArrow: <BeforeArrow />,
};

export default function DesktopUserPage({
  userData,
  id,
}: DesktopUserPageProps) {
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
    if (userData && userData.posts) {
      if (sliderIndex < userData.posts.length - 1) {
        // Check if there's more slides to show
        setSliderIndex(sliderIndex + 1);
      }
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedWork, setSelectedWork] = useState<Post | null>(null);

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
              href={`/users/${id}/upload`}
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
                return (
                  <div key={index} className="">
                    <div
                      className={`relative group/work ${
                        index === 0 ? "row-end-2 row-span-2" : ""
                      } ${index === 1 ? "row-start-6" : ""}`}
                    >
                      <div
                        className="group-hover/work:bg-gradient-to-t group-hover/work:from-black/50  group-hover/work:via-white group-hover/work:cursor-pointer  group-hover/work:to-transparent border border-gray-500 w-[320px] h-[227px] mb-2 "
                        onClick={() => {
                          setSelectedWork(post);
                          setOpen(true);
                        }}
                      >
                        <img
                          className="w-full h-[225px]"
                          src={post.thumbnail}
                          alt="작업물 이미지"
                        />
                        <p className="group-hover/work:block text-white hidden absolute bottom-16 left-3 font-['Pretendard'] px-4 py-4">
                          {post.title}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 py-1 text-[14px] font-bold w-72 flex-nowrap">
                          <p className="font-['Pretendard']">{post.title}</p>
                        </div>
                        <div className="gap-2 flex flex-wrap w-80 ">
                          {post.categories.map(
                            (category: string, index: number) => {
                              return (
                                <div key={index}>
                                  <p className="text-[10px] bg-[#F0F0F0] w-fit px-1 text-center text-[#656565] font-['SUIT']">
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
                );
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
              href={`/users/${id}/bookmark`}
              className="ml-auto flex font-['Pretendard'] font-normal text-[14px] self-center text-white bg-black px-2.5 py-1.5 mr-[5%]"
            >
              더보기
            </Link>
          )}
        </div>
        {userData.scrapPosts?.length === 0 ? (
          <div className="h-32">
            <p className="text-center self-center items-center font-['SUIT'] text-[13px] mt-20">
              최근 저장한 작업물이 없습니다.
            </p>
          </div>
        ) : (
          <div>
            <Slider
              infinite={false}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay={true}
              nextArrow={<NextArrow />}
              className="max-w-[95rem] min-w-[30rem] m-auto space-x-2 mt-10 flex overflow-x-scroll mypage"
            >
              {userData.scrapPosts?.map((post, index) => {
                return (
                  <div key={index} className="">
                    <div
                      className={`relative group/work ${
                        index === 0 ? "row-end-2 row-span-2" : ""
                      } ${index === 1 ? "row-start-6" : ""}`}
                    >
                      <div
                        className="group-hover/work:bg-gradient-to-t group-hover/work:from-black/50  group-hover/work:via-white group-hover/work:cursor-pointer  group-hover/work:to-transparent border border-gray-500 w-[320px] h-[227px] mb-2 "
                        onClick={() => {
                          setSelectedWork(post);
                          setOpen(true);
                        }}
                      >
                        <img
                          className="w-full h-[225px]"
                          src={post.thumbnail}
                          alt="작업물 이미지"
                        />
                        <p className="group-hover/work:block text-white hidden absolute bottom-16 left-3 font-['Pretendard'] px-4 py-4">
                          {post.title}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 py-1 text-[14px] font-bold w-72 flex-nowrap">
                          <p className="font-['Pretendard']">{post.title}</p>
                        </div>
                        <div className="gap-2 flex flex-wrap w-80 ">
                          {post.categories.map(
                            (category: string, index: number) => {
                              return (
                                <div key={index}>
                                  <p className="text-[10px] bg-[#F0F0F0] w-fit px-1 text-center text-[#656565] font-['SUIT']">
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
                );
              })}
            </Slider>
          </div>
        )}
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={style}>
              <WorkDetails id={selectedWork?.id || 0} />
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
