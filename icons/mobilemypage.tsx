"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import logout from "@services/users/logout/post/logout";

export default function MobileMypageButton(props: any) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<any>(null);
  const [ids, setIds] = useState([]);

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleClickOutside = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="ml-auto">
      <button
        className="border border-black w-8 h-8 bg-white text-black font-['SUIT'] font-bold text-[0.75rem]"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {props.buttonImg}
      </button>
      {open && (
        <div
          ref={modalRef}
          className={`bg-white border border-[#757575] shadow-xl w-[173px] absolute z-20 right-0 top-11 mr-3 transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center justify-center">
            <div className="">
              <Link
                href="/users/me"
                className="flex items-center space-x-2 border border-b-black outline-none"
              >
                <div className="p-3">
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 17V1H7.2069L9.68966 3.46154H19V17H1Z"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p className="font-['Pretendard'] font-medium text-[0.81rem]">
                  내 작업물
                </p>
              </Link>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={handleLogout}
              >
                <div className="p-3">
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.85714 1H1V17H7.85714"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <path
                      d="M5.57227 9L18.1437 9"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <path
                      d="M12.4277 3.28564L18.142 8.99993L12.4277 14.7142"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p className="font-['Pretendard'] font-medium text-[0.81rem]">
                  로그아웃
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
