import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../../../store/slice/userSlice.ts";

const ProtectedLayout = () => {
  const user = useSelector(getUser);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;