import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";

type SidebarLinkProps = {
  to: string;
  icon: string;
  activeIcon: string;
  hoverIcon: string;
  iconClassName: string;
  text: string;
  isActive?: boolean;
};

const SidebarLink = ({
                        to,
                        icon,
                        activeIcon,
                        hoverIcon,
                        iconClassName,
                        text,
                        isActive: externalIsActive
                     }: SidebarLinkProps) => {
  const { pathname } = useLocation();

  const isActive = externalIsActive ?? pathname === to;
  
  return (
    <Link
      to={to}
      className={clsx(
        "group gap-[12px] flex items-center hover:cursor-pointer",
        isActive ? "text-[#F16001]" : "hover:text-[#FF934C]"
      )}
    >
      <div className="w-[24px] h-[24px] flex items-center justify-center relative">
        <img
          src={`/assets/icons/sidebar/icon${isActive ? activeIcon : icon}.svg`}
          alt="icon"
          className={clsx(!isActive && "group-hover:hidden", iconClassName)}
        />
        {!isActive && (
          <img
            src={`/assets/icons/sidebar/icon${hoverIcon}.svg`}
            alt="icon"
            className={clsx("hidden group-hover:block absolute", iconClassName)}
          />
        )}
      </div>
      {text}
    </Link>
  )
}

export default SidebarLink;