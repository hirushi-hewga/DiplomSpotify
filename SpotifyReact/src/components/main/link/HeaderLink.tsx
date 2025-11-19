import { NavLink, useLocation } from "react-router-dom";

interface HeaderLinkProps {
  to: string;
  icon: React.ReactNode;
  activeCondition?: (pathname: string) => boolean;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ to, icon, activeCondition }) => {
  const { pathname } = useLocation();
  const isActive = activeCondition ? activeCondition(pathname) : pathname.includes(to);

  return (
    <NavLink
        end
        to={to}
        className={`flex items-center justify-center transition duration-150 mx-[7px] w-[62px] h-[37px] bg-[#3b3b3b] rounded-full`}
    >
      <div className="">{icon}</div>
    </NavLink>
  );
};

export default HeaderLink;