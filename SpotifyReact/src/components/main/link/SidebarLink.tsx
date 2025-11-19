import { NavLink, useLocation } from "react-router-dom";

import React from "react";

interface SidebarLinkProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    activeCondition?: (pathname: string) => boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, activeCondition }) => {
    const { pathname } = useLocation();
    const isActive = activeCondition ? activeCondition(pathname) : pathname.includes(to);

    return (
        <li
            className={`py-2 rounded-sm mb-0.5 last:mb-0 ${isActive && ""}`}
        >
            <NavLink
                end
                to={to}
                className={`block text-black truncate transition duration-150`}
            >
                <div className="flex items-center">
                    <div className="w-[34px] h-[34px]">{icon}</div>
                    <span className={`font-roboto font-normal text-[16px] text-xl text-loginTextColor2 pl-[8px]`}>
                        {label}
                    </span>
                </div>
            </NavLink>
        </li>
    );
};

export default SidebarLink;