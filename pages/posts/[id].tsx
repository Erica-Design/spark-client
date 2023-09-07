import MobileFooter from "@components/mobile/footer";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import getPostDetail from "@services/posting/get/getPostDetail";
import useUser from "@hooks/useUser";
import deleteScrap from "@services/posting/delete/deleteScrap";
import createScrap from "@services/posting/post/createScrap";
import Image from "next/image";
import { calculateSize } from "@utils/imageSize";
import { useRouter } from "next/router";
import { Post } from "@utils/types";

export default function MobilePostPage() {
  const user = useUser();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false); // New state for bookmark status
  const [data, setData] = useState<Post | null>(null);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (router.query && router.query.id) {
      getPostDetail(+router.query.id).then((response) => {
        setData(response);
        setIsBookmarked(response.scraped);
        setId(Number(router.query.id));
      });
    }
  }, [router.query]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight - 450) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const modalRef = useRef(null);

  useEffect(() => {
    let timer: any;

    if (showModal) {
      timer = setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showModal]);

  const toggleBookmark = () => {
    if (user) {
      if (isBookmarked) {
        deleteScrap(+id).then(() => {
          setIsBookmarked(false);
        });
      } else {
        createScrap(+id).then(() => {
          setIsBookmarked(true);
        });

        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      }
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <div className="px-5 py-6">
          <div className="flex">
            <h1 className="text-[1.13rem] font-['Pretendard'] font-bold tracking-[140%]">
              {data?.title}
            </h1>
            <div className="flex items-center space-x-2 cursor-pointer ml-auto">
              <div className="" onClick={toggleBookmark}>
                <svg
                  className={`${isBookmarked ? "fill-black" : "fill-white"
                    } w-[26px] h-[26px]`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <rect width="24" height="24" fill="white" />
                  <path
                    d="M15.1515 18.1818L9.69698 13.973L4.24243 18.1818V4.71378C4.24243 4.26728 4.40662 3.83908 4.69889 3.52336C4.99115 3.20764 5.38755 3.03027 5.80087 3.03027H13.5931C14.0064 3.03027 14.4028 3.20764 14.6951 3.52336C14.9873 3.83908 15.1515 4.26728 15.1515 4.71378V18.1818Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1 py-1 text-[16px] w-auto">
              <p className="flex justify-center border border-black items-center w-[18px] h-[18px] gap-[6px] text-[10px] font-bold tracking-wider leading-[140%]">
                {data?.author.departmentCode}
              </p>
              <Link href={`/users/${data?.author.id}`} className="font-medium font-['Pretendard'] text-[13px]">
                {data?.author?.username}({data?.author?.shortStudentNumber})
              </Link>
            </div>
            <div className="max-w-md mx-auto mt-[10px] flex">
              {data?.categories.map((category, index) => (
                <p
                  key={index}
                  className="text-[10px] bg-[#F0F0F0] font-medium mr-1 w-fit text-center truncate text-[#656565] px-1 py-0.5 font-['SUIT']"
                >
                  {category}
                </p>
              ))}
            </div>
          </div>
          {showModal ? (
            <div className="fixed bottom-10 right-0 px-3 w-full z-20 transition-all duration-300">
              <div className="w-full h-11 flex text-center justify-center bg-black border border-black rounded-[100px] shadow-md text-[13px] text-white font-bold font-['Pretendard'] gap-2 self-center items-center transition-all duration-[2000ms] opacity-100">
                {isBookmarked
                  ? "북마크 되었습니다!"
                  : "북마크가 취소되었습니다!"}
              </div>
            </div>
          ) : (
            <div className="fixed bottom-10 right-0 px-3 w-full z-20 transition-all duration-300">
              <div className="w-full h-11 flex text-center justify-center bg-black border border-black rounded-[100px] shadow-md text-[13px] text-white font-bold font-['Pretendard'] gap-2 self-center items-center transition-all duration-[2000ms] opacity-0">
                {isBookmarked
                  ? "북마크 되었습니다!"
                  : "북마크가 취소되었습니다!"}
              </div>
            </div>
          )}
          {isVisible && (
            <div className="fixed w-[500px] left-[-35px] h-20 bottom-[-30px] bg-white blur-lg flex-shrink-0" />
          )}
        </div>
        {/* ... */}
      </div>
      <div className="w-full px-5">
        <div className="flex flex-wrap border border-black justify-center space-y-10 py-[34px]">
          {data?.images.map((post, index) => {
            const { width, height } = calculateSize(post.url);
            return (
              <div
                key={index}
                className="relative w-full px-2"
                style={{
                  aspectRatio: `${width}/${height}`,
                }}
              >
                <Image
                  src={post.url}
                  alt="이미지 파일"
                  fill
                  priority
                  className="h-full"
                />
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap border border-black p-1 my-3">
          <div className="flex ml-1">
            <svg
              className="self-center"
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M2.83334 2.83301H14.1667C14.9458 2.83301 15.5833 3.47051 15.5833 4.24967V12.7497C15.5833 13.5288 14.9458 14.1663 14.1667 14.1663H2.83334C2.05417 14.1663 1.41667 13.5288 1.41667 12.7497V4.24967C1.41667 3.47051 2.05417 2.83301 2.83334 2.83301Z"
                fill="white"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.5833 4.25L8.50001 9.20833L1.41667 4.25"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-1 font-['SUIT'] text-[0.75rem] self-center">
              { }
            </span>
          </div>
          <div className="flex ml-3">
            <svg
              className="self-center "
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <g clipPath="url(#clip0_727_2552)">
                <path
                  d="M12.0417 1.41699H4.95832C3.00231 1.41699 1.41666 3.00265 1.41666 4.95866V12.042C1.41666 13.998 3.00231 15.5837 4.95832 15.5837H12.0417C13.9977 15.5837 15.5833 13.998 15.5833 12.042V4.95866C15.5833 3.00265 13.9977 1.41699 12.0417 1.41699Z"
                  fill="white"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.3333 8.05348C11.4207 8.64298 11.32 9.24504 11.0456 9.77403C10.7711 10.303 10.3368 10.732 9.80447 10.9999C9.27214 11.2678 8.66889 11.3611 8.0805 11.2664C7.49212 11.1717 6.94857 10.894 6.52716 10.4725C6.10576 10.0511 5.82796 9.50759 5.73328 8.91921C5.6386 8.33082 5.73187 7.72757 5.9998 7.19524C6.26774 6.66291 6.6967 6.22862 7.22568 5.95415C7.75467 5.67967 8.35673 5.57898 8.94624 5.66639C9.54756 5.75556 10.1043 6.03576 10.5341 6.46561C10.9639 6.89546 11.2442 7.45215 11.3333 8.05348Z"
                  fill="white"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.3958 4.60449H12.4021"
                  stroke="#747474"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_727_2552">
                  <rect width="17" height="17" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="ml-1 font-['SUIT'] text-[0.75rem] self-center">
              @d1t1dus
            </span>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}
