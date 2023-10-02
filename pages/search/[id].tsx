import Header from "@components/desktop/header";
import { Post } from "@utils/types";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import WorkDetails from "@components/desktop/workDetails";
import React, { Fragment, useEffect, useState } from "react";
import getSearchPost from "@services/search/get/getSearchPost";
import { useRouter } from "next/router";
import BaseLayout from "@components/base/layout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "95vh",
  p: 4,
  outline: "none",
};

export default function SearchPage() {
  const [selectedWork, setSelectedWork] = useState<Post | null>(null);
  const router = useRouter();
  const id = router?.query.id;

  const [postData, setPostData] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (router.query.id) {
      getSearchPost(router?.query?.id).then((response: any) =>
        setPostData(response),
      );
    }
  }, [router.isReady, router.query]);

  return (
    <div>
      <BaseLayout isMobile={false} isMenu={false}>
        <div className="overflow-x-hidden min-h-[100%]">
          <div className="mt-10 pb-20 ">
            <h1 className="ml-[30%] mb-16 text-[1.5rem] font-['Pretendard']  text-[20px]">
              <span className=" font-bold"> &quot; {id} &quot; </span> 의 검색
              결과
            </h1>
            {postData?.length === 0 ? (
              <div className="ml-[28%]">
                <p className="font-['Pretendard'] font-normal text-ce">
                  일치하는 검색 결과가 존재하지 않아요!
                </p>
              </div>
            ) : (
              <div className="flex flex-rows-4 flex-flow-col flex-wrap max-w-5xl gap-x-7 m-auto gap-y-8 ">
                {postData?.map((post: Post, index: number) => {
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
              </div>
            )}
          </div>
        </div>
      </BaseLayout>
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
