"use client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DislayComment({ comments, postId,fetchBlog }) {
  var user = undefined;
  const [commentValue, setCommentValue] = useState("");
  const submitComment = async () => {
    if (commentValue === "") return;
    const { data } = await axios.post("/api/user/comment", {
      userId: user.userId,
      postId,
      comment: commentValue,
    });
    setCommentValue("");
    fetchBlog();
  };
  useEffect(() => {
    user = localStorage.getItem("user");
    user = JSON.parse(user);
  });
  return (
    <Container>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        marginBlock={2}
        gap={5}
      >
        <TextField
          label="Enter Comment"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        <Button onClick={submitComment}>Submit</Button>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, width: 300 }}
      >
        {comments.map((c) => {
          return (
            <Box
              sx={{
                wordBreak: "break-word",
                textWrap: "wrap",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 2,
                bgcolor: "lightblue",
                borderRadius: "25px",
              }}
            >
              <Typography fontWeight={700}> {c?.user?.userName}</Typography>
              <Typography> {c?.comment}</Typography>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
