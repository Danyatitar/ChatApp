import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8082/api/auth/login", {
        phoneNumber,
        password,
      });

      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleSignup = (e: any) => {
  //     e.preventDefault();
  //     // Perform signup logic and set the isLoggedIn state to true
  //     setLoggedIn(true);
  //   };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8082/api/auth/logout");
      setLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoggedIn) {
    return (
      <Container>
        <Typography variant="h4">Welcome, {phoneNumber}!</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Login</Typography>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          justifySelf: "center",
        }}
      >
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Typography variant="body1">
          Don't have an account yet? Register one
        </Typography>
      </form>
    </Box>
  );
};

export default LoginPage;
