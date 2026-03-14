import { useState } from "react";
import { useUserPlaylists } from "../../../../hooks/queries/useUserPlaylists.ts";
import { useSelector } from "react-redux";
import { getUser } from "../../../../store/slice/userSlice.ts";
import VolumeSlider from "components/ui/VolumeSlider.tsx";

const RoadPlaylistsPage = () => {
  const user = useSelector(getUser);
  const [value, setValue] = useState(65);

  const { data: playlists = [] } = useUserPlaylists(user?.id, 10);

  return (
    <div className="w-full flex flex-col gap-[64px]">
      {playlists.length > 0 && (
        <div className="flex flex-row flex-wrap px-[20px] py-[16px] font-inter rounded-[8px] border border-white/80 gap-[27px] justify-between overflow-hidden max-h-[358px] text-[24px] text-white">
          {playlists.map((p) => (
            <div key={p.id} className="w-[295px] h-[145px] flex flex-col justify-between">
              <img
                src={`http://localhost:5014/data/${p.image}`}
                className="w-full h-[100px] object-cover rounded-[8px]"
              />
              {p.name}
            </div>
          ))}
        </div>
      )}

      {playlists.length > 0 && (
        <div className="w-full flex flex-col gap-[24px] font-semibold font-poppins">
          <div className="text-[32px] text-[#F16001]">Continue playing...</div>
          <div className="w-full h-[281px] flex gap-[32px] pr-[16px]">
            <div
              className="bg-center bg-cover px-[32px] py-[16px] rounded-[20px] flex items-end h-full flex-1"
              style={{ backgroundImage: `url(http://localhost:5014/data/${playlists[0].image})` }}
            >
              <div className="w-full h-[64px] flex justify-between font-semibold font-poppins text-[40px] text-white">
                {playlists[0].name}
                <div className="w-[64px] h-[64px] flex items-center justify-center rounded-full backdrop-blur-[16px] border border-white/80">
                  <img src="/assets/icons/icon22.svg" className="h-[14px]" />
                </div>
              </div>
            </div>

            <div className="w-[40px] gap-[16px] h-full flex flex-col items-center">
              <div className="w-[32px] h-full">
                <VolumeSlider value={value} onChange={setValue} />
              </div>
              <img src="/assets/icons/icon29.svg" className="w-[40px]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadPlaylistsPage;