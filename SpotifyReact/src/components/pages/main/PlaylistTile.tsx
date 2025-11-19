import { IPlaylist } from "interfaces/playlist";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/envData";


interface IPlaylistTileProps {
  playlist: IPlaylist
}

const PlaylistTile: React.FC<IPlaylistTileProps> = ({ playlist }) => {
  const navigate = useNavigate();
  const imageSrc = API_URL + "/Images/400_";

  const handleClick = () => {
    navigate("/playlist", { state: { playlist } });
  };

  return (
    <div className="flex flex-col" onClick={handleClick}>
      <img src={imageSrc.concat(playlist.image)} alt={playlist.name} className="w-[145px] h-[145px] object-cover mx-auto rounded-[16px]"/>
      <span className="font-roboto font-medium text-white text-base pt-[16px]">{playlist.name}</span>
    </div>
  )
}

export default PlaylistTile