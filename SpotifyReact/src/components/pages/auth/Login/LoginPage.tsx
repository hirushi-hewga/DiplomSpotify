import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, loginSchema } from "components/pages/auth/Login/login.schema.ts";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtParser } from "utils/jwtParser.ts";
import { setCredentials } from "../../../../store/slice/userSlice.ts";
import { useAppDispatch } from "store";
import { useLoginMutation } from "services/user";


const LoginPage = () => {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const emailFromRegister = (location.state as any)?.email ?? "";

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: emailFromRegister,
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    const res = await fetch("http://localhost:5014/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const json = await res.json();

    if (!res.ok || !json.isSuccess) {
      return;
    }

    const { accessToken, refreshToken } = json.payload;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const user = jwtParser(accessToken);

    dispatch(setCredentials({ accessToken, user }));

    nav("/", { replace: true });
  };

    return (
      <div className="w-[589px] h-[911px] flex flex-col items-center justify-between text-white">
        <div className="font-semibold font-poppins text-[58px] text-center text-[#FE7D1C]">SIGN IN</div>
        <div className="w-full h-[702px] flex items-center justify-center rounded-[30px] backdrop-blur-[4px] border-white/[80%] border-[1px]">
          <div className="w-[524px] h-[584px] flex flex-col items-center justify-between">
            <div className="w-full h-[464px] flex flex-col justify-between">
              <form className="w-full h-[224px] flex flex-col justify-between" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="w-full h-[128px] flex flex-col justify-between">
                  <div className="w-full h-[52px]">
                    <Input
                      {...form.register("email")}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>
                  <div className="w-full h-[52px]">
                    <Input
                      {...form.register("password")}
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                  </div>
                </div>
                <div className="w-full h-[52px]">
                  <Button type="submit" disabled={form.formState.isSubmitting} className="bg-[#F3792A] font-medium text-[20px]">
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
                      className="h-[18px]"
                    />
                    Sign in with Apple
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-[256px] h-[80px] flex flex-col items-center justify-between">
              <Link to="/reset-password/email" className="font-semibold font-poppins text-[16px]">Forgot your password?</Link>
              <div className="font-light font-poppins text-[16px]">
                Don`t have an account? <Link to="/register/email" className="font-semibold">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[353px] h-[43px] font-extralight text-[14px] text-center font-poppins">
          This site is protected by reCAPTCHA and the Google
          Privacy Policy and Terms of Service apply.
        </div>
      </div>
    );
};

export default LoginPage;