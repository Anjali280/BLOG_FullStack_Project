import User from "../model/User.js";
import bcrypt from "bcryptjs";
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.status(200).json({ users: users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existtinguser;
  try {
    existtinguser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existtinguser) {
    return res
      .status(400)
      .json({ message: "User already exist! Login Insted" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user: user });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existtinguser;
  try {
    existtinguser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existtinguser) {
    return res.status(404).json({ message: "not found user with this email" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existtinguser.password
  );
  if (!isPasswordCorrect) {
    return res.status(404).json({ message: "password is not correct" });
  }
  return res
    .status(200)
    .json({ message: "Login Sucessful", user: existtinguser });
};
// export default getAllUser;
