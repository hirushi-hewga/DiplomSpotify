import { IconAlbum, IconDashboard, IconHome, IconMicrophone2, IconMusic, IconUser } from "@tabler/icons-react";
import ChevronDown from "components/admin/sidebar/ChevronDown";
import ExpandCollapseButton from "components/admin/sidebar/ExpandCollapseButton";
import SidebarLink from "components/admin/sidebar/SidebarLink";
import SidebarLinkGroup from "components/admin/sidebar/SidebarLinkGroup";
import SidebarLinkGroupMenu from "components/admin/sidebar/SidebarLinkGroupMenu";
import SidebarLinkGroupTitle from "components/admin/sidebar/SidebarLinkGroupTitle";
import { NavLink, useLocation } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";

interface ISidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<ISidebarProps> = (props) => {
    const location = useLocation();
    const { pathname } = location;

    const { sidebarOpen, setSidebarOpen } = props;

    const trigger = useRef<HTMLButtonElement | null>(null);
    const sidebar = useRef<HTMLDivElement | null>(null);

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
    );

    // Close on click outside
    useEffect(() => {
        const clickHandler = (event: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current?.contains(event.target as Node) ||
                trigger.current?.contains(event.target as Node)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    }, [sidebarOpen, setSidebarOpen]);

    // Store sidebar expanded state in localStorage
    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.body.classList.add("sidebar-expanded");
        } else {
            document.body.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <div>
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
                    sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <div
                id="sidebar"
                ref={sidebar}
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 
                h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64
                shrink-0 bg-black p-4 transition-all duration-200 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-64"
                }`}
            >
                {/* Sidebar header */}
                <div className="flex flex-col justify-between mb-10 pr-3 sm:px-2 gap-5">
                    {/* Close button */}
                    <button
                        ref={trigger}
                        className="lg:hidden text-white hover:text-grey-100"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <NavLink end to="/" className={`block text-white truncate transition duration-150 "}`}>
                        <div className="flex items-center">
                            <div>
                                <IconDashboard className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-xl font-bold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">
                                MusicFlow
                            </span>
                        </div>
                    </NavLink>

                    {/* Links */}
                    <div className="space-y-8 -mx-2">
                        {/* Pages group */}
                        <div>
                            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3">
                                <span
                                    className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                                    aria-hidden="true"
                                >
                                    •••
                                </span>
                                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
                            </h3>
                            <ul className="mt-3">
                                {/* Dashboard */}
                                <SidebarLink
                                    to="/"
                                    icon={<IconHome />}
                                    label="Home"
                                    activeCondition={(pathname) => pathname === "/"}
                                />

                                {/* Artists */}
                                <SidebarLinkGroup activecondition={pathname.includes("artists")}>
                                    {(handleClick, open) => (
                                        <>
                                            <SidebarLinkGroupTitle
                                                href="#"
                                                icon={<IconMicrophone2 />}
                                                isActive={pathname.includes("artists")}
                                                handleClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                }}
                                            >
                                                Artists
                                                <ChevronDown open={open} />
                                            </SidebarLinkGroupTitle>
                                            <SidebarLinkGroupMenu
                                                open={open}
                                                links={[
                                                    { to: "/admin/artists/list", label: "List" },
                                                    { to: "/admin/artists/create", label: "Create" },
                                                    // { to: "/ecommerce/invoices", label: "Invoices" },
                                                ]}
                                            />
                                        </>
                                    )}
                                </SidebarLinkGroup>

                                {/*/!* Albums *!/*/}
                                <SidebarLinkGroup activecondition={pathname.includes("albums")}>
                                    {(handleClick, open) => (
                                        <>
                                            <SidebarLinkGroupTitle
                                                href="#"
                                                icon={<IconAlbum />}
                                                isActive={pathname.includes("albums")}
                                                handleClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                }}
                                            >
                                                Albums
                                                <ChevronDown open={open} />
                                            </SidebarLinkGroupTitle>
                                            <SidebarLinkGroupMenu open={open} links={[{ to: "/admin/albums/List", label: "List" }]} />
                                            <SidebarLinkGroupMenu
                                                open={open}
                                                links={[{ to: "/admin/albums/create", label: "Create" }]}
                                            />
                                        </>
                                    )}
                                </SidebarLinkGroup>

                                {/*/!* Tracks *!/*/}
                                <SidebarLinkGroup activecondition={pathname.includes("tracks")}>
                                    {(handleClick, open) => (
                                        <>
                                            <SidebarLinkGroupTitle
                                                href="#"
                                                icon={<IconMusic />}
                                                isActive={pathname.includes("tracks")}
                                                handleClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                }}
                                            >
                                                Tracks
                                                <ChevronDown open={open} />
                                            </SidebarLinkGroupTitle>
                                            <SidebarLinkGroupMenu
                                                open={open}
                                                links={[{ to: "/admin/tracks/list", label: "List" }]}
                                            />
                                            <SidebarLinkGroupMenu
                                                open={open}
                                                links={[{ to: "/admin/tracks/create", label: "Create" }]}
                                            />
                                        </>
                                    )}
                                </SidebarLinkGroup>

                                {/*/!* Login *!/*/}
                                <SidebarLinkGroup activecondition={pathname.includes("auth")}>
                                    {(handleClick, open) => (
                                        <>
                                            <SidebarLinkGroupTitle
                                                href="#"
                                                icon={<IconUser />}
                                                isActive={pathname.includes("auth")}
                                                handleClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                }}
                                            >
                                                Auth
                                                <ChevronDown open={open} />
                                            </SidebarLinkGroupTitle>
                                            <SidebarLinkGroupMenu
                                                open={open}
                                                links={[{ to: "/auth/login", label: "Login" }]}
                                            />
                                            <SidebarLinkGroupMenu
                                                open={open}
                                                links={[{ to: "/auth/register", label: "Register" }]}
                                            />
                                        </>
                                    )}
                                </SidebarLinkGroup>
                            </ul>
                        </div>
                    </div>
                </div>

                <ExpandCollapseButton sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
            </div>
        </div>
    );
};

export default Sidebar;