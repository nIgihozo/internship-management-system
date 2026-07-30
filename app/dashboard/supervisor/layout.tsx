"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard,  User, Handshake, LogOut, UsersRound, ClipboardList, TrendingUp, HelpCircle } from "lucide-react";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";

const SIDENAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard/supervisor", icon: LayoutDashboard },
    { label: "Students", href: "/dashboard/supervisor/student", icon: UsersRound },
    { label: "Student Reports", href: "/dashboard/supervisor/reports", icon: ClipboardList},
    { label: "Student Performances", href: "/dashboard/supervisor/performance", icon: TrendingUp},
    { label: "Partner Companies", href: "/dashboard/supervisor/companies", icon: Handshake },
    { label: "Profile", href: "/dashboard/supervisor/profile", icon: User },
    { label: "Help & Support", href: "/dashboard/supervisor/help", icon: HelpCircle }
    
]

export default function SupervisorLayoutDashboard ({ children }: {children: React.ReactNode}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refresh_token");
        router.push("/login");
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fafafa"}}>
            {/* Side Bar */}
            <div style={{width: "220px", backgroundColor: DARK_BLUE, color: "#fff", padding: "24px 12px", display: "flex", flexDirection: "column"}}>
                <p style={{ fontSize: "16px", backgroundColor: DARK_BLUE, fontWeight: 700, padding: "0 12px 20px"}}>Internship Management System</p>

                {SIDENAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <div key={item.href} onClick={() => router.push(item.href)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "6px", marginBottom: "4px", cursor:"pointer", fontSize: "14px", fontWeight: isActive ? 600 : 400, backgroundColor: isActive ? SKY_BLUE : "transparent", color: isActive ? DARK_BLUE : "#e0f2fe"}}>
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </div>
                    );
                })}

                <div onClick={handleLogout} style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "14px", color: "#e0f2fe"}}>
                    <LogOut size={18} />
                    <span>Log Out</span>
                </div>

            </div>
            {/* Active stat */}
            <div style={{ flex: 1 }}>{children}</div>
        </div>
    )
}

