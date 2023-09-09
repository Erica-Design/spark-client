"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import MyWorkIcon from "@icons/myWork.svg";
import Logout from "@icons/logout.svg";
import Link from "next/link";
import logout from "@services/users/logout/post/logout";
import useUser from "@hooks/useUser";
import LoginButton from "@components/desktop/loginButton";

export default function Header() {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const modalRef = useRef<any>(null);

  const handleLogout = () => {
    logout(); //로그아웃 함수 호출
  };

  return (
    <div>
      <div className="relative">
        <div className="flex items-center space-x-3.5 ">
          <input
            className="w-96 h-9 px-5 bg-[#F0F0F0] tracking-wider"
            placeholder="SEARCH HERE..."
          />
          <LoginButton
            ref={modalRef}
            open={() => setOpen(true)}
            close={() => setOpen(false)}
            user={user}
          />
          <Link
            href="/upload"
            className="w-36 h-9 border-[1px] font-bold font-['Pretendard'] border-black flex justify-center items-center text-sm"
          >
            새로운 작업물 업로드
          </Link>
        </div>
        {open && user && (
          <div
            ref={modalRef}
            className="bg-[#000] opacity-80 w-[330px] h-[205px] absolute z-20 left-24 top-6"
          >
            <div className="text-white p-6">
              <div className="flex space-x-4 pb-4">
                <div>
                  <Image
                    src="/dummy/profile.svg"
                    alt="profile"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <p className="font-['Pretendard'] font-bold text-[18px]">
                    {user!.username}
                  </p>
                  <p className="font-['Pretendard'] font-bold flex text-[14px]">
                    {user.departmentCode}{" "}
                    <p className="font-normal ml-1">
                      {user.shortStudentNumber}
                    </p>
                  </p>
                </div>
              </div>
              <hr className="py-3" />
              <div className="space-y-7">
                <Link
                  href={`/users/${user.id}`}
                  className="flex items-center space-x-4"
                >
                  <div>
                    <Image
                      src={MyWorkIcon}
                      alt="scrapIcon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <p className="font-['Pretendard'] font-medium">마이페이지</p>
                </Link>
                <div
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={handleLogout}
                >
                  <div>
                    <Image
                      src={Logout}
                      alt="scrapIcon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <p className="font-['Pretendard'] font-medium">로그아웃</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
