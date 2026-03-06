import { Link } from "react-router-dom";
import { getUser } from "../../../store/slice/userSlice.ts";
import { useSelector } from "react-redux";


const NotFoundPage = () => {
  const user = useSelector(getUser)

  return (
    <div className="w-[100vw] h-[100vh] relative bg-[#0F0F10]">
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 p-[40px] rounded-[20px] border border-white/[80%] bg-black/[10%]">
        <div className="flex flex-col items-center gap-y-[40px]">
          <span className="font-poppins font-semibold text-[#F16001] text-8xl">Not Found Page</span>
          <Link to={user ? "/home" : "/start"} className="h-[62px] px-[50px] rounded-full flex items-center justify-center text-white font-poppins font-semibold text-[24px] border border-white/[80%] bg-white/[10%]">
            Go to main page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;