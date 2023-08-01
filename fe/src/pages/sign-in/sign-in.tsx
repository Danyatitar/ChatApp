import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AppPath from "../../common/paths";
import * as styles from "./sign-in.styles";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8082/api/auth/login", {
        phoneNumber,
        password,
      });
      navigate(AppPath.ROOT);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1>Login</h1>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          justifySelf: "center",
          gap: "0.5rem",
          minWidth: "250px",
        }}
      >
        <TextField
          label="Phone Number"
          variant="outlined"
          autoComplete="off"
          sx={styles.TextField}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          sx={styles.TextField}
          inputProps={{
            form: {
              autocomplete: "off",
            },
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={styles.Button}>
          Login
        </Button>
        <p>
          Don't have an account yet?{" "}
          <Link to={AppPath.SIGNUP} className="link">
            Register one
          </Link>
        </p>
      </form>
    </Box>
  );
};

export default LoginPage;
