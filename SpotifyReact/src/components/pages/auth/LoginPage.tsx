import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { User } from "interfaces/user";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleLoginMutation, useLoginMutation } from "services/user.ts";
import { useAppDispatch } from "store/index.ts";
import { setCredentials } from "store/slice/userSlice.ts";
import { jwtParser } from "utils/jwtParser.ts";

import React from "react";

const LoginPage: React.FC = () => {

    // змінює URL та переходить між сторінками
    const navigate = useNavigate();
    // об’єкт, що описує поточне місце у маршрутизації.
    const location = useLocation();
    // функція, яка дозволяє компоненту відправляти екшени в Redux.
    const dispatch = useAppDispatch();

    // стани для збереження значень
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // функції для запиту на зміну даних
    const [googleLogin, { isLoading: isLoadingGoogleLogin }] = useGoogleLoginMutation();
    const [emailLogin, { isLoading: isLoadingEmailLogin }] = useLoginMutation();

    const login = async (e: React.FormEvent) => {
        e.preventDefault();

        // надсилання даних на сервер
        const res = await emailLogin({ email, password });

        if (res && "data" in res && res.data) {
            // збереження токену користувача
            console.log(res.data.token);
            setUser(res.data.token);
        } else {
            // помилка
            console.log()
        }
    };

    const authSuccess = async (credentialResponse: CredentialResponse) => {
        // отримання Google-токену від клієнта і надсилання його на бекенд для авторизації
        const res = await googleLogin({
            credential: credentialResponse.credential || "",
        });
        console.log(res);

        if (res && "data" in res && res.data) {
            // збереження токену користувача
            setUser(res.data.token);
        } else {
            // помилка
            console.log()
        }
    };

    const setUser = (token: string) => {
        // збереження токену в localStorage для повторної авторизації користувача
        localStorage.setItem("authToken", token);

        // Оновлення стану Redux, збереження користувача та токену
        dispatch(
            setCredentials({
                user: jwtParser(token) as User,
                token: token,
            }),
        );

        // перенаправлення користувача після логіну
        const { from } = location.state || { from: { pathname: "/" } };
        navigate(from);
    };

    const authError = () => {
        console.log("Error login. Check your Gmail account!");
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
            <div className="relative z-10">
                <form className="flex flex-col min-w-448" onSubmit={login}>
                    <div className="mt-14">
                        <Input
                            className="bg-loginEditTextBg text-white focus:border-none rounded-lg focus:ring-0 border-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id={"email"}
                            type="email"
                            placeholder="Email"
                            required
                        />
                    </div>
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
                    <a className="text-loginTextColor2 text-[16px] pt-2" href="/forgotPassword">Forgot your password?</a>
                    <div className="flex justify-center">
                        <Button
                            disabled={isLoadingGoogleLogin || isLoadingEmailLogin}
                            type="submit"
                            variant="primary"
                            className="bg-loginTextColor2 w-60 h-14 rounded-full mt-6 text-[24px] font-roboto text-2xl font-normal hover:bg-transparent"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
                <div className="flex mt-12">
                    <div className="w-[40%] flex items-center justify-center">
                        <hr className="w-[100%]" style={{ borderTop: '1px solid white' }}/>
                    </div>
                    <div className="w-[20%] text-center text-white font-roboto font-bold text-[26px]">Or</div>
                    <div className="w-[40%] flex items-center justify-center">
                        <hr className="w-[100%]" style={{ borderTop: '1px solid white' }}/>
                    </div>
                </div>
                {/* <div className="flex justify-center items-cente text-white">
                    <GoogleLogin
                        useOneTap
                        locale="uk"
                        size="large"
                        onSuccess={authSuccess}
                        onError={authError}
                    />
                </div> */}
                <div className="flex justify-center pt-9 pb-9">
                    <span className="text-white text-[18px]">Need an account?</span>
                    &nbsp; { }
                    <a className="text-loginTextColor2 text-[18px] m1-2" href="/register">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;