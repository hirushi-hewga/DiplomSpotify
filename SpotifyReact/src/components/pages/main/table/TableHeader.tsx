

interface ITableHeaderProps {
  name: string;
  col1: string;
  col2: string;
}

const TableHeader: React.FC<ITableHeaderProps> = ({name, col1, col2}) => {

  return (
    <div className="h-[80px] w-full">
      <div className="flex flex-row">
        <div className="w-full flex items-end">
          <span className="font-roboto font-normal text-white text-xl">{name}</span>
        </div>
        <div className="w-[180px] flex items-center text-center px-[15px]">
          <span className="w-[180px] font-inter font-normal text-xl leading-[26px] text-white">{col1}</span>
        </div>
        <div className="w-[180px] flex items-center text-center px-[15px] mr-[25px]">
          <span className="w-[180px] font-inter font-normal text-xl leading-[26px] text-loginTextColor2">{col2}</span>
        </div>
      </div>
      <hr className="w-full border-loginTextColor2"/>
    </div>
  )
}

export default TableHeader;