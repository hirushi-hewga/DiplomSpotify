import { Outlet } from "react-router-dom";

const AccountLayout = () => {
    return (
        <div className="bg-auth h-screen w-screen bg-cover flex justify-center items-center">
            <div className="absolute inset-0 z-0 bg-black opacity-65"/>
            <Outlet/>
        </div>
    );
};

export default AccountLayout;