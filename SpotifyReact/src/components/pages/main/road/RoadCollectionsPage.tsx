import { useSelector } from "react-redux";
import { getUser } from "../../../../store/slice/userSlice.ts";
import { useUserPlaylists } from "../../../../hooks/queries/useUserPlaylists.ts";

const RoadCollectionsPage = () => {
  const user = useSelector(getUser);

  const { data: playlists = [] } = useUserPlaylists(user?.id, 10);

  return (
    <div className="w-full flex flex-col gap-[40px]">
      <div className="font-semibold font-poppins text-[32px] text-[#F16001]">
        SELECT WHAT YOU’D LIKE TO LISTEN...
      </div>

      <div className="flex flex-row flex-wrap gap-y-[40px] justify-between max-h-[660px]">
        {playlists.map((p) => (
          <div key={p.id} className="w-[290px] h-[310px] flex flex-col justify-between items-center">
            <div
              style={{
                backgroundImage: `url(http://localhost:5014/data/${p.image})`,
                color: `${p.isBlackTitle ? "black" : "white"}`,
              }}
              className="w-[290px] h-[267px] bg-cover rounded-[36px] flex items-center justify-center font-semibold font-poppins text-[16px]"
            >
              {p.title.toUpperCase()}
            </div>
            <div className="font-inter text-white font-bold leading-none text-[16px]">
              {p.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadCollectionsPage;