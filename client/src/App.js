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
import LanguagePage from "./routes/LanguagePage/LanguagePage";
import ProductsPage from "./routes/ProductsPage/ProductsPage";
import ProductPage from "./routes/ProductPage/ProductPage";
import Error404Page from "./routes/404Page/Error404Page";
import Intro from "./components/Intro/Intro";
import Header from "./components/Header/Header";
import Container from "@material-ui/core/Container";
import { UserContext } from "./context/UserContext";
import useFindUser from "./utils/useFindUser";
import { MessageProvider } from "./context/MessageContext";
import useStorageLocale from "./utils/useStorageLocale";

function App() {
  const { user, setUser, isLoading } = useFindUser();
  const { storageLocale, messages } = useStorageLocale();

  console.log("USER_CONTEXT", user);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <IntlProvider locale={storageLocale} messages={messages}>
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
                    path="/user/products"
                    element={
                      <PrivateRoutePage>
                        <ProductsPage />
                      </PrivateRoutePage>
                    }
                  />
                  <Route
                    exact
                    path="/user/product/:productid"
                    element={
                      <PrivateRoutePage>
                        <ProductPage />
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
                    path="/user/language"
                    element={
                      <PrivateRoutePage>
                        <LanguagePage />
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
                  <Route
                    exact
                    path="*"
                    element={
                      <PrivateRoutePage>
                        <Error404Page />
                      </PrivateRoutePage>
                    }
                  />
                </Routes>
              </Container>
              <Intro />
            </MessageProvider>
          </IntlProvider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

// Refactor
// Add products page
// Change header and home page layout to include products
// Put logout to bottom of home page instead of navbar

export default App;
