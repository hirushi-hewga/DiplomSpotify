import { useDispatch, useSelector } from "react-redux";



import { useCallback, useEffect, useMemo, useState } from "react";

import { apiFetch } from "../../../../api/apiClient.ts";
import { getUser } from "../../../../store/slice/userSlice.ts";
import { size } from "zod/v4";
import { playerActions } from "../../../../store/slice/playerSlice.ts";


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


const AlbumsPage = ({sidebarOpen=false}) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const shorten = (text, max = 40) => {
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

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
      <div className="w-full flex flex-col" style={{ rowGap: `${sidebarOpen ? "54px" : "100px"}` }}>
        <div className="w-full flex flex-col" style={{ rowGap: `${sidebarOpen ? "28px" : "40px"}` }}>
          <div className="font-semibold font-poppins text-[#DB6316]"
            style={{ fontSize: `${sidebarOpen ? "36px" : "48px"}` }}
          >Your liked albums</div>
          <div className={`w-full flex justify-between overflow-hidden items-center ${!album ? "h-0" : (sidebarOpen ? "h-[373px] gap-x-[30px]" : "h-[432px] gap-x-[48px]")}`}
               style={{
                 height: `${!album ? "0px" : (sidebarOpen ? "373px" : "432px")}`,
                 columnGap: `${sidebarOpen ? "30" : "48"}px`,
               }}
          >
            <img
              src={`http://localhost:5014${album?.image}`}
              className="h-full rounded-[48px]"
            />
            <div className={`flex-1 flex flex-col overflow-y-auto ${sidebarOpen ? "h-[296px] gap-y-[14px]" : "h-[380px] gap-y-[34px]"}`}>
              {tracks.map((t, index) => (
                <div key={t.id} onClick={() => dispatch(playerActions.playTrack({ track: t, queue: tracks }))} className={`group w-full flex flex-row rounded-[20px] px-[28px] hover:cursor-pointer hover:border hover: justify-between items-center text-[#DB6316] ${sidebarOpen ? "min-h-[53px] gap-y-[28px]" : "min-h-[59px] gap-y-[48px]"}`}>
                  <div className="flex flex-row items-center gap-x-[28px]">
                    <div className="w-[18px] font-semibold gap-3 flex items-center font-poppins text-[24px] text-[#515050]">
                      <span className="group-hover:hidden">
                        {index + 1}.
                      </span>
                      <img
                        src="/assets/icons/icon24.svg"
                        alt="icon"
                        className="h-[14px] hidden group-hover:block"
                      />
                    </div>
                    <div className="font-inter">
                      <div className={`font-semibold text-[22px]`}>{shorten(t.name)}</div>
                      <div className={`font-light text-[16px] text-[white]`}>{shorten(album?.artist)}</div>
                    </div>
                  </div>
                  <div className="font-semibold font-inter flex flex-row items-center gap-x-[64px]">
                    <div className="text-[24px]">{formatTime(t.duration)}</div>
                    <div className="text-[18px] text-white leading-none">•••</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={`justify-between flex flex-wrap overflow-hidden ${sidebarOpen ? "max-h-[287px]" : "max-h-[350px]"}`}>
          {likedAlbums.map(a => (
            <div key={a.id} className="flex flex-col justify-between items-center hover:cursor-pointer"
                 style={{
                   width: sidebarOpen ? "233px" : "287px",
                   height: sidebarOpen ? "284px" : "350px",
                 }}
                 onClick={() => {setAlbum(a)}}
            >
              <img
                src={`http://localhost:5014${a.image}`}
                style={{
                  width: sidebarOpen ? "233px" : "287px",
                  height: sidebarOpen ? "233px" : "287px"
                }}
                className={`${sidebarOpen ? "rounded-[50px]" : "rounded-[36px]"}`}
              />
              <div className="font-inter text-white text-center">
                <div className={`font-normal leading-none ${sidebarOpen ? "text-[16px]" : "text-[20px]"}`}>{a.name}</div>
                <div className={`font-extralight ${sidebarOpen ? "text-[14px]" : "text-[18px]"}`}>{a.tracksCount} tracks</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col" style={{ rowGap: `${sidebarOpen ? "28px" : "40px"}` }}>
        <div className="font-semibold font-poppins text-[#DB6316]"
             style={{ fontSize: `${sidebarOpen ? "36px" : "48px"}` }}
        >Albums you can like</div>
        <div className={`justify-between flex flex-wrap overflow-hidden ${sidebarOpen ? "max-h-[300px]" : "max-h-[354px]"}`}>
          {albums.map(a => (
            <div key={a.id} className="flex flex-col justify-between items-center hover:cursor-pointer"
                 style={{
                   width: sidebarOpen ? "233px" : "287px",
                   height: sidebarOpen ? "284px" : "350px",
                 }}
                 onClick={() => {setAlbum(a)}}
            >
              <img
                src={`http://localhost:5014${a.image}`}
                style={{
                  width: sidebarOpen ? "233px" : "287px",
                  height: sidebarOpen ? "233px" : "287px"
                }}
                className={`${sidebarOpen ? "rounded-[50px]" : "rounded-[36px]"}`}
              />
              <div className="h-[25px] aspect-square rounded-full bg-[#FF934C]">
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AlbumsPage;