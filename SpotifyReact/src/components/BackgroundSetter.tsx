import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const BackgroundSetter = () => {
  const location = useLocation();
  
  useEffect(() => {
    let backgroundImage = '';
    switch (location.pathname) {
      case '/':
        backgroundImage = '/assets/background_main.png';
        break;
      case '/library':
        backgroundImage = '/assets/background_main.png';
        break;
      case '/favorite':
        backgroundImage = '/assets/background_main.png';
        break;
      case '/albums':
        backgroundImage = '/assets/background_main.png';
        break;
      case '/playlists':
        backgroundImage = '/assets/background_main.png';
        break;
      case '/forartist':
        backgroundImage = '/assets/background_main.png';
        break;
      case '/premium':
        backgroundImage = '/assets/background_premium.png';
        break;
      case '/account':
        backgroundImage = '/assets/background_main.png';
        break;
      case '/auth/login':
        backgroundImage = '/assets/background_auth.png';
        break;
      case '/auth/register':
        backgroundImage = '/assets/background_auth.png';
        break;
      case '/admin':
        backgroundImage = '/assets/background_admin.png';
        break;
      default:
        backgroundImage = '/assets/background_main.png';
        break;
    }
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }, [location]);

  return null;
};

export default BackgroundSetter;
