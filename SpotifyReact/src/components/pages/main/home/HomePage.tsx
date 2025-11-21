import { NavLink } from "react-router-dom"
import { useGetAlbumsQuery } from "services/album"
import AlbumTile from "./AlbumTile";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css'
import { useGetTracksQuery } from "services/track";
import PopularTrackTile from "./PopularTrackTile";
import IncompletelyTrackTile from "./IncompletelyTrackTile";
import { useGetArtistsQuery } from "services/artist";
import FavoriteArtistTile from "./FavoriteArtistTile";
import { useGetPlaylistsQuery } from "services/playlist";
import PlaylistTile from "./PlaylistTile";

const HomePage = () => {
  const {data: albums} = useGetAlbumsQuery({
    PageIndex: 0,
    PageSize: 10,
    isRandom: true,
  });

  const {data: tracks} = useGetTracksQuery({
    PageIndex: 0,
    PageSize: 6,
    IsRandom: true,
  })

  const {data: IncompletelyTracks} = useGetTracksQuery({
    PageIndex: 0,
    PageSize: 12,
    IsRandom: true,
  })

  const {data: favoriteArtists} = useGetArtistsQuery({
    PageIndex: 0,
    PageSize: 5,
    IsRandom: true,
  })

  const {data: playlists} = useGetPlaylistsQuery({
    PageIndex: 0,
    PageSize: 15,
    IsRandom: true
  })

  return (
    <div className="w-full relative">
      <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px] pb-[40px]"/>
      <div className="ml-[50px] relative z-10 pb-[40px]">
        <div className="flex flex-row font-roboto font-normal text-[#B60A31] text-lg py-[35px]">
          <NavLink to="/favorite" className="pr-[30px]">
            Favorite music
          </NavLink>
          <NavLink to="/playlists" className="">
            Your playlists
          </NavLink>
        </div>
        <div className="flex flex-col justify-start items-start">
          <span className="font-montserrat font-semibold text-[#B60A31] text-2xl">Personal recommendations</span>

          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={7}
            spaceBetween={1}
            navigation
            className="mt-[22px] w-full ml-[0px]"
            style={{
              margin: 0,
              padding: 0
            }}>

            {albums ? albums.data.map((item) => (
                <SwiperSlide key={item.id} style={{padding: 0, margin: 0}}>
                  <div className="my-[15px]">
                    <AlbumTile album={item}/>
                  </div>
                </SwiperSlide>
            )) : null}

          </Swiper>
        </div>
        <div className="flex mt-[50px]">
          <div className="flex flex-col">
            <span className="font-montserrat font-semibold text-[#B60A31] text-2xl">Popular music</span>

            {tracks ? tracks.data.map((item) => (
              <div className="my-[15px]" key={item.id}>
                <PopularTrackTile track={item}/>
              </div>
            )) : null}
          </div>
          <div className="flex flex-col ml-[50px] w-[70%]">
            <div className="w-full">
              <span className="font-montserrat font-semibold text-[#B60A31] text-2xl">Incompletely reproduced</span>
              <Swiper
                modules={[Pagination, Navigation]}
                slidesPerView={4}
                spaceBetween={1}
                navigation
                className="p-0 m-0 ">

                {IncompletelyTracks ? IncompletelyTracks.data.map((item) => (
                  <SwiperSlide key={item.id} style={{padding: 0, margin: 0}}>
                    <div className="my-[15px]">
                      <IncompletelyTrackTile track={item}/>
                    </div>
                  </SwiperSlide>
                )) : null}

              </Swiper>
            </div>
            <div>
              <span className="font-montserrat font-semibold text-[#B60A31] text-2xl">Your favourite artists</span>
              <Swiper
                modules={[Pagination, Navigation]}
                slidesPerView={5}
                spaceBetween={1}
                navigation
                className="p-0 m-0 ">

                {favoriteArtists ? favoriteArtists.data.map((item) => (
                  <SwiperSlide key={item.id} style={{padding: 0, margin: 0}}>
                    <div className="my-[15px]">
                      <FavoriteArtistTile artist={item}/>
                    </div>
                  </SwiperSlide>
                )) : null}

              </Swiper>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start mt-[30px]">
          <span className="font-montserrat font-semibold text-[#B60A31] text-2xl">Your playlists</span>
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={7}
            spaceBetween={1}
            navigation
            className="mt-[22px] w-full ml-[0px]"
            style={{
              margin: 0,
              padding: 0
            }}>

            {playlists ? playlists.data.map((item) => (
                <SwiperSlide key={item.id} style={{padding: 0, margin: 0}}>
                  <div className="my-[15px]">
                    <PlaylistTile playlist={item}/>
                  </div>
                </SwiperSlide>
            )) : null}

          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default HomePage