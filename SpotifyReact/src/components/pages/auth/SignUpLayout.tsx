import { Outlet } from "react-router-dom";

const SignUpLayout = () => {
  return (
    <div className="w-screen min-h-screen bg-[#1B1B1B] relative flex flex-col items-center overflow-hidden z-0">
      <div className="w-[400px] h-[1500px] rounded-[100%] absolute left-[-211.5px] top-[-192px] bg-[#FE7C1B] opacity-35 blur-[200px] z-[-1]"/>
      <div className="w-[400px] h-[1500px] rounded-[100%] absolute right-[-211.5px] top-[-192px] bg-[#FE7C1B] opacity-35 blur-[200px] z-[-1]"/>
      <Outlet/>
    </div>
  );
};

export default SignUpLayout;