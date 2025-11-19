import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { useLocation, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { useResetPasswordMutation } from "services/user";

const ResetPasswordPage: React.FC = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [resetPassword, { isLoading, isSuccess, error }] = useResetPasswordMutation();
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
      if (token && email){
        await resetPassword({ email, token, password });
        navigate("/login");
      }
  };

    return (
        <div className="relative flex flex-col items-center justify-center shadow-[0px_0px_15px_rgba(255,0,0,0.44)] rounded-3xl">
            <div className="absolute inset-0 bg-black opacity-80 z-0 rounded-3xl"/>
            <div className="flex pt-16 pl-14 pr-14 relative z-10">
                <div>
                  <img className="min-w-[201px] min-h-[160px]" src="/assets/Logo.png" alt="logo"/>
                </div>
                <div className="font-raleway text-48px font-extrabold leading-[56.35px] text-left mt-auto mb-auto pl-6">
                  <span className="text-loginTextColor1">MUSIC</span><span className="text-loginTextColor2">FLOW</span>
                </div>
            </div>
            <div className="relative z-10 w-[448px]">
              <h3 className="font-montserrat font-semibold text-white text-4xl my-[50px]">Change password</h3>
              <span className="font-roboto font-normal text-2xl text-white">
                Enter a new password and confirm it.
              </span>
              <form className="flex flex-col w-full mt-[25px] pb-[120px]" onSubmit={handleSubmit}>
                <div className="mt-4">
                  <Input
                    className="bg-loginEditTextBg text-white focus:border-none rounded-lg focus:ring-0 border-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    minLength={8}
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="mt-4">
                  <Input
                    className="bg-loginEditTextBg text-white focus:border-none rounded-lg focus:ring-0 border-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    minLength={8}
                    id="confirmPassword"
                    placeholder="Confirm password"
                    required
                  />
                </div>
                <a className="text-loginTextColor2 text-[16px] pt-2" href="">Need help?</a>
                <div className="flex justify-center">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    variant="primary"
                    className="bg-loginTextColor2 w-60 h-14 rounded-full mt-6 text-[24px] font-roboto text-2xl font-normal hover:bg-transparent"
                    >
                      Get the link
                  </Button>
                </div>
              </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;