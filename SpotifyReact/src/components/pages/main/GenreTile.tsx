import GenreWaveBackground from "./GenreWaveBackground";
import { colorSelectorDark } from "utils/colorSelector";

interface IGenreTileProps {
  title: string,
  imageUrl: string
}

const GenreTile: React.FC<IGenreTileProps> = ({ title, imageUrl }) => {

  return (
    <div className="w-[310px] h-[182px] rounded-[16px] flex">
      <div className="w-1/2">
        <GenreWaveBackground color={colorSelectorDark(title)} className="absolute z-0 rounded-l-[16px]"/>
        <h4 className="font-roboto font-semibold text-2xl text-white py-[25px] pl-[24px] z-10 absolute">{title}</h4>
      </div>
      <div className="w-1/2">
        <img src={imageUrl} alt={title} className="w-[155px] h-[182px] object-cover mx-auto rounded-r-[16px]"/>
      </div>
    </div>
  )
}

export default GenreTile