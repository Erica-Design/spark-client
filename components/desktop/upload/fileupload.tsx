import { useState } from 'react';
import { NextPage } from 'next';

const FileUpload: NextPage = () => {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    console.log(uploadedFiles);

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
                    accept="image/*"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                />
                <svg className="h-28 mx-auto items-center self-center" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M27.6667 1H4.33333C2.49238 1 1 2.49238 1 4.33333V27.6667C1 29.5076 2.49238 31 4.33333 31H27.6667C29.5076 31 31 29.5076 31 27.6667V4.33333C31 2.49238 29.5076 1 27.6667 1Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 9.33337V22.6667" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.33301 16H22.6663" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="w-full inline-block text-[#656565] font-['Pretendard'] font-medium text-center mt-3">파일 업로드</span>
            </div>
            <ul>
                {uploadedFiles.map((filename) => (
                    <li key={filename}>{filename}</li>
                ))}
            </ul>
        </div>
    );
};

export default FileUpload;