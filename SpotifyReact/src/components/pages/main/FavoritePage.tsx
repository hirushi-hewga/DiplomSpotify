import PlayerDownload from "components/main/icon/PlayerDownload"
import PlayerMix from "components/main/icon/PlayerMix"
import PlayerPlay from "components/main/icon/PlayerPlay"
import PlayerMore from "components/main/icon/PlayerMore"
import PlayerSearch from "components/main/icon/PlayerSearch"
import List from "./list/List"
import { useGetLikesQuery } from "services/like"
import { ITrackFilter } from "interfaces/track"
import { useContext, useEffect, useState } from "react"
import { PlayerContext } from "components/main/player/PlayerProvider"

const FavoritePage = () => {
  const [filter, setFilter] = useState<ITrackFilter>({
    PageIndex: 0,
    PageSize: 10,
  });

  const [allTracks, setAllTracks] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { playTracks } = useContext(PlayerContext)!;
  const { data, isFetching } = useGetLikesQuery(filter);

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
          <img src="assets/Hearts.png" alt="favorite" className="h-[225px] w-[368px] object-cover"/>
          <div className="flex flex-col">
            <span className="font-roboto font-semibold text-white text-base pt-[65px]">Playlist</span>
            <h2 className="font-montserrat font-bold text-white text-7xl">Favorite songs</h2>
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

export default FavoritePage;
