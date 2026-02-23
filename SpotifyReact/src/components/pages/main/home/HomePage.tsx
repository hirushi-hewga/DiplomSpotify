import Header from "components/main/Header.tsx";
import Footer from "components/main/Footer.tsx";
import { Button } from "components/ui/Button.tsx";
import Sidebar from "components/main/Sidebar.tsx";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useVisibleCount } from "../../../../hooks/useVisibleCount.tsx";
import { apiFetch } from "../../../../api/apiClient.ts";
import { useSelector } from "react-redux";
import { getUser } from "../../../../store/slice/userSlice.ts";

type ServiceResponse<T = any> = {
  isSuccess: boolean;
  message: string;
  payload: T | null;
};

async function unwrapServiceResponse<T>(res: Response): Promise<T> {
  const json = (await res.json().catch(() => null)) as ServiceResponse<T> | null;

  if (!json) throw new Error("Empty response from server");
  if (!res.ok) throw new Error(json.message || "Request failed");
  if (!json.isSuccess) throw new Error(json.message || "Operation failed");

  return json.payload as T;
}

const HomePage = () => {
  const user = useSelector(getUser);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarOpenHandler = () => setSidebarOpen(!sidebarOpen);

  const myPlaylists = useVisibleCount({
    itemWidth: 260,
    gapX: 64,
    paddingX: 40,
    rows: 2,
  });

  const [artists, setArtists] = useState<any[]>([]);
  const [artistsLoading, setArtistsLoading] = useState(false);
  const [artistsError, setArtistsError] = useState<string | null>(null);

  const artistsUrl = useMemo(() => {
    if (!user?.id) return null;
    return `/api/artist/favourites?userId=${encodeURIComponent(user.id)}`;
  }, [user?.id]);

  const refreshArtists = useCallback(async () => {
    if (!artistsUrl) return;

    setArtistsLoading(true);
    setArtistsError(null);

    try {
      const res = await apiFetch(artistsUrl, { method: "GET" });
      const payload = await unwrapServiceResponse<any[] | any>(res);

      setArtists(Array.isArray(payload) ? payload : payload ? [payload] : []);
    } catch (e: any) {
      setArtistsError(e.message || "Failed to load artists");
      setArtists([]);
    } finally {
      setArtistsLoading(false);
    }
  }, [artistsUrl]);

  // ✅ тягнемо коли з’явився/змінився userId
  useEffect(() => {
    refreshArtists();
  }, [refreshArtists]);



  return (
    <div className="w-full bg-[#0F0F10] relative flex flex-col items-center overflow-hidden z-0">
      <Header isSidebarOpen={sidebarOpen} sidebarOpenHandler={sidebarOpenHandler} />
      <div className="w-[1625px] mt-[64px] mr-[64px] flex gap-x-[64px]">
        <Sidebar isOpen={sidebarOpen}/>
        <div className="flex flex-col flex-1 gap-y-[64px]">
          <div className="w-full flex flex-col gap-[32px]">
            <div className="flex items-center gap-[32px] font-light font-inter text-[16px] text-white">
              <div className="font-bold text-[#F16001]">All</div>
              <div>My Playlists</div>
              <div>Collections</div>
              <div className="w-[227px] h-[44px]">
                <Button
                  variant="transparent"
                  className="bg-[#F16001]/[20%] font-semibold font-inter text-[16px] flex gap-[12px]"
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
            <div className="w-full px-[20px] py-[16px] grid grid-rows-2 grid-flow-col gap-x-[64px] gap-y-[24px] [grid-auto-columns:260px] rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]">
              <div className="w-[260px] h-[70px] bg-neutral-800"></div>
              <div className="w-[260px] h-[70px] bg-neutral-800"></div>
              <div className="w-[260px] h-[70px] bg-neutral-800"></div>
              <div className="w-[260px] h-[70px] bg-neutral-800"></div>
              <div className="w-[260px] h-[70px] bg-neutral-800"></div>
              <div className="w-[260px] h-[70px] bg-neutral-800"></div>
              <div className="w-[260px] h-[70px] bg-neutral-800"></div>
              <div className="w-[260px] h-[70px] bg-neutral-800"></div>
            </div>
          </div>
          <div ref={myPlaylists.ref} className="w-full grid grid-rows-1 grid-flow-col justify-between bg-neutral-900">
            <div className="w-[233px] h-[267px] bg-neutral-800"></div>
            <div className="w-[233px] h-[267px] bg-neutral-800"></div>
            <div className="w-[233px] h-[267px] bg-neutral-800"></div>
            <div className="w-[233px] h-[267px] bg-neutral-800"></div>
            <div className="w-[233px] h-[267px] bg-neutral-800"></div>
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Quick Picks &gt;</div>
            <div className="w-full px-[20px] py-[16px] grid grid-rows-3 grid-flow-col gap-y-[16px] [grid-auto-columns:383px] justify-between rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]">
              <div className="w-[383px] h-[70px] bg-neutral-800"></div>
              <div className="w-[383px] h-[70px] bg-neutral-800"></div>
              <div className="w-[383px] h-[70px] bg-neutral-800"></div>
              <div className="w-[383px] h-[70px] bg-neutral-800"></div>
              <div className="w-[383px] h-[70px] bg-neutral-800"></div>
              <div className="w-[383px] h-[70px] bg-neutral-800"></div>
              <div className="w-[383px] h-[70px] bg-neutral-800"></div>
              <div className="w-[383px] h-[70px] bg-neutral-800"></div>
              <div className="w-[383px] h-[70px] bg-neutral-800"></div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Recently Played &gt;</div>
            <div className="">

            </div>
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Last Releases of your selected artists &gt;</div>
            <div className="w-full h-[345px] py-[16px] px-[16px] flex-col grid grid-rows-1 grid-flow-col [grid-auto-columns:233px] gap-x-[24px] rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]">
              {artists.length === 0 ? (
                <div className="opacity-70 text-[24px] font-semibold font-poppins">No favourite artists yet</div>
              ) : (
                artists.map((a) => (
                  <div key={a.id} className="w-[233px] h-full flex flex-col justify-between items-center">
                    <img
                      src={`http://localhost:5014/data/${a.image}`}
                      className="h-[233px] rounded-full"
                    />
                    <div className="font-semibold font-inter text-[24px]">{a.name ?? "Unknown artist"}</div>
                    <div className="font-light font-inter text-[20px]">Artist</div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">TOP mixes from your favourite &gt;</div>
            <div className="">

            </div>
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Wise choice - recommended &gt;</div>
            <div className="">

            </div>
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">SIMILAR TO &gt;</div>
            <div className="">

            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-[148px]"/>
    </div>
  )
}

export default HomePage;