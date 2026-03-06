import { Link, useLocation } from "react-router-dom";


const Sidebar = ({isOpen = false}) => {
  const {pathname} = useLocation();
  const secondPath = pathname.split("/")[2]

  return(
    <div className={`${!isOpen && "hidden"}`}>
      <div className="px-[20px] py-[32px] flex flex-col gap-y-[64px] rounded-[20px] bg-[#0F0F10]/[10%] border border-white/[80%] text-white">
        <div className="flex flex-col gap-y-[24px] font-semibold font-inter text-[20px]">
          <Link to="/home" className={`gap-[12px] flex items-center hover:cursor-pointer ${pathname==="/home" && "text-[#F16001]"}`}>
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img src={`/assets/icons/sidebar/icon${pathname==="/home"?"6":"1"}.svg`} alt="icon" className="h-[20px]"/>
            </div>
            Home
          </Link>
          <Link to="/home/playlists" className={`gap-[12px] flex items-center hover:cursor-pointer ${secondPath==="playlists" && "text-[#F16001]"}`}>
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img src={`/assets/icons/sidebar/icon${secondPath==="playlists"?"7":"2"}.svg`} alt="icon" className="h-[20px]"/>
            </div>
            Playlists
          </Link>
          <Link to="/home/albums" className={`gap-[12px] flex items-center hover:cursor-pointer ${secondPath==="albums" && "text-[#F16001]"}`}>
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img src={`/assets/icons/sidebar/icon${secondPath==="albums"?"8":"3"}.svg`} alt="icon" className="h-[18px]"/>
            </div>
            Albums
          </Link>
          <Link to="/home/favourites" className={`gap-[12px] flex items-center hover:cursor-pointer ${secondPath==="favourites" && "text-[#F16001]"}`}>
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img src={`/assets/icons/sidebar/icon${secondPath==="favourites"?"9":"4"}.svg`} alt="icon" className="h-[16.3px]"/>
            </div>
            Favourite
          </Link>
          <Link to="/home/releases" className={`gap-[12px] flex items-center hover:cursor-pointer ${secondPath==="releases" && "text-[#F16001]"}`}>
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img src={`/assets/icons/sidebar/icon${secondPath==="releases"?"10":"5"}.svg`} alt="icon" className="h-full"/>
            </div>
            New Releases
          </Link>
        </div>
        <div className="w-[196px] flex flex-col gap-y-[40px]">
          <div className="flex flex-col gap-y-[12px] relative">
            <div className="gap-[12px] flex items-center font-semibold font-poppins text-[20px] hover:cursor-pointer">
              <div className="w-[24px] h-[24px] flex items-center justify-center">
                <img src="/assets/icons/sidebar/icon11.svg" alt="icon" className="h-[20px]"/>
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
                <div className="w-[7px] h-[7px] rounded-full bg-[#F16001]"/>
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