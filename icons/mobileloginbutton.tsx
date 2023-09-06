import Link from "next/link";

export default function MobileLoginButton() {
    return (
        <Link href='/login' className="ml-auto ">
            <button className="border border-black w-20 h-8 bg-white text-black font-['SUIT'] font-bold text-[0.75rem]">LOG-IN</button>
        </Link >
    )
}