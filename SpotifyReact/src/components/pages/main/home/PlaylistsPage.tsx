import { Button } from "components/ui/Button.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
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


const PlaylistsPage = ({playlistModalOpenHandler=()=>{}, sidebarOpen=false}) => {
  const user = useSelector(getUser);

  const [playlists, setPlaylists] = useState<any[]>([]);
  const [playlistsLoading, setPlaylistsLoading] = useState(false);
  const [playlistsError, setPlaylistsError] = useState<string | null>(null);



  const playlistsUrl = useMemo(() => {
    if (!user?.id) return null;
    return `/api/playlist/list?userId=${encodeURIComponent(user.id)}`;
  }, [user?.id]);



  const refreshPlaylists = useCallback(async () => {
    if (!playlistsUrl) return;

    setPlaylistsLoading(true);
    setPlaylistsError(null);

    try {
      const res = await apiFetch(playlistsUrl, { method: "GET" });
      const payload = await unwrapServiceResponse<any[] | any>(res);

      setPlaylists(payload);
    } catch (e: any) {
      setPlaylistsError(e.message || "Failed to load playlists");
      setPlaylists([]);
    } finally {
      setPlaylistsLoading(false);
    }
  }, [playlistsUrl]);



  useEffect(() => {
    refreshPlaylists();
  }, [refreshPlaylists]);

  return (
    <div className="w-full flex flex-col flex-1">
      <div className="w-full relative">
        <img
          src="/assets/main_images/image13.png"
          alt="image"
          className="w-full rounded-[20px]"
        />
        <div className="w-full mb-[16px] px-[32px] flex flex-row justify-between flex-1 absolute bottom-0 z-10">
          <div className={`font-semibold font-poppins text-[${sidebarOpen ? "40" : "48"}px] text-white`}>RECOMMENDED</div>
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
        <div className={`font-semibold font-poppins ${sidebarOpen ? "text-[52px]" : "text-[56px]"} text-[#F16001]`}>YOUR PLAYLISTS</div>
        <div className={sidebarOpen ? "w-[235px] h-[40px]" : "w-[227px] h-[44px]"}>
          <Button
            variant="transparent"
            className="bg-[#F16001]/[20%] font-semibold font-inter text-[16px] flex gap-[12px]"
            onClick={playlistModalOpenHandler}
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
      <div className={`grid grid-cols-5 justify-between mt-[100px] ${sidebarOpen ? "gap-x-[50px] gap-y-[32px]" : "gap-x-[60px] gap-y-[48px]"}`}>
        {playlists.map(p => (
          <div key={p.id} className="flex flex-col justify-between items-center"
               style={{
                 width: sidebarOpen ? "233px" : "287px",
                 height: sidebarOpen ? "284px" : "350px",
               }}
          >
            <div
              style={{
                backgroundImage: `url(http://localhost:5014/data/${p.image})`,
                color: `${p.isBlackTitle ? "black" : "white"}`,
                width: sidebarOpen ? "233px" : "287px",
                height: sidebarOpen ? "233px" : "287px",
                fontSize: sidebarOpen ? "16px" : "24px"
              }}
              className={`bg-contain rounded-[36px] flex items-center justify-center font-semibold font-poppins`}
            >
              {p.title.toUpperCase()}
            </div>
            <div className="font-inter text-white text-center">
              <div className={`font-normal leading-none ${sidebarOpen ? "text-[16px]" : "text-[20px]"}`}>{p.name}</div>
              <div className={`font-extralight ${sidebarOpen ? "text-[14px]" : "text-[18px]"}`}>0 listenings</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlaylistsPage;