"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import ReactModal from "react-modal";
import registerUser from "@services/users/register/post/registerUser";
import { useRouter } from "next/router";

enum PageInput {
  STUDENT,
  NAME,
  EMAIL,
  PASSWORD,
  CONFRIM,
  DETAIL,
  MODAL,
}

interface RegisterForm {
  studentNumber: string;
  password: string;
  email: string;
  confirmPassword: string;
  username: string;
  departmentCode: string;
}

interface RegisterProps {
  departments: {
    name: string;
    code: string;
  }[];
}

export default function MobileRegister({departments}: RegisterProps) {
  const router = useRouter();
  const [pageInput, setPageInput] = useState<PageInput>(PageInput.STUDENT);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departs, setDeparts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDepartment = ({code, name}: { code: string; name: string }) => {
    setValue<keyof RegisterForm>("departmentCode", code);
    setSelectedDepartment(name);
  };

  const {register, handleSubmit, watch, setValue} = useForm<RegisterForm>();

  const {studentNumber, email, password, confirmPassword, username} = watch();
  const [successRegister, setRegister] = useState(false);

  const userSubmit = (data: RegisterForm) => {
    registerUser(data)
        .then((response) => {
          if (response) {
            setRegister(true);
          } else {
            router.reload();
          }
        })
        .catch((e) => {
        });
  };

  const onClick = () => {
    switch (pageInput) {
      case PageInput.STUDENT:
        setPageInput(PageInput.DETAIL);
        break;
      case PageInput.DETAIL:
        setPageInput(PageInput.NAME);
        break;
      case PageInput.NAME:
        setPageInput(PageInput.EMAIL);
        break;
      case PageInput.EMAIL:
        setPageInput(PageInput.PASSWORD);
        break;
      case PageInput.PASSWORD:
        setPageInput(PageInput.CONFRIM);
        break;
      case PageInput.CONFRIM:
        setPageInput(PageInput.MODAL);
        break;
      case PageInput.MODAL:
        setPageInput(PageInput.MODAL);
        break;
      default:
        break;
    }
  };
  return (
      <div>
        {/*  Sidebar */}
        <div className="flex">
          <div
              className={`w-full flex items-center justify-center ${
                  pageInput === PageInput.MODAL
                      ? "blur-[1.5px] transition-all duration-100"
                      : "bg-white"
              }`}
          >
            <form className="w-[400px] p-3" onSubmit={handleSubmit(userSubmit)}>
              <h1 className="text-[2rem] font-bold font-['Pretendard']">
                회원가입
              </h1>
              {pageInput === PageInput.STUDENT && (
                  <div className="">
                    <div className="flex">
                      <h4 className="text-[1.25rem] mt-5 font-semibold font-['Pretendard']">
                        로그인에 사용할
                        <br/>
                        학번을 입력해주세요
                      </h4>
                      <span className="ml-auto font-['SUIT'] text-[0.75rem] mt-12 p-2">
                    1<span className="text-[#949494]"> / 6</span>
                  </span>
                    </div>
                    <input
                        required
                        className="w-full h-11 mt-3 pl-3 font-['Pretendard'] font-medium     text-[0.88rem] border outline-none focus:border-black valid:border-black invalid:border-gray-300"
                        placeholder="학번 입력"
                        {...register<keyof RegisterForm>("studentNumber")}
                    />
                  </div>
              )}
              {pageInput === PageInput.DETAIL && (
                  <div className="">
                    <div className="flex">
                      <h4 className="text-[1.25rem] mt-5 font-semibold font-['Pretendard']">
                        소속된 학과를
                        <br/>
                        선택해주세요.
                      </h4>
                      <span className="ml-auto font-['SUIT'] text-[0.75rem] mt-12 p-2">
                    2<span className="text-[#949494]"> / 6</span>
                  </span>
                    </div>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => {
                          setDeparts(!departs);
                        }}
                    >
                      <div
                          className={`w-full h-11 mt-3 pt-2.5 pl-3 font-['Pretendard'] font-medium text-[0.88rem] outline-none border ${
                              selectedDepartment
                                  ? "text-black border-gray-950"
                                  : "text-[#757575] border-gray-300"
                          }  valid:border-black invalid:border-gray-300`}
                          {...register<keyof RegisterForm>("departmentCode")}
                      >
                        {selectedDepartment ?? "학과 입력"}
                      </div>
                      <svg
                          className="absolute top-[50%] right-3 translate-y-[-50%]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                      >
                        <path
                            d="M8 2.66675L8 12.0001"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.6667 8L8 12.6667L3.33333 8"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                        />
                      </svg>
                    </div>
                    {departs && (
                        <div className=" relative">
                          <div
                              className="w-full h-44 border border-[#d9d9d9] font-medium absolute bg-white p-3 mt-2 space-y-5 flex flex-col">
                            {departments.map((element, index) => (
                                <label
                                    className="flex items-center cursor-pointer"
                                    key={index}
                                    onClick={() => handleDepartment(element)}
                                >
                                  <input
                                      className="w-3.5 h-3.5 accent-black"
                                      type="checkbox"
                                  />
                                  <span
                                      className={`font-['Pretendard'] text-[0.88rem] text-[#757575] ml-2`}
                                  >
                            {element.name}
                          </span>
                                </label>
                            ))}
                          </div>
                        </div>
                    )}
                    <input
                        required
                        className="w-full h-11 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] border outline-none text-[#c4c4c4]"
                        placeholder="학번 입력"
                        disabled
                        {...register<keyof RegisterForm>("studentNumber")}
                    />
                  </div>
              )}
              {pageInput === PageInput.NAME && (
                  <div className="">
                    <div className="flex">
                      <h4 className="text-[1.25rem] mt-5 font-semibold font-['Pretendard']">
                        이름을
                        <br/>
                        입력해주세요.
                      </h4>
                      <span className="ml-auto font-['SUIT'] text-[0.75rem] mt-12 p-2">
                    3<span className="text-[#949494]"> / 6</span>
                  </span>
                    </div>
                    <input
                        required
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] text-[0.88rem] font-medium outline-none border border-gray-300 focus:border-black valid:border-black invalid:border-gray-300"
                        placeholder="이름"
                        {...register<keyof RegisterForm>("username")}
                    ></input>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => {
                          setDeparts(!departs);
                        }}
                    >
                      <div
                          className={`w-full h-11 mt-3 pt-2.5 pl-3 font-['Pretendard'] font-medium text-[0.88rem] outline-none border border-gray-300 text-[#c4c4c4] bg-[#efefef4d] cursor-default`}
                          {...register<keyof RegisterForm>("departmentCode")}
                      >
                        {selectedDepartment ? selectedDepartment : "학과 입력"}
                      </div>
                      <svg
                          className="absolute top-[50%] right-2 translate-y-[-50%]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                      >
                        <path
                            d="M8 2.66675L8 12.0001"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.6667 8L8 12.6667L3.33333 8"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                        />
                      </svg>
                    </div>
                    <input
                        required
                        className="w-full h-11 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] border outline-none text-[#c4c4c4]"
                        placeholder="학번 입력"
                        disabled
                        {...register<keyof RegisterForm>("studentNumber")}
                    />
                  </div>
              )}
              {pageInput === PageInput.EMAIL && (
                  <div>
                    <div className="flex">
                      <h4 className="text-[1.25rem] mt-5 font-semibold font-['Pretendard']">
                        이메일을
                        <br/>
                        입력해주세요
                      </h4>
                      <span className="ml-auto font-['SUIT'] text-[0.75rem] mt-12 p-2">
                    4<span className="text-[#949494]"> / 6</span>
                  </span>
                    </div>
                    <input
                        required
                        type="text"
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] border border-gray-300 focus:border-black outline-none valid:border-black invalid:border-gray-300"
                        placeholder="이메일"
                        {...register<keyof RegisterForm>("email")} // Register 'password' input with react-hook-form
                    ></input>
                    <input
                        required
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] outline-none border text-[#c4c4c4]"
                        placeholder="이름"
                        disabled
                        {...register<keyof RegisterForm>("username")}
                    ></input>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => {
                          setDeparts(!departs);
                        }}
                    >
                      <div
                          className={`w-full h-11 mt-3 pt-2.5 pl-3 font-['Pretendard'] font-medium text-[0.88rem] outline-none border border-gray-300 text-[#c4c4c4] bg-[#efefef4d] cursor-default`}
                          {...register<keyof RegisterForm>("departmentCode")}
                      >
                        {selectedDepartment ? selectedDepartment : "학과 입력"}
                      </div>
                      <svg
                          className="absolute top-[50%] right-2 translate-y-[-50%]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                      >
                        <path
                            d="M8 2.66675L8 12.0001"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.6667 8L8 12.6667L3.33333 8"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                        />
                      </svg>
                    </div>
                    <input
                        required
                        className="w-full h-11 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] border outline-none text-[#c4c4c4]"
                        placeholder="학번 입력"
                        disabled
                        {...register<keyof RegisterForm>("studentNumber")}
                    />
                  </div>
              )}
              {pageInput === PageInput.PASSWORD && (
                  <div>
                    <div className="flex">
                      <h4 className="text-[1.25rem] mt-5 font-semibold font-['Pretendard']">
                        사용할 비밀번호를
                        <br/>
                        입력해주세요
                      </h4>
                      <span className="ml-auto font-['SUIT'] text-[0.75rem] mt-12 p-2">
                    5<span className="text-[#949494]"> / 6</span>
                  </span>
                    </div>
                    <input
                        required
                        type="password"
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] border border-gray-300 focus:border-black outline-none valid:border-black invalid:border-gray-300"
                        placeholder="비밀번호"
                        {...register<keyof RegisterForm>("password")} // Register 'password' input with react-hook-form
                    ></input>
                    <input
                        required
                        type="text"
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] text-[#c4c4c4] border border-gray-300 focus:border-black outline-none valid:border-black invalid:border-gray-300"
                        placeholder="이메일"
                        disabled
                        {...register<keyof RegisterForm>("email")} // Register 'password' input with react-hook-form
                    ></input>
                    <input
                        required
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] text-[0.88rem] font-medium outline-none border text-[#c4c4c4]"
                        placeholder="이름"
                        disabled
                        {...register<keyof RegisterForm>("username")}
                    ></input>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => {
                          setDeparts(!departs);
                        }}
                    >
                      <div
                          className={`w-full h-11 mt-3 pt-2.5 pl-3 font-['Pretendard'] text-[0.88rem] font-medium outline-none border border-gray-300 text-[#c4c4c4] bg-[#efefef4d] cursor-default`}
                          {...register<keyof RegisterForm>("departmentCode")}
                      >
                        {selectedDepartment ? selectedDepartment : "학과 입력"}
                      </div>
                      <svg
                          className="absolute top-[50%] right-2 translate-y-[-50%]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                      >
                        <path
                            d="M8 2.66675L8 12.0001"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.6667 8L8 12.6667L3.33333 8"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                        />
                      </svg>
                    </div>
                    <input
                        required
                        className="w-full h-11 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] border outline-none text-[#c4c4c4]"
                        placeholder="학번 입력"
                        disabled
                        {...register<keyof RegisterForm>("studentNumber")}
                    />
                  </div>
              )}
              {pageInput === PageInput.CONFRIM && (
                  <div>
                    <div className="flex">
                      <h4 className="text-[1.25rem] mt-5 font-semibold font-['Pretendard']">
                        사용할 비밀번호를
                        <br/>
                        한번 더 확인해주세요.
                      </h4>
                      <span className="ml-auto font-['SUIT'] text-[0.75rem] mt-12 p-2">
                    6<span className="text-[#949494]"> / 6</span>
                  </span>
                    </div>
                    <input
                        required
                        type="password"
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] border border-gray-300 focus:border-black outline-none valid:border-black invalid:border-gray-300"
                        placeholder="비밀번호 확인"
                        {...register<keyof RegisterForm>("confirmPassword")} // Register 'password' input with react-hook-form
                    ></input>
                    <input
                        required
                        type="password"
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] border text-[#c4c4c4]"
                        placeholder="비밀번호"
                        disabled
                        {...register<keyof RegisterForm>("password")} // Register 'password' input with react-hook-form
                    ></input>
                    <input
                        required
                        type="text"
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] text-[#c4c4c4] border border-gray-300 focus:border-black outline-none valid:border-black invalid:border-gray-300"
                        placeholder="이메일"
                        disabled
                        {...register<keyof RegisterForm>("email")} // Register 'password' input with react-hook-form
                    ></input>
                    <input
                        required
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] text-[0.88rem] font-medium outline-none border text-[#c4c4c4]"
                        placeholder="이름"
                        disabled
                        {...register<keyof RegisterForm>("username")}
                    ></input>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => {
                          setDeparts(!departs);
                        }}
                    >
                      <div
                          className={`w-full h-11 mt-3 pt-2.5 pl-3 font-['Pretendard'] text-[0.88rem] font-medium outline-none border border-gray-300 text-[#c4c4c4] bg-[#efefef4d] cursor-default`}
                          {...register<keyof RegisterForm>("departmentCode")}
                      >
                        {selectedDepartment ? selectedDepartment : "학과 입력"}
                      </div>
                      <svg
                          className="absolute top-[50%] right-2 translate-y-[-50%]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                      >
                        <path
                            d="M8 2.66675L8 12.0001"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.6667 8L8 12.6667L3.33333 8"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                        />
                      </svg>
                    </div>
                    <input
                        required
                        className="w-full h-11 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] border outline-none text-[#c4c4c4]"
                        placeholder="학번 입력"
                        disabled
                        {...register<keyof RegisterForm>("studentNumber")}
                    />
                  </div>
              )}
              {pageInput === PageInput.MODAL && (
                  <div>
                    <h4 className="text-[1.25rem] mt-5 font-normal font-['Pretendard']">
                      사용할 비밀번호를
                      <br/>
                      한번 더 확인해주세요.
                    </h4>
                    <input
                        required
                        type="password"
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem]  border border-gray-300 focus:border-black outline-none valid:border-black invalid:border-gray-300"
                        placeholder="비밀번호 확인"
                        {...register<keyof RegisterForm>("confirmPassword")} // Register 'password' input with react-hook-form
                    ></input>
                    <input
                        required
                        type="password"
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] border text-[#c4c4c4]"
                        placeholder="비밀번호"
                        disabled
                        {...register<keyof RegisterForm>("password")} // Register 'password' input with react-hook-form
                    ></input>
                    <input
                        required
                        type="text"
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] text-[#c4c4c4] border border-gray-300 focus:border-black outline-none valid:border-black invalid:border-gray-300"
                        placeholder="이메일"
                        disabled
                        {...register<keyof RegisterForm>("email")} // Register 'password' input with react-hook-form
                    ></input>
                    <input
                        required
                        className="w-full h-12 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] outline-none border text-[#c4c4c4]"
                        placeholder="이름"
                        disabled
                        {...register<keyof RegisterForm>("username")}
                    ></input>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => {
                          setDeparts(!departs);
                        }}
                    >
                      <div
                          className={`w-full h-11 mt-3 pt-2.5 pl-3 font-['Pretendard'] text-[0.88rem] font-medium outline-none border border-gray-300 text-[#c4c4c4] bg-[#efefef4d] cursor-default`}
                          {...register<keyof RegisterForm>("departmentCode")}
                      >
                        {selectedDepartment ? selectedDepartment : "학과 입력"}
                      </div>
                      <svg
                          className="absolute top-[50%] right-2 translate-y-[-50%]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                      >
                        <path
                            d="M8 2.66675L8 12.0001"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.6667 8L8 12.6667L3.33333 8"
                            stroke="#C4C4C4"
                            strokeWidth="2"
                            strokeLinecap="square"
                        />
                      </svg>
                    </div>
                    <input
                        required
                        className="w-full h-11 mt-3 pl-3 font-['Pretendard'] font-medium text-[0.88rem] border outline-none text-[#c4c4c4]"
                        placeholder="학번 입력"
                        disabled
                        {...register<keyof RegisterForm>("studentNumber")}
                    />
                  </div>
              )}
              <div
                  className={`w-full mt-8 ${
                      pageInput === PageInput.CONFRIM ? "block" : "hidden"
                  }`}
              >
                <button
                    className={`w-full h-11 font-['Pretendard'] text-[14px] font-bold ${
                        (pageInput === PageInput.STUDENT &&
                            studentNumber &&
                            studentNumber.length > 5) ||
                        (pageInput === PageInput.EMAIL && email) ||
                        (pageInput === PageInput.PASSWORD &&
                            password &&
                            password.length < 21 &&
                            password.length > 7) ||
                        (pageInput === PageInput.CONFRIM &&
                            password &&
                            confirmPassword &&
                            password === confirmPassword) ||
                        (pageInput === PageInput.NAME && username) ||
                        (pageInput === PageInput.DETAIL && selectedDepartment) ||
                        pageInput === PageInput.MODAL
                            ? "bg-black"
                            : "bg-[#C4C4C4]"
                    } text-white transition-all duration-500`}
                    disabled={
                      !(
                          (pageInput === PageInput.STUDENT &&
                              studentNumber &&
                              studentNumber.length > 5) ||
                          (pageInput === PageInput.EMAIL && email) ||
                          (pageInput === PageInput.PASSWORD &&
                              password &&
                              password.length < 21 &&
                              password.length > 7) ||
                          (pageInput === PageInput.CONFRIM &&
                              password &&
                              confirmPassword &&
                              password === confirmPassword) ||
                          (pageInput === PageInput.NAME && username) ||
                          (pageInput === PageInput.DETAIL && selectedDepartment)
                      )
                    }
                >
                  다음
                </button>
              </div>
              <div
                  className={`w-full mt-8 ${
                      pageInput === PageInput.CONFRIM ? "hidden" : "block"
                  }`}
              >
                <button
                    onClick={onClick}
                    className={`w-full h-11 font-['Pretendard'] text-[14px] font-bold ${
                        (pageInput === PageInput.STUDENT &&
                            studentNumber &&
                            studentNumber.length > 5) ||
                        (pageInput === PageInput.EMAIL && email) ||
                        (pageInput === PageInput.PASSWORD &&
                            password &&
                            password.length < 21 &&
                            password.length > 7) ||
                        (pageInput === PageInput.CONFRIM &&
                            password &&
                            confirmPassword &&
                            password === confirmPassword) ||
                        (pageInput === PageInput.NAME && username) ||
                        (pageInput === PageInput.DETAIL && selectedDepartment) ||
                        pageInput === PageInput.MODAL
                            ? "bg-black"
                            : "bg-[#C4C4C4]"
                    } text-white transition-all duration-500`}
                    disabled={
                      !(
                          (pageInput === PageInput.STUDENT &&
                              studentNumber &&
                              studentNumber.length > 5) ||
                          (pageInput === PageInput.EMAIL && email) ||
                          (pageInput === PageInput.PASSWORD &&
                              password &&
                              password.length < 21 &&
                              password.length > 7) ||
                          (pageInput === PageInput.CONFRIM &&
                              password &&
                              confirmPassword &&
                              password === confirmPassword) ||
                          (pageInput === PageInput.NAME && username) ||
                          (pageInput === PageInput.DETAIL && selectedDepartment)
                      )
                    }
                >
                  다음
                </button>
              </div>
            </form>
          </div>
          {successRegister && (
              <ReactModal
                  isOpen={true}
                  onRequestClose={() => setIsModalOpen(false)}
                  className="w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,0.7)] px-3 transition-all duration-200"
              >
                <div
                    className="flex-1 flex bg-white items-center justify-center h-28 border border-black transition-all duration-200">
                  <Link className="text-center" href="/login">
                <span className="text-center font-['Pretendard'] font-normal text-[15px]">
                  안녕하세요 <span className="font-bold">{username}</span>님,
                  <br/>
                  스파크에 가입하신 것을 환영합니다.
                  <br/>
                  <br/>
                  많은 활동 기대할게요!
                </span>
                  </Link>
                </div>
              </ReactModal>
          )}
        </div>
      </div>
  );
}
