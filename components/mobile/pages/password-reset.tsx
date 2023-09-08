import { useState } from "react";
import { useForm } from "react-hook-form";
import resetPassword from "@services/users/password/post/resetPassword";

enum PageInput {
  PASSWORD,
  CONFRIM,
  MODAL,
}

interface ResetForm {
  studentNumber: string;
  password: string;
  confirmPassword: string;
}

interface MobileResetProps {
  studentNumber: string;
}

export default function MobileReset({ studentNumber }: MobileResetProps) {
  const [pageInput, setPageInput] = useState<PageInput>(PageInput.PASSWORD);

  const {
    register,
    handleSubmit,
    watch,
    getFieldState,
    formState: { errors },
  } = useForm<ResetForm>();

  const { password, confirmPassword } = watch();

  const onClick = async () => {
    switch (pageInput) {
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
        setPageInput(PageInput.PASSWORD);
        break;
    }
  };

  const onSubmit = (data: ResetForm) => {
    if (data.password !== data.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      setPageInput(PageInput.PASSWORD);
    }
    resetPassword({
      studentNumber: studentNumber,
      password: data.password,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-5 flex flex-col h-[35rem]">
        {pageInput === PageInput.PASSWORD && (
          <div>
            <h1 className="font-['SUIT'] text-[1.75rem] font-bold ">
              비밀번호 변경
            </h1>
            <h2 className="font-['Pretendard'] text-[1rem] font-normal mt-2">
              새로 사용할 비밀번호를
              <br />
              입력해주세요.
            </h2>
            <div>
              <input
                required
                className="w-full h-12 outline-none border border-gray-300 focus:border-black valid:border-black invalid:border-gray-300 items-center gap-2 text-[0.88rem] pl-3 mt-2 font-['Pretendard'] font-medium"
                type="password"
                placeholder="비밀번호"
                {...register<keyof ResetForm>("password")}
              />
            </div>
            <div className="mt-5">
              <button
                className={`w-full h-12 ${
                  !password ? "bg-[#d1d1d1]" : "bg-black"
                } transition-all duration-300 text-white text-[0.88rem] font-['Pretendard'] font-bold`}
                disabled={!password}
                onClick={onClick}
              >
                다음
              </button>
            </div>
          </div>
        )}
        {pageInput === PageInput.CONFRIM && (
          <div>
            <h1 className="font-['SUIT'] text-[1.75rem] font-bold ">
              비밀번호 변경
            </h1>
            <h2 className="font-['Pretendard'] text-[1rem] font-normal mt-2">
              새로 사용할 비밀번호를
              <br />
              한번 더 확인해주세요.
            </h2>
            <div>
              <input
                required
                className="w-full h-12 outline-none border border-gray-300 focus:border-black valid:border-black invalid:border-gray-300 items-center gap-2 text-[0.88rem] pl-3 mt-2 font-['Pretendard'] font-medium"
                type="password"
                placeholder="비밀번호"
                {...register<keyof ResetForm>("confirmPassword")}
              />
            </div>
            <div className="mt-5">
              <button
                className={`w-full h-12 ${
                  !(confirmPassword && confirmPassword === password)
                    ? "bg-[#d1d1d1]"
                    : "bg-black"
                } transition-all duration-300 text-white text-[0.88rem] font-['Pretendard'] font-bold`}
                disabled={!(confirmPassword && confirmPassword === password)}
                onClick={onClick}
              >
                다음
              </button>
            </div>
          </div>
        )}
        {pageInput === PageInput.MODAL && (
          <div>
            <h1 className="font-['SUIT'] text-[1.75rem] font-bold ">
              비밀번호 변경
            </h1>
            <h2 className="font-['Pretendard'] text-[1rem] font-normal mt-2">
              새로 사용할 비밀번호를
              <br />
              한번 더 확인해주세요.
            </h2>
            <div>
              <input
                required
                className="w-full h-12 outline-none border border-gray-300 focus:border-black valid:border-black invalid:border-gray-300 items-center gap-2 text-[0.88rem] pl-3 mt-2 font-['Pretendard'] font-medium"
                type="password"
                placeholder="비밀번호"
              />
            </div>
            <div className="mt-5">
              <button className="w-full h-12 bg-black text-white text-[0.88rem] font-['Pretendard'] font-bold">
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
