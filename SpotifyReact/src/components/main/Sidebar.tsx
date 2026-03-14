import { Link, useLocation, useNavigate } from "react-router-dom";
import { useHomeUi } from "components/ui/HomeUiContext.tsx";
import SidebarLink from "components/main/SidebarLink.tsx";


const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { sidebarOpen, setSearchQuery } = useHomeUi();

  const segments = pathname.split("/").filter(Boolean);

  const mode =
    segments[0] === "road" || segments[0] === "relax"
      ? segments[0]
      : "focus";

  const getModePath = (page: string) => {
    if (mode === "focus") return `/home${page ? `/${page}` : ""}`;

    if (mode === "road") {
      if (!page) return "/road/home";
      if (page === "playlists") return "/road/home/quickpicks";
      return `/road/home/${page}`;
    }

    return `/${mode}/home${page ? `/${page}` : ""}`;
  };

  const isRoadHomeGroup =
    pathname === "/road/home" ||
    pathname === "/road/home/collections" ||
    pathname === "/road/home/artists";

  const isRoadPlaylistsGroup =
    pathname === "/road/home/quickpicks";

  const isHomeActive =
    mode === "road"
      ? isRoadHomeGroup
      : pathname === getModePath("");

  const isPlaylistsActive =
    mode === "road"
      ? isRoadPlaylistsGroup
      : pathname === getModePath("playlists");

  const secondPath =
    mode === "focus"
      ? segments[1]
      : segments[1];

  return(
    <div className={`z-10 ${!sidebarOpen && "hidden"}`}>
      <div className="px-[20px] py-[32px] flex flex-col gap-y-[64px] backdrop-blur-[16px] rounded-[20px] bg-[#0F0F10]/[10%] border border-white/[80%] text-white">
        <div className="flex flex-col gap-y-[24px] font-semibold font-inter text-[20px]">
          <SidebarLink to={getModePath("")} icon="1" activeIcon="6" hoverIcon="11" iconClassName="h-[20px]" text="Home" isActive={isHomeActive} />
          <SidebarLink to={getModePath("playlists")} icon="2" activeIcon="7" hoverIcon="12" iconClassName="h-[20px]" text="Playlists" isActive={isPlaylistsActive} />
          <SidebarLink to={getModePath("albums")} icon="3" activeIcon="8" hoverIcon="13" iconClassName="h-[18px]" text="Albums"/>
          <SidebarLink to={getModePath("favourites")} icon="4" activeIcon="9" hoverIcon="14" iconClassName="h-[16.3px]" text="Favourite"/>
          <SidebarLink to={getModePath("releases")} icon="5" activeIcon="10" hoverIcon="15" iconClassName="h-[24px]" text="New Releases"/>
        </div>
        <div className="w-[196px] flex flex-col gap-y-[40px]">
          <div className="flex flex-col gap-y-[12px] relative">
            <div className="gap-[12px] flex items-center font-semibold font-poppins text-[20px]">
              <div className="w-[24px] h-[24px] flex items-center justify-center">
                <img src="/assets/icons/sidebar/icon16.svg" alt="icon" className="h-[20px]"/>
              </div>
              MODE
            </div>
            <div className="w-full">
              <div className="w-[208.5px] absolute border"/>
            </div>
          </div>
          <div className="font-light font-inter text-[16px] relative">
            <div className="ml-[7px] flex flex-col gap-y-[8px]">
              <div
                className={`group w-fit h-[21px] flex items-center gap-x-[31px] ${mode === "focus" ? "text-[#F16001]" : "hover:cursor-pointer"}`}
                onClick={() => {if (mode !== "focus") navigate("/home"); setRoadHomeTab("playlists");}}
              >
                <div className={`w-[7px] h-[7px] relative rounded-full ${mode === "focus" ? "bg-[#F16001]" : "bg-white"}`}>
                  <div className={`w-[21px] h-[21px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute rounded-full border-[#FE7C1B] ${mode === "focus" ? "border" : "group-hover:border"}`}/>
                </div>
                focus
              </div>
              <div className="w-0 h-[40px] ml-[3px] border"></div>
              <div
                className={`group w-fit h-[21px] flex items-center gap-x-[31px] ${mode === "road" ? "text-[#F16001]" : "hover:cursor-pointer"}`}
                onClick={() => {if (mode !== "road") navigate("/road/home");}}
              >
                <div className={`w-[7px] h-[7px] relative rounded-full ${mode === "road" ? "bg-[#F16001]" : "bg-white"}`}>
                  <div className={`w-[21px] h-[21px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute rounded-full border-[#FE7C1B] ${mode === "road" ? "border" : "group-hover:border"}`}/>
                </div>
                road
              </div>
              <div className="w-0 h-[40px] ml-[3px] border"></div>
              <div
                className={`group w-fit h-[21px] flex items-center gap-x-[31px] ${mode === "relax" ? "text-[#F16001]" : "hover:cursor-pointer"}`}
                onClick={() => {if (mode !== "relax") navigate("/relax/home"); setRoadHomeTab("playlists");}}
              >
                <div className={`w-[7px] h-[7px] relative rounded-full ${mode === "relax" ? "bg-[#F16001]" : "bg-white"}`}>
                  <div className={`w-[21px] h-[21px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute rounded-full border-[#FE7C1B] ${mode === "relax" ? "border" : "group-hover:border"}`}/>
                </div>
                relax
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;