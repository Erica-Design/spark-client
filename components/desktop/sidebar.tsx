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
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.832 10L5.16536 10"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="square"
            />
            <path
              d="M10 15.8333L4.16667 9.99992L10 4.16658"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
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
      <div className="flex justify-between w-48 border-b-[2px] border-black my-0.5 py-1 ">
        <Link
          href="/sparkStory"
          className="font-['Pretendard'] font-bold text-[1rem] w-full flex flex-row justify-between"
        >
          <span>SPARK 스토리</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="square"
            />
            <path
              d="M12 5L19 12L12 19"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        </Link>
      </div>
      <div className="flex justify-between w-48 border-b-[2px] border-black py-1">
        <div>
          <p className="font-['Pretendard'] font-bold">2023 SPARK 매거진</p>
        </div>
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="square"
            />
            <path
              d="M12 5L19 12L12 19"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
