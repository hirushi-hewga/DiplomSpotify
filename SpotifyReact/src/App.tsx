import TopScroll from "components/TopScroll.tsx";
import { PlayerProvider } from "components/main/player/PlayerProvider";
import AuthLayout from "components/pages/auth/AuthLayout.tsx";
import LoginPage from "components/pages/auth/Login/LoginPage.tsx";
import RegisterDetailsPage from "components/pages/auth/Register/RegisterDetailsPage.tsx";
import RegisterEmailPage from "components/pages/auth/Register/RegisterEmailPage.tsx";
import RegisterPasswordPage from "components/pages/auth/Register/RegisterPasswordPage.tsx";
import ResetPasswordPage1 from "components/pages/auth/ResetPassword/ResetPasswordPage1.tsx";
import ResetPasswordPage2 from "components/pages/auth/ResetPassword/ResetPasswordPage2.tsx";
import ResetPasswordPage3 from "components/pages/auth/ResetPassword/ResetPasswordPage3.tsx";
import SignInLayout from "components/pages/auth/SignInLayout.tsx";
import SignUpLayout from "components/pages/auth/SignUpLayout.tsx";
import JobPage from "components/pages/main/JobPage.tsx";
import DownloadPage from "components/pages/main/DownloadPage.tsx";
import ForArtistsPage from "components/pages/main/ForArtistsPage.tsx";
import ForDevelopersPage from "components/pages/main/ForDevelopersPage.tsx";
import JobsPage from "components/pages/main/JobsPage.tsx";
import StartPage from "components/pages/main/StartPage.tsx";
import SupportPage from "components/pages/main/SupportPage.tsx";
import VacancyPage from "components/pages/main/VacancyPage.tsx";
import HomePage from "components/pages/main/home/HomePage.tsx";
import NotFoundPage from "components/pages/notFound/NotFoundPage.tsx";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";



import "./App.css";
import { getUser } from "./store/slice/userSlice.ts";
import ProtectedLayout from "components/pages/main/home/ProtectedLayout.tsx";
import PlaylistsPage from "components/pages/main/home/PlaylistsPage.tsx";
import AccountPage from "components/pages/main/account/AccountPage.tsx";
import AccountLayout from "components/pages/main/account/AccountLayout.tsx";
import AdminPage from "components/pages/admin/AdminPage.tsx";


const App = () => {
  const user = useSelector(getUser);

  const isAdmin = (role?: string | string[]) =>
    Array.isArray(role)
      ? role.includes("admin")
      : role === "admin";

  return (
    <PlayerProvider>
      <TopScroll />
      <Routes>
        <Route path="/">
          <Route path="/" element={user ? <Navigate to="/home" replace /> : <StartPage />} />
          <Route path="developer" element={<ForDevelopersPage />} />
          <Route path="artist" element={<ForArtistsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="download" element={<DownloadPage />} />
          <Route path="vacancy" element={<VacancyPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="job" element={<JobPage />} />

          <Route path="" element={<ProtectedLayout />} >
            <Route path="home" element={<HomePage />} >
              <Route path="playlists" element={<PlaylistsPage />} />
            </Route>
            <Route path="account" element={<AccountLayout />} >
              <Route path="" element={<AccountPage />} />
            </Route>
          </Route>
        </Route>

        {isAdmin(user?.role) && (
          <Route path="admin" element={<AdminPage />} />
        )}

        <Route element={<AuthLayout />}>
          <Route path="register" element={<SignUpLayout />}>
            <Route path="email" element={<RegisterEmailPage />} />
            <Route path="password" element={<RegisterPasswordPage />} />
            <Route path="details" element={<RegisterDetailsPage />} />
          </Route>

          <Route element={<SignInLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="reset-password">
              <Route path="email" element={<ResetPasswordPage1 />} />
              <Route path="password" element={<ResetPasswordPage2 />} />
              <Route path="success" element={<ResetPasswordPage3 />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PlayerProvider>
  );
};
export default App;