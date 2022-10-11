import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { LOCAL_STORE } from "./constants/localStore";
import { Dashboard } from "./page/Dashboard";
import { FormLogin } from "./page/Login";
import { getStorage } from "./utils/localStorage";
export function AppRoutes() {
  const Private = ({ children }: any) => {
    const user = getStorage(LOCAL_STORE.USER);
    if (!user) {
      return <Navigate to="/" />;
    }
    return children;
  };
  const AutoLogin = ({ children }: any) => {
    const user = getStorage(LOCAL_STORE.USER);
    if (user) {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AutoLogin>
              <FormLogin />
            </AutoLogin>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />
      </Routes>
    </Router>
  );
}
