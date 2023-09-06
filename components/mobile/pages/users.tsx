import { useRouter } from "next/router";
import { IUserDetailData } from "@hooks/useUser";
import { MobilePostWithoutName } from "@components/mobile/PostWithoutName";

interface MobileUserPageProps {
  userData: IUserDetailData | null;
}

export default function MobileUserPage({ userData }: MobileUserPageProps) {
  const router = useRouter();
  if (!userData) return <div></div>;
  return (
    <div>
      <div className="pl-5 pt-5">
        <div className="flex items-center space-x-4">
          <div className="border-2 border-black w-16 h-16 text-[2rem] font-['Pretendard'] font-bold items-center flex justify-center">
            {userData.departmentCode}
          </div>
          <div className="text-2xl font-bold">
            <p className="font-['Pretendard']">{userData.username}</p>
          </div>
        </div>
        <div>
          <div className="flex mt-8">
            <h1 className="font-['Pretendard'] text-[1.13rem] font-bold underline">
              최근 업로드한 작업물
            </h1>
            {userData.posts?.length >= 2 && (
              <a
                href="/recent"
                className="ml-auto flex font-['SUIT'] text-[11px] self-end mr-3"
              >
                더보기
                <svg
                  className="mt-[2.6px] ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="11"
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M1 9L5 4.86207L1 1"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
          {userData.posts?.length === 0 ? (
            <div className="h-32">
              <p className="text-center self-center items-center font-['SUIT'] text-[13px] mt-20">
                최근 업로드한 작업물이 없습니다.
              </p>
            </div>
          ) : (
            <div className="max-w-5xl m-auto space-x-2 mt-3 flex overflow-x-scroll mypage">
              {userData.posts?.map((post, index) => {
                return <MobilePostWithoutName post={post} key={index} />;
              })}
            </div>
          )}
          <div className="flex mt-8">
            <h1 className="font-['Pretendard'] text-[1.13rem] font-bold underline">
              북마크한 작업물
            </h1>
            {userData.scrapPosts?.length >= 2 && (
              <a
                href="/bookmark"
                className="ml-auto flex font-['SUIT'] text-[11px] self-end mr-3"
              >
                더보기
                <svg
                  className="mt-0.5 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="11"
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M1 9L5 4.86207L1 1"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
          {userData.scrapPosts?.length === 0 ? (
            <div>
              <p className="text-center self-center items-center font-['SUIT'] text-[13px] mt-20">
                최근 북마크한 작업물이 없습니다.
              </p>
            </div>
          ) : (
            <div className="max-w-5xl m-auto space-x-2 mt-3 flex">
              {userData.scrapPosts?.map((post, index) => {
                return <MobilePostWithoutName post={post} key={index} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
