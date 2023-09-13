import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getCategory from "@services/category/get/getCategory";
import Image from "next/image";
import ImageIcon from "@icons/imageIcon.svg";
import VideoIcon from "@icons/videoIcon.svg";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableImage from "@components/desktop/upload/draggableImage";
import { useForm } from "react-hook-form";
import AWS from "aws-sdk";
import uploadFiles from "@services/posting/post/uploadFiles";
import { useRouter } from "next/router";

interface UploadForm {
  title: string;
  type: string;
  categories: string[];
  thumbnail: string;
  images: string[];
}

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sidebar = document.querySelector(".sidebar");

      if (sidebar instanceof HTMLElement) {
        const newPosition = scrollY + 45;
        sidebar.style.transform = `translateY(${newPosition}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<UploadForm>({
      defaultValues: {
        type: "personal",
        categories: [],
        images: [],
      },
    });

  const { type: selectedType, categories: selectedCategories } = watch();

  const handleCategories = (category: string) => {
    if (selectedCategories.includes(category)) {
      setValue<keyof UploadForm>(
        "categories",
        selectedCategories.filter((item) => item !== category),
      );
    } else {
      setValue<keyof UploadForm>("categories", [
        ...selectedCategories,
        category,
      ]);
    }
  };
  const { data: categories, isLoading: categoryLoading } = useQuery<string[]>(
    ["categories"],
    getCategory,
  );

  useEffect(() => {
    if (categories) {
      const accessToken =
        typeof window !== "undefined" && localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/");
      }
    }
  }, [categories]);

  const [thumbnailLink, setThumbnailLink] = useState<string>("");
  const [imageLink, setImageLink] = useState<string[]>([]);

  const handleThumbnailImageInput = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const file = event.target?.files[0];

      const REGION = "ap-southeast-2";
      const ACCESS_KEY_ID = "AKIAZVJPQQN5QMVPCCB5";
      const SECRET_KEY_ID = "m2qwWPl+aczNx6C4mBqpWgHVs4a7ZxHLxkOvk7Qu";

      AWS.config.update({
        region: REGION,
        credentials: new AWS.Credentials({
          accessKeyId: ACCESS_KEY_ID ?? "",
          secretAccessKey: SECRET_KEY_ID ?? "",
        }),
      });

      const upload = new AWS.S3.ManagedUpload({
        params: {
          ACL: "public-read",
          Bucket: "spark-media",
          Key: "thumbnail/" + guid(),
          Body: file,
          ContentType: file.type,
        },
      });
      const promise = await upload.promise();
      setThumbnailLink(promise?.Location || "");
    }
  };

  function guid() {
    function _s4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (
      _s4() +
      _s4() +
      "-" +
      _s4() +
      "-" +
      _s4() +
      "-" +
      _s4() +
      "-" +
      _s4() +
      _s4() +
      _s4()
    );
  }

  const handleImageInputs = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const files = event.target.files;
      const REGION = "ap-southeast-2";
      const ACCESS_KEY_ID = "AKIAZVJPQQN5QMVPCCB5";
      const SECRET_KEY_ID = "m2qwWPl+aczNx6C4mBqpWgHVs4a7ZxHLxkOvk7Qu";

      AWS.config.update({
        region: REGION,
        credentials: new AWS.Credentials({
          accessKeyId: ACCESS_KEY_ID ?? "",
          secretAccessKey: SECRET_KEY_ID ?? "",
        }),
      });
      const filesArray = Array.from(files);

      const uploadPromises = filesArray.map(async (file) => {
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: "spark-media",
            Key: "images/" + guid(),
            Body: file,
            ContentType: file.type,
          },
        });

        try {
          const promise = await upload.promise();
          return promise.Location;
        } catch (error) {
          throw error;
        }
      });

      try {
        const uploadedFileUrls = await Promise.all(uploadPromises);
        setImageLink((prevImageLink) => [
          ...prevImageLink,
          ...uploadedFileUrls,
        ]);
      } catch (error) {}
    }
  };

  const moveItem = (from: any, to: any) => {
    setImageLink((prevFiles) => {
      const newFiles = Array.from(prevFiles);
      newFiles.splice(to, 0, newFiles.splice(from, 1)[0]);
      return newFiles;
    });
  };
  const [showVideoInput, setShowVideoInput] = useState(false);

  const handleImageDelete = (indexToDelete: number) => {
    setImageLink((prevImageLink) => {
      const updatedImageLink = [...prevImageLink];
      updatedImageLink.splice(indexToDelete, 1);
      return updatedImageLink;
    });
  };

  const imageUpload = (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageInputs}
        style={{ display: "none" }}
        id="imageUploadInput"
        multiple
      />
      <div className="flex-row justify-center ">
        <DndProvider backend={HTML5Backend}>
          {imageLink.map((imageLink, index) => (
            <>
              <div
                onClick={() => handleImageDelete(index)}
                className="flex justify-center border border-2 cursor-pointer"
              >
                <p>삭제</p>
              </div>
              <DraggableImage
                key={index}
                imageLink={imageLink}
                index={index}
                moveItem={moveItem}
              />
            </>
          ))}
        </DndProvider>
      </div>
    </>
  );

  const [scrollY, setScrollY] = useState(0);

  const onSubmit = (data: UploadForm) => {
    uploadFiles(
      data.title,
      data.type,
      thumbnailLink,
      data.categories,
      imageLink,
    )
      .then((res) => {
        if (res?.status === 201) {
          alert("정상적으로 업로드가 완료되었습니다!");
          setValue<keyof UploadForm>("title", "");
          setValue<keyof UploadForm>("type", "");
          setValue<keyof UploadForm>("categories", "");
          setThumbnailLink("");
          setImageLink([]);
          router.push("/");
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <form
      className="w-full h-screen absolute right-0 top-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[70%] h-12 border-2 border-black flex mx-auto">
        <span className="w-10 font-['Pretendard'] text-[1rem] font-bold items-center self-center mx-3">
          제목
        </span>
        <input
          {...register<keyof UploadForm>("title")}
          className="w-[38rem] h-7 justify-center border-none placeholder:text-[#585858] font-medium outline-none bg-[#f0f0f0] font-['Pretendard'] text-[0.9rem] pl-3 self-center"
          type="text"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="w-[70%] h-12 mt-3 border-2 border-black flex mx-auto">
        <span className="w-10 font-['Pretendard'] text-[1rem] font-bold self-center mx-3">
          유형
        </span>
        <label
          key="personal"
          htmlFor="personal"
          className="flex flex-row items-center cursor-pointer"
        >
          <input
            id="personal"
            className="w-4 h-4 accent-black ml-3"
            type="checkbox"
            checked={selectedType === "personal"}
            onClick={() => setValue<keyof UploadForm>("type", "personal")}
          />
          <span
            className={`font-['SUIT'] text-[0.75rem] font-medium ml-3 border border-black p-1 h-7 ${
              selectedType === "personal"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setValue<keyof UploadForm>("type", "personal")}
          >
            PERSONAL PROJECT
          </span>
        </label>
        <label
          key="team"
          htmlFor="team"
          className="flex flex-row items-center cursor-pointer"
        >
          <input
            id="team"
            className="w-4 h-4 accent-black ml-3"
            type="checkbox"
            checked={selectedType === "team"}
            onClick={() => setValue<keyof UploadForm>("type", "team")}
          />
          <span
            className={`font-['SUIT'] text-[0.75rem] font-medium ml-3 border border-black p-1 h-7 ${
              selectedType === "team"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setValue<keyof UploadForm>("type", "team")}
          >
            TEAM PROJECT
          </span>
        </label>
      </div>
      <div className="w-[70%] h-36 mt-3 border-2 border-black mx-auto">
        <div className="flex">
          <span className="w-14 h-10 m-2 font-['Pretendard'] text-[1rem] font-bold self-center mx-3">
            카테고리
          </span>
          <span className="text-[#737373] font-['Pretendard'] text-[0.75rem] font-normal self-center mt-[-1rem]">
            *중복선택 가능
          </span>
        </div>
        <div className="flex flex-wrap mt-[-1.5rem]">
          {categories?.map((category, index) => (
            <div
              key={index}
              className={`font-['SUIT'] text-[0.75rem] font-medium h-7 text-center p-1 ml-3 mt-3 cursor-pointer ${
                selectedCategories.includes(category)
                  ? "bg-black text-white"
                  : "bg-[#F0F0F0]"
              }`}
              onClick={() => handleCategories(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[70%] min-h-96 h-auto mt-3 border-2 border-black mx-auto overflow-y-auto pb-10">
        <div className="flex">
          <span className="m-2 font-['Pretendard'] text-[1rem] font-bold self-center mx-3">
            콘텐츠 업로드
          </span>
        </div>
        <div>
          <div
            className={`${
              imageLink.length === 0 ? "flex" : "flex-row"
            } m-auto  justify-center`}
          >
            <div
              className={`${
                imageLink.length === 0 ? "" : "hidden"
              } flex space-x-10 mt-24`}
            >
              <div
                onClick={() => {
                  const input = document.getElementById("imageUploadInput");
                  if (input) {
                    input.click();
                  }
                }}
                className="space-y-3 cursor-pointer"
              >
                <Image
                  src={ImageIcon}
                  alt="ImageIcon"
                  width={106}
                  height={106}
                />
                <p className="text-center font-['Pretendard'] font-medium">
                  이미지 및 파일
                </p>
              </div>
              <div
                onClick={() => setShowVideoInput(!showVideoInput)}
                className="space-y-3 cursor-pointer"
              >
                <Image
                  src={VideoIcon}
                  alt="ImageIcon"
                  width={106}
                  height={106}
                />
                <p className="text-center font-['Pretendard'] font-medium">
                  동영상 링크
                </p>
              </div>
            </div>
            {imageUpload}
          </div>
          {showVideoInput && (
            <div className="flex justify-center pt-16 pb-10">
              <input
                className=" w-[85em] border-[1px] border-black px-5 py-2 text-[12px] font-['Pretendard']"
                type="text"
                placeholder="동영상 링크를 입력하세요"
                onBlur={(e) => {
                  setImageLink([...imageLink, e.target.value]);
                  setShowVideoInput(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-[70%] h-44 mt-3 border-2 border-black mx-auto overflow-y-auto">
        <div className="flex pb-5">
          <span className="m-2 font-['Pretendard'] text-[1rem] font-bold self-center mx-3">
            썸네일
          </span>
          <span className="font-['Pretendard'] text-[#737373] text-[0.75rem] mt-2.5 font-normal">
            *선택 (370*254비율을 권장합니다.)
          </span>
        </div>
        <div className={`${thumbnailLink ? "hidden" : "block"}`}>
          <label htmlFor="thumbnail" className="w-[50%] mt-3 mx-auto">
            <div className="w-11 h-11 item-center self-center rounded-full border border-black mx-auto">
              <svg
                className="h-11 mx-auto items-center self-center"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 15L16 10L5 21"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="w-full inline-block text-[#656565] text-[0.88rem] font-['Pretendard'] font-medium text-center">
              이미지 추가
            </span>
            <input
              id="thumbnail"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleThumbnailImageInput}
            />
          </label>
        </div>
        <div
          className={`${
            thumbnailLink ? "block" : "hidden"
          } flex justify-center`}
        >
          <Image
            src={thumbnailLink || ""}
            alt="썸네일"
            width={1000}
            height={500}
          />
        </div>
      </div>
      <div className="w-[70%] h-12 mt-3 border-2 border-black flex mx-auto">
        <span className="w-20 pl-3 font-['Pretendard'] text-[#737373] text-[0.75rem] mt-3 font-normal">
          (*선택)
        </span>
        <span className="w-40 font-['Pretendard'] text-[1rem] font-bold items-center self-center mx-3">
          인스타그램
        </span>
        <input
          className="w-full justify-center border-none outline-none font-['Pretendard'] text-[0.9rem]"
          type="text"
          placeholder="인스타그램 아이디를 입력하세요"
        />
      </div>
      <div
        className={`sidebar absolute top-0 right-[2.5%] w-32 h-72 border-2 border-black space-y-2 transition-transform duration-300 transform`}
      >
        <div
          onClick={() => {
            const input = document.getElementById("imageUploadInput");
            if (input) {
              input.click();
            }
          }}
        >
          <div className="w-11 h-11 item-center self-center mx-auto mt-16">
            <Image src={ImageIcon} alt="ImageIcon" />
          </div>
          <span className="w-full inline-block text-[#656565] text-[0.88rem] font-['Pretendard'] font-medium text-center">
            이미지 추가
          </span>
        </div>
        <div onClick={() => setShowVideoInput(!showVideoInput)}>
          <div className="w-11 h-11 item-center self-center mx-auto">
            <Image src={VideoIcon} alt="VideoIcon" />
          </div>
          <span className="w-full inline-block text-[#656565] text-[0.88rem] font-['Pretendard'] font-medium text-center">
            동영상 링크
          </span>
        </div>
        <button
          className={`absolute -bottom-10 -left-[0.15em]
          }rem]  w-32 h-10 border border-black bg-black text-white font-Pretendard text-1rem font-bold transition-transform duration-300 transform`}
        >
          다음
        </button>
      </div>
    </form>
  );
}
