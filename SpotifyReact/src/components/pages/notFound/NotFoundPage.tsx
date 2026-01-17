import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-[100px]">
        <span className="font-montserrat font-semibold text-[#B60A31] text-8xl">Not Found Page</span>
        <NavLink
          className="bg-gradient-to-r mt-[20px] from-[#A30028] to-[#FB2645] text-white mr-[18px] py-[6px] px-[34px] rounded-full text-[40px] font-roboto"
          to="/">
          Go To Home Page
        </NavLink>
    </div>
    </>
  );
};

export default NotFoundPage;