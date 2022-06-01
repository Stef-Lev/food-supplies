import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import HomePage from "./routes/HomePage/HomePage";
import LoginPage from "./routes/LoginPage/LoginPage";
import PrivateRoutePage from "./routes/PrivateRoutePage/PrivateRoutePage";
import RedirectLoginPage from "./routes/RedirectLoginPage/RedirectLoginPage";
import SignupPage from "./routes/SignupPage/SignupPage";
import AddProductsPage from "./routes/AddProductsPage/AddProductsPage";
import ProductsListPage from "./routes/ProductsListPage/ProductsListPage";
import ListsPage from "./routes/ListsPage/ListsPage";
import ReportPage from "./routes/ReportPage/ReportPage";
import Header from "./components/Header/Header";
import Container from "@material-ui/core/Container";
import { UserContext } from "./context/UserContext";
import useFindUser from "./utils/useFindUser";
import { MessageProvider } from "./context/MessageContext";
import English from "./languages/en.json";
import Greek from "./languages/gr.json";

function App() {
  const { user, setUser, isLoading } = useFindUser();
  const local = navigator.language;
  let lang;
  if (local.includes("en")) {
    lang = Greek;
  } else {
    lang = English;
  }
  console.log("USER_CONTEXT", user);
  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <IntlProvider locale={local} messages={lang}>
            <MessageProvider>
              {user && <Header />}
              <Container maxWidth="sm" className="main-container">
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
                    path="/product"
                    element={
                      <PrivateRoutePage>
                        <AddProductsPage />
                      </PrivateRoutePage>
                    }
                  />
                  <Route
                    exact
                    path="/user/lists"
                    element={
                      <PrivateRoutePage>
                        <ListsPage />
                      </PrivateRoutePage>
                    }
                  />
                  <Route
                    exact
                    path="/user/list/:listid"
                    element={
                      <PrivateRoutePage>
                        <ProductsListPage />
                      </PrivateRoutePage>
                    }
                  />
                  <Route
                    exact
                    path="/user/tables"
                    element={
                      <PrivateRoutePage>
                        <ReportPage />
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
              </Container>
            </MessageProvider>
          </IntlProvider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

//Add language support, add all formatted messages
//Create language page to add locale to localStorage
//Add push notifications 1 week before something expires
//Refactor
//Add clear input adornment to search by name

export default App;
