import { Outlet } from "react-router-dom";
import Header from "components/main/Header.tsx";
import Footer from "components/main/Footer.tsx";

const AccountLayout = () => {
  return (
    <div className="w-full bg-[#0F0F10] relative flex flex-col items-center overflow-hidden z-0">
      <div className="w-[104vw] h-[56.4vh] rounded-[100%] absolute left-[-5.6vw] top-[-46.3vh] bg-[#A5180C] blur-[200px] opacity-70 z-[-1]"/>
      <div className="w-[15vw] h-[66.45%] rounded-[100%] absolute right-[94vw] top-[16%] bg-[#FE7C1B] blur-[200px] opacity-45 z-[-1]"/>
      <div className="w-[15vw] h-[66.45%] rounded-[100%] absolute left-[94vw] top-[16%] bg-[#FE7C1B] blur-[200px] opacity-45 z-[-1]"/>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default AccountLayout;