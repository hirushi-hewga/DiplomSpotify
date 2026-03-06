import { Button } from "components/ui/Button.tsx";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useVisibleCount } from "../../../../hooks/useVisibleCount.tsx";
import { apiFetch } from "../../../../api/apiClient.ts";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../store/slice/userSlice.ts";
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

const shorten = (text, max = 20) => {
  return text.length > max ? text.slice(0, max) + "..." : text;
};

const HomePage = ({playlistModalOpenHandler=()=>{}}) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();



  const [artists, setArtists] = useState<any[]>([]);
  const [artistsLoading, setArtistsLoading] = useState(false);
  const [artistsError, setArtistsError] = useState<string | null>(null);

  const [playlists, setPlaylists] = useState<any[]>([]);
  const [playlistsLoading, setPlaylistsLoading] = useState(false);
  const [playlistsError, setPlaylistsError] = useState<string | null>(null);

  const [quickPicks, setQuickPicks] = useState<any[]>([]);
  const [quickPicksLoading, setQuickPicksLoading] = useState(false);
  const [quickPicksError, setQuickPicksError] = useState<string | null>(null);

  const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);
  const [recentlyPlayedLoading, setRecentlyPlayedLoading] = useState(false);
  const [recentlyPlayedError, setRecentlyPlayedError] = useState<string | null>(null);

  const [albums, setAlbums] = useState<any[]>([]);
  const [albumsLoading, setAlbumsLoading] = useState(false);
  const [albumsError, setAlbumsError] = useState<string | null>(null);





  const artistsUrl = useMemo(() => {
    if (!user?.id) return null;
    return `/api/artist/favourites?userId=${encodeURIComponent(user.id)}`;
  }, [user?.id]);

  const playlistsUrl = useMemo(() => {
    if (!user?.id) return null;
    return `/api/playlist/user?userId=${encodeURIComponent(user.id)}`;
  }, [user?.id]);

  const quickPicksUrl = useMemo(() => {
    return `/api/track/paged?pageSize=20`;
  }, []);

  const recentlyPlayedUrl = useMemo(() => {
    if (!user?.id) return null;
    return `/api/track/recently-played?userId=${encodeURIComponent(user.id)}`;
  }, [user?.id]);

  const albumsUrl = useMemo(() => {
    return `/api/album/paged?pageSize=6`;
  }, []);





  const refreshArtists = useCallback(async () => {
    if (!artistsUrl) return;

    setArtistsLoading(true);
    setArtistsError(null);

    try {
      const res = await apiFetch(artistsUrl, { method: "GET" });
      const payload = await unwrapServiceResponse<any[] | any>(res);

      setArtists(payload ? payload : []);
    } catch (e: any) {
      setArtistsError(e.message || "Failed to load artists");
      setArtists([]);
    } finally {
      setArtistsLoading(false);
    }
  }, [artistsUrl]);


  const refreshPlaylists = useCallback(async () => {
    if (!playlistsUrl) return;

    setPlaylistsLoading(true);
    setPlaylistsError(null);

    try {
      const res = await apiFetch(playlistsUrl, { method: "GET" });
      const payload = await unwrapServiceResponse<any[] | any>(res);

      setPlaylists(payload ? payload.items : []);
    } catch (e: any) {
      setPlaylistsError(e.message || "Failed to load playlists");
      setPlaylists([]);
    } finally {
      setPlaylistsLoading(false);
    }
  }, [playlistsUrl]);


  const refreshQuickPicks = useCallback(async () => {
    if (!quickPicksUrl) return;

    setQuickPicksLoading(true);
    setQuickPicksError(null);

    try {
      const res = await apiFetch(quickPicksUrl, { method: "GET" });
      const payload = await unwrapServiceResponse<any[] | any>(res);

      setQuickPicks(payload ? payload.items : []);
    } catch (e: any) {
      setQuickPicksError(e.message || "Failed to load tracks");
      setQuickPicks([]);
    } finally {
      setQuickPicksLoading(false);
    }
  }, [quickPicksUrl]);


  const refreshRecentlyPlayed = useCallback(async () => {
    if (!recentlyPlayedUrl) return;

    setRecentlyPlayedLoading(true);
    setRecentlyPlayedError(null);

    try {
      const res = await apiFetch(recentlyPlayedUrl, { method: "GET" });
      const payload = await unwrapServiceResponse<any[] | any>(res);

      setRecentlyPlayed(payload);
    } catch (e: any) {
      setRecentlyPlayedError(e.message || "Failed to load tracks");
      setRecentlyPlayed([]);
    } finally {
      setRecentlyPlayedLoading(false);
    }
  }, [recentlyPlayedUrl]);


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





  useEffect(() => {
    refreshArtists();
    refreshPlaylists();
    refreshQuickPicks();
    refreshRecentlyPlayed();
    refreshAlbums()
  }, [
    refreshArtists,
    refreshPlaylists,
    refreshQuickPicks,
    refreshRecentlyPlayed,
    refreshAlbums
  ]);


  return (
        <div className="w-full flex flex-col flex-1 gap-y-[64px]">
          <div className="w-full flex flex-col gap-[32px]">
            <div className="flex items-center gap-[32px] font-light font-inter text-[16px] text-white">
              <div className="font-bold text-[#F16001]">All</div>
              <div>My Playlists</div>
              <div>Collections</div>
              <div className="w-[227px] h-[44px]">
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
            {playlists.length > 0 && (
              <div className={`max-h-[196px] w-full px-[20px] py-[16px] gap-x-[64px] gap-y-[24px] text-white font-semibold font-inter text-[16px] overflow-hidden flex flex-wrap rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]`}>
                {playlists.map(p => (
                  <div key={p.id} className="w-[260px] h-[70px] gap-x-[24px] flex flex-row items-center overflow-hidden rounded-[8px] hover:cursor-pointer">
                    <img
                      src={`http://localhost:5014/data/${p.image}`}
                      className="h-full rounded-[8px]"
                    />
                    {p.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[full] max-h-[267px] flex flex-wrap gap-[32px] justify-between overflow-hidden">
            {playlists.map(p => (
              <div key={p.id} className="w-[233px] h-[267px] flex flex-col justify-between items-center">
                <div
                  style={{
                    backgroundImage: `url(http://localhost:5014/data/${p.image})`,
                    color: `${p.isBlackTitle ? "black" : "white"}`
                  }}
                  className="w-[233px] h-[233px] text-[16px] bg-contain rounded-[36px] flex items-center justify-center font-semibold font-poppins"
                >
                  {p.title.toUpperCase()}
                </div>
                <div className="font-inter text-white text-center">
                  <div className="font-light leading-none text-[16px]">{p.name}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Quick Picks &gt;</div>
            {quickPicks.length > 0 && (
              <div className={`w-full max-h-[274px] py-[8px] justify-between text-white font-light font-inter text-[16px] flex flex-wrap overflow-hidden rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]`}>
                {quickPicks.map(t => (
                  <div key={t.id} onClick={() => dispatch(playerActions.playTrack({track: t, queue: quickPicks}))} className="w-[400px] h-[70px] gap-x-[24px] my-[8px] mx-[20px] flex flex-row items-center overflow-hidden rounded-[8px] hover:cursor-pointer">
                    <img
                      src={`http://localhost:5014${t.image}`}
                      className="h-full rounded-[8px]"
                    />
                    {t.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Recently Played &gt;</div>
            {recentlyPlayed.length > 0 && (
              <div className="w-full max-h-[408px] flex flex-wrap justify-between overflow-hidden gap-y-[24px]">
                {recentlyPlayed.map(t => (
                  <div key={t.id} onClick={() => dispatch(playerActions.playTrack({track: t, queue: recentlyPlayed}))} className="w-[480px] h-[120px] flex flex-row items-center gap-x-[24px] hover:cursor-pointer">
                    <img
                      src={`http://localhost:5014${t.image}`}
                      className="h-full rounded-[8px]"
                    />
                    <div className="flex flex-col gap-[12px] leading-[160%] font-inter">
                      <div className="font-semibold text-[24px]">{shorten(t.name, 25)}</div>
                      <div className="font-light text-[20px]">{shorten(t.artist, 25)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Last Releases of your selected artists &gt;</div>
            {artists.length === 0 ? (
              <div className="opacity-60 text-center text-[20px] font-semibold font-poppins">No favourite artists yet</div>
            ) : (
              <div className="w-full h-[345px] flex flex-wrap justify-between overflow-hidden rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]">
                {artists.map(a => (
                  <div key={a.id} className="w-[233px] mx-[16px] py-[16px] h-full flex flex-col justify-between items-center">
                    <img
                      src={`http://localhost:5014${a.image}`}
                      className="h-[233px] rounded-full"
                    />
                    <div className="font-semibold font-inter text-[24px]">{shorten(a.name, 15) ?? "Unknown artist"}</div>
                    <div className="font-light font-inter text-[20px]">Artist</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">TOP mixes from your favourite &gt;</div>
            <div className="">

            </div>
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Wise choice - recommended &gt;</div>
            {quickPicks.length > 0 && (
              <div className={`w-full max-h-[274px] py-[8px] justify-between text-white font-light font-inter text-[16px] flex flex-wrap overflow-hidden rounded-[8px] bg-[#0F0F10]/[10%] border border-white/[80%]`}>
                {quickPicks.map(t => (
                  <div key={t.id} onClick={() => dispatch(playerActions.playTrack({track: t, queue: quickPicks}))} className="w-[400px] h-[70px] gap-x-[24px] my-[8px] mx-[20px] flex flex-row items-center overflow-hidden rounded-[8px] hover:cursor-pointer">
                    <img
                      src={`http://localhost:5014${t.image}`}
                      className="h-full rounded-[8px]"
                    />
                    {t.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-[32px] text-[white]">
            <div className="font-semibold font-poppins text-[32px] text-[#F16001]">SIMILAR TO &gt;</div>
            <div className={`w-full max-h-[304px] justify-between flex flex-wrap overflow-hidden`}>
              {albums.map(a => (
                <div key={a.id} className="w-[230px] h-[304px] flex flex-col justify-between items-center hover:cursor-pointer">
                  <img
                    src={`http://localhost:5014${a.image}`}
                    className={`w-full rounded-[50px]`}
                  />
                  <div className="h-[25px] aspect-square rounded-full flex items-center justify-center bg-[#FF934C]">
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  )
}

export default HomePage;