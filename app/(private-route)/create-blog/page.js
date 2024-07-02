"use client";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const router = useRouter()
  var user = undefined;
  const [input, setinput] = useState({
    description: "",
    title: "",
  });

  const handlechange = (e) => {
    setinput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/user/create-blog", {
        userId: user.userId,
        title: input.title,
        description: input.description,
      });
      router.push("/my-blogs")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user = localStorage.getItem("user");
    user = JSON.parse(user);
  });
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={10}
        p={3}
        boxShadow="rgba(13, 38, 76, 0.19) 0px 9px 20px"
      >
        <Typography variant="h4" gutterBottom>
          Create Blog
        </Typography>
        <Box
          component="form"
          onSubmit={handlesubmit}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
          width="100%"
        >
          <TextField
            label="Title"
            name="title"
            value={input.title}
            onChange={handlechange}
            required
            fullWidth
            margin="normal"
          />
          {/* <Box width="100%" className="register-input"> */}
          <TextField
            label="Description"
            name="description"
            value={input.description}
            onChange={handlechange}
            required
            fullWidth
            margin="normal"
          />
          <Button onClick={handlesubmit}>Submit</Button>

          {/* </Box> */}
        </Box>
      </Box>
    </Container>
  );
}
