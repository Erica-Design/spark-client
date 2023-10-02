import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Post } from "@utils/types";
import getPostDetail from "@services/posting/get/getPostDetail";
import YouTube from "react-youtube";
import MenuIcon from "../../icons/menu.svg";
import createScrap from "@services/posting/post/createScrap";
import { useRouter } from "next/router";
import deleteScrap from "@services/posting/delete/deleteScrap";
import deletePost from "@services/posting/delete/deletePost";
import useUser from "@hooks/useUser";
import CircularProgress from "@mui/material/CircularProgress";

interface PostPageProps {
  id?: number;
}

const WorkDetails = ({ id }: PostPageProps) => {
  const router = useRouter();
  const user = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const modalRef = useRef<any>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isScrap, setIsScrap] = useState<boolean>(false);

  const options = {
    width: "650",
    height: "450",
  };

  useEffect(() => {
    if (id) {
      getPostDetail(id).then((response) => {
        setSelectedPost(response);
        setIsScrap(response?.scraped);
      });
    }
  }, [id]);

  const handleScrap = (id: number) => {
    if (!isScrap) {
      createScrap(id).then(() => {
        setIsScrap(true);
      });
    } else {
      deleteScrap(id).then(() => {
        setIsScrap(false);
      });
    }
  };
  const deletePostHandler = (id: number) => {
    deletePost(id).then(() => {
      alert("성공적으로 삭제가 되었습니다.");
      router.reload();
    });
  };

  console.log(selectedPost);

  if (!selectedPost) {
    return (
      <div className="flex justify-center pt-[50vh] ">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <div className="flex">
        {open && (
          <div
            ref={modalRef}
            className={`bg-white border border-[#757575] shadow-xl w-[190px]  z-20 absolute right-[5.5%] mt-8`}
          >
            <div className="text-center justify-center">
              {Number(user?.id) === Number(selectedPost?.author.id) && (
                <div
                  className="flex items-center space-x-2.5 cursor-pointer"
                  onClick={() => deletePostHandler(Number(selectedPost?.id))}
                >
                  <div className="p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        d="M1.875 3.75H3.125H13.125"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.875 3.75V12.5C11.875 12.8315 11.7433 13.1495 11.5089 13.3839C11.2745 13.6183 10.9565 13.75 10.625 13.75H4.375C4.04348 13.75 3.72554 13.6183 3.49112 13.3839C3.2567 13.1495 3.125 12.8315 3.125 12.5V3.75M5 3.75V2.5C5 2.16848 5.1317 1.85054 5.36612 1.61612C5.60054 1.3817 5.91848 1.25 6.25 1.25H8.75C9.08152 1.25 9.39946 1.3817 9.63388 1.61612C9.8683 1.85054 10 2.16848 10 2.5V3.75"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.25 6.875V10.625"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.75 6.875V10.625"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <p className="font-['Pretendard'] font-medium text-[0.81rem]">
                    삭제하기
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white pt-5 px-10 pb-10 max-h-[90vh] overflow-y-scroll">
        <div className="flex items-center justify-between space-x-3 ">
          <div className="flex items-center gap-x-5">
            <p className="text-[20px] font-bold">{selectedPost?.title}</p>
            <div className="flex gap-x-2">
              {selectedPost?.categories?.map(
                (category: string, index: number) => {
                  return (
                    <div
                      className="text-[10px] text-[#656565] bg-[#F0F0F0] px-1"
                      key={index}
                    >
                      <p>{category}</p>
                    </div>
                  );
                },
              )}
            </div>
          </div>
          {Number(user?.id) === Number(selectedPost?.author.id) && (
            <div onClick={() => setOpen(!open)}>
              <Image width={4} height={16} src={MenuIcon} alt="menuIcon" />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center space-x-2 py-3 text-[14px] font-bold w-auto">
            <p className="flex justify-center border-[1px] border-black space-x-2 items-center w-4 h-4 p-3 font-['Pretendard']">
              {selectedPost?.author?.departmentCode}
            </p>
            <p className="font-['Pretendard'] font-medium text-[#747474]">
              {selectedPost?.author?.username}(
              {selectedPost?.author?.shortStudentNumber})
            </p>
          </div>
        </div>
        <div>
          <div className="overflow-y-auto">
            {selectedPost?.images
              ?.toSorted((a, b) => a.order - b.order)
              .map((res: any, index: number) => {
                return (
                  <div className="relative mb-6" key={index}>
                    {res?.url.includes("youtube") ? (
                      <YouTube
                        videoId={res?.url?.split("v=")[1]}
                        opts={options}
                        onEnd={(e) => {
                          e.target.stopVideo(0);
                        }}
                      />
                    ) : (
                      <Image
                        className="mx-auto"
                        src={res?.url}
                        alt="이미지 파일"
                        width={650}
                        height={450}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="absolute top-10 left-[49em] ">
        <div className="flex-row  items-center py-3">
          <div
            className="rounded-full w-14 h-14 flex justify-center bg-white p-3"
            onClick={() => router.push(`/users/${selectedPost?.author.id}`)}
          >
            <svg
              width="26"
              height="28"
              viewBox="0 0 26 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.3333 26.7124V23.7488C25.3333 22.1767 24.6924 20.6691 23.5516 19.5575C22.4107 18.4459 20.8634 17.8214 19.25 17.8214H7.08333C5.46993 17.8214 3.92261 18.4459 2.78177 19.5575C1.64092 20.6691 1 22.1767 1 23.7488V26.7124"
                stroke="black"
                strokeLinecap="square"
              />
              <path
                d="M13.1663 12.8547C16.5261 12.8547 19.2497 10.2009 19.2497 6.92735C19.2497 3.65376 16.5261 1 13.1663 1C9.80661 1 7.08301 3.65376 7.08301 6.92735C7.08301 10.2009 9.80661 12.8547 13.1663 12.8547Z"
                stroke="black"
                strokeLinecap="square"
              />
            </svg>
          </div>
          <p className="text-white font-semibold mt-2 text-center">프로필</p>
        </div>
        <div
          onClick={() => {
            handleScrap(selectedPost?.id || 0);
          }}
        >
          <div className="rounded-full w-14 h-14 flex justify-center bg-white p-3">
            <div>
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill={isScrap ? "black" : "none"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="33" height="33" fill="white" />
                <path
                  d="M25 30L16 23.0556L7 30V7.77778C7 7.04107 7.27092 6.33453 7.75315 5.81359C8.23539 5.29266 8.88944 5 9.57143 5H22.4286C23.1106 5 23.7646 5.29266 24.2468 5.81359C24.7291 6.33453 25 7.04107 25 7.77778V30Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <p className="text-white font-semibold mt-2 text-center">북마크</p>
        </div>
        <div className="flex-row  items-center py-3">
          <div className="rounded-full w-14 h-14 flex justify-center bg-white p-3">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="38" height="38" fill="white" />
              <path
                d="M6.33301 19V31.6667C6.33301 32.5065 6.66664 33.312 7.2605 33.9058C7.85437 34.4997 8.65982 34.8333 9.49967 34.8333H28.4997C29.3395 34.8333 30.145 34.4997 30.7388 33.9058C31.3327 33.312 31.6663 32.5065 31.6663 31.6667V19"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25.3337 9.49996L19.0003 3.16663L12.667 9.49996"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 3.16663V23.75"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-white font-semibold mt-2 text-center">공유하기</p>
        </div>
      </div>
    </div>
  );
};

export default WorkDetails;
