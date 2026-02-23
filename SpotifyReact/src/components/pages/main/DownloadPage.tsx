import Header from "components/main/Header.tsx";
import Footer from "components/main/Footer.tsx";

const DownloadPage = () => {

  return(
    <div className="w-full bg-[#0F0F10] relative flex flex-col items-center overflow-hidden z-0">
      <div className="w-[104vw] h-[56.4vh] rounded-[100%] absolute left-[-5.6vw] top-[-46.3vh] bg-[#A5180C] blur-[200px] opacity-70 z-[-1]"/>
      <div className="w-[41.7vw] h-[74.1vh] rounded-[100%] absolute left-[29.2vw] top-[55.5vh] bg-[#FE7C1B] blur-[200px] opacity-15 z-[-1]"/>
      <Header signInTextColor="#181310"/>
      <div className="w-[1680px] h-[978px] mt-[140px] flex flex-col items-center justify-between text-white">
        <div className="w-[941px] h-[280px] flex flex-col justify-between">
          <div className="h-[127px] flex items-center justify-center font-semibold font-poppins text-[96px] text-[#D05F16]">DOWNLOAD ECHO</div>
          <div className="h-[129px] text-center flex items-center justify-center font-light font-poppins text-[36px]">Listen to millions of songs and podcasts on your device.</div>
        </div>
        <div className="w-[433px] h-[179px] flex flex-col justify-between items-center ">
          <div className="w-full h-[128px] rounded-[8px] flex items-center bg-white/[10%]">
            <div className="w-[128px] h-full flex items-center justify-center">
              <img
                src="/assets/social_icons/icon4.png"
                alt="logo"
                className="w-[70px] h-[67px]"
              />
            </div>
            <div className="font-light font-inter text-[36px] leading-[132.7%] flex flex-col ">
              Download from <span className="font-semibold">Microsoft Store</span>
            </div>
          </div>
          <a href="/download" className="underline leading-[132.7%] font-normal font-inter text-[20px] ">Download with Echo</a>
        </div>
        <div className="w-[1680px] h-[391px] rounded-[32px] relative overflow-hidden bg-[#A5180C]/[30%]">
          <img
            src="/assets/vector1.svg"
            alt="decorative background"
            className="min-w-[116%] absolute top-[-56%] left-[-8.5%] blur-[45px]"
          />
          <img
            src="/assets/vector1.svg"
            alt="decorative background"
            className="min-w-[116%] absolute bottom-[-56%] left-[-8.5%] blur-[45px]"
          />
          <div className="h-full w-full flex items-center justify-center">
            <div className="h-[240.46px] flex flex-col justify-between items-center">
              <div className=" font-semibold font-poppins text-[40px]">
                Now you can listen to music on your mobile phone and tablet
              </div>
              <div className=" font-medium font-poppins text-[20px]">
                Enjoy ECHO on your phone and tablet. It's convenient, free, and so much fun!
              </div>
              <div className="w-[719px] h-[63px] my-[16.23px] flex justify-between ">
                <div className="w-[213px] h-full rounded-[8px] bg-blur-[8.3px] flex items-center bg-black/[90%]">
                  <div className="w-[63px] h-full flex items-center justify-center">
                    <img
                      src="/assets/social_icons/icon5.png"
                      alt="logo"
                      className="w-[38px] h-[38px]"
                    />
                  </div>
                  <div className="font-normal font-inter text-[16px] leading-[132.7%] flex flex-col ">
                    Download on the <span className="font-bold">App Store</span>
                  </div>
                </div>
                <div className="w-[213px] h-full rounded-[8px] bg-blur-[8.3px] flex items-center bg-black/[90%]">
                  <div className="w-[63px] h-full flex items-center justify-center">
                    <img
                      src="/assets/social_icons/icon6.png"
                      alt="logo"
                      className="w-[36px] h-[36px]"
                    />
                  </div>
                  <div className="font-normal font-inter text-[16px] leading-[132.7%] flex flex-col ">
                    Download on the <span className="font-bold">Google Play</span>
                  </div>
                </div>
                <div className="w-[213px] h-full rounded-[8px] bg-blur-[8.3px] flex items-center bg-black/[90%]">
                  <div className="w-[63px] h-full flex items-center justify-center">
                    <img
                      src="/assets/social_icons/icon7.png"
                      alt="logo"
                      className="w-[34px] h-[34px]"
                    />
                  </div>
                  <div className="font-normal font-inter text-[16px] leading-[132.7%] flex flex-col ">
                    Get it from <span className="font-bold">Microsoft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-[160px]"/>
    </div>
  )
}

export default DownloadPage;