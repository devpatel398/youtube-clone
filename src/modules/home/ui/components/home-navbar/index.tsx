import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { AuthButton } from "@/modules/Auth/ui/componenets/auth-button";


export const HomeNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">
            <div className="flex items-center gap-4 w-full">
                {/* menu and logo */}
                <div className="flex items-center flex-shrink-0">
                    <SidebarTrigger></SidebarTrigger>
                    <Link prefetch href="/" className="hidden md:block">
                        <div className="p-4 flex items-center">
                            <Image src={"/viewtube-logo.svg"} alt="Logo" width={32} height={32}></Image>
                            <p className="text-xl font-semibold tracking-tight">ViewTube</p>
                        </div>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
                    <SearchInput></SearchInput>
                </div>

                <div className="flex-shrink-0 items-center flex gap-4">
                    <AuthButton></AuthButton>
                </div>
            </div>
        </nav>
    );
}