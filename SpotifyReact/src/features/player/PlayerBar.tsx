import { useDispatch, useSelector } from "react-redux";
import { playerActions, selectCurrentTrack, selectPlayer } from "../../store/slice/playerSlice";

function formatTime(sec: number) {
  if (!sec || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const shorten = (text, max = 20) => {
  return text.length > max ? text.slice(0, max) + "..." : text;
};

export function PlayerBar() {
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const track = useSelector(selectCurrentTrack);

  if (!track) return null;

  const progress = player.duration > 0 ? (player.currentTime / player.duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F16001]/[25%] backdrop-blur-[16px] border border-white/40 gap-[96px] rounded-t-[20px] px-[20px] h-[140px] flex items-center justify-between">
      <div className="flex items-center gap-x-[40px]">
        {track.image ? (
          <div
            style={{
              backgroundImage: `url(http://localhost:5014${track.image})`,
            }}
            className="w-[90px] h-[90px] rounded-[20px] bg-cover bg-center"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-white/10" />
        )}
        <div className="text-white font-inter gap-[8px]">
          <div className="font-semibold text-[24px]">{shorten(track.name)}</div>
          <div className="font-light text-[20px]">{shorten(track.artist)}</div>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={Math.max(0, player.duration || 0)}
        value={Math.min(player.currentTime, player.duration || player.currentTime)}
        onChange={(e) => dispatch(playerActions.seek(Number(e.target.value)))}
        className="flex-1 bg-[#F16001]/[25%] rounded-full"
      />

      <div className="w-[144px] flex flex-col items-center gap-[16px] mt-[22px]">
        <div className="flex flex-row items-center w-full justify-between">
          <button onClick={() => dispatch(playerActions.prev())}>
            <img
              src="/assets/icons/icon25.svg"
              alt="icon"
              className="h-[24px]"
            />
          </button>

          <button onClick={() => dispatch(playerActions.togglePlay())}>
            <img
              src="/assets/icons/icon26.svg"
              alt="icon"
              className="h-[26.67px]"
            />
          </button>

          <button onClick={() => dispatch(playerActions.next())}>
            <img
              src="/assets/icons/icon27.svg"
              alt="icon"
              className="h-[24px]"
            />
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
      <div className="flex flex-row items-center font-semibold font-inter gap-[40px] text-white">
        <div className="text-[24px]">{formatTime(player.currentTime)}</div>
        <div className="text-[18px]">•••</div>
      </div>
    </div>
  );
}