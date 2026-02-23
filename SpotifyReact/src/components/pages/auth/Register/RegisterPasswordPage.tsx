import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";



import { useEffect } from "react";

import { step2Schema } from "./register.schema.ts";
import { useRegisterStore } from "./register.store.ts";


type Step2 = z.infer<typeof step2Schema>;

const RegisterPasswordPage = () => {
  const nav = useNavigate();
  const { draft, setDraft } = useRegisterStore();

  useEffect(() => {
    if (!draft.email) nav("/register/email");
  }, [draft.email, nav]);

  const form = useForm<Step2>({
    resolver: zodResolver(step2Schema),
    mode: "onBlur",
    defaultValues: { password: draft.password },
  });

  const onSubmit = (data: Step2) => {
    setDraft(data);
    nav("/register/details");
  };


  return(
    <div className="w-[1065px] mt-[58px] flex flex-col items-center gap-[40px] text-white">
      <div className="w-full h-[50px] flex justify-between font-extralight font-poppins text-[14px]">
        <div className="h-full relative flex flex-col items-center justify-between">
          <div className="w-[7px] h-[7px] rounded-full bg-[#F16001]"/>
          <div>STEP 1</div>
        </div>
        <hr className="flex-1 bg-[#B8B8B8]"/>
        <div className="h-full relative flex flex-col items-center justify-between">
          <div className="w-[21px] h-[21px] rounded-full absolute top-[-7px] left-1/2 -translate-x-1/2 border border-[#F47929]"/>
          <div className="w-[7px] h-[7px] rounded-full bg-[#F16001]"/>
          <div>STEP 2</div>
        </div>
        <hr className="flex-1 bg-[#B8B8B8]"/>
        <div className="h-full relative flex flex-col items-center justify-between">
          <div className="w-[7px] h-[7px] rounded-full bg-[#F16001]"/>
          <div>STEP 3</div>
        </div>
      </div>
      <div className="font-semibold font-poppins text-[58px] text-center text-[#FE7D1C]">CREATE PASSWORD</div>
      <div className="w-[590px] h-[565px] flex items-center justify-center rounded-[30px] backdrop-blur-[4px] border-white/[80%] border-[1px]">
        <form className="w-[524px] h-[436px] flex flex-col items-center justify-between" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full h-[244px] flex flex-col justify-between">
            <div className="w-full h-[52px]">
              <Input type="password" {...form.register("password")} placeholder="Password"/>
            </div>
            <div className="w-full h-[160px] flex flex-col justify-between">
              <div className="font-normal font-poppins text-[16px]">Your password must meet the following requirements:</div>
              <div className="w-full h-[112px] flex flex-col justify-between font-light font-poppins text-[16px]">
                <div className="flex items-center">
                  <div className="w-[18px] aspect-square mr-[15px] rounded-[5px] border"/>be at least 8 characters long;
                </div>
                <div className="flex items-center">
                  <div className="w-[18px] aspect-square mr-[15px] rounded-[5px] border"/>include uppercase and lowercase letters (A–Z, a–z);
                </div>
                <div className="flex items-center">
                  <div className="w-[18px] aspect-square mr-[15px] rounded-[5px] border"/>contain at least one number (0–9);
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[128px] flex flex-col justify-between">
            <div className="w-full h-[52px]">
              <Button type="submit" className="bg-[#F3792A] font-medium text-[20px]">
                Continue
              </Button>
            </div>
            <Link
              to="/register/email"
              className="w-full h-[52px] flex items-center justify-center font-normal font-poppins text-[18px]"
            >
              Previous step
            </Link>
          </div>
        </form>
      </div>
      <div className="w-[353px] h-[43px] font-extralight text-[14px] text-center font-poppins">
        This site is protected by reCAPTCHA and the Google
        Privacy Policy and Terms of Service apply.sss
      </div>
    </div>
  );
}

export default RegisterPasswordPage;