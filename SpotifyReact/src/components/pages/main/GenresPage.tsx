import { useGetGenresQuery } from "services/genre";
import { API_URL } from "utils/envData";
import GenreTile from "./GenreTile";

const GenresPage: React.FC = () => {
  const { data: genres } = useGetGenresQuery();
  const imageSrc = API_URL + "/Images/800_";

  return (
    <div className="w-full relative">
      <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
      <div className="w-full relative z-10">
        <div className="flex flex-row flex-wrap px-[30px] py-[60px]">
          {genres ? genres.map((genre) => (
            <div key={genre.id} className="m-[15px]">
              <GenreTile title={genre.name} imageUrl={imageSrc.concat(genre.image)}/>
            </div>
          )) : null}
        </div>
      </div>
    </div>
  )
}

export default GenresPage