import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterStore } from "./register.store.ts";
import { step1Schema } from "./register.schema.ts";
import { z } from "zod";

type Step1 = z.infer<typeof step1Schema>;

const RegisterEmailPage = () => {
  const nav = useNavigate();
  const { draft, setDraft } = useRegisterStore();

  const form = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    mode: "onBlur",
    defaultValues: { email: draft.email },
  });

  const onSubmit = (data: Step1) => {
    setDraft(data);
    nav("/register/password");
  };

    return (
      <div className="w-[1065px] mt-[58px] flex flex-col items-center gap-[40px] text-white">
        <div className="w-full h-[50px] flex justify-between font-extralight font-poppins text-[14px]">
          <div className="h-full relative flex flex-col items-center justify-between">
            <div className="w-[21px] h-[21px] rounded-full absolute top-[-7px] left-1/2 -translate-x-1/2 border border-[#F47929]"/>
            <div className="w-[7px] h-[7px] rounded-full bg-[#F16001]"/>
            <div>STEP 1</div>
          </div>
          <hr className="flex-1 bg-[#B8B8B8]"/>
          <div className="h-full relative flex flex-col items-center justify-between">
            <div className="w-[7px] h-[7px] rounded-full bg-[#F16001]"/>
            <div>STEP 2</div>
          </div>
          <hr className="flex-1 bg-[#B8B8B8]"/>
          <div className="h-full relative flex flex-col items-center justify-between">
            <div className="w-[7px] h-[7px] rounded-full bg-[#F16001]"/>
            <div>STEP 3</div>
          </div>
        </div>
        <div className="font-semibold font-poppins text-[58px] text-center text-[#FE7D1C]">SIGN UP</div>
        <div className="w-[590px] h-[550px] flex items-center justify-center rounded-[30px] backdrop-blur-[4px] border-white/[80%] border-[1px]">
          <div className="w-[524px] h-[436px] flex flex-col items-center justify-between">
            <form className="w-full h-[128px] flex flex-col justify-between" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="w-full h-[52px]">
                <Input {...form.register("email")} placeholder="Enter your email"/>
              </div>
              <div className="w-full h-[52px]">
                <Button type="submit" className="bg-[#F3792A] font-medium text-[20px]">
                  Continue
                </Button>
              </div>
            </form>
            <div className="w-full flex items-center justify-between font-extralight font-poppins text-[16px]">
              <hr className="w-[228px]"/>or<hr className="w-[228px]"/>
            </div>
            <div className="w-full h-[128px] flex flex-col justify-between">
              <div className="w-full h-[52px]">
                <Button className="bg-[#545454] flex gap-[10px] font-normal text-[18px]">
                  <img
                    src="/assets/icons/icon20.svg"
                    alt="icon"
                    className="h-[18px]"
                  />
                  Sign in with Google
                </Button>
              </div>
              <div className="w-full h-[52px]">
                <Button className="bg-[#545454] flex gap-[10px] font-normal text-[18px]">
                  <img
                    src="/assets/icons/icon21.svg"
                    alt="icon"
                    className="h-[21px]"
                  />
                  Sign in with Apple
                </Button>
              </div>
            </div>
            <div className="font-light font-poppins text-[16px]">
              Already have an account? <a href="/login" className="font-semibold">Sign In</a>
            </div>
          </div>
        </div>
        <div className="w-[353px] h-[43px] font-extralight text-[14px] text-center font-poppins">
          This site is protected by reCAPTCHA and the Google
          Privacy Policy and Terms of Service apply.sss
        </div>
      </div>
    );
};

export default RegisterEmailPage;