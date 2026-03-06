import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/slice/userSlice.ts";

const AuthLayout = () => {
  const user = useSelector(getUser);
  if (user) return <Navigate to="/home" replace />;
  return <Outlet />;
};

export default AuthLayout;