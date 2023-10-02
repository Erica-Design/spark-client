import Image from "next/image";
import ArrowRight from "@icons/arrowRight.svg";
import ArrowLeft from "@icons/arrowLeft.svg";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar() {
  const router = useRouter();
  const id = router?.route;
  console.log("id", id);

  return (
    <div className="py-8">
      <div className="flex justify-between w-48 pl-2 pr-3 pb-4">
        <div>
          <Image
            width={20}
            height={20}
            src={ArrowRight}
            alt="ArrowRight Icon"
          />
        </div>
        <div>
          {id === "/" ? (
            <Link
              href="/onBoarding"
              className="font-['Pretendard'] font-bold text-[1rem]"
            >
              온보딩 다시보기
            </Link>
          ) : (
            <Link
              href="/"
              className="font-['Pretendard'] font-bold text-[1rem]"
            >
              홈으로 돌아가기
            </Link>
          )}
        </div>
      </div>
      <div className="flex justify-between w-48 border-b-[1px] border-black my-0.5 py-1 ">
        <Link
          href="/sparkStory"
          className="font-['Pretendard'] font-bold text-[1rem] w-full flex flex-row justify-between"
        >
          <span>SPARK 스토리</span>
          <Image width={24} height={24} src={ArrowLeft} alt="ArrowLeft Icon" />
        </Link>
      </div>
      <div className="flex justify-between w-48 border-b-[1px] border-black py-1">
        <div>
          <p className="font-['Pretendard'] font-bold">2023 SPARK 매거진</p>
        </div>
        <div>
          <Image width={24} height={24} src={ArrowLeft} alt="ArrowLeft Icon" />
        </div>
      </div>
    </div>
  );
}
