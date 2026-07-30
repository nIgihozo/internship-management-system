"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, ShieldCheck, AlertTriangle, Activity, LogOut } from "lucide-react";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users & roles", href: "/dashboard/admin/users", icon: Users },
    { label: "Verify registrations", href: "/dashboard/admin/verify", icon: ShieldCheck },
    { label: "Disputes", href: "/dashboard/admin/disputes", icon: AlertTriangle },
    { label: "System activity", href: "/dashboard/admin/activity", icon: Activity },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refresh_token");
        router.push("/login");
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fafafa" }}>
            <div style={{ width: "220px", backgroundColor: DARK_BLUE, color: "#fff", padding: "24px 12px", display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "16px", fontWeight: 700, padding: "0 12px 20px" }}>Internship Management System</p>

                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <div key={item.href} onClick={() => router.push(item.href)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "6px", marginBottom: "4px", cursor: "pointer", fontSize: "14px", fontWeight: isActive ? 600 : 400, backgroundColor: isActive ? SKY_BLUE : "transparent", color: isActive ? DARK_BLUE : "#e0f2fe" }}>
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </div>
                    );
                })}

                <div onClick={handleLogout} style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "14px", color: "#e0f2fe" }}>
                    <LogOut size={18} />
                    <span>Log out</span>
                </div>
            </div>
            <div style={{ flex: 1 }}>{children}</div>
        </div>
    );
}