import Image from "next/image";
import MainIcon from "@icons/mainIcon.svg";
import Link from "next/link";
import { useEffect, useState } from "react";

const onBoardingImages = [
  "/onBoarding/01.gif",
  "/onBoarding/02.gif",
  "/onBoarding/03.mp4",
  "/onBoarding/04.mp4",
  "/onBoarding/05.gif",
  "/onBoarding/06.gif",
  "/onBoarding/07.gif",
];

interface IonBoarding {
  src: string;
  width: number;
  height: number;
  top: number;
  left: number;
}

const onBoarding: IonBoarding[] = [
  {
    src: "/onBoarding/01.gif",
    width: 660,
    height: 660,
    top: 20,
    left: 20,
  },
  {
    src: "/onBoarding/02.gif",
    width: 632,
    height: 356,
    top: 124,
    left: 268,
  },
  {
    src: "/onBoarding/03.mp4",
    width: 1058,
    height: 591,
    top: 105,
    left: 568,
  },
  {
    src: "/onBoarding/04.mp4",
    width: 864,
    height: 421,
    top: 225,
    left: 193,
  },
  {
    src: "/onBoarding/05.gif",
    width: 1182,
    height: 663,
    top: 88,
    left: 362,
  },
  {
    src: "/onBoarding/06.gif",
    width: 700,
    height: 700,
    top: 172,
    left: 336,
  },
  {
    src: "/onBoarding/07.gif",
    width: 960,
    height: 540,
    top: 125,
    left: 428,
  },
];

function DesktopOnBoarding() {
  const [visibleBoardings, setVisibleBoardings] = useState<IonBoarding[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (visibleBoardings.length < onBoarding.length) {
        setVisibleBoardings((prev) => [
          ...prev,
          onBoarding[visibleBoardings.length],
        ]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [visibleBoardings.length]);

  return (
    <div className="">
      <div className="flex justify-between px-8 py-7 items-center">
        <div>
          <Image src={MainIcon} alt="MainIcon" />
        </div>
        <div className="flex space-x-4">
          <Link
            href="/"
            className="border-[1px] border-black flex justify-center text-[16px] px-5 py-2 font-['SUIT']"
          >
            <p className="font-['SUIT'] font-medium">GO TO MAIN PAGE</p>
          </Link>
          <Link
            href="/login"
            className="border-[1px] border-black flex justify-center text-[16px] px-5 py-2 "
          >
            <p className="font-['SUIT'] font-medium">LOG-IN</p>
          </Link>
        </div>
      </div>
      <div className="flex justify-center h-11 text-[14px] ">
        <p className="w-[35%] border-[1px] border-black flex justify-start py-2.5 pl-8 font-['SUIT'] font-semibold">
          INDEX
        </p>
        <p className="w-[30%] border-[1px] border-black text-center py-2.5 font-['SUIT'] font-semibold">
          SPARK: ERICA DESIGN ARCHIVING
        </p>
        <div className="w-[35%] border-[1px] border-black text-white bg-black py-2.5 overflow-hidden whitespace-nowrap relative">
          <p className="inline-block px-full relative animate-marquee font-['Pretendard'] font-normal">
            2023학년도 개강을 맞아 여러분들의 발전을 위해 아카이빙 사이트를
            오픈했습니다. 스파크 많이 활용해주세요
          </p>
        </div>
      </div>
      {/*온보딩 영상*/}
      <div className="relative">
        {visibleBoardings.map((item, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              top: `${item.top}px`,
              left: `${item.left}px`,
            }}
          >
            {item.src?.includes(".mp4") ? (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                style={{
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                }}
              />
            ) : (
              <Image
                src={item.src}
                alt={"onBoardingImage"}
                width={item.width}
                height={item.height}
              />
            )}
          </div>
        ))}
        {/*/!*두번째*!/*/}
        {/*{visibleDivs[0] && (*/}
        {/*  <div className="absolute top-[5em] left-52 z-[2px]">*/}
        {/*    <Image*/}
        {/*      src={onBoardingImages[1]}*/}
        {/*      alt={"onBoardingImage"}*/}
        {/*      width={1447}*/}
        {/*      height={721}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}
        {/*/!*  세번째*!/*/}
        {/*{visibleDivs[1] && (*/}
        {/*  <div className="absolute bg-pink-500 w-[500px] h-[500px] top-[15em] left-[30em] z-[3px]" />*/}
        {/*)}*/}
        {/*/!*네번째*!/*/}
        {/*{visibleDivs[2] && (*/}
        {/*  <div className="absolute bg-yellow-500 w-[993px] h-[421px] top-[20em] left-96 z-[4px]" />*/}
        {/*)}*/}
        {/*/!*다섯번째*!/*/}
        {/*{visibleDivs[3] && (*/}
        {/*  <div className="absolute bg-green-500 w-[1051px] h-[590px] top-[20em] left-96 z-[5px]" />*/}
        {/*)}*/}
        {/*/!*여섯번째*!/*/}
        {/*{visibleDivs[4] && (*/}
        {/*  <div className="absolute bg-blue-500 w-[492px] h-[873px] top-[16em] left-[65em] z-[6px]" />*/}
        {/*)}*/}
        {/*/!*일곱번재*!/*/}
        {/*{visibleDivs[5] && (*/}
        {/*  <div className="absolute bg-black w-[1129px] h-[648px] top-[30em] left-[10em] z-[7px]" />*/}
        {/*)}*/}
        {/*/!*여덟번째*!/*/}
        {/*{visibleDivs[6] && (*/}
        {/*  <div className="absolute bg-purple-500 w-[1024px] h-[574px] top-[30em] left-[10em] z-[8px]" />*/}
        {/*)}*/}
        {/*/!*  아홉번째*!/*/}
        {/*{visibleDivs[7] && (*/}
        {/*  <div className="absolute bg-purple-500 w-[1024px] h-[574px] top-[30em] left-[10em] z-[9px]" />*/}
        {/*)}*/}
        {/*/!*  열번째*!/*/}
        {/*{visibleDivs[8] && (*/}
        {/*  <div className="absolute bg-gray-500 w-[685px] h-[616px] top-[3em] left-[50em] z-[10px]" />*/}
        {/*)}*/}
      </div>
    </div>
  );
}

export default DesktopOnBoarding;
