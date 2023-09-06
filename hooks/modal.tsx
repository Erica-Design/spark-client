import {useQuery} from "@tanstack/react-query";
import React, {useEffect, useRef, useState} from "react";
import getPosting from "@services/posting/get/getPosting";
import axios from "axios";
import Image from "next/image";
import MenuIcon from "@icons/menu.svg";
import getPostDetail from "@services/posting/get/getPostDetail";

interface PostPageProps {
    id?: any;
    isOpen: boolean;
    closeModal: () => void;

}

const Modal = ({isOpen, closeModal, id}: PostPageProps) => {
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<any>(null);

    const [nowCategory, setNowCategory] = useState([]);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal1 = () => {
        setOpen(false);
    };

    const handleClickOutside = (e: any) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal1();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // modal 이미지 불러오기
    const modalPick = async () => {
        const response = await axios.get("/dummy/postdummy.json");
        return response;
    };

    const {data: modalPickData, isLoading: modalLoading} = useQuery(
        ["ModalPick"],
        modalPick,
    );

    const {data: workData, isLoading: workIsLoading} = useQuery(
        ["Posting", nowCategory],
        () => getPosting(nowCategory),
    );

    const {data: workDetails, isLoading: detailLoading} = useQuery(
        ["Details", id],
        () => getPostDetail(+id),
    );


    if (detailLoading) {
        return <div>Loading...</div>;
    }

    const indexToShow = 0; // 나타낼 작업물의 인덱스를 설정하세요.

    const selectedWork = workData?.[indexToShow];

    if (!isOpen) return null;

    return (
        <div className="w-full h-screen absolute inset-0 flex justify-center top-20 z-50">
            <div
                className="fixed inset-0 bg-black opacity-70 blur-[2px]"
                onClick={closeModal}
            ></div>
            <div className="w-[68%] bg-white z-10">
                <div>
                    <div className="p-4 pl-6">
                        <div className="flex">
                            <p className="text-black font-['Pretendard'] text-[20px] font-bold">
                                {selectedWork?.title}
                            </p>
                            <p className="text-[10px] bg-[#F0F0F0] w-[114px] text-center self-center text-[#656565] font-['SUIT'] ml-3">
                                {selectedWork?.categories[0]}
                            </p>
                            <Image
                                className="ml-auto cursor-pointer"
                                src={MenuIcon}
                                alt=""
                                width={3}
                                height={15}
                                onClick={openModal}
                            />
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
                                                        <g clip-path="url(#clip0_668_2715)">
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
                                                                <rect width="15" height="15" fill="white"/>
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
                            <p className="text-[20px] font-bold">{workDetails?.title}</p>
                            {workDetails?.categories?.map((category: string, index: number) => {
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
                                    {workDetails?.author?.departmentCode}
                                </p>
                                <p className="font-['Pretendard'] font-medium text-[#747474]">
                                    {workDetails?.author?.username}(
                                    {workDetails?.author?.shortStudentNumber})
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full bg-black border border-white">
                            <div className="w-[60%] bg-white mx-auto">
                                {workDetails?.images?.map((res: any, index: number) => {
                                    return (
                                        <div className="relative mb-6" key={index}>
                                            <Image
                                                className="mx-auto"
                                                src={res?.url}
                                                alt="이미지 파일"
                                                width={650}
                                                height={434}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
