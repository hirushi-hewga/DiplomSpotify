import { useState } from "react";
import { clsx } from "clsx";
import { useLikedAlbums } from "../../../../hooks/queries/useLikedAlbums.ts";
import shorten from "utils/shorten.ts";
import { useTracksByAlbum } from "../../../../hooks/queries/useTracksByAlbum.ts";
import { playerActions, selectCurrentTrack, selectIsPlaying } from "../../../../store/slice/playerSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { useAlbums } from "../../../../hooks/queries/useAlbums.ts";
import { useQuickPicks } from "../../../../hooks/queries/useQuickPicks.ts";
import { useHomeUi } from "components/ui/HomeUiContext.tsx";
import { useRandomAlbums } from "../../../../hooks/queries/useRandomAlbums.ts"
import VolumeSlider from "components/ui/VolumeSlider.tsx";
import StackedAlbumCarousel from "components/main/StackedAlbumCarousel.tsx";

type Album = {
  id: string;
  name: string;
  image: string;
  artist: string;
  tracksCount: number;
}

const RoadAlbumsPage = () => {
  const dispatch = useDispatch();
  const track = useSelector(selectCurrentTrack);
  const isPlaying = useSelector(selectIsPlaying);
  const { sidebarOpen, trackbarOpen } = useHomeUi();
  const [value, setValue] = useState(65);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  const [albumsActiveTab, setAlbumsActiveTab] = useState<"liked" | "maylike" | "random" | "album">("liked");
  const [album, setAlbum] = useState<Album>();
  const [likeAlbum, setLikeAlbum] = useState<Album>();

  const { data: tracksByAlbum } = useTracksByAlbum(album?.id);
  const { data: randomAlbums } = useRandomAlbums();
  const { data: likedAlbums } = useLikedAlbums();
  const { data: albums } = useAlbums(6);
  const { data: tracks } = useQuickPicks(20);

  return (
    <div className={clsx(track && "mb-[150px]", "w-full flex flex-col", albumsActiveTab === "maylike" ? "gap-[64px]" : "gap-[32px]")}>
      <div className={clsx("flex flex-row gap-[64px] font-medium font-inter text-[24px] text-white", albumsActiveTab === "album" && "hidden")}>
        <div
          onClick={() => { if (albumsActiveTab !== "liked") setAlbumsActiveTab("liked"); }}
          className={clsx(albumsActiveTab === "liked" ? "font-bold text-[#F16001]" : "hover:cursor-pointer hover:text-[#FF934C]")}
        >
          Your liked albums
        </div>
        <div
          onClick={() => { if (albumsActiveTab !== "maylike") setAlbumsActiveTab("maylike"); }}
          className={clsx(albumsActiveTab === "maylike" ? "font-bold text-[#F16001]" : "hover:cursor-pointer hover:text-[#FF934C]")}
        >
          Albums you may like
        </div>
        <div
          onClick={() => { if (albumsActiveTab !== "random") setAlbumsActiveTab("random"); }}
          className={clsx(albumsActiveTab === "random" ? "font-bold text-[#F16001]" : "hover:cursor-pointer hover:text-[#FF934C]")}
        >
          Random from Echo
        </div>
      </div>

      {albumsActiveTab === "liked" && (
        <div className="w-full flex flex-row">
          <div className="w-full  flex flex-row flex-wrap overflow-y-auto gap-[24px] max-h-[716px]">
            {likedAlbums.map((a) => (
              <div className="w-[287px] h-[346px] flex flex-col justify-between">
                <div
                  onClick={() => {
                    setAlbum(a);
                    setAlbumsActiveTab("album");
                  }}
                  className="w-[287px] h-[287px] rounded-[36px] bg-cover hover:cursor-pointer"
                  style={{ backgroundImage: `url(http://localhost:5014${a.image})` }}
                />
                <div className="flex flex-col items-center font-inter text-white">
                  <div className="font-bold text-[20px] leading-none">{shorten(a.name, 17)}</div>
                  <div className="font-extralight text-[14px]">{a.tracksCount} tracks</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {albumsActiveTab === "album" && tracksByAlbum.length > 0 && (
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-row justify-between items-center font-semibold font-poppins">
            <div className="text-[32px] text-[#F16001]">{album?.name}</div>
            <div onClick={() => setAlbumsActiveTab("liked")} className={clsx("text-[16px] text-[#919090] hover:text-white hover:cursor-pointer")}>Back</div>
          </div>
          <div className={`w-full flex justify-between gap-x-[32px] overflow-hidden`}>
            <div
              className="h-full max-h-[620px] min-h-[535px] w-[371px] bg-cover bg-center rounded-[48px] flex items-center justify-center font-semibold font-poppins text-[32px] text-black"
              style={{ backgroundImage: `url(http://localhost:5014${album?.image})` }}
            >
              {shorten(album?.name, 10)}
            </div>
            <div className={`flex-1 flex flex-col overflow-y-auto max-h-[620px]`}>
              {tracksByAlbum.map((t, index) => (
                <div key={t.id} onClick={() => {if (track?.id !== t.id) dispatch(playerActions.playTrack({ track: t, queue: tracksByAlbum })); else dispatch(playerActions.togglePlay());}} className={clsx(
                  "min-h-[69px] group w-full flex flex-row items-center justify-between rounded-[20px] text-[#DB6316] hover:cursor-pointer transition-all duration-200 ease-out",
                  "hover:px-[8px] ring-inset ring-1 ring-transparent",
                  "hover:ring-white/70",
                  track?.id === t.id && "px-[8px] ring-white/40 bg-[#F16001]/[25%]"
                )}>
                  <div className={`flex flex-row items-center gap-x-[25px]`}>
                    <div className={`w-[18px] font-semibold flex items-center font-poppins text-[24px] ${track?.id === t.id ? "text-[#919090]" : "text-[#515050]"}`}>
                      <span className={`${track?.id === t.id && !isPlaying && "hidden"}`}>
                        {index + 1}.
                      </span>
                      <img
                        src="/assets/icons/icon23.svg"
                        className={`${(track?.id !== t.id || isPlaying) && "hidden"}`}
                      />
                    </div>
                    <div className="font-inter">
                      <div className={`font-semibold text-[22px]`}>{shorten(t.name, 20)}</div>
                      <div className={`font-bold text-[16px] text-[white]`}>{shorten(album.artist, 25)}</div>
                    </div>
                  </div>
                  <div className={`font-semibold font-inter flex flex-row items-center gap-x-[64px]`}>
                    <div className="text-[24px]">{formatTime(t.duration)}</div>
                    <div className="text-[18px] font-light text-white leading-none">•••</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {albumsActiveTab === "maylike" && (
        <div className="w-full flex flex-col gap-[64px]">
          <div className={`w-full ${likeAlbum?.id === "" ? "h-[325px]" : "h-[365px]"} gap-x-[48px] gap-y-[100px] justify-between flex flex-wrap overflow-hidden`}>
            {albums.map(a => (
              <div key={a.id} className="group flex flex-col gap-y-[44px] items-center hover:cursor-pointer">
                <img
                  src={`http://localhost:5014${a.image}`}
                  onClick={() => {if (likeAlbum?.id !== a.id) setLikeAlbum(a); dispatch(playerActions.playTrack({track: a.tracks[0], queue: a.tracks}));}}
                  className={`${likeAlbum?.id === a.id ? "w-[270px]" : "w-[230px]"} transform-all duration-150 rounded-[50px]`}
                />
                <div className={clsx(likeAlbum?.id === a.id ? "bg-[#F16001]" : "bg-[#FF934C]", "h-[25px] aspect-square rounded-full relative flex items-center justify-center")}>
                  <div className={clsx(likeAlbum?.id === a.id ? "border-[3px]" : "group-hover:border-[3px]", "w-[51px] h-[51px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full absolute border-[#FF934C]")}/>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Wise choice - recommended &gt;</div>
            <div className={`w-full max-h-[274px] py-[16px] pl-[20px] justify-between text-white font-light font-inter text-[16px] flex flex-wrap overflow-hidden rounded-[8px] ${!(trackbarOpen&&!sidebarOpen) && "gap-x-[32px]"} gap-y-[16px] bg-[#0F0F10]/[10%] border border-white/[80%]`}>
              {tracks.map(t => (
                <div key={t.id} onClick={() => dispatch(playerActions.playTrack({track: t, queue: tracks}))} className={`w-[400px] h-[70px] gap-x-[24px] flex flex-row items-center overflow-hidden rounded-[8px] hover:cursor-pointer`}>
                  <img
                    src={`http://localhost:5014${t.image}`}
                    className="h-full rounded-[8px]"
                  />
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {albumsActiveTab === "random" && (
        <div className="w-full flex flex-row items-center gap-[64px]">
          <StackedAlbumCarousel albums={randomAlbums}/>
          <div className="w-[40px] h-[283px] gap-[16px] flex flex-col items-center">
            <div className="w-[32px] h-full">
              <VolumeSlider value={value} onChange={setValue} />
            </div>
            <img src="/assets/icons/icon29.svg" className="w-[40px]" />
          </div>
        </div>
      )}

    </div>
  )
}

export default RoadAlbumsPage;