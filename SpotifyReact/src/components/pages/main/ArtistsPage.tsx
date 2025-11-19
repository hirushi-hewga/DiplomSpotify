import { IArtist, IArtistFilter } from "interfaces/artist";
import { useEffect, useState } from "react";
import { useGetArtistsQuery } from "services/artist";
import ArtistTile from "./ArtistTile";
import { API_URL } from "utils/envData";


const ArtistsPage = () => {
  const [filter, setFilter] = useState<IArtistFilter>({
    PageIndex: 0,
    PageSize: 10,
  });
  const imageSrc = API_URL + "/Images/800_";

  const [allArtists, setArtists] = useState<IArtist[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const {data, isFetching } = useGetArtistsQuery(filter);

  useEffect(() => {
    if (data) {
      if (data.data.length < filter.PageSize) {
        setHasMore(false);
      }

      setArtists(prevArtists => [...prevArtists, ...data.data]);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, hasMore]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isFetching && hasMore) {
      setFilter(prev => ({ ...prev, PageIndex: prev.PageIndex + 1 }));
    }
  };

  return (
    <div className="">
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10 flex flex-row">
          <img src="assets/Microphone.png" alt="favorite" className="my-[31px] ml-[55px] mr-[30px]"/>
          <div className="flex flex-col">
            <span className="font-roboto font-semibold text-white text-base pt-[65px]">Popular</span>
            <h2 className="font-montserrat font-bold text-white text-7xl">Artists</h2>
          </div>
        </div>
      </div>
      <div className="w-full relative mt-[10px]">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10">
          <div className="flex flex-row flex-wrap px-[54px] py-[16px]">
            {allArtists ? allArtists.map((item) => (
              <div key={item.id} className="mx-[15px] my-[25px]">
                <ArtistTile name={item.name} albumsCount={item.albumsCount} tracksCount={item.tracksCount} image={imageSrc.concat(item.image)}/>
              </div>
            )) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtistsPage;