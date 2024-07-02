"use client";
import BlogCards from "@/components/BlogCards";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const [blogs,setBlogs]= useState([]);

  const fetchBlogs = async () => {
    const {data} = await axios.get(`/api/user/blogs/${user?.userId}`);
    setBlogs(data?.blogs);
  };

  useEffect(()=>{
    fetchBlogs();
  },[])
  return (
    <Container maxWidth="lg">
      <BlogCards blogs={blogs} />
    </Container>
  );
}
