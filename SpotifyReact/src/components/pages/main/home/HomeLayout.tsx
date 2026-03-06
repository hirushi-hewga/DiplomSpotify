import CreatePlaylistModal from "components/main/modal/Playlist/CreatePlaylistModal.tsx";
import Header from "components/main/Header.tsx";
import Sidebar from "components/main/Sidebar.tsx";
import Footer from "components/main/Footer.tsx";
import { Outlet } from "react-router-dom";

const HomeLayout = ({
                      playlistModalOpen = false,
                      playlistModalOpenHandler = ()  => {},
                      sidebarOpen = false,
                      sidebarOpenHandler = () => {}}) => {
  return (
    <div className="w-full bg-[#0F0F10] relative flex flex-col items-center overflow-hidden z-0">
      <CreatePlaylistModal isOpen={playlistModalOpen} openHandler={playlistModalOpenHandler} />
      <Header isSidebarOpen={sidebarOpen} sidebarOpenHandler={sidebarOpenHandler} />
      <div className="w-[1680px] mt-[64px] flex gap-x-[64px]">
        <Sidebar isOpen={sidebarOpen}/>
        <Outlet/>
      </div>
      <Footer className="mt-[148px]"/>
    </div>
  )
}

export default HomeLayout;