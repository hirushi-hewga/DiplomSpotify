import { IArtist } from "interfaces/artist";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/envData";


interface IArtistTileProps {
  artist: IArtist
}

const FavoriteArtistTile: React.FC<IArtistTileProps> = ({ artist }) => {
  const navigate = useNavigate();
  const imageSrc = API_URL + "/Images/800_";

  const handleClick = () => {
    navigate("/artist", { state: { artist } });
  };

  return (
    <div className="flex flex-col w-[156px] cursor-pointer" onClick={handleClick}>
      <img src={imageSrc.concat(artist.image)} alt={artist.name} className="w-[156px] h-[156px] object-cover mx-auto rounded-full"/>
      <span className="font-roboto font-medium text-white text-xl pt-[15px] truncate">{artist.name}</span>
    </div>
  )
}

export default FavoriteArtistTile;