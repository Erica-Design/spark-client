import Image from "next/image";
import OnBoardingImg from "@icons/onbording.svg";
import Link from "next/link";
import { useState } from "react";

export default function MobileOnBoarding() {
  const [countdown, setCountdown] = useState(5);
  const [displayText, setDisplayText] = useState("");

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         if (countdown > 1) {
  //             setCountdown(countdown - 1);
  //         } else if (countdown === 1) {
  //             setCountdown(0);
  //             setDisplayText('GO');
  //         }
  //     }, 1000);
  //
  //     return () => {
  //         clearInterval(interval);
  //     };
  // }, [countdown]);

  return (
    <div className="bg-black">
      <div className="flex flex-col items-center justify-center">
        <Image
          className="w-full h-screen"
          src={OnBoardingImg}
          alt="온보딩이미지"
        />
        <div className="absolute bottom-10">
          <Link
            href="/sparkstory"
            className="text-white font-['SUIT'] font-normal text-[14px] underline"
          >
            스파크스토리 보러가기
          </Link>
        </div>
      </div>
    </div>
  );
}
