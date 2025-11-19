

interface IListHeaderProps {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}

const ListHeader: React.FC<IListHeaderProps> = ({col1, col2, col3, col4, col5}) => {

  return (
    <div className="w-full">
      <div className="w-full flex flex-row font-roboto font-normal text-[#BCBCBC] text-base">
        <div className="w-[10%] flex justify-center items-center">
          <span>{col1}</span>
        </div>
        <div className="w-[44%] flex justify-center items-center p-[14px]">
          <span>{col2}</span>
        </div>
        <div className="w-[18%] flex justify-center items-center p-[14px]">
          <span>{col3}</span>
        </div>
        <div className="w-[18%] flex justify-center items-center p-[14px]">
          <span>{col4}</span>
        </div>
        <div className="w-[10%] flex justify-center items-center p-[14px]">
          <span>{col5}</span>
        </div>
      </div>
      <hr className="w-full border-loginTextColor2 pb-[20px]"/>
    </div>
  )
}

export default ListHeader;