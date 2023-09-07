import Link from "next/link";

export default function MobileClose() {
    return (
        <Link className="ml-auto mt-0.5 mr-2" href='/'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="0.5" y="0.5" width="23" height="23" stroke="black" />
                <path d="M7.20001 7.2002L16.8 16.8002" stroke="black" strokeLinecap="square" strokeLinejoin="round" />
                <path d="M16.8 7.2002L7.20001 16.8002" stroke="black" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
        </Link>
    )
}