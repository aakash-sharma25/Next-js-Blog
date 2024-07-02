"use client";
import DislayComment from "@/components/DislayComment";
import {
  Card,
  Container,
  Button,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  CardMedia,
  Box,
} from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const { blogId } = useParams();

  const [blog, setBlog] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchBlog = async () => {
    const { data } = await axios.get("/api/user/blog-detail/" + blogId);
    setBlog(data?.blogs);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: "80%" }}>
        <CardHeader
          avatar={<Avatar>{blog?.author?.avatar} </Avatar>}
          title={blog?.author?.userName}
          subheader={blog?.updatedAt}
        />
        <CardMedia
          sx={{ height: 300 }}
          image={blog?.image}
          title={blog?.title}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {blog?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog?.content}
          </Typography>
        </CardContent>
        {blog?.video && (
          <CardMedia
            sx={{ height: 300 }}
            component="video"
            controls
            image={blog?.video}
            title={blog?.title}
          />
        )}
        <CardActions>
          <Button onClick={() => setOpen(!open)}>Comments</Button>
        </CardActions>
      </Card>
      <Box sx={{ mt: 3 }}>
        {open && (
          <DislayComment
            comments={blog?.comments}
            postId={blog?._id}
            fetchBlog={fetchBlog}
          />
        )}
      </Box>
    </Container>
  );
}
