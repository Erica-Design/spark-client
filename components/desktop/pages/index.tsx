import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import useModal from "@hooks/useModal";
import Modal from "@hooks/modal";
import NextArrowImage from "@icons/slideAfter.svg";
import BeforeArrowImage from "@icons/slideBefore.svg";
import { Post } from "@utils/types";

interface DesktopPageProps {
  categories?: string[];
  posts?: Post[];
  sparkPosts?: Post[];
  choices: string[];
  handleChoices: (category: string) => void;
}

const NextArrow = () => {
  return (
    <div className="z-50 absolute top-1/2 -right-44">
      <Image src={NextArrowImage} alt="nextArrow" width={7} height={12} />
    </div>
  );
};

const BeforeArrow = () => {
  return (
    <div className="z-50  absolute top-1/2 ">
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

const DesktopMainPage: React.FC<DesktopPageProps> = ({
  posts,
  categories,
  sparkPosts,
  choices,
  handleChoices,
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedWork, setSelectedWork] = useState<any>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 스무스한 애니메이션으로 스크롤 이동
    });
  };

  return (
    <Fragment>
      <div className="overflow-x-hidden min-h-[100%]">
        <div className="mb-10 ">
          <div className="z-20 absolute">
            <h1 className="underline underline-offset-1 font-bold font-['Pretendard'] text-[1.5rem]">
              SPARK 픽 디자인
            </h1>
          </div>
          <div className="max-w-6xl pt-10">
            <div className="absolute w-32 h-[25rem] top-[10rem] left-[17%] bg-white blur-[20px] flex-shrink-0 cursor-pointer z-10"></div>
            <Slider {...settings} className="desktopslide">
              {sparkPosts?.map((post: Post, index: number) => {
                return (
                  <div className="relative mt-3" key={index}>
                    <Image
                      src={
                        post.thumbnail ?? "https://via.placeholder.com/472x324"
                      }
                      alt="이미지 파일"
                      width={472}
                      height={324}
                    />
                    <div className="absolute bottom-0 px-3 py-4 text-white font-bold">
                      <p className="font-['Pretendard']">{post.title}</p>
                    </div>
                  </div>
                );
              })}
            </Slider>
            <div className="absolute w-32 h-96 top-[9rem] right-[-1rem] bg-white blur-[20px] flex-shrink-0 cursor-pointer z-10"></div>
          </div>
        </div>
        <div className="flex flex-wrap max-w-5xl text-[14px] justify-center">
          {categories?.map((category: string, index: number) => {
            return (
              <div onClick={() => handleChoices(category)} key={index}>
                <div className="mr-2 my-2 cursor-pointer">
                  <h2
                    className={`bg-[#f0f0f0] w-full px-2 py-1 font-['SUIT'] font-medium ${
                      choices.includes(category) && "bg-black text-white"
                    }`}
                  >
                    {category}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 pb-20">
          <h1 className="underline underline-offset-1 font-bold mb-16 text-[1.5rem] font-['Pretendard']">
            최근 아카이빙 작업물
          </h1>
          {posts?.length === 0 ? (
            <div className="ml-[30%]">
              <p className="font-['Pretendard'] font-normal">
                아직 업로드된 게시글이 없어요!
              </p>
              <p className="underline underline-offset-1 font-['Pretendard'] font-semibold">
                작업물 업로드 하러가기
              </p>
            </div>
          ) : (
            <div className="flex flex-rows-4 flex-flow-col flex-wrap max-w-5xl gap-x-7 m-auto gap-y-8 ">
              {posts?.map((post: any, index: number) => {
                return (
                  <div key={index} className="">
                    <div
                      className={`relative group/work ${
                        index === 0 ? "row-end-2 row-span-2" : ""
                      } ${index === 1 ? "row-start-6" : ""}`}
                    >
                      <div
                        className="group-hover/work:bg-gradient-to-t group-hover/work:from-black/50  group-hover/work:via-white  group-hover/work:to-transparent border border-gray-500 w-[320px] h-[227px] mb-2 "
                        onClick={() => {
                          setSelectedWork(post);
                          openModal();
                          scrollToTop();
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
                        <div className="space-x-1 flex">
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
            </div>
          )}
        </div>
      </div>
      <div>
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          id={selectedWork?.id ?? "2"}
        />
      </div>
    </Fragment>
  );
};

export default DesktopMainPage;
