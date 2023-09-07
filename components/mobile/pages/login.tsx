import Link from "next/link";
import { useForm } from "react-hook-form";
import login from "@services/users/login/post/login";

interface LoginFom {
  studentNumber: string;
  password: string;
}

const MobileLoginPage = () => {
  const { register, handleSubmit, watch, getFieldState, getValues, setValue } =
    useForm<LoginFom>();

  const loginSubmit = () => {
    const userData = getValues();
    login(userData)
      .then((response) => {
        if (response) {
          console.log(response);
        }
      })
      .catch((e) => {
        alert("로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요");
      });
  };

  const { studentNumber, password } = watch();

  const onSubmit = handleSubmit(loginSubmit);
  return (
    <form onSubmit={onSubmit}>
      <div className="px-[26px] py-[37px] flex flex-col h-[35rem]">
        <h1 className="font-['SUIT'] text-[1.75rem] font-bold ">로그인</h1>
        <div>
          <input
            required
            className="w-full h-[50px] outline-none border border-gray-300 focus:border-black valid:border-black invalid:border-gray-300 items-center gap-2 text-[0.88rem] font-['Pretendard'] font-medium pl-4 py-4 mt-[14px]"
            type="text"
            placeholder="이메일"
            {...register<"studentNumber">("studentNumber")}
          />
          <input
            required
            className="w-full h-[50px] outline-none border border-gray-300 focus:border-black valid:border-black invalid:border-gray-300 items-center gap-2 text-[0.88rem] font-['Pretendard'] font-medium pl-4 py-4 mt-2"
            type="password"
            placeholder="비밀번호"
            {...register<"password">("password")}
          />
          <div className="flex mt-2 px-2">
            <div className="flex flex-row items-center space-x-1 ml-auto cursor-pointer">
              <Link href="/find">
                <span className="text-[0.7rem] font-medium font-['Pretendard']">
                  비밀번호 찾기
                </span>
              </Link>
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
        </div>
        <div className="mt-[22px]">
          <button
            className={`w-full h-[50px]  text-white text-[0.88rem] font-['Pretendard'] font-bold ${!studentNumber || !password
              ? "bg-[#d1d1d1] transition-all duration-500"
              : "bg-black transition-all duration-500"
              }`}
            disabled={!studentNumber || !password}
          >
            로그인하기
          </button>
        </div>
        <div className="fixed bottom-[15%] left-0 right-0 px-5">
          <div className="flex flex-col">
            <span className="mx-auto text-[#757575] font-['Pretendard'] text-[0.75rem] font-medium">
              아직 스파크에 가입 안하셨나요?
            </span>
            <Link
              href="/register"
              className={`w-full h-12 flex items-center justify-center bg-white text-black border border-black text-[0.75rem] font-['Pretendard'] font-bold mt-2`}
            >
              회원가입 하기
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MobileLoginPage;
