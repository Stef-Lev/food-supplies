import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import brandBtnStyle from "../../utils/brandBtnStyle";
import textFieldStyle from "../../utils/textFieldStyle";
import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import useAuth from "../../utils/useAuth";

function SignupPage() {
  const { signupUser, error, clearError } = useAuth();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    passwordCheck: "",
  });

  const useStyles = makeStyles((theme) => createStyles(textFieldStyle));
  const classes = useStyles();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signupUser(user);
  };

  const handleInputChange = (event, field) => {
    clearError();
    setUser({ ...user, [field]: event.target.value });
  };

  return (
    <div className="login-page">
      <h3 className="page-title">SIGN UP</h3>
      <div>
        <form>
          <TextField
            error={error ? true : false}
            id="signup-fullname"
            label="Full name"
            variant="outlined"
            autoComplete="off"
            size="small"
            classes={{
              root: classes.root,
            }}
            value={user.fullname}
            onChange={(e) => handleInputChange(e, "fullname")}
            fullWidth
          />
          <TextField
            error={error ? true : false}
            id="signup-username"
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
            id="signup-password"
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
          <TextField
            error={error ? true : false}
            helperText={error && error.msg}
            id="signup-confirm"
            type="password"
            label="Confirm password"
            variant="outlined"
            autoComplete="off"
            size="small"
            classes={{
              root: classes.root,
            }}
            value={user.passwordCheck}
            onChange={(e) => handleInputChange(e, "passwordCheck")}
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            className="auth-btn"
            style={brandBtnStyle}
            onClick={handleSignup}
          >
            SIGNUP
          </Button>
        </form>
        <p className="form-msg">
          Are you already a member?{" "}
          <span>
            <Link href="/login" underline="none">
              LOG IN
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
