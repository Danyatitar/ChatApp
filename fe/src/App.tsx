import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/sign-in/sign-in";
import RegisterPage from "./pages/sign-up/sign-up";
import AppPath from "./common/paths";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={AppPath.SIGNUP} element={<RegisterPage />} />
        <Route path={AppPath.SIGNIN} element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
