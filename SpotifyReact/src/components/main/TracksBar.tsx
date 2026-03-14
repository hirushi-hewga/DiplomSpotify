import TrackDetails from "components/main/TrackDetails.tsx";
import Queue from "components/main/Queue.tsx";
import { useHomeUi } from "components/ui/HomeUiContext.tsx";

const TracksBar = () => {
  const { trackbarOpen } = useHomeUi();

  return (
    <div className={`z-10 ${!trackbarOpen && "hidden"}`}>
      <div className="w-[369px] px-[20px] py-[32px] rounded-[20px] bg-[#0F0F10]/[10%] border border-white/[80%] text-white">
        <TrackDetails />
        <Queue />
      </div>
    </div>
  );
};

export default TracksBar;