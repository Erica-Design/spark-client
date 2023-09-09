import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Post } from "@utils/types";
import getPostDetail from "@services/posting/get/getPostDetail";
import YouTube from "react-youtube";

interface PostPageProps {
  id?: number;
}

const WorkDetails = ({ id }: PostPageProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<any>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const options = {
    width: "700",
    height: "400",
  };

  useEffect(() => {
    if (id) {
      getPostDetail(id).then((response) => setSelectedPost(response));
    }
  }, [id]);

  if (!selectedPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex">
        {open && (
          <div
            ref={modalRef}
            className={`bg-white border border-[#757575] shadow-xl w-[190px] h-[83px] z-20 absolute right-[17%] mt-6`}
          >
            <div className="text-center justify-center">
              <div className="">
                <div
                  className="flex items-center space-x-2 border border-b-black cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <div className="p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_668_2715)">
                        <path
                          d="M6.875 2.5H2.5C2.16848 2.5 1.85054 2.6317 1.61612 2.86612C1.3817 3.10054 1.25 3.41848 1.25 3.75V12.5C1.25 12.8315 1.3817 13.1495 1.61612 13.3839C1.85054 13.6183 2.16848 13.75 2.5 13.75H11.25C11.5815 13.75 11.8995 13.6183 12.1339 13.3839C12.3683 13.1495 12.5 12.8315 12.5 12.5V8.125"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.5625 1.56252C11.8111 1.31388 12.1484 1.17419 12.5 1.17419C12.8516 1.17419 13.1889 1.31388 13.4375 1.56252C13.6861 1.81116 13.8258 2.14839 13.8258 2.50002C13.8258 2.85165 13.6861 3.18888 13.4375 3.43752L7.5 9.37502L5 10L5.625 7.50002L11.5625 1.56252Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_668_2715">
                          <rect width="15" height="15" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <p className="font-['Pretendard'] font-medium text-[0.81rem]">
                    수정하기
                  </p>
                </div>
                <div className="flex items-center space-x-2.5 cursor-pointer">
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
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <p className="text-[20px] font-bold">{selectedPost?.title}</p>
        {selectedPost?.categories?.map((category: string, index: number) => {
          return (
            <div
              className="text-[10px] text-[#656565] bg-[#F0F0F0] px-1"
              key={index}
            >
              <p>{category}</p>
            </div>
          );
        })}
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
          {selectedPost?.images?.map((res: any, index: number) => {
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
                    height={434}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkDetails;