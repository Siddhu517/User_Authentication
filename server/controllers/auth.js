import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Home = (req, res) => {
  try {
    res.json({ Home: "Welcome post" });
    res.json({ state: "ok" });
  } catch (err) {
    res.json({ status: "Error" });
  }
};

export const Register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.json({
      status: "OK",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.json({ status: "error", message: "Invalid user" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
        process.env.SECRET
      );

      return res.json({
        user: user,
        token: token,
      });
    } else {
      return res.json({
        status: "error",
        user: false,
      });
    }
  } else {
    return res.json({
      status: "error",
      user: false,
    });
  }
};

export const Dashboard = async (req, res) => {
  try {
    const data = await User.find({});
    if (data) {
      res.json(data);
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", message: "invalid token" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "User deleted Successfully" });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
