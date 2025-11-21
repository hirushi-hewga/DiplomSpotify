import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "utils/contexts/ThemeContext";
import App from "./App.tsx";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </Router>
  </Provider>
)