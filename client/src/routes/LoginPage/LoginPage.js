import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import useAuth from "../../utils/useAuth";

function LoginPage() {
  const { loginUser, error, clearError } = useAuth();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(user);
  };

  const handleInputChange = (event, field) => {
    clearError();
    setUser({ ...user, [field]: event.target.value });
  };

  return (
    <div className="login-page">
      <Container maxWidth="sm" className="main-container">
        <h3 className="route-title">LOGIN</h3>
        <div>
          <form>
            <TextField
              error={error ? true : false}
              id="login-username"
              label="Username"
              variant="outlined"
              autoComplete="off"
              value={user.username}
              onChange={(e) => handleInputChange(e, "username")}
              fullWidth
            />
            <TextField
              error={error ? true : false}
              helperText={error && error.msg}
              id="login-password"
              type="password"
              label="Password"
              variant="outlined"
              autoComplete="off"
              value={user.password}
              onChange={(e) => handleInputChange(e, "password")}
              fullWidth
            />
            <p className="form-msg">
              Are you a newbie?{" "}
              <span>
                <Link href="/signup" underline="none">
                  SIGN UP
                </Link>
              </span>
            </p>
            <Button
              type="submit"
              fullWidth
              className="auth-btn"
              onClick={handleLogin}
            >
              LOGIN
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
