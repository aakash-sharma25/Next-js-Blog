"use client";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [imageUrl, setimageUrl] = useState(null);
  const [videoUrl, setvideoUrl] = useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gduvf4ky");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dcmysvzfx/upload",
        formData
      );
      if (res.data.resource_type === "image") {
        setimageUrl(res.data.secure_url);
      } else {
        setvideoUrl(res.data.secure_url);
      }
      alert("image uploaded");
    } catch (err) {
      alert("error occured");
      // setError('An error occurred while uploading the file.');
    }
  };

  const router = useRouter();
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
    if (imageUrl == null) {
      alert("select image");
      return;
    }
    try {
      const { data } = await axios.post("/api/user/create-blog", {
        userId: user.userId,
        title: input.title,
        description: input.description,
        image: imageUrl,
        video: videoUrl,
      });
      router.push("/my-blogs");
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

          {/* </Box> */}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography>Upload Image *</Typography>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Typography>Upload Video</Typography>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
          {image && imageUrl === null && (
            <Button variant="contained" onClick={() => handleUpload(image)}>
              Upload image{" "}
            </Button>
          )}
          {video && videoUrl === null && (
            <Button variant="contained" onClick={() => handleUpload(video)}>
              Upload video{" "}
            </Button>
          )}
        </Box>
        {imageUrl !== null && (
          <Button
            sx={{ mt: 3 }}
            fullWidth
            variant="outlined"
            onClick={handlesubmit}
          >
            Submit
          </Button>
        )}
      </Box>
    </Container>
  );
}
