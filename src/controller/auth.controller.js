import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modal/user.modal.js";
import APPLICATIONCONST from "../constant/app.js";
// file system

// const filePath = path.resolve(process.cwd(), "./data/user.json");

// export const postUser = async (request, response) => {
//   try {
//     let { name, email, password } = request.body;
//     password = await bcrypt.hash(password, 10);
//     const id = uuidv4();
//     fs.readFile(filePath, (error, data) => {
//       if (error) throw error;
//       const existingData = JSON.parse(data);
//       existingData.push({
//         name,
//         email,
//         password,
//         id,
//       });
//       // For write the file content
//       fs.writeFile(filePath, JSON.stringify(existingData), (error) => {
//         if (error) throw error;
//         response.status(200).json({ message: "User submitted successfully" });
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     response.status(500).json({ message: "Something went wrong", error });
//   }
// };

// export const login = (request, response) => {
//   const { email, password } = request.body;
//   fs.readFile(filePath, async (error, users) => {
//     if (error) throw error;
//     // check user email
//     users = JSON.parse(users);
//     const matchedUser = users.find((doc) => doc.email === email);
//     if (!matchedUser) {
//       response.status(500).json({ message: "Email address is not matching" });
//     } else {
//       const isPasswordMatched = await bcrypt.compare(
//         password,
//         matchedUser.password
//       );
//       if (isPasswordMatched) {
//         const { password, ...user } = matchedUser;
//         const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
//         response.status(200).json({ message: "Succcess", data: user, token });
//       } else {
//         response.status(500).json({ message: "Password is not matching" });
//       }
//     }
//   });
// };

export const register = async (request, response) => {
  try {
    const { firstName, lastName, email, gender, phoneNumber } = request.body;
    const password = await bcrypt.hash(APPLICATIONCONST.COMMON_PASSWORD, 10);
    const user = new User({
      firstName,
      lastName,
      gender,
      email,
      phoneNumber,
      password,
    });
    await user.save();
    response.status(200).json({ message: "Success" });
  } catch (error) {
    response.status(500).json({ message: "Internal server error", error });
  }
};

export const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      response.status(500).json({ message: "Invalid Email" });
      return;
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return response.status(500).json({ message: "Invalid Password" });
    }
    response.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    response.status(500).json({ message: "Internal server error", error });
  }
};
