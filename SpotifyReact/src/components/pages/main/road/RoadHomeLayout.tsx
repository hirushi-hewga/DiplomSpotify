import { clsx } from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentTrack } from "../../../../store/slice/playerSlice.ts";

const RoadHomeLayout = () => {
  const track = useSelector(selectCurrentTrack);
  const { pathname } = useLocation();

  const isPlaylists = pathname === "/road/home";
  const isCollections = pathname === "/road/home/collections";
  const isQuickPicks = pathname === "/road/home/quickpicks";
  const isArtists = pathname === "/road/home/artists";

  return (
    <div className={clsx(track && "mb-[150px]", "w-full flex flex-col flex-1 gap-[64px]")}>
      <div className="flex flex-row gap-[64px] font-inter text-[24px] text-white">
        <Link
          to="/road/home"
          className={clsx(
            isPlaylists
              ? "font-bold text-[#F16001]"
              : "hover:cursor-pointer hover:text-[#FF934C]"
          )}
        >
          All playlists
        </Link>

        <Link
          to="/road/home/collections"
          className={clsx(
            isCollections
              ? "font-bold text-[#F16001]"
              : "hover:cursor-pointer hover:text-[#FF934C]"
          )}
        >
          Collections
        </Link>

        <Link
          to="/road/home/quickpicks"
          className={clsx(
            isQuickPicks
              ? "font-bold text-[#F16001]"
              : "hover:cursor-pointer hover:text-[#FF934C]"
          )}
        >
          Quick Picks
        </Link>

        <Link
          to="/road/home/artists"
          className={clsx(
            isArtists
              ? "font-bold text-[#F16001]"
              : "hover:cursor-pointer hover:text-[#FF934C]"
          )}
        >
          Artists
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default RoadHomeLayout;