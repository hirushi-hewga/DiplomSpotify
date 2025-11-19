import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "components/admin/AdminLayout.tsx";
import ArtistCreatePage from 'components/pages/admin/artist/ArtistCreatePage.tsx';
import AccountLayout from "components/pages/auth/AccountLayout.tsx";
import LoginPage from "components/pages/auth/LoginPage.tsx";
import RegisterPage from "components/pages/auth/RegisterPage.tsx";
import Layout from "components/main/Layout.tsx";
import BackgroundSetter from "components/BackgroundSetter";
import SubscriptionsPage from "components/pages/main/SubscriptionsPage";
import PaymentPage from "components/pages/main/PaymentPage";
import GenresPage from "components/pages/main/GenresPage";
import PlaylistsPage from "components/pages/main/PlaylistsPage";
import FavoritePage from "components/pages/main/FavoritePage";
import { PlayerProvider } from "components/main/player/PlayerProvider";
import PrivateRoute from "components/pages/auth/PrivateRoute";
import ResetPasswordPage from "components/pages/auth/ResetPasswordPage";
import ForgotPasswordPage from "components/pages/auth/ForgotPasswordPage";
import ArtistsPage from "components/pages/main/ArtistsPage.tsx";
import ArtistPage from "components/pages/admin/artist/ArtistPage";
import PlaylistPage from "components/pages/main/PlaylistPage";
import HomePage from "components/pages/main/home/HomePage";

const App = () => {
  return (
    <PlayerProvider>
      <BackgroundSetter/>
      <Routes>
      
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="favorite" element={<FavoritePage/>}/>

            <Route path="albums" element={<></>}/>
            <Route path="playlists" element={<PlaylistsPage/>}/>
            <Route path="playlist" element={<PlaylistPage />} />
            <Route path="artists" element={<ArtistsPage/>}/>
            <Route path="account" element={<></>}/>
        
            <Route path="friends" element={<></>}/>
            <Route path="genres" element={<GenresPage/>}/>
            <Route path="notification" element={<></>}/>
        
            <Route path="premium" element={<SubscriptionsPage/>}/>
            <Route path="payment" element={<PaymentPage/>}/>
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="artists">
              <Route path="list" element={<ArtistPage />} />
              <Route path="create" element={<ArtistCreatePage />} />
            </Route>
          </Route>
        </Route>

        <Route element={<AccountLayout />}>
          <Route path="register" element={<RegisterPage/>}/>
          <Route path="login" element={<LoginPage />} />
          <Route path="resetPassword" element={<ResetPasswordPage />} />
          <Route path="forgotPassword" element={<ForgotPasswordPage/>} />
        </Route>
    
      </Routes>
    </PlayerProvider>
  );
}
export default App