import { Button } from "components/ui/Button.tsx";
import { useSelector } from "react-redux";
import { getUser } from "../../../../store/slice/userSlice.ts";
import { useUserPlaylists } from "../../../../hooks/queries/useUserPlaylists.ts";
import { useHomeUi } from "components/ui/HomeUiContext.tsx";


const PlaylistsPage = () => {
  const user = useSelector(getUser);

  const { trackbarOpen, sidebarOpen, openPlaylistModal } = useHomeUi();

  const { data: playlists, loading: playlistsLoading, error: playlistsError } =
    useUserPlaylists(user?.id, 10);

  return (
    <div className="w-full flex flex-col flex-1">
      <div className="w-full relative">
        <img
          src="/assets/main_images/image13.png"
          alt="image"
          className="w-full rounded-[20px]"
        />
        <div className="w-full mb-[16px] px-[32px] flex flex-row justify-between flex-1 absolute bottom-0 z-10">
          <div className={`font-semibold font-poppins text-[${sidebarOpen||trackbarOpen ? "40" : "48"}px] text-white`}>RECOMMENDED</div>
          <div className="h-[64px] aspect-square flex justify-center items-center border border-white/[80%] rounded-full bg-white/[10%]">
            <img
              src="/assets/icons/icon22.svg"
              alt="icon"
              className="h-[14px]"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center mt-[120px]">
        <div className={`font-semibold font-poppins ${sidebarOpen||trackbarOpen ? "text-[52px]" : "text-[56px]"} text-[#F16001]`}>YOUR PLAYLISTS</div>
        <div className={`w-[235px] h-[40px]`}>
          <Button
            variant="transparent"
            className="bg-[#F16001]/[20%] font-semibold font-inter text-[16px] flex gap-[12px]"
            onClick={openPlaylistModal}
          >
            <div className="">Create New Playlist</div>
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img
                src="/assets/icons/icon18.svg"
                alt="icon"
                className="w-[14px]"
              />
            </div>
          </Button>
        </div>
      </div>
      <div className={`flex flex-wrap max-h-[600px] overflow-hidden mt-[100px] ${!sidebarOpen&&trackbarOpen ? "gap-x-[100px]" : "gap-x-[52px]"} gap-y-[32px]`}>
        {playlists.map(p => (
          <div key={p.id} className="w-[233px] h-[284px] flex flex-col justify-between items-center"
          >
            <div
              style={{
                backgroundImage: `url(http://localhost:5014/data/${p.image})`,
                color: `${p.isBlackTitle ? "black" : "white"}`,
              }}
              className={`w-[233px] h-[233px] bg-contain rounded-[36px] flex items-center justify-center font-semibold font-poppins text-[16px]`}
            >
              {p.title.toUpperCase()}
            </div>
            <div className="font-inter text-white text-center">
              <div className={`font-bold leading-none text-[16px]`}>{p.name}</div>
              <div className={`font-light text-[14px]`}>0 listenings</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlaylistsPage;