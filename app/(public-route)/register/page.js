"use client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      if (!email || email.trim() == "" || !password || password.trim() == "") {
        alert("please fill all the field");
        return;
      }
      const { data } = await axios.post("/api/auth/register", {
        email,
        password,
        userName,
      });
      router.push("/login");
    } catch (error) {
      alert("internal server error");
      console.log(error)
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
          Register
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="Enter User Name "
          name="userName"
          autoFocus
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          label="Enter Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Enter Password"
          type="password"
          id="password"
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
    </Container>
  );
}
