import { NavLink } from "react-router-dom";
import File from "../icon/File";
import Friends from "../icon/Friends";
import Notifications from "../icon/Notifications";
import HeaderLink from "../link/HeaderLink";
import SearchBar from "./SearchBar";
import HeaderSearch from "../icon/HeaderSearch";
import { logOut } from "store/slice/userSlice";
import { API_URL } from "utils/envData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { userApi } from "services/user";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = () => {
    setShowMenu(false);
    dispatch(logOut());
    navigate("/login");
  };

  const user = userApi.useGetInfoQuery().data;
  const imageSrc = API_URL + "/Images/200_";

  return (
    <header className="sticky z-40 top-0 right-0 flex items-center justify-end px-[10px] w-full h-[78px] bg-black rounded-b-[14px] opacity-85">
      <div className="flex ml-auto mr-auto py-[20px]">
        <HeaderLink icon={<Friends className="w-[18px] h-[18px]"/>} to="/friends"/>
        <div className="flex items-center transition duration-150 mx-[7px] h-[37px] bg-[#3b3b3b] rounded-full">
          <HeaderSearch className="w-[17px] h-[17px] ml-[16px]" color="#FFFFFF"/>
          <SearchBar className="min-w-[350px] pr-[10px]"/>
        </div>
        <HeaderLink icon={<File className="w-[19px] h-[18px]"/>} to="/genres"/>
        <HeaderLink icon={<Notifications className="w-[17px] h-[18px]"/>} to="/notification"/>
      </div>
      <div className="flex items-center">
        <NavLink className="bg-gradient-to-r from-[#A30028] to-[#FB2645] text-white mr-[18px] py-[6px] px-[34px] rounded-full text-[12px] font-roboto"
          to="/premium">
          Premium
        </NavLink>
        <NavLink to="" className="text-white mr-[24px] font-roboto text-[16px] hidden">
          ENG | UA
        </NavLink>
        {user ? (
          <div>
            <img src={imageSrc.concat(user?.photo)} alt={user?.userName} className="w-[50px] h-[50px] rounded-full object-cover mr-[20px] cursor-pointer" onClick={handleContextMenu}/>
            {showMenu && (
              <div
                className="absolute top-[78px] right-[20px] bg-black rounded-[5px] z-40 w-[120px] py-[2px]"
              >
                <button
                  className="w-full py-[1px] text-sm hover:bg-[#3B3B3B] text-white cursor-pointer rounded-[5px] font-roboto text-lg font-semibold"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            )}
            {showMenu && <div className="fixed inset-0" onClick={handleCloseMenu}></div>}
          </div>
        ) : (
          <></>  
        )}
      </div>
    </header>
  );
};

export default Header;