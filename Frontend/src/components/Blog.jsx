import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import axios from "axios";

export default function Blog({
  id,
  isUser,
  title,
  description,
  imageURL,
  userName,
  likes,
}) {
  const [like, setlike] = useState(likes);
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };
  const likeRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/like/${id}`, {
        id: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  const handleLike = (e) => {
    likeRequest().then((data) => setlike(data));
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  const handleDelete = (e) => {
    deleteRequest().then(() => navigate("/blogs/"));
    // .then(() => navigate("/myBlogs/"));
  };
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "} {description}
          </Typography>
          <IconButton
            onClick={handleLike}
            // disabled={
            //   !!like.filter((e) => {
            //     return e == (localStorage.getItem("userId") || 0);
            //   }).length
            // }
          >
            <ThumbUpOffAltIcon />
          </IconButton>
          <span>{like?.length || 0}</span>
        </CardContent>
      </Card>
    </div>
  );
}
