import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage/HomePage";
import LoginPage from "./routes/LoginPage/LoginPage";
import PrivateRoutePage from "./routes/PrivateRoutePage/PrivateRoutePage";
import RedirectLoginPage from "./routes/RedirectLoginPage/RedirectLoginPage";
import SignupPage from "./routes/SignupPage/SignupPage";
import { UserContext } from "./context/UserContext";
import useFindUser from "./utils/useFindUser";

function App() {
  const { user, setUser, isLoading } = useFindUser();
  // console.log("USER_CONTEXT", user);
  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoutePage>
                  <HomePage />
                </PrivateRoutePage>
              }
            />
            <Route
              exact
              path="/login"
              element={
                <RedirectLoginPage>
                  <LoginPage />
                </RedirectLoginPage>
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <RedirectLoginPage>
                  <SignupPage />
                </RedirectLoginPage>
              }
            />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
