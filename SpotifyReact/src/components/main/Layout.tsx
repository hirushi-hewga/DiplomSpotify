import { useContext, useState } from "react";
import Sidebar from "./Sidebar.tsx";
import Header from "./header/Header.tsx";
import { Outlet } from "react-router-dom";
import Player from "./player/index.tsx";
import { PlayerContext } from "./player/PlayerProvider.tsx";
import Profile from "./modal/Profile.tsx";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
  const {activeTrack} = useContext(PlayerContext);
  
  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} modalProfileOpen={isModalProfileOpen} setModalProfileOpen={setIsModalProfileOpen}/>
      <div className={`flex flex-col ${sidebarOpen ? 'w-[calc(100vw-252px)]' : 'w-[calc(100vw-102px)]'} ml-[10px]`}>
        <Header/>
        <main className={`w-full mt-[10px] overflow-hidden ${activeTrack ? 'mb-[118px]' : 'mb-[10px]'}`}>
          <Profile isOpen={isModalProfileOpen} onClose={() => setIsModalProfileOpen(false)}/>
          <Outlet />
        </main>
      </div>
      <Player/>
    </div>
  )
}

export default Layout;