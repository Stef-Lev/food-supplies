import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Example from "./components/Example/Example";

function App() {
  return (
    <div className="App">
      <h1>You are ready to start your MERN stack Project</h1>
      <Example />
      <Router>
        <Routes>
          {/* Protected route example */}
          {/* <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          /> */}
          {/* Simple Route example */}
          {/* <Route exact path="/example" element={<LoginPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
