import Image from "next/image";
import SparkStorySvg from "../../../icons/spark.svg";
import Link from "next/link";

export default function DesktopSparkStory() {
  return (
    <div>
      <div className="w-full h-[3800px] bg-black">
        <div className="flex">
          <div>
            <div className="flex justify-between w-44 pt-7 pl-4 pr-3 pb-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.1982 12L6.19824 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                  <path
                    d="M12 19.0002L5 12.0002L12 5.00024"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
              <div>
                <Link
                  href="/"
                  className="font-['Pretendard'] font-bold text-[1rem] text-white"
                >
                  홈 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute max-w-7xl top-[17rem] left-[17%] leading-[53.6px]">
          <Image src={SparkStorySvg} alt="이미지파일" width={286} height={92} />
          <div>
            <h1 className="bg-[#34FB14] text-black text-[30px] font-['SUIT'] font-bold underline px-6 py-1 mt-4 mb-6 w-fit leading-[39px]">
              SPARK; 학생들의 자발적인 움직임이 모여 스파크를 만들다.
            </h1>
            <span className="text-white font-['SUIT'] text-[40px] font-normal tracking-[-3.2px]">
              <span className="font-semibold">‘SPARK’</span>는,
              <span className="font-semibold">
                ‘Spontaneous(자발적인)Archive(아카이브)’
              </span>
              의 약자로 한양대학교 ERICA 디자인대학 재학생들의 디자인 작업물들을
              한 데 모아 스파크처럼 튀는 학생들의 영감과, 밝게 빛나는 예비
              디자이너들의 작업물을 상호 공유하고, 대외적으로 홍보하는 효과를
              지닌 작업물 아카이빙 웹사이트입니다. <br />
              <br />
              <span className="font-semibold">SPARK</span>는 한양대학교 ERICA
              재학생들이 자발적으로 기획 및 제작한 디자인 교류의 장이며, ‘ERICA
              디자인’의 아이콘이 되기를 기대합니다.
            </span>
          </div>
          <div>
            <h1 className="bg-white text-black text-[30px] font-['SUIT'] font-bold underline px-6 py-1 mt-80 mb-6 w-fit leading-[39px]">
              빛나는 디자인 in SPARK
            </h1>
            <span className="text-white font-['SUIT'] text-[40px] font-normal tracking-[-0.8px]">
              창의성과 독창성이 넘치는 디자인 작품들을 모아 SPARK에서 빛나게
              합니다. 디자인을 사랑하는 학생들의 자발적인 참여로 만들어진
              플랫폼으로, 여러분들의 스파크처럼 튀는 아이디어와 작품들을 공유할
              수 있습니다.
            </span>
          </div>
          <div>
            <h1 className="bg-white text-black text-[30px] font-['SUIT'] font-bold underline px-6 py-1 mt-80 mb-6 w-fit leading-[39px]">
              열정과 비전의 전도체, SPARK
            </h1>
            <span className="text-white font-['SUIT'] text-[40px] font-normal tracking-[-0.8px]">
              <span className="font-semibold">SPARK</span>는 단순한 아카이빙
              공간을 넘어섭니다. 디자인에 대한 열정과 아이디어를 공유하며, 다른
              재학생 예비 디자이너들과 소통하여 성장할 수 있는 곳입니다.
            </span>
          </div>
          <div className="mt-5">
            <span className="font-bold text-white font-['SUIT'] text-[40px] tracking-[-0.8px]">
              SPARK는 여러분의 디자인 포트폴리오를 손쉽게 저장하고 관리할 수
              있는 편리한 도구입니다. 자유로운 작업물 업로드와 관리로, 여러분의
              디자인 능력을 아름답게 보여주세요.
            </span>
          </div>
          <div>
            <h1 className="bg-white text-black text-[30px] font-['SUIT'] font-bold underline px-6 py-1 mt-[540px] mb-10 w-fit">
              @함께한 사람들
            </h1>
            <span className="text-white font-['SUIT'] text-[40px] font-normal tracking-[-0.8px]">
              <span className="font-semibold">[기획/브랜딩]</span> 한양대학교
              ERICA 디자인대학 제36대 학생회 ‘영감’ <br />
              <span className="font-semibold">[웹/모바일 디자인]</span>{" "}
              커뮤니케이션디자인학과 21 이시연
              <br />
              <span className="font-semibold">[영상디자인]</span> 영상디자인학과
              21 이선민
              <br /> <span className="font-semibold">[백엔드 개발자]</span>{" "}
              컴퓨터학부 18 민준수 / 컴퓨터학부 18 김민재 <br />
              <span className="font-semibold">[프론트엔드 개발자]</span>{" "}
              컴퓨터학부 18 박재현 / 컴퓨터학부 21 김준휘 <br />
            </span>
          </div>
          <div className="mt-80 leading-[40.2px]">
            <span className="text-white font-['SUIT'] text-[30px] font-normal tracking-[-0.6px] underline underline-offset-4">
              우리는 여러분의 디자인 작업물이 스파크처럼 빛나기를 기대합니다.
              <br />
              자유로운 창작과 자발적인 참여로, 여러분의 디자인을 SPARK와 함께
              빛내보세요!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
