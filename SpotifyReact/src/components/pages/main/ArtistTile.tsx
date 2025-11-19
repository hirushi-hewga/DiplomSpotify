interface IArtistTileProps {
  name: string,
  image: string,
  albumsCount: number,
  tracksCount: number
}

const ArtistTile: React.FC<IArtistTileProps> = ({ name, image, albumsCount, tracksCount }) => {

  return(
    <div className="w-[380px] flex flex-row">
      <img src={image} className="w-[154px] h-[154px] object-cover rounded-[14px]"/>
      <div className="font-roboto font-medium ml-[30px] flex flex-col text-sm text-white">
        <span className="text-xl mt-[11px]">{name}</span>
        <div className="mt-[30px]">
          <span className="text-[#BCBCBC]">Albums - </span>
          <span>{albumsCount}</span>
        </div>
        <div className="mt-[6px]">
          <span className="text-[#BCBCBC]">Tracks - </span>
          <span>{tracksCount}</span>
        </div>
      </div>
    </div>
  )
}

export default ArtistTile;