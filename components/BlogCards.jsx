"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function BlogCards({ blogs }) {
  const router = useRouter();
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {blogs?.map((blog) => {
          return (
            <Card sx={{ maxWidth: 500, mt: 5 }}>
              <CardHeader
                avatar={<Avatar src={blog?.author?.avatar}/>}
                title={blog?.author?.userName}
                subheader={blog?.updatedAt}
              />
              <CardMedia
                sx={{ height: 140 }}
                image={blog?.image}
                title={blog?.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog?.content?.slice(0, 200) + "...."}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() =>
                    router.push("/blog-detail/" + blog?._id)
                  }
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
}
