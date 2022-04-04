import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import useAuth from "../../utils/useAuth";

function SignupPage() {
  const { signupUser, error, clearError } = useAuth();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    passwordCheck: "",
  });

  const handleSignup = async (e) => {
    console.log("SIGN", e);
    e.preventDefault();
    await signupUser(user);
  };

  const handleInputChange = (event, field) => {
    clearError();
    setUser({ ...user, [field]: event.target.value });
  };
  console.log(user);

  return (
    <div className="login-page">
      <h3 className="route-title">SIGN UP</h3>
      <div>
        <form>
          <TextField
            error={error ? true : false}
            id="signup-fullname"
            label="Full name"
            variant="outlined"
            autoComplete="off"
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
            value={user.passwordCheck}
            onChange={(e) => handleInputChange(e, "passwordCheck")}
            fullWidth
          />
          <p className="form-msg">
            Are you already a member?{" "}
            <span>
              <Link href="/login" underline="none">
                LOG IN
              </Link>
            </span>
          </p>
          <Button
            type="submit"
            fullWidth
            className="auth-btn"
            onClick={handleSignup}
          >
            SIGNUP
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
