import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Protected route example */}
          <Route exact path="/" element={<Home />} />
          {/* Simple Route example */}
          {/* <Route exact path="/example" element={<LoginPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
