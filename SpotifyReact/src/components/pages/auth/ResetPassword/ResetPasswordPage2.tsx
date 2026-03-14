import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { useLocation, useNavigate } from "react-router-dom";



import React, { useState } from "react";


const ResetPasswordPage2 = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //const [resetPassword, { isLoading, isSuccess, error }] = useResetPasswordMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const urltoken = queryParams.get("token");
  const token = urltoken?.replace(/ /g, '+');
  const email = queryParams.get("email");

  console.log(location);
  console.log(token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Паролі не збігаються");
      return;
    }
  };

  return(
    <div className="w-[589px] h-[573px] flex flex-col items-center justify-between text-white">
      <div className="font-semibold font-poppins text-[58px] text-center text-[#FE7D1C]">RESET PASSWORD</div>
      <div className="w-full h-[364px] flex items-center justify-center rounded-[30px] backdrop-blur-[4px] border-white/[80%] border-[1px]">
        <form className="w-[521px] h-[244px] flex flex-col justify-between" onSubmit={handleSubmit}>
          <div className="w-full h-[128px] flex flex-col justify-between">
            <div className="w-full h-[52px]">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                minLength={8}
                id="password"
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="w-full h-[52px]">
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                minLength={8}
                id="confirmPassword"
                placeholder="Repeat your new password"
                required
              />
            </div>
          </div>
          <div className="w-full h-[52px]">
            <Button
              onClick={() => navigate("/reset-password/success")}
              type="submit"
              className="bg-[#F3792A] font-medium text-[20px]"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
      <div className="w-[353px] h-[43px] font-extralight text-[14px] text-center font-poppins">
        This site is protected by reCAPTCHA and the Google
        Privacy Policy and Terms of Service apply.
      </div>
    </div>
  );
}

export default ResetPasswordPage2;