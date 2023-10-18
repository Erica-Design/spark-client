"use client";

import Check from "@icons/check";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cls } from "@utils/cls";
import Link from "next/link";
import registerUser from "@services/users/register/post/registerUser";
import { useRouter } from "next/router";

enum PageInput {
  STUDENT,
  PASSWORD,
  EMAIL,
  DETAIL,
  MODAL,
}

interface RegisterForm {
  studentNumber: string;
  password: string;
  username: string;
  departmentCode: string;
  confirmPassword: string;
  email: string;
}

interface RegisterProps {
  departments: {
    name: string;
    code: string;
  }[];
}

export default function DesktopRegister({ departments }: RegisterProps) {
  const router = useRouter();
  const [pageInput, setPageInput] = useState<PageInput>(PageInput.STUDENT);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departs, setDeparts] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<RegisterForm>();

  const { studentNumber, password, email, confirmPassword, username } = watch();

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
      .catch((e) => {});
  };

  const handleDepartment = ({ code, name }: { code: string; name: string }) => {
    setValue<keyof RegisterForm>("departmentCode", code);
    setSelectedDepartment(name);
  };

  const onClick = () => {
    switch (pageInput) {
      case PageInput.STUDENT:
        setPageInput(PageInput.PASSWORD);
        break;
      case PageInput.PASSWORD:
        setPageInput(PageInput.EMAIL);
        break;
      case PageInput.EMAIL:
        setPageInput(PageInput.DETAIL);
        break;
      case PageInput.DETAIL:
        setPageInput(PageInput.MODAL);
        break;
      case PageInput.MODAL:
        setPageInput(PageInput.MODAL);
        break;
      default:
        setPageInput(PageInput.STUDENT);
        break;
    }
  };

  return (
    <div>
      <div className="flex">
        <div
          className={`absolute top-0 w-2/3 h-screen flex items-center justify-center ${
            successRegister
              ? "bg-[rgba(0,0,0,0.7)] blur-[2px] transition-all duration-100"
              : "bg-white"
          }`}
        >
          <form className="w-[25rem] h-96" onSubmit={handleSubmit(userSubmit)}>
            <h1 className="text-[2rem] font-bold text-center font-['Pretendard']">
              회원가입
            </h1>
            <i
              className={cls(
                "absolute mt-[1.5rem] h-1 bg-black transition-all duration-500 z-50",
                `w-${20 + 20 * pageInput}`,
              )}
            />
            {pageInput === PageInput.STUDENT && (
              <div className="mt-6 border-t-4 border-gray-300">
                <h4 className="text-[1.25rem] mt-5 font-semibold font-['Pretendard']">
                  로그인에 사용할
                  <br />
                  학번을 입력해주세요
                </h4>
                <input
                  required
                  className="w-full h-[50px] mt-3 pl-3 font-['Pretendard'] text-[0.88rem] border-[2px] outline-none focus:border-black valid:border-black invalid:border-gray-300"
                  placeholder="학번 입력"
                  {...register<"studentNumber">("studentNumber")}
                />
              </div>
            )}
            {pageInput === PageInput.EMAIL && (
              <div className="mt-6 border-t-4 border-gray-300">
                <h4 className="text-[1.25rem] mt-5 font-semibold font-['Pretendard']">
                  이메일을 입력해주세요
                </h4>
                <input
                  required
                  className="w-full h-[50px] mt-3 pl-3 font-['Pretendard'] text-[0.88rem] outline-none border-[2px] border-gray-300 focus:border-black valid:border-black invalid:border-gray-300"
                  placeholder="이메일을 입력해주세요"
                  {...register<"email">("email")}
                />
              </div>
            )}
            {pageInput === PageInput.PASSWORD && (
              <div className="mt-6 border-t-4 border-gray-300">
                <h4 className="text-[1.25rem] mt-5 font-semibold font-['Pretendard']">
                  로그인에 사용할
                  <br />
                  비밀번호를 입력해주세요
                </h4>
                <input
                  required
                  type="password"
                  className="w-full h-[50px] mt-3 pl-3 font-['Pretendard'] text-[0.88rem] border-[2px] border-gray-300 focus:border-black outline-none valid:border-black invalid:border-gray-300"
                  placeholder="비밀번호 입력"
                  {...register<"password">("password")} // Register 'password' input with react-hook-form
                ></input>
                <div className="flex mt-3">
                  <div className="flex flex-row items-center justify-center space-x-1">
                    <span
                      className={cls(
                        "text-[#C4C4C4] text-[0.88rem] font-['Pretendard']",
                        /\d/.test(password) && "text-black",
                      )}
                    >
                      숫자
                    </span>
                    <Check isChecked={/\d/.test(password)} />
                  </div>
                  <div className="flex flex-row items-center justify-center space-x-1">
                    <span
                      className={cls(
                        "text-[#C4C4C4] text-[0.88rem] font-['Pretendard'] ml-7",
                        password &&
                          password.length < 21 &&
                          password.length > 7 &&
                          "text-black",
                      )}
                    >
                      8-20자 이내
                    </span>
                    <Check
                      isChecked={
                        password && password.length < 21 && password.length > 7
                      }
                    />
                  </div>
                </div>
                <input
                  required
                  type="password"
                  className="w-full h-[50px] mt-3 pl-3 font-['Pretendard'] text-[0.88rem] border-[2px] border-gray-300 outline-none focus:border-black valid:border-black invalid:border-gray-300"
                  placeholder="비밀번호 확인"
                  {...register<"confirmPassword">("confirmPassword")} // Register 'confirmPassword' input with react-hook-form
                ></input>
                <div className="flex flex-row items-center space-x-1 mt-3">
                  <span
                    className={cls(
                      "text-[#C4C4C4] text-[0.88rem] font-['Pretendard']",
                      password &&
                        confirmPassword &&
                        password === confirmPassword &&
                        "text-black",
                    )}
                  >
                    비밀번호 일치
                  </span>
                  <Check
                    isChecked={
                      password &&
                      confirmPassword &&
                      password === confirmPassword
                    }
                  />
                </div>
              </div>
            )}

            {pageInput === PageInput.DETAIL && (
              <div className="mt-6 border-t-4 border-gray-300">
                <h4 className="text-[1.25rem] mt-5 font-semibold font-['Pretendard']">
                  업로드에 사용할
                  <br />
                  이름(본명)과 학과를 입력해주세요
                </h4>
                <input
                  required
                  className="w-full h-[50px] mt-3 pl-3 font-['Pretendard'] text-[0.88rem] outline-none border-[2px] border-gray-300 focus:border-black valid:border-black invalid:border-gray-300"
                  placeholder="이름 입력"
                  {...register<"username">("username")}
                ></input>
                <div
                  className="relative cursor-pointer"
                  onClick={() => {
                    setDeparts(!departs);
                  }}
                >
                  <div
                    className={`w-full h-[50px] mt-3 pt-2 pl-3 font-['Pretendard'] text-[0.88rem] outline-none border-[2px] ${
                      selectedDepartment
                        ? "text-black border-gray-950"
                        : "text-[#757575] border-gray-300"
                    }  valid:border-black invalid:border-gray-300`}
                    {...register<"departmentCode">("departmentCode")}
                  >
                    {selectedDepartment ?? "학과 입력"}
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
                {departs && (
                  <div className="w-[25rem] h-44 border-2 border-[#d9d9d9] absolute bg-white p-3 mt-2 space-y-5 flex flex-col">
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
                )}
              </div>
            )}
            {pageInput === PageInput.MODAL && (
              <div className="mt-6 border-t-4 border-gray-300">
                <h4 className="text-[1.25rem] mt-5 font-semibold font-['Pretendard']">
                  업로드에 사용할
                  <br />
                  이름(본명)과 학과를 입력해주세요
                </h4>
                <input
                  required
                  className="w-full h-[50px] mt-3 pl-3 font-['Pretendard'] text-[0.88rem] outline-none border-[2px] border-gray-300 focus:border-black valid:border-black invalid:border-gray-300"
                  placeholder="이름 입력"
                  {...register<"username">("username")}
                />
                <div>
                  <input
                    required
                    className="w-full h-[50px] mt-3 pl-3 font-['Pretendard'] text-[0.88rem] outline-none border-[2px] border-gray-300 focus:border-black valid:border-black invalid:border-gray-300"
                    placeholder="학과 입력"
                    {...register<"departmentCode">("departmentCode")}
                  />
                </div>
              </div>
            )}
            <div className="w-full mt-8">
              <div className={`${pageInput === 3 ? "hidden" : "block"}`}>
                <button
                  onClick={onClick}
                  className={`w-full h-[50px] font-['Pretendard'] font-bold ${
                    (pageInput === PageInput.STUDENT &&
                      studentNumber &&
                      studentNumber.length > 5) ||
                    (pageInput === PageInput.EMAIL &&
                      email &&
                      email.includes("@")) ||
                    (pageInput === PageInput.PASSWORD &&
                      password &&
                      password.length < 21 &&
                      password.length > 7 &&
                      password &&
                      confirmPassword &&
                      password === confirmPassword) ||
                    (pageInput === PageInput.DETAIL &&
                      username &&
                      selectedDepartment) ||
                    pageInput === PageInput.MODAL
                      ? "bg-black"
                      : "bg-[#C4C4C4]"
                  } text-white transition-all duration-500`}
                  disabled={
                    !(
                      (pageInput === PageInput.STUDENT &&
                        studentNumber &&
                        studentNumber.length > 5) ||
                      (pageInput === PageInput.EMAIL &&
                        email &&
                        email.includes("@")) ||
                      (pageInput === PageInput.PASSWORD &&
                        password &&
                        password.length < 21 &&
                        password.length > 7 &&
                        password &&
                        confirmPassword &&
                        password === confirmPassword) ||
                      (pageInput === PageInput.DETAIL &&
                        username &&
                        selectedDepartment)
                    )
                  }
                >
                  다음
                </button>
              </div>
              <div>
                <div className={`${pageInput === 3 ? "block" : "hidden"}`}>
                  <button
                    className={`w-full h-[50px] font-['Pretendard'] text-[14px] ${
                      (pageInput === PageInput.STUDENT &&
                        studentNumber &&
                        studentNumber.length > 5) ||
                      (pageInput === PageInput.PASSWORD &&
                        password &&
                        password.length < 21 &&
                        password.length > 7 &&
                        password &&
                        confirmPassword &&
                        password === confirmPassword) ||
                      (pageInput === PageInput.DETAIL &&
                        username &&
                        selectedDepartment) ||
                      pageInput === PageInput.MODAL
                        ? "bg-black"
                        : "bg-[#C4C4C4]"
                    } text-white transition-all duration-500`}
                    disabled={
                      !(
                        (pageInput === PageInput.STUDENT &&
                          studentNumber &&
                          studentNumber.length > 5) ||
                        (pageInput === PageInput.PASSWORD &&
                          password &&
                          password.length < 21 &&
                          password.length > 7 &&
                          password &&
                          confirmPassword &&
                          password === confirmPassword) ||
                        (pageInput === PageInput.DETAIL &&
                          username &&
                          selectedDepartment)
                      )
                    }
                  >
                    회원가입
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {successRegister && (
          <div className="absolute w-full flex justify-center items-center self-center">
            <div className="absolute flex-1 flex top-0 justify-center items-center bg-white w-[40rem] h-[5.2rem] border border-black mt-[-5rem] transition-all duration-100">
              <Link className="text-center" href="/login">
                <span className="text-center font-['Pretendard'] font-normal text-[18px]">
                  안녕하세요 <span className="font-bold">{username}</span>님,
                  스파크에 가입하신 것을 환영합니다.
                  <br />
                  많은 활동 기대할게요!
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
