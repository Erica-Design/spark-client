import { useState } from 'react';
import { NextPage } from 'next';

const VideoUpload: NextPage = () => {
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
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                />
                <svg className='h-28 mx-auto items-center self-center' xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <path d="M31.9309 9.09484C31.7626 8.4225 31.4198 7.80648 30.9373 7.309C30.4547 6.81151 29.8494 6.45018 29.1825 6.2615C26.7458 5.6665 16.9992 5.6665 16.9992 5.6665C16.9992 5.6665 7.25252 5.6665 4.81585 6.31817C4.14895 6.50685 3.54365 6.86818 3.06109 7.36566C2.57853 7.86315 2.2358 8.47917 2.06752 9.1515C1.62157 11.6244 1.40343 14.1329 1.41585 16.6457C1.39995 19.1773 1.6181 21.705 2.06752 24.1965C2.25304 24.848 2.60345 25.4405 3.08489 25.917C3.56632 26.3935 4.16251 26.7377 4.81585 26.9165C7.25252 27.5682 16.9992 27.5682 16.9992 27.5682C16.9992 27.5682 26.7458 27.5682 29.1825 26.9165C29.8494 26.7278 30.4547 26.3665 30.9373 25.869C31.4198 25.3715 31.7626 24.7555 31.9309 24.0832C32.3734 21.6289 32.5915 19.1395 32.5825 16.6457C32.5984 14.114 32.3803 11.5863 31.9309 9.09484Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.8125 21.2784L21.9583 16.6459L13.8125 12.0134V21.2784Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="w-full inline-block text-[#656565] font-['Pretendard'] font-medium text-center mt-3">동영상 링크</span>
            </div>
            <ul>
                {uploadedFiles.map((filename) => (
                    <li key={filename}>{filename}</li>
                ))}
            </ul>
        </div>
    );
};

export default VideoUpload;