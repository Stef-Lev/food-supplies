import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage/HomePage";
import LoginPage from "./routes/LoginPage/LoginPage";
import PrivateRoutePage from "./routes/PrivateRoutePage/PrivateRoutePage";
import RedirectLoginPage from "./routes/RedirectLoginPage/RedirectLoginPage";
import SignupPage from "./routes/SignupPage/SignupPage";
import AddProductsPage from "./routes/AddProductsPage/AddProductsPage";
import ProductsListPage from "./routes/ProductsListPage/ProductsListPage";
import ListsPage from "./routes/ListsPage/ListsPage";
import OverviewPage from "./routes/OverviewPage/OverviewPage";
import Header from "./components/Header/Header";
import Container from "@material-ui/core/Container";
import { UserContext } from "./context/UserContext";
import useFindUser from "./utils/useFindUser";
import { MessageProvider } from "./context/MessageContext";

function App() {
  const { user, setUser, isLoading } = useFindUser();
  console.log("USER_CONTEXT", user);
  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setUser, isLoading }}>
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
                  path="/user/overview"
                  element={
                    <PrivateRoutePage>
                      <OverviewPage />
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
        </UserContext.Provider>
      </Router>
    </div>
  );
}

//Add rename to edit functionality
//Enrich the ui of the add product section
//Add language support
//Add push notifications 1 week before something expires
//Refactor

export default App;
