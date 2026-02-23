import { clsx } from "clsx";
import { Button } from "components/ui/Button.tsx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser, logOut } from "../../store/slice/userSlice.ts";


const Header = ({signInTextColor = "", sidebarOpenHandler = () => {}, isSidebarOpen = false}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const mainPath = pathname.split("/")[1]
  const user = useSelector(getUser);

  const isAdmin = (role?: string | string[]) =>
    Array.isArray(role)
      ? role.includes("admin")
      : role === "admin";

  const margin = `${(pathname==="/support" || 
                      pathname==="/download" ||
                      mainPath==="home")?'80':'56'}px`;
  const height = `${(mainPath==="home" || mainPath==="admin")?'39':'67'}px`;

  const API_URL = "http://localhost:5014";
  const avatarPath = user?.image;
  const avatarUrl = avatarPath ? `${API_URL}/data/${avatarPath}` : "/assets/main_images/default-avatar.jpeg";

  const handleLogout = () => {
    setUserMenuOpen(false);
    dispatch(logOut())
    navigate("/")
  }

  return (
    <div
      className="w-full px-[120px] flex items-center justify-between"
      style={{
        marginTop: margin,
        height: height,
      }}>
      <div className="h-full flex items-center gap-[24px]">
        <div className={clsx((mainPath !== "home") && "hidden", "w-[32px] h-[32px] flex items-center justify-center")}>
          <img
            src="/assets/icons/icon12.svg"
            alt="icon"
            className={clsx(isSidebarOpen && "-rotate-90", "transition-transform duration-300 h-[24px] hover:cursor-pointer")}
            onClick={sidebarOpenHandler}
          />
        </div>
        <img
          src="/assets/icons/text_logo.svg"
          alt="logo"
          onClick={() => {navigate("/")}}
          className="h-full hover:cursor-pointer"
        />
      </div>
      <div className={clsx((pathname === "/vacancy") && "hidden", "gap-[24px] h-full flex items-center justify-between")}>
        <div className={clsx((mainPath==="home" || mainPath==="admin") && "hidden", "w-[106px] h-[54px] flex items-center justify-center")}>
          <Link to="/support" className={clsx((pathname === "/developer") && "invisible", "text-white font-semibold font-poppins text-[20px]")}>
            Support
          </Link>
        </div>
        <div className={clsx(((mainPath==="home" && pathname!=="/home/settings") || (mainPath==="admin")) && "hidden", "w-[173px] h-[54px] flex items-center justify-center")}>
          <Link to="/download" className={clsx((pathname === "/developer") && "invisible", "text-white font-semibold font-poppins text-[20px]")}>
            Download app
          </Link>
        </div>
        <div className={clsx(((mainPath==="home" && pathname!=="/home/settings") || (mainPath==="admin")) && "hidden", "w-[23px] h-[54px] flex items-center justify-center")}>
          <div className={clsx((pathname === "/developer") && "invisible", "w-[3px] h-[34px] bg-white")}/>
        </div>
        <div className={clsx(user && "hidden", "w-[132px] h-full")}>
          <Button
            variant="secondary"
            onClick={() => {navigate("/register/email")}}
          >
            Sign up
          </Button>
        </div>
        <div className={clsx(user && "hidden", "w-[132px] h-full")}>
          <Button
            style={{color: `${signInTextColor}`}}
            onClick={() => {navigate("/login")}}
          >
            Sign in
          </Button>
        </div>
        <div className={clsx(!user && "hidden", "h-full relative flex items-center gap-[24px]")}>
          <div
            className={`${(mainPath === "account" && pathname !== "/account") && "hidden"} ${isAdmin(user?.role) && "hover:cursor-pointer"} font-semibold font-poppins text-[${(mainPath==="home" || mainPath==="admin") ? "16" : "20"}px] text-white`}
            onClick={() => {isAdmin(user?.role) && navigate("/admin")}}
          >
            {(mainPath === "account") ? "Profile" : user?.userName}
          </div>
          <img
            src={avatarUrl}
            alt="avatar"
            className="aspect-square rounded-full hover:cursor-pointer"
            style={{height: height}}
            onClick={() => {setUserMenuOpen(!userMenuOpen)}}
          />
          <img
            src="/assets/icons/icon19.svg"
            alt="icon"
            className={`${(mainPath !== "account" && pathname !== "/home/settings") && "hidden"} h-[6.58px]`}
          />
          <div className={clsx(!userMenuOpen && "hidden", "w-[182px] h-[288px] flex items-center rounded-[20px] bg-[#383838]/[20%] border border-white/[80%] backdrop-blur-[8.3px] absolute right-0 bottom-[-300px] z-10")}>
            <div className="h-[216px] ml-[22px] flex flex-col justify-between font-semibold font-inter text-[20px] text-white">
              <Link to="/account" className="gap-[12px] flex items-center hover:cursor-pointer">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <img src="/assets/icons/icon13.svg" alt="icon" className="h-[21px]"/>
                </div>
                Account
              </Link>
              <Link to="/support" className="gap-[12px] flex items-center hover:cursor-pointer">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <img src="/assets/icons/icon14.svg" alt="icon" className="h-[20px]"/>
                </div>
                Support
              </Link>
              <Link to="/download" className="gap-[12px] flex items-center hover:cursor-pointer">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <img src="/assets/icons/icon15.svg" alt="icon" className="h-[20px]"/>
                </div>
                Download
              </Link>
              <Link to="/settings" className="gap-[12px] flex items-center hover:cursor-pointer">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <img src="/assets/icons/icon16.svg" alt="icon" className="h-[20px]"/>
                </div>
                Settings
              </Link>
              <div className="gap-[12px] flex items-center hover:cursor-pointer"
                onClick={handleLogout}>
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <img src="/assets/icons/icon17.svg" alt="icon" className="h-[19px]"/>
                </div>
                Sign out
              </div>
            </div>
          </div>
        </div>
      </div>
      {pathname === "/vacancy" && (
        <div className="w-[132px] h-[67px] ">
          <Button
            style={{color: `${signInTextColor}`}}
            onClick={() => {navigate("/jobs")}}
          >
            All jobs
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;