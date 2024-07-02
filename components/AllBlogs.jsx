"use client";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import BlogCards from "./BlogCards";

export default function AllBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const { data } =await axios.get("/api/user/all-blogs");
    // console.log(data);
    setBlogs(data.blogs);
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
    fetchBlogs();
  }, []);
  return (
    <>
      <Navbar />
      <BlogCards blogs={blogs} />
    </>
  );
}
