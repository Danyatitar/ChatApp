import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AppPath from "../../common/paths";
import * as styles from "./sign-up.styles";

const RegisterPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8082/api/auth/signup", {
        name,
        username,
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
        width: "100%",
      }}
    >
      <h1>Register</h1>
      <form
        onSubmit={handleRegister}
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
          label="Name"
          variant="outlined"
          autoComplete="off"
          sx={styles.TextField}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Username"
          variant="outlined"
          autoComplete="off"
          sx={styles.TextField}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          Register
        </Button>
        <p>
          Already have an account?{" "}
          <Link to={AppPath.SIGNIN} className="link">
            Login
          </Link>
        </p>
      </form>
    </Box>
  );
};

export default RegisterPage;
