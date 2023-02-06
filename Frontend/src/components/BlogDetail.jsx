import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { InputLabel, Typography, Box, Button, TextField } from "@mui/material";

function BlogDetail() {
  const navigate = useNavigate();
  const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
  // const [blog, setblog] = useState();
  const id = useParams().id;
  // console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
    console.log(inputs);
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      // setblog(data.blog);
      setInputs({
        title: data.blog.title,
        // name: data.blog.name,
        description: data.blog.description,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  // console.log(blog);
  return (
    <div>
      {inputs && (
        <form
          onSubmit={handleSubmit}
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(49,49,116,1) 31%, rgba(0,58,161,1) 71%, rgba(69,187,252,1) 100%);"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"normal"}
            marginTop={5}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              Edit your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="dense"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="dense"
              variant="outlined"
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
}

export default BlogDetail;
