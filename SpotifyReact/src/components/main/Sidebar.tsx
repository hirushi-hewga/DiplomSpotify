import React, { useContext, useRef, useState } from "react";
import SidebarLink from "./link/SidebarLink.tsx";

import Home from "./icon/Home.tsx";

import { useLocation } from "react-router-dom";
import Library from "./icon/Library.tsx";
import User from "./icon/User.tsx";
import Like from "./icon/Like.tsx";
import Album from "./icon/Album.tsx";
import Playlist from "./icon/Playlist.tsx";
import Microphone from "./icon/Microphone.tsx";
import HomeF from "./icon/HomeF.tsx";
import LibraryF from "./icon/LibraryF.tsx";
import MicrophoneF from "./icon/MicrophoneF.tsx";
import PlaylistF from "./icon/PlaylistF.tsx";
import AlbumF from "./icon/AlbumF.tsx";
import LikeF from "./icon/LikeF.tsx";
import { PlayerContext } from "./player/PlayerProvider.tsx";
import UserF from "./icon/UserF.tsx";
import Profile from "./modal/Profile.tsx";

interface ISidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  modalProfileOpen: boolean;
  setModalProfileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<ISidebarProps> = (props) => {

  const location = useLocation();
  const { pathname } = location;

  const { sidebarOpen, setSidebarOpen, modalProfileOpen, setModalProfileOpen } = props;

  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);
  
  const { activeTrack } = useContext(PlayerContext);

  return(
    <div id="sidebar" ref={sidebar} className={`opacity-85 sticky top-0 left-0 h-full z-40`}>
      <div>
        {sidebarOpen ? (
          <div
            id="sidebar"
            ref={sidebar}
            className={`flex flex-col absolute left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 
            ${activeTrack ? 'h-[calc(100vh-118px)] rounded-br-[14px]' : 'h-screen'} overflow-y-scroll lg:overflow-y-auto no-scrollbar w-[252px] lg:w-[252px] lg:sidebar-expanded:!w-[252px] 2xl:!w-[252px]
            shrink-0 bg-black transition-all duration-200 ease-in-out`}
          >
            <div className="flex flex-col justify-between gap-2 pt-[11px] pl-[12px] pb-[15px]">
              <button
                ref={trigger}
                className=" text-white flex"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
              >
                <img src="/assets/Logo.png" className="w-[67px] h-[54px]"/>
                <div className="font-raleway text-16px font-extrabold text-left mt-auto mb-auto pl-[5px]">
                      <span className="text-loginTextColor1">MUSIC</span><span className="text-loginTextColor2">FLOW</span>
                  </div>
              </button>
            </div>
            <hr className="border-loginTextColor2"/>
            <ul className="mt-3 ml-[34px]">
              <SidebarLink
                to="/"
                icon={pathname === "/" ? <HomeF/> : <Home/>}
                label="Home"
                activeCondition={(pathname) => pathname === "/"}
              />
              <SidebarLink
                to="/favorite"
                icon={["/favorite", "/playlists", "/albums", "/artists"].includes(pathname) ? <LibraryF/> : <Library/>}
                label="Library"
                activeCondition={(pathname) => pathname === "/library"}
              />
              <hr className="border-loginTextColor2 w-[184px] mt-[20px] mb-[35px]"/>
              <SidebarLink
                to="/favorite"
                icon={pathname === "/favorite" ? <LikeF/> : <Like/>}
                label="Favorite"
                activeCondition={(pathname) => pathname === "/favorite"}
              />
              <SidebarLink
                to="/albums"
                icon={pathname === "/albums" ? <AlbumF/> : <Album/>}
                label="Albums"
                activeCondition={(pathname) => pathname === "/albums"}
              />
              <SidebarLink
                to="/playlists"
                icon={pathname === "/playlists" ? <PlaylistF/> : <Playlist/>}
                label="Your playlists"
                activeCondition={(pathname) => pathname === "/playlists"}
              />
              <SidebarLink
                to="/artists"
                icon={pathname === "/artists" ? <MicrophoneF/> : <Microphone/>}
                label="Artists"
                activeCondition={(pathname) => pathname === "/forartist"}
              />
              <li className="py-2 rounded-sm mb-0.5 last:mb-0 mt-[40px]">
                <button
                  onClick={() => setModalProfileOpen(true)}
                  className="w-full text-left block text-black truncate transition duration-150">
                  <div className="flex items-center">
                    <div className="w-[34px] h-[34px]">{modalProfileOpen ? <UserF/> : <User/>}</div>
                    <span className="font-roboto font-normal text-[16px] text-xl text-loginTextColor2 pl-[8px]">
                      {"Account"}
                    </span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div
            id="sidebar"
            ref={sidebar}
            className={`flex flex-col absolute left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 
            h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-[102px] lg:w-[102px] lg:sidebar-expanded:!w-[102px] 2xl:!w-[102px]
            shrink-0 bg-black transition-all duration-200 ease-in-out ${activeTrack ? 'h-[calc(100vh-118px)] rounded-br-[14px]' : 'h-screen'}`}
          >
            <div className="flex flex-col justify-between gap-2 pt-[11px] pl-[12px] pb-[15px]">
              <button
                ref={trigger}
                className=" text-white"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
              >
                <img src="/assets/Logo.png" className="w-[67px] h-[54px]"/>
              </button>
            </div>
            <hr className="border-loginTextColor2"/>
            <ul className="mt-3 ml-[34px]">
              <SidebarLink
                to="/"
                icon={pathname === "/" ? <HomeF/> : <Home/>}
                label=""
                activeCondition={(pathname) => pathname === "/"}
              />
              <SidebarLink
                to="/favorite"
                icon={["/favorite", "/playlists", "/albums", "/artists"].includes(pathname) ? <LibraryF/> : <Library/>}
                label=""
                activeCondition={(pathname) => pathname === "/library"}
              />
              <li className="py-2 rounded-sm mb-0.5 last:mb-0">
                <button
                  onClick={() => setModalProfileOpen(true)}
                  className="w-full text-left block text-black truncate transition duration-150">
                  <div className="flex items-center">
                    <div className="w-[34px] h-[34px]">{modalProfileOpen ? <UserF/> : <User/>}</div>
                    <span className="font-roboto font-normal text-[16px] text-xl text-loginTextColor2 pl-[8px]">
                    </span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar;