import type { ReactNode } from "react";
import DashboardSidebar from "@/app/(dashboard)/_components/Dashboard/DashboardSidebar";
import DashboardRightbar from "@/app/(dashboard)/_components/Dashboard/DashboardRightbar";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)_300px]">
            {/* Left: profile card + category navlinks */}
            <DashboardSidebar />

            {/* Middle: current dashboard page content */}
            <div className="min-w-0">{children}</div>

            {/* Right: post event card + explore events */}
            <div className="md:col-span-2 md:mx-auto md:max-w-sm lg:col-span-1">
                <DashboardRightbar />
            </div>
        </div>
    );
}
