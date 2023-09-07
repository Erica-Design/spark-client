import React, { useState } from "react";
import Image from "next/image";
import ImageIcon from "../../../../client/src/app/icons/imageIcon.svg";
import FileIcon from "../../../../client/src/app/icons/fileIcon.svg";
import VideoIcon from "../../../../client/src/app/icons/videoIcon.svg";

function Upload() {
  const [imageName, setImageName] = useState("");
  const [imageSize, setImageSize] = useState(0);

  const handleImageInputChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      setImageSize(file.size);
    }
  };

  const formatBytes = (bytes: any, decimals: number = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const imageUpload = (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageInputChange}
        style={{ display: "none" }}
        id="imageUploadInput"
      />
      {imageName && imageSize ? (
        <div className="flex justify-between border-[1px] border-b-black border-x-black px-5 py-2 text-[12px]">
          <p>{imageName}</p>
          <p>{formatBytes(imageSize)}</p>
        </div>
      ) : null}
    </>
  );

  return (
    <div>
      <div
        className={`${imageName === "" ? "block" : "hidden"} flex space-x-10`}
      >
        <div
          onClick={() => {
            const imageUploadInput =
              document.getElementById("imageUploadInput");
            if (imageUploadInput) {
              imageUploadInput.click();
            }
          }}
          className="space-y-3 cursor-pointer"
        >
          <Image src={ImageIcon} alt="ImageIcon" width={106} height={106} />
          <p className="text-center">{imageName || "이미지"}</p>
        </div>
        <div className="space-y-3 cursor-pointer">
          <Image src={VideoIcon} alt="ImageIcon" width={106} height={106} />
          <p className="text-center">동영상 링크</p>
        </div>
        <div className="space-y-3 cursor-pointer">
          <Image src={FileIcon} alt="ImageIcon" width={106} height={106} />
          <p className="text-center">파일 업로드</p>
        </div>
      </div>
      <div className={`${imageName === "" ? "hidden" : "block"} `}>
        <div className="flex justify-between w-[85em] border-[1px] border-black px-5 py-2 bg-[#F0F0F0] text-[#737373] text-[12px] ">
          <p>파일명</p>
          <p>용량</p>
        </div>
        {imageUpload}
      </div>
    </div>
  );
}

export default Upload;
