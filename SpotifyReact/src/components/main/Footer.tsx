import { clsx } from "clsx";
import { Link } from "react-router-dom";

const Footer = ({className = ""}) => {
  return (
    <div className={clsx(className, "w-full h-[575px] flex justify-center relative overflow-hidden border-black/[80%] border-[1px] z-0")}>
      <div className="w-[93.4vw] h-[109.6vh] rounded-[100%] absolute left-[6.25%] top-[157%] opacity-[0.55] -translate-y-1/2 bg-[#A5180C] blur-[200px] z-[-1]"></div>
      <div className="w-[1541px] mt-[72px]">
        <div className="w-full h-[311px] flex flex-col justify-between ">
          <div className="w-full h-[196px] flex justify-between items-center text-white">
            <div className="w-[763px] h-full font-poppins flex justify-between">
              <div className="w-[141px] h-[105px] flex flex-col justify-between ">
                <div className="w-full h-[23px] font-semibold text-[18px] ">
                  COMPANY
                </div>
                <div className="w-full h-[58px] flex flex-col justify-between text-[18px] ">
                  <Link to="/start">About us</Link>
                  <Link to="/vacancy">Vacancy</Link>
                </div>
              </div>
              <div className="w-[184px] h-[105px] flex flex-col justify-between ">
                <div className="w-full h-[23px] font-semibold text-[18px] ">
                  COMMUNITIES
                </div>
                <div className="w-full h-[58px] flex flex-col justify-between text-[18px] ">
                  <Link to="/developer">For developers</Link>
                  <Link to="/artist">For artist</Link>
                </div>
              </div>
              <div className="w-[198px] h-full flex flex-col justify-between ">
                <div className="w-full h-[23px] font-semibold text-[18px] ">
                  USEFUL LINKS
                </div>
                <div className="w-full h-[149px] flex leading-[124%] flex-col justify-between text-[18px] ">
                  <Link to="/support">Support</Link>
                  <Link to="/">Web player</Link>
                  <Link to="/download">Free mobile app</Link>
                  <Link to="/">Import your own music</Link>
                </div>
              </div>
            </div>
            <div className="w-[194px] h-[161px] font-extralight font-inter text-[16px] leading-[124.7%] flex flex-col justify-between">
              <Link to="/">Legal Information</Link>
              <Link to="/">Security & Privacy Center</Link>
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Accessibility</Link>
            </div>
          </div>
          <div className="w-full h-0 rounded-[2px] border-[1px] border-white"/>
        </div>
        <div className="w-full mt-[68px] flex justify-between items-center ">
          <img
            src="/assets/icons/text_logo.svg"
            alt="logo"
            className="w-[144.75px] h-[47.07px] "
          />
          <div className="w-[124px] h-[19px] flex justify-between items-center font-inter">
            <div className="w-[14px] h-[14px] rounded-full border-[1px] border-[#919090] text-[8px] text-[#919090] leading-none text-center flex items-center justify-center">C</div>
            <div className="text-[16px] text-[#919090] text-center leading-none">2026 Echo AB</div>
          </div>
          <div className="w-[202px] h-[52px] flex justify-between ">
            <div className="w-[52px] h-[52px] rounded-full bg-white">
              <a href="/public" className="w-full h-full rounded-full flex items-center justify-center">
                <img
                  src="/assets/social_icons/icon1.svg"
                  alt="social_icon"
                  className="w-[28px] h-[28px]"
                />
              </a>
            </div>
            <div className="w-[52px] h-[52px] rounded-full bg-white">
              <a href="/public" className="w-full h-full rounded-full flex items-center justify-center">
                <img
                  src="/assets/social_icons/icon2.svg"
                  alt="social_icon"
                  className="w-[29.33px] h-[25.69px]"
                />
              </a>
            </div>
            <div className="w-[52px] h-[52px] rounded-full bg-white">
              <a href="/public" className="w-full h-full rounded-full flex items-center justify-center">
                <img
                  src="/assets/social_icons/icon3.svg"
                  alt="social_icon"
                  className="w-[28px] h-[28px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;