"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import login from "@services/users/login/post/login";
import Link from "next/link";

interface LoginFom {
  studentNumber: string;
  password: string;
}

const DesktopLoginPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { register, handleSubmit, getValues } = useForm<LoginFom>();

  const loginSubmit = () => {
    const userData = getValues();
    login(userData)
      .then(() => {
        console.log("Success to Login");
      })
      .catch((e) => {
        alert("로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요");
      });
  };

  const onSubmit = handleSubmit(loginSubmit);

  return (
    <form
      onSubmit={onSubmit}
      className="absolute top-0 w-4/5 h-screen flex items-center justify-center bg-white"
    >
      <div className="w-[25rem] h-[30rem]">
        <h1 className="text-[2rem] font-bold text-center font-['Pretendard']">
          로그인
        </h1>
        <hr className="w-full h-1 mt-5 bg-[#000000]" />
        <div>
          <div className="mt-8">
            <h4 className="font-semibold font-['Pretendard']">아이디</h4>
            <input
              className="w-full h-9 border-[0.2rem] border-black pl-2 outline-none font-semibold font-['SUIT']"
              {...register<"studentNumber">("studentNumber")}
            />
          </div>
          <div className="mt-4">
            <h4 className="font-semibold font-['Pretendard']">비밀번호</h4>
            <div className=" relative">
              <input
                type="password"
                className="w-full h-9 border-[0.2rem] border-black pl-2 outline-none font-semibold font-['SUIT']"
                {...register<"password">("password")}
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-8">
          <button type="submit" className="w-full h-11 bg-black text-white">
            로그인 하기
          </button>
          <div className="flex mt-4">
            <div className="flex flex-row items-center space-x-1 ml-auto cursor-pointer">
              <span className="text-[1rem] font-medium font-['Pretendard']">
                비밀번호 찾기
              </span>
              <svg
                width="6"
                height="9"
                viewBox="0 0 6 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  d="M1 1L5 4.5L1 8"
                  stroke="black"
                  strokeLinecap="square"
                />
              </svg>
            </div>
          </div>
          <div className="flex mt-10">
            <span className="text-[#656565] text-[1rem] font-medium font-['Pretendard']">
              아직 스파크에 가입 안하셨나요?
            </span>
            <Link
              href="/register"
              className="text-black text-[1rem] font-bold underline ml-auto font-['Pretendard']"
            >
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DesktopLoginPage;
