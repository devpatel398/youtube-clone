import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavbar } from "../components/home-navbar";
import { HomeSidebar } from "../components/home-navbar/home-sidebar";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <SidebarProvider>
            <div className="w-full">
                <HomeNavbar></HomeNavbar>
                <div className="flex min-h-screen pt-[4rem]">
                    <HomeSidebar></HomeSidebar>
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
