import { useHomeUi } from "components/ui/HomeUiContext.tsx";
import { useDispatch, useSelector } from "react-redux";



import { useCallback, useEffect, useMemo, useState } from "react";



import { apiFetch } from "../../../../api/apiClient.ts";
import { playerActions, selectCurrentTrack, selectIsPlaying } from "../../../../store/slice/playerSlice.ts";
import { getUser } from "../../../../store/slice/userSlice.ts";
import { clsx } from "clsx";


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

type Album<T = any> = {
  id: string;
  name: string;
  image: string;
  artist: string;
}

const shorten = (text, max = 40) => {
  return text.length > max ? text.slice(0, max) + "..." : text;
};


const AlbumsPage = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const track = useSelector(selectCurrentTrack);
  const isPlaying = useSelector(selectIsPlaying);


  const { sidebarOpen, trackbarOpen } = useHomeUi();

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  const [album, setAlbum] = useState<Album>();

  const [tracks, setTracks] = useState<any[]>([]);
  const [tracksLoading, setTracksLoading] = useState(false);
  const [tracksError, setTracksError] = useState<string | null>(null);

  const [albums, setAlbums] = useState<any[]>([]);
  const [albumsLoading, setAlbumsLoading] = useState(false);
  const [albumsError, setAlbumsError] = useState<string | null>(null);

  const [likedAlbums, setLikedAlbums] = useState<any[]>([]);
  const [likedAlbumsLoading, setLikedAlbumsLoading] = useState(false);
  const [likedAlbumsError, setLikedAlbumsError] = useState<string | null>(null);



  const albumsUrl = useMemo(() => {
    return `/api/album/paged?pageSize=5`;
  }, []);

  const likedAlbumsUrl = useMemo(() => {
    if (!user?.id) return null;
    return `/api/album/liked?userId=${encodeURIComponent(user.id)}`;
  }, [user?.id]);

  const tracksUrl = useMemo(() => {
    if (!album?.id) return null;
    return `/api/track/album?albumId=${encodeURIComponent(album.id)}`;
  }, [album?.id]);





  const refreshAlbums = useCallback(async () => {
    if (!albumsUrl) return;

    setAlbumsLoading(true);
    setAlbumsError(null);

    try {
      const res = await apiFetch(albumsUrl, { method: "GET" });
      const payload = await unwrapServiceResponse<any[] | any>(res);

      setAlbums(payload ? payload.items : []);
    } catch (e: any) {
      setAlbumsError(e.message || "Failed to load albums");
      setAlbums([]);
    } finally {
      setAlbumsLoading(false);
    }
  }, [albumsUrl]);


  const refreshLikedAlbums = useCallback(async () => {
    if (!likedAlbumsUrl) return;

    setLikedAlbumsLoading(true);
    setLikedAlbumsError(null);

    try {
      const res = await apiFetch(likedAlbumsUrl, { method: "GET" });
      const payload = await unwrapServiceResponse<any[] | any>(res);

      setLikedAlbums(payload ? payload : []);
    } catch (e: any) {
      setLikedAlbumsError(e.message || "Failed to load albums");
      setLikedAlbums([]);
    } finally {
      setLikedAlbumsLoading(false);
    }
  }, [likedAlbumsUrl]);


  const getTracks = useCallback(async () => {
    if (!tracksUrl) return;

    setTracksLoading(true);
    setTracksError(null);

    try {
      const res = await apiFetch(tracksUrl, { method: "GET" });
      const payload = await unwrapServiceResponse<any[] | any>(res);

      setTracks(payload ? payload : []);
    } catch (e: any) {
      setTracksError(e.message || "Failed to load tracks");
      setTracks([]);
    } finally {
      setTracksLoading(false);
    }
  }, [tracksUrl]);



  useEffect(() => {
    refreshAlbums();
    refreshLikedAlbums();
    getTracks();
  }, [refreshAlbums, refreshLikedAlbums, getTracks]);
  
  return (
    <div className="w-full flex flex-col gap-y-[120px] flex-1">
      <div className="w-full flex flex-col" style={{ rowGap: `${sidebarOpen||trackbarOpen ? "54px" : "100px"}` }}>
        <div className="w-full flex flex-col" style={{ rowGap: `${sidebarOpen||trackbarOpen ? "28px" : "40px"}` }}>
          <div className="font-semibold font-poppins text-[#DB6316]"
            style={{ fontSize: `${sidebarOpen||trackbarOpen ? "36px" : "48px"}` }}
          >Your liked albums</div>
          <div className={`w-full flex justify-between overflow-hidden items-center ${!album ? "h-0" : (sidebarOpen||trackbarOpen ? "h-[373px] gap-x-[30px]" : "h-[432px] gap-x-[48px]")}`}
               style={{
                 height: `${!album ? "0px" : (sidebarOpen||trackbarOpen ? "373px" : "432px")}`,
                 columnGap: `${sidebarOpen||trackbarOpen ? "30" : "48"}px`,
               }}
          >
            <img
              src={`http://localhost:5014${album?.image}`}
              className="h-full rounded-[48px]"
            />
            <div className={`flex-1 flex flex-col overflow-y-auto ${sidebarOpen||trackbarOpen ? "h-[312px] gap-y-[12px]" : "h-[372px] gap-y-[32px]"}`}>
              {tracks.map((t, index) => (
                <div key={t.id} onClick={() => {if (track?.id !== t.id) dispatch(playerActions.playTrack({ track: t, queue: tracks })); else dispatch(playerActions.togglePlay());}} className={clsx(
                  "min-h-[69px] group w-full flex flex-row items-center justify-between rounded-[8px] text-[#DB6316] hover:cursor-pointer transition-all duration-200 ease-out",
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
                      <div className={`font-light text-[16px] text-[white]`}>{shorten(album?.artist, 25)}</div>
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
        <div className={`justify-between flex ${!(sidebarOpen&&!trackbarOpen) && "gap-x-[64px]"} flex-wrap overflow-hidden max-h-[284px]`}>
          {likedAlbums.map(a => (
            <div key={a.id} className="w-[230px] h-[284px] flex flex-col justify-between items-center hover:cursor-pointer"
                 onClick={() => {setAlbum(a)}}
            >
              <img
                src={`http://localhost:5014${a.image}`}
                className={`w-[230px] h-[230px] rounded-[50px]`}
              />
              <div className="font-inter text-white text-center">
                <div className={`font-bold leading-none text-[16px]`}>{shorten(a.name, 20)}</div>
                <div className={`font-light text-[14px]`}>{a.tracksCount} tracks</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {albums.length > 0 && (
        <div className="w-full flex flex-col gap-[32px] text-[white]">
          <div className="font-semibold font-poppins text-[32px] text-[#F16001]">SIMILAR TO &gt;</div>
          <div className={`w-full ${album?.id === "" ? "h-[325px]" : "h-[365px]"} gap-x-[48px] gap-y-[100px] justify-between flex flex-wrap overflow-hidden`}>
            {albums.map(a => (
              <div key={a.id} className="group flex flex-col gap-y-[44px] items-center hover:cursor-pointer">
                <img
                  src={`http://localhost:5014${a.image}`}
                  onClick={() => {if (album?.id !== a.id) setAlbum(a);}}
                  className={`${album?.id === a.id ? "w-[270px]" : "w-[230px]"} transform-all duration-150 rounded-[50px]`}
                />
                <div className={clsx(album?.id === a.id ? "bg-[#F16001]" : "bg-[#FF934C]", "h-[25px] aspect-square rounded-full relative flex items-center justify-center")}>
                  <div className={clsx(album?.id === a.id ? "border-[3px]" : "group-hover:border-[3px]", "w-[51px] h-[51px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full absolute border-[#FF934C]")}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AlbumsPage;