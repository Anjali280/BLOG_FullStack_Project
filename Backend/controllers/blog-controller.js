import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "no blog Found" });
  }
  return res.status(200).json({ blogs: blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existtinguser;
  try {
    existtinguser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existtinguser) {
    return res.status(400).json({ message: "unable to find user by this Id" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existtinguser.blogs.push(blog);
    await existtinguser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "no Blog find with given  id" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "unable to delete" });
  }
  return res.status(200).json({ message: "sucessfullly deleted the item" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ user: userBlogs });
};
export const likeBlog = async (req, res, next) => {
  const blogId = req.params.id;
  console.log(blogId);
  const userId = req.body.id;
  try {
    const blog = await Blog.findById(blogId);
    const allLikes = JSON.parse(JSON.stringify(blog.likes));
    const indexOfAlreadyLiked = allLikes.findIndex((like) => {
      return like === userId;
    });
    if (indexOfAlreadyLiked > -1) {
      blog.likes.splice(indexOfAlreadyLiked, 1);
      // return res.status(200).json({ msg: "Blog already liked" });
    } else {
      blog.likes.push(userId);
    }
    // blog.likes.pop();
    await blog.save();
    return res.json(blog.likes);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      msg: "server Error",
      trace: err,
    });
  }
};
