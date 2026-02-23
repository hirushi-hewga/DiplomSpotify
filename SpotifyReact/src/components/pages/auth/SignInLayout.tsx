import { Outlet } from "react-router-dom";

const SignInLayout = () => {
    return (
        <div className="w-screen min-h-screen bg-[#1B1B1B] relative flex flex-col items-center justify-center overflow-hidden z-0">
          <div className="w-[72.9vw] h-[23.15vh] rounded-[100%] absolute left-[13.5vw] top-[-13.9vh] bg-[#FE7C1B] opacity-35 blur-[200px] z-[-1]"/>
          <div className="w-[93.75vw] h-[37vh] rounded-[100%] absolute left-[3.2vw] bottom-[-23.15vh] bg-[#FE7C1B] opacity-50 blur-[200px] z-[-1]"/>
          <Outlet/>
        </div>
    );
};

export default SignInLayout;