import React from "react";
import { Input } from "components/ui/Input.tsx";
import { Button } from "components/ui/Button.tsx";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage3 = () => {
  const navigate = useNavigate();

  return(
    <div className="w-[590px] h-[510px] flex flex-col items-center justify-between text-white">
      <div className="font-semibold font-poppins text-[58px] text-center text-[#FE7D1C]">SUCCESS</div>
      <div className="w-full h-[301px] flex items-center justify-center rounded-[30px] backdrop-blur-[4px] border-white/[80%] border-[1px]">
        <div className="w-[520px] h-[122px] flex flex-col items-center justify-between">
          <div className="w-full h-[50px] flex items-center justify-center font-medium font-poppins text-[20px]">
            Your password has been successfully changed.
          </div>
          <div className="w-full h-[52px]">
            <Button
              onClick={() => navigate("/login")}
              type="submit"
              className="bg-[#F3792A] font-medium text-[20px]"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[353px] h-[43px] font-extralight text-[14px] text-center font-poppins">
        This site is protected by reCAPTCHA and the Google
        Privacy Policy and Terms of Service apply.
      </div>
    </div>
  );
}

export default ResetPasswordPage3;