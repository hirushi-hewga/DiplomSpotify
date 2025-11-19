interface ITableLineProps {
  name: string;
  img1: string;
  img2: string;
}

const TableLine: React.FC<ITableLineProps> = ({name, img1, img2}) => {

  return (
    <div className="h-[80px] w-full flex flex-col justify-end">
      <div className="flex flex-row">
        <div className="w-full flex items-end">
          <span className="font-roboto font-normal text-white text-xl">{name}</span>
        </div>
        <div className="w-[180px] text-center mb-[15px] mx-[45px]">
          <img className="w-[32px] h-[32px]" src={`assets/${img1}`}/>
        </div>
        <div className="w-[180px] text-center mb-[15px] mx-[45px]">
          <img className="w-[32px] h-[32px]" src={`assets/${img2}`}/>
        </div>
      </div>
      <hr className="w-full border-loginTextColor2"/>
    </div>
  )
}

export default TableLine;