import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import OnBoardLogo from "../../../icons/onboardLogo.svg";

export default function MobileOnBoarding() {
  const [countdown, setCountdown] = useState(5);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else if (countdown === 1) {
        setCountdown(0);
        setDisplayText("GO");
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  return (
    <div className="bg-black">
      <div className="flex absolute px-[14px] pt-8 w-full">
        <Image src={OnBoardLogo} alt="로고" />
        <div className="text-white">
          <h1 className="font-['SUIT'] font-normal text-[0.56rem] mt-1">
            SPARK:
          </h1>
          <h1 className="font-['SUIT'] font-bold text-[0.56rem] mt-[-0.3rem] flex">
            <span className="font-normal mr-1">ERICA DESIGN</span> ARCHIVING
          </h1>
        </div>
        <Link href={displayText && "/"}>
          <div className=" w-8 h-8 flex-shrink-0 text-[14px] font-bold border border-white absolute flex right-3.5">
            <span className="self-center mx-auto font-['SUIT'] text-white ml-auto">
              {displayText || countdown}
            </span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          className="w-full h-screen"
          src={"/onBoarding/mobile.gif"}
          alt="온보딩이미지"
        />
        <div className="absolute bottom-10">
          <Link
            href="/sparkStory"
            className="text-white font-['SUIT'] font-normal text-[14px] underline"
          >
            스파크스토리 보러가기
          </Link>
        </div>
      </div>
    </div>
  );
}
