import { useHomeUi } from "components/ui/HomeUiContext.tsx";
import { useFavouriteArtists } from "../../../../hooks/queries/useFavouriteArtists.ts";
import { useSelector } from "react-redux";
import { getUser } from "../../../../store/slice/userSlice.ts";
import ArtistsCarousel from "components/main/ArtistsCarousel.tsx";

const RoadArtistsPage = () => {
  const user = useSelector(getUser);
  const { sidebarOpen, trackbarOpen } = useHomeUi();

  const { data: artists, loading: artistsLoading, error: artistsError } =
    useFavouriteArtists(user?.id, 10);

  return (
    <div className="w-full flex flex-col gap-[40px]">
      <div className="font-semibold font-poppins text-[32px] text-[#F16001]">Last Releases of your selected artists &gt;</div>
      <ArtistsCarousel artists={artists} compact={trackbarOpen || sidebarOpen}/>
    </div>
  );
};

export default RoadArtistsPage;