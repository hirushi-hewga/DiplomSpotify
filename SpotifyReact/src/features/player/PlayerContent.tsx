import { useDispatch, useSelector } from "react-redux";
import shorten from "utils/shorten.ts";
import { playerActions, selectCurrentTrack, selectIsPlaying, selectPlayer } from "../../store/slice/playerSlice.ts";
import { clsx } from "clsx";

function formatTime(sec: number) {
  if (!sec || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const PlayerContent = ({ className = "", toggleTrackPanel=()=>{}, track, isPlayerBar = true, onClick=()=>{} }) => {
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const currentTrack = useSelector(selectCurrentTrack);
  const isPlaying = useSelector(selectIsPlaying);

  if (!track) return null;

  const progress = player.duration > 0 ? (player.currentTime / player.duration) * 100 : 0;

  return (
    <div onClick={() => {if (!isPlayerBar) onClick();}} className={clsx(className, `backdrop-blur-[16px] flex items-center justify-between`, (isPlayerBar ? `${((isPlaying) ? "bg-[#F16001]/[25%]" : "bg-[#FF934C]/[25%]")} ring-[1px] ring-inset ring-white/40 px-[20px]` : `transition-all ease-in-out duration-200 ${track.id === currentTrack?.id && `ring-white/40 ${((isPlaying) ? "bg-[#F16001]/[25%]" : "bg-[#FF934C]/[25%]")}`} ${track.id === currentTrack?.id && "px-[20px]"}`))}>
      <div className="w-[300px] flex items-center gap-x-[40px]">
        {track.image ? (
          <div
            style={{
              backgroundImage: `url(http://localhost:5014${track.image})`,
            }}
            className="min-w-[90px] min-h-[90px] flex items-center justify-center rounded-[20px] bg-cover bg-center"
          >
            <img
              src="/assets/icons/icon23.svg"
              className="h-[14px]"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-white/10" />
        )}
        <div className="text-white font-inter gap-[8px]">
          <div className="font-semibold text-[24px]">{shorten(track.name, 18)}</div>
          <div className="font-light text-[20px]">{shorten(track.artist, 18)}</div>
        </div>
      </div>

      {track.id === currentTrack?.id && (
        <input
          type="range"
          min={0}
          max={Math.max(0, player.duration || 0)}
          value={Math.min(player.currentTime, player.duration || player.currentTime)}
          onChange={(e) => dispatch(playerActions.seek(Number(e.target.value)))}
          className="flex-1 bg-[#F16001]/[25%] rounded-full"
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {isPlayerBar && (
        <div className="w-[144px] flex flex-col items-center gap-[16px] mt-[22px]">
          <div className="flex flex-row items-center w-full justify-between">
            <button onClick={() => dispatch(playerActions.prev())}>
              <img src="/assets/icons/icon25.svg" alt="icon" className="h-[24px]" />
            </button>

            <button onClick={() => dispatch(playerActions.togglePlay())}>
              <img
                src={`/assets/icons/${isPlaying ? "icon26.svg" : "icon28.svg"}`}
                alt="icon"
                style={{ height: `${isPlaying ? "26.67px" : "27px"}` }}
              />
            </button>

            <button onClick={() => dispatch(playerActions.next())}>
              <img src="/assets/icons/icon27.svg" alt="icon" className="h-[24px]" />
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={player.volume}
            onChange={(e) => dispatch(playerActions.setVolume(Number(e.target.value)))}
            className="w-full bg-[#F16001]/[25%] rounded-full"
          />
        </div>
      )}

      <div className="flex w-[137px] flex-row items-center font-semibold relative font-inter justify-between text-white">
        <div className="text-[24px]">{track.id === currentTrack?.id ? formatTime(player.currentTime) : formatTime(track.duration)}</div>
        <div className="text-[18px] font-light hover:cursor-pointer" onClick={(e) => {e.stopPropagation(); toggleTrackPanel();}}>
          •••
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;