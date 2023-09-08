import { useForm } from "react-hook-form";
import requestPassword from "@services/users/password/post/requestPassword";

interface FindForm {
  studentNumber: string;
  email: string;
}

export default function MobileFind() {
  const {register, handleSubmit, watch} = useForm<FindForm>();
  const {studentNumber, email} = watch();

  const onSubmit = (data: FindForm) => {
    requestPassword(data).then(
        (response) => {
          if (response) {
            alert("비밀번호 변경 메일이 발송되었습니다.")
          }
        }
    )
  };

  return (
      <div className="p-5 flex flex-col h-[35rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-['SUIT'] text-[1.75rem] font-bold ">
            비밀번호 찾기
          </h1>
          <h2 className="font-['Pretendard'] text-[1rem] font-normal">
            비밀번호를 새로 설정하기 위해
            <br/>
            학번과 이메일을 입력해주세요
          </h2>
          <div>
            <input
                required
                className="w-full h-12 outline-none border border-gray-300 focus:border-black valid:border-black invalid:border-gray-300 items-center gap-2 text-[0.88rem] pl-3 mt-2 font-['Pretendard'] font-medium"
                type="text"
                placeholder="학번"
                {...register<keyof FindForm>("studentNumber")}
            />
            <input
                required
                className="w-full h-12 outline-none border border-gray-300 focus:border-black valid:border-black invalid:border-gray-300 items-center gap-2 text-[0.88rem] pl-3 mt-2 font-['Pretendard'] font-medium"
                type="text"
                placeholder="이메일"
                {...register<keyof FindForm>("email")}
            />
            <div className="flex mt-2 px-2"></div>
          </div>
          <div className="mt-5">
            <input
                type="submit"
                className={`w-full h-12 ${
                    !(studentNumber && studentNumber.length > 5 && email)
                        ? "bg-[#d1d1d1]"
                        : "bg-black"
                } transition-all duration-300 text-white text-[0.88rem] font-['Pretendard'] font-bold`}
                disabled={!(studentNumber && studentNumber.length > 5 && email)}
                value="인증번호 전송하기"
            />
          </div>
        </form>
      </div>
  );
}
