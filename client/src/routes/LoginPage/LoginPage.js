import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import brandBtnStyle from "../../utils/brandBtnStyle";
import textFieldStyle from "../../utils/textFieldStyle";
import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import useAuth from "../../utils/useAuth";

function LoginPage() {
  const { loginUser, error, clearError } = useAuth();
  const [user, setUser] = useState({ username: "", password: "" });

  const useStyles = makeStyles((theme) => createStyles(textFieldStyle));
  const classes = useStyles();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(user);
  };

  const handleInputChange = (event, field) => {
    clearError();
    setUser({ ...user, [field]: event.target.value });
  };

  return (
    <div>
      <div>
        <h3 className="page-title">LOGIN</h3>
        <div>
          <form>
            <TextField
              error={error ? true : false}
              id="login-username"
              label="Username"
              variant="outlined"
              autoComplete="off"
              size="small"
              classes={{
                root: classes.root,
              }}
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
              size="small"
              classes={{
                root: classes.root,
              }}
              value={user.password}
              onChange={(e) => handleInputChange(e, "password")}
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              className="auth-btn"
              style={brandBtnStyle}
              onClick={handleLogin}
            >
              LOGIN
            </Button>
          </form>
          <p className="form-msg">
            Don't have an account?{" "}
            <span>
              <Link href="/signup" underline="none">
                SIGN UP
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
