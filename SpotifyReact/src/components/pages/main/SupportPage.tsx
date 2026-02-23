import Header from "components/main/Header.tsx";
import Footer from "components/main/Footer.tsx";

const SupportPage = () => {

  return(
    <div className="w-full bg-[#0F0F10] relative flex flex-col items-center overflow-hidden z-0">
      <div className="w-[104vw] h-[56.4vh] rounded-[100%] absolute left-[-2vw] top-[-50vh] bg-[#412613] blur-[200px] opacity-90 z-[-1]"/>
      <div className="w-[15vw] h-[174.6vh] rounded-[100%] absolute right-[94vw] top-[41vh] bg-[#FE7C1B] blur-[200px] opacity-45 z-[-1]"/>
      <div className="w-[15vw] h-[174.6vh] rounded-[100%] absolute left-[94vw] top-[41vh] bg-[#FE7C1B] blur-[200px] opacity-45 z-[-1]"/>
      <div className="w-[7.5vw] h-[13.3vh] rounded-full absolute left-[34.95vw] top-[46.3%] bg-[#FE7C1B] blur-[140px] z-[-1]"/>
      <div className="w-[7.5vw] h-[13.3vh] rounded-full absolute right-[34.95vw] top-[46.3%] bg-[#FE7C1B] blur-[140px] z-[-1]"/>
      <Header signInTextColor="#181310"/>
      <div className="w-[1680px] h-[1980px] mt-[47px] font flex flex-col justify-between items-center">
        <div className="w-[731px] h-[868px] flex flex-col justify-between">
          <div className="w-full h-[352px] flex items-end relative">
            <img
              src="/assets/icons/icon7.png"
              alt="icon"
              className="w-[230px] h-[230px] absolute left-[34.27%] top-0"
            />
            <div className="w-full h-[150px] flex flex-col items-center justify-between">
              <div className="font-semibold font-poppins text-[64px] text-[#DB6316]">
                HOW CAN WE HELP?
              </div>
              <div className="font-extralight font-inter text-[24px] text-white">
                <a href="/login" className="font-semibold">Sign In</a> to get help faster
              </div>
            </div>
          </div>
          <div className="w-full h-[44px] flex items-center rounded-full backdrop-blur-[8.3px] border-[1px] border-white/[80%] bg-white/[10%]">
            <img
              src="/assets/icons/icon8.svg"
              alt="icon"
              className="w-[27px] h-[27px] ml-[9px]"
            />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 mr-[12px] bg-transparent font-normal font-inter text-[20px] text-white placeholder-white border-none focus:ring-0"
            />
          </div>
          <div className="w-full h-[344px] flex justify-between items-center">
            <div className="w-[42px] h-[342px] font-semibold font-inter text-[20px] flex flex-col justify-between">
              <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#E07026]/[31%]">
                <div className="w-[25.57px] h-[25.57px] flex items-center justify-center rounded-full leading-[124.7%] bg-[#D0D0D0]">!</div>
              </div>
              <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#E07026]/[31%]">
                <div className="w-[25.57px] h-[25.57px] flex items-center justify-center rounded-full leading-[124.7%] bg-[#D0D0D0]">!</div>
              </div>
              <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#E07026]/[31%]">
                <div className="w-[25.57px] h-[25.57px] flex items-center justify-center rounded-full leading-[124.7%] bg-[#D0D0D0]">!</div>
              </div>
              <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#E07026]/[31%]">
                <div className="w-[25.57px] h-[25.57px] flex items-center justify-center rounded-full leading-[124.7%] bg-[#D0D0D0]">!</div>
              </div>
              <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#E07026]/[31%]">
                <div className="w-[25.57px] h-[25.57px] flex items-center justify-center rounded-full leading-[124.7%] bg-[#D0D0D0]">!</div>
              </div>
              <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#E07026]/[31%]">
                <div className="w-[25.57px] h-[25.57px] flex items-center justify-center rounded-full leading-[124.7%] bg-[#D0D0D0]">!</div>
              </div>
            </div>
            <div className="w-[675px] h-full font-light font-inter text-[20px] flex flex-col justify-between">
              <div className="w-full h-[44px] pl-[12px] rounded-r-[22px] rounded-l-[16px] flex items-center bg-[#D0D0D0]">
                Create shared playlists
              </div>
              <div className="w-full h-[44px] pl-[12px] rounded-r-[22px] rounded-l-[16px] flex items-center bg-[#D0D0D0]">
                Manage Your Account
              </div>
              <div className="w-full h-[44px] pl-[12px] rounded-r-[22px] rounded-l-[16px] flex items-center bg-[#D0D0D0]">
                In-app features
              </div>
              <div className="w-full h-[44px] pl-[12px] rounded-r-[22px] rounded-l-[16px] flex items-center bg-[#D0D0D0]">
                Devices and troubleshooting
              </div>
              <div className="w-full h-[44px] pl-[12px] rounded-r-[22px] rounded-l-[16px] flex items-center bg-[#D0D0D0]">
                Saving data
              </div>
              <div className="w-full h-[44px] pl-[12px] rounded-r-[22px] rounded-l-[16px] flex items-center bg-[#D0D0D0]">
                Security and privacy
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[468px] flex flex-col justify-between ">
          <div className="w-full h-[109px] font-semibold font-poppins text-[74px] text-center text-[#DB6316]">
            EMERGENCY HELP
          </div>
          <div className="w-full h-[319px] flex justify-between">
            <div className="w-[390px] h-full py-[45px] text-white rounded-[40px] backdrop-blur-[8.3px] border-[1px] border-white/[80%] flex flex-col justify-between items-center bg-[#4C4C4C]/[14%]">
              <div className="w-[61px] h-[61px] mb-[20px] rounded-[12px] backdrop-blur-[8.3px] flex items-center justify-center border-white/[80%] bg-white/[14%] border-[1px]">
                <img
                  src="/assets/icons/icon2.svg"
                  alt="icon"
                />
              </div>
              <div className="font-semibold font-poppins text-[24px]">No Sound</div>
              <div className="font-normal font-inter text-[16px] leading-[22px]">
                Fix audio output or device issues:
                <br/>&nbsp;<strong>&bull;</strong> Check audio device
                <br/>&nbsp;<strong>&bull;</strong> Restart player
              </div>
            </div>
            <div className="w-[390px] h-full py-[45px] text-white rounded-[40px] backdrop-blur-[8.3px] border-[1px] border-white/[80%] flex flex-col justify-between items-center bg-[#4C4C4C]/[14%]">
              <div className="w-[61px] h-[61px] mb-[20px] rounded-[12px] backdrop-blur-[8.3px] flex items-center justify-center border-white/[80%] bg-white/[14%] border-[1px]">
                <img
                  src="/assets/icons/icon3.svg"
                  alt="icon"
                />
              </div>
              <div className="font-semibold font-poppins text-[24px]">Connection Problems</div>
              <div className="font-normal font-inter text-[16px] leading-[22px]">
                Music not loading or buffering:
                <br/>&nbsp;<strong>&bull;</strong> Check connection
                <br/>&nbsp;<strong>&bull;</strong> Server status
              </div>
            </div>
            <div className="w-[390px] h-full py-[45px] text-white rounded-[40px] backdrop-blur-[8.3px] border-[1px] border-white/[80%] flex flex-col justify-between items-center bg-[#4C4C4C]/[14%]">
              <div className="w-[61px] h-[61px] mb-[20px] rounded-[12px] backdrop-blur-[8.3px] flex items-center justify-center border-white/[80%] bg-white/[14%] border-[1px]">
                <img
                  src="/assets/icons/icon4.svg"
                  alt="icon"
                />
              </div>
              <div className="font-semibold font-poppins text-[24px]">Account</div>
              <div className="font-normal font-inter text-[16px] leading-[22px]">
                Login, password or subscription issues:
                <br/>&nbsp;<strong>&bull;</strong> Reset password
                <br/>&nbsp;<strong>&bull;</strong> Manage subscription
              </div>
            </div>
            <div className="w-[390px] h-full py-[45px] text-white rounded-[40px] backdrop-blur-[8.3px] border-[1px] border-white/[80%] flex flex-col justify-between items-center bg-[#4C4C4C]/[14%]">
              <div className="w-[61px] h-[61px] mb-[20px] rounded-[12px] backdrop-blur-[8.3px] flex items-center justify-center border-white/[80%] bg-white/[14%] border-[1px]">
                <img
                  src="/assets/icons/icon5.svg"
                  alt="icon"
                />
              </div>
              <div className="font-semibold font-poppins text-[24px]">App Crash</div>
              <div className="font-normal font-inter text-[16px] leading-[22px]">
                The app closed unexpectedly or froze:
                <br/>&nbsp;<strong>&bull;</strong> Restart app
                <br/>&nbsp;<strong>&bull;</strong> Send crash report
              </div>
            </div>
          </div>
        </div>
        <div className="w-[985px] h-[292px] flex flex-col justify-between items-center">
          <div className="w-full h-[109px] font-semibold font-poppins text-[74px] leading-[80px] text-center text-[#DB6316]">
            IF YOU HAVE QUATIONS CLICK HERE
          </div>
          <div className="w-[852px] h-[99px] pr-[59px] text-white flex justify-between items-center">
            <div className="w-[162px] h-[49px] flex items-center rounded-[46px] backdrop-blur-[8.3px] border-[1px] border-white/[80%] bg-white/[10%]">
              <div className="w-[49px] h-[49px] rounded-full backdrop-blur-[8.3px] flex justify-center items-center border-[1px] border-white/[80%] bg-[#E07026]/[31%]">
                <img
                  src="/assets/social_icons/icon8.svg"
                  alt="icon"
                />
              </div>
              <div className="font-normal font-inter text-[20px] m-auto">@echo</div>
            </div>
            <div className="w-[258px] h-[49px] flex items-center rounded-[46px] backdrop-blur-[8.3px] border-[1px] border-white/[80%] bg-white/[10%]">
              <div className="w-[49px] h-[49px] rounded-full backdrop-blur-[8.3px] flex justify-center items-center border-[1px] border-white/[80%] bg-[#E07026]/[31%]">
                <img
                  src="/assets/icons/icon6.svg"
                  alt="icon"
                />
              </div>
              <div className="font-normal font-inter text-[20px] m-auto">echo@gmail.com</div>
            </div>
            <div className="w-[253px] h-[49px] flex items-center rounded-[46px] backdrop-blur-[8.3px] border-[1px] border-white/[80%] bg-white/[10%]">
              <div className="w-[49px] h-[49px] rounded-full backdrop-blur-[8.3px] flex justify-center items-center border-[1px] border-white/[80%] bg-[#E07026]/[31%]">
                <img
                  src="/assets/social_icons/icon9.svg"
                  alt="icon"
                />
              </div>
              <div className="font-normal font-inter text-[20px] m-auto">Echo_music_app</div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-[160px]"/>
    </div>
  )
}

export default SupportPage;