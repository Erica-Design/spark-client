"use client";

import Link from "next/link";
import OnBoardLogo from "../../../icons/onboardLogo.svg";
import SparkClose from "../../../icons/mobilesparkclose.svg";
import Image from "next/image";

export default function MobileSparkStory() {
  return (
    <div className="bg-black">
      <div className="flex px-[14px] pt-8 w-full">
        <Image src={OnBoardLogo} alt="로고" />
        <div className="text-white">
          <h1 className="font-['SUIT'] font-normal text-[0.56rem] mt-1">
            SPARK:
          </h1>
          <h1 className="font-['SUIT'] font-bold text-[0.56rem] mt-[-0.3rem] flex">
            <span className="font-normal mr-1">ERICA DESIGN</span> ARCHIVING
          </h1>
        </div>
        <Link href="/onBoarding" className="ml-auto">
          <Image src={SparkClose} alt="닫기" />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center p-4 pt-5">
        <div className="w-full text-white p-[10px]">
          <h1 className="bg-[#34FB14] text-black p-2 items-center gap-2 underline font-['Pretendard'] text-[1rem] font-medium">
            SPARK; 학생들의 자발적인 움직임이 모여
            <br />
            스파크를 만들다.
          </h1>
          <span className="font-['SUIT'] text-[12px] text-justify font-normal">
            <span className="font-semibold">
              ‘SPARK’는,‘Spontaneous(자발적인)Archive(아카이브)’
            </span>
            의 약자로 한양대학교 ERICA 디자인대학 재학생들의 디자인 작업물들을
            한 데 모아 스파크처럼 튀는 학생들의 영감과, 밝게 빛나는 예비
            디자이너들의 작업물을 상호 공유하고, 대외적으로 홍보하는 효과를 지닌
            작업물 아카이빙 웹사이트입니다.
            <br />
            <br />
            <span className="font-semibold">SPARK</span>는 한양대학교 ERICA
            재학생들이 자발적으로 기획 및 제작한 디자인 교류의 장이며, ‘ERICA
            디자인’의 아이콘이 되기를 기대합니다.
          </span>
        </div>
        <div className="w-full text-white p-[10px]">
          <h1 className="bg-white text-black p-2 items-center gap-2 underline text-[1rem] font-medium">
            빛나는 디자인 in SPARK
          </h1>
          <span className="font-['SUIT'] text-[12px] text-justify font-normal">
            창의성과 독창성이 넘치는 디자인 작품들을 모아 SPARK에서 빛나게
            합니다.디자인을 사랑하는 학생들의 자발적인 참여로 만들어진
            플랫폼으로, 여러분들의 스파크처럼 튀는 아이디어와 작품들을 공유할 수
            있습니다.
          </span>
        </div>
        <div className="w-full text-white p-[10px]">
          <h1 className="bg-white text-black p-2 items-center gap-2 underline font-['Pretendard'] text-[1rem] font-medium">
            열정과 비전의 전도체, SPARK
          </h1>
          <span className="font-['SUIT'] text-[12px] text-justify font-normal">
            SPARK는 단순한 아카이빙 공간을 넘어섭니다. 디자인에 대한 열정과
            아이디어를 공유하며, 다른 재학생 예비 디자이너들과 소통하여 성장할
            수 있는 곳입니다.
          </span>
        </div>
        <div className="w-full text-white p-[10px]">
          <h1 className="bg-white text-black p-2 items-center gap-2 underline font-['Pretendard'] text-[1rem] font-medium">
            튀어오르는 영감, SPARK
          </h1>
          <span className="font-['SUIT'] text-[12px] text-justify font-normal">
            SPARK는 여러분의 디자인 포트폴리오를 손쉽게 저장하고 관리할 수 있는
            편리한 도구입니다. 자유로운 작업물 업로드와 관리로, 여러분의 디자인
            능력을 아름답게 보여주세요.
          </span>
        </div>
        <div className="w-full text-white p-[10px]">
          <h1 className="bg-white text-black p-2 items-center gap-2 underline font-['Pretendard'] text-[1rem] font-medium">
            @함께한 사람들
          </h1>
          <span className="font-['SUIT'] text-[12px] text-justify font-normal">
            <span className="font-semibold">[기획/브랜딩]</span> 한양대학교
            ERICA 디자인대학 제36대 학생회 ‘영감’
            <br />
            <span className="font-semibold">[웹/모바일 디자인]</span>{" "}
            커뮤니케이션디자인학과 21 이시연 <br />
            <span className="font-semibold">[영상 디자인]</span> 영상디자인학과
            21 이선민 <br />
            <span className="font-semibold">[백엔드 개발자]</span> 컴퓨터학부 18
            민준수 / 컴퓨터학부 18 김민재
            <br />
            <span className="font-semibold">[프론트엔드 개발자]</span>{" "}
            컴퓨터학부 18 박재현 / 컴퓨터학부 21 김준휘
            <br />
          </span>
        </div>
        <div className="w-full text-white px-[10px] py-16 mb-48">
          <span className="font-['SUIT'] font-normal text-[14px]">
            우리는 여러분의 디자인 작업물이 스파크처럼 빛나기를 기대합니다.
            자유로운 창작과 자발적인 참여로, 여러분의 디자인을 SPARK와 함께
            빛내보세요!
          </span>
        </div>
      </div>
      <div className="w-full h-auto text-white bg-[#1f1f1f] ">
        <div className="text-white font-['SUIT'] pt-[34px] px-5">
          <p className="text-[13px] font-semibold">
            HANYANG UNIVERSITY ERICA <br /> COLLEGE OF DESIGN | 포트폴리오
            웹사이트
          </p>
          <br />
          <div className="font-normal">
            <p className="text-[11px]">
              SPARK spontaneous archive
              <br />
              소재지 : 15588 경기도 안산시 상록구 한양대학로(사동) 디자인교육관
              1층 학생회실
              <br />
              <br />
              M: 010-4686-9964 / Email: rlaghdwns160@naver.com <br />
              M: 010-4999-9760 / Email: wepush31@naver.com
            </p>
            <p className="text-[11px]">
              <br />
              책임자 김홍준, 임형준 <br />
              관리자 제36대 디자인대학 학생회 `영감` <br />
              담당자 제36대 디자인대학 학생회 `영감` <br />
            </p>
          </div>
          <br />
          <br />
          <br />
          <p className="text-[11px] font-semibold leading-[136%]">
            스파크는 디자인대학의 포트폴리오 웹사이트 입니다. 무단 도용 및
            배포는 금지됩니다.
          </p>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
