import PlayerDownload from "components/main/icon/PlayerDownload"
import PlayerMix from "components/main/icon/PlayerMix"
import PlayerMore from "components/main/icon/PlayerMore"
import PlayerPlay from "components/main/icon/PlayerPlay"
import PlayerSearch from "components/main/icon/PlayerSearch"
import { IPlaylist } from "interfaces/playlist"
import List from "./list/List"
import { useLocation } from "react-router-dom";
import { useGetTracksQuery } from "services/playlistTrack"
import { IPlaylistTrackFilter } from "interfaces/playlistTrack"
import { useContext, useEffect, useState } from "react"
import { PlayerContext } from "components/main/player/PlayerProvider"
import { API_URL } from "utils/envData"

interface IPlaylsitPageProps {
  playlist: IPlaylist
}

const PlaylistPage: React.FC = () => {
  const location = useLocation();
  const playlist = location.state?.playlist as IPlaylist;

  const [filter, setFilter] = useState<IPlaylistTrackFilter>({
    PageIndex: 0,
    PageSize: 10,
    PlaylistId: playlist.id
  });

  const imageSrc = API_URL + "/Images/1200_";

  const [allTracks, setAllTracks] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { playTracks } = useContext(PlayerContext)!;
  const { data, isFetching } = useGetTracksQuery(filter);

  useEffect(() => {
    if (data) {
      if (data.data.length < filter.PageSize) {
        setHasMore(false);
      }

      setAllTracks(prevTracks => [...prevTracks, ...data.data]);
    }
  }, [data]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isFetching && hasMore) {
      setFilter(prev => ({ ...prev, PageIndex: prev.PageIndex + 1 }));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, hasMore]);

  return (
    <div className="">
      <div className="w-full relative">
  <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
  <div className="w-full relative z-10 flex flex-row">
    <div className="relative h-[225px] w-[368px] mr-[40px] rounded-l-[14px] overflow-hidden">
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))`,
        }}
      />
      <img
        src={imageSrc.concat(playlist.image)}
        alt="favorite"
        className="h-full w-full object-cover"
      />
    </div>
    <div className="flex flex-col">
      <span className="font-roboto font-semibold text-white text-base pt-[65px]">
        Playlist
      </span>
      <h2 className="font-montserrat font-bold text-white text-7xl">
        {playlist.name}
      </h2>
    </div>
  </div>
</div>

      <div className="w-full relative mt-[10px]">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10">
          <div className="flex flex-row pl-[54px] py-[20px] text-white items-center">
            
            <button onClick={allTracks.length ? () => playTracks(allTracks) : () => {}}>
              <PlayerPlay className="mr-[20px]"/>
            </button>
            <PlayerMix className="mr-[20px]"/>
            <PlayerDownload className="mr-[20px]"/>
            <PlayerMore className="mr-[20px]"/>
            <PlayerSearch className="mr-[20px]"/>
            
          </div>
        </div>
      </div>
      <div className="w-full relative mt-[10px]">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10">
          <div className="flex flex-col px-[54px] py-[16px]">
            
            {allTracks.length ? <List tracks={allTracks}/> : null}

          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistPage