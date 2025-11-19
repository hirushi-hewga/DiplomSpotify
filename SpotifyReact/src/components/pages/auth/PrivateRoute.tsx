import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "store";
import { getToken } from "store/slice/userSlice";

const PrivateRoute = () => {
  const token = useAppSelector(getToken);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;