"use client";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  // let user = undefined;

  // useEffect(()=>{
  // user = localStorage.getItem("user");
  // user = JSON.parse(user);
  // },[])

  return (
    <>
      <AppBar>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Car rental </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
            <Button
              variant="contained"
              onClick={() => router.push("/")}
              style={{ textDecoration: "none" }}
            >
              All Blogs
            </Button>
            <Button
              variant="contained"
              onClick={() => router.push("/my-blogs")}
              style={{ textDecoration: "none" }}
            >
              My Blogs
            </Button>
            <Button
              variant="contained"
              onClick={() => router.push("/create-blog")}
              style={{ textDecoration: "none" }}
            >
              Create Blogs
            </Button>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {/* {user && ( */}
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/login");
                }}
              >
                Logout
              </Button>
            {/* )} */}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
