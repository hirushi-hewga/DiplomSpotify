import { NavLink } from "react-router-dom";

interface ISubscriptionCardProps {
  name: string,
  price: number,
  description: string[],
  url: string
}

const SubscriptionCard: React.FC<ISubscriptionCardProps> = ({name, price, description, url}) => {
  return (
    <div className="w-[354px] h-[438px] bg-black rounded-[14px] relative shadow-[0_0_10px_0px_#F41A30]">
      <div className="bg-gradient-to-r from-[#59072F] to-[#DA0833] relative flex items-center justify-center w-full h-[70px] rounded-t-[14px] shadow-red shadow-sm">
        <img src="assets/Logo.png" className="absolute w-[49px] h-[40px] left-4"/>
        <span className="text-2xl font-semibold font-montserrat text-white">{name}</span>
      </div>
      <div className="w-full h-full flex flex-col items-center">
        <span className="font-montserrat font-semibold text-white text-5xl pt-[32px]">{price} $</span>
        <span className="font-roboto font-semibold text-white text-lg">Per month</span>
        <hr className="border-loginTextColor2 w-[75%] mt-[22px]"/>
        <ul className="list-disc list-inside mt-[34px] px-[30px] text-center">
          {description.map((item, index) => (
            <li key={index} className="text-white font-roboto font-normal text-sm leading-[18px]">{item}</li>
          ))}
        </ul>
        <NavLink to={`${url}?plan=${name}`} className="absolute bottom-[38px] w-[196px] h-[54px] rounded-[14px] bg-gradient-to-r from-[#59072F] to-[#DA0833] hover:bg-none flex justify-center items-center">
          <span className="font-roboto font-normal text-xl text-white">Get premium</span>
        </NavLink>
      </div>
    </div>
  );
}

export default SubscriptionCard;