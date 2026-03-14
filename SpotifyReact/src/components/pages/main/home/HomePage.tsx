import { Button } from "components/ui/Button.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../store/slice/userSlice.ts";
import { playerActions } from "../../../../store/slice/playerSlice.ts";
import { useFavouriteArtists } from "../../../../hooks/queries/useFavouriteArtists.ts";
import { useUserPlaylists } from "../../../../hooks/queries/useUserPlaylists.ts";
import { useQuickPicks } from "../../../../hooks/queries/useQuickPicks.ts";
import { useRecentlyPlayed } from "../../../../hooks/queries/useRecentlyPlayed.ts";
import { useAlbums } from "../../../../hooks/queries/useAlbums.ts";
import shorten from "utils/shorten.ts";
import { useHomeUi } from "components/ui/HomeUiContext.tsx";
import { useState } from "react";
import { clsx } from "clsx";



const HomePage = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [album, setAlbum] = useState({id: ""});

  const { sidebarOpen, trackbarOpen, openPlaylistModal } = useHomeUi();

  const { data: artists, loading: artistsLoading, error: artistsError } =
    useFavouriteArtists(user?.id, 5);

  const { data: playlists, loading: playlistsLoading, error: playlistsError } =
    useUserPlaylists(user?.id, 10);

  const { data: quickPicks, loading: quickPicksLoading, error: quickPicksError } =
    useQuickPicks(20);

  const { data: recentlyPlayed, loading: recentlyPlayedLoading, error: recentlyPlayedError } =
    useRecentlyPlayed(user?.id);

  const { data: albums, loading: albumsLoading, error: albumsError } =
    useAlbums(5);


  return (
        <div className="w-full flex flex-col flex-1 gap-y-[64px]">
          <div className="w-full flex flex-col gap-[32px]">
            <div className="flex items-center gap-[32px] font-light font-inter text-[16px] text-white">
              <div className="font-bold text-[#F16001]">All</div>
              <div>My Playlists</div>
              <div>Collections</div>
              <div className="w-[235px] h-[40px]">
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
            {playlists.length > 0 && (
              <div className={`max-h-[196px] w-full pl-[20px] py-[16px] ${(!sidebarOpen&&trackbarOpen)?"gap-x-[48px]":"gap-x-[64px]"} gap-y-[24px] text-white font-semibold font-inter text-[16px] overflow-hidden flex flex-wrap rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]`}>
                {playlists.map(p => (
                  <div key={p.id} className="w-[260px] h-[70px] gap-x-[24px] flex flex-row items-center overflow-hidden rounded-[8px] hover:cursor-pointer">
                    <img
                      src={`http://localhost:5014/data/${p.image}`}
                      className="h-full rounded-[8px]"
                    />
                    {p.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {playlists.length > 0 && (
          <div className={`w-[full] max-h-[267px] flex flex-wrap ${(!sidebarOpen&&!trackbarOpen)?"gap-[64px]":"gap-[24px]"} justify-between overflow-hidden`}>
            {playlists.map(p => (
              <div key={p.id} className="w-[233px] h-[267px] flex flex-col justify-between items-center">
                <div
                  style={{
                    backgroundImage: `url(http://localhost:5014/data/${p.image})`,
                    color: `${p.isBlackTitle ? "black" : "white"}`
                  }}
                  className="w-[233px] h-[233px] text-[16px] bg-contain rounded-[36px] flex items-center justify-center font-semibold font-poppins"
                >
                  {p.title.toUpperCase()}
                </div>
                <div className="font-inter text-white text-center">
                  <div className="font-light leading-none text-[16px]">{p.name}</div>
                </div>
              </div>
            ))}
          </div>
          )}
          {quickPicks.length > 0 && (
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Quick Picks &gt;</div>
              <div className={`w-full max-h-[274px] py-[8px] pl-[20px] ${!(!sidebarOpen&&trackbarOpen)&&"gap-x-[40px]"} justify-between text-white font-light font-inter text-[16px] flex flex-wrap overflow-hidden rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]`}>
                {quickPicks.map(t => (
                  <div key={t.id} onClick={() => dispatch(playerActions.playTrack({track: t, queue: quickPicks}))} className={`${(!sidebarOpen&&trackbarOpen)?"w-[380px]":"w-[400px]"} h-[70px] gap-x-[24px] my-[8px] flex flex-row items-center overflow-hidden rounded-[8px] hover:cursor-pointer`}>
                    <img
                      src={`http://localhost:5014${t.image}`}
                      className="h-full rounded-[8px]"
                    />
                    {t.name}
                  </div>
                ))}
              </div>
          </div>
          )}
          {recentlyPlayed.length > 0 && (
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Recently Played &gt;</div>
              <div className={`w-full max-h-[408px] flex flex-wrap justify-between overflow-hidden gap-y-[24px]`}>
                {recentlyPlayed.map(t => (
                  <div key={t.id} onClick={() => dispatch(playerActions.playTrack({track: t, queue: recentlyPlayed}))} className={`h-[120px] flex flex-row items-center gap-x-[24px] ${(trackbarOpen&&sidebarOpen)?"w-[460px]":"w-[480px]"} hover:cursor-pointer`}>
                    <img
                      src={`http://localhost:5014${t.image}`}
                      className="h-full rounded-[8px]"
                    />
                    <div className="flex flex-col gap-[12px] leading-[160%] font-inter">
                      <div className="font-semibold text-[24px]">{shorten(t.name, 20)}</div>
                      <div className="font-light text-[20px]">{shorten(t.artist, 22)}</div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
          )}
          {artists.length > 0 && (
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Last Releases of your selected artists &gt;</div>
              <div className="w-full h-[345px] flex flex-wrap px-[16px] gap-[16px] justify-between overflow-hidden rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]">
                {artists.map(a => (
                  <div key={a.id} className="w-[233px] py-[16px] h-full flex flex-col justify-between items-center">
                    <img
                      src={`http://localhost:5014${a.image}`}
                      className="h-[233px] rounded-full"
                    />
                    <div className="font-semibold font-inter text-[24px]">{shorten(a.name, 15) ?? "Unknown artist"}</div>
                    <div className="font-light font-inter text-[20px]">Artist</div>
                  </div>
                ))}
              </div>
          </div>
          )}
          {quickPicks.length > 0 && (
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Wise choice - recommended &gt;</div>
              <div className={`w-full max-h-[274px] py-[16px] pl-[20px] justify-between text-white font-light font-inter text-[16px] flex flex-wrap overflow-hidden ${!(trackbarOpen&&!sidebarOpen) && "gap-x-[32px]"} rounded-[8px] gap-y-[16px] bg-[#0F0F10]/[10%] border border-white/[80%]`}>
                {quickPicks.map(t => (
                  <div key={t.id} onClick={() => dispatch(playerActions.playTrack({track: t, queue: quickPicks}))} className={`w-[400px] h-[70px] gap-x-[24px] flex flex-row items-center overflow-hidden rounded-[8px] hover:cursor-pointer`}>
                    <img
                      src={`http://localhost:5014${t.image}`}
                      className="h-full rounded-[8px]"
                    />
                    {t.name}
                  </div>
                ))}
              </div>
          </div>
          )}
          {albums.length > 0 && (
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">SIMILAR TO &gt;</div>
            <div className={`w-full ${album.id === "" ? "h-[325px]" : "h-[365px]"} gap-x-[48px] gap-y-[100px] justify-between flex flex-wrap overflow-hidden`}>
              {albums.map(a => (
                <div key={a.id} className="group flex flex-col gap-y-[44px] items-center hover:cursor-pointer">
                  <img
                    src={`http://localhost:5014${a.image}`}
                    onClick={() => {if (album.id !== a.id) setAlbum(a); dispatch(playerActions.playTrack({track: a.tracks[0], queue: a.tracks}));}}
                    className={`${album.id === a.id ? "w-[270px]" : "w-[230px]"} transform-all duration-150 rounded-[50px]`}
                  />
                  <div className={clsx(album.id === a.id ? "bg-[#F16001]" : "bg-[#FF934C]", "h-[25px] aspect-square rounded-full relative flex items-center justify-center")}>
                    <div className={clsx(album.id === a.id ? "border-[3px]" : "group-hover:border-[3px]", "w-[51px] h-[51px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full absolute border-[#FF934C]")}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
  )
}

export default HomePage;