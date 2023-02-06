import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

function Blogs() {
  const [blogs, setblogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setblogs(data.blogs));
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => {
          console.log(blog);
          return (
            <Blog
              key={index}
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={blog.user.name}
              likes={blog.likes || []}
            />
          );
        })}
    </div>
  );
}

export default Blogs;
