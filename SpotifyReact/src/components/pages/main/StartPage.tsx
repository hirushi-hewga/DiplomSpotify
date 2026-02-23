import { Button } from "components/ui/Button.tsx";
import "swiper/css";
import Footer from "components/main/Footer.tsx";
import Header from "components/main/Header.tsx";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#0F0F10] relative flex flex-col items-center overflow-hidden z-0">
      <div className="w-[41.7vw] h-[74.1vh] rounded-[100%] absolute left-[58.7vw] top-[84vh] bg-[#A5180C] opacity-45 blur-[200px] z-[-1]"/>
      <div className="w-[41.7vw] h-[74.1vh] rounded-[100%] absolute left-[-12.4vw] top-[168vh] bg-[#FE7C1B] opacity-45 blur-[200px] z-[-1]"/>
      <div className="w-[41.7vw] h-[74.1vh] rounded-[100%] absolute left-[82.7vw] top-[238.9vh] bg-[#FE7C1B] opacity-45 blur-[200px] z-[-1]"/>
      <div className="w-[41.7vw] h-[74.1vh] rounded-[100%] absolute left-[-24.6px] top-[340.4vh] bg-[#FE7C1B] opacity-45 blur-[200px] z-[-1]"/>
      <div className="bg-gradient-to-r from-[#ff6f00] to-[#a5170b] relative w-[100vw] h-[100.4vh] z-[0] overflow-hidden">
        <img
          src="/assets/main_images/image1.png"
          alt="decorative background"
          className="h-[94.1vh] absolute left-[53.83vw] -translate-x-1/2 bottom-0 z-[-1]"
        />
        <Header signInTextColor="#96190D"/>
        <div className="w-[428px] h-[240px] absolute top-[300px] left-[118px] text-white flex">
          <div className="absolute top-0 font-extralight font-inter text-[32px]">General Views</div>
          <div className="absolute bottom-0 font-poppins text-[152px]">10.9M</div>
        </div>
        <div className="w-full h-[370px] absolute bottom-0 overflow-hidden backdrop-blur-[8.3px] border-black/[80%] border-[1px]">
          <div className="w-[367px] h-[49px] absolute left-[120px] top-[37px] flex">
            <div className="w-[114px] h-full ">
              <Button
                variant="shadow"
                className="text-[16px]"
              >
                Views
              </Button>
            </div>
            <div className="w-[113px] h-full absolute left-[126px] ">
              <Button
                variant="transparent"
                className="text-[16px]"
              >
                Listenings
              </Button>
            </div>
            <div className="w-[116px] h-full absolute left-[251px] ">
              <Button
                variant="transparent"
                className="text-[16px]"
              >
                Downloads
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1705px] h-[1024px] mt-[28px] flex items-center justify-between ">
        <div className="w-[637px] h-[609px]  flex flex-col justify-between">
          <div className="w-full h-[160px] font-semibold leading-none font-poppins text-[76px] text-[#DB6316] ">
            SOME WORDS ABOUT ECHO
          </div>
          <div className="w-[619px] h-[305px] flex flex-col justify-between font-normal font-inter text-[20px] leading-[128.8%] text-white ">
            <div className="w-[619px] h-[103px] ">
              Echo is a modern music service for those who value freedom and comfort. We have created a platform where everyone can listen to their favorite music without restrictions, unnecessary subscriptions and complicated rules.
            </div>
            <div className="w-[619px] h-[103px] ">
              Echo allows you to listen to tracks without an Internet connection, easily create your own playlists and discover new music every day. All basic features are available for free so that you can focus on the main thing - music.
            </div>
            <div className="w-[619px] h-[51px] ">
              We strive to make the music experience simple, fast and enjoyable for every user.
            </div>
          </div>
          <div className="w-[276px] h-[64px]">
            <Button
              variant="transparent"
              className="flex flex-row justify-between"
            >
              <span className="ml-[29px] font-poppins">Read more</span>
              <div className="w-[64px] h-[64px] rounded-full border-white/[80%] border-[1px] flex items-center justify-center">
                <img
                  src="/assets/icons/icon1.svg"
                  alt="icon"
                />
              </div>
            </Button>
          </div>
        </div>
        <img
          src="/assets/main_images/image2.png"
          alt="decorative background"
          className="h-[1024px]"
        />
      </div>
      <div className="w-[1680px] h-[542px] mt-[123px] flex items-center ">
        <div className="w-[847px] h-[542px] flex flex-col justify-between text-white">
          <div className="w-full h-[251px] flex flex-row justify-between ">
            <div className="w-[410px] h-[251px] flex items-center rounded-[48px] backdrop-blur-[8.3px] border-white/[80%] border-[1px] bg-white/[17%]">
              <div className="w-[306px] h-[172px] ml-8 flex flex-col justify-between ">
                <div className="w-[306px] h-[76px] leading-[105%] font-semibold font-poppins text-[36px] text-4xl ">
                  MUSIC WITHOUT INTERNET
                </div>
                <div className="w-[221px] h-[76px] leading-[128.8%] font-normal font-inter text-[16px] ">
                  Listen to your favorite tracks anywhere: on the road, in the subway or abroad - no internet required.
                </div>
              </div>
            </div>
            <div className="w-[410px] h-[251px] flex items-center rounded-[48px] backdrop-blur-[8.3px] border-white/[80%] border-[1px] bg-[#4C4C4C]/[14%]">
              <div className="w-[306px] h-[172px] ml-8 flex flex-col justify-between ">
                <div className="w-[306px] h-[76px] leading-[105%] font-semibold font-poppins text-[36px] text-4xl ">
                  ALL FEATURES ARE FREE
                </div>
                <div className="w-[221px] h-[76px] leading-[128.8%] font-normal font-inter text-[16px] ">
                  No subscriptions or limitations. What others only offer for premium is available for free with us.
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[251px] flex flex-row justify-between ">
            <div className="w-[410px] h-[251px] flex items-center rounded-[48px] backdrop-blur-[8.3px] border-white/[80%] border-[1px] bg-[#4C4C4C]/[14%]">
              <div className="w-[306px] h-[172px] ml-8 flex flex-col justify-between ">
                <div className="w-[306px] h-[76px] leading-[105%] font-semibold font-poppins text-[36px] text-4xl ">
                  PLAYLIST IN A FEW CLICKS
                </div>
                <div className="w-[221px] h-[76px] leading-[128.8%] font-normal font-inter text-[16px] ">
                  Create your own playlists easily and quickly, add your favorite songs and change them at any time.
                </div>
              </div>
            </div>
            <div className="w-[410px] h-[251px] flex items-center rounded-[48px] backdrop-blur-[8.3px] border-white/[80%] border-[1px] bg-white/[17%]">
              <div className="w-[306px] h-[172px] ml-8 flex flex-col justify-between ">
                <div className="w-[306px] h-[76px] leading-[105%] font-semibold font-poppins text-[36px] text-4xl ">
                  NEWEST HITS FIRST
                </div>
                <div className="w-[221px] h-[76px] leading-[128.8%] font-normal font-inter text-[16px] ">
                  Listen to songs immediately after release and stay up to date with all the latest music.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[677px] h-[210px] ml-[124px] text-[#DB6316] text-center font-semibold font-poppins text-[96px] leading-[105%] ">
          ADVANTAGES OF ECHO
        </div>
      </div>
      <div className="w-[905px] h-[648px] mt-[253px] flex flex-col justify-between">
        <div className="w-full h-[120px] text-center leading-[124.7%] font-semibold font-poppins text-[96px] text-[#DB6316]">
          FAQ
        </div>
        <div className="w-full h-[464px] flex items-center justify-between">
          <div className="w-[92px] h-[464px] flex flex-col justify-between">
            <div className="w-[92px] h-[92px] rounded-full flex items-center justify-center bg-[#E07026]/[31%] border-[1px] border-white/[60%]">
              <div className="w-[56px] h-[56px] rounded-full text-center content-center leading-[124.7%] font-semibold font-inter text-[40px] bg-[#D0D0D0]">
                ?
              </div>
            </div>
            <div className="w-[92px] h-[92px] rounded-full flex items-center justify-center bg-[#E07026]/[31%] border-[1px] border-white/[60%]">
              <div className="w-[56px] h-[56px] rounded-full text-center content-center leading-[124.7%] font-semibold font-inter text-[40px] bg-[#D0D0D0]">
                ?
              </div>
            </div>
            <div className="w-[92px] h-[92px] rounded-full flex items-center justify-center bg-[#E07026]/[31%] border-[1px] border-white/[60%]">
              <div className="w-[56px] h-[56px] rounded-full text-center content-center leading-[124.7%] font-semibold font-inter text-[40px] bg-[#D0D0D0]">
                ?
              </div>
            </div>
            <div className="w-[92px] h-[92px] rounded-full flex items-center justify-center bg-[#E07026]/[31%] border-[1px] border-white/[60%]">
              <div className="w-[56px] h-[56px] rounded-full text-center content-center leading-[124.7%] font-semibold font-inter text-[40px] bg-[#D0D0D0]">
                ?
              </div>
            </div>
          </div>
          <div className="w-[781px] h-[448px] flex flex-col justify-between ">
            <div className="w-full h-[88px] rounded-r-[39px] rounded-l-[16px] flex items-center bg-[#D0D0D0]">
              <div className="h-[35px] ml-[28px] leading-[124.7%] font-semibold font-inter text-[28px] ">
                How do I create a playlist and add music to it?
              </div>
            </div>
            <div className="w-full h-[88px] rounded-r-[39px] rounded-l-[16px] flex items-center bg-[#D0D0D0]">
              <div className="h-[35px] ml-[28px] leading-[124.7%] font-semibold font-inter text-[28px] ">
                How do I remove ads?
              </div>
            </div>
            <div className="w-full h-[88px] rounded-r-[39px] rounded-l-[16px] flex items-center bg-[#D0D0D0]">
              <div className="h-[35px] ml-[28px] leading-[124.7%] font-semibold font-inter text-[28px] ">
                How do I find new music based on my preferences?
              </div>
            </div>
            <div className="w-full h-[88px] rounded-r-[39px] rounded-l-[16px] flex items-center bg-[#D0D0D0]">
              <div className="h-[35px] ml-[28px] leading-[124.7%] font-semibold font-inter text-[28px] ">
                How many devices can I use one account on?
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('/assets/main_images/image3.jpg')] bg-[center_-55px] bg-cover w-[1680px] h-[350px] mt-[280px] rounded-[76px]">
        <div className="w-[881px] h-full ml-[725px] flex justify-center items-center">
          <div className="w-[600px] h-[172.35px] text-white flex flex-col justify-between items-center">
            <div className="font-semibold font-poppins text-[40px]">
              ARE YOU READY? LET`S LISTEN
            </div>
            <div className="w-[276px] h-[64px]">
              <Button
                className="bg-white/[11%] font-semibold text-[32px]"
                variant="transparent"
                onClick={() => navigate("/register/email")}
              >
                Sign Up Free
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-[280px]"/>
    </div>




    // <div className="w-full relative">
    //   <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px] pb-[40px]"/>
    //   <div className="ml-[50px] relative z-10 pb-[40px]">
    //     <div className="flex flex-row font-roboto font-normal text-[#B60A31] text-lg py-[35px]">
    //       <NavLink to="/favorite" className="pr-[30px]">
    //         Favorite music
    //       </NavLink>
    //       <NavLink to="/playlists" className="">
    //         Your playlists
    //       </NavLink>
    //     </div>
    //     <div className="flex flex-col justify-start items-start">
    //       <span className="font-montserrat font-semibold text-[#B60A31] text-2xl">Personal recommendations</span>
    //
    //       <Swiper
    //         modules={[Pagination, Navigation]}
    //         slidesPerView={7}
    //         spaceBetween={1}
    //         navigation
    //         className="mt-[22px] w-full ml-[0px]"
    //         style={{
    //           margin: 0,
    //           padding: 0
    //         }}>
    //
    //         {albums ? albums.data.map((item) => (
    //             <SwiperSlide key={item.id} style={{padding: 0, margin: 0}}>
    //               <div className="my-[15px]">
    //                 <AlbumTile album={item}/>
    //               </div>
    //             </SwiperSlide>
    //         )) : null}
    //
    //       </Swiper>
    //     </div>
    //     <div className="flex mt-[50px]">
    //       <div className="flex flex-col">
    //         <span className="font-montserrat font-semibold text-[#B60A31] text-2xl">Popular music</span>
    //
    //         {tracks ? tracks.data.map((item) => (
    //           <div className="my-[15px]" key={item.id}>
    //             <PopularTrackTile track={item}/>
    //           </div>
    //         )) : null}
    //       </div>
    //       <div className="flex flex-col ml-[50px] w-[70%]">
    //         <div className="w-full">
    //           <span className="font-montserrat font-semibold text-[#B60A31] text-2xl">Incompletely reproduced</span>
    //           <Swiper
    //             modules={[Pagination, Navigation]}
    //             slidesPerView={4}
    //             spaceBetween={1}
    //             navigation
    //             className="p-0 m-0 ">
    //
    //             {IncompletelyTracks ? IncompletelyTracks.data.map((item) => (
    //               <SwiperSlide key={item.id} style={{padding: 0, margin: 0}}>
    //                 <div className="my-[15px]">
    //                   <IncompletelyTrackTile track={item}/>
    //                 </div>
    //               </SwiperSlide>
    //             )) : null}
    //
    //           </Swiper>
    //         </div>
    //         <div>
    //           <span className="font-montserrat font-semibold text-[#B60A31] text-2xl">Your favourite artists</span>
    //           <Swiper
    //             modules={[Pagination, Navigation]}
    //             slidesPerView={5}
    //             spaceBetween={1}
    //             navigation
    //             className="p-0 m-0 ">
    //
    //             {favoriteArtists ? favoriteArtists.data.map((item) => (
    //               <SwiperSlide key={item.id} style={{padding: 0, margin: 0}}>
    //                 <div className="my-[15px]">
    //                   <FavoriteArtistTile artist={item}/>
    //                 </div>
    //               </SwiperSlide>
    //             )) : null}
    //
    //           </Swiper>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex flex-col justify-start items-start mt-[30px]">
    //       <span className="font-montserrat font-semibold text-[#B60A31] text-2xl">Your playlists</span>
    //       <Swiper
    //         modules={[Pagination, Navigation]}
    //         slidesPerView={7}
    //         spaceBetween={1}
    //         navigation
    //         className="mt-[22px] w-full ml-[0px]"
    //         style={{
    //           margin: 0,
    //           padding: 0
    //         }}>
    //
    //         {playlists ? playlists.data.map((item) => (
    //             <SwiperSlide key={item.id} style={{padding: 0, margin: 0}}>
    //               <div className="my-[15px]">
    //                 <PlaylistTile playlist={item}/>
    //               </div>
    //             </SwiperSlide>
    //         )) : null}
    //
    //       </Swiper>
    //     </div>
    //   </div>
    // </div>
  );
};

export default StartPage;