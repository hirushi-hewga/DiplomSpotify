import { useHomeUi } from "components/ui/HomeUiContext.tsx";
import { useState } from "react";
import { useAlbums } from "../../../../hooks/queries/useAlbums.ts";
import { clsx } from "clsx";
import { useTracksByAlbum } from "../../../../hooks/queries/useTracksByAlbum.ts";
import { useDispatch, useSelector } from "react-redux";
import { playerActions, selectCurrentTrack } from "../../../../store/slice/playerSlice.ts";
import { useTrackByGenre } from "../../../../hooks/queries/useTrackByGenre.ts";
import shorten from "utils/shorten.ts";

const ReleasesPage = () => {
  const dispatch = useDispatch();
  const track = useSelector(selectCurrentTrack);
  const { sidebarOpen, trackbarOpen } = useHomeUi();
  const { data: albums } = useAlbums(7)
  const [activeIndex, setActiveIndex] = useState(2);

  const { data: pop } = useTrackByGenre("pop")
  const { data: dance } = useTrackByGenre("dance")
  const { data: rock } = useTrackByGenre("rock")

  console.log(pop)

  const { data: releases } = useTracksByAlbum(albums[activeIndex]?.id)

  if (!albums.length) return null;

  const leftIndex = (activeIndex - 1 + albums.length) % albums.length;
  const rightIndex = (activeIndex + 1) % albums.length;

  const visible = [
    { album: albums[leftIndex], position: "left" as const },
    { album: albums[activeIndex], position: "center" as const },
    { album: albums[rightIndex], position: "right" as const },
  ];

  return (
    <div className="w-full flex flex-col relative gap-y-[120px] flex-1">
      <div className={`flex flex-col items-center absolute overflow-hidden h-[539px] z-0 ${trackbarOpen&&sidebarOpen ? 'w-[1140px] right-[-26px]' : trackbarOpen ? "w-[1140px] left-1/2 -translate-x-1/2" : sidebarOpen ? "w-[1587px] right-[-84px]" : "w-[1587px] left-1/2 -translate-x-1/2"}`}>
        <div className={`font-semibold font-poppins ${trackbarOpen ? "text-[120px]" : "text-[200px]"} text-[#FE7D1C]`}>NEW ALBUMS</div>
        <div className={`flex flex-row gap-[14px] items-center ${trackbarOpen ? "h-[253px] top-[161px]" : "h-[349px] top-[180px]"} absolute`}>

          {visible.map(({ album, position }) => {
            const isActive = position === "center";

            const cardSizeClass = isActive
              ? trackbarOpen
                ? "w-[469px] h-[253px]"
                : "w-[635px] h-[349px]"
              : trackbarOpen
                ? "w-[318px] h-[174px]"
                : "w-[462px] h-[255px]";

            return (
              <div
                key={`${position}-${album.id}`}
                onClick={() => {
                  if (position === "left") setActiveIndex(leftIndex);
                  if (position === "right") setActiveIndex(rightIndex);
                  if (position === "center") dispatch(playerActions.playTrack({track: releases[0], queue: releases}))
                }}
                className={clsx(
                  isActive && "backdrop-blur-[7px] shadow-[6px_6px_4px_rgba(0,0,0,.25)]",
                  "relative overflow-hidden rounded-[30px] transition-all duration-300 hover:cursor-pointer",
                  cardSizeClass
                )}
              >
                <img
                  src={`http://localhost:5014${album.image}`}
                  className={`absolute inset-0 w-full h-full object-cover ${isActive && " opacity-[54%]"}`}
                />

                {isActive && (
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className="text-2xl font-semibold">{album.name}</div>
                    <div className="text-lg">{album.artist}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={`w-full flex flex-col text-white ${trackbarOpen ? "mt-[550px] gap-[100px]" : "mt-[650px] gap-[108px]"}`}>
        <div className={`flex flex-col ${trackbarOpen ? "gap-[28px]" : "gap-[24px]"}`}>
          <div className={`font-semibold font-poppins text-[#DB6316] ${trackbarOpen ? "text-[56px]" : "text-[52px]"}`}>
            New Pop
          </div>
          <div className="flex flex-row gap-[90px] h-[314px] overflow-hidden justify-between flex-wrap">
            {pop.map(t => (
              <div key={t.id} className={`w-[249px] h-[314px] flex flex-col justify-between`}>
                <div
                  className={`w-[249px] h-[249px] px-[13px] py-[15px] hover:cursor-pointer flex items-end bg-cover rounded-[36px]`}
                  style={{ backgroundImage: `url(http://localhost:5014${t.image})` }}
                  onClick={() => {if (t.id === track?.id) dispatch(playerActions.togglePlay()); else dispatch(playerActions.playTrack({track: t, queue: pop}))}}
                >
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full backdrop-blur-[16px] border border-white/80">
                    <img src="/assets/icons/icon22.svg" className="h-[10.76px]"/>
                  </div>
                </div>
                <div className="font-inter">
                  <div className="font-semibold leading-none text-[24px]">{shorten(t.name, 15)}</div>
                  <div className="font-light text-[20px]">{shorten(t.artist, 15)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`flex flex-col ${trackbarOpen ? "gap-[28px]" : "gap-[24px]"}`}>
          <div className={`font-semibold font-poppins text-[#DB6316] ${trackbarOpen ? "text-[56px]" : "text-[52px]"}`}>
            New Dance
          </div>
          <div className="flex flex-row gap-[90px] h-[314px] overflow-hidden justify-between flex-wrap">
            {dance.map(t => (
              <div key={t.id} className={`w-[249px] h-[314px] flex flex-col justify-between`}>
                <div
                  className={`w-[249px] h-[249px] px-[13px] py-[15px] hover:cursor-pointer flex items-end bg-cover rounded-[36px]`}
                  style={{ backgroundImage: `url(http://localhost:5014${t.image})` }}
                  onClick={() => {if (t.id === track?.id) dispatch(playerActions.togglePlay()); else dispatch(playerActions.playTrack({track: t, queue: dance}))}}
                >
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full backdrop-blur-[16px] border border-white/80">
                    <img src="/assets/icons/icon22.svg" className="h-[10.76px]"/>
                  </div>
                </div>
                <div className="font-inter">
                  <div className="font-semibold leading-none text-[24px]">{shorten(t.name, 15)}</div>
                  <div className="font-light text-[20px]">{shorten(t.artist, 15)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`flex flex-col ${trackbarOpen ? "gap-[28px]" : "gap-[24px]"}`}>
          <div className={`font-semibold font-poppins text-[#DB6316] ${trackbarOpen ? "text-[56px]" : "text-[52px]"}`}>
            New Rock
          </div>
          <div className="flex flex-row gap-[90px] h-[314px] overflow-hidden justify-between flex-wrap">
            {rock.map(t => (
              <div key={t.id} className={`w-[249px] h-[314px] flex flex-col justify-between`}>
                <div
                  className={`w-[249px] h-[249px] px-[13px] py-[15px] hover:cursor-pointer flex items-end bg-cover rounded-[36px]`}
                  style={{ backgroundImage: `url(http://localhost:5014${t.image})` }}
                  onClick={() => {if (t.id === track?.id) dispatch(playerActions.togglePlay()); else dispatch(playerActions.playTrack({track: t, queue: rock}))}}
                >
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full backdrop-blur-[16px] border border-white/80">
                    <img src="/assets/icons/icon22.svg" className="h-[10.76px]"/>
                  </div>
                </div>
                <div className="font-inter">
                  <div className="font-semibold leading-none text-[24px]">{shorten(t.name, 15)}</div>
                  <div className="font-light text-[20px]">{shorten(t.artist, 15)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReleasesPage;