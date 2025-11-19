import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { User } from "interfaces/user";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "services/user.ts";
import { useAppDispatch } from "store/index.ts";
import { setCredentials } from "store/slice/userSlice.ts";
import { jwtParser } from "utils/jwtParser.ts";
import showToast from "utils/toastShow.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import React, { useState } from "react";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState<Date>(new Date());

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleRegister = async () => {
        const formattedBirthDate = birthDate.toLocaleDateString('en-GB');
        const res = await register({ name, image, email, username, password, birthDate: formattedBirthDate});
        if (res && "data" in res && res.data) {
            setUser(res.data.token);
            showToast(`Реєстрація успішна!`, "success");
        } else {
            showToast(`Помилка реєстраціі. Перевірте ваші дані!`, "error");
        }
    };

    const setUser = (token: string) => {
        localStorage.setItem("authToken", token);

        dispatch(
            setCredentials({
                user: jwtParser(token) as User,
                token: token,
            }),
        );
        navigate("/");
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
                <form className="flex flex-col min-w-448">
                    <div className="mt-14">
                        <Input
                            className="bg-loginEditTextBg text-white focus:border-none rounded-lg focus:ring-0 border-none"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            type="text"
                            placeholder="Name"
                        />
                    </div>
                    <div className="mt-4">
                        <Input
                            className="bg-loginEditTextBg text-white focus:border-none rounded-lg focus:ring-0 border-none"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="flex">
                        <div className="mt-4 w-full">
                            <DatePicker
                                required
                                selected={birthDate}
                                onChange={(date: Date | null) => { date ? setBirthDate(date) : null }}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Birth date"
                                className="bg-loginEditTextBg text-white rounded-lg p-2 border-0"
                            />
                        </div>
                        <div className="mt-4 w-full">
                            <label className="block relative bg-loginEditTextBg text-white rounded-lg p-2 border-0 cursor-pointer w-full">
                                <span className="text-sm"> 
                                    {image ? image.name : "Add photo profile"}
                                </span>
                                <input
                                    onChange={handleImageChange}
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <img src="/assets/add.png" alt="" className="absolute w-6 h-6 right-2 top-1/2 transform -translate-y-1/2"/>
                            </label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Input
                            className="bg-loginEditTextBg text-white focus:border-none rounded-lg focus:ring-0 border-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
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
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                      <Button
                          disabled={isLoading}
                          type="button"
                          onClick={handleRegister}
                          variant="primary"
                          className="bg-loginTextColor2 w-60 h-14 rounded-full mt-6 text-[24px] font-roboto text-2xl font-normal hover:bg-transparent"
                      >
                          Sign Up
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
                <div className="flex justify-center pt-9 pb-9">
                    <span className="text-white text-[18px]">Already have an account?</span>
                    &nbsp; { }
                    <a className="text-loginTextColor2 text-[18px] m1-2" href="/login">Sign in</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;