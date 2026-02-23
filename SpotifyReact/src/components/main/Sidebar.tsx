

const Sidebar = ({isOpen = false}) => {
  return(
    <div className={`${!isOpen && "hidden"}`}>
      <div className="px-[20px] py-[32px] flex flex-col gap-y-[64px] rounded-[20px] bg-[#0F0F10]/[10%] border border-white/[80%] text-white">
        <div className="flex flex-col gap-y-[24px] font-semibold font-inter text-[20px]">
          <div className="gap-[12px] flex items-center hover:cursor-pointer text-[#F16001]">
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img src="/assets/icons/icon16.svg" alt="icon" className="h-[20px]"/>
            </div>
            Home
          </div>
          <div className="gap-[12px] flex items-center hover:cursor-pointer">
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img src="/assets/icons/icon16.svg" alt="icon" className="h-[20px]"/>
            </div>
            Playlists
          </div>
          <div className="gap-[12px] flex items-center hover:cursor-pointer">
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img src="/assets/icons/icon16.svg" alt="icon" className="h-[20px]"/>
            </div>
            Albums
          </div>
          <div className="gap-[12px] flex items-center hover:cursor-pointer">
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img src="/assets/icons/icon16.svg" alt="icon" className="h-[20px]"/>
            </div>
            Favourite
          </div>
          <div className="gap-[12px] flex items-center hover:cursor-pointer">
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img src="/assets/icons/icon16.svg" alt="icon" className="h-[20px]"/>
            </div>
            New Releases
          </div>
        </div>
        <div className="w-[196px] flex flex-col gap-y-[40px]">
          <div className="flex flex-col gap-y-[12px] relative">
            <div className="gap-[12px] flex items-center font-semibold font-poppins text-[20px] hover:cursor-pointer">
              <div className="w-[24px] h-[24px] flex items-center justify-center">
                <img src="/assets/icons/icon16.svg" alt="icon" className="h-[20px]"/>
              </div>
              MODE
            </div>
            <div className="w-full">
              <div className="w-[208.5px] absolute border"/>
            </div>
          </div>
          <div className="font-light font-inter text-[16px] relative">
            <div className="w-[21px] h-[21px] absolute rounded-full border border-[#FE7C1B]"></div>
            <div className="ml-[7px] flex flex-col gap-y-[8px]">
              <div className="h-[21px] flex items-center gap-x-[31px] text-[#F16001]">
                <div className="w-[7px] h-[7px] rounded-full bg-white"/>
                focus
              </div>
              <div className="w-0 h-[40px] ml-[3px] border"></div>
              <div className="h-[21px] flex items-center gap-x-[31px]">
                <div className="w-[7px] h-[7px] rounded-full bg-white"/>
                relax
              </div>
              <div className="w-0 h-[40px] ml-[3px] border"></div>
              <div className="h-[21px] flex items-center gap-x-[31px]">
                <div className="w-[7px] h-[7px] rounded-full bg-white"/>
                road
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;