import { IAlbum } from "interfaces/album";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/envData";


interface IAlbumTileProps {
  album: IAlbum
}

const AlbumTile: React.FC<IAlbumTileProps> = ({ album }) => {
  const navigate = useNavigate();
  const imageSrc = API_URL + "/Images/800_";

  const handleClick = () => {
    navigate("/album", { state: { album } });
  };

  return (
    <div className="flex flex-col w-[200px] cursor-pointer" onClick={handleClick}>
      <img src={imageSrc.concat(album.image)} alt={album.name} className="w-[200px] h-[200px] object-cover mx-auto rounded-[16px]"/>
      <span className="font-roboto font-medium text-white text-xl pt-[10px] truncate">{album.name}</span>
      <span className="font-roboto font-medium text-[#BCBCBC] text-base pt-[4px] truncate">{album.artist.name}</span>
    </div>
  )
}

export default AlbumTile