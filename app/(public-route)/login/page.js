"use client";
import { Box, TextField, Container, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || email.trim() == "" || !password || password.trim() == "") {
        alert("please fill all the field");
        return;
      }
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      var userData = JSON.stringify(data?.userData)
      localStorage.setItem("user", userData);
      router.push("/");
    } catch (error) {
      alert("internal server error");
    }
  };
  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
      <Typography textAlign={"center"}>
        Dont Have an account ?{" "}
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => router.push("/register")}
        >
          Register Here
        </span>{" "}
      </Typography>
    </Container>
  );
}

export default page;
