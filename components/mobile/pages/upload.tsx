import { useRouter } from "next/router";
import { IUserDetailData } from "@hooks/useUser";
import { MobilePostWithoutName } from "@components/mobile/PostWithoutName";
import { MobilePostWithoutName2 } from "../PostWithoutName2";

interface MobileUploadPageProps {
    userData: IUserDetailData | null;
}

export default function MobileUploadPage({ userData }: MobileUploadPageProps) {
    const router = useRouter();
    if (!userData) return <div></div>;
    return (
        <div className="w-full">
            <div className="pl-[18px] pt-8">
                <h1 className="font-['Pretendard'] text-[1.25rem] font-bold underline">최근 업로드한 작업물</h1>
            </div>
            <div className="w-full m-auto mt-[18px] flex flex-col pl-[13px] pr-[15px]">
                {userData.posts?.map((post, index) => {
                    return <MobilePostWithoutName2 post={post} key={index} />;
                })}
            </div>
        </div>
    );
}
