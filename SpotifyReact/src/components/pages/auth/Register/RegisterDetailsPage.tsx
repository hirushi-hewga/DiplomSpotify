import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useEffect } from "react";
import { fullRegisterSchema, step3Schema } from "./register.schema.ts";
import { useRegisterStore } from "./register.store.ts";

function toIsoDate(date: string) {
  const [day, month, year] = date.split(".");
  return `${year}-${month}-${day}`;
}

type Step3 = z.infer<typeof step3Schema>;

const RegisterDetailsPage = () => {
  const nav = useNavigate();
  const { draft, setDraft, clear } = useRegisterStore();

  useEffect(() => {
    if (!draft.email) nav("/register/email");
    else if (!draft.password) nav("/register/password");
  }, [draft.email, draft.password, nav]);

  const form = useForm<Step3>({
    resolver: zodResolver(step3Schema),
    mode: "onBlur",
    defaultValues: { username: draft.username, birthDate: draft.birthDate },
  });

  const onSubmit = async (data: Step3) => {
    const fullForm = {
      email: draft.email,
      password: draft.password,
      username: data.username,
      birthDate: data.birthDate,
    };

    const parsed = fullRegisterSchema.safeParse(fullForm);
    if (!parsed.success) return;

    setDraft({ username: parsed.data.username, birthDate: parsed.data.birthDate });

    const payload = {
      email: parsed.data.email,
      password: parsed.data.password,
      userName: parsed.data.username,
      birthDate: toIsoDate(parsed.data.birthDate),
    };

    const res = await fetch("http://localhost:5014/api/account/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok || !json.isSuccess) return;

    clear();
    nav("/login");
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
          <div className="w-[7px] h-[7px] rounded-full bg-[#F16001]"/>
          <div>STEP 2</div>
        </div>
        <hr className="flex-1 bg-[#B8B8B8]"/>
        <div className="h-full relative flex flex-col items-center justify-between">
          <div className="w-[21px] h-[21px] rounded-full absolute top-[-7px] left-1/2 -translate-x-1/2 border border-[#F47929]"/>
          <div className="w-[7px] h-[7px] rounded-full bg-[#F16001]"/>
          <div>STEP 3</div>
        </div>
      </div>
      <div className="font-semibold font-poppins text-[58px] text-center text-[#FE7D1C]">USER DETAILS</div>
      <div className="w-[590px] h-[565px] flex items-center justify-center rounded-[30px] backdrop-blur-[4px] border-white/[80%] border-[1px]">
        <form className="w-[520px] h-[430px] flex flex-col items-center justify-between" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full h-[262px] flex flex-col justify-between">
            <div className="w-full h-[109px] flex flex-col justify-between">
              <div className="font-poppins">
                <div className="font-normal text-[16px]">Enter your nickname.</div>
                <div className="font-extralight text-[14px]">This name will be visible to other users.</div>
              </div>
              <div className="w-full h-[52px]">
                <Input {...form.register("username")} placeholder="Nickname"/>
              </div>
            </div>
            <div className="w-full h-[109px] flex flex-col justify-between">
              <div className="font-poppins">
                <div className="font-normal text-[16px]">Enter your date of birth.</div>
                <div className="font-extralight text-[14px]">This information is required for the proper operation of the service.</div>
              </div>
              <div className="w-full h-[52px]">
                <Input {...form.register("birthDate")} placeholder="dd.mm.yyyy"/>
              </div>
            </div>
          </div>
          <div className="w-full h-[124px] flex flex-col justify-between">
            <div className="w-full h-[52px]">
              <Button type="submit" disabled={form.formState.isSubmitting} className="bg-[#F3792A] font-medium text-[20px]">
                Get started
              </Button>
            </div>
            <Link
              to="/register/password"
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

export default RegisterDetailsPage;