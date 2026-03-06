import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../../../store/slice/userSlice.ts";
import { usePlayerAudio } from "../../../../features/player/usePlayerAudio.ts";
import { PlayerBar } from "../../../../features/player/PlayerBar.tsx";

const ProtectedLayout = () => {
  const user = useSelector(getUser);
  usePlayerAudio();

  if (!user) {
    return <Navigate to="/start" replace />;
  }

  return (
    <>
      <Outlet />
      <PlayerBar />
    </>
  )
};

export default ProtectedLayout;