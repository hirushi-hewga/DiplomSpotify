import Footer from "components/main/Footer.tsx";
import Header from "components/main/Header.tsx";
import { Button } from "components/ui/Button.tsx";



import { useRef, useState } from "react";


const ForDevelopersPage = () => {
  const [code, setCode] = useState("");
  const textareaRef = useRef(null);
  const linesRef = useRef(null);

  const lines = code.split("\n").length;

  const handleScroll = () => {
    linesRef.current.scrollTop = textareaRef.current.scrollTop;
  };

  return(
    <div className="w-full bg-[#0F0F10] relative flex flex-col items-center overflow-hidden z-0">
      <div className="w-[1100px] h-[1100px] rounded-[100%] absolute left-[-429px] top-[904px] bg-[#FE7C1B] opacity-45 blur-[200px] z-[-1]"/>
      <div className="w-[1100px] h-[1100px] rounded-[100%] absolute left-[1320px] top-[1473px] bg-[#FE7C1B] opacity-45 blur-[200px] z-[-1]"/>
      <div className="w-full h-[100vh] relative rounded-b-[100px] bg-[radial-gradient(circle_at_-26%_51.25%,#0E0D13_18%,#6E6465_73.2%,#E2B4A8_120%)]">
        <div className="w-full h-full absolute blur-[90px] bg-[radial-gradient(circle_at_68.9%_48.75%,rgba(254,135,67,0.65)_8%,rgba(230,114,52,0.65)_16%,rgba(176,96,69,0.65)_28%,transparent_50%)]"/>
        <Header signInTextColor="#A9877F"/>
        <div className="w-[1500px] h-[322px] flex flex-col justify-between items-center absolute top-[37vh] left-1/2 -translate-x-1/2">
          <div className="w-full h-[140px] relative text-center text-white">
            <div className="w-full font-semibold font-poppins text-[74px] absolute">Build with Echo`s 100 million songs,</div>
            <div className="w-full font-normal font-poppins text-[40px] leading-[1.15] absolute bottom-0">5 million podcasts and much more</div>
          </div>
          <div className="w-[339px] h-[70px]">
            <Button
              variant="transparent"
              className="font-inter text-[28px]"
            >
              See it in action
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[1253px] h-[51px] my-[33px] flex justify-between relative">
        <div className="w-[51px] h-[51px] absolute rounded-full border-[#DB6316] border-[3px]"/>
        <div className="w-full h-full mx-[13px] font-normal font-inter text-[24px] leading-none flex justify-between">
          <div className="w-[323px] h-full text-[#DB6316] flex justify-between items-center">
            <div className="w-[25px] h-[25px] rounded-full text-white flex items-center justify-center bg-[#DB6316]">1</div>
            <div className="text-[24px]">Get your top 5 tracks</div>
            <div className="mb-[5px] text-[50px] font-extralight leading-none">›</div>
          </div>
          <div className="w-[425px] h-full text-white flex justify-between items-center">
            <div className="w-[25px] h-[25px] rounded-full text-white flex items-center justify-center bg-[#DB6316]">2</div>
            <div className="text-[24px]">Save the 5 songs in a playlist</div>
            <div className="mb-[5px] text-[50px] font-extralight leading-none">›</div>
          </div>
          <div className="w-[375px] h-full text-white flex justify-between items-center">
            <div className="w-[25px] h-[25px] rounded-full text-white flex items-center justify-center bg-[#DB6316]">3</div>
            <div className="text-[24px]">Listen to the songs right now</div>
          </div>
        </div>
      </div>
      <div className="w-[1680px] h-[800px] rounded-t-[32px] overflow-hidden text-white bg-neutral-800 border-[4px] border-white">
        <div className="w-full h-[80px] flex font-semibold font-poppins text-[48px]">
          <div className="h-full pl-[30px] flex-1 flex items-center justify-between bg-[#F16001] border-white border-[1px]">
            <div className="w-[350px] flex justify-between items-center">
              Code
              <div className="w-[131px] h-[41px] mt-[5px] flex justify-evenly items-center rounded-[4px] bg-white/[11%] backdrop-blur-[8.3px] border-white/[80%] border-[1px]">
                <div className="w-[21px] h-[21px] pr-[1px] flex justify-end items-end bg-[#D9D9D9] font-normal font-inter text-[8px] text-black">JS</div>
                <div className="font-normal font-inter text-[16px]">JavaScript</div>
              </div>
            </div>
            <img
              src="/assets/icons/icon9.svg"
              alt="icon"
              className="w-[23.75px] h-[28.5px] mr-[14px] hover:cursor-pointer"
            />
          </div>
          <div className="h-full pl-[30px] flex-1 bg-[#F16001] border-white border-[1px]">
            Result
          </div>
        </div>
        <div className="w-full h-[717px] flex">
          <div className="h-full pt-[12px] flex flex-1 text-[#C8C8C8] font-normal font-inter text-[12px] bg-[#F16001] border-white border-[1px]">
            <div ref={linesRef} className="ml-[24px] flex leading-[150%] flex-col select-none overflow-hidden text-right">
              {Array.from({ length: lines }).map((_, i) => (
                <div key={i}>{i + 1}.</div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={handleScroll}
              spellCheck={false}
              className="w-full p-0 pl-[2px] text-[#C8C8C8] whitespace-pre overflow-x-auto overflow-y-auto overflow-auto leading-[150%] text-[12px] bg-transparent resize-none border-none focus:ring-0"
            />
          </div>
          <div className="h-full flex-1 relative bg-[#FF934C] border-white border-[1px]">
            <div className="w-[192px] h-[52px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Button
                variant="transparent"
                className="font-inter text-[20px]"
              >
                Run code
              </Button>
            </div>
            <div className="m-[32px] font-semibold font-poppins">
              <div className=" text-[40px] leading-none">Step 1:</div>
              <div className=" text-[20px]">Get your top 5 tracks</div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-[207px]"/>
    </div>
      //,#FE8743_15%,#E67234_21%,#B06045_36%
  )
}

export default ForDevelopersPage;