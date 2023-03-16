import { React, useState } from "react";
import { InputLabel, Typography, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

function AddBlog() {
  const navigate = useNavigate;
  const [inputs, setInputs] = useState({
    title: "",
    decription: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.decription,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate("/myBlog"));
  };
  return (
    <div>
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
          margin={"none"}
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
            Post your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            required={true}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="dense"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            required={true}
            name="decription"
            onChange={handleChange}
            value={inputs.decription}
            margin="dense"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField
            required={true}
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
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
    </div>
  );
}

export default AddBlog;
