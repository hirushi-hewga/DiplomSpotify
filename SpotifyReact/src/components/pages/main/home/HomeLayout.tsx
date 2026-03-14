import Footer from "components/main/Footer.tsx";
import Header from "components/main/Header.tsx";
import Sidebar from "components/main/Sidebar.tsx";
import TracksBar from "components/main/TracksBar.tsx";
import CreatePlaylistModal from "components/main/modal/Playlist/CreatePlaylistModal.tsx";
import { Outlet, useLocation } from "react-router-dom";
import PlayerBar from "../../../../features/player/PlayerBar.tsx";
import { usePlayerAudio } from "../../../../features/player/usePlayerAudio.ts";
import { useHomeUi } from "components/ui/HomeUiContext.tsx";
import SearchResults from "components/pages/main/home/SearchResults.tsx";


const HomeLayout = () => {
  const { pathname } = useLocation();
  const { searchQuery } = useHomeUi();

  const isSearching = searchQuery.trim().length > 0;
  usePlayerAudio();

  // FF934C

  return (
    <>
      <div className="w-full min-h-screen bg-[#0F0F10] relative flex flex-col items-center overflow-hidden z-0">
        {pathname === "/home" && (<div className="w-[800px] h-[1200px] rounded-[100%] absolute right-[-200px] top-[370px] bg-[#FF934C] opacity-25 blur-[200px] z-[-1]"/>)}
        {pathname === "/home" && (<div className="w-[800px] h-[1200px] rounded-[100%] absolute left-[-200px] top-[1030px] bg-[#FF934C] opacity-25 blur-[200px] z-[-1]"/>)}
        {pathname === "/home" && (<div className="w-[800px] h-[800px] rounded-[100%] absolute right-[-200px] top-[2300px] bg-[#FF934C] opacity-25 blur-[200px] z-[-1]"/>)}
        {pathname === "/home/playlists" && (<div className="w-[800px] h-[750px] rounded-[100%] absolute left-[650px] top-[540px] bg-[#FF934C] opacity-20 blur-[200px] z-[-1]"/>)}
        {pathname === "/home/albums" && (<div className="w-[800px] h-[750px] rounded-[100%] absolute left-[650px] top-[750px] bg-[#FF934C] opacity-25 blur-[200px] z-[-1]"/>)}
        {pathname === "/home/favourites" && (<div className="w-[800px] h-[750px] rounded-[100%] absolute left-[650px] top-[200px] bg-[#FF934C] opacity-20 blur-[200px] z-[-1]"/>)}
        {pathname === "/home/releases" && (<div className="w-[800px] h-[800px] rounded-[100%] absolute right-[-250px] top-[400px] bg-[#FF934C] opacity-30 blur-[200px] z-[-1]"/>)}
        {pathname === "/home/releases" && (<div className="w-[800px] h-[800px] rounded-[100%] absolute left-[-250px] top-[1000px] bg-[#FF934C] opacity-30 blur-[200px] z-[-1]"/>)}
        {pathname.split('/')[1] === "road" && (<div className="w-[800px] h-[550px] rounded-[100%] absolute left-[650px] top-[280px] bg-[#FF934C] opacity-30 blur-[200px] z-[-1]"/>)}
        <CreatePlaylistModal />
        <Header />
        <div className="w-[1680px] flex-1 mt-[64px] flex gap-x-[64px]">
          <Sidebar />
          {isSearching ? <SearchResults query={searchQuery} /> : <Outlet />}
          <TracksBar />
        </div>
        {pathname.split('/')[1] !== "road" && (
          <Footer className="mt-[148px]"/>
        )}
      </div>
      <PlayerBar />
    </>
  )
}

export default HomeLayout;