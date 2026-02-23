import Header from "components/main/Header.tsx";
import Footer from "components/main/Footer.tsx";

const ForArtistsPage = () => {
  return(
    <div className="w-full bg-[#0F0F10] relative flex flex-col items-center overflow-hidden z-0">
      <img
        src="/assets/vector2.png"
        alt="decorative background"
        className="w-[94.3vw] h-[459vh] absolute left-[12vw] top-[0.2vh] rotate-[15deg] blur-[100px] select-none z-[-1]"
      />
      <img
        src="/assets/vector3.png"
        alt="decorative background"
        className="w-[49.7vw] h-[103.9vh] absolute left-[-3.9vw] top-[51.4vh] blur-[100px] select-none z-[-1]"
      />
      <img
        src="/assets/vector3.png"
        alt="decorative background"
        className="w-[53.8vw] h-[154.2vh] absolute left-[54vw] top-[293.7vh] rotate-180 blur-[100px] select-none z-[-1]"
      />
      <div className="w-full h-[79.6vh] relative rounded-b-[100px] z-[0] bg-[radial-gradient(circle_at_50%_50%,#F3792A_0%,#8F1A0F_99%,transparent_200%)]">
        <Header signInTextColor="#9C2612"/>
        <img
          src="/assets/main_images/image4.png"
          alt="decorative background"
          className="w-[39.6vw] h-[70.46vh] absolute left-1/2 bottom-0 z-[-1] opacity-[0.85]"
        />
        <div className="w-[905px] h-[298px] absolute top-[27.9vh] left-[6.1vw] flex flex-col justify-between text-white">
          <div className="font-bold font-poppins text-[86px] leading-[88px]">WHERE YOUR MUSIC<br/>IS EVERYTHING</div>
          <div className="font-normal font-poppins text-[36px] leading-[136.9%]">Develop your fanbase, build your business, and<br/>create the world around your music.</div>
        </div>
        <div className="w-[1680px] h-[120px] flex justify-between absolute bottom-[-110px] left-1/2 -translate-x-1/2">
          <div className="w-[300px] h-full relative">
            <div className="w-full h-full absolute rounded-[10px] bg-[#D9D9D9] z-[-1]"/>
            <div className="w-[125px] mt-[18px] m-auto font-semibold font-poppins text-[24px] z-0">Tools built</div>
            <div className="w-[34px] h-[34px] flex items-center justify-center absolute bottom-[19px] left-1/2 -translate-x-1/2 bg-black rounded-full">
              <img
                src="/assets/icons/icon10.svg"
                alt="icon"
              />
            </div>
          </div>
          <div className="w-[300px] h-[10px] relative">
            <div className="w-full h-full absolute rounded-[10px] bg-[#D9D9D9] z-[-1]"/>
            <div className="w-[222px] mt-[18px] m-auto font-semibold font-poppins text-[24px] text-white z-0">Connect with fans</div>
          </div>
          <div className="w-[300px] h-[10px] relative">
            <div className="w-full h-full absolute rounded-[10px] bg-[#D9D9D9] z-[-1]"/>
            <div className="w-[240px] mt-[18px] m-auto font-semibold font-poppins text-[24px] text-white z-0">Grow your business</div>
          </div>
          <div className="w-[300px] h-[10px] relative">
            <div className="w-full h-full absolute rounded-[10px] bg-[#D9D9D9] z-[-1]"/>
            <div className="w-[211px] mt-[18px] m-auto font-semibold font-poppins text-[24px] text-white z-0">Understand your audience</div>
          </div>
        </div>
      </div>
      <div className="w-[1680px] h-[968px] mt-[307px] flex flex-col justify-between">
        <div>
          <div className="font-normal font-inter text-[32px] text-white">FEATURES</div>
          <div className="w-full flex justify-between">
            <div className="font-semibold font-poppins text-[90px] text-white leading-[88%]">Tools built for your<br/>music</div>
            <div className="w-[785px] h-[132px] mt-[7px] flex items-center justify-between">
              <div className="w-[623px] h-full flex items-center justify-center leading-[120%] bg-[#D9D9D9] rounded-r-[66px] rounded-l-[18px] font-normal font-inter text-[20px]">
                Grow your career while keeping your music at the center.
                <br/>With Echo for Artists, you can amplify your reach, serve up
                <br/>videos, build pre-release hype, and sell merch and tickets –
                <br/>right where streaming happens.
              </div>
              <div className="w-[116px] h-[116px] relative flex items-center justify-center rounded-full border-[1px] border-white/80 bg-[#E07026]/[31%]">
                <img
                  src="/assets/icons/icon11.svg"
                  alt="icon"
                />
                <div className="w-[24.76px] h-[11.73px] mt-[1px] overflow-hidden rounded-[1px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-[100%] h-[200%] rounded-[11px] bg-[#6E4B34] absolute bottom-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[644px] flex justify-between">
          <img
            src="/assets/main_images/image5.png"
            alt="image"
            className="h-full"
          />
          <img
            src="/assets/main_images/image6.png"
            alt="image"
            className="h-full"
          />
          <img
            src="/assets/main_images/image7.png"
            alt="image"
            className="h-full"
          />
        </div>
      </div>
      <div className="w-[1693px] h-[773px] mt-[115px] flex justify-between items-center">
        <img
          src="/assets/main_images/image8.png"
          alt="image"
          className="h-full"
        />
        <div className="w-[789px] h-[469px] mb-[50px] flex flex-col justify-between">
          <div className="font-semibold font-poppins text-[90px] text-white leading-[95%]">Connect with fans</div>
          <div className="w-full h-[245px] flex items-center justify-center bg-white rounded-[16px]">
            <div className="w-[739px] h-[192px] font-normal font-inter text-[20px] leading-[120%]">
              Invite listeners into your creative world. Customize your artist profile, create videos & visuals, and bring the story behind your music to life.
              <br/>
              <br/>&nbsp;&nbsp;<strong>&bull;</strong>&nbsp;&nbsp;Clips are short videos you create to connect with fans while keeping your
              <br/>&nbsp;&nbsp;&#8194;&nbsp;&nbsp;music front-and-center.
              <br/>&nbsp;&nbsp;<strong>&bull;</strong>&nbsp;&nbsp;Add a Canvas – a short, looping visual – to each of your tracks on Spotify.
              <br/>&nbsp;&nbsp;<strong>&bull;</strong>&nbsp;&nbsp;Countdown Pages help you get fans hyped for your upcoming album.
              <br/>&nbsp;&nbsp;<strong>&bull;</strong>&nbsp;&nbsp;Your artist profile shows fans what you’re all about.
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1683px] h-[727px] mt-[56px] flex flex-col justify-between">
        <div className="w-full h-[335px] flex items-center justify-between">
          <div className="w-[777px] h-[170px] font-semibold font-poppins text-[90px] leading-[95%] text-white">Grow your business</div>
          <img
            src="/assets/main_images/image9.png"
            className="h-full"
          />
        </div>
        <div className="w-full h-[335px] flex justify-between">
          <div className="w-[522px] h-full flex items-center rounded-l-[18px] rounded-r-[66px] bg-white">
            <div className="w-[471px] h-[288px] ml-[16px] font-normal font-inter text-[20px] leading-[120%]">
              There are many ways to earn revenue as an artist on Spotify. While Loud & Clear is your source for data, resources, and transparency around streaming royalties, here are some other opportunities to explore.
              <br/>
              <br/>&nbsp;&nbsp;<strong>&bull;</strong>&nbsp;&nbsp;Sell and promote merch on Spotify, because
              <br/>&nbsp;&nbsp;&#8194;&nbsp;&nbsp;music and merch are better together.
              <br/>&nbsp;&nbsp;<strong>&bull;</strong>&nbsp;&nbsp;List your concert and festival dates to make
              <br/>&nbsp;&nbsp;&#8194;&nbsp;&nbsp;sure your fans never miss another show.
              <br/>&nbsp;&nbsp;<strong>&bull;</strong>&nbsp;&nbsp;Fan Support lets you collect tips, or rally
              <br/>&nbsp;&nbsp;&#8194;&nbsp;&nbsp;listeners around a charitable cause.
            </div>
          </div>
          <img
            src="/assets/main_images/image10.png"
            className="h-full"
          />
          <img
            src="/assets/main_images/image11.png"
            className="h-full"
          />
        </div>
      </div>
      <div className="w-[1687px] h-[718px] mt-[140px] flex items-center justify-between">
        <div className="w-[810px] h-[456px] flex flex-col justify-between">
          <div className="font-semibold font-poppins text-[90px] text-white leading-[95%]">
            Understand your audience
          </div>
          <div className="w-full h-[245px] flex items-center justify-center rounded-[16px] bg-white">
            <div className="w-[766px] font-normal font-inter text-[20px] leading-[120%]">
              Dig into audience, playlist, and music data to help you reach your goals
              <br/>
              <br/>&nbsp;&nbsp;<strong>&bull;</strong>&nbsp;&nbsp;Segments allow you to better understand the breakdown of your audience.
              <br/>&nbsp;&nbsp;<strong>&bull;</strong>&nbsp;&nbsp;Hone your marketing strategy with release engagement and listener
              <br/>&nbsp;&nbsp;&#8194;&nbsp;&nbsp;conversion metrics.
              <br/>&nbsp;&nbsp;<strong>&bull;</strong>&nbsp;&nbsp;Fan Study is our ongoing report about fan behavior around the world.
            </div>
          </div>
        </div>
        <img
          src="/assets/main_images/image12.png"
          className="h-full"
        />
      </div>
      <Footer className="mt-[35px]"/>
    </div>
  )
}

export default ForArtistsPage;