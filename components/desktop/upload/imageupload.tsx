import { useState } from 'react';
import { NextPage } from 'next';

const ImageUpload: NextPage = () => {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const form = new FormData();
            form.append('file', fileInput.files[0]);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: form,
                });

                if (response.ok) {
                    const data = await response.json();
                    setUploadedFiles((prevFiles) => [...prevFiles, data.filename]);
                } else {
                    console.error('Failed to upload file.');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleUploadButtonClick = () => {
        // Programmatically trigger the file input click event
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <div className='item-center self-center'>
            <div className="w-28 h-28 item-center self-center rounded-full border border-black mx-auto cursor-pointer" onClick={handleUploadButtonClick}>
                <input
                    id="fileInput"
                    accept='image/*'
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                />
                <svg className='h-28 mx-auto items-center self-center' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M31.6667 5H8.33333C6.49238 5 5 6.49238 5 8.33333V31.6667C5 33.5076 6.49238 35 8.33333 35H31.6667C33.5076 35 35 33.5076 35 31.6667V8.33333C35 6.49238 33.5076 5 31.6667 5Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.167 16.6665C15.5477 16.6665 16.667 15.5472 16.667 14.1665C16.667 12.7858 15.5477 11.6665 14.167 11.6665C12.7863 11.6665 11.667 12.7858 11.667 14.1665C11.667 15.5472 12.7863 16.6665 14.167 16.6665Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M34.9997 24.9998L26.6663 16.6665L8.33301 34.9998" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="w-full inline-block text-[#656565] font-['Pretendard'] font-medium text-center mt-3">이미지</span>
            </div>
            <ul>
                {uploadedFiles.map((filename) => (
                    <li key={filename}>{filename}</li>
                ))}
            </ul>
        </div>
    );
};

export default ImageUpload;